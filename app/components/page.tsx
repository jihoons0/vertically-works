import Link from "next/link";
import type { Metadata } from "next";
import { COMPONENTS_REGISTRY } from "@/lib/components-registry";

export const metadata: Metadata = {
  title: "Components · Introduction",
  description:
    "The component system for vertical writing interfaces: real writing-mode primitives, accessible by default, source you own.",
};

// The docs' front page (Toss-docs style): what the system is, what it
// guarantees, how to start · then the full component index by category.
const GOALS = [
  {
    title: "Correct by default",
    body: "Every component is set on the real vertical axis · writing-mode: vertical-rl with text-orientation: mixed · never a rotated horizontal control. Orientation, punctuation, and motion follow the reading direction.",
  },
  {
    title: "Accessible from the first line",
    body: "Keyboard, touch, screen reader, and reduced-motion behavior ship inside every component, not as an afterthought. Semantics stay native: switches are switches, tabs are tabs.",
  },
  {
    title: "Source you own",
    body: "Components copy into your project as plain files · tokens-only styling, zero runtime dependency. Change anything; nothing breaks on update because there is nothing to update.",
  },
];

export default function ComponentsIntroductionPage() {
  const categories = Array.from(new Set(COMPONENTS_REGISTRY.map((c) => c.category)));

  return (
    <main style={{ padding: "var(--space-12) clamp(var(--space-5), 5vw, var(--space-10)) var(--space-24)", maxWidth: 860, width: "100%", minWidth: 0 }}>
      {/* Breadcrumb · matches component pages */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-8)", fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>
        <span>Components</span>
        <span>›</span>
        <span style={{ color: "var(--color-fg)" }}>Introduction</span>
      </div>

      <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--color-fg)", margin: "0 0 var(--space-5)" }}>
        Components for vertical writing interfaces
      </h1>
      <p style={{ fontSize: "1.0625rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: "0 0 var(--space-8)" }}>
        The interaction primitives of a vertical interface · buttons, toggles, dialogs,
        tabs, lists · each answering a design question the horizontal web never had to.
        Real, accessible React components you copy into your project and own.
      </p>

      {/* CTA row */}
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", alignItems: "center", marginBottom: "var(--space-16)" }}>
        <Link
          href="/components/setup"
          className="btn-primary-hover"
          style={{
            display: "inline-flex", alignItems: "center",
            height: 40, padding: "0 var(--space-5)",
            fontSize: "0.9375rem", fontWeight: 500,
            borderRadius: "var(--radius-lg)",
            background: "var(--color-fg)", color: "var(--color-bg)",
          }}
        >
          Set up →
        </Link>
        <Link
          href="https://github.com/jihoons0/vertically-works"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-hover"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            height: 40, padding: "0 var(--space-5)",
            fontSize: "0.9375rem", fontWeight: 500,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border-strong)", color: "var(--color-fg)",
          }}
        >
          GitHub ↗
        </Link>
      </div>

      {/* What the system guarantees */}
      <section style={{ marginBottom: "var(--space-16)" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-6)" }}>
          What every component guarantees
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {GOALS.map((g, i) => (
            <div
              key={g.title}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "var(--space-5)",
                padding: "var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                alignItems: "start",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--color-fg-subtle)", paddingTop: 3 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-2)", letterSpacing: "-0.01em" }}>
                  {g.title}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.65 }}>
                  {g.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Component index */}
      <section>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-2)" }}>
          All components
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-8)", lineHeight: 1.65 }}>
          Every page ships a live demo, the design reasoning, accessibility notes, and the
          exact source the CLI copies.
        </p>

        {Array.from(categories).map((cat) => (
          <div key={cat} style={{ marginBottom: "var(--space-10)" }}>
            <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 var(--space-4)" }}>
              {cat}
            </h3>
            <div className="components-twoup">
              {COMPONENTS_REGISTRY.filter((c) => c.category === cat).map((c) => (
                <Link
                  key={c.slug}
                  href={`/components/${c.slug}`}
                  className="card-hover"
                  style={{
                    display: "block",
                    padding: "var(--space-5) var(--space-6)",
                    borderRadius: "var(--radius-xl)",
                    borderWidth: 1,
                    borderStyle: "solid",
                  }}
                >
                  <span style={{ display: "block", fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", marginBottom: "var(--space-2)", letterSpacing: "-0.01em" }}>
                    {c.name}
                  </span>
                  <span style={{ display: "block", fontSize: "0.8125rem", color: "var(--color-fg-muted)", lineHeight: 1.6 }}>
                    {c.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
