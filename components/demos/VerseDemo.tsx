"use client";

import { useState } from "react";

const VERSES = [
  { ref: "1", ko: "태초에 하나님이 천지를 창조하시니라", selected: false },
  { ref: "2", ko: "땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고", selected: false },
  { ref: "3", ko: "하나님이 이르시되 빛이 있으라 하시니 빛이 있었고", selected: false },
  { ref: "4", ko: "빛이 하나님이 보시기에 좋았더라", selected: false },
];

export function VerseDemo() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [highlight, setHighlight] = useState<Record<number, string>>({});

  const COLORS = ["#FFD166", "#06D6A0", "#118AB2", "#EF476F"];

  const toggleSelect = (i: number) => {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const applyHighlight = (color: string) => {
    const next = { ...highlight };
    selected.forEach((i) => { next[i] = color; });
    setHighlight(next);
    setSelected(new Set());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div
        style={{
          background: "var(--color-bg-muted)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-8) var(--space-6)",
          display: "flex",
          justifyContent: "center",
          minHeight: 280,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "var(--space-6)", writingMode: "vertical-rl" }}>
          {VERSES.map((v, i) => (
            <div key={i} style={{ position: "relative", display: "flex", gap: "var(--space-2)" }}>
              {/* Verse number */}
              <span
                style={{
                  fontSize: "0.625rem",
                  color: "var(--color-fg-subtle)",
                  fontFamily: "var(--font-geist-mono)",
                  flexShrink: 0,
                  alignSelf: "flex-start",
                }}
              >
                {v.ref}
              </span>

              {/* Verse text */}
              <span
                onClick={() => toggleSelect(i)}
                style={{
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  lineHeight: 1.9,
                  color: "var(--color-fg)",
                  cursor: "pointer",
                  borderRadius: 4,
                  padding: "0 3px",
                  background: selected.has(i)
                    ? "rgba(99,102,241,0.18)"
                    : highlight[i]
                    ? `${highlight[i]}44`
                    : "transparent",
                  borderLeft: highlight[i] ? `3px solid ${highlight[i]}` : "3px solid transparent",
                  transition: "background 120ms ease",
                  userSelect: "none",
                }}
              >
                {v.ko}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Highlight toolbar — only shows when verses are selected */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-4)",
          height: 40,
          opacity: selected.size > 0 ? 1 : 0,
          transition: "opacity 150ms ease",
          pointerEvents: selected.size > 0 ? "auto" : "none",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "var(--color-fg-muted)" }}>{selected.size}절 선택됨</span>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => applyHighlight(c)}
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: c,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }}
              aria-label={`Highlight with color ${c}`}
            />
          ))}
        </div>
        <button
          onClick={() => setSelected(new Set())}
          style={{ fontSize: "0.75rem", color: "var(--color-fg-muted)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
        >
          취소
        </button>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Tap verses to select, then highlight. Selection state must cross RTL column order and handle tate-chu-yoko digit groups as single units.
      </p>
    </div>
  );
}
