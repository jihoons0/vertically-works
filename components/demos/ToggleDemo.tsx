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
          style={{
            width: 300,
            border: "2px solid var(--color-border-strong)",
            borderRadius: 24,
            background: "var(--color-bg)",
            overflow: "hidden",
          }}
        >
          {/* Settings screen header — vertical text label */}
          <div
            style={{
              padding: "var(--space-5) var(--space-5) var(--space-4)",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-fg)",
                letterSpacing: "0.05em",
              }}
            >
              설정
            </span>
            <div style={{ width: 1, height: 32, background: "var(--color-border)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)" }}>Settings</span>
          </div>

          {/* Toggle rows */}
          <div style={{ padding: "var(--space-3) var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {SETTINGS.map(({ key, label, sub }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                className="pressable"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-4) var(--space-5)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-subtle)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  gap: "var(--space-4)",
                  minHeight: 108,
                }}
              >
                {/* Label — vertical Korean with its Latin subtitle set beside it (rotated, per mixed orientation) */}
                <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: "var(--space-2)" }}>
                  <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-fg)", letterSpacing: "0.05em" }}>{label}</span>
                  <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.05em", paddingTop: 2 }}>{sub}</span>
                </div>

                {/* Toggle pill — stays horizontal, perpendicular to the vertical reading axis */}
                <div
                  style={{
                    width: 44,
                    height: 26,
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
                      top: 3,
                      left: states[key] ? 21 : 3,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "white",
                      transition: "left 200ms ease",
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
              {["태초에 하나님이", "천지를 창조하시니라"].map((text, i) => (
                <span
                  key={i}
                  style={{
                    writingMode: "vertical-rl",
                    fontSize: states.serifFont ? "0.9375rem" : "0.875rem",
                    fontFamily: states.serifFont ? "Georgia, serif" : "inherit",
                    color: "var(--color-fg)",
                    letterSpacing: "0.1em",
                    lineHeight: 1.9,
                    opacity: states.darkMode ? 1 : 0.7,
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
        Toggle pills stay horizontal — perpendicular to reading direction, which signals a different semantic axis. The preview updates live.
      </p>
    </div>
  );
}
