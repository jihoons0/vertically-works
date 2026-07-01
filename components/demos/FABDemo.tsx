"use client";
import { useState } from "react";

type Position = "bottom-right" | "bottom-left" | "top-right";

const POSITIONS: { id: Position; label: string; note: string }[] = [
  { id: "bottom-right", label: "Bottom right", note: "Horizontal convention — far from RTL reading start, but familiar." },
  { id: "bottom-left",  label: "Bottom left",  note: "Reading terminus in RTL — content ends here, action begins." },
  { id: "top-right",   label: "Top right",    note: "Reading origin — the FAB greets the reader but may obstruct the first column." },
];

export function FABDemo() {
  const [pos, setPos] = useState<Position>("bottom-right");
  const [tapped, setTapped] = useState(false);

  const fabPos: Record<Position, React.CSSProperties> = {
    "bottom-right": { bottom: 16, right: 16 },
    "bottom-left":  { bottom: 16, left: 16 },
    "top-right":    { top: 16, right: 16 },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>
        {POSITIONS.map((p) => (
          <button key={p.id} onClick={() => setPos(p.id)} style={{ padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-full)", fontSize: "0.8125rem", fontWeight: 500, background: pos === p.id ? "var(--color-fg)" : "var(--color-bg-muted)", color: pos === p.id ? "var(--color-bg)" : "var(--color-fg-muted)", border: "1px solid var(--color-border)", cursor: "pointer", fontFamily: "inherit", transition: "all 150ms ease" }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 260, height: 420, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg-subtle)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Vertical content bg */}
          <div style={{ display: "flex", flexDirection: "row-reverse", gap: 20, opacity: 0.4, userSelect: "none", pointerEvents: "none" }} aria-hidden>
            {["태초에 하나님이 천지를 창조하시니라", "땅이 혼돈하고 공허하며"].map((t, i) => (
              <span key={i} style={{ writingMode: "vertical-rl", fontSize: "0.875rem", letterSpacing: "0.1em", lineHeight: 1.9, color: "var(--color-fg)" }}>{t}</span>
            ))}
          </div>

          {/* FAB */}
          <button
            onClick={() => { setTapped(true); setTimeout(() => setTapped(false), 500); }}
            style={{
              position: "absolute",
              ...fabPos[pos],
              width: 48, height: 48,
              borderRadius: "50%",
              background: "var(--color-fg)",
              color: "var(--color-bg)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              transform: tapped ? "scale(0.88)" : "scale(1)",
              transition: "transform 80ms ease, bottom 300ms ease, top 300ms ease, left 300ms ease, right 300ms ease",
              zIndex: 10,
            }}
            aria-label="새 메모"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6, maxWidth: "48ch", marginInline: "auto" }}>
        {POSITIONS.find((p) => p.id === pos)?.note}
      </p>
    </div>
  );
}
