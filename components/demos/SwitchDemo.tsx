"use client";
import { useState } from "react";

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      style={{
        width: 46,
        height: 28,
        borderRadius: 14,
        border: "none",
        background: checked ? "var(--color-fg)" : "var(--color-border-strong)",
        position: "relative",
        cursor: "pointer",
        transition: "background 200ms ease",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <span style={{ position: "absolute", top: 3, left: checked ? 21 : 3, width: 22, height: 22, borderRadius: "50%", background: "white", transition: "left 200ms cubic-bezier(0.34,1.56,0.64,1)", boxShadow: "0 1px 4px rgba(0,0,0,0.25)" }} />
    </button>
  );
}

export function SwitchDemo() {
  const [dark, setDark] = useState(true);
  const [serif, setSerif] = useState(false);
  const [tateChuYoko, setTateChuYoko] = useState(true);

  const rows = [
    { key: "dark", label: "야간 모드", value: dark, set: setDark },
    { key: "serif", label: "명조체", value: serif, set: setSerif },
    { key: "tcy", label: "세로 숫자 (縦中横)", value: tateChuYoko, set: setTateChuYoko },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 300, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: dark ? "#1a1a1a" : "var(--color-bg)", overflow: "hidden", transition: "background 250ms ease" }}>
          {/* Vertical header */}
          <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-5) 0 var(--space-3)" }}>
            <span style={{ writingMode: "vertical-rl", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.15em", color: dark ? "#fff" : "var(--color-fg)" }}>설정</span>
          </div>

          <div style={{ padding: "var(--space-3) var(--space-5) var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {rows.map((r) => (
              <div key={r.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-3) var(--space-4)", borderRadius: "var(--radius-lg)", background: dark ? "rgba(255,255,255,0.05)" : "var(--color-bg-muted)" }}>
                <span style={{ fontSize: "0.875rem", color: dark ? "#fff" : "var(--color-fg)" }}>{r.label}</span>
                <Switch checked={r.value} onChange={r.set} label={r.label} />
              </div>
            ))}

            {/* Live preview reflecting the switches */}
            <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-5) 0 var(--space-2)" }}>
              <span style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "1.0625rem",
                letterSpacing: "0.1em",
                lineHeight: 1.9,
                fontFamily: serif ? "'Noto Serif KR', serif" : "inherit",
                color: dark ? "#fff" : "var(--color-fg)",
                transition: "color 250ms ease",
              }}>
                시편 23편 1절
              </span>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The switch pill stays horizontal even inside a vertical settings panel — its cross-axis motion signals “this is a control, not content.” Changes apply immediately.
      </p>
    </div>
  );
}
