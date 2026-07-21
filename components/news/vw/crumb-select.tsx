"use client";

/**
 * CrumbSelect · a breadcrumb crumb that opens a vertical popover selector.
 *
 * The crumb shows the current selection; hovering it opens a popover of
 * options toward the reading direction (left). A short close delay lets the
 * pointer travel across the gap into the popover. On touch, a tap toggles it.
 * Single-select semantics (`role="listbox"`); options are vertical pills.
 * Keyboard: Down/Enter open; Up/Down move; Enter/Space select; Escape closes
 * and returns focus to the crumb. Only one CrumbSelect in a rail opens at a
 * time — the open crumb is lifted to the parent via `openId`/`onOpenChange`.
 */

import { useEffect, useId, useRef, type ReactNode } from "react";

export interface CrumbOption<T extends string> {
  id: T;
  /** Vertical pill content (wrap in VerticalText where the pipeline is needed). */
  label: ReactNode;
  lang?: string;
}

export function CrumbSelect<T extends string>({
  value,
  options,
  onChange,
  triggerLabel,
  ariaLabel,
  openId,
  onOpenChange,
}: {
  value: T;
  options: CrumbOption<T>[];
  onChange: (v: T) => void;
  /** Compact content shown in the crumb (the current selection). */
  triggerLabel: ReactNode;
  ariaLabel: string;
  /** Id of the crumb currently open in this rail (null = none). */
  openId: string | null;
  onOpenChange: (id: string | null) => void;
}) {
  const id = useId();
  const open = openId === id;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isTouch = useRef(false);

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const doOpen = () => {
    clearTimer();
    onOpenChange(id);
  };
  const doClose = () => {
    clearTimer();
    onOpenChange(null);
  };
  const scheduleClose = () => {
    clearTimer();
    // Long enough for the pointer to cross the gap into the popover.
    closeTimer.current = setTimeout(() => onOpenChange(null), 120);
  };
  useEffect(() => clearTimer, []);

  // On open (keyboard path), move focus to the selected option.
  useEffect(() => {
    if (!open) return;
    const i = Math.max(0, options.findIndex((o) => o.id === value));
    const raf = requestAnimationFrame(() => optionRefs.current[i]?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open, options, value]);

  // Outside pointerdown closes.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) onOpenChange(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, onOpenChange]);

  const select = (v: T) => {
    onChange(v);
    doClose();
    triggerRef.current?.focus();
  };

  const onOptionKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const d = e.key === "ArrowDown" ? 1 : -1;
      optionRefs.current[(i + d + options.length) % options.length]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(options[i].id);
    } else if (e.key === "Escape") {
      e.preventDefault();
      doClose();
      triggerRef.current?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      optionRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      optionRefs.current[options.length - 1]?.focus();
    }
  };

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", display: "flex" }}
      onMouseEnter={() => {
        if (!isTouch.current) doOpen();
      }}
      onMouseLeave={() => {
        if (!isTouch.current) scheduleClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="pressable"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onPointerDown={(e) => {
          if (e.pointerType === "touch") isTouch.current = true;
        }}
        onClick={() => {
          if (isTouch.current) (open ? doClose() : doOpen());
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            doOpen();
          } else if (e.key === "Escape") {
            doClose();
          }
        }}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-1)",
          border: "none",
          background: "transparent",
          color: open ? "var(--color-fg)" : "var(--color-fg-muted)",
          fontSize: "0.8125rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          padding: "var(--space-2) var(--space-1)",
          borderRadius: "var(--radius-full)",
          cursor: "pointer",
          transition: "color var(--duration-fast) var(--easing-default)",
        }}
      >
        {triggerLabel}
      </button>

      {/* Popover · opens toward the reading direction (left), a vertical stack. */}
      <div
        role="listbox"
        aria-label={ariaLabel}
        aria-hidden={!open}
        style={{
          position: "absolute",
          right: "calc(100% + var(--space-2))",
          top: 0,
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-1)",
          padding: "var(--space-2)",
          background: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-overlay)",
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(4px)",
          pointerEvents: open ? "auto" : "none",
          transition:
            "opacity var(--duration-base) var(--easing-out), transform var(--duration-base) var(--easing-out)",
        }}
      >
        {options.map((o, i) => {
          const selected = o.id === value;
          return (
            <button
              key={o.id}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
              type="button"
              role="option"
              aria-selected={selected}
              lang={o.lang}
              tabIndex={open ? 0 : -1}
              className="pressable"
              onClick={() => select(o.id)}
              onKeyDown={(e) => onOptionKey(e, i)}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--space-3) var(--space-2)",
                borderRadius: "var(--radius-full)",
                border: "none",
                background: selected ? "var(--color-fg)" : "transparent",
                color: selected ? "var(--color-bg)" : "var(--color-fg-muted)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition:
                  "background var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
