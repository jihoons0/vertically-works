import { NextRequest, NextResponse } from "next/server";

/** Today's most-played songs for a CJK storefront, with playable 30s
 *  previews resolved in one batched iTunes lookup (previews must be in
 *  hand before the user taps, so play() stays inside the tap gesture). */

const STOREFRONTS = new Set(["kr", "jp", "cn", "tw", "hk"]);

type RssEntry = {
  id: string;
  name: string;
  artistName: string;
  artworkUrl100?: string;
  releaseDate?: string;
  url?: string;
};

type LookupResult = {
  wrapperType?: string;
  trackId?: number;
  previewUrl?: string;
  trackTimeMillis?: number;
};

export async function GET(req: NextRequest) {
  const sf = req.nextUrl.searchParams.get("sf") ?? "kr";
  if (!STOREFRONTS.has(sf)) {
    return NextResponse.json({ error: "unknown storefront" }, { status: 400 });
  }

  try {
    const rssRes = await fetch(
      `https://rss.marketingtools.apple.com/api/v2/${sf}/music/most-played/10/songs.json`,
      { next: { revalidate: 1800 } }
    );
    if (!rssRes.ok) {
      return NextResponse.json({ error: "chart feed unavailable" }, { status: 502 });
    }
    const feed = (await rssRes.json()).feed as { updated: string; results: RssEntry[] };

    // One lookup call for all ten ids.
    const ids = feed.results.map((r) => r.id).join(",");
    const byId = new Map<string, LookupResult>();
    try {
      const lookupRes = await fetch(
        `https://itunes.apple.com/lookup?id=${ids}&country=${sf}&entity=song`,
        { next: { revalidate: 1800 } }
      );
      if (lookupRes.ok) {
        const found = (await lookupRes.json()).results as LookupResult[];
        for (const r of found) {
          if (r.wrapperType === "track" && r.trackId) byId.set(String(r.trackId), r);
        }
      }
    } catch {
      // Previews degrade gracefully; the chart list still renders.
    }

    const songs = feed.results.map((r, i) => {
      const t = byId.get(String(r.id));
      return {
        id: r.id,
        rank: i + 1,
        title: r.name,
        artist: r.artistName,
        artwork: r.artworkUrl100?.replace("100x100", "512x512") ?? null,
        releaseDate: r.releaseDate ?? null,
        previewUrl: t?.previewUrl ?? null,
        durationMs: t?.trackTimeMillis ?? null,
      };
    });

    return NextResponse.json({ updated: feed.updated, market: sf, songs });
  } catch {
    return NextResponse.json({ error: "chart fetch failed" }, { status: 502 });
  }
}
