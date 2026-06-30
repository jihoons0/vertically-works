"use client";

import { useState } from "react";

const VERSES = [
  { ref: "창 1:1", text: "태초에 하나님이 천지를 창조하시니라" },
  { ref: "창 1:2", text: "땅이 혼돈하고 공허하며" },
  { ref: "창 1:3", text: "하나님이 이르시되 빛이 있으라" },
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

      {/* Demo */}
      <div
        style={{
          background: "var(--color-bg-muted)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-10)",
          display: "flex",
          justifyContent: "center",
          minHeight: 260,
          alignItems: "center",
        }}
      >
        {/* RTL columns: row-reverse so first verse is on right */}
        <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-8)" }}>
          {VERSES.map((verse, i) => (
            <div
              key={i}
              style={{ position: "relative" }}
              onMouseEnter={() => setHoveredVerse(i)}
              onMouseLeave={() => setHoveredVerse(null)}
            >
              {/* Verse reference (trigger) */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
                <span
                  style={{
                    writingMode: "vertical-rl",
                    fontSize: "0.6875rem",
                    color: hoveredVerse === i ? "var(--color-fg)" : "var(--color-fg-subtle)",
                    fontFamily: "var(--font-geist-mono)",
                    cursor: "default",
                    transition: "color 100ms ease",
                    letterSpacing: "0.05em",
                    borderBottom: hoveredVerse === i ? `1px solid var(--color-fg)` : "1px solid transparent",
                    paddingBottom: 2,
                  }}
                >
                  {verse.ref}
                </span>

                {/* Verse text */}
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                    lineHeight: 1.9,
                    color: "var(--color-fg)",
                  }}
                >
                  {verse.text}
                </span>
              </div>

              {/* Tooltip — text is also vertical */}
              {hoveredVerse === i && (
                <div
                  role="tooltip"
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    pointerEvents: "none",
                    ...(placement === "left"
                      ? { right: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)" }
                      : { bottom: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)" }),
                    background: "var(--color-fg)",
                    color: "var(--color-bg)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-3) var(--space-3)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* Tooltip content is vertical too */}
                  <span
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {`${i + 1}절 · ${verse.ref}`}
                  </span>

                  {/* Arrow */}
                  <span
                    style={{
                      position: "absolute",
                      width: 7,
                      height: 7,
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
        {placement === "left"
          ? "Hover a verse reference. Tooltip is vertical — it matches the reading axis it annotates."
          : "Tooltip below breaks the column below it. Left placement is preferred."}
      </p>
    </div>
  );
}
