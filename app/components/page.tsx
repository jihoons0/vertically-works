import Link from "next/link";
import type { Metadata } from "next";
import { COMPONENTS_REGISTRY, getInstallMeta } from "@/lib/components-registry";
import { InstallCommand } from "@/components/ui/InstallCommand";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Real, accessible React components for vertical writing interfaces — copy them into your project with the verticallyworks CLI.",
};

const GITHUB = "https://github.com/jihoons0/vertically-works";

export default function ComponentsPage() {
  const categories = Array.from(new Set(COMPONENTS_REGISTRY.map((c) => c.category)));
  const installable = COMPONENTS_REGISTRY.filter((c) => getInstallMeta(c.slug)).length;

  return (
    <>
      {/* ── The component home: why components matter + how to install ── */}
      <section style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-subtle)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 6vw, 80px) var(--space-6)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 var(--space-3)" }}>
            Design System
          </p>
          <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--color-fg)", margin: "0 0 var(--space-5)" }}>
            Components
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: "0 0 var(--space-4)", maxWidth: "62ch" }}>
            A horizontal button rotated 90° is not a vertical button. Every primitive here
            answers a question the horizontal web never had to: where a label sits on the
            reading axis, which direction a tooltip opens, how a list stacks as columns, how
            a dialog reads top-to-bottom, right-to-left. Get these decisions wrong and a
            vertical interface feels translated; get them right and it feels native.
          </p>
          <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: "0 0 var(--space-8)", maxWidth: "62ch" }}>
            Each component ships with its design question, an interactive demo, do/don&apos;t
            guidance, accessibility notes, and the real source. {installable} of them install
            as copy-in React components — you own the code, styled entirely through design
            tokens, with zero runtime dependency.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <InstallCommand command="npx verticallyworks init" />
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="link-muted-hover"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.875rem", fontWeight: 500, color: "var(--color-fg-muted)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Gallery, grouped by category ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(40px, 6vw, 72px) var(--space-6) var(--space-24)" }}>
        {categories.map((cat) => (
          <section key={cat} style={{ marginBottom: "var(--space-16)" }}>
            <h2 style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 var(--space-5)" }}>
              {cat}
            </h2>
            <div className="components-gallery">
              {COMPONENTS_REGISTRY.filter((c) => c.category === cat).map((c) => {
                const meta = getInstallMeta(c.slug);
                return (
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
                      minHeight: 0,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>{c.name}</span>
                      {meta && (
                        <span style={{ fontSize: "0.625rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "1px 6px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border-strong)" }}>
                          Installable
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", lineHeight: 1.6, margin: 0 }}>
                      {c.description}
                    </p>
                    {meta && (
                      <code style={{ marginTop: "var(--space-2)", fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--color-fg-subtle)", overflowX: "auto", whiteSpace: "nowrap" }}>
                        npx verticallyworks add {meta.installName}
                      </code>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
