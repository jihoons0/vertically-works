import { Info } from "lucide-react";

/**
 * Light-blue informational banner for application pages that are still in
 * progress. The blue is mixed with the theme background/foreground so it
 * stays legible across light, dark, and sepia.
 */
export function WipBanner({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-4) var(--space-5)",
        borderRadius: "var(--radius-lg)",
        background: "color-mix(in srgb, #3b82f6 9%, var(--color-bg))",
        border: "1px solid color-mix(in srgb, #3b82f6 28%, transparent)",
        color: "color-mix(in srgb, #2563eb 65%, var(--color-fg))",
        fontSize: "0.9375rem",
        lineHeight: 1.6,
      }}
    >
      <Info size={16} strokeWidth={2} aria-hidden style={{ flexShrink: 0, marginTop: 4 }} />
      <p style={{ margin: 0 }}>{children}</p>
    </div>
  );
}
