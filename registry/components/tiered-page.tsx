"use client";

/**
 * TieredPage · the 절별 book-page layout.
 *
 * A static page of vertical text split into two stacked tiers, each a run of
 * top→bottom columns reading right→left — the vertical answer to the
 * two-column magazine spread. A long text would otherwise leave a tall page
 * mostly empty (one tier of short columns) or force a scroll; two tiers let
 * the page fill both dimensions while every column keeps its reading axis.
 *
 * Two rules carry the whole hierarchy: when columns are numbered, a hairline
 * separates the number band from the bodies; a heavier rule divides the two
 * tiers. Without numbers it reads as a plain two-row spread — still uniquely
 * vertical, since the rows are runs of columns, not lines.
 *
 * The page never scrolls · turn pages with external controls along the
 * reading axis (see chapter-navigation). Columns are pinned to a fixed width
 * so a packed tier can never compress them into each other.
 *
 * Docs: https://vertically.works/components/tiered-page
 */

import type { CSSProperties } from "react";

export interface TieredPageColumn {
  /** Upright number/marker in the header band (verse number). Omit on a continuation column. */
  label?: string;
  /** The column's text, set vertically. Overflow past the tier's height is clipped. */
  text: string;
}

export interface TieredPageProps {
  /** Columns in reading order · the first column sits at the top-right of the page. */
  columns: TieredPageColumn[];
  /** Show the number band + hairline. Defaults to true when any column has a label. */
  numbered?: boolean;
  /** Total page height · each tier gets half, minus the divider. */
  height?: number;
  /** Fixed column width · pinned so tiers can never compress columns together. */
  columnWidth?: number;
  /** Gap between adjacent columns. */
  columnGap?: number;
  style?: CSSProperties;
}

/** Number line height + gap to the hairline · the band the hairline underlines. */
const BAND_HEIGHT = 18;
const HAIRLINE_Y = BAND_HEIGHT + 8;
const BODY_TOP = HAIRLINE_Y + 10;

export function TieredPage({
  columns,
  numbered = columns.some((c) => c.label != null),
  height = 520,
  columnWidth = 30,
  columnGap = 14,
  style,
}: TieredPageProps) {
  // First half of the reading order fills the top tier, the rest flow into the bottom.
  const perTier = Math.ceil(columns.length / 2);
  const tiers = [columns.slice(0, perTier), columns.slice(perTier)];

  return (
    <div
      data-vw="tiered-page"
      style={{
        display: "flex",
        flexDirection: "column",
        height,
        color: "var(--color-fg)",
        ...style,
      }}
    >
      {tiers.map((cols, t) => (
        <div key={t} style={{ display: "contents" }}>
          {/* The tier divider · heavier than the number hairline, tighter below
              (next tier's number side) than above (previous tier's text side). */}
          {t > 0 && (
            <div
              aria-hidden
              style={{
                height: 1,
                background: "var(--color-border-strong)",
                margin: "20px 0 12px",
                flexShrink: 0,
              }}
            />
          )}

          {/* One tier: columns reading right→left, pinned to the top. */}
          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "flex-start",
              gap: columnGap,
            }}
          >
            {numbered && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: HAIRLINE_Y,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "var(--color-border)",
                }}
              />
            )}

            {cols.map((col, i) => (
              <div
                key={i}
                style={{
                  width: columnWidth,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: 0,
                }}
              >
                {/* Number band · short numerals stay upright (tate-chu-yoko), so the
                    band is plain horizontal text; continuation columns keep the
                    empty band so every body starts on the same line. */}
                {numbered && (
                  <span
                    style={{
                      height: BAND_HEIGHT,
                      flexShrink: 0,
                      fontSize: "0.6875rem",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      color: "var(--color-fg-subtle)",
                      display: "flex",
                      alignItems: "center",
                      userSelect: "none",
                    }}
                  >
                    {col.label}
                  </span>
                )}

                {/* One column = one line · never wrap into a second line inside the
                    column (that breaks the packing); overflow past the tier clips. */}
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    paddingTop: numbered ? BODY_TOP - BAND_HEIGHT : 0,
                    flex: 1,
                    minHeight: 0,
                    overflow: "hidden",
                  }}
                >
                  {col.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
