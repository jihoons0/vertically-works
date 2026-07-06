"use client";

import { useState } from "react";

const SETTINGS = [
  { key: "darkMode" as const, label: "야간 모드", sub: "Dark mode" },
  { key: "serifFont" as const, label: "명조체", sub: "Serif typeface" },
  { key: "rtl" as const, label: "세로 읽기", sub: "Vertical reading" },
];

export function ToggleDemo() {
  const [states, setStates] = useState({ darkMode: true, serifFont: false, rtl: true });
  const toggle = (key: keyof typeof states) => setStates((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Phone mockup — looks like a vertical app settings panel */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          data-theme={states.darkMode ? "dark" : "light"}
          style={{
            width: 300,
            border: "2px solid var(--color-border-strong)",
            borderRadius: 24,
            background: "var(--color-bg)",
            color: "var(--color-fg)",
            overflow: "hidden",
            transition: "background 200ms ease",
          }}
        >
          {/* Toggle cells — a vertical list: 3 cells stacked as columns, flowing R→L.
              Each cell reads top→bottom; its toggle runs on the same vertical axis. */}
          <div style={{ padding: "var(--space-4)", display: "flex", flexDirection: "row-reverse", justifyContent: "center", gap: "var(--space-3)" }}>
            {SETTINGS.map(({ key, label, sub }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                aria-pressed={states[key]}
                className="pressable"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-4) var(--space-3)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-subtle)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  gap: "var(--space-5)",
                  width: 80,
                  minHeight: 200,
                }}
              >
                {/* Label — vertical Korean with its Latin subtitle set beside it */}
                <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: "var(--space-2)" }}>
                  <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-fg)", letterSpacing: "0.05em" }}>{label}</span>
                  <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.05em", paddingTop: 2 }}>{sub}</span>
                </div>

                {/* Vertical toggle pill — thumb travels along the reading axis (up = on). */}
                <div
                  role="presentation"
                  style={{
                    width: 26,
                    height: 44,
                    borderRadius: "var(--radius-full)",
                    background: states[key] ? "var(--color-fg)" : "var(--color-border-strong)",
                    position: "relative",
                    flexShrink: 0,
                    transition: "background 200ms ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 3,
                      top: states[key] ? 3 : 21,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "white",
                      transition: "top 200ms var(--easing-out)",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Active state preview — shows what vertical reading looks like when RTL toggle is on */}
          {states.rtl && (
            <div
              style={{
                margin: "var(--space-3) var(--space-4) var(--space-5)",
                padding: "var(--space-4)",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-bg-muted)",
                border: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "row-reverse",
                gap: "var(--space-4)",
                overflow: "hidden",
              }}
            >
              {["글씨를 세로로 쓰는 것", "세로쓰기라 한다"].map((text, i) => (
                <span
                  key={i}
                  style={{
                    writingMode: "vertical-rl",
                    fontSize: states.serifFont ? "0.9375rem" : "0.875rem",
                    fontFamily: states.serifFont ? "Georgia, serif" : "inherit",
                    color: "var(--color-fg)",
                    letterSpacing: "0.1em",
                    lineHeight: 1.9,
                    maxHeight: 80,
                    overflow: "hidden",
                  }}
                >
                  {text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        A vertical list: three cells stacked as columns flowing right-to-left, each reading top→bottom. The toggle runs on that same axis — thumb up = on — so the control matches the reading direction instead of cutting across it. The preview updates live.
      </p>
    </div>
  );
}
