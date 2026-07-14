"use client";

import { useState, type CSSProperties } from "react";

function tokenize(code: string): { type: string; value: string }[] {
  const tokens: { type: string; value: string }[] = [];
  const lines = code.split("\n");

  lines.forEach((line, i) => {
    if (i > 0) tokens.push({ type: "newline", value: "\n" });

    let remaining = line;
    while (remaining.length > 0) {
      // Comments
      if (remaining.startsWith("//")) {
        tokens.push({ type: "comment", value: remaining });
        remaining = "";
        continue;
      }
      // Strings
      const strMatch = remaining.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/);
      if (strMatch) {
        tokens.push({ type: "string", value: strMatch[1] });
        remaining = remaining.slice(strMatch[1].length);
        continue;
      }
      // Keywords
      const kwMatch = remaining.match(/^(import|export|from|default|function|return|const|let|var|type|interface|extends|implements|class|new|if|else|for|while|async|await|true|false|null|undefined)\b/);
      if (kwMatch) {
        tokens.push({ type: "keyword", value: kwMatch[1] });
        remaining = remaining.slice(kwMatch[1].length);
        continue;
      }
      // JSX tags
      const tagMatch = remaining.match(/^(<\/?[A-Z][A-Za-z]*|<\/?[a-z]+(?=[\s>\/]))/);
      if (tagMatch) {
        tokens.push({ type: "tag", value: tagMatch[1] });
        remaining = remaining.slice(tagMatch[1].length);
        continue;
      }
      // Prop names (word=)
      const propMatch = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)(?==)/);
      if (propMatch) {
        tokens.push({ type: "prop", value: propMatch[1] });
        remaining = remaining.slice(propMatch[1].length);
        continue;
      }
      // Numbers
      const numMatch = remaining.match(/^(\d+)/);
      if (numMatch) {
        tokens.push({ type: "number", value: numMatch[1] });
        remaining = remaining.slice(numMatch[1].length);
        continue;
      }
      // Anything else
      tokens.push({ type: "text", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  });
  return tokens;
}

// Monochrome syntax ramp · structure carries weight, not hue. Every color is a
// semantic token, so the block follows data-theme (light/dark/sepia) natively.
const TOKEN_STYLES: Record<string, CSSProperties> = {
  keyword: { color: "var(--color-fg)", fontWeight: 600 },
  tag: { color: "var(--color-fg)", fontWeight: 600 },
  prop: { color: "var(--color-fg-muted)" },
  string: { color: "var(--color-fg)" },
  number: { color: "var(--color-fg)" },
  comment: { color: "var(--color-fg-subtle)", fontStyle: "italic" },
  text: { color: "var(--color-fg-muted)" },
};

export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const lines = code.split("\n");
  const PREVIEW_LINES = 8;
  const shouldCollapse = lines.length > PREVIEW_LINES;
  const visibleCode = (!expanded && shouldCollapse)
    ? lines.slice(0, PREVIEW_LINES).join("\n")
    : code;

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{
        background: "var(--color-bg-muted)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        fontSize: "0.8125rem",
        fontFamily: "var(--font-geist-mono), 'Fira Code', monospace",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-3) var(--space-5)",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
        }}
      >
        <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.05em" }}>
          {language}
        </span>
        <button
          onClick={copy}
          style={{
            fontSize: "0.6875rem",
            color: copied ? "var(--color-fg)" : "var(--color-fg-subtle)",
            fontWeight: copied ? 600 : 400,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            padding: "2px var(--space-2)",
            borderRadius: "var(--radius-sm)",
            transition: "color var(--duration-fast) var(--easing-default)",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code content */}
      <div style={{ overflow: "auto", padding: "var(--space-5) 0" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "max-content" }}>
          <tbody>
            {visibleCode.split("\n").map((line, i) => (
              <tr key={i} style={{ lineHeight: 1.7 }}>
                <td
                  style={{
                    padding: "0 var(--space-5) 0 var(--space-4)",
                    color: "var(--color-fg-subtle)",
                    opacity: 0.7,
                    userSelect: "none",
                    textAlign: "right",
                    fontSize: "0.6875rem",
                    minWidth: 36,
                    verticalAlign: "top",
                  }}
                >
                  {i + 1}
                </td>
                <td style={{ padding: "0 var(--space-6) 0 0", whiteSpace: "pre" }}>
                  <HighlightedLine line={line} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expand/collapse */}
      {shouldCollapse && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: "100%",
            padding: "var(--space-3)",
            background: expanded
              ? "transparent"
              : "linear-gradient(to bottom, transparent, var(--color-bg-muted))",
            color: "var(--color-fg-subtle)",
            border: "none",
            borderTop: "1px solid var(--color-border)",
            cursor: "pointer",
            fontSize: "0.75rem",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-2)",
          }}
        >
          {expanded ? "↑ Collapse" : `↓ View ${lines.length - PREVIEW_LINES} more lines`}
        </button>
      )}
    </div>
  );
}

function HighlightedLine({ line }: { line: string }) {
  const tokens = tokenize(line + "\n").filter((t) => t.type !== "newline");
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} style={TOKEN_STYLES[t.type] ?? TOKEN_STYLES.text}>
          {t.value}
        </span>
      ))}
    </>
  );
}
