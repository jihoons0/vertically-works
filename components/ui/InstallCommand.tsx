"use client";

import { useState } from "react";

/** One-line install command with copy-to-clipboard, shown on installable component pages. */
export function InstallCommand({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  const command = `npx verticallyworks add ${name}`;

  const copy = () => {
    navigator.clipboard?.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-3) var(--space-3) var(--space-5)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-muted)",
      }}
    >
      <code
        style={{
          flex: 1,
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.8125rem",
          color: "var(--color-fg)",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "var(--color-fg-subtle)", userSelect: "none" }}>$ </span>
        {command}
      </code>
      <button
        onClick={copy}
        className="pressable"
        aria-label="Copy install command"
        style={{
          flexShrink: 0,
          height: 30,
          padding: "0 var(--space-3)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border-strong)",
          background: "var(--color-bg)",
          color: "var(--color-fg)",
          fontSize: "0.75rem",
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
