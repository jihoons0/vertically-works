"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useState } from "react";
import type { Locale } from "@/lib/notes/i18n";

export type FontId = "sans" | "serif" | "hand";

export const FONT_IDS: FontId[] = ["sans", "serif", "hand"];

// Generic families let the browser pick the right CJK face per style
// (sans → 고딕/ゴシック/黑體, serif → 명조/明朝/明體, cursive → 손글씨/手書き/楷).
export const FONT_STACKS: Record<FontId, string> = {
  sans: "var(--font-geist-sans), system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  hand: "'Segoe Print', 'Bradley Hand', cursive",
};

export const FONT_LABELS: Record<Locale, Record<FontId, string>> = {
  ko: { sans: "고딕", serif: "명조", hand: "손글씨" },
  ja: { sans: "ゴシック", serif: "明朝", hand: "手書き" },
  zh: { sans: "黑體", serif: "明體", hand: "手寫" },
};

export const FONT_ARIA: Record<Locale, string> = { ko: "글꼴", ja: "フォント", zh: "字體" };

const STORAGE_KEY = "vd:font";

type FontCtx = { font: FontId; setFont: (f: FontId) => void };
const Ctx = createContext<FontCtx>({ font: "sans", setFont: () => {} });

export function useFont() {
  return useContext(Ctx);
}

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFontState] = useState<FontId>("sans");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as FontId | null;
      if (stored && FONT_STACKS[stored]) setFontState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  // Drive the task-text font through a CSS variable the content elements read.
  useEffect(() => {
    document.documentElement.style.setProperty("--vd-task-font", FONT_STACKS[font]);
  }, [font]);

  const setFont = useCallback((f: FontId) => {
    setFontState(f);
    try {
      localStorage.setItem(STORAGE_KEY, f);
    } catch {
      /* ignore */
    }
  }, []);

  return createElement(Ctx.Provider, { value: { font, setFont } }, children);
}
