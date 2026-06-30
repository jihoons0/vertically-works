"use client";

import { useState } from "react";

const VARIANTS = [
  { id: "primary", label: "Primary", labelKo: "다음 장" },
  { id: "outline", label: "Outline", labelKo: "이전 장" },
  { id: "ghost", label: "Ghost", labelKo: "설정" },
  { id: "disabled", label: "Disabled", labelKo: "비활성" },
];

export function ButtonDemo() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Interactive demo */}
      <div
        style={{
          background: "var(--color-bg-muted)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-10) var(--space-8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-6)",
          minHeight: 200,
        }}
      >
        {/* Primary */}
        <button
          onMouseDown={() => setActive("primary")}
          onMouseUp={() => setActive(null)}
          onMouseLeave={() => setActive(null)}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            padding: "var(--space-5) var(--space-4)",
            background: "var(--color-fg)",
            color: "var(--color-bg)",
            border: "none",
            borderRadius: "var(--radius-xl)",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            cursor: "pointer",
            transform: active === "primary" ? "scale(0.94)" : "scale(1)",
            transition: `transform 80ms ease`,
            fontFamily: "inherit",
          }}
        >
          다음 장
        </button>

        {/* Outline */}
        <button
          onMouseDown={() => setActive("outline")}
          onMouseUp={() => setActive(null)}
          onMouseLeave={() => setActive(null)}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            padding: "var(--space-5) var(--space-4)",
            background: "transparent",
            color: "var(--color-fg)",
            border: "1.5px solid var(--color-border-strong)",
            borderRadius: "var(--radius-xl)",
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "0.06em",
            cursor: "pointer",
            transform: active === "outline" ? "scale(0.94)" : "scale(1)",
            transition: `transform 80ms ease`,
            fontFamily: "inherit",
          }}
        >
          이전 장
        </button>

        {/* Ghost */}
        <button
          onMouseDown={() => setActive("ghost")}
          onMouseUp={() => setActive(null)}
          onMouseLeave={() => setActive(null)}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            padding: "var(--space-5) var(--space-4)",
            background: "transparent",
            color: "var(--color-fg-muted)",
            border: "none",
            borderRadius: "var(--radius-xl)",
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "0.06em",
            cursor: "pointer",
            transform: active === "ghost" ? "scale(0.94)" : "scale(1)",
            transition: `transform 80ms ease`,
            fontFamily: "inherit",
          }}
        >
          설정
        </button>

        {/* Disabled */}
        <button
          disabled
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            padding: "var(--space-5) var(--space-4)",
            background: "var(--color-bg-muted)",
            color: "var(--color-fg-subtle)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "0.06em",
            cursor: "not-allowed",
            opacity: 0.45,
            fontFamily: "inherit",
          }}
        >
          비활성
        </button>
      </div>

      {/* Variant labels */}
      <div style={{ display: "flex", gap: "var(--space-6)", justifyContent: "center" }}>
        {VARIANTS.map((v) => (
          <div key={v.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-1)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>{v.label}</span>
            <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)" }}>{v.labelKo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
