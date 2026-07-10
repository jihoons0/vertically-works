"use client";

import { useEffect, useRef } from "react";
import type { LyricLine } from "@/lib/listen/tracks";

/** Karaoke view — lyric lines as vertical columns flowing right-to-left,
 *  like verse on a page. The active line carries the accent border; past
 *  lines recede, upcoming lines wait. Tap a line to seek to it. */
export function Lyrics({
  lyrics,
  activeIndex,
  onLineClick,
  plainLines,
  plainNote,
  loading = false,
  introLabel = "에피소드 소개",
  loadingText = "자막 찾는 중…",
  emptyText = "자막이 없는 에피소드입니다",
}: {
  lyrics: LyricLine[];
  activeIndex: number;
  onLineClick: (time: number) => void;
  /** Untimed verse (chart previews, episode notes): no highlight or seek. */
  plainLines?: string[];
  /** Caption explaining why the verse isn't synced. */
  plainNote?: string;
  loading?: boolean;
  introLabel?: string;
  loadingText?: string;
  emptyText?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep the active line in view as playback advances.
  useEffect(() => {
    if (activeIndex < 0) return;
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-line="${activeIndex}"]`);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  if (lyrics.length === 0) {
    // Untimed intro panel (show notes) — visibly NOT subtitles: it has a
    // heading and quieter type, so nobody expects it to follow the audio.
    if (plainLines && plainLines.length > 0) {
      return (
        <div
          style={{
            height: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            display: "flex",
            animation: "vl-fade-in var(--duration-slow) var(--easing-out) both",
          }}
        >
          <div
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              gap: "var(--space-6)",
              padding: "var(--space-10) var(--space-12)",
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "var(--color-fg)",
                paddingLeft: "var(--space-3)",
                flexShrink: 0,
              }}
            >
              {introLabel}
            </span>
            {plainLines.map((text, i) => (
              <span
                key={i}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  lineHeight: 1.9,
                  maxHeight: "100%",
                  color: "var(--color-fg-muted)",
                  flexShrink: 0,
                }}
              >
                {text}
              </span>
            ))}
            {plainNote && (
              <span
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "0.625rem",
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--color-fg-subtle)",
                  letterSpacing: "0.05em",
                  alignSelf: "flex-end",
                  paddingLeft: "var(--space-4)",
                  flexShrink: 0,
                }}
              >
                {plainNote}
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.9375rem",
            color: "var(--color-fg-subtle)",
            letterSpacing: "0.1em",
          }}
        >
          {loading ? loadingText : emptyText}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        display: "flex",
        animation: "vl-fade-in var(--duration-slow) var(--easing-out) both",
      }}
    >
      {/* margin:auto centers short songs and yields to scrolling on long ones */}
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: "var(--space-8)",
          padding: "var(--space-10) var(--space-12)",
        }}
      >
        {lyrics.map((line, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <button
              key={i}
              data-line={i}
              onClick={() => onLineClick(line.time)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`${line.text} — 이 소절로 이동`}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "1.25rem",
                letterSpacing: "0.12em",
                lineHeight: 1.9,
                maxHeight: "100%",
                fontWeight: isActive ? 600 : 400,
                // Karaoke: the line you're on is unmistakable — inverted.
                color: isActive
                  ? "var(--color-bg)"
                  : isPast
                    ? "var(--color-fg-subtle)"
                    : "var(--color-fg-muted)",
                background: isActive ? "var(--color-fg)" : "transparent",
                border: "none",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-3) 3px",
                cursor: "pointer",
                fontFamily: "inherit",
                userSelect: "none",
                flexShrink: 0,
                transition:
                  "color var(--duration-base) var(--easing-out), background var(--duration-base) var(--easing-out), border-color var(--duration-base) var(--easing-out)",
              }}
            >
              {line.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
