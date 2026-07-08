"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayer, formatTime } from "@/lib/listen/store";
import { TRACKS, type Track } from "@/lib/listen/tracks";
import { fetchChart, fetchPlainLyrics, type MarketCode } from "@/lib/listen/charts";
import { fetchTopShows, fetchEpisodes, fetchTranscriptLines, type Show } from "@/lib/listen/podcasts";
import { Playlist } from "@/components/listen/Playlist";
import { ShowShelf } from "@/components/listen/ShowShelf";
import { Lyrics } from "@/components/listen/Lyrics";
import { Transport } from "@/components/listen/Transport";
import { Scrubber } from "@/components/listen/Scrubber";
import { VolumeControl } from "@/components/listen/VolumeControl";
import { VSwitch } from "@/components/listen/VSwitch";
import { MarketPicker } from "@/components/listen/MarketPicker";
import { ThemeToggle } from "@/components/listen/ThemeToggle";

type Source = "library" | "charts" | "podcasts";

/** Poster view — when karaoke is off, the title IS the interface. */
function NowPlaying({ track }: { track: Track }) {
  return (
    <div
      key={track.id}
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
        aria-live="polite"
        style={{
          margin: 0,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "clamp(2.75rem, 9vh, 4.75rem)",
          fontWeight: 300,
          letterSpacing: "0.16em",
          lineHeight: 1.3,
          maxHeight: "82%",
          overflow: "hidden",
          color: "var(--color-fg)",
        }}
      >
        {track.title}
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-start",
          gap: "var(--space-3)",
          paddingTop: "var(--space-8)",
          maxHeight: "60%",
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.875rem",
            color: "var(--color-fg-muted)",
            letterSpacing: "0.12em",
          }}
        >
          {track.artist}
        </span>
        {track.titleLatin && (
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.6875rem",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--color-fg-subtle)",
              letterSpacing: "0.06em",
            }}
          >
            {track.titleLatin}
          </span>
        )}
      </div>
      {track.credit && (
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.625rem",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--color-fg-subtle)",
            letterSpacing: "0.05em",
            alignSelf: "flex-end",
            paddingBottom: "var(--space-4)",
          }}
        >
          {track.credit}
        </span>
      )}
    </div>
  );
}

