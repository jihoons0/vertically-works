/**
 * Client-side preferences · localStorage, no accounts in v1 (PRD §3, §6.3).
 */

import type { EditionId } from "./sources";

export type ThemeId = "light" | "dark" | "sepia";
/**
 * Reading faces. `serif`/`sans` are system stacks (the default pair);
 * the rest are self-hosted CJK webfonts (next/font, loaded in the site's
 * app/layout.tsx), each covering only the scripts named in FONT_OPTIONS.
 */
export type FontId = "serif" | "sans" | "sung" | "zenAntique" | "dotGothic" | "longCang";

/**
 * Faces offered per edition. System serif/sans everywhere; a webface only
 * where it has the script — Chiron Sung HK covers Korean + Traditional
 * Chinese, Zen Antique + DotGothic16 are Japanese, Long Cang is Chinese.
 */
export const FONT_OPTIONS: Record<EditionId, FontId[]> = {
  ko: ["serif", "sans", "sung"],
  ja: ["serif", "sans", "zenAntique", "dotGothic"],
  zh: ["serif", "sans", "sung", "longCang"],
};

const KEYS = {
  theme: "vn:theme",
  edition: "vn:edition",
  font: (edition: EditionId) => `vn:font:${edition}`,
  customFeeds: (edition: EditionId) => `vn:sources:custom:${edition}`,
  disabled: (edition: EditionId) => `vn:sources:off:${edition}`,
};

const read = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode — session-only */
  }
};

export const getTheme = (): ThemeId => {
  if (typeof document === "undefined") return "light";
  const t = document.documentElement.getAttribute("data-theme");
  return t === "dark" || t === "sepia" ? t : "light";
};

export const setTheme = (theme: ThemeId) => {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("vn:theme", theme);
  } catch {}
};

/** Mirror a face onto <html> — serif is the default, so it clears the attr. */
const applyFontAttr = (font: FontId) => {
  if (font === "serif") document.documentElement.removeAttribute("data-font");
  else document.documentElement.setAttribute("data-font", font);
};

/**
 * Reading face for an edition (serif 명조 is the default). Remembered per
 * edition because the webfaces are script-specific — the Japanese pixel
 * face shouldn't follow you into the Korean front page.
 */
export const getFont = (edition: EditionId): FontId => {
  if (typeof window === "undefined") return "serif";
  try {
    const raw = localStorage.getItem(KEYS.font(edition));
    return raw && (FONT_OPTIONS[edition] as string[]).includes(raw) ? (raw as FontId) : "serif";
  } catch {
    return "serif";
  }
};

export const setFont = (edition: EditionId, font: FontId) => {
  applyFontAttr(font);
  try {
    localStorage.setItem(KEYS.font(edition), font);
  } catch {}
};

export const getEdition = (): EditionId => {
  if (typeof document === "undefined") return "ko";
  const e = document.documentElement.getAttribute("data-edition");
  return e === "ja" || e === "zh" ? e : "ko";
};

export const setEditionAttr = (edition: EditionId) => {
  document.documentElement.setAttribute("data-edition", edition);
  document.documentElement.setAttribute("lang", edition === "zh" ? "zh-Hant" : edition);
  applyFontAttr(getFont(edition)); // reading face is remembered per edition
  try {
    localStorage.setItem(KEYS.edition, edition);
  } catch {}
};

export const getCustomFeeds = (edition: EditionId): string[] =>
  read(KEYS.customFeeds(edition), []);
export const setCustomFeeds = (edition: EditionId, urls: string[]) =>
  write(KEYS.customFeeds(edition), urls);

export const getDisabledSources = (edition: EditionId): string[] =>
  read(KEYS.disabled(edition), []);
export const setDisabledSources = (edition: EditionId, ids: string[]) =>
  write(KEYS.disabled(edition), ids);
