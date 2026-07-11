"use client";

import { useState } from "react";

// A list cell reoriented for the vertical axis. In a horizontal list a cell is a
// full-width row · [leading] [title / subtitle] … [trailing accessory]. Rotated,
// it becomes a full-height column: leading at the top (reading start), title +
// subtitle as vertical text, and the disclosure accessory at the bottom. Cells
// stack as columns and the list scrolls right-to-left.
const CELLS = [
  { title: "세로쓰기", sub: "개요", accessory: "chevron" as const },
  { title: "우종서", sub: "역사", accessory: "chevron" as const },
  { title: "죽간", sub: "기원", accessory: "chevron" as const },
  { title: "두루마리", sub: "관행", accessory: "value", value: "읽는 중" as const },
  { title: "문자 체계", sub: "분류", accessory: "chevron" as const },
];

export function VerticalListCellDemo() {
  const [selected, setSelected] = useState(3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* The list · cells as columns flowing R→L, horizontally scrollable */}
      <div
        role="listbox"
        aria-label="목차"
        style={{
          background: "var(--color-bg-muted)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-6)",
          display: "flex",
          flexDirection: "row-reverse",
          gap: "var(--space-3)",
          overflowX: "auto",
          justifyContent: "flex-start",
        }}
      >
        {CELLS.map((cell, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={cell.title}
              className="pressable"
              role="option"
              aria-selected={isSelected}
              onClick={() => setSelected(i)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                width: 76,
                height: 236,
                padding: "var(--space-4) var(--space-2)",
                borderRadius: "var(--radius-lg)",
                border: isSelected ? "1px solid var(--color-fg)" : "1px solid var(--color-border)",
                background: isSelected ? "var(--color-bg-subtle)" : "var(--color-bg)",
                cursor: "pointer",
                fontFamily: "inherit",
                gap: "var(--space-3)",
                transition: "border-color 150ms var(--easing-out), background 150ms var(--easing-out)",
              }}
            >
              {/* Leading · index at the reading-start (top) edge */}
              <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title + subtitle · vertical text, reading R→L */}
              <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: "var(--space-2)" }}>
                <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "0.06em" }}>
                  {cell.title}
                </span>
                <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.05em", paddingTop: 2 }}>
                  {cell.sub}
                </span>
              </div>

              {/* Trailing accessory · at the end (bottom) of the reading flow.
                  The disclosure chevron points DOWN, along the reading axis. */}
              {cell.accessory === "chevron" ? (
                <span aria-hidden style={{ transform: "rotate(90deg)", fontSize: "1rem", color: "var(--color-fg-subtle)", lineHeight: 1 }}>›</span>
              ) : (
                <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "0.625rem", fontWeight: 600, color: "var(--color-bg)", background: "var(--color-fg)", borderRadius: "var(--radius-full)", padding: "var(--space-2) 2px", letterSpacing: "0.05em" }}>
                  {cell.value}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The primitive behind every vertical list. A cell is a full-height column · leading index at the top, vertical title + subtitle, and a trailing accessory (a down-pointing disclosure chevron, or a status pill) at the bottom. Cells stack as columns and the list scrolls right-to-left.
      </p>
    </div>
  );
}
