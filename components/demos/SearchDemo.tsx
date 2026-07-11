"use client";
import { useState } from "react";

const CORPUS = [
  { ref: "세로쓰기 1", text: "서자방향 가운데 글씨를 세로로 쓰는 것" },
  { ref: "세로쓰기 2", text: "한국어·중국어·일본어가 전통적으로 세로로 쓰였다" },
  { ref: "역사 1", text: "우종서의 가장 오래된 기록은 중국에서 나왔다" },
  { ref: "역사 2", text: "죽간을 쓰던 때부터 한자 문화권은 세로로 썼다" },
  { ref: "역사 3", text: "옛 문헌은 전부 세로쓰기로 되어 있다" },
  { ref: "역사 4", text: "오른쪽부터 쓰는 것은 두루마리를 펴던 관행이다" },
];

export function SearchDemo() {
  const [query, setQuery] = useState("");
  const results = query.trim()
    ? CORPUS.filter((v) => v.text.includes(query.trim()) || v.ref.includes(query.trim()))
    : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 320, height: 420, border: "2px solid var(--color-border-strong)", borderRadius: 24, background: "var(--color-bg)", overflow: "hidden", display: "flex", flexDirection: "row-reverse" }}>
          {/* Vertical search bar · runs top→bottom on the reading-start (right) edge */}
          <div style={{ padding: "var(--space-4) var(--space-3)", borderLeft: "1px solid var(--color-border)", display: "flex", justifyContent: "center" }} role="search">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", padding: "var(--space-3) var(--space-2)", background: "var(--color-bg-muted)", borderRadius: "var(--radius-full)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                lang="ko"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색…"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed", flex: 1, minHeight: 120, width: "1.4em", border: "none", background: "transparent", fontSize: "0.9375rem", letterSpacing: "0.05em", color: "var(--color-fg)", outline: "none", fontFamily: "inherit", textAlign: "start" }}
              />
              {query && (
                <button className="pressable" onClick={() => setQuery("")} aria-label="지우기" style={{ border: "none", background: "none", color: "var(--color-fg-subtle)", cursor: "pointer", fontSize: "1rem", lineHeight: 1, fontFamily: "inherit" }}>×</button>
              )}
            </div>
          </div>

          {/* Results · vertical columns flowing R→L, matching the reading axis */}
          <div style={{ flex: 1, overflowX: "auto", overflowY: "hidden" }} aria-live="polite">
            {query.trim() === "" ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "var(--space-6)" }}>
                <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", color: "var(--color-fg-subtle)", fontSize: "0.8125rem", letterSpacing: "0.08em", lineHeight: 1.8 }}>
                  세로 · 죽간 · 두루마리 · 우종서 를 검색해 보세요
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
        The search field itself runs vertically on the reading-start (right) edge · the caret and query text advance top→bottom via `writing-mode: vertical-rl`. Results read as vertical columns flowing right-to-left on the same axis, each match highlighted by background, never rotation.
      </p>
    </div>
  );
}
