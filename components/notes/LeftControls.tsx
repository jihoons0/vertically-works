"use client";

import { useTheme } from "next-themes";
import { CJKToggle } from "@/components/notes/CJKToggle";
import { FontPicker } from "@/components/notes/FontPicker";
import { useLocale } from "@/lib/notes/i18n";

const iconBtn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "var(--radius-full)",
  border: "1px solid var(--color-border)",
  background: "var(--color-bg)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.9rem",
  color: "var(--color-fg)",
  fontFamily: "inherit",
  boxShadow: "var(--shadow-column)",
};

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLocale();
  const isDark = resolvedTheme === "dark";
  return (
    <button
      className="pressable"
      aria-label={isDark ? t.a11y.light : t.a11y.dark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={iconBtn}
    >
      {isDark ? "☾" : "☀"}
    </button>
  );
}

// Left-edge control stack, vertically centered: theme toggle on top, then the
// language (한/あ/中) picker, then the font (settings) picker.
export function LeftControls() {
  return (
    <div
      style={{
        position: "fixed",
        left: "var(--space-4)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-3)",
      }}
    >
      <ThemeToggle />
      <CJKToggle />
      <FontPicker />
    </div>
  );
}
