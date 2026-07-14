/**
 * GET /api/news/article?u=<publisher url> → { content: string | null }
 *
 * The full-article companion to /api/news/feed: fetches the publisher page
 * server-side and returns extracted plain text only — never raw upstream
 * HTML. Same SSRF guard as user-added feeds.
 */

import { NextRequest, NextResponse } from "next/server";
import { extractArticle } from "@/lib/news/extract";
import { isSafeFeedUrl } from "@/lib/news/rss";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("u");
  if (!url || !isSafeFeedUrl(url)) {
    return NextResponse.json({ content: null }, { status: 400 });
  }
  try {
    const content = await extractArticle(url);
    return NextResponse.json(
      { content },
      { headers: { "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch {
    return NextResponse.json({ content: null });
  }
}
