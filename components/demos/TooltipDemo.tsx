"use client";

import { useState } from "react";

const VERSES = [
  { ref: "1", text: "글씨를 세로로 쓰는 것을 세로쓰기라 한다" },
  { ref: "2", text: "전통적으로 한국어와 중국어가 세로로 쓰였다" },
  { ref: "3", text: "죽간을 쓰던 때부터 세로로 써 왔다" },
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
            <button className="pressable"
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
                transition: "transform 140ms var(--easing-out), background 150ms var(--easing-out), color 150ms var(--easing-out), border-color 150ms var(--easing-out)",
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
                    position: "relative",
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

                  {/* Tooltip · anchored to the reference it annotates. Content is vertical too. */}
                  {hoveredVerse === i && (
                    <span
                      role="tooltip"
                      style={{
                        position: "absolute",
                        zIndex: 10,
                        pointerEvents: "none",
                        display: "flex",
                        ...(placement === "left"
                          ? { right: "calc(100% + 10px)", top: "50%", transform: "translateY(-50%)" }
                          : { top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" }),
                        background: "var(--color-fg)",
                        color: "var(--color-bg)",
                        borderRadius: "var(--radius-lg)",
                        padding: "var(--space-2) var(--space-3)",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      }}
                    >
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
                        {`${i + 1}번 · ${verse.ref}`}
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
                            : { top: -3, left: "50%", marginLeft: -3 }),
                        }}
                      />
                    </span>
                  )}
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

            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        {placement === "left"
          ? "Hover a verse reference. Tooltip is vertical · it matches the reading axis it annotates."
          : "Tooltip below breaks the column below it. Left placement is preferred."}
      </p>
    </div>
  );
}
