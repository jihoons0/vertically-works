import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { AppEmbed } from "@/components/apps/AppEmbed";

export const metadata: Metadata = {
  title: "Vertically Listen",
  description: "A podcast player rethought for the vertical, right-to-left axis — transcripts fall as time-synced vertical verse.",
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
    description: "When a feed has no transcript, show notes appear as a labeled intro panel instead — untimed text never pretends to be synced.",
  },
  {
    title: "Full episodes, open RSS",
    description: "Episodes stream in full over each show's open RSS feed — the real audio, not previews, with a conventional player bar (±15초, previous/next, volume).",
  },
];

const DECISIONS = [
  {
    title: "Why do transcripts read as verse?",
    body: "A transcript is prose you follow in time. Setting each timed line as its own column makes progress legible on the page itself — the columns you have heard sit to the right, the ones still coming wait on the left, and the accent marks now.",
  },
  {
    title: "Why does transport stay horizontal?",
    body: "Time controls are instruments, not text. The player bar keeps its conventional horizontal layout so muscle memory works, and the contrast marks the boundary: reading is vertical, control is horizontal.",
  },
  {
    title: "Why does browsing never stop playback?",
    body: "The breadcrumb trace keeps shows, episodes, and the playing state simultaneously alive. In a reading interface you can look back at the shelf without losing your place in the text — audio deserves the same.",
  },
];

export default function VerticallyListenPage() {
  return (
    <>
      <AppHero
        title="Vertically Listen"
        banner="/images/apps/listen-banner.png"
        bannerAlt="Vertically Listen — a podcast player with vertical text, a CJK top-shows shelf, and a horizontal player bar"
        status="Live"
        platform="Web"
        meta="한국 · 日本 · 中国 · 台湾 · 香港"
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        {/* Core visual — the real app, running in the page */}
        <Reveal style={{ marginBottom: "var(--space-20)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
                Listen here — this is the live app
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: 0, maxWidth: "56ch" }}>
                Pick a show from today&apos;s charts, play an episode, and watch the transcript
                fall as vertical verse — 귀로 읽는 시간.
              </p>
            </div>
            <Link
              href="/apps/listen"
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
          <AppEmbed src="/apps/listen" title="Vertically Listen — live podcast player" height={600} />
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
            <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0 }}>The app owns the full viewport at /apps/listen. Charts refresh daily; episodes stream from each show&apos;s open feed.</p>
          </div>
          <Link
            href="/apps/listen"
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
            Open Vertically Listen →
          </Link>
        </div>
      </div>
    </>
  );
}
