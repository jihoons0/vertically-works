"use client";

import { BentoTile, Cursor, useLoopStep } from "./bento-shared";

// Steps: 0 idle (light) → 1 glide to toggle → 2 press (on → dark) → 3 hold dark → 4 press (off) → 5 settle light
const DURATIONS = [1100, 850, 240, 1900, 240, 900] as const;
const REDUCED_STEP = 3; // resolved state: toggled on, panel dark, no cursor

const CELL_W = 68;
const CELL_GAP = 12;
const PANEL_TOP = 28;

/** One vertical list cell from the Toggle component: label up top, the
 *  toggle pill at the bottom — its thumb travels the reading axis (up = on). */
function ToggleCell({ label, sub, on }: { label: string; sub: string; on: boolean }) {
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
      <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: "var(--space-2)" }}>
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--color-fg)",
            letterSpacing: "0.05em",
            transition: "color var(--duration-base) var(--easing-default)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.625rem",
            color: "var(--color-fg-subtle)",
            letterSpacing: "0.05em",
            paddingTop: 2,
            transition: "color var(--duration-base) var(--easing-default)",
          }}
        >
          {sub}
        </span>
      </div>

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

export function LoopToggle() {
  const { step, reduced } = useLoopStep(DURATIONS, REDUCED_STEP);
  const on = step === 2 || step === 3;
  const pressed = step === 2 || step === 4;
  const atToggle = step >= 1 && step <= 4;

  return (
    <BentoTile
      index="02"
      label="List-cell toggle"
      description="The on/off thumb travels the reading axis — up is on — and flipping it re-themes the panel, so the toggle matches the direction the eye moves."
    >
      {/* Mini settings panel, as in the Toggle component: cells stack as
          columns flowing R→L, and data-theme flips its tokens when toggled */}
      <div
        data-theme={on ? "dark" : "light"}
        style={{
          position: "absolute",
          left: "50%",
          top: PANEL_TOP,
          transform: "translateX(-50%)",
          padding: "var(--space-3)",
          display: "flex",
          flexDirection: "row-reverse",
          gap: CELL_GAP,
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border-strong)",
          background: "var(--color-bg)",
          transition:
            "background var(--duration-base) var(--easing-default), border-color var(--duration-base) var(--easing-default)",
        }}
      >
        <ToggleCell label="야간 모드" sub="Dark mode" on={on} />
        <ToggleCell label="세로 읽기" sub="Vertical" on />
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
