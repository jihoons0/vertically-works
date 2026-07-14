import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InstallBanner } from "@/components/ui/InstallBanner";

export const metadata: Metadata = {
  title: "Resources",
  description: "Research papers, references, and links for vertical interface design.",
};

const RESOURCES = [
  {
    category: "Original Work",
    items: [
      {
        title: "Vertical Typography & Punctuation Rules",
        author: "Vertically Works",
        source: "GitHub",
        href: "https://github.com/jihoons0/vertically-works/blob/main/registry/vertical-typography.md",
        description: "The canonical rules this project sets CJK text by · per-glyph orientation, tate-chu-yoko digits, punctuation verticalization, and 금칙/kinsoku line breaking · synthesized from KLREQ, JLREQ, and UAX #50. Install into any project with `npx verticallyworks add vertical-typography`.",
        year: "2026",
      },
      {
        title: "Vertically Works: Design Exploration on Vertical Typography",
        author: "Jihoon Suh & Yanlin Ma",
        source: "UX Design / Medium",
        href: "https://uxdesign.cc/vertically-works-design-exploration-on-vertical-typography-75164eed11a8",
        description: "The original exploration that spawned this project. Covers the motivation, historical context, and early design explorations for vertical UI.",
        year: "2021",
      },
      {
        title: "Vertically Verse iOS App",
        author: "Jihoon Suh",
        source: "GitHub",
        href: "https://github.com/jihoons/exploring",
        description: "Source code for the companion iOS scripture reader. A SwiftUI implementation of vertical-first interaction patterns with Swift 6 strict concurrency.",
        year: "2025",
      },
    ],
  },
  {
    category: "CSS & Typography Specifications",
    items: [
      {
        title: "CSS Writing Modes Level 4",
        author: "W3C",
        source: "W3C",
        href: "https://www.w3.org/TR/css-writing-modes-4/",
        description: "The definitive specification for writing-mode, text-orientation, and direction properties. Essential for understanding how browsers implement vertical text.",
        year: "2019",
      },
      {
        title: "CSS Text Level 4: Tate-chu-yoko",
        author: "W3C",
        source: "W3C",
        href: "https://www.w3.org/TR/css-text-4/#tate-chu-yoko",
        description: "Specification for tate-chu-yoko (縦中横) · upright horizontal text within a vertical line · critical for verse numbers and date formatting.",
        year: "2023",
      },
      {
        title: "Unicode Standard Annex #9: Bidirectional Algorithm",
        author: "Unicode Consortium",
        source: "Unicode",
        href: "https://www.unicode.org/reports/tr9/",
        description: "The algorithm that governs how text of mixed directionality renders. Understanding this is necessary for mixed CJK/Latin content in vertical contexts.",
        year: "2023",
      },
      {
        title: "Unicode Standard Annex #50: Vertical Text Layout",
        author: "Unicode Consortium",
        source: "Unicode",
        href: "https://www.unicode.org/reports/tr50/",
        description: "Defines the orientation behavior (upright vs. rotated) for every Unicode character in a vertical layout. The canonical reference for glyph orientation decisions.",
        year: "2023",
      },
    ],
  },
  {
    category: "Design System References",
    items: [
      {
        title: "Material Design: Bidirectionality",
        author: "Google",
        source: "Material Design",
        href: "https://m3.material.io/foundations/layout/understanding-layout/bidirectionality",
        description: "Google's treatment of RTL layout adaptation in Material Design. Useful as a contrast · it handles bidirectionality but not vertical writing systems.",
        year: "2023",
      },
      {
        title: "Human Interface Guidelines: Localization",
        author: "Apple",
        source: "Apple HIG",
        href: "https://developer.apple.com/design/human-interface-guidelines/accessibility",
        description: "Apple's guidance on adapting interfaces for international audiences. Notable for what it does not cover: vertical text as a primary reading mode.",
        year: "2023",
      },
    ],
  },
  {
    category: "iOS / SwiftUI Implementation",
    items: [
      {
        title: "Core Text Programming Guide",
        author: "Apple",
        source: "Apple Developer Documentation",
        href: "https://developer.apple.com/library/archive/documentation/StringsTextFonts/Conceptual/CoreText_Programming/Introduction/Introduction.html",
        description: "Apple's Core Text framework supports vertical glyph form and right-to-left frame progression · the basis for a proper vertical renderer on iOS.",
        year: "2023",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Research & References"
        description="The specifications, papers, and references that inform this project. Understanding these is necessary for implementing correct vertical interface behavior."
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-24)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-16)",
        }}
      >
        {RESOURCES.map((section) => (
          <section key={section.category}>
            <h2
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-fg-subtle)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "0 0 var(--space-5)",
              }}
            >
              {section.category}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {section.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card-hover"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "var(--space-6)",
                    padding: "var(--space-6) var(--space-8)",
                    borderRadius: "var(--radius-xl)",
                    // width/style only · the `border` shorthand would reset
                    // border-color to currentColor over .card-hover's token
                    borderWidth: 1,
                    borderStyle: "solid",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-2)", letterSpacing: "-0.01em" }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", marginBottom: "var(--space-3)" }}>
                      {item.author} · {item.source} · {item.year}
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.65, maxWidth: "60ch" }}>
                      {item.description}
                    </p>
                  </div>

                  {item.href.startsWith("http") && (
                    <svg style={{ color: "var(--color-fg-subtle)", flexShrink: 0, marginTop: 3 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <InstallBanner />
    </>
  );
}
