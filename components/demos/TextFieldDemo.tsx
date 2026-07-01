"use client";
import { useState } from "react";

export function TextFieldDemo() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ background: "var(--color-bg-muted)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "var(--space-10)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)", minHeight: 220 }}>
        {/* The input stays horizontal — composition needs a horizontal baseline */}
        <div style={{ width: "100%", maxWidth: 320 }}>
          <label htmlFor="tf-demo" style={{ display: "block", fontSize: "0.75rem", color: "var(--color-fg-subtle)", marginBottom: "var(--space-2)", letterSpacing: "0.04em" }}>
            검색어
          </label>
          <input
            id="tf-demo"
            type="text"
            lang="ko"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="구절을 입력하세요…"
            style={{
              width: "100%",
              padding: "var(--space-3) var(--space-4)",
              border: `1px solid ${focused ? "var(--color-fg)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-lg)",
              fontSize: "1rem",
              color: "var(--color-fg)",
              background: "var(--color-bg)",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 150ms ease",
            }}
          />
          <p style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", marginTop: "var(--space-2)", margin: "var(--space-2) 0 0" }}>
            The input itself stays horizontal — CJK IME composition requires a horizontal baseline.
          </p>
        </div>

        {/* Echo the typed value vertically, as it would appear in the reader */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 80 }}>
          {value ? (
            <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "1.125rem", letterSpacing: "0.1em", lineHeight: 1.9, color: "var(--color-fg)" }}>
              {value}
            </span>
          ) : (
            <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>
              Typed text renders vertically here ↑
            </span>
          )}
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Type Korean, Japanese, or Chinese above. The field is horizontal (IME needs it); the resulting content flows vertically where it lives in the reader.
      </p>
    </div>
  );
}
