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
  /** Main label, set vertically. */
  title: string;
  /** Secondary label, set vertically beside the title (to its left · read second). */
  subtitle?: string;
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

      {/* Title rightmost, subtitle to its left · reading order within the cell */}
      <span
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-start",
          gap: "var(--space-2)",
          flex: 1,
          minHeight: 0,
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.9375rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.75rem",
              color: "var(--color-fg-subtle)",
              letterSpacing: "0.05em",
              paddingTop: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
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
