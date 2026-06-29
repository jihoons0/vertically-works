import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Principles",
  description: "Guidance from observation. Patterns derived from building real interfaces on the vertical axis.",
};

const PRINCIPLES = [
  {
    id: "reading-flow",
    number: "01",
    title: "Respect Reading Flow",
    description: "Reading direction creates expectations. Interfaces that reinforce those expectations feel natural; interfaces that oppose them feel disorienting, even when the user cannot articulate why.",
    detail: "Motion, navigation, hierarchy, layout, spacing — every layer of interface design is affected by how the reader scans. In a vertical interface, 'up' and 'down' have different meanings. 'Left' and 'right' carry semantic weight they do not carry in horizontal UIs.",
  },
  {
    id: "motion-meaning",
    number: "02",
    title: "Motion Has Meaning",
    description: "Every animation communicates something. In a vertical interface, the direction, duration, and easing of motion must be calibrated to the reading axis, not imported from horizontal conventions.",
    detail: "A drawer that slides from the right edge of an RTL reading interface travels toward the reader's origin — which feels like an intrusion. The same drawer sliding from below follows an orthogonal axis — which feels like a new layer. Neither is inherently correct; the choice must be deliberate.",
  },
  {
    id: "interaction-first",
    number: "03",
    title: "Interaction Before Typography",
    description: "The purpose of a vertical interface is not beautiful text. It is behavior that matches how people read. Typography enables interaction; it is not the goal.",
    detail: "A common mistake is to treat vertical text as a typographic exercise — rotating existing components or applying writing-mode to achieve aesthetic effect. The question is not 'does this look like a vertical book?' but 'does this behave like one?'",
  },
  {
    id: "mixed-first",
    number: "04",
    title: "Mixed Language First",
    description: "Real CJK content always contains mixed scripts — han characters, kana, hangul, Latin numerals, Roman punctuation, and URL-like strings. Design for this mixture from day one.",
    detail: "Designing for pure CJK text produces a brittle system. Verse references, dates, measurements, code snippets, and proper nouns will appear in any real document. Each character class needs correct orientation defined at the token level.",
  },
  {
    id: "accessibility",
    number: "05",
    title: "Accessibility Is Fundamental",
    description: "Vertical interfaces introduce unique accessibility challenges that horizontal design systems never considered. Solve them from the beginning.",
    detail: "Arrow key semantics change. Screen reader reading order depends on column order. Reduced motion must account for the directional nature of vertical animations. Focus management must traverse RTL column order correctly.",
  },
  {
    id: "progressive-familiarity",
    number: "06",
    title: "Progressive Familiarity",
    description: "Users who are new to vertical interfaces need a ramp. Vertical interaction is unfamiliar to most digital users, even those who read vertically in print.",
    detail: "A sudden full-vertical interface is disorienting. The best approach is progressive introduction — starting with familiar patterns in the navigation chrome, then deepening the vertical commitment in the content area, then finally in gesture interactions.",
  },
  {
    id: "document-uncertainty",
    number: "07",
    title: "Research Never Ends",
    description: "Most questions in vertical interface design do not have correct answers yet. Document what is unknown as carefully as what is known.",
    detail: "Treating open questions as closed produces brittle design systems. The best vertical interface decisions are made with an explicit model of what is known and what remains a hypothesis.",
  },
];

export default function PrinciplesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Principles"
        title="Guidance from Observation"
        description="Not opinions. Patterns derived from building real interfaces on the vertical axis. Each one emerged from a specific design problem."
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-24)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        {PRINCIPLES.map((p) => (
          <Link
            key={p.id}
            href={`/principles/${p.id}`}
            className="card-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "56px 1fr",
              gap: "var(--space-8)",
              padding: "var(--space-8)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid",
              alignItems: "start",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-border-strong)",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                paddingTop: 4,
              }}
            >
              {p.number}
            </span>

            <div>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-3)", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                {p.title}
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-4)", lineHeight: 1.65, maxWidth: "60ch" }}>
                {p.description}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--color-fg-subtle)", margin: 0, lineHeight: 1.65, maxWidth: "58ch" }}>
                {p.detail}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
