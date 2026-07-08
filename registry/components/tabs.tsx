"use client";

/**
 * VerticalTabs — a tab rail on the reading axis.
 *
 * The tablist is a vertical rail at the right edge — the reading start — with
 * vertical labels, and panels sit to its left, where reading continues.
 * Full `tablist`/`tab`/`tabpanel` semantics with `aria-orientation="vertical"`,
 * roving tabindex, and Up/Down/Home/End keyboard movement (selection follows
 * focus).
 *
 * Docs: https://vertically.works/components/tabs
 */

import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface VerticalTabsItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface VerticalTabsProps {
  items: VerticalTabsItem[];
  /** Controlled selected id. */
  value?: string;
  /** Uncontrolled initial id (defaults to the first item). */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Accessible name for the tablist (required). */
  "aria-label": string;
  /** Panel height; the rail matches it. */
  height?: number;
  style?: CSSProperties;
}

export function VerticalTabs({
  items,
  value,
  defaultValue,
  onValueChange,
  height = 260,
  style,
  ...aria
}: VerticalTabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.id);
  const active = value ?? internal;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: string) => {
    setInternal(id);
    onValueChange?.(id);
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Up = previous, Down = next: movement runs along the reading axis.
    let next: number | null = null;
    if (e.key === "ArrowDown") next = (index + 1) % items.length;
    else if (e.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    refs.current[next]?.focus();
    select(items[next].id);
  };

  const activeItem = items.find((i) => i.id === active) ?? items[0];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse", // rail at the reading start (right)
        gap: "var(--space-4)",
        alignItems: "stretch",
        ...style,
      }}
    >
      <div
        role="tablist"
        aria-label={aria["aria-label"]}
        aria-orientation="vertical"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
          height,
          padding: "var(--space-2)",
          borderRadius: "var(--radius-lg)",
          background: "var(--color-bg-muted)",
          border: "1px solid var(--color-border)",
          overflow: "auto",
          flexShrink: 0,
        }}
      >
        {items.map((item, index) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              data-vw="tab"
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(item.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className="pressable"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                flex: 1,
                minWidth: 40, // touch target across the axis
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--space-3) var(--space-2)",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: selected ? "var(--color-fg)" : "transparent",
                color: selected ? "var(--color-bg)" : "var(--color-fg-muted)",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                fontFamily: "inherit",
                cursor: "pointer",
                transition:
                  "background var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${activeItem?.id}`}
        aria-labelledby={`${baseId}-tab-${activeItem?.id}`}
        tabIndex={0}
        data-vw="tabpanel"
        style={{
          flex: 1,
          minWidth: 0,
          height,
          overflow: "auto",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg)",
          padding: "var(--space-5)",
        }}
      >
        {activeItem?.content}
      </div>
    </div>
  );
}
