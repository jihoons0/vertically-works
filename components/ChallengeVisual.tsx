"use client";

import { usePreviewLang } from "@/components/providers/PreviewLangProvider";
import type { Lang } from "@/components/home/bento-shared";

// Every text-bearing diagram localizes with the site-wide preview language.
const T: Record<
  Lang,
  {
    reading: string;
    verseBook: string;
    selection: [string, string, string];
    caret: string;
    candidates: [string, string, string];
    keyChar: string;
    keyLine: string;
    chatA: string;
    chatB: string;
  }
> = {
  ko: {
    reading: "읽기 ↓",
    verseBook: "창",
    selection: ["세로쓰기", "라고도", "부른다"],
    caret: "가",
    candidates: ["1 가", "2 家", "3 加"],
    keyChar: "↓ 다음 글자",
    keyLine: "← 다음 줄",
    chatA: "안녕하세요",
    chatB: "반가워요",
  },
  ja: {
    reading: "読み ↓",
    verseBook: "創",
    selection: ["縦書き", "とも", "呼ぶ"],
    caret: "か",
    candidates: ["1 か", "2 家", "3 加"],
    keyChar: "↓ 次の文字",
    keyLine: "← 次の行",
    chatA: "こんにちは",
    chatB: "よろしく",
  },
  zh: {
    reading: "閱讀 ↓",
    verseBook: "創",
    selection: ["直書", "又稱", "豎排"],
    caret: "家",
    candidates: ["1 家", "2 加", "3 佳"],
    keyChar: "↓ 下一字",
    keyLine: "← 下一行",
    chatA: "你好",
    chatB: "幸會",
  },
};

