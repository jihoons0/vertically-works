"use client";
import { useState } from "react";

const ICONS = [
  { id: "next", label: "다음", path: "M12 5v14M5 12l7 7 7-7", title: "Next chapter" },
  { id: "prev", label: "이전", path: "M12 5v14M19 12l-7 7-7-7", title: "Previous chapter" },
  { id: "bookmark", label: "저장", path: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", title: "Bookmark" },
  { id: "search", label: "검색", path: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0", title: "Search" },
  { id: "settings", label: "설정", path: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z", title: "Settings" },
];

export function IconButtonDemo() {
  const [pressed, setPressed] = useState<string | null>(null);
  const [labelMode, setLabelMode] = useState<"vertical" | "hidden">("vertical");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)", padding: 3, gap: 2, background: "var(--color-bg-muted)" }}>
          {(["vertical", "hidden"] as const).map((m) => (
            <button className="pressable" key={m} onClick={() => setLabelMode(m)} style={{ padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-full)", fontSize: "0.8125rem", fontWeight: 500, background: labelMode === m ? "var(--color-fg)" : "transparent", color: labelMode === m ? "var(--color-bg)" : "var(--color-fg-muted)", border: "none", cursor: "pointer", fontFamily: "inherit", transition: "transform 140ms var(--easing-out), background 150ms var(--easing-out), color 150ms var(--easing-out), border-color 150ms var(--easing-out)" }}>
              {m === "vertical" ? "Labelled" : "Icon only"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--color-bg-muted)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "var(--space-10)", gap: "var(--space-4)" }}>
        {ICONS.map((icon) => (
          <button className="pressable"
            key={icon.id}
            aria-label={icon.title}
            onMouseDown={() => setPressed(icon.id)}
            onMouseUp={() => setPressed(null)}
            onMouseLeave={() => setPressed(null)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-3)",
              borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)",
              background: pressed === icon.id ? "var(--color-bg-muted)" : "var(--color-bg)",
              color: "var(--color-fg-muted)", cursor: "pointer",
              transform: pressed === icon.id ? "scale(0.92)" : "scale(1)",
              transition: "transform 80ms ease, background 100ms ease",
              fontFamily: "inherit", minWidth: 44, minHeight: 44,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={icon.path} />
            </svg>
            {labelMode === "vertical" && (
              <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.05em", lineHeight: 1 }}>
                {icon.label}
              </span>
            )}
          </button>
        ))}
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        {labelMode === "vertical" ? "Vertical labels below icons follow the reading axis — 다음/이전 orient naturally." : "Icon-only requires strong visual metaphors. Directional icons must be designed for the vertical axis."}
      </p>
    </div>
  );
}
