"use client";

import { BentoTile, Cursor, useLoopStep, type Lang } from "./bento-shared";

// Steps: 0 idle → 1 glide to ref 1 → 2 hover (tooltip) → 3 glide to ref 2 → 4 hover → 5 drift away
const DURATIONS = [900, 850, 1600, 850, 1600, 700] as const;
const REDUCED_STEP = 2; // resolved state: first tooltip open, no cursor

const T: Record<Lang, { texts: [string, string]; tips: [string, string] }> = {
  ko: { texts: ["글씨를 세로로 쓰고", "오른쪽에서 왼쪽으로"], tips: ["첫째 줄", "둘째 줄"] },
  ja: { texts: ["文字を縦に書き", "右から左へ"], tips: ["一行目", "二行目"] },
  zh: { texts: ["文字豎著書寫", "從右到左"], tips: ["第一行", "第二行"] },
};

const COLS = [
  { x: 57, ref: "1" },
  { x: 43, ref: "2" },
];
const REF_Y = 44;

/** A vertical column with a reference trigger up top: on hover the ref
 *  underlines and a vertical tooltip opens to its left. The hovered column is
 *  lifted (zIndex) so its tooltip sits above the other column's ref and text. */
function TooltipColumn({
  x,
  refLabel,
  text,
  tip,
  hovered,
}: {
  x: number;
  refLabel: string;
  text: string;
  tip: string;
  hovered: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: 36,
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-2)",
        zIndex: hovered ? 50 : 1, // lift the active column above the other's ref/text
      }}
    >
      <span
        style={{
          position: "relative",
          writingMode: "vertical-rl",
          fontSize: "0.6875rem",
          fontFamily: "var(--font-geist-mono)",
          letterSpacing: "0.05em",
          color: hovered ? "var(--color-fg)" : "var(--color-fg-subtle)",
          borderBottom: hovered ? "1px solid var(--color-fg)" : "1px solid transparent",
          paddingBottom: 2,
          transition:
            "color var(--duration-fast) var(--easing-default), border-color var(--duration-fast) var(--easing-default)",
        }}
      >
        {refLabel}

        {/* Tooltip · enters leftward, along the reading axis */}
        <span
          style={{
            position: "absolute",
            right: "calc(100% + 10px)",
            top: "50%",
            zIndex: 60,
            display: "flex",
            background: "var(--color-fg)",
            color: "var(--color-bg)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-2)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(-50%)" : "translateY(-50%) translateX(4px)",
            transition:
              "opacity var(--duration-base) var(--easing-out), transform var(--duration-base) var(--easing-out)",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            {tip}
          </span>
          <span
            style={{
              position: "absolute",
              width: 7,
              height: 7,
              background: "var(--color-fg)",
              right: -3,
              top: "50%",
              marginTop: -3,
              transform: "rotate(45deg)",
            }}
          />
        </span>
      </span>

      <span
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "1rem",
          letterSpacing: "0.1em",
          lineHeight: 1.9,
          color: "var(--color-fg)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

export function LoopTooltip({ lang }: { lang: Lang }) {
  const { step, reduced } = useLoopStep(DURATIONS, REDUCED_STEP);
  const t = T[lang];
  const hover1 = step === 2;
  const hover2 = step === 4;
  const atRef1 = step === 1 || step === 2;
  const atRef2 = step === 3 || step === 4;

  return (
    <BentoTile
      index="04"
      label="Tooltip on hover"
      description="Hover still exists in vertical UI: the tooltip opens to the left of the trigger, following reading direction, never below, where it would break the column."
    >
      <TooltipColumn x={COLS[0].x} refLabel={COLS[0].ref} text={t.texts[0]} tip={t.tips[0]} hovered={hover1} />
      <TooltipColumn x={COLS[1].x} refLabel={COLS[1].ref} text={t.texts[1]} tip={t.tips[1]} hovered={hover2} />

      <Cursor
        x={atRef1 ? COLS[0].x : atRef2 ? COLS[1].x : 78}
        y={atRef1 || atRef2 ? REF_Y : 216}
        shown={!reduced}
      />
    </BentoTile>
  );
}
