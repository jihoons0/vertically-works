"use client";

import { useState } from "react";

const COLUMNS = [
  {
    verses: [
      { ref: "1", text: "태초에 하나님이 천지를 창조하시니라" },
      { ref: "2", text: "땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고" },
    ],
  },
  {
    verses: [
      { ref: "3", text: "하나님이 이르시되 빛이 있으라 하시니 빛이 있었고" },
      { ref: "4", text: "빛이 하나님이 보시기에 좋았더라" },
    ],
  },
  {
    verses: [
      { ref: "5", text: "하나님이 빛과 어둠을 나누사" },
      { ref: "6", text: "하나님이 이르시되 물 가운데에 궁창이 있으라" },
    ],
  },
];

export function VerseDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<Record<string, string>>({});

  const COLORS = ["#FFD166", "#06D6A0", "#118AB2", "#EF476F"];

  const key = (col: number, row: number) => `${col}-${row}`;

  const applyHighlight = (color: string) => {
    if (!selected) return;
    setHighlights((h) => ({ ...h, [selected]: color }));
    setSelected(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* RTL column layout — row-reverse puts col 0 on right (reading start) */}
      <div
        style={{
          background: "var(--color-bg-muted)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-8)",
          display: "flex",
          flexDirection: "row-reverse", // RTL: first column appears on right
          gap: "var(--space-6)",
          minHeight: 260,
          alignItems: "flex-start",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        {COLUMNS.map((col, colIdx) => (
          <div
            key={colIdx}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
            }}
          >
            {col.verses.map((verse, rowIdx) => {
              const k = key(colIdx, rowIdx);
              const isSelected = selected === k;
              const hl = highlights[k];
              return (
                <span
                  key={rowIdx}
                  onClick={() => setSelected(isSelected ? null : k)}
                  style={{
                    cursor: "pointer",
                    display: "inline-block",
                    position: "relative",
                    userSelect: "none",
                  }}
                >
                  {/* Verse number inline at start */}
                  <sup
                    style={{
                      fontSize: "0.55em",
                      color: "var(--color-fg-subtle)",
                      fontFamily: "var(--font-geist-mono)",
                      verticalAlign: "super",
                      marginRight: 2,
                    }}
                  >
                    {verse.ref}
                  </sup>
                  <span
                    style={{
                      fontSize: "1rem",
                      letterSpacing: "0.1em",
                      lineHeight: 1.9,
                      color: "var(--color-fg)",
                      borderRadius: 3,
                      padding: "0 2px",
                      background: isSelected
                        ? "rgba(99,102,241,0.2)"
                        : hl
                        ? `${hl}44`
                        : "transparent",
                      borderRight: hl ? `3px solid ${hl}` : "3px solid transparent",
                      transition: "background 100ms ease",
                    }}
                  >
                    {verse.text}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Highlight toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-4)",
          height: 44,
          opacity: selected ? 1 : 0,
          transform: selected ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 150ms ease, transform 150ms ease",
          pointerEvents: selected ? "auto" : "none",
        }}
      >
        <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.75rem", color: "var(--color-fg-muted)", letterSpacing: "0.05em" }}>하이라이트</span>
        <div style={{ display: "flex", gap: "var(--space-1)" }}>
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => applyHighlight(c)}
              onMouseEnter={(e) => { (e.currentTarget.firstElementChild as HTMLElement).style.transform = "scale(1.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget.firstElementChild as HTMLElement).style.transform = "scale(1)"; }}
              style={{
                // 44×44 tap target (WCAG / Apple HIG min); the visual swatch stays 24px.
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={`Highlight color ${c}`}
            >
              <span
                aria-hidden
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: c,
                  border: "2px solid transparent",
                  transition: "transform 100ms ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              />
            </button>
          ))}
        </div>
        <button
          onClick={() => setSelected(null)}
          className="pressable"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.75rem", color: "var(--color-fg-subtle)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.05em" }}
        >
          취소
        </button>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Columns flow right-to-left (창 1:1–2 on right). Tap a verse to select, then apply a highlight color. Selection must account for RTL column order.
      </p>
    </div>
  );
}
