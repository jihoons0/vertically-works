"use client";
import { useState } from "react";

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = () => { setClosing(true); setTimeout(() => { setOpen(false); setClosing(false); }, 200); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ background: "var(--color-bg-muted)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "var(--space-10)", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 260, height: 420, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg-subtle)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-4)", flexDirection: "column" }}>
          {/* BG content */}
          <div style={{ display: "flex", flexDirection: "row-reverse", gap: 16, opacity: 0.35, userSelect: "none", pointerEvents: "none" }} aria-hidden>
            {["태초에 하나님이 천지를 창조하시니라", "땅이 혼돈하고 공허하며"].map((t, i) => (
              <span key={i} style={{ writingMode: "vertical-rl", fontSize: "0.875rem", letterSpacing: "0.1em", lineHeight: 1.9, color: "var(--color-fg)" }}>{t}</span>
            ))}
          </div>

          <button onClick={() => setOpen(true)} style={{ padding: "var(--space-2) var(--space-5)", borderRadius: "var(--radius-full)", background: "var(--color-fg)", color: "var(--color-bg)", border: "none", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", position: "relative", zIndex: 1 }}>
            렌즈 삭제
          </button>

          {open && (
            <>
              <div onClick={close} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", animation: `${closing ? "fade-out" : "fade-in"} 200ms ease both`, zIndex: 10 }} />
              <div
                role="dialog" aria-modal="true" aria-labelledby="dialog-title"
                style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 200, background: "var(--color-bg)", borderRadius: 20, padding: "var(--space-6)", zIndex: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.25)", animation: `${closing ? "dialog-out" : "dialog-in"} 200ms cubic-bezier(0.34,1.56,0.64,1) both` }}
              >
                <h3 id="dialog-title" style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-fg)", margin: "0 0 var(--space-2)" }}>정말 삭제할까요?</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-5)", lineHeight: 1.6 }}>이 렌즈를 삭제하면 되돌릴 수 없어요.</p>
                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                  <button onClick={close} style={{ flex: 1, padding: "var(--space-3)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "transparent", fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-fg-muted)", cursor: "pointer", fontFamily: "inherit" }}>취소</button>
                  <button onClick={close} style={{ flex: 1, padding: "var(--space-3)", borderRadius: "var(--radius-lg)", border: "none", background: "#dc2626", fontSize: "0.8125rem", fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit" }}>삭제</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Dialogs scale up from center — orthogonal to reading direction. This avoids reading-axis conflicts and feels like a layer above, not a continuation.
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
