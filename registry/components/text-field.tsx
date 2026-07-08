"use client";

/**
 * VerticalTextField — a labeled text input for vertical interfaces.
 *
 * The input itself deliberately stays horizontal: CJK IME composition
 * (candidate windows, inline conversion) assumes a horizontal baseline, and
 * fighting it costs more than it teaches. The field's vertical fluency lives
 * in its label, which is set on the reading axis beside the input. Help and
 * error text are wired via `aria-describedby`; errors set `aria-invalid`.
 *
 * Docs: https://vertically.works/components/text-field
 */

import { useId, type CSSProperties, type InputHTMLAttributes } from "react";

export interface VerticalTextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "style"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helpText?: string;
  error?: string;
  /** Set the label horizontally instead (defaults to vertical). */
  horizontalLabel?: boolean;
  style?: CSSProperties;
}

export function VerticalTextField({
  label,
  value,
  onChange,
  helpText,
  error,
  horizontalLabel = false,
  id,
  style,
  ...rest
}: VerticalTextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;
  const errorId = `${inputId}-error`;
  const describedBy = [helpText ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", ...style }}>
      <label
        htmlFor={inputId}
        style={{
          ...(horizontalLabel
            ? {}
            : { writingMode: "vertical-rl" as const, textOrientation: "mixed" as const }),
          fontSize: "0.8125rem",
          fontWeight: 500,
          color: "var(--color-fg)",
          letterSpacing: "0.05em",
          paddingTop: horizontalLabel ? 8 : 2,
          flexShrink: 0,
        }}
      >
        {label}
      </label>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", flex: 1, minWidth: 0 }}>
        <input
          data-vw="text-field"
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          style={{
            height: 40,
            padding: "0 var(--space-3)",
            borderRadius: "var(--radius-lg)",
            border: `1.5px solid ${error ? "var(--color-fg)" : "var(--color-border-strong)"}`,
            background: "var(--color-bg)",
            color: "var(--color-fg)",
            fontSize: "0.9375rem",
            fontFamily: "inherit",
            width: "100%",
            transition: "border-color var(--duration-fast) var(--easing-default)",
          }}
          {...rest}
        />
        {helpText && !error && (
          <p id={helpId} style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)", margin: 0, lineHeight: 1.5 }}>
            {helpText}
          </p>
        )}
        {error && (
          <p id={errorId} style={{ fontSize: "0.75rem", color: "var(--color-fg)", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
