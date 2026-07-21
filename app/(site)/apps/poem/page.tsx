import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { RelatedPill } from "@/components/ui/RelatedPill";
import { WipBanner } from "@/components/apps/WipBanner";
import { NotifyForm } from "@/components/apps/NotifyForm";

// Cross-references rendered as badge links: ◆ component · ? challenge · ▲ principle
type Related = { label: string; href: string };

export const metadata: Metadata = {
  title: "Vertically Poem",
  description:
    "A reader and composer for East Asian poetry set the traditional way — fully vertical and right to left, where each poem materializes and dissipates through an ink dissolve.",
};

const FEATURES = [
  {
    title: "A feed that breathes",
    description:
      "The home is the reader: one classic at a time on warm washi. Drag to move through the corpus and the current poem dissipates as the next materializes — the dissolve is the transition itself, not decoration.",
    related: [
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
      { label: "Sheet direction", href: "/challenges#motion-direction" },
    ],
  },
  {
    title: "Set the traditional way",
    description:
      "Each line is a top→bottom column, columns read right→left. Long sijo lines wrap into further columns with kinsoku (금칙) rather than overflowing — the same VerticallyKit engine the other apps share.",
    related: [
      { label: "Verse", href: "/components/verse" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Ink that disperses",
    description:
      "A Metal shader dissolves the poem glyph by glyph, staggered in reading order, so characters rise and settle one at a time. Dark ink dispersing on warm paper reads as sumi-e; reduced motion degrades to a staggered cross-fade.",
    related: [
      { label: "Marker", href: "/components/marker" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
  {
    title: "Every poem its own color",
    description:
      "As you move through the feed the paper and ink recolor — warm papers with dark ink, deep grounds with luminous text, saturated fields with monotone type. The paper crossfades on the dissolve's clock, and every scheme is contrast-validated for legibility.",
    related: [
      { label: "Progressive Familiarity", href: "/principles#progressive-familiarity" },
    ],
  },
  {
    title: "A composer that counts",
    description:
      "Write your own with a live vertical preview and a form-aware counter — pips fill toward 5·7·5 for haiku, the tanka and sijo and hanshi targets for the rest — guiding gently, with a light haptic as a line reaches its shape.",
    related: [
      { label: "Interaction Before Typography", href: "/principles#interaction-first" },
      { label: "Mixed-language columns", href: "/challenges#mixed-language" },
    ],
  },
];

const DECISIONS = [
  {
    title: "Why is the dissolve the transition?",
    body: "A page slide would treat the poem as a card to shuffle. Dissipating the current poem while the next materializes in the same place keeps the reading axis still — the motion carries meaning (a poem forming, a poem passing) instead of moving a rectangle. Because it tracks the finger 1:1, the gesture and the dissolve are one thing.",
    related: [
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
      { label: "Sheet direction", href: "/challenges#motion-direction" },
    ],
  },
  {
    title: "Why is composing manual, with no AI yet?",
    body: "The counter validates form, so the writer stays the author. A UI seam is reserved for a later muse — seed a line, complete the form, critique — but the free, offline core is a place to compose your own, not to accept a machine's. The count is the honest signal that a line has reached its shape.",
    related: [
      { label: "Interaction Before Typography", href: "/principles#interaction-first" },
      { label: "Progressive Familiarity", href: "/principles#progressive-familiarity" },
    ],
  },
  {
    title: "Why does each poem get its own color?",
    body: "Short-form poetry lives on negative space, and a feed of identical paper flattens that. Recoloring per poem — and crossfading the paper on the same clock as the ink — makes each move feel like a fresh page while keeping the surface calm. Curation buys the aesthetics; a WCAG contrast check buys the legibility, in either polarity.",
    related: [
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
];

export default function VerticallyPoemPage() {
  return (
    <>
      <AppHero
        title="Vertically Poem"
        description="A reader and composer for East Asian poetry, where each poem materializes and dissipates through an ink dissolve."
        status="WIP"
        platform="iOS"
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        {/* WIP notice · the live reader returns here when it's ready */}
        <Reveal style={{ marginBottom: "var(--space-6)" }}>
          <WipBanner>
            Vertically Poem is a work in progress · it&apos;s still being built and isn&apos;t open
            to enter yet. The reader returns here when it&apos;s ready.
          </WipBanner>
        </Reveal>
        <Reveal style={{ marginBottom: "var(--space-16)" }}>
          <NotifyForm app="Vertically Poem" />
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

      </div>
    </>
  );
}
