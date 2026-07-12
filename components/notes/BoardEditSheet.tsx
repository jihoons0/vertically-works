"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/notes/i18n";
import type { Board } from "@/lib/notes/store";
import { VTextField } from "@/components/notes/VTextField";

/**
 * Board edit overlay — vertical UI throughout. Title, name field, and the
 * delete action are vertical columns flowing right-to-left, like the rest of
 * the app: title at the reading start (right), the name editor beside it, the
 * destructive delete set apart on the left. Renames commit on Enter or close.
 */
export function BoardEditSheet({
  open,
  board,
  onRename,
  onDelete,
  onClose,
}: {
  open: boolean;
  board: Board | null;
  onRename: (title: string) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [render, setRender] = useState(open);
  const [closing, setClosing] = useState(false);
  const [draft, setDraft] = useState("");
  const draftRef = useRef("");
  draftRef.current = draft;

  useEffect(() => {
    if (open && board) setDraft(board.title);
  }, [open, board]);

  useEffect(() => {
    if (open) {
      setRender(true);
      setClosing(false);
    } else if (render) {
      setClosing(true);
      const timer = setTimeout(() => setRender(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open, render]);

  const commitAndClose = () => {
    const next = draftRef.current.trim();
    if (board && next && next !== board.title) onRename(next);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") commitAndClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!render) return null;

  return (
    <>
      <div
        onClick={commitAndClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          animation: `${closing ? "vd-fade-out" : "vd-fade-in"} 200ms ease both`,
          zIndex: 210,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.boards.editBoard}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          zIndex: 211,
          transform: "translate(-50%, -50%)",
          maxWidth: "88vw",
          background: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-lift)",
          padding: "var(--space-6) var(--space-5)",
          animation: `${closing ? "vd-pop-out" : "vd-pop-in"} 200ms var(--easing-out) both`,
        }}
      >
        {/* Vertical columns, reading right→left: title · name · delete */}
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "stretch",
            gap: "var(--space-4)",
            height: "min(58vh, 280px)",
          }}
        >
          {/* Title column — close sits above the title (both at the reading start) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-3)",
              alignSelf: "flex-start",
              paddingBlock: "var(--space-1)",
            }}
          >
            <button
              className="pressable"
              aria-label={t.help.close}
              onClick={commitAndClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.125rem",
                lineHeight: 1,
                color: "var(--color-fg-subtle)",
                fontFamily: "inherit",
                padding: 0,
              }}
            >
              ×
            </button>
            <span
              className="v-text"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "var(--color-fg)",
                whiteSpace: "nowrap",
              }}
            >
              {t.boards.editBoard}
            </span>
          </div>

          {/* Name — a narrow vertical editor; only as wide as the text needs. */}
          <div
            style={{
              minWidth: 52,
              height: "100%",
              borderRadius: "var(--radius-xl)",
              border: "1.5px dashed var(--color-border-strong)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "var(--space-4) var(--space-3)",
            }}
          >
            <VTextField
              value={draft}
              onChange={setDraft}
              onEnter={commitAndClose}
              onEscape={commitAndClose}
              autoFocus
              ariaLabel={t.boards.rename}
              placeholder={t.boards.rename}
              style={{ fontSize: "1.0625rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--color-fg)" }}
            />
          </div>

          {/* Divider between the editor and the destructive action */}
          <div aria-hidden style={{ width: 1, alignSelf: "stretch", background: "var(--color-border)" }} />

          {/* Delete — a vertical button: trash icon over a vertical label. */}
          <button
            className="pressable"
            aria-label={t.boards.deleteBoard}
            onClick={() => {
              onDelete();
              onClose();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-3)",
              height: "100%",
              padding: "var(--space-4) var(--space-3)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-subtle)",
              color: "#ef4444",
              cursor: "pointer",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flexShrink: 0 }}>
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
            <span className="v-text" style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
              {t.boards.deleteBoard}
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes vd-pop-in { from { opacity: 0; transform: translate(-50%, -50%) scale(0.96); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @keyframes vd-pop-out { from { opacity: 1; transform: translate(-50%, -50%) scale(1); } to { opacity: 0; transform: translate(-50%, -50%) scale(0.97); } }
        @media (prefers-reduced-motion: reduce) {
          @keyframes vd-pop-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes vd-pop-out { from { opacity: 1; } to { opacity: 0; } }
        }
      `}</style>
    </>
  );
}
