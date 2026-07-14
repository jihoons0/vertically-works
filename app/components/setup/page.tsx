import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { InstallCommand } from "@/components/ui/InstallCommand";

export const metadata: Metadata = {
  title: "Components · Set up",
  description:
    "Install the Vertically Works tokens and components with npx verticallyworks · one command for the tokens, one per component.",
};

const IMPORT_CSS = `/* app/globals.css */
@import "tailwindcss";
@import "./components/vw/tokens.css";`;

const IMPORT_JS = `// app/layout.tsx (or your root layout)
import "@/components/vw/tokens.css";`;

const USE_IT = `import { VerticalButton } from "@/components/vw/vertical-button";

export function NextChapter() {
  return <VerticalButton variant="primary">다음 장</VerticalButton>;
}`;

const THEMES = `<!-- light is the default · set the attribute to switch -->
<html data-theme="dark">   <!-- or "sepia" -->`;

const SHADCN = `npx shadcn add https://vertically.works/r/vertical-button.json`;

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "var(--space-12)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
        <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--color-fg-subtle)" }}>
          {String(n).padStart(2, "0")}
        </span>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: 0 }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function SetupPage() {
  return (
    <main style={{ padding: "var(--space-12) clamp(var(--space-5), 5vw, var(--space-10)) var(--space-24)", maxWidth: 860, width: "100%", minWidth: 0 }}>
      {/* Breadcrumb · matches component pages */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-8)", fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>
        <Link href="/components" style={{ color: "inherit" }}>Components</Link>
        <ChevronRight size={12} strokeWidth={2} aria-hidden style={{ opacity: 0.8 }} />
        <span style={{ color: "var(--color-fg)" }}>Set up</span>
      </div>

      <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--color-fg)", margin: "0 0 var(--space-5)" }}>
        Set up
      </h1>
      <p style={{ fontSize: "1.0625rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: "0 0 var(--space-12)" }}>
        Two commands and an import. The CLI copies real source files into your project ·
        there is no package to keep updated, and everything is styled by the token file
        you install once. Node 18+, React, any bundler.
      </p>

      <Step n={1} title="Install the design tokens">
        <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: "0 0 var(--space-4)" }}>
          Run once per project. This writes <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>components/vw/tokens.css</code> ·
          semantic colors with light, dark, and sepia themes, spacing, radius, motion
          tokens, and the vertical-writing utilities every component relies on.
        </p>
        <InstallCommand command="npx verticallyworks init" />
      </Step>

      <Step n={2} title="Import the tokens once, globally">
        <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: "0 0 var(--space-4)" }}>
          In CSS (after Tailwind, if you use it) · or from your root layout. Either works;
          pick one.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <CodeBlock code={IMPORT_CSS} language="css" />
          <CodeBlock code={IMPORT_JS} language="tsx" />
        </div>
      </Step>

      <Step n={3} title="Add components">
        <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: "0 0 var(--space-4)" }}>
          Each command copies that component&apos;s source into{" "}
          <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>components/vw/</code>.
          See everything available with <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>npx verticallyworks list</code>.
        </p>
        <InstallCommand command="npx verticallyworks add vertical-button" />
      </Step>

      <Step n={4} title="Use it">
        <CodeBlock code={USE_IT} language="tsx" />
      </Step>

      <Step n={5} title="Themes">
        <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: "0 0 var(--space-4)" }}>
          The tokens ship three themes. Set{" "}
          <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>data-theme</code> on{" "}
          <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>&lt;html&gt;</code> ·
          or scope it to any subtree to theme just that region.
        </p>
        <CodeBlock code={THEMES} language="html" />
      </Step>

      <Step n={6} title="Using shadcn? That works too">
        <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: "0 0 var(--space-4)" }}>
          The registry speaks shadcn&apos;s format, so the shadcn CLI can install any
          component by URL · dependencies included.
        </p>
        <CodeBlock code={SHADCN} language="bash" />
      </Step>

      {/* Where the source lives */}
      <div
        style={{
          padding: "var(--space-6) var(--space-8)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "var(--space-4)",
        }}
      >
        <div>
          <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-fg)", margin: "0 0 var(--space-1)" }}>
            Everything is open source
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0 }}>
            The registry, the CLI, and this site live in one repository.
          </p>
        </div>
        <Link
          href="https://github.com/jihoons0/vertically-works"
          target="_blank"
          rel="noopener noreferrer"
          className="card-hover-border"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            height: 36,
            padding: "0 var(--space-4)",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border-strong)",
            color: "var(--color-fg)",
          }}
        >
          github.com/jihoons0/vertically-works
          <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden />
        </Link>
      </div>
    </main>
  );
}
