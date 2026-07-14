import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { WipBanner } from "@/components/apps/WipBanner";

export const metadata: Metadata = {
  title: "Vertically Listen",
  description: "A podcast player rethought for the vertical, right-to-left axis, where transcripts fall as time-synced vertical verse.",
};

const FEATURES = [
  {
    title: "Hierarchy you can trace",
    description: "Shows › episodes › playing, as a breadcrumb trace with the show's artwork up top. Every crumb is live, and browsing never interrupts playback.",
  },
  {
    title: "A shelf of columns",
    description: "Today's top CJK shows (한국·일본·중국·대만·홍콩) stack as full-height rounded columns with status pills, flowing right→left like books on a shelf.",
  },
  {
    title: "Transcripts as vertical verse",
    description: "Podcasting 2.0 time-synced transcripts fall as vertical columns. The active line carries the accent, auto-scrolls with playback, and seeks on tap.",
  },
  {
    title: "Honest text",
    description: "When a feed has no transcript, show notes appear as a labeled intro panel instead. Untimed text never pretends to be synced.",
  },
  {
    title: "Full episodes, open RSS",
    description: "Episodes stream in full over each show's open RSS feed: the real audio, not previews, with a conventional player bar (±15초, previous/next, volume).",
  },
];

const DECISIONS = [
  {
    title: "Why do transcripts read as verse?",
    body: "A transcript is prose you follow in time. Setting each timed line as its own column makes progress legible on the page itself. The columns you have heard sit to the right, the ones still coming wait on the left, and the accent marks now.",
  },
  {
    title: "Why does transport stay horizontal?",
    body: "Time controls are instruments, not text. The player bar keeps its conventional horizontal layout so muscle memory works, and the contrast marks the boundary: reading is vertical, control is horizontal.",
  },
  {
    title: "Why does browsing never stop playback?",
    body: "The breadcrumb trace keeps shows, episodes, and the playing state simultaneously alive. In a reading interface you can look back at the shelf without losing your place in the text. Audio deserves the same.",
  },
];

export default function VerticallyListenPage() {
  return (
    <>
      <AppHero
        title="Vertically Listen"
        status="WIP"
        platform="Web"
        meta="한국 · 日本 · 中国 · 台湾 · 香港"
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

      </div>
    </>
  );
}
