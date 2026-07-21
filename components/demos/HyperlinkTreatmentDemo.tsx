"use client";

import { useState } from "react";
import { usePicked, linkText } from "@/components/demos/sampleText";

type Treatment = "emphasis" | "underline";

// A vertical passage with two phrases that act as links. In horizontal text a link
// is underlined · a rule that runs *along* the baseline. Rotated into vertical text
// that rule falls to one side of the column, colliding with the neighbouring line.
// The CJK convention for marking a run of characters is the emphasis mark (방점 /
// 圏点 / 旁點): a small dot set beside each character, on the right in vertical
// writing. We reuse it as the hyperlink affordance · an interpunct to the right of
// every character.
export function HyperlinkTreatmentDemo() {
  const t = usePicked(linkText);
  const [treatment, setTreatment] = useState<Treatment>("emphasis");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Treatment selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
        {([
          { id: "emphasis" as const, label: t.emphasis },
          { id: "underline" as const, label: t.underline },
        ]).map((opt) => (
          <button
            key={opt.id}
            className="pressable"
            onClick={() => setTreatment(opt.id)}
            aria-pressed={treatment === opt.id}
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              background: treatment === opt.id ? "var(--color-fg)" : "var(--color-bg-muted)",
              color: treatment === opt.id ? "var(--color-bg)" : "var(--color-fg-muted)",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 150ms var(--easing-out), color 150ms var(--easing-out)",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Reading panel · a single vertical column with two inline links */}
      <div
        style={{
          background: "var(--color-bg-muted)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-10) var(--space-8)",
          display: "flex",
          justifyContent: "center",
          minHeight: 300,
        }}
      >
        <p
          lang="ko"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "1.0625rem",
            letterSpacing: "0.08em",
            lineHeight: 2.2,
            color: "var(--color-fg)",
            margin: 0,
            maxHeight: 260,
          }}
        >
          {t.before}
          <a href="#" onClick={(e) => e.preventDefault()} className={`vw-link vw-link--${treatment}`}>
            {t.link1}
          </a>
          {t.middle}
          <a href="#" onClick={(e) => e.preventDefault()} className={`vw-link vw-link--${treatment}`}>
            {t.link2}
          </a>
          {t.after}
        </p>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6, maxWidth: "54ch", marginInline: "auto" }}>
        {treatment === "emphasis"
          ? "An interpunct (·) sits to the right of every character in the linked run · the CJK emphasis-mark (방점) convention, reused as the hyperlink affordance. It rides alongside the column without crossing into the next line."
          : "An underline rotates onto the left side of the column, colliding with the neighbouring line and reading as a rule, not a link. This is why vertical text marks links with side dots instead."}
      </p>

      <style>{`
        .vw-link {
          color: var(--color-fg);
          text-decoration: none;
          cursor: pointer;
          transition: color 120ms ease;
        }
        .vw-link:hover { color: var(--color-fg-muted); }

        /* Emphasis-mark treatment · one interpunct per character, on the right (vertical default). */
        .vw-link--emphasis {
          -webkit-text-emphasis: "·";
          text-emphasis: "·";
          -webkit-text-emphasis-position: right;
          text-emphasis-position: right;
        }

        /* Underline treatment · shown to demonstrate why it fails in vertical text. */
        .vw-link--underline {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
    </div>
  );
}
