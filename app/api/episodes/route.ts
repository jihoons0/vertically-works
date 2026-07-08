import { NextRequest, NextResponse } from "next/server";
import { safeExternalUrl } from "@/lib/listen/safe-url";

/** Parses a podcast RSS feed into playable episodes: full audio enclosures,
 *  podcast:transcript pointers (Podcasting 2.0), and description lines as
 *  the untimed fallback. Zero XML deps — tolerant regex parsing over the
 *  common feed shapes. */

const MAX_EPISODES = 12;
const MAX_FEED_BYTES = 3_000_000;

function tag(block: string, name: string): string | null {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i");
  const m = block.match(re);
  if (!m) return null;
  const inner = m[1].trim();
  const cdata = inner.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return (cdata ? cdata[1] : inner).trim();
}

function attr(tagStr: string, name: string): string | null {
  const m = tagStr.match(new RegExp(`${name}\\s*=\\s*"([^"]+)"`, "i"));
  return m ? m[1] : null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(s: string): string {
  return decodeEntities(s.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " "));
}

function parseDuration(raw: string | null): number {
  if (!raw) return 0;
  const parts = raw.trim().split(":").map(Number);
  if (parts.some(Number.isNaN)) return 0;
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

/** Description → a handful of readable verse lines for the fallback view. */
function descriptionLines(html: string | null): string[] {
  if (!html) return [];
  return stripHtml(html)
    .split(/\n+|(?<=[.!?。！？…])\s+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 1 && !/^https?:\/\//.test(l))
    .slice(0, 10)
    .map((l) => (l.length > 72 ? l.slice(0, 71) + "…" : l));
}

const TRANSCRIPT_PREFERENCE = ["text/vtt", "application/srt", "text/srt", "application/x-subrip", "application/json"];

export async function GET(req: NextRequest) {
  const feedParam = req.nextUrl.searchParams.get("feed");
  const url = feedParam ? safeExternalUrl(feedParam) : null;
  if (!url) return NextResponse.json({ error: "valid feed url required" }, { status: 400 });

  try {
    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "VerticallyListen/0.1 (podcast client)" },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return NextResponse.json({ error: "feed unavailable" }, { status: 502 });
    const xml = (await res.text()).slice(0, MAX_FEED_BYTES);

    const channelHead = xml.split(/<item[\s>]/)[0];
    const showTitle = tag(channelHead, "title") ?? "";

    const items = xml
      .split(/<item[\s>]/)
      .slice(1)
      .map((s) => s.split("</item>")[0])
      .slice(0, MAX_EPISODES);

    const episodes = items
      .map((item, i) => {
        const enclosureTag = item.match(/<enclosure\b[^>]*>/i)?.[0] ?? "";
        const audioUrl = attr(enclosureTag, "url");
        if (!audioUrl) return null;

        // Prefer VTT, then SRT, then JSON transcripts.
        const transcriptTags = item.match(/<podcast:transcript\b[^>]*>/gi) ?? [];
        let transcriptUrl: string | null = null;
        let transcriptType: string | null = null;
        let bestRank = Infinity;
        for (const t of transcriptTags) {
          const tUrl = attr(t, "url");
          const tType = (attr(t, "type") ?? "").toLowerCase();
          const rank = TRANSCRIPT_PREFERENCE.indexOf(tType);
          const effective = rank === -1 ? TRANSCRIPT_PREFERENCE.length : rank;
          if (tUrl && effective < bestRank) {
            bestRank = effective;
            transcriptUrl = tUrl;
            transcriptType = tType || null;
          }
        }

        const pub = tag(item, "pubDate");
        const date = pub && !Number.isNaN(Date.parse(pub)) ? new Date(pub).toISOString().slice(0, 10).replaceAll("-", ".") : "";

        return {
          id: `${i}-${audioUrl.slice(-24).replace(/[^a-zA-Z0-9]/g, "")}`,
          title: decodeEntities(tag(item, "title") ?? `에피소드 ${i + 1}`),
          date,
          audioUrl,
          durationSec: parseDuration(tag(item, "itunes:duration")),
          transcriptUrl,
          transcriptType,
          descriptionLines: descriptionLines(tag(item, "description") ?? tag(item, "itunes:summary")),
        };
      })
      .filter((e) => e !== null);

    return NextResponse.json({ show: decodeEntities(showTitle), episodes });
  } catch {
    return NextResponse.json({ error: "feed parse failed" }, { status: 502 });
  }
}
