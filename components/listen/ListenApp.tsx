"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayer } from "@/lib/listen/store";
import type { Track } from "@/lib/listen/tracks";
import {
  fetchEpisodes,
  fetchTranscriptLines,
  showsForLanguage,
  type MarketCode,
  type Show,
} from "@/lib/listen/podcasts";
import { STRINGS, type Strings } from "@/lib/listen/i18n";
import { BrowseSheet } from "@/components/listen/BrowseSheet";
import { NavRail } from "@/components/listen/NavRail";
import { Lyrics } from "@/components/listen/Lyrics";
import { PlayerBar } from "@/components/listen/PlayerBar";

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
  const [sheetOpen, setSheetOpen] = useState(false);
  // What the sheet is browsing — independent of what's playing.
  const [sheetShow, setSheetShow] = useState<Show | null>(null);
  const [sheetEpisodes, setSheetEpisodes] = useState<Track[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  // The committed queue.
  const [activeShow, setActiveShow] = useState<Show | null>(null);
  const [episodeTracks, setEpisodeTracks] = useState<Track[]>([]);
  const requestRef = useRef(0);
  const transcriptTriedRef = useRef(new Set<string>());
  const [lyricsLoading, setLyricsLoading] = useState(false);

  const player = usePlayer(episodeTracks);
  const { track, togglePlay, next, prev, seek, play, pause, startAt } = player;

  // The catalog is static and curated (all subtitle-supported); it just
  // reorders so the chosen language leads.
  const shows = showsForLanguage(market);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vl:market") as MarketCode | null;
      if (raw && raw in STRINGS) setMarket(raw);
    } catch {
      // Storage unavailable — default market.
    }
  }, []);

  const changeMarket = useCallback(
    (mkt: MarketCode) => {
      if (mkt === market) return;
      setMarket(mkt);
      try {
        localStorage.setItem("vl:market", mkt);
      } catch {
        // Storage unavailable — selection still applies this session.
      }
    },
    [market]
  );

  // Browse a show inside the sheet — loads its episodes into the lower
  // band. Playback stays untouched until an episode is picked.
  const browseShow = useCallback(
    async (show: Show) => {
      setSheetShow(show);
      if (show.id === activeShow?.id) {
        setSheetEpisodes(episodeTracks); // already loaded as the queue
        setStatus("idle");
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

  // The crumbs and idle link all open the same stacked drawer. Default the
  // lower band to what's playing (or the first show) so it's never empty.
  const openBrowse = useCallback(() => {
    setSheetOpen(true);
    if (!sheetShow) {
      const target = activeShow ?? shows[0];
      if (target) void browseShow(target);
    }
  }, [sheetShow, activeShow, shows, browseShow]);

  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    if (status === "error") setStatus("idle");
  }, [status]);

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
      setSheetOpen(false);
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

      {/* Left edge — just the wordmark in the bottom-left corner. Theme and
          language now live in the player bar and the browse drawer. */}
      <span
        style={{
          position: "fixed",
          left: "var(--space-4)",
          bottom: "var(--space-5)",
          zIndex: 40,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "0.625rem",
          fontFamily: "var(--font-geist-mono)",
          color: "var(--color-fg-subtle)",
          letterSpacing: "0.08em",
          maxHeight: "38vh",
          overflow: "hidden",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        © 2026 Vertically Listen
      </span>

      {/* Reading zone — the stage owns the width; the rail is the trace */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "row-reverse" }}>
        <NavRail
          t={t}
          open={sheetOpen}
          activeShow={activeShow}
          track={track}
          onOpen={openBrowse}
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
            <IdleStage t={t} onBrowse={openBrowse} />
          )}
        </main>
      </div>

      {/* Bottom — the player bar, centered like a normal player */}
      <div
        className="vl-player-shell"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "var(--space-3) var(--space-6) var(--space-5)",
          flexShrink: 0,
        }}
      >
        <PlayerBar
          t={t}
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

      {/* The browse drawer — always mounted so exit can animate */}
      {(
        <BrowseSheet
          t={t}
          open={sheetOpen}
          market={market}
          onMarket={changeMarket}
          shows={shows}
          episodes={sheetEpisodes}
          browsingShow={sheetShow}
          currentEpisodeId={currentEpisodeId}
          isPlaying={player.isPlaying}
          status={status}
          onBrowseShow={browseShow}
          onPickEpisode={pickEpisode}
          onClose={closeSheet}
          onRetry={() => sheetShow && void browseShow(sheetShow)}
        />
      )}
    </div>
  );
}
