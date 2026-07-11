"use client";
import { useState, useRef } from "react";

const MESSAGES = ["문단을 저장했어요", "노트에 추가했어요", "복사했어요", "형광펜을 지웠어요"];

export function ToastDemo() {
  const [toast, setToast] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const idx = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const fire = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const msg = MESSAGES[idx.current % MESSAGES.length];
    idx.current += 1;
    // Fresh mount every time → the CSS entry animation replays reliably.
    setToast(msg);
    setClosing(false);
    timers.current.push(setTimeout(() => setClosing(true), 2000));
    timers.current.push(setTimeout(() => { setToast(null); setClosing(false); }, 2300));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 300, height: 380, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg)", overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-6)" }}>
          {/* Toast · a vertical pill that slides + scales in from the top-right (leading) edge */}
          {toast && (
            <div
              key={idx.current}
              aria-live="polite"
              aria-atomic="true"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                // Anchored to the top-right, so it scales in from that corner · not center, never from 0.
                transformOrigin: "top right",
                animation: `${closing ? "vw-toast-out" : "vw-toast-in"} ${closing ? 200 : 320}ms var(--easing-out) both`,
                background: "var(--color-fg)",
                color: "var(--color-bg)",
                padding: "var(--space-4) var(--space-2)",
                borderRadius: "var(--radius-full)",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
                zIndex: 10,
                pointerEvents: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
                willChange: "transform, opacity",
              }}
            >
              {toast}
            </div>
          )}

          <button className="pressable" onClick={fire} style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", padding: "var(--space-4) var(--space-2)", borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)", color: "var(--color-fg)", border: "1px solid var(--color-border)", writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.05em", cursor: "pointer", fontFamily: "inherit" }}>
            동작 실행 ↓
          </button>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The toast slides and scales in from the top-right (leading) edge as a vertical pill, clear of the reading corridor so it never lands mid-column. It reads on the same axis as the content and auto-dismisses after 2s · sliding back out the way it came.
      </p>

      <style>{`
        @keyframes vw-toast-in {
          from { opacity: 0; transform: translateX(calc(100% + 20px)) scale(0.94); }
          60%  { opacity: 1; }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes vw-toast-out {
          from { opacity: 1; transform: translateX(0) scale(1); }
          to   { opacity: 0; transform: translateX(calc(100% + 20px)) scale(0.96); }
        }
        @media (prefers-reduced-motion: reduce) {
          /* Keep a fade, drop the slide/scale */
          @keyframes vw-toast-in  { from { opacity: 0; } to { opacity: 1; } }
          @keyframes vw-toast-out { from { opacity: 1; } to { opacity: 0; } }
        }
      `}</style>
    </div>
  );
}
