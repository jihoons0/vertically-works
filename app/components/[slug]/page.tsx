import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronRight, X } from "lucide-react";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getComponent, getAllSlugs, getInstallMeta, COMPONENTS_REGISTRY } from "@/lib/components-registry";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { InstallCommand } from "@/components/ui/InstallCommand";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComponent(slug);
  if (!comp) return {};
  return {
    title: comp.name,
    description: comp.description,
  };
}

function DosDonts({ doList, dontList }: { doList: string[]; dontList: string[] }) {
  return (
    <div className="components-twoup">
      <div>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-4)" }}>
          Do
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {doList.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
              <Check size={14} strokeWidth={2.5} aria-hidden style={{ color: "#16a34a", flexShrink: 0, marginTop: 3 }} />
              <span style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.6 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-4)" }}>
          Don&apos;t
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {dontList.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
              <X size={14} strokeWidth={2.5} aria-hidden style={{ color: "#dc2626", flexShrink: 0, marginTop: 3 }} />
              <span style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.6 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  const comp = getComponent(slug);
  if (!comp) notFound();

  // Installable components show their real, shipping source · read at build
  // time (these pages are statically generated) straight from registry/.
  const installMeta = getInstallMeta(slug);
  const source = installMeta
    ? await readFile(path.join(process.cwd(), installMeta.sourceFile), "utf8")
    : null;

  const allComponents = COMPONENTS_REGISTRY;
  const currentIdx = allComponents.findIndex((c) => c.slug === slug);
  const prev = currentIdx > 0 ? allComponents[currentIdx - 1] : null;
  const next = currentIdx < allComponents.length - 1 ? allComponents[currentIdx + 1] : null;

  // The docs shell (sidebar rail + grid) comes from app/components/layout.tsx.
  return (
    <main style={{ padding: "var(--space-12) clamp(var(--space-5), 5vw, var(--space-10)) var(--space-24)", maxWidth: 860, width: "100%", minWidth: 0 }}>
        {/* Breadcrumb · the mobile component picker lives in the docs layout bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-8)", fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>
          <Link href="/components" style={{ color: "inherit" }}>Components</Link>
          <ChevronRight size={12} strokeWidth={2} aria-hidden style={{ opacity: 0.8 }} />
          <span style={{ color: "var(--color-fg)" }}>{comp.name}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "var(--space-10)" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "var(--color-fg-subtle)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "2px 8px",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--color-border)",
              marginBottom: "var(--space-4)",
            }}
          >
            {comp.category}
          </span>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--color-fg)",
              margin: "0 0 var(--space-4)",
            }}
          >
            {comp.name}
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: 0, maxWidth: "52ch" }}>
            {comp.description}
          </p>
        </div>

        {/* Install command · this component ships from the registry */}
        {installMeta && (
          <div style={{ marginBottom: "var(--space-8)" }}>
            <InstallCommand name={installMeta.installName} />
          </div>
        )}

        {/* Design question callout */}
        <div
          style={{
            padding: "var(--space-4) var(--space-6)",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border)",
            marginBottom: "var(--space-12)",
            display: "flex",
            gap: "var(--space-4)",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", paddingTop: 2, flexShrink: 0 }}>
            Design question
          </span>
          <p style={{ fontSize: "0.9375rem", color: "var(--color-fg)", margin: 0, lineHeight: 1.55, fontStyle: "italic" }}>
            {comp.problem}
          </p>
        </div>

        {/* Variants · shadcn style: demo canvas + code block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
          {comp.variants.map((variant) => (
            <div key={variant.name}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-5)" }}>
                {variant.name}
              </h2>

              {/* Demo canvas */}
              <div
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-xl)",
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--color-bg)",
                  padding: "var(--space-8)",
                  marginBottom: "var(--space-4)",
                }}
              >
                <div style={{ width: "100%" }}>
                  {variant.demo}
                </div>
              </div>

              {/* Code block */}
              <CodeBlock code={variant.code} language="tsx" />
            </div>
          ))}
        </div>

        {/* Source · the exact file `npx verticallyworks add` copies */}
        {source && installMeta && (
          <div style={{ marginTop: "var(--space-16)", paddingTop: "var(--space-12)", borderTop: "1px solid var(--color-border)" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-3)" }}>
              Source
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-5)", lineHeight: 1.65, maxWidth: "60ch" }}>
              The exact file <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>npx verticallyworks add {installMeta.installName}</code> copies
              into your project · yours to edit. Styling comes entirely from the design tokens.
            </p>
            <CodeBlock code={source.trim()} language="tsx" />
          </div>
        )}

        {/* Guidance */}
        <div style={{ marginTop: "var(--space-16)", paddingTop: "var(--space-12)", borderTop: "1px solid var(--color-border)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-8)" }}>
            Guidance
          </h2>
          <DosDonts doList={comp.doList} dontList={comp.dontList} />
        </div>

        {/* Accessibility */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-5)" }}>
            Accessibility
          </h2>
          <div
            style={{
              padding: "var(--space-5) var(--space-6)",
              borderRadius: "var(--radius-lg)",
              background: "var(--color-bg-subtle)",
              border: "1px solid var(--color-border)",
            }}
          >
            <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.7 }}>
              {comp.accessibility}
            </p>
          </div>
        </div>

        {/* Open question */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-5)" }}>
            Open Question
          </h2>
          <div
            style={{
              padding: "var(--space-5) var(--space-6)",
              borderRadius: "var(--radius-lg)",
              border: "1px dashed var(--color-border-strong)",
            }}
          >
            <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>
              {comp.openQuestion}
            </p>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div
          className="components-twoup"
          style={{
            marginTop: "var(--space-16)",
            paddingTop: "var(--space-8)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {prev ? (
            <Link
              href={`/components/${prev.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-1)",
                padding: "var(--space-5) var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                transition: "border-color var(--duration-fast)",
              }}
              className="card-hover-border"
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "var(--color-fg-subtle)" }}><ArrowLeft size={13} strokeWidth={2.25} aria-hidden /> Previous</span>
              <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)" }}>{prev.name}</span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/components/${next.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-1)",
                padding: "var(--space-5) var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                textAlign: "right",
                transition: "border-color var(--duration-fast)",
              }}
              className="card-hover-border"
            >
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: 6, fontSize: "0.75rem", color: "var(--color-fg-subtle)" }}>Next <ArrowRight size={13} strokeWidth={2.25} aria-hidden /></span>
              <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)" }}>{next.name}</span>
            </Link>
          ) : <div />}
        </div>
    </main>
  );
}
