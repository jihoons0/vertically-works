/**
 * §4.2 Punctuation orientation — render-time vertical presentation forms.
 *
 * The spec leans on the browser's UAX #50 handling *when the font carries
 * vertical alternates*. The platform Korean serif stack (Apple Myungjo-class
 * faces) ships no `vert` feature, so 「」 stay horizontal, `…` lies sideways,
 * and 、 sits bottom-left. The targeted wrap the spec prescribes for glyphs
 * "the browser sets wrongly" is a direct swap to the Unicode vertical
 * presentation forms (U+FE10–FE44), which fall back to fonts that carry them.
 *
 * Render-time only: composition and the 금칙 sets keep operating on the
 * canonical characters.
 */

export const VERTICAL_FORMS: Record<string, string> = {
  "，": "︐",
  "、": "︑",
  "。": "︒",
  "．": "︒",
  "…": "︙",
  "「": "﹁",
  "」": "﹂",
  "『": "﹃",
  "』": "﹄",
  "（": "︵",
  "）": "︶",
  "(": "︵",
  ")": "︶",
  "〔": "︹",
  "〕": "︺",
  "【": "︻",
  "】": "︼",
  "《": "︽",
  "》": "︾",
  "〈": "︿",
  "〉": "﹀",
  "［": "﹇",
  "］": "﹈",
  "[": "﹇",
  "]": "﹈",
};

/** Swap punctuation for vertical presentation forms (render layer only). */
export function toVerticalForms(text: string): string {
  let out = "";
  for (const ch of text) out += VERTICAL_FORMS[ch] ?? ch;
  return out;
}
