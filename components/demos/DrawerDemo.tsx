"use client";
import { useState } from "react";

const CHAPTERS = ["창 1장", "창 2장", "창 3장", "창 4장", "시 1편", "시 23편", "요 1장", "요 3장"];

export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState("창 1장");

  const close = () => { setClosing(true); setTimeout(() => { setOpen(false); setClosing(false); }, 280); };
  const select = (ch: string) => { setActive(ch); close(); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 280, height: 460, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg)", position: "relative", overflow: "hidden", display: "flex" }}>
          {/* Main content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Top bar — vertical chapter title + rotated hamburger */}
            <div style={{ padding: "var(--space-4) var(--space-4)", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
              <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "0.05em" }}>{active}</span>
              <button onClick={() => setOpen(true)} aria-label="목차 열기" style={{ width: 32, height: 32, borderRadius: "var(--radius-md)", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-fg-muted)", fontFamily: "inherit", flexShrink: 0 }} className="pressable">
                {/* Hamburger rotated 90° → vertical bars */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden style={{ transform: "rotate(90deg)" }}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>

            {/* Vertical reading content */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "var(--space-6)" }}>
              <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "1rem", letterSpacing: "0.1em", lineHeight: 1.9, color: "var(--color-fg)" }}>
                태초에 하나님이 천지를 창조하시니라
              </span>
            </div>
          </div>

          {/* Drawer — enters from the right (leading edge in RTL), reads as vertical columns */}
          {open && (
            <>
              <div onClick={close} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 10, animation: `${closing ? "fade-out" : "fade-in"} 200ms ease both` }} />
              <div
                role="navigation" aria-label="챕터 목록"
                style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "78%", background: "var(--color-bg)", zIndex: 20, borderLeft: "1px solid var(--color-border)", animation: `${closing ? "drawer-out" : "drawer-in"} 280ms cubic-bezier(0.32,0.72,0,1) both`, display: "flex", flexDirection: "column" }}
              >
                {/* Header — vertical title + close */}
                <div style={{ padding: "var(--space-4) var(--space-5) var(--space-3)", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-fg)", letterSpacing: "0.05em" }}>목차</span>
                  <button onClick={close} aria-label="닫기" style={{ background: "none", border: "none", color: "var(--color-fg-muted)", fontSize: "1.25rem", cursor: "pointer", lineHeight: 1, fontFamily: "inherit", flexShrink: 0 }} className="pressable">×</button>
                </div>
                {/* Chapter list — vertical columns flowing R→L, horizontally scrollable */}
                <div style={{ flex: 1, overflowX: "auto", overflowY: "hidden", padding: "var(--space-4) var(--space-3)", display: "flex", flexDirection: "row-reverse", gap: "var(--space-1)", alignItems: "stretch" }}>
                  {CHAPTERS.map((ch) => (
                    <button key={ch} onClick={() => select(ch)} className="pressable" style={{ writingMode: "vertical-rl", textOrientation: "mixed", flexShrink: 0, padding: "var(--space-3) var(--space-2)", borderRadius: "var(--radius-md)", border: "none", background: active === ch ? "var(--color-bg-muted)" : "transparent", color: active === ch ? "var(--color-fg)" : "var(--color-fg-muted)", fontSize: "0.9375rem", fontWeight: active === ch ? 700 : 400, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.08em" }}>
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The drawer enters from the right (leading edge in RTL) and its chapter index reads as vertical columns flowing right-to-left — the same axis as the reader it navigates.
      </p>

      <style>{`
        @keyframes drawer-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes drawer-out { from { transform: translateX(0); } to { transform: translateX(100%); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          /* Replace the slide with a gentle fade */
          @keyframes drawer-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes drawer-out { from { opacity: 1; } to { opacity: 0; } }
        }
      `}</style>
    </div>
  );
}
