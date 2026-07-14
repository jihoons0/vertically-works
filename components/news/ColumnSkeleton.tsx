"use client";

/**
 * ColumnSkeleton · loading respects the grid (NEW · registry candidate).
 *
 * Ghost columns that mirror the story cells' exact metrics — height, column
 * width, gap, leading slot, title/subtitle bars — so headlines land precisely
 * where the ghosts were. The pulse is opacity-only; reduced motion keeps the
 * ghosts visible at rest (state is still shown, nothing snaps).
 */

export function ColumnSkeleton({
  count = 8,
  height,
  cellWidth,
  gap,
}: {
  count?: number;
  height: number | string;
  cellWidth: number;
  gap: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        gap,
        height: "100%",
        alignItems: "stretch",
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="vn-skeleton"
          style={{
            width: cellWidth,
            height,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-3)",
            padding: "var(--space-4) var(--space-3)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            animationDelay: `${i * 90}ms`,
          }}
        >
          {/* leading index slot */}
          <span style={{ width: 16, height: 16, borderRadius: "var(--radius-sm)", background: "var(--color-bg-muted)" }} />
          {/* title / subtitle columns */}
          <span style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-2)", flex: 1, minHeight: 0 }}>
            <span style={{ width: 15, height: "88%", borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)" }} />
            <span style={{ width: 10, height: "55%", borderRadius: "var(--radius-full)", background: "var(--color-bg-subtle)" }} />
          </span>
          <span style={{ width: 12, height: 12, borderRadius: "var(--radius-sm)", background: "var(--color-bg-muted)" }} />
        </div>
      ))}
      <style>{`
        .vn-skeleton { animation: vn-skeleton-pulse 1.4s var(--easing-in-out) infinite; }
        @keyframes vn-skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vn-skeleton { animation: none; opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
