"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type DocsNavItem = { slug: string; name: string; category: string };

/**
 * The components-docs sidebar (Toss-docs style): an Overview group up top ·
 * Introduction and Set up · then every component grouped by category. Active
 * state follows the pathname; the layout hides the rail under 900px
 * (.components-sidebar), where the per-component breadcrumb picker takes over.
 */
export function DocsSidebar({ items }: { items: DocsNavItem[] }) {
  const pathname = usePathname();
  const categories = Array.from(new Set(items.map((c) => c.category)));

  const linkStyle = (active: boolean): React.CSSProperties => ({
    display: "block",
    padding: "var(--space-2) var(--space-6)",
    fontSize: "0.875rem",
    color: active ? "var(--color-fg)" : "var(--color-fg-muted)",
    fontWeight: active ? 600 : 400,
    background: active ? "var(--color-bg-muted)" : "transparent",
    borderRight: active ? "2px solid var(--color-fg)" : "2px solid transparent",
    transition:
      "color 100ms ease, background 100ms ease, border-color 100ms ease, font-weight 100ms ease",
  });

  const groupLabel: React.CSSProperties = {
    fontSize: "0.6875rem",
    fontWeight: 700,
    color: "var(--color-fg-subtle)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    padding: "0 var(--space-6)",
    marginBottom: "var(--space-2)",
  };

  return (
    <nav aria-label="Components documentation">
      {/* Overview · the docs' front matter */}
      <div style={{ marginBottom: "var(--space-6)" }}>
        <div style={groupLabel}>Overview</div>
        <Link href="/components" style={linkStyle(pathname === "/components")}>
          Introduction
        </Link>
        <Link href="/components/setup" style={linkStyle(pathname === "/components/setup")}>
          Set up
        </Link>
      </div>

      {/* Components · grouped by category */}
      {categories.map((cat) => (
        <div key={cat} style={{ marginBottom: "var(--space-6)" }}>
          <div style={groupLabel}>{cat}</div>
          {items
            .filter((c) => c.category === cat)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/components/${c.slug}`}
                style={linkStyle(pathname === `/components/${c.slug}`)}
              >
                {c.name}
              </Link>
            ))}
        </div>
      ))}
    </nav>
  );
}
