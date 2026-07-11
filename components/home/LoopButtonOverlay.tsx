"use client";

import { BentoTile, Cursor, useLoopStep } from "./bento-shared";

// Steps: 0 idle → 1 glide to button → 2 press → 3 dialog open → 4 dialog closing
const DURATIONS = [1100, 900, 240, 2100, 420] as const;
const REDUCED_STEP = 3; // resolved state: dialog open, no cursor

const BUTTON_X = 50;
const BUTTON_Y = 130;

export function LoopButtonOverlay() {
  const { step, reduced } = useLoopStep(DURATIONS, REDUCED_STEP);

  const pressed = step === 2;
  const open = step === 3;

  return (
    <BentoTile
      index="01"
      label="Vertical dialog"
      description="Title, body, and actions read as columns, right to left · the overlay is a layer above the flow, so it scales from center."
    >
      {/* Trigger · a vertical pill button, like DialogDemo's 열기 */}
      <div
        style={{
          position: "absolute",
          left: `${BUTTON_X}%`,
          top: BUTTON_Y,
          transform: `translate(-50%, -50%) scale(${pressed ? 0.92 : 1})`,
          transition: "transform var(--duration-fast) var(--easing-out)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          padding: "var(--space-5) var(--space-3)",
          borderRadius: "var(--radius-full)",
          background: "var(--color-fg)",
          color: "var(--color-bg)",
          fontSize: "0.875rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        열기
      </div>

      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
          opacity: open ? 1 : 0,
          transition: "opacity var(--duration-base) var(--easing-default)",
          zIndex: 10,
        }}
      />

      {/* Dialog · vertical columns reading R→L: title rightmost, actions last */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${open ? 1 : 0.85})`,
          opacity: open ? 1 : 0,
          transition: open
            ? "transform var(--duration-slow) var(--easing-spring), opacity var(--duration-base) var(--easing-out)"
            : "transform var(--duration-base) var(--easing-in), opacity var(--duration-base) var(--easing-in)",
          zIndex: 20,
          background: "var(--color-bg)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          padding: "var(--space-5) var(--space-4)",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "stretch",
          gap: "var(--space-4)",
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "var(--color-fg)",
            letterSpacing: "0.05em",
          }}
        >
          다음 장으로 갈까요?
        </span>
        <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-2)" }}>
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              padding: "var(--space-3) var(--space-2)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--color-fg-muted)",
              letterSpacing: "0.05em",
            }}
          >
            취소
          </span>
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              padding: "var(--space-3) var(--space-2)",
              borderRadius: "var(--radius-lg)",
              background: "var(--color-fg)",
              color: "var(--color-bg)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            이동
          </span>
        </div>
      </div>

      <Cursor
        x={step === 0 ? 78 : BUTTON_X}
        y={step === 0 ? 216 : BUTTON_Y + 4}
        pressed={pressed}
        shown={!reduced}
      />
    </BentoTile>
  );
}
