"use client";

import { useState } from "react";

type Edge = "bottom" | "right" | "left";

const EDGES: { id: Edge; label: string; note: string }[] = [
  { id: "bottom", label: "↑ Bottom", note: "Matches screen geometry — feels natural on a horizontal phone, ambiguous in vertical." },
  { id: "right", label: "← Right", note: "Travels against reading direction — feels like an intrusion from the end of the document." },
  { id: "left", label: "→ Left", note: "Follows reading direction — new content arrives from where the reader is going." },
];

export function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [edge, setEdge] = useState<Edge>("bottom");
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 260);
  };

  const sheetStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      background: "var(--color-bg)",
      boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
    };
    if (edge === "bottom") return { ...base, bottom: 0, left: 0, right: 0, height: "55%", borderRadius: "16px 16px 0 0", animation: `${closing ? "sheet-out-bottom" : "sheet-in-bottom"} 260ms cubic-bezier(0.32,0.72,0,1) both` };
    if (edge === "right") return { ...base, top: 0, right: 0, bottom: 0, width: "65%", borderRadius: "16px 0 0 16px", animation: `${closing ? "sheet-out-right" : "sheet-in-right"} 260ms cubic-bezier(0.32,0.72,0,1) both` };
    return { ...base, top: 0, left: 0, bottom: 0, width: "65%", borderRadius: "0 16px 16px 0", animation: `${closing ? "sheet-out-left" : "sheet-in-left"} 260ms cubic-bezier(0.32,0.72,0,1) both` };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Edge selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
        {EDGES.map((e) => (
          <button
            key={e.id}
            onClick={() => setEdge(e.id)}
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              background: edge === e.id ? "var(--color-fg)" : "var(--color-bg-muted)",
              color: edge === e.id ? "var(--color-bg)" : "var(--color-fg-muted)",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              transition: "all 150ms ease",
              fontFamily: "inherit",
            }}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Phone mockup */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 240,
            height: 420,
            border: "2px solid var(--color-border-strong)",
            borderRadius: 24,
            background: "var(--color-bg-subtle)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-4)",
          }}
        >
          {/* Vertical content bg */}
          <div
            style={{
              writingMode: "vertical-rl",
              fontSize: "0.875rem",
              color: "var(--color-fg-subtle)",
              letterSpacing: "0.12em",
              lineHeight: 1.9,
              opacity: 0.5,
              userSelect: "none",
            }}
            aria-hidden
          >
            태초에 하나님이 천지를 창조하시니라
          </div>

          {/* Trigger button */}
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              background: "var(--color-fg)",
              color: "var(--color-bg)",
              border: "none",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            열기
          </button>

          {/* Sheet overlay */}
          {open && (
            <>
              <div
                onClick={close}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.3)",
                  animation: `${closing ? "fade-out" : "fade-in"} 200ms ease both`,
                }}
              />
              <div style={sheetStyle()}>
                <div style={{ padding: "var(--space-5) var(--space-5) var(--space-3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-fg)" }}>책갈피</span>
                  <button onClick={close} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-fg-muted)", fontSize: "1.25rem", lineHeight: 1, fontFamily: "inherit" }}>×</button>
                </div>
                <div style={{ padding: "0 var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  {["창세기 1장", "시편 23편", "요한복음 3:16"].map((item) => (
                    <div key={item} style={{ padding: "var(--space-3) var(--space-3)", borderRadius: "var(--radius-md)", background: "var(--color-bg-muted)", fontSize: "0.8125rem", color: "var(--color-fg)" }}>{item}</div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6, maxWidth: "48ch", marginInline: "auto" }}>
        {EDGES.find((e) => e.id === edge)?.note}
      </p>

      <style>{`
        @keyframes sheet-in-bottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes sheet-out-bottom { from { transform: translateY(0); } to { transform: translateY(100%); } }
        @keyframes sheet-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes sheet-out-right { from { transform: translateX(0); } to { transform: translateX(100%); } }
        @keyframes sheet-in-left { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes sheet-out-left { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
      `}</style>
    </div>
  );
}
