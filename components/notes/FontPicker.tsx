"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/notes/i18n";
import { FONT_ARIA, FONT_IDS, FONT_LABELS, FONT_STACKS, useFont } from "@/lib/notes/font";

function GearIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function FontPicker() {
  const { font, setFont } = useFont();
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: "relative", display: "flex" }}>
      <button
        className="pressable"
        aria-label={FONT_ARIA[locale]}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 40,
          height: 40,
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--color-border)",
          background: open ? "var(--color-fg)" : "var(--color-bg)",
          color: open ? "var(--color-bg)" : "var(--color-fg-muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "var(--shadow-column)",
          transition: "background var(--duration-base) var(--easing-out), color var(--duration-base) var(--easing-out)",
        }}
      >
        <GearIcon />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={FONT_ARIA[locale]}
          style={{
            position: "absolute",
            left: "calc(100% + var(--space-3))",
            top: "50%",
            transformOrigin: "left center",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "row-reverse", // R→L: first option on the right
            gap: "var(--space-2)",
            padding: "var(--space-2)",
            borderRadius: "var(--radius-2xl)",
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-lift)",
            animation: "vd-pop-in 180ms var(--easing-out) both",
          }}
        >
          {FONT_IDS.map((id) => {
            const on = font === id;
            return (
              <button
                key={id}
                role="option"
                aria-selected={on}
                className="pressable"
                onClick={() => {
                  setFont(id);
                  setOpen(false);
                }}
                style={{
                  width: 46,
                  height: 150,
                  borderRadius: "var(--radius-xl)",
                  border: `1px solid ${on ? "var(--color-fg)" : "var(--color-border)"}`,
                  background: on ? "var(--color-fg)" : "var(--color-bg)",
                  color: on ? "var(--color-bg)" : "var(--color-fg)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background var(--duration-base) var(--easing-out), border-color var(--duration-base) var(--easing-out), color var(--duration-base) var(--easing-out)",
                }}
              >
                <span
                  className="v-text"
                  style={{ fontFamily: FONT_STACKS[id], fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "0.08em", whiteSpace: "nowrap" }}
                >
                  {FONT_LABELS[locale][id]}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
