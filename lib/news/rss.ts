/**
 * RSS layer (PRD §8) — server-side only.
 *
 * Parallel fetch across a source set with a 5s per-feed timeout and Next's
 * fetch cache (`revalidate: 600`). Failures return partial results with a
 * `failures[]` field — one dead feed never blanks the front page. Items are
 * sanitized here (HTML stripped server-side); the API only ever returns
 * parsed items, never raw upstream bodies.
 */

import Parser from "rss-parser";
import { sourcesFor, type EditionId, type SectionId } from "./sources";

export interface NewsItem {
  id: string;
  edition: EditionId;
  section: SectionId;
  sourceName: string;
  title: string;
  description: string;
  /** Full body when the feed provides content:encoded · plain text, HTML stripped. */
  content?: string;
  link: string;
  publishedAt: string; // ISO
}

export interface FeedFailure {
  sourceName: string;
  url: string;
  reason: string;
}

export interface FeedResult {
  items: NewsItem[];
  failures: FeedFailure[];
}

type RawItem = {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  isoDate?: string;
  contentSnippet?: string;
  content?: string;
  "content:encoded"?: string;
};

const parser: Parser<Record<string, unknown>, RawItem> = new Parser({
  customFields: { item: ["content:encoded"] },
});

/** Strip tags + decode the entities that matter in feed summaries. */
export function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

/** Stable id from `guid ?? link` — the article route re-derives the item (no DB). */
export function hashId(key: string): string {
  // FNV-1a, 32-bit, base36 — stable across processes and deploys.
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

/** SSRF guard for user-supplied feed URLs: public http(s) hosts only. */
export function isSafeFeedUrl(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return false;
  // Literal IPv4 in private/loopback/link-local ranges, or any IPv6 literal.
  if (host.startsWith("[")) return false;
  const v4 = host.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (v4) {
    const [a, b] = [Number(v4[1]), Number(v4[2])];
    if (a === 10 || a === 127 || a === 0 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 169 && b === 254)) {
      return false;
    }
  }
  return true;
}

const FEED_TIMEOUT_MS = 5000;

async function fetchOne(
  url: string,
  sourceName: string,
  edition: EditionId,
  section: SectionId
): Promise<NewsItem[]> {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      accept: "application/rss+xml, application/xml, text/xml, */*",
    },
    signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  const feed = await parser.parseString(xml);
  // An "empty" feed is a failure worth surfacing, not a quiet nothing —
  // some upstreams intermittently return a valid-but-bare document.
  if (!feed.items || feed.items.length === 0) throw new Error("empty feed");
  return (feed.items ?? [])
    .filter((it) => it.title && it.link)
    .map((it) => {
      const encoded = it["content:encoded"];
      const content = encoded ? stripHtml(encoded) : undefined;
      const description = stripHtml(it.contentSnippet ?? it.content ?? "");
      return {
        id: hashId(it.guid ?? it.link!),
        edition,
        section,
        sourceName,
        title: stripHtml(it.title!),
        description,
        content: content && content.length > description.length ? content : undefined,
        link: it.link!,
        // No date in the feed → empty, sorted after dated items — never a fake "now".
        publishedAt: it.isoDate ?? (it.pubDate ? new Date(it.pubDate).toISOString() : ""),
      } satisfies NewsItem;
    });
}

export interface FetchEditionOptions {
  /** Extra user feeds (Sources sheet) · fetched like defaults, contribute to `all`. */
  customUrls?: string[];
  /** Default source ids the user switched off. */
  disabledSourceIds?: string[];
  limit?: number;
}

export async function fetchEdition(
  edition: EditionId,
  section: SectionId,
  { customUrls = [], disabledSourceIds = [], limit = 60 }: FetchEditionOptions = {}
): Promise<FeedResult> {
  const jobs: { url: string; sourceName: string }[] = [];

  for (const source of sourcesFor(edition)) {
    if (disabledSourceIds.includes(source.id)) continue;
    const url = source.feeds[section];
    if (url) jobs.push({ url, sourceName: source.name });
  }
  if (section === "all") {
    for (const url of customUrls) {
      if (isSafeFeedUrl(url)) jobs.push({ url, sourceName: safeHostLabel(url) });
    }
  }

  const settled = await Promise.allSettled(
    jobs.map((j) => fetchOne(j.url, j.sourceName, edition, section))
  );

  const items: NewsItem[] = [];
  const failures: FeedFailure[] = [];
  settled.forEach((result, i) => {
    if (result.status === "fulfilled") items.push(...result.value);
    else {
      failures.push({
        sourceName: jobs[i].sourceName,
        url: jobs[i].url,
        reason: result.reason instanceof Error ? result.reason.message : String(result.reason),
      });
    }
  });

  // Dedupe (a story can ride several section feeds) and set newest first.
  const seen = new Set<string>();
  const deduped = items.filter((it) => (seen.has(it.id) ? false : (seen.add(it.id), true)));
  deduped.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return { items: deduped.slice(0, limit), failures };
}

/** Sources-sheet probe: does this URL parse as RSS/Atom? Fetches only that URL. */
export async function validateFeed(
  url: string
): Promise<{ ok: true; count: number } | { ok: false; reason: string }> {
  if (!isSafeFeedUrl(url)) return { ok: false, reason: "unsupported URL" };
  try {
    const items = await fetchOne(url, safeHostLabel(url), "ko", "all");
    return { ok: true, count: items.length };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) };
  }
}

function safeHostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
