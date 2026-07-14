"use client";

import { TieredPage } from "@/registry/components/tiered-page";

// Verse-per-column content · a label starts a verse, unlabeled columns continue it.
const NUMBERED = [
  { label: "1", text: "글씨를 세로로 쓰는" },
  { text: "것을 세로쓰기라 한다" },
  { label: "2", text: "한국어와 중국어와" },
  { text: "일본어가 세로로" },
  { text: "쓰였다" },
  { label: "3", text: "우종서의 가장 오래된" },
  { text: "기록은 중국에서" },
  { text: "발견되었다" },
  { label: "4", text: "죽간을 쓰던 때부터" },
  { text: "세로로 썼다" },
];

// The same layout without numbers · a plain two-row spread of columns.
const PLAIN = [
  { text: "산에는 꽃 피네" },
  { text: "꽃이 피네" },
  { text: "갈 봄 여름 없이" },
  { text: "꽃이 피네" },
  { text: "산에서 우는 작은" },
  { text: "새여 꽃이 좋아" },
  { text: "산에서 사노라네" },
  { text: "산에는 꽃 지네" },
];

export function TieredPageDemo({ plain = false }: { plain?: boolean }) {
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
