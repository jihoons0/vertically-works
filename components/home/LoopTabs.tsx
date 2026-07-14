"use client";

import { BentoTile, Cursor, useLoopStep, type Lang } from "./bento-shared";

// Steps: 0 idle (tab 1) → 1 glide to tab 2 → 2 press → 3 hold → 4 glide to tab 3 → 5 press → 6 hold → 7 drift away
const DURATIONS = [1100, 850, 240, 1800, 850, 240, 1800, 700] as const;
const REDUCED_STEP = 3; // resolved state: second tab selected, no cursor

// Rail on the reading axis · right of the panel, tabs stacked top→bottom.
const RAIL_X = 58; // % · left edge of the rail
const TAB_H = 56;
const TAB_GAP = 10;
const RAIL_TOP = (260 - (3 * TAB_H + 2 * TAB_GAP)) / 2;
const tabCenterY = (i: number) => RAIL_TOP + i * (TAB_H + TAB_GAP) + TAB_H / 2;

const T: Record<Lang, { tabs: [string, string, string] }> = {
  ko: { tabs: ["소개", "기능", "설정"] },
  ja: { tabs: ["紹介", "機能", "設定"] },
  zh: { tabs: ["簡介", "功能", "設定"] },
};

// Abstract panel content per tab · column heights, read right→left.
const PANEL: [number[], number[], number[]] = [
  [96, 72, 48],
  [56, 96, 76],
  [80, 52, 96],
];

export function LoopTabs({ lang }: { lang: Lang }) {
  const { step, reduced } = useLoopStep(DURATIONS, REDUCED_STEP);
  const t = T[lang];
  const active = step >= 2 && step <= 3 ? 1 : step >= 5 && step <= 6 ? 2 : 0;
  const pressed = step === 2 || step === 5;
  const atTab = step >= 1 && step <= 6;
  const targetTab = step <= 3 ? 1 : 2;

  return (
    <BentoTile
      index="06"
      label="Vertical tabs"
      description="A tab rail on the reading axis: vertical labels stacked at the right edge, panels unfolding to their left, the selection indicator traveling down the rail · never across it."
    >
      {/* Panel · columns to the left of the rail, content follows the tab */}
      <div
        style={{
          position: "absolute",
          left: `calc(${RAIL_X}% - 96px)`,
          top: RAIL_TOP + 4,
          height: 3 * TAB_H + 2 * TAB_GAP - 8,
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-start",
          gap: 14,
        }}
      >
        {PANEL[active].map((h, i) => (
          <span
            key={`${active}-${i}`}
            style={{
              width: 4,
              height: h,
              borderRadius: "var(--radius-full)",
              background: i === 0 ? "var(--color-border-strong)" : "var(--color-bg-muted)",
              transition: "height var(--duration-slow) var(--easing-out)",
            }}
          />
        ))}
      </div>

      {/* Rail · vertical labels, indicator on the right edge */}
      <div
        style={{
          position: "absolute",
          left: `${RAIL_X}%`,
          top: RAIL_TOP,
          display: "flex",
          flexDirection: "column",
          gap: TAB_GAP,
          borderRight: "1.5px solid var(--color-border)",
          paddingRight: 10,
        }}
      >
        {/* Selection indicator · travels down the rail */}
        <span
          style={{
            position: "absolute",
            right: -1.5,
            top: 0,
            width: 2.5,
            height: TAB_H,
            borderRadius: "var(--radius-full)",
            background: "var(--color-fg)",
            transform: `translateY(${active * (TAB_H + TAB_GAP)}px)`,
            transition: "transform var(--duration-base) var(--easing-out)",
          }}
        />
        {t.tabs.map((label, i) => (
          <span
            key={label}
            style={{
              height: TAB_H,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: 12,
              letterSpacing: "0.1em",
              fontWeight: i === active ? 600 : 400,
              color: i === active ? "var(--color-fg)" : "var(--color-fg-subtle)",
              transition: "color var(--duration-fast) var(--easing-default), font-weight var(--duration-fast) var(--easing-default)",
            }}
          >
            {label}
          </span>
        ))}
      </div>

      <Cursor
        x={atTab ? `calc(${RAIL_X}% + 8px)` : 78}
        y={atTab ? tabCenterY(targetTab) : 216}
        pressed={pressed}
        shown={!reduced}
      />
    </BentoTile>
  );
}
