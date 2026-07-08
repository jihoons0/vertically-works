import { NextRequest, NextResponse } from "next/server";

/** Today's top podcasts for a CJK storefront, with each show's open RSS
 *  feed URL resolved in one batched iTunes lookup. */

const STOREFRONTS = new Set(["kr", "jp", "cn", "tw", "hk"]);

type RssEntry = {
  id: string;
  name: string;
  artistName?: string;
  artworkUrl100?: string;
};

type LookupResult = {
  kind?: string;
  collectionId?: number;
  feedUrl?: string;
};

export async function GET(req: NextRequest) {
  const sf = req.nextUrl.searchParams.get("sf") ?? "kr";
  if (!STOREFRONTS.has(sf)) {
    return NextResponse.json({ error: "unknown storefront" }, { status: 400 });
  }

  try {
    const rssRes = await fetch(
      `https://rss.marketingtools.apple.com/api/v2/${sf}/podcasts/top/10/podcasts.json`,
      { next: { revalidate: 3600 } }
    );
    if (!rssRes.ok) {
      return NextResponse.json({ error: "podcast chart unavailable" }, { status: 502 });
    }
    const feed = (await rssRes.json()).feed as { updated: string; results: RssEntry[] };

    const ids = feed.results.map((r) => r.id).join(",");
    const byId = new Map<string, LookupResult>();
    try {
      const lookupRes = await fetch(`https://itunes.apple.com/lookup?id=${ids}&country=${sf}`, {
        next: { revalidate: 3600 },
      });
      if (lookupRes.ok) {
        const found = (await lookupRes.json()).results as LookupResult[];
        for (const r of found) {
          if (r.kind === "podcast" && r.collectionId) byId.set(String(r.collectionId), r);
        }
      }
    } catch {
      // Shows without a resolved feed render disabled.
    }

    const shows = feed.results.map((r, i) => ({
      id: r.id,
      rank: i + 1,
      title: r.name,
      publisher: r.artistName ?? "",
      artwork: r.artworkUrl100?.replace("100x100", "512x512") ?? null,
      feedUrl: byId.get(String(r.id))?.feedUrl ?? null,
    }));

    return NextResponse.json({ updated: feed.updated, market: sf, shows });
  } catch {
    return NextResponse.json({ error: "podcast chart fetch failed" }, { status: 502 });
  }
}
