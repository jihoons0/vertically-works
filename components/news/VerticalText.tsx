/**
 * VerticalText · the render side of the lib/vertical-text pipeline.
 *
 * Splits its text through `segment()` and renders digit runs with real
 * vertical treatment: short chrome runs as one tate-chu-yoko cell
 * (`text-combine-upright: all`), longer runs one upright cell per digit,
 * both unbreakable across columns (§3, §5.3). Everything else flows under
 * the parent's `writing-mode: vertical-rl` + `text-orientation: mixed`,
 * which rotates Latin words as units natively (§2). Never a transform.
 */

import { segment, toVerticalForms } from "@/lib/news/vertical-text";

export interface VerticalTextProps {
  text: string;
  /** Chrome labels (dates, indices, counts): ≤3-digit runs fold into one tcy cell. */
  chrome?: boolean;
  /** Exempt text (source names, URLs): skip §4.1 verticalization. */
  exempt?: boolean;
}

export function VerticalText({ text, chrome = false, exempt = false }: VerticalTextProps) {
  const segments = segment(text, { groupDigits: chrome, verticalized: exempt });
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.kind === "tcy") {
          return (
            <span key={i} className="tcy" style={{ whiteSpace: "nowrap" }}>
              {seg.text}
            </span>
          );
        }
        if (seg.kind === "digits") {
          // One upright cell per character (KLREQ) · the run never splits.
          return (
            <span key={i} style={{ whiteSpace: "nowrap" }}>
              {Array.from(seg.text).map((ch, j) => (
                <span key={j} className="tcy">
                  {ch}
                </span>
              ))}
            </span>
          );
        }
        // §4.2: swap punctuation for vertical presentation forms — the KR
        // serif stack has no `vert` feature. Exempt text (URLs) keeps ASCII.
        return <span key={i}>{exempt ? seg.text : toVerticalForms(seg.text)}</span>;
      })}
    </>
  );
}
