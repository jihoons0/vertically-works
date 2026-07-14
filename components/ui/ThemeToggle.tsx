"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div style={{ width: 38, height: 38 }} aria-hidden />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        // 38px square · matches the 한/あ/中 toggle's overall height
        width: 38,
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        background: "transparent",
        color: "var(--color-fg-muted)",
        cursor: "pointer",
        transition: `color var(--duration-fast) var(--easing-default),
                     border-color var(--duration-fast) var(--easing-default),
                     background var(--duration-fast) var(--easing-default)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--color-fg)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-strong)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--color-fg-muted)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
      }}
    >
{isDark ? <Sun size={14} strokeWidth={2} aria-hidden /> : <Moon size={14} strokeWidth={2} aria-hidden />}
    </button>
  );
}
