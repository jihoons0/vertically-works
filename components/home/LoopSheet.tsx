"use client";

import { BentoTile, Cursor, useLoopStep, type Lang } from "./bento-shared";

// Steps: 0 idle → 1 glide to trigger → 2 press → 3 sheet open (hold) → 4 press → 5 closed
const DURATIONS = [1100, 900, 240, 2200, 240, 700] as const;
const REDUCED_STEP = 3; // resolved state: sheet open, no cursor

const FRAME_W = 150;
const FRAME_H = 210;
const SHEET_W = 64;
// Trigger sits inside the frame at its left edge · where the next column would appear.
const TRIGGER_X = `calc(50% - ${FRAME_W / 2 - 22}px)`;
const TRIGGER_Y = 130;

const T: Record<Lang, { trigger: string; sheet: string; lines: [string, string] }> = {
  ko: { trigger: "메뉴", sheet: "설정", lines: ["글을 세로로", "읽는 화면"] },
  ja: { trigger: "メニュー", sheet: "設定", lines: ["文字を縦に", "読む画面"] },
  zh: { trigger: "選單", sheet: "設定", lines: ["豎著閱讀", "的畫面"] },
};

export function LoopSheet({ lang }: { lang: Lang }) {
  const { step, reduced } = useLoopStep(DURATIONS, REDUCED_STEP);
  const t = T[lang];
  const open = step === 3 || step === 4;
  const pressed = step === 2 || step === 4;
  const atTrigger = step >= 1 && step <= 4;

  return (
    <BentoTile
      index="05"
      label="Edge sheet"
      description="The sheet enters from the reading direction · the left edge, where the next column would appear · not from screen geometry. Scrim, slide, and dismissal all travel the same axis."
    >
      {/* Mini screen */}
      <div
        style={{
          position: "absolute",
          left: `calc(50% - ${FRAME_W / 2}px)`,
          top: (260 - FRAME_H) / 2,
          width: FRAME_W,
          height: FRAME_H,
          borderRadius: "var(--radius-lg)",
          border: "1.5px solid var(--color-border-strong)",
          background: "var(--color-bg)",
          overflow: "hidden",
        }}
      >
        {/* Page content · columns at the reading start (right) */}
        <div
          style={{
            position: "absolute",
            right: 14,
            top: 16,
            display: "flex",
            flexDirection: "row-reverse",
            gap: 10,
          }}
        >
          {t.lines.map((line) => (
            <span
              key={line}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: 11,
                letterSpacing: "0.1em",
                lineHeight: 1.6,
                color: "var(--color-fg-muted)",
                whiteSpace: "nowrap",
              }}
            >
              {line}
            </span>
          ))}
        </div>

        {/* Trigger · a small vertical pill at the left edge */}
        <span
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: `translateY(-50%) scale(${pressed && !open ? 0.92 : 1})`,
            transition: "transform var(--duration-fast) var(--easing-out)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "var(--color-fg)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-full)",
            padding: "8px 4px",
            background: "var(--color-bg)",
          }}
        >
          {t.trigger}
        </span>

        {/* Scrim */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.28)",
            opacity: open ? 1 : 0,
            transition: "opacity var(--duration-base) var(--easing-default)",
          }}
        />

        {/* Sheet · slides in from the left edge, along the reading direction */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: SHEET_W,
            background: "var(--color-fg)",
            color: "var(--color-bg)",
            borderRadius: "0 var(--radius-lg) var(--radius-lg) 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: open ? "translateX(0)" : "translateX(-105%)",
            transition: "transform var(--duration-slow) var(--easing-drawer)",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
            }}
          >
            {t.sheet}
          </span>
        </div>
      </div>

      <Cursor
        x={atTrigger ? TRIGGER_X : 78}
        y={atTrigger ? TRIGGER_Y : 216}
        pressed={pressed}
        shown={!reduced}
      />
    </BentoTile>
  );
}
