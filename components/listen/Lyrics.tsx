"use client";

import { useEffect, useRef } from "react";
import type { LyricLine } from "@/lib/listen/tracks";

const LATIN_RE = /[A-Za-z]/g;
const CJK_RE = /[぀-ヿ㐀-䶿一-鿿가-힯豈-﫿]/g;

/** A line that is mostly Latin (e.g. the English side of a bilingual show)
 *  should NOT be set vertically — read upright instead. */
function isLatinDominant(s: string): boolean {
  const l = (s.match(LATIN_RE) || []).length;
  const c = (s.match(CJK_RE) || []).length;
  return l > c;
}

/** Attention tone for a line by its distance from the active one: the active
 *  line is full-strength, its neighbours stay legible, and lines further away
 *  fade toward the edges. Past lines dim a touch faster than upcoming ones. */
function toneFor(distance: number, hasActive: boolean): { opacity: number; color: string; weight: number } {
  if (!hasActive) return { opacity: 0.5, color: "var(--color-fg-muted)", weight: 400 };
  const ad = Math.abs(distance);
  const opacity =
    (ad === 1 ? 0.95 : ad === 2 ? 0.7 : ad === 3 ? 0.5 : ad === 4 ? 0.36 : 0.24) * (distance < 0 ? 0.82 : 1);
  const color = ad === 1 ? "var(--color-fg)" : ad === 2 ? "var(--color-fg-muted)" : "var(--color-fg-subtle)";
  return { opacity, color, weight: ad === 1 ? 500 : 400 };
}

/** Karaoke view — lyric lines as columns flowing right-to-left, like verse on
 *  a page. The line you're on is centered and full-strength; nearby lines stay
 *  legible and distant ones fade. Mostly-Latin lines read upright. Tap to seek. */
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
              marginInline: "auto",
              height: "100%",
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "stretch",
              gap: "var(--space-6)",
              padding: "var(--space-8) var(--space-12)",
              boxSizing: "border-box",
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
            {plainLines.map((text, i) =>
              isLatinDominant(text) ? (
                <span
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "100%",
                    boxSizing: "border-box",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      writingMode: "horizontal-tb",
                      width: "4.4em",
                      overflowWrap: "anywhere",
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                      letterSpacing: "0.01em",
                      color: "var(--color-fg-muted)",
                    }}
                  >
                    {text}
                  </span>
                </span>
              ) : (
                <span
                  key={i}
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    lineBreak: "strict",
                    wordBreak: "keep-all",
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                    lineHeight: 1.9,
                    height: "100%",
                    boxSizing: "border-box",
                    color: "var(--color-fg-muted)",
                    flexShrink: 0,
                  }}
                >
                  {text}
                </span>
              )
            )}
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

  const hasActive = activeIndex >= 0;

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
      {/* The large inline padding lets ANY line — including the first and last —
          scroll to the horizontal center, so the active line always sits in the
          middle of the stage with room on both sides. */}
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: "var(--space-8)",
          padding: "var(--space-8) 40vw",
          boxSizing: "border-box",
        }}
      >
        {lyrics.map((line, i) => {
          const isActive = i === activeIndex;
          const latin = isLatinDominant(line.text);
          const tone = toneFor(i - activeIndex, hasActive);
          const fg = isActive ? "var(--color-bg)" : tone.color;
          return (
            <button
              key={i}
              data-line={i}
              onClick={() => onLineClick(line.time)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`${line.text} — 이 소절로 이동`}
              style={{
                flexShrink: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                padding: latin ? "0 var(--space-3)" : "0 var(--space-2)",
                cursor: "pointer",
                fontFamily: "inherit",
                userSelect: "none",
                opacity: isActive ? 1 : tone.opacity,
                transition: "opacity var(--duration-base) var(--easing-out)",
              }}
            >
              {latin ? (
                // Mostly-English line — upright, wrapping into a narrow column
                // so it reads normally (top→bottom) without tilting the head.
                <span
                  style={{
                    writingMode: "horizontal-tb",
                    width: "4.4em",
                    textAlign: "center",
                    overflowWrap: "anywhere",
                    fontSize: "0.9375rem",
                    lineHeight: 1.5,
                    letterSpacing: "0.01em",
                    fontWeight: isActive ? 600 : tone.weight,
                    color: fg,
                    maxHeight: "100%",
                    overflow: "hidden",
                    // The active line wears the accent as a pill hugging its text.
                    background: isActive ? "var(--color-fg)" : "transparent",
                    borderRadius: "var(--radius-lg)",
                    padding: isActive ? "var(--space-4) var(--space-3)" : "0 var(--space-3)",
                    transition: "background var(--duration-base) var(--easing-out), color var(--duration-base) var(--easing-out)",
                  }}
                >
                  {line.text}
                </span>
              ) : (
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    // VERTICAL_TYPOGRAPHY §5 kinsoku + Korean 띄어쓰기 integrity.
                    lineBreak: "strict",
                    wordBreak: "keep-all",
                    fontSize: "1.1875rem",
                    letterSpacing: "0.1em",
                    lineHeight: 1.95,
                    fontWeight: isActive ? 700 : tone.weight,
                    color: fg,
                    maxHeight: "100%",
                    overflow: "hidden",
                    background: isActive ? "var(--color-fg)" : "transparent",
                    borderRadius: "var(--radius-lg)",
                    padding: isActive ? "var(--space-3) var(--space-2)" : "0 var(--space-2)",
                    transition: "background var(--duration-base) var(--easing-out), color var(--duration-base) var(--easing-out)",
                  }}
                >
                  {line.text}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
