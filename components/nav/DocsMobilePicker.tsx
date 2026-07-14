"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocsNavItem } from "./DocsSidebar";

/**
 * Mobile stand-in for the docs sidebar (.components-mobilenav shows it under
 * 900px): a dropdown naming the current page that opens the full docs map ·
 * Overview plus every component by category.
 */
export function DocsMobilePicker({ items }: { items: DocsNavItem[] }) {
  const pathname = usePathname();
  const categories = Array.from(new Set(items.map((c) => c.category)));

  const current =
    pathname === "/components"
      ? "Introduction"
      : pathname === "/components/setup"
        ? "Set up"
        : items.find((c) => pathname === `/components/${c.slug}`)?.name ?? "Components";

  const close = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).closest("details")?.removeAttribute("open");
  };

  const itemStyle = (active: boolean): React.CSSProperties => ({
    display: "block",
    padding: "var(--space-2) var(--space-3)",
    borderRadius: "var(--radius-md)",
    fontSize: "0.875rem",
    color: active ? "var(--color-fg)" : "var(--color-fg-muted)",
    fontWeight: active ? 600 : 400,
    background: active ? "var(--color-bg-muted)" : "transparent",
  });

  const groupLabel: React.CSSProperties = {
    fontSize: "0.625rem",
    fontWeight: 700,
    color: "var(--color-fg-subtle)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "var(--space-2) var(--space-3) var(--space-1)",
  };

  return (
    <details style={{ position: "relative" }}>
      <summary
        style={{
          listStyle: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--color-fg)",
        }}
      >
        {current}
        <span aria-hidden style={{ fontSize: "0.7em", color: "var(--color-fg-subtle)" }}>▾</span>
      </summary>

      <div
        style={{
          position: "absolute",
          top: "calc(100% + var(--space-2))",
          insetInlineStart: 0,
          zIndex: 45,
          minWidth: 232,
          maxHeight: "62vh",
          overflowY: "auto",
          background: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-overlay)",
          padding: "var(--space-2)",
        }}
      >
        <div style={{ marginBottom: "var(--space-1)" }}>
          <div style={groupLabel}>Overview</div>
          <Link href="/components" onClick={close} style={itemStyle(pathname === "/components")}>
            Introduction
          </Link>
          <Link href="/components/setup" onClick={close} style={itemStyle(pathname === "/components/setup")}>
            Set up
          </Link>
        </div>
        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: "var(--space-1)" }}>
            <div style={groupLabel}>{cat}</div>
            {items
              .filter((c) => c.category === cat)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/components/${c.slug}`}
                  onClick={close}
                  style={itemStyle(pathname === `/components/${c.slug}`)}
                >
                  {c.name}
                </Link>
              ))}
          </div>
        ))}
      </div>
    </details>
  );
}
