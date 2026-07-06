"use client";

import { LOCALES, useLocale } from "@/lib/notes/i18n";

/**
 * The studio's unified "translation = language" control, rethought vertically:
 * a 한 / あ / 中 capsule pinned to the left edge (the reading tail) and
 * vertically centred, mirroring the control rail on the right. Switching it
 * re-localizes the whole interface across the three CJK scripts.
 */
export function CJKToggle() {
  const { locale, setLocale, t } = useLocale();
  const activeIndex = LOCALES.findIndex((l) => l.id === locale);

  return (
    <div
      role="radiogroup"
      aria-label={t.a11y.language}
      style={{
        position: "fixed",
        left: "var(--space-4)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        borderRadius: "var(--radius-full)",
        background: "var(--color-bg-subtle)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-column)",
      }}
    >
      {/* Sliding indicator */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 3,
          right: 3,
          top: 3,
          height: 34,
          borderRadius: "var(--radius-full)",
          background: "var(--color-fg)",
          transform: `translateY(${activeIndex * 36}px)`,
          transition: "transform var(--duration-base) var(--easing-drawer)",
        }}
      />
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
            style={{
              position: "relative",
              zIndex: 1,
              width: 34,
              height: 34,
              borderRadius: "var(--radius-full)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "1rem",
              fontWeight: 600,
              lineHeight: 1,
              color: on ? "var(--color-bg)" : "var(--color-fg-muted)",
              transition: "color var(--duration-base) var(--easing-default)",
            }}
          >
            {l.glyph}
          </button>
        );
      })}
    </div>
  );
}
