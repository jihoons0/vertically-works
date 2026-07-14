"use client";

/**
 * Masthead · the vertical newspaper nameplate (NEW · registry candidate).
 *
 * Vertical wordmark 「세로신문 / 縦書新聞 / 直書新聞」 + today's date with digit
 * groups ≤3 set upright (tate-chu-yoko, 「7月13日」 style). Floats translucent
 * over the story columns — never an opaque bar; a scroll-edge fade dissolves
 * its lower boundary instead of a 1px divider.
 */

import { VerticalText } from "./VerticalText";
import { mastheadDate } from "@/lib/news/time";
import { WORDMARKS, type EditionId } from "@/lib/news/sources";

export function Masthead({
  edition,
  compact = false,
  wordmark = true,
}: {
  edition: EditionId;
  compact?: boolean;
  /** Hide the wordmark and keep only the date (dense chrome). */
  wordmark?: boolean;
}) {
  return (
    <div
      data-vw="masthead"
      style={{
        display: "flex",
        flexDirection: "row-reverse", // wordmark at the reading start (right)
        alignItems: "flex-start",
        gap: "var(--space-4)",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {wordmark && (
      <h1
        className="vt-reading"
        style={{
          margin: 0,
          fontSize: compact ? "1.25rem" : "1.5rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          lineHeight: 1.25,
          color: "var(--color-fg)",
          // Wraps the wordmark into two columns · keeps the chrome short.
          maxHeight: compact ? 66 : 82,
        }}
      >
        <VerticalText text={WORDMARKS[edition]} chrome />
      </h1>
      )}
      <time
        className="vt-reading"
        dateTime={new Date().toISOString().slice(0, 10)}
        style={{
          fontSize: compact ? "0.6875rem" : "0.75rem",
          letterSpacing: "0.14em",
          lineHeight: 1.6,
          color: "var(--color-fg-muted)",
          paddingTop: 2,
          maxHeight: compact ? 66 : 82,
        }}
      >
        <VerticalText text={mastheadDate(edition)} chrome />
      </time>
    </div>
  );
}
