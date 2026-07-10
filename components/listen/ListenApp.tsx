"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayer } from "@/lib/listen/store";
import type { Track } from "@/lib/listen/tracks";
import {
  fetchTopShows,
  fetchEpisodes,
  fetchTranscriptLines,
  FEATURED_SHOWS,
  type MarketCode,
  type Show,
} from "@/lib/listen/podcasts";
import { STRINGS, type Strings } from "@/lib/listen/i18n";
import { BrowseSheet } from "@/components/listen/BrowseSheet";
import { NavRail } from "@/components/listen/NavRail";
import { Lyrics } from "@/components/listen/Lyrics";
import { PlayerBar } from "@/components/listen/PlayerBar";

type SheetLevel = null | "shows" | "episodes";

/** Idle stage — nothing chosen yet. The big type IS the interface, and it
 *  links straight into the browse sheet. */
function IdleStage({ t, onBrowse }: { t: Strings; onBrowse: () => void }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-8)",
        padding: "var(--space-10)",
        animation: "vl-fade-in var(--duration-slow) var(--easing-out) both",
      }}
    >
      <h2
        style={{
          margin: 0,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "clamp(2.5rem, 8vh, 4.25rem)",
          fontWeight: 300,
          letterSpacing: "0.16em",
          lineHeight: 1.3,
          maxHeight: "82%",
          color: "var(--color-fg)",
        }}
      >
        {t.idleTitle}
      </h2>
      <button
        className="pressable"
        onClick={onBrowse}
        aria-haspopup="dialog"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "0.875rem",
          color: "var(--color-fg-muted)",
          letterSpacing: "0.12em",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          paddingTop: "var(--space-8)",
          textDecoration: "underline",
          textDecorationColor: "var(--color-border-strong)",
          textUnderlineOffset: 4,
        }}
      >
        {t.browseToday}
      </button>
    </div>
  );
}

