"use client";
import { useState } from "react";

const COLORS = [
  { id: "yellow", color: "#FFD166", label: "노랑" },
  { id: "green", color: "#44CF7A", label: "초록" },
  { id: "blue", color: "#60A5FA", label: "파랑" },
  { id: "pink", color: "#F472B6", label: "분홍" },
];

const VERSES = [
  { ref: "1", text: "글씨를 세로로 쓰는 것을 세로쓰기라 한다" },
  { ref: "2", text: "전통적으로 한국어·중국어·일본어가 세로로 쓰였다" },
  { ref: "3", text: "죽간을 쓰던 때부터 세로로 써 왔고" },
  { ref: "4", text: "옛 문헌은 세로쓰기로 되어 있다" },
];

export function HighlightDemo() {
  const [active, setActive] = useState("yellow");
  // map verse ref -> color id (null = none)
  const [marks, setMarks] = useState<Record<string, string | null>>({ "1": "yellow", "3": "blue" });

  const toggle = (ref: string) => {
    setMarks((prev) => ({ ...prev, [ref]: prev[ref] === active ? null : active }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Color picker */}
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-3)" }}>
        {COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            aria-label={c.label}
            aria-pressed={active === c.id}
            style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", padding: 0, background: "none", border: "none", cursor: "pointer" }}
          >
            <span aria-hidden style={{ width: 30, height: 30, borderRadius: "50%", background: c.color, border: active === c.id ? "3px solid var(--color-fg)" : "3px solid transparent", transition: "transform 150ms ease", transform: active === c.id ? "scale(1.1)" : "scale(1)" }} />
          </button>
        ))}
      </div>

      {/* RTL columns — tap a verse to apply the active color */}
      <div style={{ background: "var(--color-bg-muted)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "var(--space-8)", display: "flex", flexDirection: "row-reverse", justifyContent: "center", gap: "var(--space-8)", minHeight: 280 }}>
        {VERSES.map((v) => {
          const markId = marks[v.ref];
          const color = markId ? COLORS.find((c) => c.id === markId)!.color : null;
          return (
            <button
              key={v.ref}
              className="pressable"
              onClick={() => toggle(v.ref)}
              aria-label={`${v.ref}번 문장 형광펜`}
              style={{ display: "flex", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}
            >
              <span style={{ writingMode: "vertical-rl", fontSize: "0.625rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", alignSelf: "flex-start", paddingTop: 2 }}>{v.ref}</span>
              <span style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "1rem",
                letterSpacing: "0.1em",
                lineHeight: 1.9,
                color: "var(--color-fg)",
                background: color ? `${color}40` : "transparent",
                borderRight: color ? `3px solid ${color}` : "3px solid transparent",
                borderRadius: 4,
                padding: "3px 0",
                transition: "background 150ms ease, border-color 150ms ease",
              }}>
                {v.text}
              </span>
            </button>
          );
        })}
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Pick a color, tap a column to highlight (tap again to clear). Highlights use a translucent fill + a full-opacity border on the <em>right</em> edge — the reading-start side of a vertical column. Stored by verse reference, never character offset.
      </p>
    </div>
  );
}
