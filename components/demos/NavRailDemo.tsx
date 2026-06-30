"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { id: "read", label: "읽기" },
  { id: "search", label: "검색" },
  { id: "settings", label: "설정" },
];

export function NavRailDemo() {
  const [active, setActive] = useState("read");
  const [mode, setMode] = useState<"vertical" | "bottom">("vertical");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Toggle */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)", padding: 3, gap: 2, background: "var(--color-bg-muted)" }}>
          {(["vertical", "bottom"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                background: mode === m ? "var(--color-fg)" : "transparent",
                color: mode === m ? "var(--color-bg)" : "var(--color-fg-muted)",
                border: "none",
                cursor: "pointer",
                transition: "all 150ms ease",
                fontFamily: "inherit",
              }}
            >
              {m === "vertical" ? "Vertical rail" : "Bottom bar"}
            </button>
          ))}
        </div>
      </div>

      {/* Phone mockup */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 300,
            height: 500,
            border: "2px solid var(--color-border-strong)",
            borderRadius: 28,
            background: "var(--color-bg)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: mode === "vertical" ? "row" : "column",
          }}
        >
          {/* Vertical Rail */}
          {mode === "vertical" && (
            <nav
              style={{
                width: 64,
                borderRight: "1px solid var(--color-border)",
                background: "var(--color-bg-subtle)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "var(--space-5) 0",
                gap: "var(--space-3)",
                flexShrink: 0,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={{
                    width: 48,
                    paddingTop: "var(--space-3)",
                    paddingBottom: "var(--space-3)",
                    borderRadius: "var(--radius-lg)",
                    border: "none",
                    background: active === item.id ? "var(--color-fg)" : "transparent",
                    color: active === item.id ? "var(--color-bg)" : "var(--color-fg-muted)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    /* Full word spelled out vertically */
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontSize: "0.875rem",
                    fontWeight: active === item.id ? 600 : 400,
                    letterSpacing: "0.1em",
                    lineHeight: 1.6,
                    fontFamily: "inherit",
                    transition: "all 150ms ease",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* Content area */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              writingMode: "vertical-rl",
              fontSize: "1rem",
              color: "var(--color-fg-subtle)",
              letterSpacing: "0.1em",
              lineHeight: 1.9,
              userSelect: "none",
            }}
          >
            {NAV_ITEMS.find((i) => i.id === active)?.label} 화면
          </div>

          {/* Bottom bar */}
          {mode === "bottom" && (
            <nav
              style={{
                height: 60,
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-bg-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexShrink: 0,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={{
                    flex: 1,
                    height: "100%",
                    border: "none",
                    background: "transparent",
                    color: active === item.id ? "var(--color-fg)" : "var(--color-fg-subtle)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                    fontWeight: active === item.id ? 700 : 400,
                    fontFamily: "inherit",
                    borderBottom: active === item.id ? `2px solid var(--color-fg)` : "2px solid transparent",
                    transition: "all 150ms ease",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        {mode === "vertical"
          ? "Rail labels spell out the full word vertically — 읽/기, 검/색, 설/정."
          : "Bottom bar keeps labels horizontal — a deliberate contrast to the vertical content axis."}
      </p>
    </div>
  );
}
