"use client";

import { useState } from "react";

type MessageMode = "horizontal" | "vertical";

const MESSAGES = [
  { from: "them", text: "세로쓰기의 유래가 흥미로웠어요",       time: "오전 9:14", vertical: "세로쓰기의 유래가 흥미로웠어요" },
  { from: "me",   text: "어떤 부분이요?",                     time: "오전 9:15", vertical: "어떤 부분이요?" },
  { from: "them", text: "죽간에서 세로쓰기가 시작됐대요",       time: "오전 9:16", vertical: "죽간에서 세로쓰기가 시작됐대요" },
  { from: "me",   text: "그 부분 저도 좋아해요",              time: "오전 9:16", vertical: "그 부분 저도 좋아해요" },
];

function Avatar({ label, me }: { label: string; me: boolean }) {
  return (
    <div className="corner-round" style={{
      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
      background: me ? "var(--color-fg)" : "var(--color-bg-muted)",
      border: "1px solid var(--color-border)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "0.75rem", fontWeight: 700,
      color: me ? "var(--color-bg)" : "var(--color-fg-muted)",
    }}>
      {label}
    </div>
  );
}

export function MessageDemo() {
  const [mode, setMode] = useState<MessageMode>("vertical");
  const [sent, setSent] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Toggle */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)", padding: 3, gap: 2, background: "var(--color-bg-muted)" }}>
          {(["horizontal", "vertical"] as const).map((m) => (
            <button className="pressable" key={m} onClick={() => setMode(m)} style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8125rem", fontWeight: 500,
              background: mode === m ? "var(--color-fg)" : "transparent",
              color: mode === m ? "var(--color-bg)" : "var(--color-fg-muted)",
              border: "none", cursor: "pointer",
              transition: "transform 140ms var(--easing-out), background 150ms var(--easing-out), color 150ms var(--easing-out), border-color 150ms var(--easing-out)", fontFamily: "inherit",
            }}>
              {m === "horizontal" ? "Horizontal bubbles" : "Vertical adaptation"}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: "var(--color-bg-muted)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        minHeight: 360,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Messages */}
        <div style={{ flex: 1, padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-4)", overflowY: "auto" }}>
          {mode === "horizontal" ? (
            /* Standard horizontal bubbles */
            MESSAGES.map((msg, i) => {
              const me = msg.from === "me";
              return (
                <div key={i} style={{ display: "flex", gap: "var(--space-3)", flexDirection: me ? "row-reverse" : "row", alignItems: "flex-end" }}>
                  <Avatar label={me ? "나" : "친"} me={me} />
                  <div style={{ maxWidth: "70%", display: "flex", flexDirection: "column", alignItems: me ? "flex-end" : "flex-start", gap: 4 }}>
                    <div style={{
                      padding: "var(--space-3) var(--space-4)",
                      borderRadius: 16,
                      background: me ? "var(--color-fg)" : "var(--color-bg)",
                      color: me ? "var(--color-bg)" : "var(--color-fg)",
                      border: me ? "none" : "1px solid var(--color-border)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.5,
                      borderBottomRightRadius: me ? 4 : 16,
                      borderBottomLeftRadius: me ? 16 : 4,
                    }}>
                      {msg.text}
                    </div>
                    <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)" }}>{msg.time}</span>
                  </div>
                </div>
              );
            })
          ) : (
            /* Vertical adaptation · messages flow as vertical text columns */
            <div style={{
              display: "flex",
              flexDirection: "row-reverse", // RTL: latest message on left
              gap: "var(--space-5)",
              alignItems: "flex-start",
              padding: "var(--space-2)",
              overflowX: "auto",
              minHeight: 240,
            }}>
              {MESSAGES.map((msg, i) => {
                const me = msg.from === "me";
                return (
                  <div key={i} style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--space-2)",
                  }}>
                    <Avatar label={me ? "나" : "친"} me={me} />
                    <div style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      padding: "var(--space-3) var(--space-3)",
                      borderRadius: 14,
                      background: me ? "var(--color-fg)" : "var(--color-bg)",
                      color: me ? "var(--color-bg)" : "var(--color-fg)",
                      border: me ? "none" : "1px solid var(--color-border)",
                      fontSize: "0.9375rem",
                      letterSpacing: "0.08em",
                      lineHeight: 1.8,
                    }}>
                      {msg.vertical}
                    </div>
                    <span style={{ fontSize: "0.6rem", color: "var(--color-fg-subtle)", writingMode: "vertical-rl" }}>{msg.time}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Input area */}
        <div style={{
          borderTop: "1px solid var(--color-border)",
          padding: "var(--space-4) var(--space-5)",
          display: "flex",
          gap: "var(--space-3)",
          alignItems: "center",
          background: "var(--color-bg)",
        }}>
          <div style={{
            flex: 1,
            padding: "var(--space-3) var(--space-4)",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--color-border)",
            fontSize: "0.875rem",
            color: "var(--color-fg-subtle)",
            background: "var(--color-bg-muted)",
          }}>
            메시지 입력…
          </div>
          <button className="pressable corner-round"
            onClick={() => { setSent(true); setTimeout(() => setSent(false), 800); }}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "var(--color-fg)", color: "var(--color-bg)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transform: sent ? "scale(0.88)" : "scale(1)",
              transition: "transform 80ms ease",
            }}
            aria-label="전송"
          >
            {/* Send arrow points left · the forward/RTL reading direction */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ transform: "rotate(180deg)" }}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6, maxWidth: "52ch", marginInline: "auto" }}>
        {mode === "horizontal"
          ? "Standard horizontal bubbles · familiar but misaligned with vertical reading direction."
          : "Vertical adaptation · each message is a column flowing right-to-left, matching the reading axis. Latest message on the left."}
      </p>
    </div>
  );
}
