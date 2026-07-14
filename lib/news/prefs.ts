/**
 * Client-side preferences · localStorage, no accounts in v1 (PRD §3, §6.3).
 */

import type { EditionId } from "./sources";

export type ThemeId = "light" | "dark" | "sepia";
export type FontId = "serif" | "sans";

const KEYS = {
  theme: "vn:theme",
  edition: "vn:edition",
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

/** Reading face: serif (명조, default) or sans (고딕). */
export const getFont = (): FontId => {
  if (typeof document === "undefined") return "serif";
  return document.documentElement.getAttribute("data-font") === "sans" ? "sans" : "serif";
};

export const setFont = (font: FontId) => {
  if (font === "sans") document.documentElement.setAttribute("data-font", "sans");
  else document.documentElement.removeAttribute("data-font");
  try {
    localStorage.setItem("vn:font", font);
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
