"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES, useLocale } from "@/lib/notes/i18n";
import { FONT_ARIA, FONT_IDS, FONT_LABELS, FONT_STACKS, useFont } from "@/lib/notes/font";

function GearIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

const groupLabel: React.CSSProperties = {
  writingMode: "vertical-rl",
  textOrientation: "mixed",
  fontSize: "0.625rem",
  letterSpacing: "0.14em",
  color: "var(--color-fg-subtle)",
  fontFamily: "var(--font-geist-mono)",
  whiteSpace: "nowrap",
  alignSelf: "center",
};

/**
 * One control that combines the language toggle and the font picker. The button
 * face shows the current language glyph with a small gear badge; clicking it opens
 * a popover with both the 한/あ/中 language picker and the 손글씨/명조/고딕 font picker.
 */
export function SettingsButton() {
  const { locale, setLocale, t } = useLocale();
  const { font, setFont } = useFont();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const activeGlyph = LOCALES.find((l) => l.id === locale)?.glyph ?? "한";

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

  const cell = (selected: boolean): React.CSSProperties => ({
    borderRadius: "var(--radius-lg)",
    border: `1px solid ${selected ? "var(--color-fg)" : "var(--color-border)"}`,
    background: selected ? "var(--color-fg)" : "var(--color-bg)",
    color: selected ? "var(--color-bg)" : "var(--color-fg)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background var(--duration-base) var(--easing-out), border-color var(--duration-base) var(--easing-out), color var(--duration-base) var(--easing-out)",
  });

  return (
    <div ref={rootRef} style={{ position: "relative", display: "flex" }}>
      {/* Trigger: current language glyph + a small gear badge */}
      <button
        className="pressable"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${t.a11y.language} · ${FONT_ARIA[locale]}`}
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "relative",
          width: 44,
          height: 44,
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--color-border)",
          background: open ? "var(--color-fg)" : "var(--color-bg-subtle)",
          color: open ? "var(--color-bg)" : "var(--color-fg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.0625rem",
          fontWeight: 600,
          lineHeight: 1,
          cursor: "pointer",
          boxShadow: "var(--shadow-column)",
          transition: "background var(--duration-base) var(--easing-out), color var(--duration-base) var(--easing-out)",
        }}
      >
        {activeGlyph}
        {/* Gear badge */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            right: -3,
            bottom: -3,
            width: 18,
            height: 18,
            borderRadius: "var(--radius-full)",
            background: "var(--color-fg)",
            color: "var(--color-bg)",
            border: "2px solid var(--color-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GearIcon size={10} />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={`${t.a11y.language} · ${FONT_ARIA[locale]}`}
          style={{
            position: "absolute",
            left: "calc(100% + var(--space-3))",
            top: "50%",
            transformOrigin: "left center",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            padding: "var(--space-3)",
            borderRadius: "var(--radius-2xl)",
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-lift)",
            animation: "vd-pop-in 180ms var(--easing-out) both",
          }}
        >
          {/* Language */}
          <div role="radiogroup" aria-label={t.a11y.language} style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-2)" }}>
            <span style={groupLabel}>{t.a11y.language}</span>
            {LOCALES.map((l) => {
              const on = l.id === locale;
              return (
                <button
                  key={l.id}
                  role="radio"
                  aria-checked={on}
                  aria-label={l.label}
                  className="pressable"
                  onClick={() => setLocale(l.id)}
                  style={{ ...cell(on), width: 44, height: 56, fontSize: "1.0625rem", fontWeight: 600, lineHeight: 1, border: `1px solid ${on ? "var(--color-fg)" : "var(--color-border)"}` }}
                >
                  {l.glyph}
                </button>
              );
            })}
          </div>

          <div aria-hidden style={{ height: 1, background: "var(--color-border)", margin: "0 var(--space-1)" }} />

          {/* Font */}
          <div role="radiogroup" aria-label={FONT_ARIA[locale]} style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-2)" }}>
            <span style={groupLabel}>{FONT_ARIA[locale]}</span>
            {FONT_IDS.map((id) => {
              const on = font === id;
              return (
                <button
                  key={id}
                  role="radio"
                  aria-checked={on}
                  aria-label={FONT_LABELS[locale][id]}
                  className="pressable"
                  onClick={() => setFont(id)}
                  style={{ ...cell(on), width: 44, height: 120 }}
                >
                  <span className="v-text" style={{ fontFamily: FONT_STACKS[id], fontSize: "1rem", fontWeight: 600, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                    {FONT_LABELS[locale][id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
