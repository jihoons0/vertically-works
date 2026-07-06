"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/notes/i18n";

// Left-origin sheet: in an RTL reading world the reader is heading left, so a
// panel arriving from the left "comes from where the reader is going." Content
// inside reads vertically, top→bottom.
export function HelpSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLocale();
  const [render, setRender] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
      setClosing(false);
    } else if (render) {
      setClosing(true);
      const timer = setTimeout(() => setRender(false), 260);
      return () => clearTimeout(timer);
    }
  }, [open, render]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!render) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          animation: `${closing ? "vd-fade-out" : "vd-fade-in"} 220ms ease both`,
          zIndex: 200,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.help.title}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          maxWidth: "88vw",
          background: "var(--color-bg)",
          borderInlineEnd: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-lift)",
          zIndex: 201,
          animation: `${closing ? "vd-sheet-out-left" : "vd-sheet-in-left"} 260ms var(--easing-drawer) both`,
          display: "flex",
          flexDirection: "column",
          padding: "var(--space-8) var(--space-6)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-6)" }}>
          <span className="v-text" style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "0.1em" }}>
            {t.help.title}
          </span>
          <button
            className="pressable"
            aria-label={t.help.close}
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "var(--color-fg-muted)", lineHeight: 1, fontFamily: "inherit" }}
          >
            ×
          </button>
        </div>

        {/* Rows read as vertical columns, R→L */}
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "var(--space-4)",
            overflowX: "auto",
            flex: 1,
            alignItems: "stretch",
            justifyContent: "flex-start",
          }}
        >
          {t.help.rows.map((r) => (
            <div
              key={r.keys}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-4)",
                flexShrink: 0,
                padding: "var(--space-4) var(--space-3)",
                borderRadius: "var(--radius-xl)",
                background: "var(--color-bg-subtle)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span
                className="v-text"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: "var(--color-fg)",
                  fontFamily: /[A-Za-z?←→]/.test(r.keys) && !/[가-힣]/.test(r.keys) ? "var(--font-geist-mono)" : "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                {r.keys}
              </span>
              <span className="v-text" style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes vd-sheet-in-left { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes vd-sheet-out-left { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        @media (prefers-reduced-motion: reduce) {
          @keyframes vd-sheet-in-left { from { opacity: 0; } to { opacity: 1; } }
          @keyframes vd-sheet-out-left { from { opacity: 1; } to { opacity: 0; } }
        }
      `}</style>
    </>
  );
}
