/**
 * §5 Line composition — 금칙 / kinsoku (禁則).
 *
 * Packs cells into top→bottom columns of a target (weighted) height so no mark
 * lands illegally at a column edge: 行頭금칙 marks are pulled up onto the
 * previous column (small overflow allowed), 行末금칙 openers are pushed down,
 * digit runs never split, no column begins with a space, and `spaceWeight < 1`
 * lets Korean 띄어쓰기-heavy columns pack as evenly as JP/CN.
 */

import type { VTCell } from "./types";

/** 行頭금칙 — may not begin a column (KLREQ §4.3.3). */
export const LINE_START_FORBIDDEN = new Set([
  "）", "」", "』", "］", "】", "〉", "》", ")", "]",
  "。", "、", "，", "．", ".", ",",
  "！", "？", "!", "?", "：", "；", ":", ";",
  "・", "·", "…", "ー", "〜", "～",
]);

/** 行末금칙 — may not end a column (KLREQ §4.3.4): opening brackets. */
export const LINE_END_FORBIDDEN = new Set([
  "（", "「", "『", "［", "【", "〈", "《", "(", "[",
]);

export const isLineStartForbidden = (cell: VTCell) =>
  cell.content.length > 0 && LINE_START_FORBIDDEN.has(cell.content[0]);

export const isLineEndForbidden = (cell: VTCell) =>
  cell.content.length > 0 && LINE_END_FORBIDDEN.has(cell.content[0]);

export interface ComposeOptions<T> {
  cellOf: (item: T) => VTCell;
  /** Also forbid a caller-defined cell at a column end (orphaned markers). */
  keepFromColumnEnd?: (item: T) => boolean;
  /**
   * How much a `.space` cell counts toward the `perColumn` budget. Spaces
   * render shorter than a glyph box; pass the real height ratio so
   * space-heavy scripts fill each column uniformly. Default 1 = cell count.
   */
  spaceWeight?: number;
  /**
   * Full control over a cell's height in glyph-box units. Overrides
   * `spaceWeight` when given. A rotated Latin word cell, for instance,
   * occupies ≈ 0.6 × letter-count boxes (§2), not one.
   */
  weightOf?: (cell: VTCell) => number;
}

export function composeColumns<T>(
  items: T[],
  perColumn: number,
  { cellOf, keepFromColumnEnd = () => false, spaceWeight = 1, weightOf }: ComposeOptions<T>
): T[][] {
  if (items.length === 0) return [];
  if (perColumn <= 2 || items.length <= perColumn) return [items];

  const cells = items.map(cellOf);
  const weight = weightOf ?? ((cell: VTCell) => (cell.kind === "space" ? spaceWeight : 1));
  const n = items.length;
  const budget = perColumn;
  const columns: T[][] = [];
  let start = 0;

  while (start < n) {
    if (cells[start].kind === "space") {
      start++; // no leading gap
      continue;
    }
    let end = start;
    let filled = 0;
    while (end < n) {
      const w = weight(cells[end]);
      if (end > start && filled + w > budget) break;
      filled += w;
      end++;
    }

    if (end < n) {
      // 行頭금칙: pull forbidden starters up onto this column (small overflow).
      while (end < n && isLineStartForbidden(cells[end])) end++;
      // Never split a digit run across the boundary — push it down whole.
      if (end < n && cells[end - 1].kind === "digit" && cells[end].kind === "digit") {
        while (end > start + 1 && cells[end - 1].kind === "digit") end--;
      }
      // 行末금칙: push a trailing opener / kept cell down to the next column.
      while (
        end > start + 1 &&
        (isLineEndForbidden(cells[end - 1]) || keepFromColumnEnd(items[end - 1]))
      ) {
        end--;
      }
    }

    if (end <= start) end = Math.min(start + perColumn, n);
    columns.push(items.slice(start, end));
    start = end;
  }
  return columns;
}
