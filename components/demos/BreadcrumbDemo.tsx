"use client";
import { useState } from "react";

const PATHS = [
  [{ id: "bible", label: "성경" }],
  [{ id: "bible", label: "성경" }, { id: "ot", label: "구약" }],
  [{ id: "bible", label: "성경" }, { id: "ot", label: "구약" }, { id: "gen", label: "창세기" }],
  [{ id: "bible", label: "성경" }, { id: "ot", label: "구약" }, { id: "gen", label: "창세기" }, { id: "ch1", label: "1장" }],
];

export function BreadcrumbDemo() {
  const [depth, setDepth] = useState(3);
  const items = PATHS[depth];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Depth selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
        {PATHS.map((_, i) => (
          <button className="pressable" key={i} onClick={() => setDepth(i)} style={{ width: 32, height: 32, borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", background: depth === i ? "var(--color-fg)" : "var(--color-bg-muted)", color: depth === i ? "var(--color-bg)" : "var(--color-fg-muted)", fontSize: "0.8125rem", cursor: "pointer", fontFamily: "inherit", transition: "transform 140ms var(--easing-out), background 150ms var(--easing-out), color 150ms var(--easing-out), border-color 150ms var(--easing-out)" }}>
            {i + 1}
          </button>
        ))}
      </div>

      <div style={{ background: "var(--color-bg-muted)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "var(--space-10)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-8)", minHeight: 200 }}>
        {/* Breadcrumb — vertical trail reading top→bottom, hierarchy descending */}
        <nav aria-label="경로">
          <ol style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", listStyle: "none", margin: 0, padding: 0 }}>
            {items.map((item, i) => (
              <li key={item.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontSize: "0.9375rem",
                    letterSpacing: "0.05em",
                    color: i === items.length - 1 ? "var(--color-fg)" : "var(--color-fg-muted)",
                    fontWeight: i === items.length - 1 ? 700 : 400,
                  }}
                  aria-current={i === items.length - 1 ? "page" : undefined}
                >
                  {item.label}
                </span>
                {i < items.length - 1 && <span aria-hidden style={{ color: "var(--color-fg-subtle)", fontSize: "0.875rem", transform: "rotate(90deg)", lineHeight: 1 }}>›</span>}
              </li>
            ))}
          </ol>
        </nav>

        {/* Content below the breadcrumb — vertical */}
        <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "1.0625rem", letterSpacing: "0.1em", lineHeight: 1.9, color: "var(--color-fg)", opacity: depth === 3 ? 1 : 0.3, transition: "opacity 200ms ease" }}>
          태초에 하나님이 천지를 창조하시니라
        </span>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The breadcrumb reads as a vertical trail, top→bottom, with each level separated by a downward chevron — hierarchy descends along the same axis as the reading. Click depth to navigate the tree.
      </p>
    </div>
  );
}
