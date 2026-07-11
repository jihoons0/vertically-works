"use client";

import { BentoTile, Cursor, useLoopStep } from "./bento-shared";

// Steps: 0 idle → 1 glide to ref 1 → 2 hover (tooltip) → 3 glide to ref 2 → 4 hover → 5 drift away
const DURATIONS = [900, 850, 1600, 850, 1600, 700] as const;
const REDUCED_STEP = 2; // resolved state: first tooltip open, no cursor

const COLUMNS = [
  { x: 57, ref: "1", text: "글씨를 세로로 쓰고", tip: "첫째 줄" },
  { x: 43, ref: "2", text: "오른쪽에서 왼쪽으로", tip: "둘째 줄" },
];
const REF_Y = 44;

/** A vertical column with a reference trigger up top, as in TooltipDemo: on
 *  hover the ref underlines and a vertical tooltip opens to its left,
 *  following reading direction, never below where it would break the column. */
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
            zIndex: 10,
            display: "flex",
            background: "var(--color-fg)",
            color: "var(--color-bg)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-2)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "translateY(-50%)"
              : "translateY(-50%) translateX(4px)",
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

export function LoopTooltip() {
  const { step, reduced } = useLoopStep(DURATIONS, REDUCED_STEP);
  const hover1 = step === 2;
  const hover2 = step === 4;
  const atRef1 = step === 1 || step === 2;
  const atRef2 = step === 3 || step === 4;

  return (
    <BentoTile
      index="04"
      label="Tooltip on hover"
      description="Hover still exists in vertical UI: the tooltip opens to the left of the trigger · following reading direction · never below, where it would break the column."
    >
      <TooltipColumn x={COLUMNS[0].x} refLabel={COLUMNS[0].ref} text={COLUMNS[0].text} tip={COLUMNS[0].tip} hovered={hover1} />
      <TooltipColumn x={COLUMNS[1].x} refLabel={COLUMNS[1].ref} text={COLUMNS[1].text} tip={COLUMNS[1].tip} hovered={hover2} />

      <Cursor
        x={atRef1 ? COLUMNS[0].x : atRef2 ? COLUMNS[1].x : 78}
        y={atRef1 || atRef2 ? REF_Y : 216}
        shown={!reduced}
      />
    </BentoTile>
  );
}
