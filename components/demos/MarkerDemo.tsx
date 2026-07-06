"use client";

import { useState } from "react";

type MarkerType = "status" | "separator" | "system" | "date";

const MARKERS: { type: MarkerType; label: string; sub?: string; icon?: string }[] = [
  { type: "status",    label: "읽기 시작",    sub: "오전 9:23",  icon: "▶" },
  { type: "system",   label: "1장 완료",                         icon: "✓" },
  { type: "separator", label: "쉬는 중",      sub: "12분"                  },
  { type: "status",    label: "다시 읽기",    sub: "오전 9:45",  icon: "↺" },
  { type: "system",   label: "2장 완료",                         icon: "✓" },
  { type: "date",     label: "오늘",                                        },
];

const VERSES = [
  "글씨를 세로로 쓰는 것을 세로쓰기라 한다",
  "전통적으로 한국어와 중국어가 세로로 쓰였다",
  "죽간을 쓰던 때부터 세로로 써 왔고",
  "옛 문헌은 세로쓰기로 되어 있다",
];

export function MarkerDemo() {
  const [mode, setMode] = useState<"reading" | "chat">("reading");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Mode toggle */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)", padding: 3, gap: 2, background: "var(--color-bg-muted)" }}>
          {(["reading", "chat"] as const).map((m) => (
            <button className="pressable" key={m} onClick={() => setMode(m)} style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8125rem", fontWeight: 500,
              background: mode === m ? "var(--color-fg)" : "transparent",
              color: mode === m ? "var(--color-bg)" : "var(--color-fg-muted)",
              border: "none", cursor: "pointer",
              transition: "transform 140ms var(--easing-out), background 150ms var(--easing-out), color 150ms var(--easing-out), border-color 150ms var(--easing-out)", fontFamily: "inherit",
            }}>
              {m === "reading" ? "Reading progress" : "Conversation thread"}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: "var(--color-bg-muted)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        padding: "var(--space-8)",
        minHeight: 300,
      }}>

        {mode === "reading" ? (
          /* Reading mode: markers between vertical text columns */
          <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-6)", alignItems: "flex-start" }}>
            {VERSES.map((text, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }}>
                {/* Verse */}
                <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "1rem", letterSpacing: "0.1em", lineHeight: 1.9, color: "var(--color-fg)" }}>
                  {text}
                </span>

                {/* Marker between columns — appears as horizontal separator in vertical flow */}
                {i < VERSES.length - 1 && i === 1 && (
                  <div style={{
                    writingMode: "vertical-rl",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    padding: "var(--space-2) var(--space-2)",
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-fg-subtle)",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}>
                    <span style={{ color: "#16a34a", fontSize: "0.625rem" }}>✓</span>
                    1장 완료
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Conversation thread — vertical: entries flow as columns R→L (oldest
             rightmost), each reading top→bottom. Separators become vertical rules. */
          <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-4)", justifyContent: "center", alignItems: "center", minHeight: 240 }}>
            {MARKERS.map((marker, i) => {
              if (marker.type === "separator" || marker.type === "date") {
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", height: 160 }}>
                    <div style={{ width: 1, flex: 1, background: "var(--color-border)" }} />
                    <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", fontWeight: 500, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                      {marker.label}{marker.sub && ` · ${marker.sub}`}
                    </span>
                    <div style={{ width: 1, flex: 1, background: "var(--color-border)" }} />
                  </div>
                );
              }
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", padding: "var(--space-4) var(--space-3)", borderRadius: "var(--radius-lg)", background: "var(--color-bg)", border: "1px solid var(--color-border)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  <span style={{
                    fontSize: "0.75rem",
                    color: marker.type === "system" ? "#16a34a" : "var(--color-fg-subtle)",
                  }}>
                    {marker.icon}
                  </span>
                  <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.8125rem", color: "var(--color-fg)", fontWeight: 500, letterSpacing: "0.05em" }}>
                    {marker.label}
                  </span>
                  {marker.sub && (
                    <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.05em" }}>
                      {marker.sub}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        {mode === "reading"
          ? "Chapter completion markers appear between vertical columns — in vertical writing direction to match the reading axis."
          : "A vertical conversation thread: status and system markers flow as columns right-to-left (oldest on the right), each reading top→bottom. Session breaks become vertical rules between entries."}
      </p>
    </div>
  );
}
