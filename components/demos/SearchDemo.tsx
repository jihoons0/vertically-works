"use client";
import { useState } from "react";

const CORPUS = [
  { ref: "창세기 1:1", text: "태초에 하나님이 천지를 창조하시니라" },
  { ref: "창세기 1:3", text: "빛이 있으라 하시니 빛이 있었고" },
  { ref: "시편 23:1", text: "여호와는 나의 목자시니 내게 부족함이 없으리로다" },
  { ref: "요한복음 1:1", text: "태초에 말씀이 계시니라" },
  { ref: "요한복음 3:16", text: "하나님이 세상을 이처럼 사랑하사" },
  { ref: "마태복음 5:9", text: "화평하게 하는 자는 복이 있나니" },
];

export function SearchDemo() {
  const [query, setQuery] = useState("");
  const results = query.trim()
    ? CORPUS.filter((v) => v.text.includes(query.trim()) || v.ref.includes(query.trim()))
    : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 320, height: 420, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Search input — the OS text field is horizontal (see Text Field), but results below read vertically */}
          <div style={{ padding: "var(--space-4)", borderBottom: "1px solid var(--color-border)" }} role="search">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", padding: "var(--space-2) var(--space-3)", background: "var(--color-bg-muted)", borderRadius: "var(--radius-full)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                lang="ko"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색…"
                style={{ flex: 1, border: "none", background: "transparent", fontSize: "0.9375rem", color: "var(--color-fg)", outline: "none", fontFamily: "inherit" }}
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="지우기" style={{ border: "none", background: "none", color: "var(--color-fg-subtle)", cursor: "pointer", fontSize: "1rem", lineHeight: 1, fontFamily: "inherit" }}>×</button>
              )}
            </div>
          </div>

          {/* Results — vertical columns flowing R→L, matching the reading axis */}
          <div style={{ flex: 1, overflowX: "auto", overflowY: "hidden" }} aria-live="polite">
            {query.trim() === "" ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "var(--space-6)" }}>
                <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", color: "var(--color-fg-subtle)", fontSize: "0.8125rem", letterSpacing: "0.08em", lineHeight: 1.8 }}>
                  태초에 · 빛 · 사랑 · 목자 를 검색해 보세요
                </span>
              </div>
            ) : results.length === 0 ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", color: "var(--color-fg-subtle)", fontSize: "0.8125rem", letterSpacing: "0.08em" }}>결과 없음</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row-reverse", height: "100%", alignItems: "stretch" }}>
                {results.map((r) => {
                  const idx = r.text.indexOf(query.trim());
                  return (
                    <button key={r.ref} style={{ display: "flex", flexDirection: "row-reverse", gap: 4, height: "100%", textAlign: "start", padding: "var(--space-4) var(--space-3)", border: "none", borderLeft: "1px solid var(--color-border)", background: "transparent", cursor: "pointer", fontFamily: "inherit", flexShrink: 0, alignItems: "flex-start" }} className="pressable">
                      <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.05em" }}>{r.ref}</span>
                      <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.9375rem", color: "var(--color-fg)", letterSpacing: "0.08em", lineHeight: 1.8 }}>
                        {idx >= 0 && query.trim() ? (
                          <>
                            {r.text.slice(0, idx)}
                            <mark style={{ background: "#FFD16655", color: "var(--color-fg)", borderRadius: 2, padding: "1px 0" }}>{r.text.slice(idx, idx + query.trim().length)}</mark>
                            {r.text.slice(idx + query.trim().length)}
                          </>
                        ) : r.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The results read as vertical columns flowing right-to-left — the same axis as the reader — with each match highlighted by background, never rotation. Only the OS text field stays horizontal (the app bridges it to a vertical caret; see Text Field).
      </p>
    </div>
  );
}
