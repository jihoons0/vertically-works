"use client";

/**
 * VerticalDialog · a modal dialog whose content reads as vertical columns.
 *
 * Title, description, and actions flow right→left as columns, but the dialog
 * itself scales from center: an overlay is a layer above the reading flow,
 * not a continuation of it. Focus is trapped while open, Escape and the scrim
 * dismiss, and focus returns to the trigger on close.
 *
 * Docs: https://vertically.works/components/dialog
 */

import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";

export interface VerticalDialogProps {
  open: boolean;
  onClose: () => void;
  /** Dialog title · the rightmost (first-read) column. */
  title: string;
  /** Supporting text, set as a column to the title's left. */
  description?: string;
  /** Action buttons (e.g. VerticalButton) · rendered at the end of the reading flow. */
  actions?: ReactNode;
  /** Containing block: `fixed` covers the viewport (default). Place inside a
   *  `transform`ed ancestor to confine the dialog to that box instead. */
  style?: CSSProperties;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function VerticalDialog({
  open,
  onClose,
  title,
  description,
  actions,
  style,
}: VerticalDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  // Focus management: remember the trigger, move focus in, restore on close.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();
    return () => previous?.focus();
  }, [open]);

  if (!open) return null;

  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, ...style }} onKeyDown={trapTab}>
      {/* Scrim */}
      <div
        aria-hidden
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
          animation: "vw-dialog-fade var(--duration-base) var(--easing-default) both",
        }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          background: "var(--color-bg)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          padding: "var(--space-6) var(--space-5)",
          display: "flex",
          flexDirection: "row-reverse", // columns read right → left
          alignItems: "stretch",
          gap: "var(--space-5)",
          animation: "vw-dialog-in var(--duration-base) var(--easing-spring) both",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: "var(--space-4)" }}>
          <h2
            id={titleId}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "var(--color-fg)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              id={descId}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "0.8125rem",
                color: "var(--color-fg-muted)",
                margin: 0,
                lineHeight: 1.7,
                letterSpacing: "0.05em",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-2)" }}>
            {actions}
          </div>
        )}
      </div>

      <style>{`
        @keyframes vw-dialog-in {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes vw-dialog-fade { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          /* Keep the fade, drop the scale bounce */
          @keyframes vw-dialog-in {
            from { opacity: 0; transform: translate(-50%, -50%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
          }
        }
      `}</style>
    </div>
  );
}
