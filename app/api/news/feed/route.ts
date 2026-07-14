/**
 * GET /api/news/feed?edition=ko|ja|zh&section=all|politics|economy|society|culture
 *   &custom=<url>&custom=<url>…   user feeds from the Sources sheet
 *   &off=<sourceId>&off=…         default sources the user switched off
 *
 * → { items: NewsItem[], failures: FeedFailure[] }
 *
 * The one proxy every feed goes through — default and user-added alike — so
 * the client only ever receives parsed, sanitized items (PRD §8).
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchEdition, isSafeFeedUrl, validateFeed } from "@/lib/news/rss";
import { EDITIONS, SECTIONS, type EditionId, type SectionId } from "@/lib/news/sources";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const edition = (params.get("edition") ?? "ko") as EditionId;
  const section = (params.get("section") ?? "all") as SectionId;
  if (!EDITIONS.includes(edition) || !SECTIONS.includes(section)) {
    return NextResponse.json({ error: "unknown edition or section" }, { status: 400 });
  }

  // Validation mode for the Sources sheet: does this URL parse as a feed?
  const validate = params.get("validate");
  if (validate) {
    const verdict = await validateFeed(validate);
    return NextResponse.json(verdict, { status: verdict.ok ? 200 : 400 });
  }

  const customUrls = params.getAll("custom").filter(isSafeFeedUrl).slice(0, 8);
  const disabledSourceIds = params.getAll("off");

  const result = await fetchEdition(edition, section, { customUrls, disabledSourceIds });
  return NextResponse.json(result, {
    headers: { "cache-control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
