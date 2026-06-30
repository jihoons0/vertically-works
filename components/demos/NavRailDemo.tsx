"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { id: "read", ko: "읽기", ja: "読書" },
  { id: "search", ko: "검색", ja: "検索" },
  { id: "settings", ko: "설정", ja: "設定" },
];

export function NavRailDemo() {
  const [active, setActive] = useState("read");
  const [mode, setMode] = useState<"vertical" | "bottom">("vertical");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Toggle */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-full)",
            padding: 3,
            gap: 2,
            background: "var(--color-bg-muted)",
          }}
        >
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
            width: 280,
            height: 480,
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
                width: 56,
                borderRight: "1px solid var(--color-border)",
                background: "var(--color-bg-subtle)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "var(--space-4) 0",
                gap: "var(--space-2)",
                flexShrink: 0,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-lg)",
                    border: "none",
                    background: active === item.id ? "var(--color-fg)" : "transparent",
                    color: active === item.id ? "var(--color-bg)" : "var(--color-fg-muted)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    writingMode: "vertical-rl",
                    letterSpacing: "0.05em",
                    fontFamily: "inherit",
                    transition: "all 150ms ease",
                  }}
                >
                  {item.ko[0]}
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
              fontSize: "0.875rem",
              color: "var(--color-fg-subtle)",
              letterSpacing: "0.08em",
              lineHeight: 1.8,
            }}
          >
            {NAV_ITEMS.find((i) => i.id === active)?.ko} 화면
          </div>

          {/* Bottom bar */}
          {mode === "bottom" && (
            <nav
              style={{
                height: 56,
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
                  {item.ko}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        {mode === "vertical"
          ? "The vertical rail stays fixed to the left. Reading progresses rightward — away from the rail."
          : "The bottom bar maps to thumb reach, but conflicts with the vertical reading axis."}
      </p>
    </div>
  );
}