export function ListenApp() {
  const [market, setMarket] = useState<MarketCode>("kr");
  const [shows, setShows] = useState<Show[]>([]);
  const [sheet, setSheet] = useState<SheetLevel>(null);
  // What the sheet is browsing — independent of what's playing.
  const [sheetShow, setSheetShow] = useState<Show | null>(null);
  const [sheetEpisodes, setSheetEpisodes] = useState<Track[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  // The committed queue.
  const [activeShow, setActiveShow] = useState<Show | null>(null);
  const [episodeTracks, setEpisodeTracks] = useState<Track[]>([]);
  // Chart shows found (by probing feeds) to publish transcripts.
  const [transcriptIds, setTranscriptIds] = useState<Set<string>>(new Set());
  const requestRef = useRef(0);
  const probeSeqRef = useRef(0);
  const transcriptTriedRef = useRef(new Set<string>());
  const [lyricsLoading, setLyricsLoading] = useState(false);

  const player = usePlayer(episodeTracks);
  const { track, togglePlay, next, prev, seek, play, pause, startAt } = player;

  // Feeds are cached server-side, so this doubles as prefetch: opening a
  // probed show later is instant.
  const probeTranscripts = useCallback(async (list: Show[]) => {
    const probeId = ++probeSeqRef.current;
    const results = await Promise.allSettled(
      list
        .filter((s) => s.feedUrl)
        .map(async (s) => {
          const res = await fetch(`/api/episodes?feed=${encodeURIComponent(s.feedUrl!)}`);
          if (!res.ok) return null;
          const data = (await res.json()) as { episodes?: { transcriptUrl: string | null }[] };
          return data.episodes?.some((e) => e.transcriptUrl) ? s.id : null;
        })
    );
    if (probeId !== probeSeqRef.current) return;
    setTranscriptIds(
      new Set(
        results
          .filter((r): r is PromiseFulfilledResult<string | null> => r.status === "fulfilled")
          .map((r) => r.value)
          .filter((v): v is string => v !== null)
      )
    );
  }, []);

  const loadShows = useCallback(
    async (mkt: MarketCode) => {
      const requestId = ++requestRef.current;
      setStatus("loading");
      try {
        const loaded = await fetchTopShows(mkt);
        if (requestId !== requestRef.current) return;
        setShows(loaded);
        setStatus("idle");
        void probeTranscripts(loaded);
      } catch {
        if (requestId === requestRef.current) setStatus("error");
      }
    },
    [probeTranscripts]
  );

  useEffect(() => {
    let saved: MarketCode = "kr";
    try {
      const raw = localStorage.getItem("vl:market") as MarketCode | null;
      if (raw && raw in STRINGS) saved = raw;
    } catch {
      // Storage unavailable — default market.
    }
    setMarket(saved);
    void loadShows(saved);
  }, [loadShows]);

  const changeMarket = useCallback(
    (mkt: MarketCode) => {
      if (mkt === market) return;
      setMarket(mkt);
      try {
        localStorage.setItem("vl:market", mkt);
      } catch {
        // Storage unavailable — selection still applies this session.
      }
      void loadShows(mkt);
    },
    [market, loadShows]
  );

  const openShows = useCallback(() => {
    setSheet("shows");
    if (shows.length === 0 && status !== "loading") void loadShows(market);
  }, [shows.length, status, market, loadShows]);

  const openEpisodes = useCallback(() => {
    if (!activeShow) return;
    setSheetShow(activeShow);
    setSheetEpisodes(episodeTracks);
    setSheet("episodes");
  }, [activeShow, episodeTracks]);

  const closeSheet = useCallback(() => {
    setSheet(null);
    if (status === "error") setStatus("idle");
  }, [status]);

  // Browse a show inside the sheet — playback stays untouched.
  const browseShow = useCallback(
    async (show: Show) => {
      setSheet("episodes");
      setSheetShow(show);
      if (show.id === activeShow?.id) {
        setSheetEpisodes(episodeTracks); // already loaded as the queue
        return;
      }
      const requestId = ++requestRef.current;
      setStatus("loading");
      setSheetEpisodes([]);
      try {
        const episodes = await fetchEpisodes(show);
        if (requestId !== requestRef.current) return;
        if (episodes.length === 0) throw new Error("no playable episodes");
        setSheetEpisodes(episodes);
        setStatus("idle");
      } catch {
        if (requestId === requestRef.current) setStatus("error");
      }
    },
    [activeShow, episodeTracks]
  );

  // Picking an episode commits the browsed show as the queue and plays.
  const pickEpisode = useCallback(
    (index: number) => {
      if (!sheetShow) return;
      if (sheetShow.id === activeShow?.id) {
        player.select(index);
      } else {
        setActiveShow(sheetShow);
        setEpisodeTracks(sheetEpisodes);
        startAt(index);
      }
      setSheet(null);
    },
    [sheetShow, sheetEpisodes, activeShow, player, startAt]
  );

  // Lazy timed-transcript fetch for the current episode (Podcasting 2.0).
  useEffect(() => {
    if (!track?.transcriptUrl || track.lyrics.length > 0) return;
    if (transcriptTriedRef.current.has(track.id)) return;
    transcriptTriedRef.current.add(track.id);
    const { id, transcriptUrl } = track;
    let cancelled = false;
    setLyricsLoading(true);
    fetchTranscriptLines(transcriptUrl)
      .then((lines) => {
        if (cancelled) return;
        setEpisodeTracks((prev) =>
          prev.map((ep) => (ep.id === id ? { ...ep, lyrics: lines } : ep))
        );
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLyricsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [track]);

  // Keyboard — a normal player: Space play/pause, ←/→ = ∓15s, ↑/↓ = episode.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (target && (target.tagName === "BUTTON" || target.getAttribute("role") === "slider")) {
        if (e.code === "Space" || e.code === "Enter" || e.key.startsWith("Arrow")) return;
      }
      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          seek(Math.max(0, player.currentTime - 15));
          break;
        case "ArrowRight":
          e.preventDefault();
          seek(player.currentTime + 15);
          break;
        case "ArrowUp":
          e.preventDefault();
          prev();
          break;
        case "ArrowDown":
          e.preventDefault();
          next();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, next, prev, seek, player.currentTime]);

  // Hardware/system media keys + lock-screen seeking.
  useEffect(() => {
    if (!("mediaSession" in navigator) || !track) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: "Vertically Listen",
      artwork: track.artwork ? [{ src: track.artwork, sizes: "512x512", type: "image/jpeg" }] : [],
    });
  }, [track]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.setActionHandler("play", play);
    navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler("previoustrack", prev);
    navigator.mediaSession.setActionHandler("nexttrack", next);
    navigator.mediaSession.setActionHandler("seekbackward", () => seek(Math.max(0, player.currentTime - 15)));
    navigator.mediaSession.setActionHandler("seekforward", () => seek(player.currentTime + 15));
  }, [play, pause, prev, next, seek, player.currentTime]);

  const t = STRINGS[market];
  const currentEpisodeId = track && sheetShow?.id === activeShow?.id ? track.id : null;

  return (
    <div
      style={{
        height: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-bg)",
        color: "var(--color-fg)",
      }}
    >
      <audio {...player.audioProps} />

      {/* Reading zone — the stage owns the width; the rail is the trace */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "row-reverse" }}>
        <NavRail
          t={t}
          sheetLevel={sheet}
          activeShow={activeShow}
          track={track}
          onOpenShows={openShows}
          onOpenEpisodes={openEpisodes}
        />

        <main style={{ flex: 1, minWidth: 0, height: "100%" }}>
          {track ? (
            <Lyrics
              key={track.id}
              lyrics={track.lyrics}
              plainLines={track.plainLyrics}
              plainNote={track.transcriptUrl ? undefined : t.noTranscript}
              loading={lyricsLoading}
              activeIndex={player.activeLyricIndex}
              onLineClick={player.seek}
              introLabel={t.epIntro}
              loadingText={t.findingLyrics}
              emptyText={t.noTranscript}
            />
          ) : (
            <IdleStage t={t} onBrowse={openShows} />
          )}
        </main>
      </div>

      {/* Bottom — the player bar, centered like a normal player */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "var(--space-3) var(--space-6) var(--space-5)",
          flexShrink: 0,
        }}
      >
        <PlayerBar
          t={t}
          market={market}
          onMarket={changeMarket}
          currentTime={player.currentTime}
          duration={player.duration}
          isPlaying={player.isPlaying}
          volume={player.volume}
          muted={player.muted}
          disabled={!track}
          onTogglePlay={togglePlay}
          onSeek={seek}
          onPrev={prev}
          onNext={next}
          onVolumeChange={player.setVolume}
          onToggleMute={player.toggleMute}
        />
      </div>

      {/* The browse sheet — full width, from the top, over a scrim */}
      {sheet !== null && (
        <BrowseSheet
          t={t}
          level={sheet}
          shows={shows}
          featured={FEATURED_SHOWS}
          transcriptIds={transcriptIds}
          episodes={sheetEpisodes}
          browsingShow={sheetShow}
          activeShowId={activeShow?.id ?? null}
          currentEpisodeId={currentEpisodeId}
          isPlaying={player.isPlaying}
          status={status}
          onBrowseShow={browseShow}
          onPickEpisode={pickEpisode}
          onBack={() => setSheet("shows")}
          onClose={closeSheet}
          onRetry={() => (sheet === "shows" ? void loadShows(market) : sheetShow && void browseShow(sheetShow))}
        />
      )}
    </div>
  );
}
