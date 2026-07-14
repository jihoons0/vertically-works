"use client";

import { useEffect, useRef, useState } from "react";
import { useLoopStep, type Lang } from "./bento-shared";
import { usePreviewLang } from "@/components/providers/PreviewLangProvider";

// "Vertical writing" in Japanese, Korean, and Chinese · the columns reveal in
// reading order: rightmost column first, each column top→bottom. The selected
// preview language leads (rightmost, strongest ink); the others follow muted.
const WORDS: Record<Lang, string> = { ja: "縦書き", ko: "세로쓰기", zh: "竖排" };
const COLORS = ["var(--color-fg)", "var(--color-fg-muted)", "var(--color-fg-subtle)"];

const COLUMN_STAGGER = 450;
const CHAR_STAGGER = 110;

// Steps: 0 reveal + hold → 1 fade out, then the chars remount and reveal again
const DURATIONS = [4600, 700] as const;

export function HeroVerticalMotif() {
  const { step, reduced } = useLoopStep(DURATIONS, 0);
  const { lang } = usePreviewLang();
  const [cycle, setCycle] = useState(0);
  const firstRun = useRef(true);

  // Selected language first, the remaining two in canonical order.
  const order: Lang[] = [lang, ...(["ja", "ko", "zh"] as Lang[]).filter((l) => l !== lang)];
  const COLUMNS = order.map((l, i) => ({ text: WORDS[l], color: COLORS[i] }));

  useEffect(() => {
    if (step !== 0) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setCycle((c) => c + 1);
  }, [step]);

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
        opacity: step === 1 ? 0 : 1,
        transition: "opacity var(--duration-page) var(--easing-default)",
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
              key={`${cycle}-${charIndex}`}
              style={{
                display: "inline-block",
                animation: reduced
                  ? "none"
                  : "vw-hero-char var(--duration-page) var(--easing-out) both",
                animationDelay: reduced
                  ? undefined
                  : `${colIndex * COLUMN_STAGGER + charIndex * CHAR_STAGGER}ms`,
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
      `}</style>
    </div>
  );
}
