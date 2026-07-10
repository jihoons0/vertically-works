"use client";

import type { Track, LyricLine } from "@/lib/listen/tracks";

export type MarketCode = "kr" | "jp" | "cn" | "tw" | "hk";

export const MARKETS: { code: MarketCode; label: string }[] = [
  { code: "kr", label: "한국" },
  { code: "jp", label: "일본" },
  { code: "cn", label: "중국" },
  { code: "tw", label: "대만" },
  { code: "hk", label: "홍콩" },
];

export type Show = {
  id: string;
  rank: number;
  title: string;
  publisher: string;
  artwork: string | null;
  feedUrl: string | null;
};

/** Shows verified to publish Podcasting 2.0 transcripts — the karaoke
 *  experience is guaranteed here, so they get top billing. (Today's CJK
 *  charts carry none; this list keeps the synced path reachable.) */
export const FEATURED_SHOWS: Show[] = [
  {
    // LISTEN (listen.style) hosts Japanese podcasts and auto-publishes
    // podcast:transcript VTTs for every episode — native CJK karaoke.
    id: "featured-listennews",
    rank: 0,
    title: "LISTEN NEWS",
    publisher: "LISTEN · 日本語",
    artwork:
      "https://image.listen.style/p/01gyeap39wden4y84seygpawrv/images/SMQ5QbLxxF9DiJ3Pn7IGTDl5wv90euSESLyRi1PO.png",
    feedUrl: "https://listen.style/p/listennews/rss",
  },
  {
    id: "featured-podnews",
    rank: 0,
    title: "Podnews Daily",
    publisher: "Podnews LLC",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/aa/38/88/aa388802-31b0-2874-3fb6-a6eca9e54e3a/mza_17374429396168435629.png/512x512bb.jpg",
    feedUrl: "https://podnews.net/rss",
  },
  {
    id: "featured-pc20",
    rank: 0,
    title: "Podcasting 2.0",
    publisher: "Podcast Index LLC",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/75/16/2d/75162db9-1089-687d-7726-df2e4861ba24/mza_2968058896728768246.png/512x512bb.jpg",
    feedUrl: "https://feeds.podcastindex.org/pc20.xml",
  },
  {
    id: "featured-buzzcast",
    rank: 0,
    title: "Buzzcast",
    publisher: "Buzzsprout",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/d0/ff/ca/d0ffca4a-4ec4-564b-a572-5b4857e17866/mza_2780923671060629160.jpg/512x512bb.jpg",
    feedUrl: "https://rss.buzzsprout.com/231452.rss",
  },
];

/** Today's top podcasts for a market. */
export async function fetchTopShows(market: MarketCode): Promise<Show[]> {
  const res = await fetch(`/api/podcasts?sf=${market}`);
  if (!res.ok) throw new Error(`podcast chart fetch failed (${res.status})`);
  const data = (await res.json()) as { shows: Show[] };
  return data.shows;
}

type EpisodeData = {
  id: string;
  title: string;
  date: string;
  audioUrl: string;
  durationSec: number;
  transcriptUrl: string | null;
  transcriptType: string | null;
  descriptionLines: string[];
};

/** A show's recent episodes as full-audio Tracks. */
export async function fetchEpisodes(show: Show): Promise<Track[]> {
  if (!show.feedUrl) throw new Error("show has no feed");
  const res = await fetch(`/api/episodes?feed=${encodeURIComponent(show.feedUrl)}`);
  if (!res.ok) throw new Error(`episode fetch failed (${res.status})`);
  const data = (await res.json()) as { show: string; episodes: EpisodeData[] };
  return data.episodes.map(
    (e): Track => ({
      id: `pod-${show.id}-${e.id}`,
      title: e.title,
      artist: show.title,
      src: e.audioUrl,
      duration: e.durationSec,
      artwork: show.artwork ?? undefined,
      credit: `${show.title}${e.date ? ` · ${e.date}` : ""}`,
      transcriptUrl: e.transcriptUrl ?? undefined,
      // Show notes render as the intro panel unless a timed transcript loads.
      plainLyrics: e.descriptionLines,
      lyrics: [],
    })
  );
}

/** Timed transcript lines (empty array = tried and none usable). */
export async function fetchTranscriptLines(url: string): Promise<LyricLine[]> {
  const res = await fetch(`/api/transcript?url=${encodeURIComponent(url)}`);
  if (!res.ok) return [];
  const data = (await res.json()) as { lines: LyricLine[] | null };
  return data.lines ?? [];
}
