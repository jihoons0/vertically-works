/**
 * Relative time + masthead date, in the edition's own language.
 * Digits stay short so chrome labels render as tate-chu-yoko (≤3 per group).
 */

import type { EditionId } from "./sources";

const UNITS: Record<EditionId, { now: string; min: string; hour: string; day: string }> = {
  ko: { now: "방금", min: "분 전", hour: "시간 전", day: "일 전" },
  ja: { now: "今", min: "分前", hour: "時間前", day: "日前" },
  zh: { now: "剛剛", min: "分鐘前", hour: "小時前", day: "天前" },
};

export function relativeTime(iso: string, edition: EditionId, now = Date.now()): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const u = UNITS[edition];
  const mins = Math.max(0, Math.round((now - t) / 60000));
  if (mins < 1) return u.now;
  if (mins < 60) return `${mins}${u.min}`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}${u.hour}`;
  return `${Math.round(hours / 24)}${u.day}`;
}

/** Masthead date · a 2-digit year and 「7月13日」-style groups, each ≤3 digits so
 *  it sets as one upright tate-chu-yoko cell (「26」 not 「2026」). */
export function mastheadDate(edition: EditionId, date = new Date()): string {
  const y = String(date.getFullYear() % 100).padStart(2, "0");
  const m = date.getMonth() + 1;
  const d = date.getDate();
  if (edition === "ko") return `${y}년 ${m}월 ${d}일`;
  return `${y}年${m}月${d}日`;
}
