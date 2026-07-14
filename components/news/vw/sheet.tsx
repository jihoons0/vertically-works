"use client";

/**
 * VerticalSheet · an edge sheet aware of the reading axis.
 *
 * Screen geometry says a sheet slides up from the bottom; a vertical RTL
 * reading flow often disagrees. The `edge` prop makes the choice explicit:
 * `bottom` follows screen geometry, `left` enters from where reading is
 * headed, `right` from where it began. Modal semantics: focus trap, Escape,
 * scrim dismiss, focus restore.
 *
 * Docs: https://vertically.works/components/sheet
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export interface VerticalSheetProps {
  open: boolean;
  onClose: () => void;
  /** Which edge the sheet enters from. */
  edge?: "bottom" | "left" | "right";
  /** Accessible name for the sheet (required · the sheet has no implicit title). */
  "aria-label": string;
  children: ReactNode;
  style?: CSSProperties;
  /** Extra styles on the sheet panel itself (Vertically News: mobile width caps). */
  panelStyle?: CSSProperties;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const EDGE_STYLES: Record<NonNullable<VerticalSheetProps["edge"]>, CSSProperties> = {
  bottom: { left: 0, right: 0, bottom: 0, borderRadius: "var(--radius-xl) var(--radius-xl) 0 0", maxHeight: "70%" },
  left: { left: 0, top: 0, bottom: 0, borderRadius: "0 var(--radius-xl) var(--radius-xl) 0", maxWidth: "70%" },
  right: { right: 0, top: 0, bottom: 0, borderRadius: "var(--radius-xl) 0 0 var(--radius-xl)", maxWidth: "70%" },
};

export function VerticalSheet({
  open,
  onClose,
  edge = "bottom",
  children,
  style,
  panelStyle,
  ...aria
}: VerticalSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);

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
      <div
        aria-hidden
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
          animation: "vw-sheet-fade var(--duration-base) var(--easing-default) both",
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={aria["aria-label"]}
        tabIndex={-1}
        style={{
          position: "absolute",
          ...EDGE_STYLES[edge],
          background: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          padding: "var(--space-5)",
          overflow: "auto",
          animation: `vw-sheet-in-${edge} var(--duration-slow) var(--easing-drawer) both`,
          ...panelStyle,
        }}
      >
        {children}
      </div>

      <style>{`
        @keyframes vw-sheet-in-bottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes vw-sheet-in-left { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes vw-sheet-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes vw-sheet-fade { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          /* Slide becomes a fade · position never animates */
          @keyframes vw-sheet-in-bottom { from { opacity: 0; } to { opacity: 1; } }
          @keyframes vw-sheet-in-left { from { opacity: 0; } to { opacity: 1; } }
          @keyframes vw-sheet-in-right { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>
    </div>
  );
}
