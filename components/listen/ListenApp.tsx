"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayer } from "@/lib/listen/store";
import type { Track } from "@/lib/listen/tracks";
import {
  fetchTopShows,
  fetchEpisodes,
  fetchTranscriptLines,
  MARKETS,
  type MarketCode,
  type Show,
} from "@/lib/listen/podcasts";
import { Tray } from "@/components/listen/Tray";
import { NavRail } from "@/components/listen/NavRail";
import { Lyrics } from "@/components/listen/Lyrics";
import { PlayerBar } from "@/components/listen/PlayerBar";

type Browsing = "shows" | "episodes";

/** Idle stage — nothing chosen yet. The big type IS the interface. */
function IdleStage({ status }: { status: "idle" | "loading" | "error" }) {
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
        귀로 읽는 시간
      </h2>
      <span
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "0.875rem",
          color: "var(--color-fg-muted)",
          letterSpacing: "0.12em",
          paddingTop: "var(--space-8)",
        }}
      >
        {status === "loading"
          ? "오늘의 팟캐스트를 여는 중…"
          : status === "error"
            ? "목록을 불러오지 못했어요"
            : "오른쪽 목록에서 팟캐스트를 골라 주세요"}
      </span>
    </div>
  );
}

export function ListenApp() {
  const [market, setMarket] = useState<MarketCode>("kr");
  const [shows, setShows] = useState<Show[]>([]);
  const [browsing, setBrowsing] = useState<Browsing>("shows");
  const [activeShow, setActiveShow] = useState<Show | null>(null);
  const [episodeTracks, setEpisodeTracks] = useState<Track[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const requestRef = useRef(0);
  const transcriptTriedRef = useRef(new Set<string>());
  const [lyricsLoading, setLyricsLoading] = useState(false);

  const player = usePlayer(episodeTracks);
  const { track, togglePlay, next, prev, seek, play, pause, resetToStart } = player;

  const loadShows = useCallback(async (mkt: MarketCode) => {
    const requestId = ++requestRef.current;
    setStatus("loading");
    try {
      const loaded = await fetchTopShows(mkt);
      if (requestId !== requestRef.current) return;
      setShows(loaded);
      setStatus("idle");
    } catch {
      if (requestId === requestRef.current) setStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadShows("kr");
  }, [loadShows]);

  const changeMarket = useCallback(
    (mkt: MarketCode) => {
      if (mkt === market) return;
      setMarket(mkt);
      void loadShows(mkt); // the playing queue is untouched — keep listening
    },
    [market, loadShows]
  );

  const selectShow = useCallback(
    async (show: Show) => {
      const requestId = ++requestRef.current;
      setStatus("loading");
      setBrowsing("episodes");
      try {
        const episodes = await fetchEpisodes(show);
        if (requestId !== requestRef.current) return;
        if (episodes.length === 0) throw new Error("no playable episodes");
        resetToStart();
        setActiveShow(show);
        setEpisodeTracks(episodes);
        setStatus("idle");
      } catch {
        if (requestId === requestRef.current) {
          setStatus("error");
          setBrowsing("shows");
        }
      }
    },
    [resetToStart]
  );

  // Back-trace: shows ⇄ episodes without touching playback.
  const showShows = useCallback(() => {
    setBrowsing("shows");
    if (status === "error") setStatus("idle");
  }, [status]);
  const showEpisodes = useCallback(() => {
    if (activeShow) setBrowsing("episodes");
  }, [activeShow]);

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
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  lyrics: lines,
                  plainNote: lines.length > 0 ? t.plainNote : "이 피드는 자막을 제공하지 않아요",
                }
              : t
          )
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

  const marketLabel = MARKETS.find((m) => m.code === market)?.label ?? "";

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

      {/* Middle — reading starts at the right edge: nav rail, tray, stage */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "row-reverse" }}>
        <NavRail
          browsing={browsing}
          activeShow={activeShow}
          track={track}
          marketLabel={marketLabel}
          onRoot={showShows}
          onShow={showEpisodes}
        />

        <Tray
          browsing={browsing}
          shows={shows}
          episodes={player.tracks}
          currentIndex={player.currentIndex}
          isPlaying={player.isPlaying}
          activeShow={activeShow}
          market={market}
          status={status}
          onMarket={changeMarket}
          onSelectShow={selectShow}
          onSelectEpisode={player.select}
          onBack={showShows}
          onRetry={() => void loadShows(market)}
        />

        <main style={{ flex: 1, minWidth: 0, height: "100%" }}>
          {track ? (
            <Lyrics
              key={track.id}
              lyrics={track.lyrics}
              plainLines={track.plainLyrics}
              plainNote={track.plainNote}
              loading={lyricsLoading}
              activeIndex={player.activeLyricIndex}
              onLineClick={player.seek}
            />
          ) : (
            <IdleStage status={status} />
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
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <PlayerBar
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
    </div>
  );
}
