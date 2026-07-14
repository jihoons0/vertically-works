/**
 * §4.1 Verticalization of the source (`verticalizePunctuation`).
 *
 * Traditional 세로쓰기 substitutions applied before tokenizing: horizontal
 * 온점(.)·반점(,) become 고리점(。)·모점(、), paired straight double quotes
 * become 낫표 「 」 by alternation. Decimal points and thousands separators
 * between two digits are deliberately left intact (1.5 / 1,000).
 *
 * Applied to headlines and body text; source names and URLs are exempt.
 */

/** CJK punctuation that hangs / repositions in vertical setting. */
export const VERTICAL_PUNCTUATION = new Set([
  "。", "、", "，", "．", "：", "；", "！", "？",
  "「", "」", "『", "』", "（", "）", "［", "］", "【", "】",
  "〈", "〉", "《", "》", "・", "ー", "…", "〜", "～",
]);

/** Halfwidth ASCII marks that occur in Korean text and need repositioning. */
export const ASCII_PUNCTUATION = new Set([
  ".", ",", "!", "?", ":", ";", "(", ")", "[", "]",
]);

const isDigit = (ch: string | undefined) => ch !== undefined && ch >= "0" && ch <= "9";

/** Verticalize a code-point array (the tokenizer calls this form). */
export function verticalizeClusters(clusters: string[]): string[] {
  const out: string[] = [];
  let quoteOpen = true;
  for (let i = 0; i < clusters.length; i++) {
    const ch = clusters[i];
    if (ch === "." || ch === ",") {
      const between = isDigit(clusters[i - 1]) && isDigit(clusters[i + 1]);
      if (between) out.push(ch); // 1.5 / 1,000 — keep
      else out.push(ch === "." ? "。" : "、");
    } else if (ch === '"') {
      out.push(quoteOpen ? "「" : "」");
      quoteOpen = !quoteOpen;
    } else {
      out.push(ch);
    }
  }
  return out;
}

/** Verticalize a string (headlines, body paragraphs). */
export function verticalize(text: string): string {
  return verticalizeClusters(Array.from(text)).join("");
}
