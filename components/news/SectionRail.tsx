"use client";

/**
 * SectionRail · 종합 · 정치 · 경제 · 사회 · 문화.
 *
 * A tab rail laid out on the R→L axis: first section at the right, forward =
 * leftward, vertical labels. The kit tabs idiom (roving tabindex, selection
 * follows focus) restated for a horizontal-RTL tablist: on this axis Left is
 * "next" and Right is "previous". DOM order = reading order; visuals come
 * from `row-reverse`.
 */

import { useRef } from "react";
import { SECTIONS, SECTION_LABELS, type EditionId, type SectionId } from "@/lib/news/sources";

export function SectionRail({
  edition,
  section,
  onSectionChange,
  compact = false,
  "aria-label": ariaLabel,
}: {
  edition: EditionId;
  section: SectionId;
  onSectionChange: (s: SectionId) => void;
  compact?: boolean;
  "aria-label": string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next: number | null = null;
    if (e.key === "ArrowLeft") next = (i + 1) % SECTIONS.length; // forward = leftward
    else if (e.key === "ArrowRight") next = (i - 1 + SECTIONS.length) % SECTIONS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = SECTIONS.length - 1;
    if (next === null) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onSectionChange(SECTIONS[next]);
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        flexDirection: "row-reverse", // first section at the reading start
        gap: "var(--space-2)",
      }}
    >
      {SECTIONS.map((id, i) => {
        const selected = id === section;
        return (
          <button
            key={id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-vw="section"
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSectionChange(id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="pressable"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              minHeight: compact ? 52 : 64,
              minWidth: compact ? 28 : 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--space-2) var(--space-1)",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: selected ? "var(--color-fg)" : "transparent",
              color: selected ? "var(--color-bg)" : "var(--color-fg-muted)",
              fontSize: compact ? "0.75rem" : "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              cursor: "pointer",
              transition:
                "background var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
            }}
          >
            {SECTION_LABELS[edition][id]}
          </button>
        );
      })}
    </div>
  );
}
