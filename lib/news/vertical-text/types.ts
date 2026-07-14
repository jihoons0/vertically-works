/**
 * vertical-text · shared types.
 *
 * The TS port of the studio typography rules — the canonical spec is
 * `components/vw/vertical-typography.md` (KLREQ / JLREQ / UAX #50); the Swift
 * reference implementation is VerticallyKit's `GlyphOrientation.swift`.
 */

/** How a single cell is oriented when stacked vertically. */
export type GlyphKind =
  | "cjk" // upright, as-is (Han / Kana / Hangul / fullwidth)
  | "latin" // rotated 90° CW as a whole word (ASCII letters, run-grouped)
  | "digit" // upright, one digit per cell (KLREQ); short chrome run → tate-chu-yoko
  | "punctuation" // repositioned / swapped per §4
  | "space"; // inter-word gap → shorter vertical spacer

/** One vertical cell: a code point (or grouped run) plus its orientation. */
export interface VTCell {
  id: number;
  content: string;
  kind: GlyphKind;
}
