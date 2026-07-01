"use client";
import { useState } from "react";

const TABS = [
  { id: "read",    label: "읽기",   content: "태초에 하나님이 천지를 창조하시니라" },
  { id: "search",  label: "검색",   content: "검색 결과가 여기에 표시됩니다" },
  { id: "history", label: "기록",   content: "최근 읽은 구절이 여기에 표시됩니다" },
];

export function TabsDemo() {
  const [active, setActive] = useState("read");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 300, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg)", overflow: "hidden" }}>
          {/* Tabs — horizontal at the top, semantic contrast to vertical content */}
          <div role="tablist" style={{ display: "flex", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-subtle)" }}>
            {TABS.map((tab) => (
              <button className="pressable"
                key={tab.id}
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  flex: 1,
                  padding: "var(--space-3) var(--space-2)",
                  border: "none",
                  background: "transparent",
                  borderBottom: active === tab.id ? "2px solid var(--color-fg)" : "2px solid transparent",
                  fontSize: "0.875rem",
                  fontWeight: active === tab.id ? 700 : 400,
                  color: active === tab.id ? "var(--color-fg)" : "var(--color-fg-muted)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "transform 140ms var(--easing-out), background 150ms var(--easing-out), color 150ms var(--easing-out), border-color 150ms var(--easing-out)",
                  marginBottom: -1,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab panel — vertical content */}
          <div role="tabpanel" style={{ padding: "var(--space-6)", minHeight: 200, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.9375rem", letterSpacing: "0.1em", lineHeight: 1.9, color: active === "read" ? "var(--color-fg)" : "var(--color-fg-muted)" }}>
              {TABS.find((t) => t.id === active)?.content}
            </span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Tabs stay horizontal — the horizontal axis separates view categories from vertical reading content. A semantic contrast that aids orientation.
      </p>
    </div>
  );
}
