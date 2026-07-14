"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Preview language for the bento demos. */
export type Lang = "ko" | "ja" | "zh";

const LANGS: { id: Lang; label: string }[] = [
  { id: "ko", label: "한" },
  { id: "ja", label: "あ" },
  { id: "zh", label: "中" },
];

/** 한 / あ / 中 segmented toggle that drives the demos' language. */
export function CjkToggle({ value, onChange }: { value: Lang; onChange: (l: Lang) => void }) {
  return (
    <div
      role="group"
      aria-label="Preview language"
      style={{
        display: "inline-flex",
        gap: 2,
        padding: 3,
        borderRadius: "var(--radius-lg)",
        background: "var(--color-bg-muted)",
        border: "1px solid var(--color-border)",
      }}
    >
      {LANGS.map((l) => {
        const active = l.id === value;
        return (
          <button
            key={l.id}
            onClick={() => onChange(l.id)}
            aria-pressed={active}
            className="pressable"
            style={{
              width: 34,
              height: 30,
              borderRadius: "var(--radius-md)",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.9375rem",
              fontWeight: 500,
              background: active ? "var(--color-fg)" : "transparent",
              color: active ? "var(--color-bg)" : "var(--color-fg-muted)",
              transition: "background 150ms var(--easing-out), color 150ms var(--easing-out)",
            }}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}

/** Matches the guard in components/Reveal.tsx · true when the user asks for
 *  reduced motion, and during Figma page captures (#figmacapture=…) so the
 *  loops park at their resolved states and the DOM holds still to serialize.
 *  Re-evaluates on hashchange, so a leftover capture tab unparks the moment
 *  the hash clears (PreviewLangProvider strips it after the capture window). */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () =>
      setReduced(mq.matches || window.location.hash.includes("figmacapture"));
    evaluate();
    mq.addEventListener("change", evaluate);
    window.addEventListener("hashchange", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      window.removeEventListener("hashchange", evaluate);
    };
  }, []);

  return reduced;
}

/**
 * Cycles through the steps of a self-playing demo loop. `durations[i]` is how
 * long step `i` holds before advancing (wraps around). Pauses while the tab is
 * hidden. Under prefers-reduced-motion the loop parks on `reducedStep` · a
 * representative resolved state · and `reduced` is returned so callers can
 * also hide the animated cursor.
 */
export function useLoopStep(
  durations: readonly number[],
  reducedStep = 0
): { step: number; reduced: boolean } {
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return; // parked on reducedStep below · no timers
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
 * number is px from the stage top · stages have a fixed height, so px keeps
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

/** Design width the loops were tuned against (2-col tile at the 1280 container). */
const STAGE_DESIGN_WIDTH = 618;
const STAGE_MAX_SCALE = 1.4;

/**
 * The loop stages are hand-tuned inside a fixed 260px-tall coordinate system.
 * To render them bigger without retuning four animations, the tile keeps that
 * design space intact and scales it to the (square) stage it actually got:
 * full design scale on a full-width desktop tile, 1:1 on narrow screens.
 */
function useStageScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setScale(Math.min(STAGE_MAX_SCALE, Math.max(1, (w / STAGE_DESIGN_WIDTH) * STAGE_MAX_SCALE)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, scale };
}

/**
 * Frame for one bento preview: a square animated stage (decorative, hidden
 * from assistive tech) with a subtle `01 · Title` caption overlaid in the
 * corner. The fuller description stays for screen readers only, so the tile
 * still teaches without motion.
 */
export function BentoTile({
  index,
  label,
  description,
  href,
  children,
}: {
  index: string;
  label: string;
  description: string;
  /** The component detail page this tile opens. */
  href: string;
  children: ReactNode;
}) {
  const { ref, scale } = useStageScale();

  return (
    <Link
      href={href}
      className="bento-tile"
      style={{
        display: "block",
        position: "relative",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-muted)",
        overflow: "hidden",
      }}
    >
      <div
        ref={ref}
        aria-hidden
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {/* The 260px design space, centered and scaled to the square it got */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: STAGE_HEIGHT,
            transform: `translateY(-50%) scale(${scale})`,
            transformOrigin: "50% 50%",
          }}
        >
          {children}
        </div>
      </div>

      {/* Subtle caption · index and title only */}
      <span
        style={{
          position: "absolute",
          left: "var(--space-5)",
          bottom: "var(--space-4)",
          display: "inline-flex",
          gap: "var(--space-2)",
          alignItems: "baseline",
          fontSize: "0.75rem",
          color: "var(--color-fg-subtle)",
          letterSpacing: "0.02em",
        }}
      >
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6875rem" }}>{index}</span>
        <span style={{ fontWeight: 500, color: "var(--color-fg-muted)" }}>{label}</span>
      </span>

      {/* View cue · appears on hover/focus, bottom-right of the caption row */}
      <span
        className="bento-view"
        aria-hidden
        style={{
          position: "absolute",
          right: "var(--space-5)",
          bottom: "var(--space-4)",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: "0.75rem",
          fontWeight: 500,
          color: "var(--color-fg)",
          textDecoration: "underline",
          textUnderlineOffset: 3,
        }}
      >
        View component
        <ArrowRight size={13} strokeWidth={2.25} aria-hidden />
      </span>

      {/* Full description · screen readers only, the tile keeps teaching */}
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {description}
      </span>
    </Link>
  );
}
