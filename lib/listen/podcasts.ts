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

/** Which UI locale a show's spoken/subtitle language belongs to (so we can
 *  surface the chosen language's shows first). "en" = universal. */
export type ShowLang = MarketCode | "en";

export type Show = {
  id: string;
  rank: number;
  title: string;
  publisher: string;
  lang: ShowLang;
  artwork: string | null;
  feedUrl: string | null;
};

/** The entire catalog: only podcasts VERIFIED to publish Podcasting 2.0
 *  transcripts, so every show here yields karaoke. There is no chart tier —
 *  we show subtitle-supported shows and nothing else. Native CJK sources:
 *  LISTEN.style (all-episode JA VTTs) and the Language Learning Accelerator
 *  series (all-episode KO/JA VTTs via Captivate). */
export const FEATURED_SHOWS: Show[] = [
  {
    // Language Learning Accelerator (Captivate) — every episode ships a VTT;
    // the Korean edition is fully, natively Korean. Reliable KO karaoke.
    id: "featured-lla-ko",
    rank: 0,
    title: "영어 학습 액셀러레이터",
    publisher: "Language Learning Accelerator · 한국어",
    lang: "kr",
    artwork: "https://artwork.captivate.fm/6b5da939-2de3-49e4-bb83-0f3f88b51c3d/PMqBLCwq-ws-5pmkAKpJ5Ktk.jpg",
    feedUrl: "https://feeds.captivate.fm/english-learning-accelerator-ko-kr-to-en-us/",
  },
  {
    // Spotify for Creators exposes Spotify's auto-transcripts as SRT — real
    // Korean, timestamped (sparser coverage; transcript-only filter handles it).
    id: "featured-lfweekly",
    rank: 0,
    title: "라플위클리",
    publisher: "LIFEPLUS TV · 한국어",
    lang: "kr",
    artwork: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/44434731/44434731-1778737002867-a3ad079a2d676.jpg",
    feedUrl: "https://anchor.fm/s/109729b4c/podcast/rss",
  },
  {
    // LISTEN (listen.style) auto-publishes podcast:transcript VTTs for every
    // episode it hosts — native Japanese karaoke, full coverage.
    id: "featured-listennews",
    rank: 0,
    title: "LISTEN NEWS",
    publisher: "LISTEN · 日本語",
    lang: "jp",
    artwork:
      "https://image.listen.style/p/01gyeap39wden4y84seygpawrv/images/SMQ5QbLxxF9DiJ3Pn7IGTDl5wv90euSESLyRi1PO.png",
    feedUrl: "https://listen.style/p/listennews/rss",
  },
  {
    // Accelerator's Japanese edition — every episode captioned in Japanese.
    id: "featured-lla-ja",
    rank: 0,
    title: "英語学習アクセラレーター",
    publisher: "Language Learning Accelerator · 日本語",
    lang: "jp",
    artwork: "https://artwork.captivate.fm/934dd4d2-e683-46fe-8890-0143b5247d3f/eIauKaA4zXShBu.jpg",
    feedUrl: "https://feeds.captivate.fm/english-learning-accelerator-ja-jp-to-en-us/",
  },
  {
    id: "featured-podnews",
    rank: 0,
    title: "Podnews Daily",
    publisher: "Podnews LLC",
    lang: "en",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/aa/38/88/aa388802-31b0-2874-3fb6-a6eca9e54e3a/mza_17374429396168435629.png/512x512bb.jpg",
    feedUrl: "https://podnews.net/rss",
  },
  {
    id: "featured-pc20",
    rank: 0,
    title: "Podcasting 2.0",
    publisher: "Podcast Index LLC",
    lang: "en",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/75/16/2d/75162db9-1089-687d-7726-df2e4861ba24/mza_2968058896728768246.png/512x512bb.jpg",
    feedUrl: "https://feeds.podcastindex.org/pc20.xml",
  },
  {
    id: "featured-buzzcast",
    rank: 0,
    title: "Buzzcast",
    publisher: "Buzzsprout",
    lang: "en",
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/d0/ff/ca/d0ffca4a-4ec4-564b-a572-5b4857e17866/mza_2780923671060629160.jpg/512x512bb.jpg",
    feedUrl: "https://rss.buzzsprout.com/231452.rss",
  },
];

/** The catalog, ordered so the chosen language's shows lead, then the rest
 *  (universal English last). Everything here has subtitle support. */
export function showsForLanguage(lang: MarketCode): Show[] {
  const weight = (s: Show) => (s.lang === lang ? 0 : s.lang === "en" ? 2 : 1);
  return [...FEATURED_SHOWS].sort((a, b) => weight(a) - weight(b));
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

/** A show's episodes as full-audio Tracks — ONLY episodes that carry a
 *  transcript, so every episode the user can open plays with karaoke. */
export async function fetchEpisodes(show: Show): Promise<Track[]> {
  if (!show.feedUrl) throw new Error("show has no feed");
  const res = await fetch(`/api/episodes?feed=${encodeURIComponent(show.feedUrl)}`);
  if (!res.ok) throw new Error(`episode fetch failed (${res.status})`);
  const data = (await res.json()) as { show: string; episodes: EpisodeData[] };
  return data.episodes
    .filter((e) => e.transcriptUrl)
    .map(
      (e): Track => ({
        id: `pod-${show.id}-${e.id}`,
        title: e.title,
        artist: show.title,
        src: e.audioUrl,
        duration: e.durationSec,
        artwork: show.artwork ?? undefined,
        credit: `${show.title}${e.date ? ` · ${e.date}` : ""}`,
        transcriptUrl: e.transcriptUrl ?? undefined,
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
