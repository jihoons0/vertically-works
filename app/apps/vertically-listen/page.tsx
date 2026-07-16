import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { RelatedPill } from "@/components/ui/RelatedPill";
import { WipBanner } from "@/components/apps/WipBanner";

// Cross-references rendered as badge links: ◆ component · ? challenge · ▲ principle
type Related = { label: string; href: string };

export const metadata: Metadata = {
  title: "Vertically Listen",
  description: "A podcast player rethought for the vertical, right-to-left axis, where transcripts fall as time-synced vertical verse.",
};

const FEATURES = [
  {
    title: "Hierarchy you can trace",
    description: "Shows › episodes › playing, as a breadcrumb trace with the show's artwork up top. Every crumb is live, and browsing never interrupts playback.",
    related: [
      { label: "Chapter Navigation", href: "/components/chapter-navigation" },
      { label: "Navigation rail placement", href: "/challenges#navigation-direction" },
    ],
  },
  {
    title: "A shelf of columns",
    description: "Today's top CJK shows (한국·일본·중국·대만·홍콩) stack as full-height rounded columns with status pills, flowing right→left like books on a shelf.",
    related: [
      { label: "Vertical List Cell", href: "/components/vertical-list-cell" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Transcripts as vertical verse",
    description: "Podcasting 2.0 time-synced transcripts fall as vertical columns. The active line carries the accent, auto-scrolls with playback, and seeks on tap.",
    related: [
      { label: "Verse", href: "/components/verse" },
      { label: "Marker", href: "/components/marker" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
  {
    title: "Honest text",
    description: "When a feed has no transcript, show notes appear as a labeled intro panel instead. Untimed text never pretends to be synced.",
    related: [
      { label: "Research Never Ends", href: "/principles#document-uncertainty" },
    ],
  },
  {
    title: "Full episodes, open RSS",
    description: "Episodes stream in full over each show's open RSS feed: the real audio, not previews, with a conventional player bar (±15초, previous/next, volume).",
    related: [
      { label: "Slider", href: "/components/slider" },
      { label: "Progressive Familiarity", href: "/principles#progressive-familiarity" },
    ],
  },
];

const DECISIONS = [
  {
    title: "Why do transcripts read as verse?",
    body: "A transcript is prose you follow in time. Setting each timed line as its own column makes progress legible on the page itself. The columns you have heard sit to the right, the ones still coming wait on the left, and the accent highlights the line playing now.",
    related: [
      { label: "Verse", href: "/components/verse" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Why does transport stay horizontal?",
    body: "Time controls are instruments, not text. The player bar keeps its conventional horizontal layout so muscle memory works, and the contrast marks the boundary: reading is vertical, control is horizontal.",
    related: [
      { label: "Slider", href: "/components/slider" },
      { label: "Progressive Familiarity", href: "/principles#progressive-familiarity" },
    ],
  },
  {
    title: "Why does browsing never stop playback?",
    body: "The breadcrumb trace keeps shows, episodes, and the playing state all reachable at once. In a reading interface you can look back at the shelf without losing your place · playback keeps going while you browse.",
    related: [
      { label: "Navigation rail placement", href: "/challenges#navigation-direction" },
      { label: "Interaction Before Typography", href: "/principles#interaction-first" },
    ],
  },
];

export default function VerticallyListenPage() {
  return (
    <>
      <AppHero
        title="Vertically Listen"
        description="A podcast player where transcripts fall as time-synced vertical verse."
        status="WIP"
        platform="Web"
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        {/* WIP notice · the live player returns here when it's ready */}
        <Reveal style={{ marginBottom: "var(--space-16)" }}>
          <WipBanner>
            Vertically Listen is a work in progress · it&apos;s being reworked and isn&apos;t open
            to enter yet. The live player returns here when it&apos;s ready.
          </WipBanner>
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
