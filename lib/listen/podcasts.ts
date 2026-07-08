"use client";

import type { Track, LyricLine } from "@/lib/listen/tracks";
import type { MarketCode } from "@/lib/listen/charts";

export type Show = {
  id: string;
  rank: number;
  title: string;
  publisher: string;
  artwork: string | null;
  feedUrl: string | null;
};

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
      // Description shows as untimed verse unless a timed transcript loads.
      plainLyrics: e.descriptionLines,
      plainNote: e.transcriptUrl ? undefined : "대본 없는 에피소드 · 소개 글",
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
