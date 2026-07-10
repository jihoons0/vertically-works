/** Transcript parsing + merging (pure — unit-testable outside Next).
 *  Handles VTT, SRT, and Podcasting 2.0 JSON; merges 1–4s cue fragments
 *  toward sentence-ish lines sized for vertical columns. CJK-aware twice
 *  over: no space is injected when joining CJK↔CJK, and mostly-CJK lines
 *  merge to a shorter target (a hangul/kana/han glyph carries ~2× the
 *  information of a latin character — 30 of them is a paragraph). */

export type Cue = { time: number; text: string };

export const MAX_LINES = 600;
const LATIN_TARGET = 30;
const CJK_TARGET = 16;

export function parseTimestamp(ts: string): number | null {
  const m = ts.trim().match(/^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[.,](\d{1,3})$/);
  if (!m) return null;
  const h = m[1] ? parseInt(m[1]) : 0;
  return h * 3600 + parseInt(m[2]) * 60 + parseInt(m[3]) + parseInt(m[4].padEnd(3, "0")) / 1000;
}

export function cleanCueText(s: string): string {
  return s
    .replace(/<v\s+[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** Handles both VTT (dot decimals, WEBVTT/NOTE headers) and SRT (comma
 *  decimals, numeric indices) — the block shapes are near-identical. */
export function parseVttOrSrt(text: string): Cue[] {
  const cues: Cue[] = [];
  for (const block of text.replace(/\r/g, "").split(/\n\n+/)) {
    const lines = block.split("\n").filter(Boolean);
    if (lines.length === 0) continue;
    if (/^(WEBVTT|NOTE|STYLE|REGION)/.test(lines[0])) continue;
    const tsIdx = lines.findIndex((l) => l.includes("-->"));
    if (tsIdx === -1) continue;
    const start = parseTimestamp(lines[tsIdx].split("-->")[0]);
    if (start === null) continue;
    const cueText = cleanCueText(lines.slice(tsIdx + 1).join(" "));
    if (cueText) cues.push({ time: start, text: cueText });
  }
  return cues;
}

/** Podcasting 2.0 JSON: { segments: [{ startTime, body }] } */
export function parseJsonTranscript(raw: string): Cue[] {
  try {
    const data = JSON.parse(raw) as { segments?: { startTime?: number; body?: string }[] };
    return (data.segments ?? [])
      .filter((s) => typeof s.startTime === "number" && s.body)
      .map((s) => ({ time: s.startTime as number, text: cleanCueText(s.body as string) }))
      .filter((c) => c.text);
  } catch {
    return [];
  }
}

// Kana + han: written WITHOUT spaces — joins concatenate directly, and a
// glyph is dense, so lines break short. Hangul: CJK-dense but SPACED
// (띄어쓰기) — joins need a space and sentences run longer.
// Explicit escapes — lookalike literals bite (a 豈-like glyph at U+8C48
// once silently swallowed the hangul block into this range).
const SPACELESS_CJK_RE = /[\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
const HANGUL_RE = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/;
// Any CJK letter \u2014 Han, Kana, or Hangul \u2014 for punctuation context tests.
const CJK_ANY_RE = /[\u1100-\u11FF\u3040-\u30FF\u3130-\u318F\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF]/;
const HANGUL_TARGET = 22;

/** VERTICAL_TYPOGRAPHY \u00A74.1 \u2014 set ASCII period/comma as their \uC138\uB85C\uC4F0\uAE30 forms
 *  (\uACE0\uB9AC\uC810 / \uBAA8\uC810) but ONLY when the mark sits in CJK context (the char before
 *  it is Han/Kana/Hangul). Bilingual shows keep their English "tonight." and
 *  decimals "1.5" exactly as written. */
function verticalizeCJKPunctuation(text: string): string {
  let out = "";
  for (const ch of text) {
    const prev = out.slice(-1);
    if (ch === "." && CJK_ANY_RE.test(prev)) out += "\u3002";
    else if (ch === "," && CJK_ANY_RE.test(prev)) out += "\u3001";
    else out += ch;
  }
  return out;
}
const isSpacelessCJK = (ch: string) => SPACELESS_CJK_RE.test(ch);
const endsSentence = (s: string) => /[.!?。！？…]["'」』”’]?$/.test(s);

function targetFor(text: string): number {
  let hangul = 0;
  let spaceless = 0;
  let counted = 0;
  for (const ch of text) {
    if (ch === " ") continue;
    counted++;
    if (HANGUL_RE.test(ch)) hangul++;
    else if (SPACELESS_CJK_RE.test(ch)) spaceless++;
  }
  if (counted === 0) return LATIN_TARGET;
  if (spaceless / counted >= 0.4) return CJK_TARGET;
  if (hangul / counted >= 0.4) return HANGUL_TARGET;
  return LATIN_TARGET;
}

export function mergeCues(cues: Cue[]): Cue[] {
  const out: Cue[] = [];
  let cur: Cue | null = null;
  for (const cue of cues) {
    if (!cur) {
      cur = { ...cue };
    } else {
      const joiner = isSpacelessCJK(cur.text.slice(-1)) && isSpacelessCJK(cue.text[0]) ? "" : " ";
      cur.text += joiner + cue.text;
    }
    if (endsSentence(cur.text) || cur.text.length >= targetFor(cur.text)) {
      out.push(cur);
      cur = null;
    }
    if (out.length >= MAX_LINES) break;
  }
  if (cur && out.length < MAX_LINES) out.push(cur);
  return out.map((c) => ({
    time: Math.round(c.time * 100) / 100,
    text: verticalizeCJKPunctuation(c.text),
  }));
}

/** Raw transcript body → merged lines (null when nothing parses). */
export function transcriptToLines(raw: string): Cue[] | null {
  const cues = raw.trimStart().startsWith("{") ? parseJsonTranscript(raw) : parseVttOrSrt(raw);
  if (cues.length === 0) return null;
  return mergeCues(cues);
}
