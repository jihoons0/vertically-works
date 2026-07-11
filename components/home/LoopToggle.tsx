"use client";

import { BentoTile, Cursor, useLoopStep, type Lang } from "./bento-shared";

// Steps: 0 idle (light) → 1 glide to toggle → 2 press (on → dark) → 3 hold dark → 4 press (off) → 5 settle light
const DURATIONS = [1100, 850, 240, 1900, 240, 900] as const;
const REDUCED_STEP = 3; // resolved state: toggled on, no cursor

const CELL_W = 68;
const CELL_GAP = 12;

const T: Record<Lang, { night: string; vertical: string }> = {
  ko: { night: "야간 모드", vertical: "세로 읽기" },
  ja: { night: "夜間モード", vertical: "縦書き" },
  zh: { night: "夜間模式", vertical: "豎排" },
};

/** One vertical list cell: label up top, the toggle pill at the bottom,
 *  its thumb travels the reading axis (up = on). */
function ToggleCell({ label, on }: { label: string; on: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-4)",
        width: CELL_W,
        height: 176,
        padding: "var(--space-3) var(--space-2)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
        transition:
          "background var(--duration-base) var(--easing-default), border-color var(--duration-base) var(--easing-default)",
      }}
    >
      <span
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--color-fg)",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          transition: "color var(--duration-base) var(--easing-default)",
        }}
      >
        {label}
      </span>

      <div
        style={{
          width: 24,
          height: 40,
          borderRadius: "var(--radius-full)",
          background: on ? "var(--color-fg)" : "var(--color-border-strong)",
          position: "relative",
          flexShrink: 0,
          transition: "background var(--duration-base) var(--easing-default)",
        }}
      >
        <div
          className="corner-round"
          style={{
            position: "absolute",
            left: 3,
            top: on ? 3 : 19,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "white",
            transition: "top var(--duration-base) var(--easing-out)",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
    </div>
  );
}

export function LoopToggle({ lang }: { lang: Lang }) {
  const { step, reduced } = useLoopStep(DURATIONS, REDUCED_STEP);
  const t = T[lang];
  const on = step === 2 || step === 3;
  const pressed = step === 2 || step === 4;
  const atToggle = step >= 1 && step <= 4;

  return (
    <BentoTile
      index="02"
      label="List-cell toggle"
      description="The on/off thumb travels the reading axis · up is on · and flipping it re-themes the cells, so the toggle matches the direction the eye moves."
    >
      {/* No panel box: the two cells sit directly on the stage. data-theme
          scopes the color tokens so flipping the toggle re-themes the cells. */}
      <div
        data-theme={on ? "dark" : "light"}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: CELL_GAP,
          flexDirection: "row-reverse",
        }}
      >
        <ToggleCell label={t.night} on={on} />
        <ToggleCell label={t.vertical} on />
      </div>

      <Cursor
        x={atToggle ? `calc(50% + ${CELL_GAP / 2 + CELL_W / 2}px)` : 78}
        y={atToggle ? 186 : 216}
        pressed={pressed}
        shown={!reduced}
      />
    </BentoTile>
  );
}
