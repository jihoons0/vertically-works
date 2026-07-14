"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/components/home/bento-shared";

/**
 * Site-wide preview language (한 / あ / 中) for every vertical-UI demo ·
 * the hero motif, the bento loops, the challenge visuals. Toggled from the
 * nav bar; persisted so the choice survives navigation and reloads.
 */
const STORAGE_KEY = "vw-preview-lang";

const PreviewLangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "ko",
  setLang: () => {},
});

export function PreviewLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");

  // Hydrate once from storage; write back on change.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ko" || saved === "ja" || saved === "zh") setLang(saved);
  }, []);

  // Leftover Figma-capture tabs: the #figmacapture hash deliberately parks
  // every demo for a clean still. Long after the capture window has passed,
  // strip the hash so the tab comes back to life (useReducedMotion listens
  // for hashchange and unparks the loops live).
  useEffect(() => {
    if (!window.location.hash.includes("figmacapture")) return;
    const t = window.setTimeout(() => {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }, 12000);
    return () => window.clearTimeout(t);
  }, []);

  const set = (l: Lang) => {
    setLang(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable · in-memory only */
    }
  };

  return (
    <PreviewLangContext.Provider value={{ lang, setLang: set }}>
      {children}
    </PreviewLangContext.Provider>
  );
}

/** Safe anywhere · outside the provider it falls back to Korean, read-only. */
export function usePreviewLang() {
  return useContext(PreviewLangContext);
}
