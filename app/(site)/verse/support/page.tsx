import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support and FAQ for Vertically Verse, the vertical, right-to-left CJK scripture reader.",
};

const wrap: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "var(--space-12) var(--space-6) var(--space-24)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-12)",
};

const h2: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "var(--color-fg-subtle)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin: 0,
};

const p: React.CSSProperties = {
  fontSize: "0.9375rem",
  color: "var(--color-fg-muted)",
  lineHeight: 1.75,
  margin: 0,
  maxWidth: "64ch",
};

const link: React.CSSProperties = {
  color: "var(--color-fg)",
  textDecoration: "underline",
  textUnderlineOffset: "0.15em",
};

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I switch languages?",
    a: (
      <>
        Tap the language capsule (한 / あ / 中) on the left rail. Each language is its own bundled
        translation · Korean 한글 킹제임스, Japanese 口語訳, Chinese 和合本.
      </>
    ),
  },
  {
    q: "How do I change the book or chapter?",
    a: (
      <>
        Open the navigator to pick any book and chapter across the full 66-book canon. You can also
        overscroll past the last or first column to move to the adjacent chapter.
      </>
    ),
  },
  {
    q: "Can I change the text size, font, or theme?",
    a: (
      <>
        Yes. In Settings you can adjust font size and line spacing, switch between serif (명조) and
        sans (고딕) typefaces, and choose a dark, sepia, or light reading theme.
      </>
    ),
  },
  {
    q: "What are the two reading layouts?",
    a: (
      <>
        흐름 is a continuous, scrolling flow of columns. 절별 lays the chapter out as a static book
        page you turn with the ‹ › buttons.
      </>
    ),
  },
  {
    q: "Does the app need an internet connection?",
    a: <>No. All scripture and fonts are bundled in the app and everything works fully offline.</>,
  },
  {
    q: "Does the app collect my data?",
    a: (
      <>
        No. Vertically Verse collects no data at all. See our{" "}
        <Link href="/verse/privacy" style={link}>Privacy Policy</Link>.
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vertically Verse"
        title="Support"
        description="A vertical, right-to-left CJK scripture reader. Questions, problems, or feedback · we’re glad to help."
      />

      <div style={wrap}>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            padding: "var(--space-6) var(--space-8)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-subtle)",
          }}
        >
          <h2 style={h2}>Contact us</h2>
          <p style={p}>
            Need help or want to report a problem? Email{" "}
            <Link href="mailto:jihoons@designwithorbital.com" style={link}>
              jihoons@designwithorbital.com
            </Link>
            . We aim to reply within a few business days.
          </p>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <h2 style={h2}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            {FAQ.map((item) => (
              <div key={item.q} style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.01em" }}>
                  {item.q}
                </h3>
                <p style={p}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
