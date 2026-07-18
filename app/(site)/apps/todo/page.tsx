import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { RelatedPill } from "@/components/ui/RelatedPill";
import { AppVideo } from "@/components/home/AppVideo";
import { runningAppUrl } from "@/lib/appUrls";

// Cross-references rendered as badge links: ◆ component · ? challenge · ▲ principle
type Related = { label: string; href: string };

export const metadata: Metadata = {
  title: "Vertically To-do",
  description: "A to-do list rethought for the vertical, right-to-left axis · tasks are columns you read top to bottom.",
};

const FEATURES = [
  {
    title: "Tasks are columns",
    description: "Every task is a full-height column read top→bottom, stacking right→left with the newest at the reading start. The list scrolls on the column axis, like a page of writing.",
    related: [
      { label: "Vertical List Cell", href: "/components/vertical-list-cell" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Pull down to delete",
    description: "Drag a column down · past the end of its own text · and a trashcan opens behind it in the vacated slot.",
    related: [
      { label: "Motion direction", href: "/challenges#motion-direction" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
  {
    title: "Orthogonal drag axes",
    description: "Vertical deletes, horizontal reorders. Direction alone disambiguates intent, so there are no long-press modes to discover.",
    related: [
      { label: "Drag-and-drop reorder", href: "/challenges#drag-reorder" },
      { label: "Interaction Before Typography", href: "/principles#interaction-first" },
    ],
  },
  {
    title: "Vertical text input",
    description: "Composing a task happens in a contentEditable vertical column that stays column-centered as you type · writing and reading share one axis.",
    related: [
      { label: "Text Field", href: "/components/text-field" },
      { label: "Vertical IME", href: "/challenges#ime-vertical" },
    ],
  },
  {
    title: "한 / あ / 中",
    description: "One toggle re-localizes the entire interface across Korean, Japanese, and Chinese · the same interface logic expressed in three vertical scripts.",
    related: [
      { label: "Mixed Language First", href: "/principles#mixed-first" },
    ],
  },
];

const DECISIONS = [
  {
    title: "Why are tasks full-height columns?",
    body: "A to-do is a written line, and in vertical writing a line is a column. Giving every task the full column height keeps the page's rhythm · the list reads like text, not like a table of rows rotated sideways.",
    related: [
      { label: "Vertical List Cell", href: "/components/vertical-list-cell" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Why does pulling down delete?",
    body: "Down is the reading axis · dragging a column past its own end carries it out of the flow. The trashcan appearing behind the card, in the slot the column vacated, gives the gesture a visible target instead of an invisible threshold.",
    related: [
      { label: "Motion direction", href: "/challenges#motion-direction" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
  {
    title: "Why split the drag axes?",
    body: "With two orthogonal axes, direction alone carries intent · vertical removes from the flow, horizontal rearranges it. No modes, no delays · the drag's first direction sets whether it removes or reorders.",
    related: [
      { label: "Drag-and-drop reorder", href: "/challenges#drag-reorder" },
      { label: "Interaction Before Typography", href: "/principles#interaction-first" },
    ],
  },
];

export default function VerticallyDoPage() {
  return (
    <>
      <AppHero
        title="Vertically To-do"
        description="A to-do list where every task is a column you read top to bottom."
        status="Live"
        platform="Web"
        aside={
          <div>
            {/* Small utility heading · sans, not display type */}
            <h2 style={{ fontFamily: "var(--font-site-sans)", fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-fg)", margin: "0 0 var(--space-4)", lineHeight: 1.3 }}>
              Try this
            </h2>
            <Link
              href={runningAppUrl("todo")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-hover"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 var(--space-5)",
                fontSize: "0.9375rem", fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                background: "var(--color-fg)", color: "var(--color-bg)",
              }}
            >
              Open full screen
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
            </Link>
          </div>
        }
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        {/* In motion · the recorded gestures, beside what they mean */}
        <Reveal>
          <div className="app-detail-lead" style={{ marginBottom: "var(--space-20)" }}>
            <div
              style={{
                borderRadius: "var(--radius-xl)",
                // Thick light-gray outer frame · reads as a bezel around the recording
                border: "4px solid var(--color-border)",
                overflow: "hidden",
                background: "var(--color-bg-muted)",
                alignSelf: "start",
              }}
            >
              <div style={{ aspectRatio: "1294 / 1484" }}>
                <AppVideo
                  src="/videos/vertically-notes.mp4"
                  poster="/images/apps/notes-poster.jpg"
                  label="Vertically To-do demo · adding, reordering, and deleting vertical task columns"
                />
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-4)", lineHeight: 1.15 }}>
                In motion
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: "0 0 var(--space-5)", maxWidth: "52ch" }}>
                Half a minute of the real gestures: a task written in vertical text, a
                column pulled down into the trashcan that opens behind it, another dragged
                sideways to reorder, and the whole interface flipped across 한 / あ / 中.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: 0, maxWidth: "52ch" }}>
                Everything in the recording is the live app above · try the same moves
                yourself.
              </p>
            </div>
          </div>
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
                <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-4)", lineHeight: 1.65 }}>
                  {f.description}
                </p>
                {/* Cross-references · the components/challenges/principles this feature exercises */}
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                  {(f.related as Related[]).map((r) => (
                    <RelatedPill key={r.label} label={r.label} href={r.href} />
                  ))}
                </div>
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
                <div>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-4)", lineHeight: 1.65 }}>
                    {d.body}
                  </p>
                  <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                    {(d.related as Related[]).map((r) => (
                      <RelatedPill key={r.label} label={r.label} href={r.href} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Open the app */}
        <div
          style={{
            padding: "var(--space-6) var(--space-8)",
            borderRadius: "var(--radius-xl)",
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
            <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0 }}>The app owns the full viewport at todo.vertically.works. Your list is saved locally on this device.</p>
          </div>
          <Link
            href={runningAppUrl("todo")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-hover pressable"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              height: 40,
              padding: "0 var(--space-5)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              borderRadius: "var(--radius-lg)",
              border: "none",
              color: "var(--color-fg)",
              flexShrink: 0,
            }}
          >
            Open Vertically To-do <ArrowRight size={15} strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </div>
    </>
  );
}
