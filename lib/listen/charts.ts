"use client";

import type { Track } from "@/lib/listen/tracks";

export type MarketCode = "kr" | "jp" | "cn" | "tw" | "hk";

export const MARKETS: { code: MarketCode; label: string }[] = [
  { code: "kr", label: "한국" },
  { code: "jp", label: "일본" },
  { code: "cn", label: "중국" },
  { code: "tw", label: "대만" },
  { code: "hk", label: "홍콩" },
];

type ChartSong = {
  id: string;
  rank: number;
  title: string;
  artist: string;
  artwork: string | null;
  releaseDate: string | null;
  previewUrl: string | null;
  durationMs: number | null;
};

/** Today's top 10 for a market, mapped into playable preview Tracks. */
export async function fetchChart(market: MarketCode): Promise<Track[]> {
  const res = await fetch(`/api/charts?sf=${market}`);
  if (!res.ok) throw new Error(`chart fetch failed (${res.status})`);
  const data = (await res.json()) as { songs: ChartSong[] };
  const label = MARKETS.find((m) => m.code === market)!.label;
  return data.songs.map(
    (s): Track => ({
      id: `chart-${market}-${s.id}`,
      title: s.title,
      artist: s.artist,
      src: s.previewUrl ?? "",
      duration: 30,
      isPreview: true,
      artwork: s.artwork ?? undefined,
      credit: `${label} 차트 ${s.rank}위 · 30초 미리 듣기`,
      plainNote: "가사 동기화 없음 · 30초 미리 듣기",
      lyrics: [],
    })
  );
}

/** Verse lines for a chart track (untimed — previews have unknown offset). */
export async function fetchPlainLyrics(title: string, artist: string): Promise<string[] | null> {
  const res = await fetch(
    `/api/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { plain: string[] | null };
  return data.plain;
}
