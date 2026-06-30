"use client";

import { useState } from "react";

const VERSES = [
  { ref: "창 1:1", text: "태초에 하나님이 천지를 창조하시니라" },
  { ref: "창 1:2", text: "땅이 혼돈하고 공허하며" },
  { ref: "창 1:3", text: "하나님이 이르시되 빛이 있으라 하시니" },
];

export function TooltipDemo() {
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [placement, setPlacement] = useState<"below" | "left">("left");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Placement toggle */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)", padding: 3, gap: 2, background: "var(--color-bg-muted)" }}>
          {(["left", "below"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlacement(p)}
              style={{
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                background: placement === p ? "var(--color-fg)" : "transparent",
                color: placement === p ? "var(--color-bg)" : "var(--color-fg-muted)",
                border: "none",
                cursor: "pointer",
                transition: "all 150ms ease",
                fontFamily: "inherit",
              }}
            >
              {p === "left" ? "← Left (reading dir)" : "↓ Below (screen geo)"}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical text with tooltip */}
      <div
        style={{
          background: "var(--color-bg-muted)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-10)",
          display: "flex",
          justifyContent: "center",
          minHeight: 240,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "var(--space-6)",
            writingMode: "vertical-rl",
          }}
        >
          {VERSES.map((verse, i) => (
            <div
              key={i}
              style={{ position: "relative", display: "inline-block" }}
              onMouseEnter={() => setHoveredVerse(i)}
              onMouseLeave={() => setHoveredVerse(null)}
            >
              {/* Verse reference (trigger) */}
              <span
                style={{
                  fontSize: "0.75rem",
                  color: hoveredVerse === i ? "var(--color-fg)" : "var(--color-fg-subtle)",
                  fontFamily: "var(--font-geist-mono)",
                  cursor: "default",
                  transition: "color 100ms ease",
                  display: "block",
                  marginBottom: "var(--space-2)",
                }}
              >
                {verse.ref}
              </span>

              {/* Verse text */}
              <span
                style={{
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  lineHeight: 1.9,
                  color: "var(--color-fg)",
                  display: "block",
                }}
              >
                {verse.text}
              </span>

              {/* Tooltip */}
              {hoveredVerse === i && (
                <div
                  style={{
                    position: "absolute",
                    writingMode: "horizontal-tb",
                    zIndex: 10,
                    ...(placement === "left"
                      ? {
                          right: "calc(100% + 10px)",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }
                      : {
                          bottom: "calc(100% + 10px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }),
                    background: "var(--color-fg)",
                    color: "var(--color-bg)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-3) var(--space-4)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                    animation: "tooltip-in 120ms ease both",
                  }}
                >
                  {i + 1}절 · {verse.ref.replace("창 ", "창세기 ")}
                  {/* Arrow */}
                  <span
                    style={{
                      position: "absolute",
                      width: 6,
                      height: 6,
                      background: "var(--color-fg)",
                      transform: "rotate(45deg)",
                      ...(placement === "left"
                        ? { right: -3, top: "50%", marginTop: -3 }
                        : { bottom: -3, left: "50%", marginLeft: -3 }),
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Hover a verse reference. {placement === "left"
          ? "Left placement follows reading direction — the tooltip appears in the direction the reader came from."
          : "Below placement follows screen geometry — but interrupts the vertical reading flow."}
      </p>

      <style>{`
        @keyframes tooltip-in {
          from { opacity: 0; transform: ${placement === "left" ? "translateY(-50%) translateX(4px)" : "translateX(-50%) translateY(4px)"}; }
          to { opacity: 1; transform: ${placement === "left" ? "translateY(-50%) translateX(0)" : "translateX(-50%) translateY(0)"}; }
        }
      `}</style>
    </div>
  );
}
