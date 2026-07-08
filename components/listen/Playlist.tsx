"use client";

import type { Track } from "@/lib/listen/tracks";

/** The playlist is a shelf of full-height column cells flowing right-to-left —
 *  the vertical list-cell primitive: leading index at the top, vertical
 *  title + subtitle, trailing status pill or disclosure at the bottom. */
export function Playlist({
  tracks,
  currentIndex,
  isPlaying,
  onSelect,
  header,
  label = "재생 목록",
}: {
  tracks: Track[];
  currentIndex: number;
  isPlaying: boolean;
  onSelect: (index: number) => void;
  /** Rendered at the reading start (rightmost), e.g. the market picker. */
  header?: React.ReactNode;
  label?: string;
}) {
  return (
    <div
      role="listbox"
      aria-label={label}
      className="vl-rail"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: "var(--space-3)",
        overflowX: "auto",
        overflowY: "hidden",
        padding: "var(--space-6) var(--space-5)",
        flexShrink: 0,
        // The shelf scrolls within itself; the stage keeps its room.
        maxWidth: "min(52vw, 640px)",
      }}
    >
      {header}
      {tracks.map((track, i) => {
        const isCurrent = i === currentIndex;
        const unplayable = !track.src;
        return (
          <button
            key={track.id}
            className="pressable"
            role="option"
            aria-selected={isCurrent}
            aria-disabled={unplayable || undefined}
            onClick={() => !unplayable && onSelect(i)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              width: 80,
              height: "min(100%, 420px)",
              minHeight: 280,
              padding: "var(--space-4) var(--space-2)",
              borderRadius: "var(--radius-2xl)",
              border: isCurrent ? "1px solid var(--color-fg)" : "1px solid var(--color-border)",
              background: isCurrent ? "var(--color-bg-subtle)" : "var(--color-bg)",
              boxShadow: isCurrent ? "var(--shadow-column)" : "none",
              cursor: unplayable ? "default" : "pointer",
              opacity: unplayable ? 0.45 : 1,
              fontFamily: "inherit",
              gap: "var(--space-3)",
              animation: `vl-column-in var(--duration-page) var(--easing-out) both`,
              animationDelay: `${i * 40}ms`,
              transition:
                "border-color var(--duration-fast) var(--easing-out), background var(--duration-fast) var(--easing-out), box-shadow var(--duration-fast) var(--easing-out)",
            }}
          >
            {/* Leading — track number at the reading-start (top) edge */}
            <span
              style={{
                fontSize: "0.6875rem",
                color: "var(--color-fg-subtle)",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Title + subtitle — vertical text, reading R→L */}
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
                gap: "var(--space-2)",
                flex: 1,
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--color-fg)",
                  letterSpacing: "0.06em",
                  maxHeight: "100%",
                  overflow: "hidden",
                }}
              >
                {track.title}
              </span>
              <span
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "0.6875rem",
                  color: "var(--color-fg-subtle)",
                  letterSpacing: "0.05em",
                  paddingTop: 2,
                  maxHeight: "100%",
                  overflow: "hidden",
                }}
              >
                {track.artist}
              </span>
            </div>

            {/* Trailing accessory — status pill on the current track,
                a down-pointing disclosure on the rest */}
            {unplayable ? (
              <span
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "0.625rem",
                  color: "var(--color-fg-subtle)",
                  letterSpacing: "0.05em",
                }}
              >
                재생 불가
              </span>
            ) : isCurrent ? (
              <span
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  color: "var(--color-bg)",
                  background: "var(--color-fg)",
                  borderRadius: "var(--radius-full)",
                  padding: "var(--space-2) 2px",
                  letterSpacing: "0.05em",
                }}
              >
                {isPlaying ? "재생 중" : "일시 정지"}
              </span>
            ) : (
              <span
                aria-hidden
                style={{
                  transform: "rotate(90deg)",
                  fontSize: "1rem",
                  color: "var(--color-fg-subtle)",
                  lineHeight: 1,
                }}
              >
                ›
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
