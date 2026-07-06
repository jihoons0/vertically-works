"use client";
import { useState } from "react";

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = () => { setClosing(true); setTimeout(() => { setOpen(false); setClosing(false); }, 200); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ position: "relative", minHeight: 360, borderRadius: "var(--radius-xl)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button className="pressable" onClick={() => setOpen(true)} style={{ padding: "var(--space-5) var(--space-3)", borderRadius: "var(--radius-full)", background: "var(--color-fg)", color: "var(--color-bg)", border: "none", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", position: "relative", zIndex: 1, writingMode: "vertical-rl", textOrientation: "mixed", letterSpacing: "0.05em" }}>
            열기
          </button>

          {open && (
            <>
              <div onClick={close} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", animation: `${closing ? "fade-out" : "fade-in"} 200ms ease both`, zIndex: 10 }} />
              <div
                role="dialog" aria-modal="true" aria-labelledby="dialog-title"
                style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", minHeight: 220, background: "var(--color-bg)", borderRadius: 20, padding: "var(--space-6) var(--space-5)", zIndex: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.25)", display: "flex", flexDirection: "row-reverse", alignItems: "stretch", gap: "var(--space-5)", animation: `${closing ? "dialog-out" : "dialog-in"} 200ms cubic-bezier(0.34,1.56,0.64,1) both` }}
              >
                {/* Text — vertical columns reading R→L: title rightmost, body to its left */}
                <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: "var(--space-4)" }}>
                  <h3 id="dialog-title" style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-fg)", margin: 0, letterSpacing: "0.05em" }}>정말 삭제할까요?</h3>
                  <p style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.7, letterSpacing: "0.05em" }}>이 렌즈를 삭제하면 되돌릴 수 없어요.</p>
                </div>
                {/* Actions — vertical buttons at the end (leftmost) of the reading flow */}
                <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-2)" }}>
                  <button className="pressable" onClick={close} style={{ writingMode: "vertical-rl", textOrientation: "mixed", padding: "var(--space-3) var(--space-3)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "transparent", fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-fg-muted)", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.05em" }}>취소</button>
                  <button className="pressable" onClick={close} style={{ writingMode: "vertical-rl", textOrientation: "mixed", padding: "var(--space-3) var(--space-3)", borderRadius: "var(--radius-lg)", border: "none", background: "#dc2626", fontSize: "0.8125rem", fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.05em" }}>삭제</button>
                </div>
              </div>
            </>
          )}
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The content reads vertically — title, body, and actions as columns flowing right-to-left. The dialog still scales up from center (not from a trigger), which reads as a layer above the page rather than a continuation of the reading flow.
      </p>

      <style>{`
        @keyframes dialog-in { from { opacity: 0; transform: translate(-50%,-50%) scale(0.85); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
        @keyframes dialog-out { from { opacity: 1; transform: translate(-50%,-50%) scale(1); } to { opacity: 0; transform: translate(-50%,-50%) scale(0.9); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          /* Keep the opacity fade, drop the scale bounce */
          @keyframes dialog-in { from { opacity: 0; transform: translate(-50%,-50%); } to { opacity: 1; transform: translate(-50%,-50%); } }
          @keyframes dialog-out { from { opacity: 1; transform: translate(-50%,-50%); } to { opacity: 0; transform: translate(-50%,-50%); } }
        }
      `}</style>
    </div>
  );
}
