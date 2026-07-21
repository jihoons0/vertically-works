"use client";

import { TieredPage } from "@/registry/components/tiered-page";
import { usePicked, tieredText } from "@/components/demos/sampleText";

// Verse-per-column content (a label starts a verse, unlabeled columns continue it)
// and a numberless plain spread. Both come from sampleText, per language.
export function TieredPageDemo({ plain = false }: { plain?: boolean }) {
  const { numbered: NUMBERED, plain: PLAIN } = usePicked(tieredText);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 440,
            padding: "var(--space-6) var(--space-5)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            background: "var(--color-bg)",
          }}
        >
          <TieredPage columns={plain ? PLAIN : NUMBERED} height={plain ? 420 : 500} />
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        {plain
          ? "The plain spread: two stacked runs of right-to-left columns divided by a single rule · no scroll, the page is the unit."
          : "The numbered 절별 page: each verse starts a column under an upright number; a hairline underlines the number band, a heavier rule divides the tiers. Reading flows down each column, leftward across the tier, then drops to the second tier's rightmost column."}
      </p>
    </div>
  );
}
