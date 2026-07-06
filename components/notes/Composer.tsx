"use client";

import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { VTextField } from "@/components/notes/VTextField";
import { useLocale } from "@/lib/notes/i18n";

export interface ComposerHandle {
  focus: () => void;
}

export const Composer = forwardRef<ComposerHandle, { onAdd: (text: string, starred: boolean) => void }>(
  function Composer({ onAdd }, ref) {
    const { t } = useLocale();
    const [text, setText] = useState("");
    const [starred, setStarred] = useState(false);
    const [focused, setFocused] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    const focusInput = () =>
      (wrapRef.current?.querySelector(".v-input-ce") as HTMLElement | null)?.focus();

    useImperativeHandle(ref, () => ({ focus: focusInput }));

    const commit = () => {
      if (!text.trim()) return;
      onAdd(text, starred);
      setText("");
      setStarred(false);
      requestAnimationFrame(focusInput);
    };

    const active = focused || text.length > 0;

    return (
      <div
        ref={wrapRef}
        role="group"
        aria-label={t.a11y.newTask}
        className="v-col"
        style={{
          flexShrink: 0,
          width: 78,
          height: "min(64vh, 520px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-4) var(--space-2)",
          borderRadius: "var(--radius-2xl)",
          border: `1.5px dashed ${active ? "var(--color-fg)" : "var(--color-border-strong)"}`,
          background: active ? "var(--color-bg)" : "var(--color-bg-subtle)",
          transition:
            "border-color var(--duration-base) var(--easing-out), background var(--duration-base) var(--easing-default)",
        }}
      >
        {/* Top — new/star affordance */}
        <button
          className="pressable"
          aria-label={starred ? t.a11y.unstar : t.a11y.addStar}
          aria-pressed={starred}
          onClick={() => setStarred((s) => !s)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: 2,
            color: starred ? "var(--color-fg)" : "var(--color-fg-subtle)",
            transition: "color var(--duration-fast) var(--easing-default)",
          }}
        >
          {starred ? "★" : "＋"}
        </button>

        {/* Vertical text input — shrink-wraps to content so a single column stays
            horizontally centered, growing symmetrically as columns wrap. */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", width: "100%", paddingBlock: "var(--space-2)" }}>
          <VTextField
            value={text}
            onChange={setText}
            onEnter={commit}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            ariaLabel={t.a11y.taskContent}
            placeholder={t.composerPlaceholder}
            style={{
              fontFamily: "var(--vd-task-font)",
              fontSize: "1.0625rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              lineHeight: 1.5,
              color: "var(--color-fg)",
            }}
          />
        </div>

        {/* Bottom — commit */}
        <button
          className="pressable"
          aria-label={t.a11y.addTask}
          onClick={commit}
          disabled={!text.trim()}
          style={{
            width: 30,
            height: 30,
            borderRadius: "var(--radius-full)",
            border: "none",
            background: text.trim() ? "var(--color-fg)" : "var(--color-bg-muted)",
            color: text.trim() ? "var(--color-bg)" : "var(--color-fg-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: text.trim() ? "pointer" : "default",
            fontSize: "1rem",
            lineHeight: 1,
            transition: "background var(--duration-base) var(--easing-out), color var(--duration-base) var(--easing-default)",
          }}
        >
          ↓
        </button>
      </div>
    );
  }
);
