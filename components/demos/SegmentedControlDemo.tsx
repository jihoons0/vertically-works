"use client";
import { useState } from "react";

const SEGMENTS = [
  { id: "ko", label: "한", sub: "Korean" },
  { id: "ja", label: "あ", sub: "Japanese" },
  { id: "zh", label: "中", sub: "Chinese" },
];

const SAMPLE: Record<string, { ref: string; text: string }[]> = {
  ko: [{ ref: "창 1:1", text: "태초에 하나님이 천지를 창조하시니라" }],
  ja: [{ ref: "創 1:1", text: "初めに、神が天と地を創造された" }],
  zh: [{ ref: "創 1:1", text: "起初　神創造天地" }],
};

export function SegmentedControlDemo() {
  const [active, setActive] = useState("ko");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* The segmented control */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "inline-flex", background: "var(--color-bg-muted)", borderRadius: "var(--radius-full)", padding: 3, gap: 2 }}>
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                width: 56, height: 40,
                borderRadius: "var(--radius-full)",
                border: "none",
                background: active === s.id ? "var(--color-bg)" : "transparent",
                color: active === s.id ? "var(--color-fg)" : "var(--color-fg-muted)",
                fontSize: "1.125rem",
                fontWeight: active === s.id ? 700 : 400,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 150ms ease",
                boxShadow: active === s.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              }}
              aria-pressed={active === s.id}
              title={s.sub}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview of selected language */}
      <div style={{ background: "var(--color-bg-muted)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "var(--space-10)", display: "flex", justifyContent: "center", minHeight: 200, alignItems: "center" }}>
        {SAMPLE[active]?.map((v) => (
          <div key={v.ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }}>
            <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)" }}>{v.ref}</span>
            <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "1.25rem", letterSpacing: "0.12em", lineHeight: 1.9, color: "var(--color-fg)" }}>
              {v.text}
            </span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The language toggle stays horizontal — 3 options, single CJK character labels. The selected language updates the vertical content immediately.
      </p>
    </div>
  );
}
