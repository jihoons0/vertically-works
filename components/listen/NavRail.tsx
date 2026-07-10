"use client";

import type { Show } from "@/lib/listen/podcasts";
import type { Track } from "@/lib/listen/tracks";
import type { Strings } from "@/lib/listen/i18n";

/** The vertical nav rail at the reading start (far right): the trace runs
 *  top→bottom — choose-podcast, then the chosen show (with its artwork),
 *  then the playing episode. The crumbs are the hyperlinks that open the
 *  browse sheet. */
export function NavRail({
  t,
  sheetLevel,
  activeShow,
  track,
  onOpenShows,
  onOpenEpisodes,
}: {
  t: Strings;
  sheetLevel: null | "shows" | "episodes";
  activeShow: Show | null;
  track: Track | undefined;
  onOpenShows: () => void;
  onOpenEpisodes: () => void;
}) {
  return (
    <nav
      aria-label={t.trace}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-5) var(--space-2)",
        width: 64,
        flexShrink: 0,
        borderLeft: "1px solid var(--color-border)",
        minHeight: 0,
      }}
    >
      <button
        className="pressable"
        onClick={onOpenShows}
        aria-haspopup="dialog"
        aria-expanded={sheetLevel === "shows"}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "0.8125rem",
          fontWeight: sheetLevel === "shows" ? 600 : 400,
          letterSpacing: "0.08em",
          color: sheetLevel === "shows" ? "var(--color-fg)" : "var(--color-fg-muted)",
          background: "none",
          border: "none",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-2) var(--space-1)",
          cursor: "pointer",
          fontFamily: "inherit",
          flexShrink: 0,
          whiteSpace: "nowrap",
          textDecoration: "underline",
          textDecorationColor: "var(--color-border-strong)",
          textUnderlineOffset: 4,
          transition: "color var(--duration-fast) var(--easing-out)",
        }}
      >
        {t.choosePodcast}
      </button>

      {activeShow && (
        <>
          <span aria-hidden style={{ color: "var(--color-fg-subtle)", fontSize: "0.875rem", lineHeight: 1, transform: "rotate(90deg)", flexShrink: 0 }}>
            ›
          </span>
          <button
            className="pressable"
            onClick={onOpenEpisodes}
            aria-label={t.episodeListOf(activeShow.title)}
            aria-haspopup="dialog"
            aria-expanded={sheetLevel === "episodes"}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-2)",
              background: sheetLevel === "episodes" ? "var(--color-bg-muted)" : "none",
              border: "none",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-2)",
              cursor: "pointer",
              fontFamily: "inherit",
              minHeight: 0,
              flexShrink: 1,
              overflow: "hidden",
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
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--color-fg)",
                letterSpacing: "0.06em",
                maxHeight: 170,
                overflow: "hidden",
                whiteSpace: "nowrap", // one column — clip, never wrap sideways
              }}
            >
              {activeShow.title}
            </span>
          </button>
        </>
      )}

      {track && (
        <>
          <span aria-hidden style={{ color: "var(--color-fg-subtle)", fontSize: "0.875rem", lineHeight: 1, transform: "rotate(90deg)", flexShrink: 0 }}>
            ›
          </span>
          <span
            aria-live="polite"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.75rem",
              color: "var(--color-fg-muted)",
              letterSpacing: "0.05em",
              minHeight: 0,
              flexShrink: 1,
              overflow: "hidden",
              whiteSpace: "nowrap", // one column — clip, never wrap sideways
            }}
          >
            {track.title}
          </span>
        </>
      )}
    </nav>
  );
}
