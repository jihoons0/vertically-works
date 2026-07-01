"use client";

import { useState } from "react";

const HIGHLIGHT_COLORS = [
  { id: "yellow", color: "#FFD166", label: "노란색" },
  { id: "green",  color: "#44CF7A", label: "초록색" },
  { id: "blue",   color: "#60A5FA", label: "파란색" },
  { id: "pink",   color: "#F472B6", label: "분홍색" },
];

const ACTIONS = [
  {
    id: "save",
    label: "저장",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "note",
    label: "노트",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    id: "copy",
    label: "복사",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="11" height="11" rx="2.5" />
        <path d="M5 15V6a2 2 0 0 1 2-2h8" />
      </svg>
    ),
  },
];

export function PopoverMenuDemo() {
  const [activeColor, setActiveColor] = useState<string | null>("yellow");
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAction = (id: string) => {
    setActiveAction(id);
    if (id === "copy") {
      setCopied(true);
      setTimeout(() => { setCopied(false); setActiveAction(null); }, 1200);
    } else {
      setTimeout(() => setActiveAction(null), 600);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Demo panel — just the open/close menu */}
      <div
        style={{
          background: "var(--color-bg-muted)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-10)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 320,
        }}
      >
        {/* Closed state — a single button that opens the menu */}
        {!open && (
          <button className="pressable"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-4) var(--space-3)",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: "#1a1a1a",
              color: "white",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            }}
          >
            {/* Hamburger rotated 90° → vertical bars, reading on the vertical axis */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ transform: "rotate(90deg)" }}>
              <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
            </svg>
            <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", letterSpacing: "0.05em" }}>메뉴 열기</span>
          </button>
        )}

        {/* The action bar — dark vertical panel matching the screenshot */}
        {open && (
          <div
            role="toolbar"
            aria-label="구절 동작"
            style={{
              background: "#1a1a1a",
              borderRadius: 20,
              padding: "var(--space-3) var(--space-3) var(--space-4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              minWidth: 52,
              animation: "vab-in 220ms cubic-bezier(0.32,0.72,0,1) both",
            }}
          >
            {/* Close button — collapses the menu */}
            <button className="pressable"
              onClick={() => setOpen(false)}
              aria-label="메뉴 닫기"
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontFamily: "inherit",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {/* Divider */}
            <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.15)", margin: "0 0 var(--space-1)" }} />

            {/* Highlight color swatches */}
            {HIGHLIGHT_COLORS.map((c) => (
              <button className="pressable"
                key={c.id}
                onClick={() => setActiveColor(c.id === activeColor ? null : c.id)}
                aria-label={c.label}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: c.color,
                  border: activeColor === c.id
                    ? "2.5px solid white"
                    : "2.5px solid transparent",
                  cursor: "pointer",
                  transition: "transform 100ms ease, border-color 100ms ease",
                  outline: "none",
                  flexShrink: 0,
                  transform: activeColor === c.id ? "scale(1.1)" : "scale(1)",
                }}
              />
            ))}

            {/* Divider */}
            <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.15)", margin: "var(--space-1) 0" }} />

            {/* Action buttons */}
            {ACTIONS.map((action) => (
              <button className="pressable"
                key={action.id}
                onClick={() => handleAction(action.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-1)",
                  padding: "var(--space-2) var(--space-1)",
                  borderRadius: "var(--radius-lg)",
                  border: "none",
                  background: activeAction === action.id
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
                  color: "white",
                  cursor: "pointer",
                  transition: "background 100ms ease, transform 100ms ease",
                  transform: activeAction === action.id ? "scale(0.92)" : "scale(1)",
                  fontFamily: "inherit",
                  width: 44,
                }}
              >
                {/* Icon */}
                <span style={{ color: "rgba(255,255,255,0.85)", display: "flex" }}>
                  {action.id === "copy" && copied ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#44CF7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : action.icon}
                </span>
                {/* Label — vertical Korean text */}
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.05em",
                    lineHeight: 1.4,
                    userSelect: "none",
                  }}
                >
                  {action.id === "copy" && copied ? "완료" : action.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Tap <strong>메뉴 열기</strong> to open the action bar, then <strong>×</strong> to collapse it. Highlight swatches at top, action labels in vertical Korean text — the bar itself reads top-to-bottom, matching the reading axis.
      </p>

      <style>{`
        @keyframes vab-in {
          from { opacity: 0; transform: translateX(8px) scale(0.96); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="vab-in"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