export function ListenApp() {
  const [source, setSource] = useState<Source>("library");
  const [market, setMarket] = useState<MarketCode>("kr");
  const [chartTracks, setChartTracks] = useState<Track[]>([]);
  const [chartStatus, setChartStatus] = useState<"idle" | "loading" | "error">("idle");
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const chartRequestRef = useRef(0);

  // Podcast browsing: shows are a browse level, episodes become the queue.
  const [shows, setShows] = useState<Show[]>([]);
  const [activeShow, setActiveShow] = useState<Show | null>(null);
  const [episodeTracks, setEpisodeTracks] = useState<Track[]>([]);
  const [podStatus, setPodStatus] = useState<"idle" | "loading" | "error">("idle");
  const podRequestRef = useRef(0);
  const transcriptTriedRef = useRef(new Set<string>());

  const tracks =
    source === "charts" && chartTracks.length > 0
      ? chartTracks
      : source === "podcasts" && episodeTracks.length > 0
        ? episodeTracks
        : TRACKS;
  const player = usePlayer(tracks, { persist: source === "library" });
  const { track, togglePlay, next, prev, toggleKaraoke, play, pause, resetToStart } = player;

  const loadChart = useCallback(
    async (mkt: MarketCode, switchAfter: boolean) => {
      const requestId = ++chartRequestRef.current;
      setChartStatus("loading");
      try {
        const loaded = await fetchChart(mkt);
        if (requestId !== chartRequestRef.current) return; // superseded
        setChartTracks(loaded);
        setChartStatus("idle");
        resetToStart();
        if (switchAfter) setSource("charts");
      } catch {
        if (requestId === chartRequestRef.current) setChartStatus("error");
      }
    },
    [resetToStart]
  );

  const leavePodcasts = useCallback(() => {
    setActiveShow(null);
    setEpisodeTracks([]);
    setPodStatus("idle");
  }, []);

  const toggleCharts = useCallback(() => {
    if (source === "charts") {
      resetToStart();
      setSource("library");
      return;
    }
    leavePodcasts();
    if (chartTracks.length > 0) {
      resetToStart();
      setSource("charts");
      return;
    }
    void loadChart(market, true);
  }, [source, chartTracks.length, market, loadChart, resetToStart, leavePodcasts]);

  const loadShows = useCallback(async (mkt: MarketCode) => {
    const requestId = ++podRequestRef.current;
    setPodStatus("loading");
    try {
      const loaded = await fetchTopShows(mkt);
      if (requestId !== podRequestRef.current) return;
      setShows(loaded);
      setPodStatus("idle");
    } catch {
      if (requestId === podRequestRef.current) setPodStatus("error");
    }
  }, []);

  const togglePodcasts = useCallback(() => {
    if (source === "podcasts") {
      resetToStart();
      leavePodcasts();
      setSource("library");
      return;
    }
    resetToStart();
    setSource("podcasts");
    if (shows.length === 0) void loadShows(market);
  }, [source, shows.length, market, loadShows, resetToStart, leavePodcasts]);

  const selectShow = useCallback(
    async (show: Show) => {
      const requestId = ++podRequestRef.current;
      setPodStatus("loading");
      setActiveShow(show);
      try {
        const episodes = await fetchEpisodes(show);
        if (requestId !== podRequestRef.current) return;
        if (episodes.length === 0) throw new Error("no playable episodes");
        setEpisodeTracks(episodes);
        setPodStatus("idle");
        resetToStart();
      } catch {
        if (requestId === podRequestRef.current) {
          setPodStatus("error");
          setActiveShow(null);
        }
      }
    },
    [resetToStart]
  );

  const backToShows = useCallback(() => {
    resetToStart();
    setActiveShow(null);
    setEpisodeTracks([]);
  }, [resetToStart]);

  const changeMarket = useCallback(
    (mkt: MarketCode) => {
      if (mkt === market) return;
      setMarket(mkt);
      if (source === "podcasts") {
        setActiveShow(null);
        setEpisodeTracks([]);
        void loadShows(mkt);
      } else {
        void loadChart(mkt, false);
      }
    },
    [market, source, loadChart, loadShows]
  );

  // Lazy timed-transcript fetch for the current episode (Podcasting 2.0).
  // Full audio + known timeline → the karaoke view gets REAL sync.
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
                  plainNote: lines.length > 0 ? t.plainNote : "대본 없는 에피소드 · 소개 글",
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

  // Lazy verse fetch for the current chart track (display-only, so it can
  // trail behind playback start).
  useEffect(() => {
    if (!track?.isPreview || track.plainLyrics !== undefined) return;
    const { id, title, artist } = track;
    let cancelled = false;
    setLyricsLoading(true);
    fetchPlainLyrics(title, artist)
      .then((plain) => {
        if (cancelled) return;
        setChartTracks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, plainLyrics: plain ?? [] } : t))
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

  // Keyboard: Space = play/pause; ↑/↓ = prev/next along the reading axis;
  // ←/→ follow the column flow (columns advance leftward); L = karaoke.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // Let focused buttons/sliders keep their own Space/Enter/arrow behavior.
      if (target && (target.tagName === "BUTTON" || target.getAttribute("role") === "slider")) {
        if (e.code === "Space" || e.code === "Enter" || e.key.startsWith("Arrow")) return;
      }
      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowUp":
          e.preventDefault();
          prev();
          break;
        case "ArrowDown":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
          e.preventDefault();
          next();
          break;
        case "ArrowRight":
          e.preventDefault();
          prev();
          break;
        case "KeyL":
          toggleKaraoke();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, next, prev, toggleKaraoke]);

  // Hardware/system media keys.
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
  }, [play, pause, prev, next]);

  const inCharts = source === "charts";
  const inPodcasts = source === "podcasts";
  const busy = chartStatus === "loading" || podStatus === "loading";
  const failed = chartStatus === "error" || podStatus === "error";

  return (
    <div
      style={{
        height: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row-reverse", // reading starts at the right edge
        background: "var(--color-bg)",
        color: "var(--color-fg)",
      }}
    >
      <audio {...player.audioProps} />

      {/* Wordmark — the reading start */}
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-6) var(--space-4)",
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            margin: 0,
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
          }}
        >
          세로로 듣기
        </h1>
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.625rem",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--color-fg-subtle)",
            letterSpacing: "0.08em",
          }}
        >
          Vertically Listen
        </span>
      </header>

      {/* Shelf — library, today's chart, top shows, or a show's episodes */}
      {inPodcasts && !activeShow ? (
        <ShowShelf
          shows={shows}
          onSelect={selectShow}
          header={<MarketPicker market={market} onChange={changeMarket} disabled={busy} />}
        />
      ) : (
        <Playlist
          tracks={tracks}
          currentIndex={player.currentIndex}
          isPlaying={player.isPlaying}
          onSelect={player.select}
          label={inCharts ? "오늘의 차트" : inPodcasts ? (activeShow?.title ?? "에피소드") : "재생 목록"}
          header={
            inCharts ? (
              <MarketPicker market={market} onChange={changeMarket} disabled={busy} />
            ) : inPodcasts && activeShow ? (
              <button
                className="pressable"
                onClick={backToShows}
                aria-label="팟캐스트 목록으로 돌아가기"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  padding: "var(--space-3) var(--space-2)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  flexShrink: 0,
                  color: "var(--color-fg-muted)",
                }}
              >
                {/* Back = up the reading axis, like the previous column */}
                <span aria-hidden style={{ transform: "rotate(90deg)", fontSize: "1rem", lineHeight: 1 }}>
                  ‹
                </span>
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  목록
                </span>
              </button>
            ) : undefined
          }
        />
      )}

      {/* Stage — karaoke verse or the title poster */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          borderRight: "1px solid var(--color-border)",
          borderLeft: "1px solid var(--color-border)",
        }}
      >
        {player.karaokeOn ? (
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
          <NowPlaying track={track} />
        )}
      </main>

      {/* Controls rail — the far (left) edge */}
      <aside
        className="vl-rail"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-4)",
          gap: "var(--space-4)",
          flexShrink: 0,
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }}>
          <ThemeToggle />
          <VSwitch label="가사" ariaLabel="가사 보기 (카라오케 모드)" on={player.karaokeOn} onToggle={toggleKaraoke} />
          <VSwitch label="차트" ariaLabel="오늘의 차트 (30초 미리 듣기)" on={inCharts} onToggle={toggleCharts} />
          <VSwitch label="팟캐스트" ariaLabel="인기 팟캐스트 (전체 에피소드)" on={inPodcasts} onToggle={togglePodcasts} />
          {(busy || failed) && (
            <span
              role="status"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "0.625rem",
                color: "var(--color-fg-subtle)",
                letterSpacing: "0.05em",
              }}
            >
              {busy ? "여는 중…" : "실패 · 다시 시도"}
            </span>
          )}
        </div>

        <Transport
          isPlaying={player.isPlaying}
          onTogglePlay={togglePlay}
          onNext={next}
          onPrev={prev}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)", flexShrink: 0 }}>
          <VolumeControl
            volume={player.volume}
            muted={player.muted}
            onVolumeChange={player.setVolume}
            onToggleMute={player.toggleMute}
            length={72}
          />
          <Scrubber
            currentTime={player.currentTime}
            duration={player.duration}
            onSeek={player.seek}
            length={120}
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--color-fg)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatTime(player.currentTime)}
            </span>
            <span
              style={{
                fontSize: "0.625rem",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--color-fg-subtle)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatTime(player.duration)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
