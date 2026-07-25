"use client";

/**
 * ColumnAccordion · a disclosure list on the vertical axis.
 *
 * A horizontal accordion grows its panel DOWN, adding row height. On the
 * vertical axis "down" is the reading length of the title column, so growing
 * downward would break the line. Instead the open item widens SIDEWAYS: the
 * detail unfolds as new columns beside the title, along the reading direction
 * (leftward), and the title column's length never changes. One item open at a
 * time, so the list's width stays predictable.
 *
 * Each header is a button with `aria-expanded` / `aria-controls`; its panel is
 * a `region` labelled by the header and `aria-hidden` while collapsed. The
 * visual right-to-left order matches DOM and tab order, so Tab walks the
 * headers in reading order and Enter/Space toggles.
 *
 * Docs: https://vertically.works/components/column-accordion
 */

import { useId, useState, type CSSProperties } from "react";

export interface ColumnAccordionItem {
  title: string;
  /** Detail lines, each set as its own vertical column beside the title. */
  detail: string[];
}

export interface ColumnAccordionProps {
  items: ColumnAccordionItem[];
  /** Uncontrolled initial open index (-1 = all collapsed). Defaults to -1. */
  defaultOpen?: number;
  /** Controlled open index (-1 = all collapsed). */
  open?: number;
  onOpenChange?: (index: number) => void;
  /** Accessible name for the list (required). */
  "aria-label": string;
  /** Width each detail panel unfolds to. */
  panelWidth?: number;
  style?: CSSProperties;
}

export function ColumnAccordion({
  items,
  defaultOpen = -1,
  open,
  onOpenChange,
  panelWidth = 112,
  style,
  ...aria
}: ColumnAccordionProps) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultOpen);
  const active = open ?? internal;

  const toggle = (index: number) => {
    const next = active === index ? -1 : index;
    setInternal(next);
    onOpenChange?.(next);
  };

  return (
    <div
      role="group"
      aria-label={aria["aria-label"]}
      style={{
        display: "flex",
        flexDirection: "row-reverse", // first item at the reading start (right)
        justifyContent: "flex-start",
        alignItems: "stretch",
        gap: "var(--space-3)",
        overflowX: "auto",
        ...style,
      }}
    >
      {items.map((item, i) => {
        const isOpen = active === i;
        const headerId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div
            key={item.title}
            style={{
              display: "flex",
              flexDirection: "row-reverse", // header at the reading start; detail unfolds left
              alignItems: "stretch",
              flexShrink: 0,
              borderRadius: "var(--radius-lg)",
              border: isOpen ? "1px solid var(--color-fg)" : "1px solid var(--color-border)",
              background: "var(--color-bg)",
              overflow: "hidden",
              transition: "border-color var(--duration-fast) var(--easing-out)",
            }}
          >
            {/* Header · full-height button: vertical title + a chevron pointing along the unfold */}
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-4)",
                minWidth: 44, // touch target across the axis
                padding: "var(--space-4) var(--space-3)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <span
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--color-fg)",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </span>
              {/* Points left (the unfold direction) when closed; flips when open */}
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
                style={{
                  color: "var(--color-fg-subtle)",
                  marginTop: "auto",
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform var(--duration-slow) var(--easing-drawer)",
                }}
              >
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>

            {/* Detail · unfolds to the left as new columns, along the reading direction */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              aria-hidden={!isOpen}
              style={{
                width: isOpen ? panelWidth : 0,
                opacity: isOpen ? 1 : 0,
                overflow: "hidden",
                transition:
                  "width var(--duration-slow) var(--easing-drawer), opacity var(--duration-slow) var(--easing-drawer)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  gap: "var(--space-3)",
                  padding: "var(--space-4) var(--space-3)",
                  borderRight: "1px solid var(--color-border)",
                  width: panelWidth,
                  height: "100%",
                }}
              >
                {item.detail.map((line) => (
                  <span
                    key={line}
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      fontSize: "0.8125rem",
                      color: "var(--color-fg-muted)",
                      letterSpacing: "0.08em",
                      lineHeight: 1.8,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
