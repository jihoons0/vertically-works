"use client";
import { useState, useRef } from "react";

const CHAPTERS = ["창세기 1장", "창세기 2장", "창세기 3장"];

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
          {/* Pull ring — appears on the leading edge of the drag */}
          {dir && (
            <div style={{ position: "absolute", top: "50%", [dir === "next" ? "left" : "right"]: 16, transform: "translateY(-50%)", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-border)" strokeWidth="3" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-fg)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${ring * 100} 100`} transform="rotate(-90 20 20)" style={{ transition: "stroke-dasharray 60ms linear" }} />
                {ring >= 1 && <circle cx="20" cy="20" r="6" fill="var(--color-fg)" />}
              </svg>
            </div>
          )}

          {/* Chapter content, nudged by the pull */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)", transform: `translateX(${pull * 20}px)`, transition: startX.current === null ? "transform 300ms cubic-bezier(0.32,0.72,0,1)" : "none", opacity: flash ? 0.5 : 1 }}>
            <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.75rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>{index + 1} / {CHAPTERS.length}</span>
            <span style={{ writingMode: "vertical-rl", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--color-fg)" }}>{CHAPTERS[index]}</span>
            <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.9375rem", letterSpacing: "0.1em", lineHeight: 1.9, color: "var(--color-fg-muted)", maxHeight: 140, overflow: "hidden" }}>
              태초에 하나님이 천지를 창조하시니라
            </span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Drag left past the last column → next chapter; drag right past the first → previous. The classic vertical pull-to-refresh, rotated 90° onto the column-scroll axis. A ring fills as you pull and fires on release.
      </p>
    </div>
  );
}
