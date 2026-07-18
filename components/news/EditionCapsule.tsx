"use client";

/**
 * EditionCapsule · 🇰🇷 한국 / 🇯🇵 日本 / 🇹🇼 臺灣.
 *
 * A pill group naming each edition by its flag and country name. Switching
 * edition switches the *source set and chrome language*, not a translation, so
 * the semantics are a radiogroup rather than tabs. The selected pill fills with
 * ink; the fill animates in place (background/color only, compositor-friendly
 * and interruptible) per the studio interaction model.
 */

import { useRef } from "react";
import { EDITIONS, EDITION_FLAGS, EDITION_NAMES, type EditionId } from "@/lib/news/sources";

const GAP = 4;

export function EditionCapsule({
  edition,
  onEditionChange,
  orientation = "horizontal",
  "aria-label": ariaLabel,
}: {
  edition: EditionId;
  onEditionChange: (e: EditionId) => void;
  /** Kept for API compatibility; the labeled pills size to their content. */
  glyph?: number;
  orientation?: "vertical" | "horizontal";
  "aria-label": string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const horizontal = orientation !== "vertical";

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next: number | null = null;
    const forward = horizontal ? "ArrowRight" : "ArrowDown";
    const backward = horizontal ? "ArrowLeft" : "ArrowUp";
    if (e.key === forward) next = (i + 1) % EDITIONS.length;
    else if (e.key === backward) next = (i - 1 + EDITIONS.length) % EDITIONS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = EDITIONS.length - 1;
    if (next === null) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onEditionChange(EDITIONS[next]);
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        gap: GAP,
        padding: GAP,
        borderRadius: "var(--radius-full)",
        background: "var(--color-bg-muted)",
        border: "1px solid var(--color-border)",
      }}
    >
      {EDITIONS.map((id, i) => {
        const selected = id === edition;
        return (
          <button
            key={id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-vw="edition"
            type="button"
            role="radio"
            aria-checked={selected}
            lang={id === "zh" ? "zh-Hant" : id}
            tabIndex={selected ? 0 : -1}
            onClick={() => onEditionChange(id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="pressable"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-2) var(--space-3)",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: selected ? "var(--color-fg)" : "transparent",
              color: selected ? "var(--color-bg)" : "var(--color-fg-muted)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition:
                "background var(--duration-base) var(--easing-default), color var(--duration-base) var(--easing-default)",
            }}
          >
            <span aria-hidden style={{ fontSize: "1em", lineHeight: 1 }}>
              {EDITION_FLAGS[id]}
            </span>
            {EDITION_NAMES[id]}
          </button>
        );
      })}
    </div>
  );
}
