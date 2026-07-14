"use client";

import { useReducedMotion, type Lang } from "./bento-shared";
import { usePreviewLang } from "@/components/providers/PreviewLangProvider";

// "Vertical writing" in Japanese, Korean, and Chinese · the columns reveal
// once in reading order (rightmost column first, each column top→bottom) and
// then stay put; a slow shimmer travels the reading direction afterwards.
// The selected preview language leads (rightmost, strongest ink).
const WORDS: Record<Lang, string> = { ja: "縦書き", ko: "세로쓰기", zh: "竖排" };
const COLORS = ["var(--color-fg)", "var(--color-fg-muted)", "var(--color-fg-subtle)"];

const COLUMN_STAGGER = 450;
const CHAR_STAGGER = 110;
// Shimmer starts only after the last character has fully entered.
const SHIMMER_BASE_DELAY = 2200;

export function HeroVerticalMotif() {
  const { lang } = usePreviewLang();
  const reduced = useReducedMotion();

  // Selected language first, the remaining two in canonical order.
  const order: Lang[] = [lang, ...(["ja", "ko", "zh"] as Lang[]).filter((l) => l !== lang)];
  const COLUMNS = order.map((l, i) => ({ text: WORDS[l], color: COLORS[i] }));

  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        flexDirection: "row-reverse", // reading order: first column sits rightmost
        gap: "var(--space-6)",
        minHeight: "5.2em",
        fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
        userSelect: "none",
      }}
    >
      {COLUMNS.map((col, colIndex) => (
        <span
          key={col.text}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontWeight: 300,
            letterSpacing: "0.18em",
            lineHeight: 1,
            color: col.color,
            display: "block",
          }}
        >
          {Array.from(col.text).map((char, charIndex) => (
            <span
              key={charIndex}
              style={{
                display: "inline-block",
                animation: reduced
                  ? "none"
                  : `vw-hero-char var(--duration-page) var(--easing-out) both,
                     vw-hero-shimmer 5.6s var(--easing-in-out) infinite`,
                animationDelay: reduced
                  ? undefined
                  : `${colIndex * COLUMN_STAGGER + charIndex * CHAR_STAGGER}ms, ${
                      SHIMMER_BASE_DELAY + colIndex * 450 + charIndex * 140
                    }ms`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
      <style>{`
        @keyframes vw-hero-char {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: none; }
        }
        /* A quiet sheen · brief dip and return, travelling char by char down
           the columns (the reading direction), never a re-entrance. */
        @keyframes vw-hero-shimmer {
          0%, 78%, 100% { opacity: 1; }
          86% { opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}
