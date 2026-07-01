import type { Metadata } from "next";
import Link from "next/link";
import { COMPONENTS_REGISTRY } from "@/lib/components-registry";

export const metadata: Metadata = {
  title: "Components",
  description: "Reusable interaction primitives for vertical interfaces. Each one answers a design question.",
};

const CATEGORIES = Array.from(new Set(COMPONENTS_REGISTRY.map((c) => c.category)));

export default function ComponentsPage() {
  const featured = COMPONENTS_REGISTRY.filter((c) => c.status === "built");
  const comingSoon = COMPONENTS_REGISTRY.filter((c) => c.status === "coming-soon");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "calc(100dvh - 56px)", alignItems: "start" }}>

      {/* ── Sidebar ── */}
      <aside style={{ position: "sticky", top: 56, height: "calc(100dvh - 56px)", overflowY: "auto", borderRight: "1px solid var(--color-border)", padding: "var(--space-6) 0" }}>
        <div style={{ padding: "0 var(--space-6)", marginBottom: "var(--space-5)" }}>
          <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Components
          </span>
        </div>
        {CATEGORIES.map((cat) => (
          <div key={cat} style={{ marginBottom: "var(--space-5)" }}>
            <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 var(--space-6)", marginBottom: "var(--space-2)" }}>
              {cat}
            </div>
            {COMPONENTS_REGISTRY.filter((c) => c.category === cat).map((c) => (
              <Link
                key={c.slug}
                href={`/components/${c.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-2) var(--space-6)",
                  fontSize: "0.875rem",
                  color: "var(--color-fg-muted)",
                  transition: "color 100ms ease, background 100ms ease",
                }}
                className="sidebar-link"
              >
                <span>{c.name}</span>
                {c.status === "built" && (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                )}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      {/* ── Main content ── */}
      <main style={{ padding: "var(--space-12) var(--space-10) var(--space-24)" }}>
        {/* Header */}
        <div style={{ marginBottom: "var(--space-12)", paddingBottom: "var(--space-10)", borderBottom: "1px solid var(--color-border)" }}>
          <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-4)" }}>
            Components
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.08, color: "var(--color-fg)", margin: "0 0 var(--space-5)" }}>
            Interaction Primitives
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "var(--color-fg-muted)", lineHeight: 1.65, maxWidth: "52ch", margin: 0 }}>
            Reusable components built for vertical interfaces. Each one documents a specific design question, interactive demo, Do/Don&apos;t guidance, and open research questions.
          </p>
          <div style={{ display: "flex", gap: "var(--space-5)", marginTop: "var(--space-6)", fontSize: "0.875rem", color: "var(--color-fg-subtle)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              {featured.length} built
            </span>
            {comingSoon.length > 0 && <span>{comingSoon.length} coming soon</span>}
            <span>{COMPONENTS_REGISTRY.length} total</span>
          </div>
        </div>

        {/* Featured — built with demos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)", marginBottom: "var(--space-20)" }}>
          {featured.map((comp) => {
            const demo = comp.variants[0]?.demo;
            return (
              <section key={comp.slug} id={comp.slug}>
                {/* Component header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "var(--space-6)", gap: "var(--space-4)" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
                      <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "2px 8px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)" }}>
                        {comp.category}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.6875rem", color: "#16a34a", fontWeight: 500 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                        Built
                      </span>
                    </div>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-2)" }}>
                      {comp.name}
                    </h2>
                    <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-3)", lineHeight: 1.6, maxWidth: "54ch" }}>
                      {comp.description}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-fg-subtle)", margin: 0, fontStyle: "italic" }}>
                      {comp.problem}
                    </p>
                  </div>
                  <Link
                    href={`/components/${comp.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      height: 34,
                      padding: "0 var(--space-4)",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-fg-muted)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                    className="card-hover-border"
                  >
                    Full docs →
                  </Link>
                </div>

                {/* Demo */}
                <div style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-xl)",
                  minHeight: 280,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--color-bg)",
                  padding: "var(--space-8)",
                }}>
                  <div style={{ width: "100%" }}>
                    {demo ?? (
                      <div style={{ textAlign: "center", color: "var(--color-fg-subtle)", fontSize: "0.875rem" }}>
                        Demo loading…
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Coming soon grid */}
        {comingSoon.length > 0 && (
        <div style={{ paddingTop: "var(--space-12)", borderTop: "1px solid var(--color-border)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-3)" }}>
            Coming Soon
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-8)" }}>
            {comingSoon.length} more components planned. Each will include a full interactive demo and documentation.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--space-3)" }}>
            {comingSoon.map((c) => (
              <Link
                key={c.slug}
                href={`/components/${c.slug}`}
                className="card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-2)",
                  padding: "var(--space-5) var(--space-6)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.01em" }}>
                    {c.name}
                  </h3>
                  <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", padding: "1px 7px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {c.category}
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>
                  {c.problem}
                </p>
              </Link>
            ))}
          </div>
        </div>
        )}
      </main>

      <style>{`
        .sidebar-link:hover {
          color: var(--color-fg) !important;
          background: var(--color-bg-muted);
        }
      `}</style>
    </div>
  );
}
