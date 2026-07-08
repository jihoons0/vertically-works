import { NextRequest, NextResponse } from "next/server";
import { safeExternalUrl } from "@/lib/listen/safe-url";

/** Fetches a podcast transcript (VTT / SRT / Podcasting-2.0 JSON) and
 *  returns merged, time-coded lines in the app's LyricLine shape. Cues
 *  arrive as 1–4s fragments; we merge them toward sentence-ish lines so
 *  the vertical columns read like verse, not confetti. */

const MAX_BYTES = 2_000_000;
const MAX_LINES = 600;
// Shorter merged lines advance the highlight more often — sync feels tight.
const TARGET_LEN = 30;

type Cue = { time: number; text: string };

function parseTimestamp(ts: string): number | null {
  const m = ts.trim().match(/^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[.,](\d{1,3})$/);
  if (!m) return null;
  const h = m[1] ? parseInt(m[1]) : 0;
  return h * 3600 + parseInt(m[2]) * 60 + parseInt(m[3]) + parseInt(m[4].padEnd(3, "0")) / 1000;
}

function cleanCueText(s: string): string {
  return s
    .replace(/<v\s+[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** Handles both VTT (dot decimals, WEBVTT/NOTE headers) and SRT (comma
 *  decimals, numeric indices) — the block shapes are near-identical. */
function parseVttOrSrt(text: string): Cue[] {
  const cues: Cue[] = [];
  for (const block of text.replace(/\r/g, "").split(/\n\n+/)) {
    const lines = block.split("\n").filter(Boolean);
    if (lines.length === 0) continue;
    if (/^(WEBVTT|NOTE|STYLE|REGION)/.test(lines[0])) continue;
    const tsIdx = lines.findIndex((l) => l.includes("-->"));
    if (tsIdx === -1) continue;
    const start = parseTimestamp(lines[tsIdx].split("-->")[0]);
    if (start === null) continue;
    const text = cleanCueText(lines.slice(tsIdx + 1).join(" "));
    if (text) cues.push({ time: start, text });
  }
  return cues;
}

/** Podcasting 2.0 JSON: { segments: [{ startTime, body }] } */
function parseJsonTranscript(raw: string): Cue[] {
  try {
    const data = JSON.parse(raw) as { segments?: { startTime?: number; body?: string }[] };
    return (data.segments ?? [])
      .filter((s) => typeof s.startTime === "number" && s.body)
      .map((s) => ({ time: s.startTime as number, text: cleanCueText(s.body as string) }))
      .filter((c) => c.text);
  } catch {
    return [];
  }
}

const isCJK = (ch: string) => /[ᄀ-ᇿ぀-ヿ㄰-㆏一-鿿가-힯]/.test(ch);
const endsSentence = (s: string) => /[.!?。！？…]["'」』]?$/.test(s);

function mergeCues(cues: Cue[]): Cue[] {
  const out: Cue[] = [];
  let cur: Cue | null = null;
  for (const cue of cues) {
    if (!cur) {
      cur = { ...cue };
    } else {
      const joiner = isCJK(cur.text.slice(-1)) && isCJK(cue.text[0]) ? "" : " ";
      cur.text += joiner + cue.text;
    }
    if (endsSentence(cur.text) || cur.text.length >= TARGET_LEN) {
      out.push(cur);
      cur = null;
    }
    if (out.length >= MAX_LINES) break;
  }
  if (cur && out.length < MAX_LINES) out.push(cur);
  return out.map((c) => ({ time: Math.round(c.time * 100) / 100, text: c.text }));
}

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get("url");
  const url = urlParam ? safeExternalUrl(urlParam) : null;
  if (!url) return NextResponse.json({ error: "valid transcript url required" }, { status: 400 });

  try {
    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "VerticallyListen/0.1 (podcast client)" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return NextResponse.json({ lines: null });
    const raw = (await res.text()).slice(0, MAX_BYTES);

    const cues = raw.trimStart().startsWith("{") ? parseJsonTranscript(raw) : parseVttOrSrt(raw);
    if (cues.length === 0) return NextResponse.json({ lines: null });

    return NextResponse.json({ lines: mergeCues(cues) });
  } catch {
    return NextResponse.json({ lines: null });
  }
}
