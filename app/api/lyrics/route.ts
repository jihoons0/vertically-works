import { NextRequest, NextResponse } from "next/server";

/** LRCLIB proxy. Returns timed lines (full-track LRC times) and plain verse
 *  lines. Chart previews render the plain lines only — a 30s preview starts
 *  at an unknown offset, so pretending to sync would be wrong. */

type LrclibEntry = {
  trackName: string;
  artistName: string;
  duration: number;
  syncedLyrics: string | null;
  plainLyrics: string | null;
};

function parseLrc(lrc: string): { time: number; text: string }[] {
  const lines: { time: number; text: string }[] = [];
  for (const raw of lrc.split("\n")) {
    const m = raw.match(/^\s*\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$/);
    if (!m) continue;
    const text = m[3].trim();
    if (!text || text === "♫") continue;
    lines.push({ time: Math.round((parseInt(m[1]) * 60 + parseFloat(m[2])) * 100) / 100, text });
  }
  return lines;
}

async function search(params: string): Promise<LrclibEntry[]> {
  const res = await fetch(`https://lrclib.net/api/search?${params}`, {
    headers: { "Lrclib-Client": "VerticallyListen/0.1 (standalone prototype)" },
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];
  return (await res.json()) as LrclibEntry[];
}

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title");
  const artist = req.nextUrl.searchParams.get("artist");
  if (!title || !artist) {
    return NextResponse.json({ error: "title and artist required" }, { status: 400 });
  }

  try {
    let results = await search(
      `track_name=${encodeURIComponent(title)}&artist_name=${encodeURIComponent(artist)}`
    );
    if (results.length === 0) {
      results = await search(`q=${encodeURIComponent(`${title} ${artist}`)}`);
    }

    const best = results.find((r) => r.syncedLyrics) ?? results.find((r) => r.plainLyrics) ?? null;
    if (!best) return NextResponse.json({ lines: null, plain: null });

    const lines = best.syncedLyrics ? parseLrc(best.syncedLyrics) : null;
    const plain =
      best.plainLyrics
        ?.split("\n")
        .map((l) => l.trim())
        .filter(Boolean) ??
      lines?.map((l) => l.text) ??
      null;

    return NextResponse.json({ lines, plain });
  } catch {
    return NextResponse.json({ lines: null, plain: null });
  }
}
