# Vertical Typography & Punctuation Rules

The rules that govern how CJK text is set **vertically** (top→bottom) and
**right-to-left** in Vertically Works. This is the canonical, *implementation-neutral*
reference: the rules follow the authorities cited at the bottom (KLREQ / JLREQ / UAX #50),
not any one codebase, and apply equally to a CSS `writing-mode: vertical-rl` renderer and to
the Swift text engine in Vertically Verse (the reference implementation these rules were
extracted from — see [Provenance](#provenance)).

Vertical CJK setting is **not** rotated horizontal text — each glyph kind needs its own
orientation, punctuation is repositioned or swapped for a vertical form, and line breaking
obeys 금칙/kinsoku (禁則) rules.

> The identifier names in the tables below (`kind(of:)`, `verticalizePunctuation`,
> `PunctuationCell`, `composeColumns`, `groupDigits`, `spaceWeight`, …) label the functions in
> the reference implementation. Treat them as names for each rule, not as an API you must
> reproduce — a CSS/JS renderer expresses the same rules differently.

---

## 1. Glyph kinds

Every grapheme cluster is tokenized into a cell tagged with a `GlyphKind`
(`kind(of:)`):

| Kind | What | Orientation in a vertical column |
| --- | --- | --- |
| `cjk` | Han / Kana / Hangul / fullwidth | **Upright, as-is** |
| `digit` | `0–9` | **Upright**, one digit per cell (body); grouped → tate-chu-yoko (see §3) |
| `latin` | ASCII `A–Z a–z`, grouped into a **word** | Whole word **rotated 90° clockwise** as one unit |
| `punctuation` | CJK + relevant ASCII marks | **Repositioned / rotated / swapped** per §4 |
| `space` | ASCII space or U+3000 | Vertical gap (shorter than a glyph box) |

Classification order (`kind(of scalar:)`): space → digit (`0x30–0x39`) → latin
(`A–Z`/`a–z`) → punctuation (if in the punctuation sets) → otherwise `cjk`.

---

## 2. Latin & word grouping

- Consecutive Latin letters are grouped into a **single `latin` cell** (a word) and rotated
  **90° CW** as a unit, so "King" reads as one rotated token rather than four stacked letters.
- The rotated word reserves an approximate footprint (`size * 0.60 * count`) so it doesn't
  overlap its neighbors.

---

## 3. Digits

- **Body text (reader):** one upright cell **per digit** — the KLREQ rule for vertical
  numerals. Multi-digit numbers stack top→bottom.
- **Chrome labels (`groupDigits: true`):** a short run of consecutive digits (**≤ 3**, e.g. a
  chapter number) folds into **one tate-chu-yoko cell** (縦中横) — the digits sit upright,
  side-by-side, on a single line within the column. Runs of 4+ fall back to one-per-cell.
- A digit **run is unbreakable**: column composition never splits it across two columns (§5).

---

## 4. Punctuation

Two stages: first the source text is normalized (§4.1), then each punctuation cell is
rendered with the correct orientation (§4.2).

### 4.1 Verticalization of the source (`verticalizePunctuation`)

Traditional 세로쓰기 substitutions applied before tokenizing:

| Input | Becomes | Note |
| --- | --- | --- |
| `.` (period) | `。` 고리점 | Unless between two digits (`1.5`) — then kept as-is |
| `,` (comma) | `、` 모점 | Unless between two digits (`1,000`) — then kept as-is |
| `"` straight double quote | `「` / `」` 낫표 | Open/close by **alternation** (first `"`→open, next→close, …) |

Decimal points and thousands separators between two digits are deliberately **left intact**.

### 4.2 Orientation / rendering (`PunctuationCell`)

| Rule | Glyphs | Treatment |
| --- | --- | --- |
| **Rotate 90° CCW** | `( ) [ ]` `（） ［］ 【】 〈〉 《》` `ー ～ 〜 …` | Centered in a square cell, then `rotationEffect(-90°)` |
| **Rotate 270°** (corner brackets) | `「 」 『 』` | Yields the vertical corner form (「→﹁, 」→﹂, 『→﹃, 』→﹄) |
| **Vertical presentation form** | `。 、 ， ．` | Swapped for U+FE10–FE12 (`︒ ︑ ︐`); the glyph already sits top-right, no frame hack |
| **Manual top-right corner** | ASCII `.` `,` | No vertical form exists → positioned `.topTrailing` in the cell |
| **Default** | everything else | Centered in a `size × size` cell |

The punctuation sets that drive classification:

- `verticalPunctuation` — CJK marks: `。 、 ， ． ： ； ！ ？ 「 」 『 』 （ ） ［ ］ 【 】 〈 〉 《 》 ・ ー … 〜 ～`
- `asciiPunctuation` — halfwidth marks that occur in Korean text: `. , ! ? : ; ( ) [ ]`

---

## 5. Line composition — 금칙 / kinsoku (禁則)

`composeColumns(_:perColumn:cellOf:keepFromColumnEnd:spaceWeight:)` packs
cells into columns of a target height, applying the forbidden-position rules so a mark never
lands illegally at a column edge.

### 5.1 行頭금칙 — may **not begin** a column (KLREQ §4.3.3)

Closing brackets, stops, commas, sentence-final marks, middle dot, ellipsis, prolonged/wave
marks:

```
）」』］】〉》 ) ]   。、，． . ,   ！？ ! ?   ：；: ;   ・· … ー 〜 ～
```

If a column would *start* with one of these, it is **pulled up** onto the previous column
(small overflow allowed).

### 5.2 行末금칙 — may **not end** a column (KLREQ §4.3.4)

Opening brackets:

```
（「『［【〈《 ( [
```

If a column would *end* with one of these (or an orphaned verse-number marker passed via
`keepFromColumnEnd`), it is **pushed down** to the next column.

### 5.3 Other constraints

- **Digit runs are not split** across columns — a run straddling the boundary is pushed down.
- **No leading space:** a column never begins with a `.space` cell.
- **`spaceWeight`:** a `.space` cell renders shorter than a glyph box, so it counts as less
  than a full slot toward the `perColumn` height budget. Passing the space cell's real height
  ratio lets Korean 띄어쓰기-heavy columns pack enough glyphs to fill a tier uniformly with the
  space-less JP/CN. Default `1` = pure cell count (unchanged for callers without word spaces).
  See the algorithm sketch in §5.4.

### 5.4 Algorithm sketch

1. Skip a leading space; greedily fill the column until the accumulated (weighted) height
   reaches `perColumn`.
2. Pull up any 行頭금칙 marks that fell at the next column's head.
3. Push a split digit run down.
4. Push down a trailing 行末금칙 opener / kept cell.
5. Emit the column; repeat.

---

## Provenance

These rules were extracted from the **Vertically Verse** vertical text engine (Swift), which
remains the reference implementation. The concern → source map there:

| Concern | File (Vertically Verse) |
| --- | --- |
| Glyph classification, verticalization, 금칙 sets, `composeColumns` | `Sources/VerticalText/GlyphOrientation.swift` |
| Per-cell punctuation orientation/rendering (`PunctuationCell`) | `Sources/VerticalText/VerticalText.swift` |
| Latin/digit cell rendering (`VTCellView`) | `Sources/VerticalText/VerticalText.swift` |
| Reference CoreText typesetter (`.verticalGlyphForm`) | `Sources/VerticalText/CoreTextVerticalView.swift` |

On the web, the same rules ride on `writing-mode: vertical-rl` + `text-orientation: mixed`.
The Vertically Works design tokens and vertical components implement the interface layer:

```bash
npx verticallyworks init                 # vertical-writing utilities (tokens.css)
npx verticallyworks add vertical-typography   # this document
npx verticallyworks list                 # everything in the registry
```

---

## References

- **KLREQ** — *Requirements for Hangul Text Layout and Typography* (W3C). §4.3.3 line-start,
  §4.3.4 line-end forbidden rules.
- **JLREQ** — *Requirements for Japanese Text Layout* (W3C) — kinsoku, tate-chu-yoko.
- **UAX #50** — *Unicode Vertical Text Layout* — per-character upright/rotated orientation.
- **CSS Writing Modes Level 4** — `writing-mode: vertical-rl`, `text-orientation`.
- **CSS Text Level 4** — tate-chu-yoko (縦中横).
