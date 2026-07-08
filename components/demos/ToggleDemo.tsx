"use client";

import { useId, useState } from "react";
// Dogfoods the real registry component — the same file
// `npx verticallyworks add toggle` copies into a project.
import { VerticalToggle } from "@/components/vw/toggle";

const SETTINGS = [
  { key: "darkMode" as const, label: "야간 모드", sub: "Dark mode" },
  { key: "serifFont" as const, label: "명조체", sub: "Serif typeface" },
];

export function ToggleDemo() {
  const [states, setStates] = useState({ darkMode: true, serifFont: false });
  const baseId = useId();

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
          {/* Toggle cells — a vertical list: cells stacked as columns, flowing R→L.
              Each cell reads top→bottom; its toggle runs on the same vertical axis. */}
          <div style={{ padding: "var(--space-4)", display: "flex", flexDirection: "row-reverse", justifyContent: "center", gap: "var(--space-3)" }}>
            {SETTINGS.map(({ key, label, sub }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-4) var(--space-3)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-subtle)",
                  gap: "var(--space-5)",
                  width: 80,
                  minHeight: 200,
                }}
              >
                {/* Label — vertical Korean with its Latin subtitle set beside it */}
                <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: "var(--space-2)" }}>
                  <span id={`${baseId}-${key}`} style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-fg)", letterSpacing: "0.05em" }}>{label}</span>
                  <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.05em", paddingTop: 2 }}>{sub}</span>
                </div>

                {/* The real registry component: role="switch", thumb travels up for on */}
                <VerticalToggle
                  checked={states[key]}
                  onCheckedChange={(next) => setStates((s) => ({ ...s, [key]: next }))}
                  aria-labelledby={`${baseId}-${key}`}
                />
              </div>
            ))}
          </div>

          {/* Live preview — shows the toggles' effect on vertical reading text */}
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
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        A vertical list: two cells stacked as columns flowing right-to-left, each reading top→bottom. The toggle runs on that same axis — thumb up = on — so the control matches the reading direction instead of cutting across it. The preview updates live.
      </p>
    </div>
  );
}
