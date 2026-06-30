"use client";

import { useState } from "react";

export function ToggleDemo() {
  const [states, setStates] = useState({ darkMode: true, serifFont: false, rtl: true });

  const toggle = (key: keyof typeof states) =>
    setStates((s) => ({ ...s, [key]: !s[key] }));

  const SETTINGS = [
    { key: "darkMode" as const, label: "야간 모드", sub: "Dark mode" },
    { key: "serifFont" as const, label: "명조체", sub: "Serif typeface" },
    { key: "rtl" as const, label: "세로 읽기", sub: "Vertical reading" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div
        style={{
          background: "var(--color-bg-muted)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
        }}
      >
        {SETTINGS.map(({ key, label, sub }) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "var(--space-4) var(--space-5)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              cursor: "pointer",
              fontFamily: "inherit",
              gap: "var(--space-4)",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-fg)" }}>{label}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)", marginTop: 2 }}>{sub}</div>
            </div>

            {/* Toggle pill */}
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

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Toggle switches retain horizontal orientation — the binary axis (on/off) is perpendicular to reading direction. The label uses vertical text where appropriate.
      </p>
    </div>
  );
}
