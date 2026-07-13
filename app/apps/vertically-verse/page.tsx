import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { AppVideo } from "@/components/home/AppVideo";

export const metadata: Metadata = {
  title: "Vertically Verse",
  description: "A fully vertical, RTL scripture reader for Korean, Japanese, and Chinese.",
};

const FEATURES = [
  {
    title: "Column-based layout",
    description: "Scripture text is composed into top→bottom columns flowing right-to-left. Each column is an independent snap target, not a paginated view.",
  },
  {
    title: "Tate-chu-yoko (縦中横)",
    description: "Verse numbers and digit groups (e.g., \"1:1\") are set as upright horizontal clusters within the vertical stream · a typographic convention from Japanese publishing.",
  },
  {
    title: "Scroll-driven immersion",
    description: "Reading forward (scrolling left) collapses the chrome to reclaim screen surface. Scrolling back, or tapping the indicator, restores full controls.",
  },
  {
    title: "Horizontal pull-to-paginate",
    description: "Overscrolling past the last column fills a circular progress ring and triggers the adjacent chapter · with haptic ticks climbing to a landing haptic.",
  },
  {
    title: "RTL-native chrome",
    description: "Every control is vertical text. The navigator, drawers, and language toggle all lay out R→L, matching the reading direction.",
  },
  {
    title: "Three-language support",
    description: "Korean 개역한글, Japanese 口語訳, and Chinese 和合本 (Traditional). Each is a full translation, selectable as a unified switch.",
  },
];

const DECISIONS = [
  {
    title: "Why columns, not pages?",
    body: "Traditional CJK books do not paginate · they scroll. A digital reader should preserve that continuity. Column-snapping gives the feel of pages without the imposed boundary.",
  },
  {
    title: "Why RTL scroll direction?",
    body: "In right-to-left column order, reading forward moves left. The scroll direction must match the reading direction, not the OS default. A single flipEdges constant in the layout handles the offset sign inversion.",
  },
  {
    title: "Why haptic feedback for chapter turns?",
    body: "The pull gesture has no visual feedback until the ring is visible. Haptic ticks give progressive feedback during the blind portion of the pull · the same reason analog clocks tick.",
  },
];

export default function VerticallyVersePage() {
  return (
    <>
      <AppHero
        title="Vertically Verse"
        status="Live"
        platform="iOS"
        meta="한국어 · 日本語 · 中文 (Traditional)"
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        {/* Core visual · the app itself, running */}
        <Reveal>
          <div className="app-detail-lead" style={{ marginBottom: "var(--space-20)" }}>
            <div
              style={{
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                overflow: "hidden",
                background: "var(--color-bg-muted)",
                alignSelf: "start",
              }}
            >
              <div style={{ aspectRatio: "2/3" }}>
                <AppVideo
                  src="/videos/vertically-verse.mp4"
                  poster="/images/apps/verse-poster.jpg"
                  label="Vertically Verse demo · reading and highlighting vertical scripture"
                />
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-4)", lineHeight: 1.15 }}>
                The first application built on Vertically Works principles
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: "0 0 var(--space-5)", maxWidth: "52ch" }}>
                A fully vertical, right-to-left scripture reader for Korean, Japanese, and
                Chinese. Every control, gesture, and transition is rethought for the
                top→bottom, R→L axis · columns instead of pages, chrome that reads
                vertically, and motion that always follows the reading direction.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: "0 0 var(--space-8)", maxWidth: "52ch" }}>
                The recording is the real app: verse-anchored highlights, the color
                palette at the reading edge, and text selection that travels down the
                column · the same interactions documented across this site.
              </p>
              <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                {/* TestFlight public beta */}
                <a
                  href="https://testflight.apple.com/join/DY7MKU7m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-hover pressable"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    height: 40, padding: "0 var(--space-5)",
                    fontSize: "0.9375rem", fontWeight: 500,
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-fg)", color: "var(--color-bg)",
                  }}
                >
                  Join the TestFlight beta ↗
                </a>
              </div>
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
