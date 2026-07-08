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
import { Playlist } from "@/components/listen/Playlist";
import { ShowShelf } from "@/components/listen/ShowShelf";
import { Lyrics } from "@/components/listen/Lyrics";
import { PlayerBar } from "@/components/listen/PlayerBar";
import { MarketPicker } from "@/components/listen/MarketPicker";
import { ThemeToggle } from "@/components/listen/ThemeToggle";

type Browsing = "shows" | "episodes";

/** Idle stage — nothing chosen yet. The big type IS the interface. */
function IdleStage({ status, onRetry }: { status: "idle" | "loading" | "error"; onRetry: () => void }) {
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
      {status === "error" ? (
        <button
          className="pressable"
          onClick={onRetry}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.875rem",
            color: "var(--color-fg-muted)",
            letterSpacing: "0.1em",
            background: "none",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-4) var(--space-2)",
            cursor: "pointer",
            fontFamily: "inherit",
            paddingTop: "var(--space-4)",
          }}
        >
          목록을 불러오지 못했어요 · 다시 시도
        </button>
      ) : (
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
          {status === "loading" ? "오늘의 팟캐스트를 여는 중…" : "오른쪽 선반에서 팟캐스트를 골라 주세요"}
        </span>
      )}
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
      try {
        const episodes = await fetchEpisodes(show);
        if (requestId !== requestRef.current) return;
        if (episodes.length === 0) throw new Error("no playable episodes");
        resetToStart();
        setActiveShow(show);
        setEpisodeTracks(episodes);
        setBrowsing("episodes");
        setStatus("idle");
      } catch {
        if (requestId === requestRef.current) setStatus("error");
      }
    },
    [resetToStart]
  );

  // Back-trace: shows ⇄ episodes without touching playback.
  const showShows = useCallback(() => setBrowsing("shows"), []);
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

  // Hardware/system media keys + lock-screen scrubbing.
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

      {/* Header — the horizontal navigation zone: where you are, what plays */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-6)",
          padding: "var(--space-4) var(--space-6)",
          borderBottom: "1px solid var(--color-border)",
          flexShrink: 0,
          minHeight: 64,
        }}
      >
        <nav aria-label="위치" style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", minWidth: 0 }}>
          {browsing === "episodes" ? (
            <button
              className="pressable"
              onClick={showShows}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)",
                fontSize: "0.8125rem",
                color: "var(--color-fg-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                padding: "var(--space-2)",
                borderRadius: "var(--radius-lg)",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              <span aria-hidden>‹</span> 인기 팟캐스트
            </button>
          ) : (
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
              인기 팟캐스트 <span style={{ color: "var(--color-fg-subtle)", fontWeight: 400 }}>· {marketLabel}</span>
            </span>
          )}

          {activeShow && (
            <>
              <span aria-hidden style={{ color: "var(--color-fg-subtle)" }}>
                ›
              </span>
              <button
                className="pressable"
                onClick={showEpisodes}
                aria-label={`${activeShow.title} 에피소드 목록`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  background: browsing === "episodes" ? "var(--color-bg-muted)" : "none",
                  border: "none",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-1) var(--space-3) var(--space-1) var(--space-1)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  minWidth: 0,
                  transition: "background var(--duration-fast) var(--easing-out)",
                }}
              >
                {activeShow.artwork && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeShow.artwork}
                    alt=""
                    width={40}
                    height={40}
                    style={{ borderRadius: "var(--radius-lg)", display: "block", flexShrink: 0 }}
                  />
                )}
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--color-fg)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 220,
                  }}
                >
                  {activeShow.title}
                </span>
              </button>
            </>
          )}

          {track && (
            <>
              <span aria-hidden style={{ color: "var(--color-fg-subtle)" }}>
                ›
              </span>
              <span
                aria-live="polite"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-fg-muted)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minWidth: 0,
                }}
              >
                {track.title}
              </span>
            </>
          )}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flexShrink: 0 }}>
          <span
            style={{
              fontSize: "0.625rem",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--color-fg-subtle)",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            세로로 듣기 · Vertically Listen
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Middle — vertical reading zone: shelf at the reading start, stage left */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "row-reverse" }}>
        {browsing === "shows" ? (
          <ShowShelf
            shows={shows}
            onSelect={selectShow}
            header={<MarketPicker market={market} onChange={changeMarket} disabled={status === "loading"} />}
          />
        ) : (
          <Playlist
            tracks={player.tracks}
            currentIndex={player.currentIndex}
            isPlaying={player.isPlaying}
            onSelect={player.select}
            label={activeShow ? `${activeShow.title} 에피소드` : "에피소드"}
          />
        )}

        <main style={{ flex: 1, minWidth: 0, height: "100%", borderRight: "1px solid var(--color-border)" }}>
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
            <IdleStage status={status} onRetry={() => void loadShows(market)} />
          )}
        </main>
      </div>

      {/* Bottom — the player bar, centered like a normal player */}
      <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-3) var(--space-6) var(--space-5)", flexShrink: 0 }}>
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
