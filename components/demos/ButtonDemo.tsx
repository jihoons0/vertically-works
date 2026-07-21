"use client";

// Dogfoods the real registry component · the same file
// `npx verticallyworks add vertical-button` copies into a project.
import { VerticalButton } from "@/components/vw/vertical-button";
import { usePicked, buttonText } from "@/components/demos/sampleText";

const VARIANTS = [
  { id: "primary", label: "Primary" },
  { id: "outline", label: "Outline" },
  { id: "ghost", label: "Ghost" },
  { id: "disabled", label: "Disabled" },
];

export function ButtonDemo() {
  const labels = usePicked(buttonText);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Interactive demo · press feedback comes from the component itself */}
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
        <VerticalButton variant="primary">{labels[0]}</VerticalButton>
        <VerticalButton variant="outline">{labels[1]}</VerticalButton>
        <VerticalButton variant="ghost">{labels[2]}</VerticalButton>
        <VerticalButton variant="outline" disabled>{labels[3]}</VerticalButton>
      </div>

      {/* Variant labels */}
      <div style={{ display: "flex", gap: "var(--space-6)", justifyContent: "center" }}>
        {VARIANTS.map((v, i) => (
          <div key={v.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-1)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>{v.label}</span>
            <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)" }}>{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
