"use client";

// Dogfoods the real registry component — the same file
// `npx verticallyworks add vertical-button` copies into a project.
import { VerticalButton } from "@/components/vw/vertical-button";

const VARIANTS = [
  { id: "primary", label: "Primary", labelKo: "다음 장" },
  { id: "outline", label: "Outline", labelKo: "이전 장" },
  { id: "ghost", label: "Ghost", labelKo: "설정" },
  { id: "disabled", label: "Disabled", labelKo: "비활성" },
];

export function ButtonDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Interactive demo — press feedback comes from the component itself */}
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
        <VerticalButton variant="primary">다음 장</VerticalButton>
        <VerticalButton variant="outline">이전 장</VerticalButton>
        <VerticalButton variant="ghost">설정</VerticalButton>
        <VerticalButton variant="outline" disabled>비활성</VerticalButton>
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
