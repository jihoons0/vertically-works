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
  cellWidth,
  gap,
}: {
  count?: number;
  cellWidth: number;
  gap: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        gridAutoFlow: "column",
        gridAutoColumns: `${cellWidth}px`,
        gap,
        height: "100%",
        direction: "rtl",
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="vn-skeleton"
          style={{
            height: "100%",
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
          {/* title / body / subtitle columns */}
          <span style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-2)", flex: 1, minHeight: 0 }}>
            <span style={{ width: 15, height: "88%", borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)" }} />
            <span style={{ width: 20, height: "60%", borderRadius: "var(--radius-full)", background: "var(--color-bg-subtle)" }} />
            <span style={{ width: 9, height: "38%", borderRadius: "var(--radius-full)", background: "var(--color-bg-subtle)" }} />
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
