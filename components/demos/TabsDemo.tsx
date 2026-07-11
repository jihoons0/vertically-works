"use client";
import { useState } from "react";

const TABS = [
  { id: "read",    label: "읽기",   content: "글씨를 세로로 쓰는 것을 세로쓰기라 한다" },
  { id: "search",  label: "검색",   content: "검색 결과가 여기에 표시됩니다" },
  { id: "history", label: "기록",   content: "최근 읽은 문서가 여기에 표시됩니다" },
];

export function TabsDemo() {
  const [active, setActive] = useState("read");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 300, height: 260, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg)", overflow: "hidden", display: "flex", flexDirection: "row" }}>
          {/* Tab panel · vertical content */}
          <div role="tabpanel" style={{ flex: 1, padding: "var(--space-6)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.9375rem", letterSpacing: "0.1em", lineHeight: 1.9, color: active === "read" ? "var(--color-fg)" : "var(--color-fg-muted)" }}>
              {TABS.find((t) => t.id === active)?.content}
            </span>
          </div>

          {/* Tabs · vertical rail on the right (leading edge in RTL) */}
          <div role="tablist" style={{ display: "flex", flexDirection: "column", borderLeft: "1px solid var(--color-border)", background: "var(--color-bg-subtle)" }}>
            {TABS.map((tab) => (
              <button className="pressable"
                key={tab.id}
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  flex: 1,
                  padding: "var(--space-4) var(--space-3)",
                  border: "none",
                  background: "transparent",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  letterSpacing: "0.08em",
                  boxShadow: active === tab.id ? "inset 2px 0 0 0 var(--color-fg)" : "none",
                  fontSize: "0.875rem",
                  fontWeight: active === tab.id ? 700 : 400,
                  color: active === tab.id ? "var(--color-fg)" : "var(--color-fg-muted)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "transform 140ms var(--easing-out), background 150ms var(--easing-out), color 150ms var(--easing-out), box-shadow 150ms var(--easing-out)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The tabs run as a vertical rail on the right (leading) edge · each label set vertically · with the active tab marked by a bar on its content-facing edge. Categories live on the same axis as the reading.
      </p>
    </div>
  );
}
