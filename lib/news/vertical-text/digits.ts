/**
 * §1 glyph classification · §2 Latin word grouping · §3 digits.
 *
 * `tokenize` turns verticalized text into `VTCell`s: consecutive Latin letters
 * group into one rotated word cell; digits become one upright cell each (the
 * KLREQ body rule), or — with `groupDigits`, the chrome-label mode — a run of
 * ≤3 folds into a single tate-chu-yoko cell (縦中横). Runs of 4+ always fall
 * back to one-per-cell.
 *
 * `segment` is the same rule set shaped for React: it splits a label/headline
 * into spans so the renderer can apply `text-combine-upright: all` (`.tcy`)
 * to digit cells and leave everything else to `text-orientation: mixed`.
 */

import type { GlyphKind, VTCell } from "./types";
import { ASCII_PUNCTUATION, VERTICAL_PUNCTUATION, verticalizeClusters } from "./verticalize";

export function kindOf(cluster: string): GlyphKind {
  const ch = cluster[0];
  if (ch === undefined) return "cjk";
  if (ch === " " || ch === "　") return "space";
  if (ch >= "0" && ch <= "9") return "digit";
  if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")) return "latin";
  if (VERTICAL_PUNCTUATION.has(cluster) || ASCII_PUNCTUATION.has(cluster)) return "punctuation";
  return "cjk";
}

export interface TokenizeOptions {
  /** Chrome labels: fold a ≤3 digit run into one tate-chu-yoko cell. */
  groupDigits?: boolean;
  /** Skip §4.1 verticalization (already-verticalized or exempt text). */
  verticalized?: boolean;
}

export function tokenize(text: string, options: TokenizeOptions = {}): VTCell[] {
  const raw = Array.from(text);
  const clusters = options.verticalized ? raw : verticalizeClusters(raw);
  const cells: VTCell[] = [];
  let id = 0;
  let i = 0;
  while (i < clusters.length) {
    const kind = kindOf(clusters[i]);
    if (kind === "latin") {
      let j = i;
      let word = "";
      while (j < clusters.length && kindOf(clusters[j]) === "latin") word += clusters[j++];
      cells.push({ id: id++, content: word, kind: "latin" });
      i = j;
    } else if (kind === "digit" && options.groupDigits) {
      let j = i;
      while (j < clusters.length && kindOf(clusters[j]) === "digit") j++;
      const run = clusters.slice(i, j);
      if (run.length <= 3) {
        cells.push({ id: id++, content: run.join(""), kind: "digit" });
      } else {
        for (const d of run) cells.push({ id: id++, content: d, kind: "digit" });
      }
      i = j;
    } else {
      // Body digits included: one upright cell per digit (KLREQ vertical numerals).
      cells.push({ id: id++, content: clusters[i], kind });
      i++;
    }
  }
  return cells;
}

/**
 * A render-ready span of a label or headline.
 *
 * - `text`   — flows under `text-orientation: mixed` (CJK upright, Latin words
 *              rotate natively as units).
 * - `tcy`    — a digit run set as one tate-chu-yoko cell (`.tcy` class).
 * - `digits` — an unbreakable digit run (may include an interior `.`/`,`) set
 *              one upright cell per character; the wrapper forbids a column
 *              break inside it (§5.3).
 */
export type Segment =
  | { kind: "text"; text: string }
  | { kind: "tcy"; text: string }
  | { kind: "digits"; text: string };

const isDigitChar = (ch: string | undefined) => ch !== undefined && ch >= "0" && ch <= "9";

export interface SegmentOptions {
  /** Chrome labels: ≤3-digit runs become one tate-chu-yoko cell. */
  groupDigits?: boolean;
  /** Skip §4.1 verticalization (exempt text: source names, URLs). */
  verticalized?: boolean;
}

export function segment(text: string, options: SegmentOptions = {}): Segment[] {
  const raw = Array.from(text);
  const clusters = options.verticalized ? raw : verticalizeClusters(raw);
  const out: Segment[] = [];
  let plain = "";
  const flush = () => {
    if (plain) {
      out.push({ kind: "text", text: plain });
      plain = "";
    }
  };

  let i = 0;
  while (i < clusters.length) {
    if (isDigitChar(clusters[i])) {
      // Maximal digit run, absorbing a `.`/`,` kept between two digits (§4.1).
      let j = i;
      let run = "";
      let pureDigits = true;
      while (j < clusters.length) {
        if (isDigitChar(clusters[j])) {
          run += clusters[j++];
        } else if (
          (clusters[j] === "." || clusters[j] === ",") &&
          isDigitChar(clusters[j - 1]) &&
          isDigitChar(clusters[j + 1])
        ) {
          run += clusters[j++];
          pureDigits = false;
        } else break;
      }
      flush();
      const digitCount = run.replace(/[.,]/g, "").length;
      if (options.groupDigits && pureDigits && digitCount <= 3) {
        out.push({ kind: "tcy", text: run });
      } else {
        out.push({ kind: "digits", text: run });
      }
      i = j;
    } else {
      plain += clusters[i++];
    }
  }
  flush();
  return out;
}
