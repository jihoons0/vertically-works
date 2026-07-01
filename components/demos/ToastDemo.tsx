"use client";
import { useState, useRef } from "react";

const MESSAGES = ["구절을 저장했어요", "노트에 추가했어요", "복사했어요", "형광펜을 지웠어요"];

export function ToastDemo() {
  const [toast, setToast] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const idx = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const fire = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const msg = MESSAGES[idx.current % MESSAGES.length];
    idx.current += 1;
    setToast(msg);
    setVisible(true);
    timers.current.push(setTimeout(() => setVisible(false), 2000));
    timers.current.push(setTimeout(() => setToast(null), 2300));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 300, height: 380, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg)", overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-6)" }}>
          {/* Toast — top-right, a vertical pill sliding in along the leading edge */}
          {toast && (
            <div
              aria-live="polite"
              aria-atomic="true"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                transform: `translateX(${visible ? 0 : 12}px)`,
                opacity: visible ? 1 : 0,
                transition: "transform 220ms var(--easing-spring), opacity 220ms var(--easing-out)",
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
              }}
            >
              {toast}
            </div>
          )}

          {/* Background reading content */}
          <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-6)" }} aria-hidden>
            {["태초에 하나님이 천지를", "창조하시니라 땅이 혼돈하고"].map((t, i) => (
              <span key={i} style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "1rem", letterSpacing: "0.1em", lineHeight: 1.9, color: "var(--color-fg)" }}>{t}</span>
            ))}
          </div>

          <button className="pressable" onClick={fire} style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", padding: "var(--space-4) var(--space-2)", borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)", color: "var(--color-fg)", border: "1px solid var(--color-border)", writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.05em", cursor: "pointer", fontFamily: "inherit" }}>
            동작 실행 ↓
          </button>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The toast slides in as a vertical pill at the top-right (leading) edge, clear of the reading corridor so it never lands mid-column. It reads on the same axis as the content and auto-dismisses after 2s.
      </p>
    </div>
  );
}
