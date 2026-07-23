import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InstallBanner } from "@/components/ui/InstallBanner";
import { RelatedPill } from "@/components/ui/RelatedPill";

export const metadata: Metadata = {
  title: "Principles",
  description: "Guidance from observation. Patterns derived from building real interfaces on the vertical axis.",
};

const PRINCIPLES = [
  {
    id: "reading-flow",
    number: "01",
    title: "Respect Reading Flow",
    description: "Reading direction sets expectations. Reinforce them and the interface feels natural; fight them and it feels disorienting, even when the user cannot say why.",
    detail: "Motion, navigation, hierarchy, layout, spacing: every layer answers to how the reader scans. Turn the page vertical and 'up' and 'down' change meaning, and 'left' and 'right' carry weight they never had horizontally.",
    related: [
      { label: "Vertical List Cell", href: "/components/vertical-list-cell" },
      { label: "Tiered Page", href: "/components/tiered-page" },
      { label: "Vertically Verse", href: "/apps/verse" },
    ],
  },
  {
    id: "motion-meaning",
    number: "02",
    title: "Motion Has Meaning",
    description: "Every animation says something. On the vertical axis, direction, duration, and easing answer to the reading direction, not to horizontal habit.",
    detail: "In an RTL interface, a drawer from the right edge travels toward the reader's origin and feels like an intrusion. The same drawer from below crosses an orthogonal axis and feels like a new layer. Neither is right by default; you choose one on purpose.",
    related: [
      { label: "Sheet", href: "/components/sheet" },
      { label: "Dialog", href: "/components/dialog" },
      { label: "Toast", href: "/components/toast" },
    ],
  },
  {
    id: "interaction-first",
    number: "03",
    title: "Interaction Before Typography",
    description: "A vertical interface exists to make behavior match how you read. Typography serves that behavior; it is not the goal.",
    detail: "The common mistake is treating vertical text as a typographic exercise, rotating components or applying writing-mode for effect. The test is not 'does this look like a vertical book?' but 'does it behave like one?'",
    related: [
      { label: "Button", href: "/components/button" },
      { label: "Toggle", href: "/components/toggle" },
      { label: "Slider", href: "/components/slider" },
    ],
  },
  {
    id: "mixed-first",
    number: "04",
    title: "Mixed Language First",
    description: "Real CJK content is never pure. Han, kana, hangul, Latin numerals, Roman punctuation, and URL-like strings share the column. Design for the mixture from day one.",
    detail: "Design for pure CJK and the system breaks on contact. References, dates, measurements, code, and proper nouns show up in any real document, and each character class needs its orientation set at the token level.",
    related: [
      { label: "Verse", href: "/components/verse" },
      { label: "Text Field", href: "/components/text-field" },
      { label: "Typography Rules", href: "/resources" },
    ],
  },
  {
    id: "accessibility",
    number: "05",
    title: "Accessibility Is Fundamental",
    description: "Vertical interfaces raise accessibility problems horizontal design systems never faced. Solve them from the start.",
    detail: "Arrow keys change meaning. Screen-reader order follows column order. Reduced motion has to account for directional animation, and focus has to traverse RTL columns.",
    related: [
      { label: "Tabs", href: "/components/tabs" },
      { label: "Dialog", href: "/components/dialog" },
      { label: "Popover Menu", href: "/components/popover-menu" },
    ],
  },
  {
    id: "progressive-familiarity",
    number: "06",
    title: "Progressive Familiarity",
    description: "Vertical interaction is new to most digital users, even ones who read vertically in print. Give them a ramp.",
    detail: "A sudden full-vertical interface disorients. Introduce it in stages: familiar patterns in the navigation chrome first, deeper vertical commitment in the content, then the gestures.",
    related: [
      { label: "Vertically To-do", href: "/apps/todo" },
      { label: "Vertically Verse", href: "/apps/verse" },
    ],
  },
  {
    id: "document-uncertainty",
    number: "07",
    title: "Research Never Ends",
    description: "Most questions in vertical interface design do not have correct answers yet. Document what is unknown as carefully as what is known.",
    detail: "Treating open questions as closed produces brittle design systems. The strongest vertical-interface decisions come from an explicit model of what is known and what is still a hypothesis.",
    related: [
      { label: "Challenges", href: "/challenges" },
      { label: "Components", href: "/components" },
    ],
  },
];

export default function PrinciplesPage() {
  return (
    <>
      <PageHeader title="Guidance from Observation" titleWide />

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
          // Static content, not a link (no detail routes exist) · related pills below jump out
          <div key={p.id} id={p.id} className="doc-card">
            <span className="doc-card-number">{p.number}</span>

            <div>
              <h2 className="doc-card-title">{p.title}</h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-4)", lineHeight: 1.65, maxWidth: "60ch" }}>
                {p.description}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--color-fg-subtle)", margin: "0 0 var(--space-4)", lineHeight: 1.65, maxWidth: "58ch" }}>
                {p.detail}
              </p>
              {/* Where the principle is practiced · same jumping points as /challenges */}
              <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                {p.related.map((r) => (
                  <RelatedPill key={r.label} label={r.label} href={r.href} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <InstallBanner />
    </>
  );
}
