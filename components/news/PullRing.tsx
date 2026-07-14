"use client";

/**
 * PullRing · the fill indicator for pull-to-paginate (NEW · registry
 * candidate; the studio's signature interaction, first web implementation).
 *
 * A ring that fills with pull distance and "arms" at 100% — the classic
 * pull-to-refresh affordance rotated onto the horizontal axis. Pure
 * SVG stroke-dashoffset: opacity/stroke only, no layout, tracks the
 * gesture 1:1 (no transition while the finger is down).
 */

const R = 11;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function PullRing({
  progress,
  visible,
}: {
  /** 0..1+ · ≥1 means armed (fires on release). */
  progress: number;
  visible: boolean;
}) {
  const clamped = Math.min(1, Math.max(0, progress));
  const armed = progress >= 1;
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden
      style={{
        opacity: visible ? 1 : 0,
        transform: `scale(${visible ? (armed ? 1.12 : 1) : 0.6})`,
        transition: visible
          ? "transform var(--duration-fast) var(--easing-out)"
          : "opacity var(--duration-base) var(--easing-default), transform var(--duration-base) var(--easing-default)",
      }}
    >
      <circle cx="16" cy="16" r={R} fill="none" stroke="var(--color-border-strong)" strokeWidth="2.5" />
      <circle
        cx="16"
        cy="16"
        r={R}
        fill="none"
        stroke="var(--color-fg)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE * (1 - clamped)}
        transform="rotate(-90 16 16)"
      />
      {armed && <circle cx="16" cy="16" r="4" fill="var(--color-fg)" />}
    </svg>
  );
}
