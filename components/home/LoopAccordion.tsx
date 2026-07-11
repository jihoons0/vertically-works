"use client";

import { BentoTile, Cursor, useLoopStep, type Lang } from "./bento-shared";

// Steps: 0 idle → 1 glide to cell → 2 press → 3 expanded → 4 press again → 5 collapsed
const DURATIONS = [1000, 900, 240, 2100, 240, 700] as const;
const REDUCED_STEP = 3; // resolved state: expanded, no cursor

const CELL_LEFT = 40; // % · the left edge stays put; detail unfolds rightward
const CELL_TOP = 84;
const CURSOR_X = `calc(${CELL_LEFT}% + 22px)`;
const CURSOR_Y = 130;
const NOTE_W = 68;

const T: Record<Lang, { title: string; notes: [string, string] }> = {
  ko: { title: "할 일", notes: ["우유 사기", "산책 하기"] },
  ja: { title: "用事", notes: ["牛乳を買う", "散歩する"] },
  zh: { title: "待辦", notes: ["買牛奶", "去散步"] },
};

export function LoopAccordion({ lang }: { lang: Lang }) {
  const { step, reduced } = useLoopStep(DURATIONS, REDUCED_STEP);
  const t = T[lang];
  const open = step === 3 || step === 4;
  const pressed = step === 2 || step === 4;
  const atCell = step >= 1 && step <= 4;

  return (
    <BentoTile
      index="03"
      label="Column accordion"
      description="Disclosure widens the cell sideways: detail unfolds as new columns beside the title, so the column's reading length never breaks."
    >
      <div
        style={{
          position: "absolute",
          left: `${CELL_LEFT}%`,
          top: CELL_TOP,
          display: "flex",
          alignItems: "stretch",
          padding: "var(--space-3)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg)",
        }}
      >
        {/* Header column · title with a chevron pointing where detail unfolds */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-3)",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.9375rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "var(--color-fg)",
              whiteSpace: "nowrap", // one column, never wrap to a second line
            }}
          >
            {t.title}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              color: "var(--color-fg-subtle)",
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform var(--duration-slow) var(--easing-drawer)",
            }}
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </div>

        {/* Detail · slides out to the right */}
        <div
          style={{
            width: open ? NOTE_W : 0,
            opacity: open ? 1 : 0,
            overflow: "hidden",
            transition:
              "width var(--duration-slow) var(--easing-drawer), opacity var(--duration-slow) var(--easing-drawer)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              gap: "var(--space-3)",
              paddingLeft: "var(--space-3)",
              width: NOTE_W,
            }}
          >
            {t.notes.map((note) => (
              <span
                key={note}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.08em",
                  lineHeight: 1.7,
                  color: "var(--color-fg-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Cursor
        x={atCell ? CURSOR_X : 78}
        y={atCell ? CURSOR_Y : 216}
        pressed={pressed}
        shown={!reduced}
      />
    </BentoTile>
  );
}
