"use client";

/**
 * VerticalTooltip — a tooltip that opens along the reading direction.
 *
 * In a vertical RTL interface the tooltip's default home is to the LEFT of its
 * trigger — where reading is headed — with vertical content of its own.
 * Opening below would break the column it annotates. Shows on hover and on
 * keyboard focus; Escape dismisses; the trigger is described via
 * `aria-describedby` while open.
 *
 * Docs: https://vertically.works/components/tooltip
 */

import { useId, useState, type CSSProperties, type ReactNode } from "react";

export interface VerticalTooltipProps {
  /** Tooltip content. Strings are set vertically by default. */
  content: ReactNode;
  /** `left` follows reading direction (default); `below` follows screen geometry. */
  placement?: "left" | "below";
  /** Set the content horizontally instead (for non-CJK strings). */
  horizontal?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

export function VerticalTooltip({
  content,
  placement = "left",
  horizontal = false,
  children,
  style,
}: VerticalTooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const anchor: CSSProperties =
    placement === "left"
      ? { right: "calc(100% + 10px)", top: "50%" }
      : { top: "calc(100% + 10px)", left: "50%" };
  const shownTransform = placement === "left" ? "translateY(-50%)" : "translateX(-50%)";
  const hiddenTransform =
    placement === "left"
      ? "translateY(-50%) translateX(4px)" // enters leftward, along the reading axis
      : "translateX(-50%) translateY(-4px)";

  return (
    <span
      data-vw="tooltip-trigger"
      tabIndex={0}
      aria-describedby={open ? id : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
      style={{ position: "relative", display: "inline-flex", ...style }}
    >
      {children}
      <span
        role="tooltip"
        id={id}
        aria-hidden={!open}
        style={{
          position: "absolute",
          ...anchor,
          zIndex: 30,
          display: "flex",
          pointerEvents: "none",
          background: "var(--color-fg)",
          color: "var(--color-bg)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-2) var(--space-3)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
          opacity: open ? 1 : 0,
          transform: open ? shownTransform : hiddenTransform,
          transition:
            "opacity var(--duration-base) var(--easing-out), transform var(--duration-base) var(--easing-out)",
        }}
      >
        <span
          style={{
            ...(horizontal
              ? {}
              : { writingMode: "vertical-rl" as const, textOrientation: "mixed" as const }),
            fontSize: "0.8125rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          {content}
        </span>
        {/* Arrow, pointing back at the trigger */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            width: 7,
            height: 7,
            background: "var(--color-fg)",
            transform: "rotate(45deg)",
            ...(placement === "left"
              ? { right: -3, top: "50%", marginTop: -3 }
              : { top: -3, left: "50%", marginLeft: -3 }),
          }}
        />
      </span>
    </span>
  );
}
