"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Matches the guard in components/Reveal.tsx — true when the user asks for reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Cycles through the steps of a self-playing demo loop. `durations[i]` is how
 * long step `i` holds before advancing (wraps around). Pauses while the tab is
 * hidden. Under prefers-reduced-motion the loop parks on `reducedStep` — a
 * representative resolved state — and `reduced` is returned so callers can
 * also hide the animated cursor.
 */
export function useLoopStep(
  durations: readonly number[],
  reducedStep = 0
): { step: number; reduced: boolean } {
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return; // parked on reducedStep below — no timers
    let timer: number | undefined;
    const advance = () => setStep((s) => (s + 1) % durations.length);
    const start = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(advance, durations[step]);
    };
    const onVisibility = () => {
      if (document.hidden) window.clearTimeout(timer);
      else start();
    };
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [step, reduced, durations]);

  return { step: reduced ? reducedStep : step, reduced };
}

/**
 * The animated pointer for the loop demos. `x` as a number is a percentage of
 * the stage width (the pointer tip lands on that vertical line); `y` as a
 * number is px from the stage top — stages have a fixed height, so px keeps
 * targets exact while width stays fluid. Either accepts a CSS length string
 * (e.g. `calc(50% + 40px)`) for targets offset from a centered element.
 * Glides between positions; `pressed` pulses a click.
 */
export function Cursor({
  x,
  y,
  pressed = false,
  shown = true,
}: {
  x: number | string;
  y: number | string;
  pressed?: boolean;
  shown?: boolean;
}) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: typeof x === "number" ? `${x}%` : x,
        top: y,
        marginLeft: -3,
        marginTop: -3,
        zIndex: 30,
        pointerEvents: "none",
        opacity: shown ? 1 : 0,
        transition: `left calc(var(--duration-page) * 2) var(--easing-in-out), top calc(var(--duration-page) * 2) var(--easing-in-out), opacity var(--duration-slow) var(--easing-default)`,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        style={{
          display: "block",
          transform: pressed ? "scale(0.78)" : "scale(1)",
          transformOrigin: "4px 4px",
          transition: "transform var(--duration-fast) var(--easing-out)",
          filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
        }}
      >
        <path
          d="m4 4 7.07 17 2.51-7.39L21 11.07z"
          fill="var(--color-fg)"
          stroke="var(--color-bg)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export const STAGE_HEIGHT = 260;

/**
 * Frame for one bento preview: a fixed-height animated stage (decorative,
 * hidden from assistive tech) above a caption that carries the meaning in
 * plain text, so the tile still teaches without motion.
 */
export function BentoTile({
  index,
  label,
  description,
  children,
}: {
  index: string;
  label: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "relative",
          height: STAGE_HEIGHT,
          background: "var(--color-bg-subtle)",
          overflow: "hidden",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          alignItems: "baseline",
          padding: "var(--space-4) var(--space-5)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <span
          style={{
            fontSize: "0.6875rem",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--color-fg-subtle)",
            flexShrink: 0,
          }}
        >
          {index}
        </span>
        <div>
          <span
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--color-fg)",
              letterSpacing: "-0.01em",
              display: "block",
              marginBottom: 2,
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-fg-muted)",
              lineHeight: 1.55,
              display: "block",
            }}
          >
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}
