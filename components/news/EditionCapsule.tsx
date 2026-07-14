"use client";

/**
 * EditionCapsule · 한 / あ / 中.
 *
 * A vertical capsule whose active highlight *slides* between glyphs — the
 * shared-layout morph from the studio interaction model (PRINCIPLES §RTL-native
 * chrome), expressed as a transform-only translate on a single highlight so it
 * stays compositor-friendly and interruptible. Switching edition switches the
 * *source set and chrome language*, not a translation, so the semantics are a
 * radiogroup rather than tabs.
 */

import { useRef } from "react";
import { EDITIONS, EDITION_GLYPHS, type EditionId } from "@/lib/news/sources";

const GAP = 4;

export function EditionCapsule({
  edition,
  onEditionChange,
  glyph: GLYPH = 40, // one glyph slot, px
  orientation = "vertical",
  "aria-label": ariaLabel,
}: {
  edition: EditionId;
  onEditionChange: (e: EditionId) => void;
  glyph?: number;
  orientation?: "vertical" | "horizontal";
  "aria-label": string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = EDITIONS.indexOf(edition);
  const horizontal = orientation === "horizontal";

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
        position: "relative",
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        gap: GAP,
        padding: GAP,
        borderRadius: "var(--radius-full)",
        background: "var(--color-bg-muted)",
        border: "1px solid var(--color-border)",
        width: horizontal ? undefined : GLYPH + GAP * 2,
      }}
    >
      {/* The sliding highlight · transform-only, so the morph is a real move. */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: GAP,
          top: GAP,
          width: GLYPH,
          height: GLYPH,
          borderRadius: "var(--radius-full)",
          background: "var(--color-fg)",
          transform: horizontal
            ? `translateX(${index * (GLYPH + GAP)}px)`
            : `translateY(${index * (GLYPH + GAP)}px)`,
          transition: "transform var(--duration-slow) var(--easing-spring)",
        }}
      />
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
              position: "relative",
              width: GLYPH,
              height: GLYPH,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: "transparent",
              color: selected ? "var(--color-bg)" : "var(--color-fg-muted)",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "color var(--duration-base) var(--easing-default)",
            }}
          >
            {EDITION_GLYPHS[id]}
          </button>
        );
      })}
    </div>
  );
}
