"use client";
import { useState, useRef } from "react";

const CHAPTERS = ["세로쓰기 1장", "세로쓰기 2장", "세로쓰기 3장"];

export function ChapterNavigationDemo() {
  const [index, setIndex] = useState(1);
  const [pull, setPull] = useState(0); // -1..1, negative = pulling next (left), positive = prev (right)
  const [flash, setFlash] = useState<"next" | "prev" | null>(null);
  const startX = useRef<number | null>(null);
  const THRESHOLD = 64;

  const canPrev = index > 0;
  const canNext = index < CHAPTERS.length - 1;

  const onDown = (e: React.PointerEvent) => { startX.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); };
  const onMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    // dx > 0 (drag right) → previous; dx < 0 (drag left) → next
    const clamped = Math.max(-1, Math.min(1, dx / (THRESHOLD * 1.6)));
    if ((clamped > 0 && !canPrev) || (clamped < 0 && !canNext)) { setPull(clamped * 0.3); return; }
    setPull(clamped);
  };
  const onUp = () => {
    if (pull <= -1 * (THRESHOLD / (THRESHOLD * 1.6)) && canNext) { setIndex((i) => i + 1); setFlash("next"); }
    else if (pull >= (THRESHOLD / (THRESHOLD * 1.6)) && canPrev) { setIndex((i) => i - 1); setFlash("prev"); }
    setPull(0); startX.current = null;
    setTimeout(() => setFlash(null), 400);
  };

  const ring = Math.min(1, Math.abs(pull));
  const dir = pull < 0 ? "next" : pull > 0 ? "prev" : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{ width: 320, height: 300, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg)", overflow: "hidden", position: "relative", cursor: "grab", touchAction: "none", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Pull ring · appears on the leading edge of the drag */}
          {dir && (
            <div style={{ position: "absolute", top: "50%", [dir === "next" ? "left" : "right"]: 16, transform: "translateY(-50%)", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-border)" strokeWidth="3" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-fg)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${ring * 100} 100`} transform="rotate(-90 20 20)" style={{ transition: "stroke-dasharray 60ms linear" }} />
                {ring >= 1 && <circle cx="20" cy="20" r="6" fill="var(--color-fg)" />}
              </svg>
            </div>
          )}

          {/* Edge affordances · persistent hints for which way the pull goes */}
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", letterSpacing: "0.1em", color: "var(--color-fg-subtle)", opacity: canNext && dir !== "next" ? 0.6 : 0, transition: "opacity 150ms var(--easing-out)", pointerEvents: "none" }}>다음 ‹</span>
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", letterSpacing: "0.1em", color: "var(--color-fg-subtle)", opacity: canPrev && dir !== "prev" ? 0.6 : 0, transition: "opacity 150ms var(--easing-out)", pointerEvents: "none" }}>› 이전</span>

          {/* Position indicator · the value the gesture drives, nudged by the pull */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)", transform: `translateX(${pull * 20}px)`, transition: startX.current === null ? "transform 300ms cubic-bezier(0.32,0.72,0,1)" : "none", opacity: flash ? 0.4 : 1 }}>
            <span style={{ writingMode: "vertical-rl", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--color-fg)" }}>{CHAPTERS[index]}</span>
            {/* Segmented progress dots · reads as a discrete position control, not a page of text */}
            <div style={{ display: "flex", flexDirection: "row", gap: 6 }}>
              {CHAPTERS.map((_, i) => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === index ? "var(--color-fg)" : "var(--color-border-strong)", transition: "background 150ms var(--easing-out)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        A gesture input: drag left past the last column to advance, right past the first to go back. Overscroll resistance at the ends, a ring that fills as you pull and arms at 100%, firing on release · the classic pull-to-refresh rotated 90° onto the column-scroll axis. Shown here as a bare control, decoupled from any content it drives.
      </p>
    </div>
  );
}
