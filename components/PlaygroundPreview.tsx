"use client";

import { useState } from "react";

type Align = "top" | "center" | "bottom";

// In horizontal writing, alignment runs left / center / right along the inline
// axis. Rotate to vertical writing and the inline axis becomes top → bottom, so
// the equivalent control aligns the column of text to the top, center, or bottom.
const SAMPLE_CONTENT = [
  { lang: "Korean", text: "세로로 쓴다", ref: "한국어", color: "var(--color-fg)" },
  { lang: "Japanese", text: "縦に書く", ref: "日本語", color: "var(--color-fg-muted)" },
  { lang: "Chinese", text: "竖着写", ref: "中文", color: "var(--color-fg-subtle)" },
];

const ALIGN_ITEMS: { id: Align; label: string; barY: number }[] = [
  { id: "top", label: "Top", barY: 3 },
  { id: "center", label: "Center", barY: 6.5 },
  { id: "bottom", label: "Bottom", barY: 10 },
];

function AlignIcon({ barY }: { barY: number }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.5" y="1.5" width="11" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="5" y={barY} width="6" height="3" rx="1" fill="currentColor" />
    </svg>
  );
}

export function PlaygroundPreview() {
  const [align, setAlign] = useState<Align>("top");
  const alignItems = align === "top" ? "flex-start" : align === "center" ? "center" : "flex-end";

  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "var(--color-bg)",
        minHeight: 480,
      }}
    >
      {/* Toolbar with the live alignment control */}
      <div
        style={{
          padding: "var(--space-3) var(--space-4)",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>
          Preview
        </span>

        <div
          role="group"
          aria-label="Text alignment"
          style={{ display: "flex", gap: 2, padding: 3, borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)", border: "1px solid var(--color-border)" }}
        >
          {ALIGN_ITEMS.map((a) => {
            const active = align === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setAlign(a.id)}
                aria-pressed={active}
                title={`${a.label} align`}
                className="pressable"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  background: active ? "var(--color-fg)" : "transparent",
                  color: active ? "var(--color-bg)" : "var(--color-fg-muted)",
                  transition: "background 150ms var(--easing-out), color 150ms var(--easing-out)",
                }}
              >
                <AlignIcon barY={a.barY} />
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Canvas — columns flow R→L; the align control moves them along the vertical axis */}
      <div
        style={{
          height: 420,
          display: "flex",
          flexDirection: "row-reverse",
          alignItems,
          justifyContent: "center",
          gap: "var(--space-12)",
          padding: "var(--space-10)",
        }}
      >
        {SAMPLE_CONTENT.map((item) => (
          <div key={item.lang} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }}>
            <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.04em" }}>{item.ref}</span>
            <span
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "1.75rem",
                letterSpacing: "0.12em",
                lineHeight: 1.9,
                color: item.color,
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
