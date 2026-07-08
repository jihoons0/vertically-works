"use client";

import type { Show } from "@/lib/listen/podcasts";

/** The podcast browse level: today's top shows as full-height column cells
 *  flowing right-to-left. Tapping a show opens its episodes; it navigates
 *  rather than plays, so the disclosure points down (deeper, along the
 *  reading axis). */
export function ShowShelf({
  shows,
  onSelect,
  header,
}: {
  shows: Show[];
  onSelect: (show: Show) => void;
  /** Rendered at the reading start (rightmost), e.g. the market picker. */
  header?: React.ReactNode;
}) {
  return (
    <div
      role="listbox"
      aria-label="인기 팟캐스트"
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
        maxWidth: "min(52vw, 640px)",
      }}
    >
      {header}
      {shows.map((show, i) => {
        const disabled = !show.feedUrl;
        return (
          <button
            key={show.id}
            className="pressable"
            role="option"
            aria-selected={false}
            aria-disabled={disabled || undefined}
            onClick={() => !disabled && onSelect(show)}
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
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              cursor: disabled ? "default" : "pointer",
              opacity: disabled ? 0.45 : 1,
              fontFamily: "inherit",
              gap: "var(--space-3)",
              animation: `vl-column-in var(--duration-page) var(--easing-out) both`,
              animationDelay: `${i * 40}ms`,
              transition:
                "border-color var(--duration-fast) var(--easing-out), background var(--duration-fast) var(--easing-out)",
            }}
          >
            <span
              style={{
                fontSize: "0.6875rem",
                color: "var(--color-fg-subtle)",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {String(show.rank).padStart(2, "0")}
            </span>

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
                {show.title}
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
                {show.publisher}
              </span>
            </div>

            {disabled ? (
              <span
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "0.625rem",
                  color: "var(--color-fg-subtle)",
                  letterSpacing: "0.05em",
                }}
              >
                피드 없음
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
