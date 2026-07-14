"use client";

/**
 * Theme sheet (PRD §6.4) · light / dark / sepia swatches as vertical cells.
 * Selection sets `data-theme` on <html> and persists to localStorage; the
 * pre-paint script in layout.tsx prevents any flash on load.
 */

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { VerticalSheet } from "@/components/news/vw/sheet";
import { VerticalText } from "./VerticalText";
import { STRINGS } from "@/lib/news/i18n";
import { getFont, setFont, type FontId, type ThemeId } from "@/lib/news/prefs";
import type { EditionId } from "@/lib/news/sources";

const SWATCHES: Record<ThemeId, { bg: string; fg: string }> = {
  light: { bg: "#ffffff", fg: "#0a0a0a" },
  dark: { bg: "#0a0a0a", fg: "#fafafa" },
  sepia: { bg: "#f4ecd8", fg: "#4b3b2b" },
};

export function ThemeSheet({
  open,
  onClose,
  edition,
}: {
  open: boolean;
  onClose: () => void;
  edition: EditionId;
}) {
  const t = STRINGS[edition];
  // The site manages data-theme via next-themes; the sheet drives it.
  const { theme, setTheme } = useTheme();
  const active: ThemeId = theme === "dark" || theme === "sepia" ? theme : "light";
  const [font, setFontState] = useState<FontId>("serif");
  useEffect(() => {
    if (open) setFontState(getFont());
  }, [open]);

  const pickFont = (next: FontId) => {
    setFont(next);
    setFontState(next);
  };

  const labels: Record<ThemeId, string> = {
    light: t.themeLight,
    dark: t.themeDark,
    sepia: t.themeSepia,
  };

  const pick = (next: ThemeId) => setTheme(next);

  return (
    <VerticalSheet
      open={open}
      onClose={onClose}
      edge="left"
      aria-label={`${t.themes} · ${t.typeface}`}
      panelStyle={{ width: "min(88vw, 360px)", maxWidth: "min(88vw, 360px)" }}
    >
      <h2 style={sheetHeadingStyle}>{t.themes}</h2>
      <div
        role="radiogroup"
        aria-label={t.themes}
        style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-3)", justifyContent: "flex-end" }}
      >
        {(Object.keys(SWATCHES) as ThemeId[]).map((theme) => {
          const selected = theme === active;
          return (
            <button
              key={theme}
              data-vw="theme-swatch"
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => pick(theme)}
              className="pressable"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-3)",
                minHeight: 200,
                padding: "var(--space-4) var(--space-3)",
                borderRadius: "var(--radius-lg)",
                border: `1.5px solid ${selected ? "var(--color-fg)" : "var(--color-border)"}`,
                background: "var(--color-bg)",
                cursor: "pointer",
                transition: "border-color var(--duration-fast) var(--easing-default)",
              }}
            >
              <span
                aria-hidden
                className="corner-round"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: SWATCHES[theme].bg,
                  border: "1px solid var(--color-border-strong)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: SWATCHES[theme].fg,
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-reading)",
                }}
              >
                永
              </span>
              <span
                className="vt-reading"
                style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em", color: "var(--color-fg)", flex: 1 }}
              >
                <VerticalText text={labels[theme]} />
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── Reading face · serif (default) or sans ─── */}
      <h2 style={{ ...sheetHeadingStyle, marginTop: "var(--space-6)" }}>{t.typeface}</h2>
      <div
        role="radiogroup"
        aria-label={t.typeface}
        style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-3)", justifyContent: "flex-end" }}
      >
        {(["serif", "sans"] as FontId[]).map((face) => {
          const selected = face === font;
          return (
            <button
              key={face}
              data-vw="font-swatch"
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => pickFont(face)}
              className="pressable"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-3)",
                minHeight: 160,
                padding: "var(--space-4) var(--space-3)",
                borderRadius: "var(--radius-lg)",
                border: `1.5px solid ${selected ? "var(--color-fg)" : "var(--color-border)"}`,
                background: "var(--color-bg)",
                cursor: "pointer",
                transition: "border-color var(--duration-fast) var(--easing-default)",
              }}
            >
              {/* The specimen glyph previews the face itself. */}
              <span
                aria-hidden
                style={{
                  fontSize: "1.25rem",
                  fontFamily:
                    face === "serif"
                      ? "'Apple Myungjo', 'Hiragino Mincho ProN', serif"
                      : "'Apple SD Gothic Neo', 'Hiragino Kaku Gothic ProN', sans-serif",
                  color: "var(--color-fg)",
                }}
              >
                永
              </span>
              <span
                className="vt-reading"
                style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em", color: "var(--color-fg)", flex: 1 }}
              >
                <VerticalText text={face === "serif" ? t.serifName : t.sansName} />
              </span>
            </button>
          );
        })}
      </div>
    </VerticalSheet>
  );
}

const sheetHeadingStyle: React.CSSProperties = {
  margin: "0 0 var(--space-4)",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "var(--color-fg-subtle)",
};
