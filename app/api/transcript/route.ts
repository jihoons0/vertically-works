import { NextRequest, NextResponse } from "next/server";
import { safeExternalUrl } from "@/lib/listen/safe-url";
import { transcriptToLines } from "@/lib/listen/transcripts";

/** Fetches a podcast transcript (VTT / SRT / Podcasting-2.0 JSON) and
 *  returns merged, time-coded lines in the app's LyricLine shape. */

const MAX_BYTES = 2_000_000;

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
    return NextResponse.json({ lines: transcriptToLines(raw) });
  } catch {
    return NextResponse.json({ lines: null });
  }
}
