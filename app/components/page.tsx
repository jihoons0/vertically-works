import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { COMPONENTS_REGISTRY } from "@/lib/components-registry";
import { InstallBanner } from "@/components/ui/InstallBanner";

export const metadata: Metadata = {
  title: "Components · Introduction",
  description:
    "The component system for vertical writing interfaces: real writing-mode primitives, accessible by default, source you own.",
};

export default function ComponentsIntroductionPage() {
  const categories = Array.from(new Set(COMPONENTS_REGISTRY.map((c) => c.category)));

  return (
    <main style={{ padding: "var(--space-12) clamp(var(--space-5), 5vw, var(--space-10)) var(--space-24)", maxWidth: 860, width: "100%", minWidth: 0 }}>
      {/* Breadcrumb · desktop-only (.components-breadcrumb); the mobile picker names the page */}
      <div className="components-breadcrumb">
        <span>Components</span>
        <ChevronRight size={12} strokeWidth={2} aria-hidden style={{ opacity: 0.8 }} />
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
            display: "inline-flex", alignItems: "center", gap: 8,
            height: 40, padding: "0 var(--space-5)",
            fontSize: "0.9375rem", fontWeight: 500,
            borderRadius: "var(--radius-lg)",
            background: "var(--color-fg)", color: "var(--color-bg)",
          }}
        >
          Set up
          <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
          <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden />
        </Link>
      </div>

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

      <InstallBanner />
    </main>
  );
}
