import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { AppEmbed } from "@/components/apps/AppEmbed";

export const metadata: Metadata = {
  title: "Vertically Notes",
  description: "A to-do list rethought for the vertical, right-to-left axis · tasks are columns you read top to bottom.",
};

const FEATURES = [
  {
    title: "Tasks are columns",
    description: "Every task is a full-height column read top→bottom, stacking right→left with the newest at the reading start. The list scrolls on the column axis, like a page of writing.",
  },
  {
    title: "Pull down to delete",
    description: "Drag a column down · past the end of its own text · and a trashcan opens behind it in the vacated slot. The gesture continues the reading direction to its conclusion.",
  },
  {
    title: "Orthogonal drag axes",
    description: "Vertical deletes, horizontal reorders. Direction alone disambiguates intent, so there are no long-press modes to discover.",
  },
  {
    title: "Vertical text input",
    description: "Composing a task happens in a contentEditable vertical column that stays column-centered as you type · writing and reading share one axis.",
  },
  {
    title: "한 / あ / 中",
    description: "One toggle re-localizes the entire interface across Korean, Japanese, and Chinese · the same interface logic expressed in three vertical scripts.",
  },
];

const DECISIONS = [
  {
    title: "Why are tasks full-height columns?",
    body: "A to-do is a written line, and in vertical writing a line is a column. Giving every task the full column height keeps the page's rhythm · the list reads like text, not like a table of rows rotated sideways.",
  },
  {
    title: "Why does pulling down delete?",
    body: "Down is the reading axis: pulling a column past its own end reads it out of the flow. The trashcan appearing behind the card, in the slot the column vacated, gives the gesture a visible target instead of an invisible threshold.",
  },
  {
    title: "Why split the drag axes?",
    body: "With two orthogonal axes, direction alone carries intent · vertical removes from the flow, horizontal rearranges it. No modes, no delays: the first few pixels of movement declare what the gesture means.",
  },
];

export default function VerticallyDoPage() {
  return (
    <>
      <AppHero
        title="Vertically Notes"
        status="Live"
        platform="Web"
        meta="한국어 · 日本語 · 中文"
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        {/* Core visual · the real app, running in the page */}
        <Reveal style={{ marginBottom: "var(--space-20)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
                Try it · this is the live app
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: 0, maxWidth: "56ch" }}>
                Add a task, drag a column down to delete it, sideways to reorder, and flip
                the interface across 한 / あ / 中. Your list persists locally.
              </p>
            </div>
            <Link
              href="/apps/notes"
              className="btn-cta-hover pressable"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 var(--space-5)",
                fontSize: "0.9375rem", fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                border: "1px solid", color: "var(--color-fg)",
                flexShrink: 0,
              }}
            >
              Open full screen ↗
            </Link>
          </div>
          <AppEmbed src="/apps/notes" title="Vertically Notes · live to-do app" height={560} />
        </Reveal>

        {/* Features */}
        <section style={{ marginBottom: "var(--space-16)" }}>
          <Reveal>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-8)" }}>
              Features
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-4)" }}>
            {FEATURES.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 40}
                style={{
                  padding: "var(--space-6)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                }}
              >
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-3)", letterSpacing: "-0.01em" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.65 }}>
                  {f.description}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Design decisions */}
        <section style={{ marginBottom: "var(--space-16)" }}>
          <Reveal>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-8)" }}>
              Design Decisions
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {DECISIONS.map((d, i) => (
              <Reveal
                key={d.title}
                delay={i * 50}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "var(--space-8)",
                  padding: "var(--space-6) var(--space-8)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                }}
              >
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.45 }}>
                  {d.title}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.65 }}>
                  {d.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Open the app */}
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
            <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-fg)", margin: "0 0 var(--space-1)" }}>Use it in the browser</p>
            <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0 }}>The app owns the full viewport at /apps/notes. Your list is saved locally on this device.</p>
          </div>
          <Link
            href="/apps/notes"
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
              border: "1px solid",
              color: "var(--color-fg)",
              background: "transparent",
              flexShrink: 0,
            }}
          >
            Open Vertically Notes →
          </Link>
        </div>
      </div>
    </>
  );
}
