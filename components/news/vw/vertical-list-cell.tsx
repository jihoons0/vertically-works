"use client";

/**
 * VerticalListCell · the primitive behind every vertical list.
 *
 * Rotate the cell's anatomy, not the cell: leading moves to the top (the
 * reading start), title and subtitle become vertical text columns reading
 * right→left, and the disclosure accessory sits at the bottom pointing down,
 * along the reading axis, not across it. Stack cells in a container with
 * `display: flex; flex-direction: row-reverse` (plus `role="listbox"` when
 * cells are selectable options) so the first cell sits at the reading start.
 *
 * Docs: https://vertically.works/components/vertical-list-cell
 */

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export interface VerticalListCellProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  /** Main label, set vertically. (Vertically News: relaxed to ReactNode so the
   *  vertical-text pipeline can mark tate-chu-yoko digit runs.) */
  title: ReactNode;
  /** Secondary label, set vertically beside the title (to its left · read second). */
  subtitle?: ReactNode;
  /** Body/summary set vertically to the left of the title · wraps to at most
   *  2 columns, then clips. Reads after the title, before the subtitle. */
  body?: ReactNode;
  /** Slot at the top of the column · the reading start (index, icon, avatar…). */
  leading?: ReactNode;
  /** Bottom accessory. `chevron` points down: "continues along the reading axis". */
  accessory?: "chevron" | "none" | ReactNode;
  /** When provided, the cell renders `aria-selected` (pair with a `role="listbox"` parent). */
  selected?: boolean;
  /** Column height · full-height columns keep the list's reading rhythm. */
  height?: number;
  style?: CSSProperties;
}

export function VerticalListCell({
  title,
  subtitle,
  body,
  leading,
  accessory = "chevron",
  selected,
  height = 240,
  style,
  ...rest
}: VerticalListCellProps) {
  return (
    <button
      data-vw="list-cell"
      type="button"
      className="pressable"
      role={selected !== undefined ? "option" : undefined}
      aria-selected={selected}
      style={{
        // The cell's inner layout is LTR so `row-reverse` keeps the title at
        // the reading start (right) even when an ancestor scroller is `rtl`.
        direction: "ltr",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        gap: "var(--space-3)",
        height,
        padding: "var(--space-4) var(--space-3)",
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${selected ? "var(--color-fg)" : "var(--color-border)"}`,
        background: selected ? "var(--color-bg-subtle)" : "var(--color-bg)",
        color: "var(--color-fg)",
        cursor: "pointer",
        fontFamily: "inherit",
        transition:
          "border-color var(--duration-fast) var(--easing-default), background var(--duration-fast) var(--easing-default)",
        ...style,
      }}
      {...rest}
    >
      {leading && (
        <span aria-hidden style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {leading}
        </span>
      )}

      {/* Title rightmost, subtitle to its left · reading order within the cell.
          `overflow: hidden` + `minHeight: 0` keep every column clipped to the
          cell's height so the body can't spill past the bottom. */}
      <span
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-start",
          gap: "var(--space-1)",
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* Title · a single column, clipped to the cell's block-size (there is
            no ellipsis in vertical text — the clip is the affordance). */}
        <span
          className="fade-edge-block"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.9375rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            maxHeight: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {title}
        </span>
        {/* Body · lines run top→bottom (capped to the cell height), wrapping
            into at most 2 columns (width = 2 line-boxes), then clips. In
            vertical-rl the physical width is the block axis = column count. */}
        {body && (
          <span
            className="fade-edge-block"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.75rem",
              lineHeight: 1.7,
              color: "var(--color-fg-muted)",
              maxHeight: "100%",
              width: "calc(2 * 1.7em)",
              whiteSpace: "normal",
              overflow: "hidden",
            }}
          >
            {body}
          </span>
        )}
        {subtitle && (
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.75rem",
              color: "var(--color-fg-subtle)",
              letterSpacing: "0.05em",
              paddingTop: 2,
              maxHeight: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {subtitle}
          </span>
        )}
      </span>

      {accessory === "chevron" ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          style={{ color: "var(--color-fg-subtle)", flexShrink: 0 }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      ) : accessory === "none" ? null : (
        <span aria-hidden style={{ flexShrink: 0 }}>{accessory}</span>
      )}
    </button>
  );
}
