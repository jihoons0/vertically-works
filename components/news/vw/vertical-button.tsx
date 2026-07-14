"use client";

/**
 * VerticalButton · a button whose label is set on the vertical reading axis.
 *
 * The label uses real `writing-mode: vertical-rl` (never a rotation transform),
 * so mixed CJK/Latin content orients correctly per glyph. The horizontal
 * cross-axis stays a comfortable touch target regardless of label length.
 *
 * Docs: https://vertically.works/components/button
 */

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export interface VerticalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `primary` inverts, `outline` draws a border, `ghost` sits on muted ground. */
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
}

const VARIANT_STYLES: Record<NonNullable<VerticalButtonProps["variant"]>, CSSProperties> = {
  primary: {
    background: "var(--color-fg)",
    color: "var(--color-bg)",
    border: "1px solid var(--color-fg)",
  },
  outline: {
    background: "transparent",
    color: "var(--color-fg)",
    border: "1.5px solid var(--color-border-strong)",
  },
  ghost: {
    background: "var(--color-bg-muted)",
    color: "var(--color-fg-muted)",
    border: "1px solid transparent",
  },
};

export function VerticalButton({
  variant = "primary",
  children,
  style,
  ...rest
}: VerticalButtonProps) {
  return (
    <button
      data-vw="button"
      className="pressable"
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 44, // touch target across the reading axis
        padding: "var(--space-4) var(--space-3)",
        borderRadius: "var(--radius-xl)",
        fontSize: "0.9375rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        fontFamily: "inherit",
        cursor: "pointer",
        transition: `opacity var(--duration-fast) var(--easing-default)`,
        ...VARIANT_STYLES[variant],
        ...(rest.disabled ? { opacity: 0.45, cursor: "not-allowed" } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
