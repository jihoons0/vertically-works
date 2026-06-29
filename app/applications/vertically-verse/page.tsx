import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

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
    description: "Verse numbers and digit groups (e.g., \"1:1\") are set as upright horizontal clusters within the vertical stream — a typographic convention from Japanese publishing.",
  },
  {
    title: "Scroll-driven immersion",
    description: "Reading forward (scrolling left) collapses the chrome to reclaim screen surface. Scrolling back, or tapping the indicator, restores full controls.",
  },
  {
    title: "Horizontal pull-to-paginate",
    description: "Overscrolling past the last column fills a circular progress ring and triggers the adjacent chapter — with haptic ticks climbing to a landing haptic.",
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
    body: "Traditional CJK books do not paginate — they scroll. A digital reader should preserve that continuity. Column-snapping gives the feel of pages without the imposed boundary.",
  },
  {
    title: "Why RTL scroll direction?",
    body: "In right-to-left column order, reading forward moves left. The scroll direction must match the reading direction, not the OS default. A single flipEdges constant in the layout handles the offset sign inversion.",
  },
  {
    title: "Why haptic feedback for chapter turns?",
    body: "The pull gesture has no visual feedback until the ring is visible. Haptic ticks give progressive feedback during the blind portion of the pull — the same reason analog clocks tick.",
  },
];

export default function VerticallyVersePage() {
  return (
    <>
      <PageHeader
        eyebrow="Application"
        title="Vertically Verse"
        description="A fully vertical, right-to-left scripture reader for Korean, Japanese, and Chinese. The first application built on Vertically Works principles."
      >
        <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-8)", flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-fg)",
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-full)", border: "1px solid var(--color-border-strong)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            Live · iOS
          </span>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", alignSelf: "center" }}>
            한국어 · 日本語 · 中文 (Traditional)
          </span>
        </div>
      </PageHeader>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-16) var(--space-6) var(--space-24)" }}>
        {/* App preview — vertical text demo */}
        <div
          style={{
            marginBottom: "var(--space-16)",
            padding: "var(--space-16)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 320,
            gap: "var(--space-8)",
          }}
        >
          <div
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              display: "flex",
              flexDirection: "row",
              gap: "var(--space-8)",
              fontSize: "1.125rem",
              letterSpacing: "0.12em",
              lineHeight: 1.9,
              userSelect: "none",
            }}
            aria-label="Sample vertical text: Genesis 1:1 in Korean, Japanese, and Chinese"
          >
            <div style={{ color: "var(--color-fg)" }}>
              <span style={{ color: "var(--color-fg-subtle)", fontSize: "0.75rem", display: "block", marginBottom: "var(--space-3)" }}>창 1:1</span>
              태초에 하나님이 천지를 창조하시니라
            </div>
            <div style={{ color: "var(--color-fg-muted)" }}>
              <span style={{ color: "var(--color-fg-subtle)", fontSize: "0.75rem", display: "block", marginBottom: "var(--space-3)" }}>創 1:1</span>
              初めに、神が天と地を創造された
            </div>
            <div style={{ color: "var(--color-fg-subtle)" }}>
              <span style={{ color: "var(--color-fg-subtle)", fontSize: "0.75rem", display: "block", marginBottom: "var(--space-3)" }}>創 1:1</span>
              起初　神創造天地
            </div>
          </div>
        </div>

        {/* Features */}
        <section style={{ marginBottom: "var(--space-16)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-8)" }}>
            Features
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-4)" }}>
            {FEATURES.map((f) => (
              <div
                key={f.title}
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
              </div>
            ))}
          </div>
        </section>

        {/* Design decisions */}
        <section style={{ marginBottom: "var(--space-16)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-8)" }}>
            Design Decisions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {DECISIONS.map((d) => (
              <div
                key={d.title}
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
              </div>
            ))}
          </div>
        </section>

        {/* Source */}
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
            <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-fg)", margin: "0 0 var(--space-1)" }}>Source Code</p>
            <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0 }}>The iOS app is open source. Built with SwiftUI and Swift 6.</p>
          </div>
          <Link
            href="https://github.com/jihoons/exploring"
            target="_blank"
            rel="noopener noreferrer"
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View on GitHub
          </Link>
        </div>
      </div>
    </>
  );
}
