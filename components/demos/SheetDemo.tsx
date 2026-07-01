"use client";

import { useState } from "react";

type Edge = "bottom" | "right" | "left";

const EDGES: { id: Edge; label: string; note: string }[] = [
  { id: "bottom", label: "↑ Bottom", note: "Screen geometry. Feels like a new layer — natural on horizontal phones, ambiguous in vertical context." },
  { id: "right", label: "← Right", note: "Travels against RTL reading direction. Feels like content arriving from behind the reader." },
  { id: "left", label: "→ Left", note: "Follows reading direction. New content arrives from where the reader is heading." },
];

const BOOKMARKS = [
  { ref: "창 1:1", text: "태초에 하나님이 천지를 창조하시니라" },
  { ref: "시 23:1", text: "여호와는 나의 목자시니" },
  { ref: "요 3:16", text: "하나님이 세상을 이처럼 사랑하사" },
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
    if (edge === "bottom") return {
      ...base,
      bottom: 0, left: 0, right: 0, height: "60%",
      borderRadius: "20px 20px 0 0",
      animation: `${closing ? "sheet-out-bottom" : "sheet-in-bottom"} 260ms cubic-bezier(0.32,0.72,0,1) both`,
    };
    if (edge === "right") return {
      ...base,
      top: 0, right: 0, bottom: 0, width: "68%",
      borderRadius: "16px 0 0 16px",
      animation: `${closing ? "sheet-out-right" : "sheet-in-right"} 260ms cubic-bezier(0.32,0.72,0,1) both`,
    };
    return {
      ...base,
      top: 0, left: 0, bottom: 0, width: "68%",
      borderRadius: "0 16px 16px 0",
      animation: `${closing ? "sheet-out-left" : "sheet-in-left"} 260ms cubic-bezier(0.32,0.72,0,1) both`,
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Edge selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
        {EDGES.map((e) => (
          <button className="pressable"
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
              transition: "transform 140ms var(--easing-out), background 150ms var(--easing-out), color 150ms var(--easing-out), border-color 150ms var(--easing-out)",
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
            width: 260,
            height: 460,
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
          {/* Vertical scripture content in background */}
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "var(--space-5)",
              opacity: 0.45,
              userSelect: "none",
              pointerEvents: "none",
            }}
            aria-hidden
          >
            {["태초에 하나님이 천지를 창조하시니라", "땅이 혼돈하고 공허하며"].map((text, i) => (
              <span
                key={i}
                style={{
                  writingMode: "vertical-rl",
                  fontSize: "0.9375rem",
                  color: "var(--color-fg)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.9,
                }}
              >
                {text}
              </span>
            ))}
          </div>

          {/* Trigger button */}
          <button className="pressable"
            onClick={() => setOpen(true)}
            style={{
              padding: "var(--space-2) var(--space-5)",
              borderRadius: "var(--radius-full)",
              background: "var(--color-fg)",
              color: "var(--color-bg)",
              border: "none",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              position: "relative",
              zIndex: 1,
            }}
          >
            책갈피 열기
          </button>

          {/* Sheet overlay */}
          {open && (
            <>
              <div
                onClick={close}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  animation: `${closing ? "fade-out" : "fade-in"} 200ms ease both`,
                  zIndex: 10,
                }}
              />
              <div style={{ ...sheetStyle(), zIndex: 20 }}>
                {/* Sheet handle */}
                <div style={{ width: 32, height: 4, borderRadius: 2, background: "var(--color-border-strong)", margin: "10px auto 12px" }} />

                {/* Sheet header */}
                <div style={{ padding: "0 var(--space-4) var(--space-3)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)" }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-fg)" }}>책갈피</span>
                  <button className="pressable" onClick={close} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-fg-muted)", fontSize: "1.125rem", lineHeight: 1, fontFamily: "inherit" }}>×</button>
                </div>

                {/* Vertical bookmark content */}
                <div
                  style={{
                    padding: "var(--space-4)",
                    display: "flex",
                    flexDirection: "row-reverse", // RTL column order
                    gap: "var(--space-4)",
                    overflowX: "auto",
                    flex: 1,
                    alignItems: "flex-start",
                  }}
                >
                  {BOOKMARKS.map((bm, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--space-1)",
                        alignItems: "flex-start",
                        padding: "var(--space-2)",
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-bg-muted)",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      {/* Reference — small horizontal */}
                      <span style={{ fontSize: "0.6rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)" }}>
                        {bm.ref}
                      </span>
                      {/* Text — vertical */}
                      <span
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          fontSize: "0.8rem",
                          color: "var(--color-fg)",
                          letterSpacing: "0.08em",
                          lineHeight: 1.8,
                          maxHeight: 120,
                          overflow: "hidden",
                        }}
                      >
                        {bm.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6, maxWidth: "52ch", marginInline: "auto" }}>
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
        @media (prefers-reduced-motion: reduce) {
          /* Replace directional slides with a gentle fade */
          @keyframes sheet-in-bottom { from { opacity: 0; } to { opacity: 1; } }
          @keyframes sheet-out-bottom { from { opacity: 1; } to { opacity: 0; } }
          @keyframes sheet-in-right { from { opacity: 0; } to { opacity: 1; } }
          @keyframes sheet-out-right { from { opacity: 1; } to { opacity: 0; } }
          @keyframes sheet-in-left { from { opacity: 0; } to { opacity: 1; } }
          @keyframes sheet-out-left { from { opacity: 1; } to { opacity: 0; } }
        }
      `}</style>
    </div>
  );
}