// Compact, monochrome diagrams of each challenge's core axis conflict · each
// one a self-playing CSS loop that acts out the question it illustrates
// (motion always along the axis under discussion, never decorative). Token-based
// only; vertical text used where it sharpens the point. Shared by the
// /challenges page and the homepage Challenges section. Base styles hold the
// resolved static composition, so prefers-reduced-motion (which freezes
// animations globally) leaves the original still diagram.
export function ChallengeVisual({ id }: { id: string }) {
  const { lang } = usePreviewLang();
  const t = T[lang];
  const fg = "var(--color-fg)";
  const sub = "var(--color-fg-subtle)";
  const strong = "var(--color-border-strong)";
  const muted = "var(--color-bg-muted)";
  const bg = "var(--color-bg)";

  switch (id) {
    case "motion-direction":
      // The sheet keeps sliding up from screen geometry while reading flows down.
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative", width: 50, height: 88, border: `1.5px solid ${strong}`, borderRadius: 10, overflow: "hidden", background: bg }}>
            <div
              style={{
                position: "absolute", left: 0, right: 0, bottom: 0, height: "48%",
                background: fg, borderRadius: "6px 6px 0 0",
                display: "flex", justifyContent: "center", paddingTop: 4,
                animation: "vw-cv-sheet 4.5s var(--easing-drawer) infinite",
              }}
            >
              <span style={{ color: bg, fontSize: 13, fontWeight: 700 }}>↑</span>
            </div>
          </div>
          <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: 12, color: sub, letterSpacing: "0.1em" }}>{t.reading}</span>
          <style>{`@keyframes vw-cv-sheet {
            0%, 12% { transform: translateY(94%); }
            30%, 64% { transform: translateY(0); }
            82%, 100% { transform: translateY(94%); }
          }`}</style>
        </div>
      );
    case "mixed-language":
      // The digit run keeps flipping between rotated and tate-chu-yoko upright.
      return (
        <span style={{ display: "grid", justifyItems: "center", fontSize: 22, letterSpacing: "0.12em", color: fg }}>
          <span style={{ gridArea: "1 / 1", writingMode: "vertical-rl", textOrientation: "mixed", animation: "vw-cv-lang-a 5s var(--easing-default) infinite" }}>
            「{t.verseBook} 1:1」
          </span>
          <span aria-hidden style={{ gridArea: "1 / 1", writingMode: "vertical-rl", textOrientation: "mixed", opacity: 0, animation: "vw-cv-lang-b 5s var(--easing-default) infinite" }}>
            「{t.verseBook} <span style={{ textCombineUpright: "all" }}>1:1</span>」
          </span>
          <style>{`
            @keyframes vw-cv-lang-a { 0%, 40% { opacity: 1; } 50%, 90% { opacity: 0; } 100% { opacity: 1; } }
            @keyframes vw-cv-lang-b { 0%, 40% { opacity: 0; } 50%, 90% { opacity: 1; } 100% { opacity: 0; } }
          `}</style>
        </span>
      );
    case "navigation-direction":
      // The rail auditions each edge · right, bottom, left · and none quite fits.
      return (
        <div style={{ position: "relative", width: 60, height: 92, border: `1.5px solid ${strong}`, borderRadius: 10, background: bg, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 22, top: 8, bottom: 20, right: 22, display: "flex", flexDirection: "row-reverse", gap: 4 }}>
            {[0, 1, 2].map((i) => <div key={i} style={{ width: 2, background: muted, borderRadius: 2 }} />)}
          </div>
          {([
            { pos: { top: 0, bottom: 0, right: 0, width: 16, borderLeft: `1px solid var(--color-border)` }, delay: 0, base: 1 },
            { pos: { left: 0, right: 0, bottom: 0, height: 14, borderTop: `1px solid var(--color-border)` }, delay: 2, base: 0.22 },
            { pos: { top: 0, bottom: 0, left: 0, width: 16, borderRight: `1px solid var(--color-border)` }, delay: 4, base: 0.22 },
          ] as const).map((rail, i) => (
            <div
              key={i}
              style={{
                position: "absolute", ...rail.pos, background: muted,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: rail.base,
                animation: `vw-cv-rail 6s var(--easing-default) ${rail.delay}s infinite`,
              }}
            >
              <span style={{ fontSize: 10, color: sub, fontWeight: 700 }}>?</span>
            </div>
          ))}
          <style>{`@keyframes vw-cv-rail {
            0%, 28% { opacity: 1; }
            36%, 92% { opacity: 0.22; }
            100% { opacity: 1; }
          }`}</style>
        </div>
      );
    case "selection":
      // Drag-select in reading order: down the first column, then leftward.
      return (
        <div style={{ position: "relative", display: "flex", flexDirection: "row-reverse", gap: 8 }}>
          {t.selection.map((word, i) => (
            <span key={i} style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: 13, letterSpacing: "0.08em", color: fg }}>{word}</span>
          ))}
          <div
            style={{
              position: "absolute", top: "18%", bottom: "26%", left: "-6%", right: "-6%",
              background: "color-mix(in srgb, var(--color-fg) 16%, transparent)",
              borderRadius: 3,
              transformOrigin: "top right",
              animation: "vw-cv-select 5.5s var(--easing-in-out) infinite",
            }}
          />
          <style>{`@keyframes vw-cv-select {
            0%, 8% { transform: scale(0.3, 0.1); opacity: 0; }
            14% { opacity: 1; }
            34% { transform: scale(0.3, 1); }
            56%, 82% { transform: scale(1, 1); opacity: 1; }
            92%, 100% { transform: scale(1, 1); opacity: 0; }
          }`}</style>
        </div>
      );
    case "ime-vertical":
      // Composition caret blinks; the candidate list cycles its highlight.
      return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ writingMode: "vertical-rl", fontSize: 22, color: fg, borderInlineStart: `2px solid ${fg}`, paddingInlineStart: 3, animation: "vw-cv-caret 1.2s steps(1) infinite" }}>{t.caret}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, border: `1px solid ${strong}`, borderRadius: 6, padding: "4px 6px", background: bg }}>
            {t.candidates.map((x, i) => (
              <span
                key={x}
                style={{
                  fontSize: 10, color: sub, fontFamily: "var(--font-geist-mono)",
                  borderRadius: 3, padding: "0 2px",
                  animation: `vw-cv-cand 5.4s var(--easing-default) ${i * 1.8}s infinite`,
                }}
              >
                {x}
              </span>
            ))}
          </div>
          <style>{`
            @keyframes vw-cv-caret { 0%, 55% { border-color: ${fg}; } 56%, 100% { border-color: transparent; } }
            @keyframes vw-cv-cand { 0%, 26% { background: color-mix(in srgb, var(--color-fg) 10%, transparent); } 33%, 100% { background: transparent; } }
          `}</style>
        </div>
      );
    case "keyboard-navigation":
      // The two reading-axis keys take turns pressing: ↓ next glyph, ← next line.
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 22px)", gridAutoRows: 22, gap: 4 }}>
            {[
              { ch: "", k: "a" }, { ch: "↑", k: "up" }, { ch: "", k: "b" },
              { ch: "←", k: "left", on: true, delay: 1.6 }, { ch: "↓", k: "down", on: true, delay: 0 }, { ch: "→", k: "right" },
            ].map(({ ch, k, on, delay }) =>
              ch === "" ? <span key={k} /> : (
                <span
                  key={k}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 22, height: 22, borderRadius: 5, fontSize: 12, fontWeight: 600,
                    border: `1px solid ${on ? fg : "var(--color-border)"}`,
                    background: on ? fg : bg, color: on ? bg : sub,
                    animation: on ? `vw-cv-key 3.2s var(--easing-out) ${delay}s infinite` : undefined,
                  }}
                >
                  {ch}
                </span>
              )
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 10, color: sub }}>
            <span>{t.keyChar}</span>
            <span>{t.keyLine}</span>
          </div>
          <style>{`@keyframes vw-cv-key {
            0%, 6% { transform: scale(1); }
            12% { transform: scale(0.82); }
            22%, 100% { transform: scale(1); }
          }`}</style>
        </div>
      );
    case "drag-reorder":
      // The lifted column keeps trading places with its right-hand neighbour.
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 12, height: 60, borderRadius: 6,
                  background: i === 1 ? fg : muted,
                  border: `1px solid ${i === 1 ? fg : strong}`,
                  transform: i === 1 ? "translateY(-6px)" : "none",
                  boxShadow: i === 1 ? "0 6px 14px rgba(0,0,0,0.18)" : "none",
                  animation:
                    i === 1
                      ? "vw-cv-drag-active 4.5s var(--easing-in-out) infinite"
                      : i === 0
                        ? "vw-cv-drag-passive 4.5s var(--easing-in-out) infinite"
                        : undefined,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 14, color: sub }}>↔</span>
          <style>{`
            @keyframes vw-cv-drag-active {
              0%, 16% { transform: translate(0, -6px); }
              38%, 72% { transform: translate(20px, -6px); }
              92%, 100% { transform: translate(0, -6px); }
            }
            @keyframes vw-cv-drag-passive {
              0%, 16% { transform: translateX(0); }
              38%, 72% { transform: translateX(-20px); }
              92%, 100% { transform: translateX(0); }
            }
          `}</style>
        </div>
      );
    case "ai-chat":
      // The exchange replays: question column, then the reply beside it.
      return (
        <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: 8 }}>
          <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: 12, color: fg, background: muted, borderRadius: 999, padding: "10px 6px", letterSpacing: "0.05em", animation: "vw-cv-chat-a 6s var(--easing-out) infinite" }}>{t.chatA}</span>
          <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: 12, color: bg, background: fg, borderRadius: 999, padding: "10px 6px", marginTop: 22, letterSpacing: "0.05em", animation: "vw-cv-chat-b 6s var(--easing-out) infinite" }}>{t.chatB}</span>
          <style>{`
            @keyframes vw-cv-chat-a {
              0% { opacity: 0; transform: translateY(-6px); }
              8%, 88% { opacity: 1; transform: none; }
              96%, 100% { opacity: 0; transform: translateY(-6px); }
            }
            @keyframes vw-cv-chat-b {
              0%, 18% { opacity: 0; transform: translateY(-6px); }
              30%, 88% { opacity: 1; transform: none; }
              96%, 100% { opacity: 0; transform: translateY(-6px); }
            }
          `}</style>
        </div>
      );
    default:
      return null;
  }
}
