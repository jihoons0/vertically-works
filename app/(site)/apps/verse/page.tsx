import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { AppVideo } from "@/components/home/AppVideo";
import { RelatedPill } from "@/components/ui/RelatedPill";
import { VERSE_APP_STORE_URL } from "@/lib/appUrls";

// Cross-references rendered as badge links: ◆ component · ? challenge · ▲ principle
type Related = { label: string; href: string };

export const metadata: Metadata = {
  title: "Vertically Verse",
  description: "A fully vertical, RTL scripture reader for Korean, Japanese, and Chinese.",
};

const FEATURES = [
  {
    title: "Column-based layout",
    description: "Scripture text is composed into top→bottom columns flowing right-to-left. Each column is an independent snap target, not a paginated view.",
    related: [
      { label: "Tiered Page", href: "/components/tiered-page" },
      { label: "Vertical List Cell", href: "/components/vertical-list-cell" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Tate-chu-yoko (縦中横)",
    description: "Verse numbers and digit groups (e.g., \"1:1\") are set as upright horizontal clusters within the vertical stream · a typographic convention from Japanese publishing.",
    related: [
      { label: "Verse", href: "/components/verse" },
      { label: "Mixed CJK & Latin", href: "/challenges#mixed-language" },
      { label: "Mixed Language First", href: "/principles#mixed-first" },
    ],
  },
  {
    title: "Scroll-driven immersion",
    description: "Reading forward (scrolling left) collapses the chrome to reclaim screen surface. Scrolling back, or tapping the indicator, restores full controls.",
    related: [
      { label: "Motion direction", href: "/challenges#motion-direction" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
  {
    title: "Horizontal pull-to-paginate",
    description: "Overscrolling past the last column fills a circular progress ring and triggers the adjacent chapter · with haptic ticks climbing to a landing haptic.",
    related: [
      { label: "Chapter Navigation", href: "/components/chapter-navigation" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
  {
    title: "RTL-native chrome",
    description: "Every control is vertical text. The navigator, drawers, and language toggle all lay out R→L, matching the reading direction.",
    related: [
      { label: "Sheet", href: "/components/sheet" },
      { label: "Tabs", href: "/components/tabs" },
      { label: "Navigation rail placement", href: "/challenges#navigation-direction" },
    ],
  },
  {
    title: "Three-language support",
    description: "Korean 개역한글, Japanese 口語訳, and Chinese 和合本 (Traditional). Each is a full translation, selectable as a unified switch.",
    related: [
      { label: "Mixed Language First", href: "/principles#mixed-first" },
    ],
  },
];

const DECISIONS = [
  {
    title: "Why columns, not pages?",
    body: "Traditional CJK books do not paginate · they scroll. A digital reader should preserve that continuity. Column-snapping gives the feel of pages without the imposed boundary.",
    related: [
      { label: "Tiered Page", href: "/components/tiered-page" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Why RTL scroll direction?",
    body: "In right-to-left column order, reading forward moves left. The scroll direction must match the reading direction, not the OS default. A single flipEdges constant in the layout handles the offset sign inversion.",
    related: [
      { label: "Navigation rail placement", href: "/challenges#navigation-direction" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Why haptic feedback for chapter turns?",
    body: "The pull gesture has no visual feedback until the ring is visible. Haptic ticks give progressive feedback during the blind portion of the pull · the same reason analog clocks tick.",
    related: [
      { label: "Motion direction", href: "/challenges#motion-direction" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
];

export default function VerticallyVersePage() {
  return (
    <>
      <AppHero
        title="Vertically Verse"
        description="A fully vertical, right-to-left Bible for Korean, Japanese, and Chinese."
        status="Live"
        platform="iOS"
        aside={
          <div>
            {/* Small utility heading · sans, not display type */}
            <h2 style={{ fontFamily: "var(--font-site-sans)", fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-fg)", margin: "0 0 var(--space-4)", lineHeight: 1.3 }}>
              Try this
            </h2>
            <a
              href={VERSE_APP_STORE_URL}
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
              {/* Apple logo · brand marks aren't in lucide */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ display: "inline-block", marginTop: -2 }}>
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.031 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              Download on the App Store
            </a>
          </div>
        }
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
                A fully vertical Bible
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: "0 0 var(--space-5)", maxWidth: "52ch" }}>
                A vertical, right-to-left Bible reader for Korean, Japanese, and
                Chinese. Every control, gesture, and transition works on the
                top→bottom, R→L axis · columns instead of pages, chrome that reads
                vertically, motion that tracks the reading direction.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: 0, maxWidth: "52ch" }}>
                The recording is the real app: verse-anchored highlights, the color
                palette at the reading edge, and text selection that travels down the
                column · the same interactions documented across this site.
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

      </div>
    </>
  );
}
