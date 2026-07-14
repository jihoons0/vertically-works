/**
 * Full-article extraction — server-side only.
 *
 * Supersedes the PRD v0.1 "no scraping" non-goal by user decision (2026-07-13):
 * the reader should carry the full article, not the feed's one-liner. The
 * extractor stays conservative: it returns plain text only (never raw HTML),
 * tries the publisher's own structured data first (JSON-LD `articleBody`),
 * then falls back to known article containers, then to a paragraph-density
 * heuristic. Anything it can't extract falls back to the description page
 * with a prominent 원문 보기 — never a fake full article.
 */

import { stripHtml } from "./rss";

const TIMEOUT_MS = 8000;

export async function extractArticle(url: string): Promise<string | null> {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const html = await res.text();
  return extractFromHtml(html);
}

export function extractFromHtml(html: string): string | null {
  const cleaned = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script(?![^>]*application\/ld\+json)|style|noscript|iframe|svg)[\s\S]*?<\/\1>/gi, "");

  return (
    fromJsonLd(cleaned) ?? fromKnownContainers(cleaned) ?? fromParagraphDensity(cleaned)
  );
}

/** Publisher-declared body: <script type="application/ld+json"> `articleBody`. */
function fromJsonLd(html: string): string | null {
  const scripts = html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  );
  for (const [, raw] of scripts) {
    try {
      const data = JSON.parse(raw.trim());
      const body = findArticleBody(data);
      if (body && body.length > 200) return normalize(body);
    } catch {
      /* malformed ld+json — keep looking */
    }
  }
  return null;
}

function findArticleBody(node: unknown): string | null {
  if (node === null || typeof node !== "object") return null;
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findArticleBody(child);
      if (found) return found;
    }
    return null;
  }
  const obj = node as Record<string, unknown>;
  if (typeof obj.articleBody === "string") return obj.articleBody;
  for (const key of ["@graph", "mainEntity", "mainEntityOfPage"]) {
    const found = findArticleBody(obj[key]);
    if (found) return found;
  }
  return null;
}

/** Containers the default sources (and most news CMSes) use. */
const CONTAINER_PATTERNS = [
  /<article[^>]*>([\s\S]*?)<\/article>/i,
  /<div[^>]+(?:id|class)=["'][^"']*(?:article[-_]?(?:body|text|content|view)|news[-_]?(?:end|text|body)|story[-_]?body|content[-_]?text|detail[-_]?body)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
];

function fromKnownContainers(html: string): string | null {
  for (const pattern of CONTAINER_PATTERNS) {
    const match = html.match(pattern);
    if (!match) continue;
    const text = paragraphsToText(match[1]);
    if (text && text.length > 200) return text;
  }
  return null;
}

/** Last resort: every <p> on the page, kept only if it adds up to a real body. */
function fromParagraphDensity(html: string): string | null {
  const text = paragraphsToText(html);
  return text && text.length > 300 ? text : null;
}

/** The copyright/제보 line ends the article — everything after is site chrome. */
const BOILERPLATE_END =
  /무단\s?전재|재배포\s?금지|저작권자|ⓒ|\(c\)\s|Copyright|All Rights Reserved|無断転載|転載を禁じ|版權所有|©/i;

/** Paragraphs that are navigation/ads, not prose. */
const JUNK =
  /더보기|바로가기|메뉴 열기|앱 설치|구독|뉴스레터|Taboola|관련 ?기사|추천 ?뉴스|関連ニュース|おすすめ|延伸閱讀|相關新聞/;

function paragraphsToText(fragment: string): string | null {
  let paragraphs = Array.from(fragment.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)).map(([, inner]) =>
    stripHtml(inner)
  );
  const end = paragraphs.findIndex((p) => BOILERPLATE_END.test(p));
  if (end >= 0) paragraphs = paragraphs.slice(0, end);
  paragraphs = paragraphs.filter((p) => p.length >= 20 && !JUNK.test(p));
  // Summary blocks repeat the lead — keep each paragraph once.
  const seen = new Set<string>();
  paragraphs = paragraphs.filter((p) => (seen.has(p) ? false : (seen.add(p), true)));
  if (paragraphs.length === 0) return null;
  return normalize(paragraphs.join("\n"));
}

function normalize(text: string): string {
  return text.replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{2,}/g, "\n").trim();
}
