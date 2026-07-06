"use client";

import { useEffect, useRef } from "react";

function placeCaretEnd(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

/**
 * A vertical-text input built on contentEditable so it shrink-wraps to its
 * content exactly like the static display text: a single column stays
 * horizontally centered in its cell, and it grows symmetrically as columns wrap.
 * A native <textarea> can't do this in `writing-mode: vertical-rl`.
 */
export function VTextField({
  value,
  onChange,
  onEnter,
  onEscape,
  onFocus,
  onBlur,
  placeholder,
  autoFocus,
  ariaLabel,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Sync external value into the DOM only when they diverge (e.g. cleared after
  // submit). Typing keeps them equal, so the caret is never disturbed.
  useEffect(() => {
    const el = ref.current;
    if (el && el.textContent !== value) el.textContent = value;
  }, [value]);

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
      placeCaretEnd(ref.current);
    }
  }, [autoFocus]);

  return (
    <div
      ref={ref}
      className="v-input-ce"
      role="textbox"
      aria-label={ariaLabel}
      aria-multiline="true"
      tabIndex={0}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-placeholder={placeholder}
      data-empty={value.length === 0 ? "" : undefined}
      onInput={(e) => onChange(e.currentTarget.textContent ?? "")}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onEnter?.();
        } else if (e.key === "Escape") {
          e.preventDefault();
          onEscape?.();
        }
        e.stopPropagation();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      style={style}
    />
  );
}
