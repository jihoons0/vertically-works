import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { RelatedPill } from "@/components/ui/RelatedPill";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { runningAppUrl } from "@/lib/appUrls";

// Cross-references rendered as badge links: ◆ component · ? challenge · ▲ principle
type Related = { label: string; href: string };

export const metadata: Metadata = {
  title: "Vertically News",
  description:
    "A daily news reader that sets live Korean, Japanese, and Chinese headlines as a vertical, right-to-left newspaper front page.",
};

const FEATURES = [
  {
    title: "The front page, restored",
    description:
      "Live RSS headlines set as full-height vertical columns. The first story sits at the right edge and forward means leftward · the front page digital news would have if it had inherited 세로쓰기/縦書き instead of abandoning it.",
    related: [
      { label: "Tiered Page", href: "/components/tiered-page" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Three editions",
    description:
      "한 · あ · 中 each carry their own source set (연합뉴스·한겨레·KBS, NHK·朝日, BBC 中文·中央社), with the chrome in that edition's language. Switching editions switches newspapers, never translations.",
    related: [
      { label: "Tabs", href: "/components/tabs" },
      { label: "Mixed Language First", href: "/principles#mixed-first" },
    ],
  },
  {
    title: "The typography stress test",
    description:
      "Real headlines are full of dates, tickers, and acronyms. Every feed line passes through the studio's typography pipeline: verticalized punctuation, tate-chu-yoko (縦中横) digit runs, and kinsoku/금칙 column composition.",
    related: [
      { label: "Verse", href: "/components/verse" },
      { label: "Mixed CJK & Latin", href: "/challenges#mixed-language" },
      { label: "Mixed Language First", href: "/principles#mixed-first" },
    ],
  },
  {
    title: "Pull to turn the page",
    description:
      "Articles paginate as tiered columns. Overscroll past the leftmost column and a ring fills with the pull; it arms at 100% and the next page enters from the left edge · interruptible, tracking the pointer 1:1.",
    related: [
      { label: "Chapter Navigation", href: "/components/chapter-navigation" },
      { label: "Motion direction", href: "/challenges#motion-direction" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
  {
    title: "An honest reader",
    description:
      "Full articles are extracted as text when the publisher page allows it. When extraction fails, the reader falls back to a single description page with a prominent 원문 보기 link · never a fake full article.",
    related: [
      { label: "Hyperlink Treatment", href: "/components/hyperlink-treatment" },
      { label: "Research Never Ends", href: "/principles#document-uncertainty" },
    ],
  },
  {
    title: "Sources you own",
    description:
      "Default feeds can be toggled per edition and any RSS URL added alongside them. The Sources sheet shows a dead feed's failure · it never blanks the front page.",
    related: [
      { label: "Sheet", href: "/components/sheet" },
    ],
  },
];

const DECISIONS = [
  {
    title: "Why a newspaper?",
    body: "Newspapers are the strongest historical case for vertical CJK setting: for over a century, Korean, Japanese, and Chinese dailies were composed top to bottom, right to left, and Japanese national papers still are, in print. Every digital edition fell back to horizontal. News is where digital dropped vertical setting, so restoring it there matters most.",
    related: [
      { label: "Tiered Page", href: "/components/tiered-page" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Why live feeds instead of curated demos?",
    body: "Hand-picked sample text flatters a typography system. Live headlines do not: they arrive full of digits, Latin acronyms, and mixed punctuation, several times an hour. If the pipeline holds up against a real news day, it holds up anywhere.",
    related: [
      { label: "Mixed CJK & Latin", href: "/challenges#mixed-language" },
      { label: "Research Never Ends", href: "/principles#document-uncertainty" },
    ],
  },
  {
    title: "Why does the left arrow mean next?",
    body: "On a right-to-left reading axis, forward is leftward. The keyboard follows the reading direction rather than screen convention: ← turns to the next page, → goes back, and pages enter and exit at the left edge. Reversing this to match horizontal habits would break the very premise being tested.",
    related: [
      { label: "Arrow-key semantics", href: "/challenges#keyboard-navigation" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
];

export default function VerticallyNewsPage() {
  return (
    <>
      <AppHero
        title="Vertically News"
        description="A daily newspaper setting live Korean, Japanese, and Chinese headlines right to left."
        status="Live"
        platform="Web"
        aside={
          <div>
            {/* Small utility heading · sans, not display type */}
            <h2 style={{ fontFamily: "var(--font-site-sans)", fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-fg)", margin: "0 0 var(--space-4)", lineHeight: 1.3 }}>
              Try this
            </h2>
            <Link
              href={runningAppUrl("news")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-hover"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 var(--space-5)",
                fontSize: "0.9375rem", fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                background: "var(--color-fg)", color: "var(--color-bg)",
              }}
            >
              Open the front page
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
            </Link>
          </div>
        }
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        {/* Features */}
        <section aria-labelledby="news-features" style={{ marginBottom: "var(--space-16)" }}>
          <Reveal>
            <h2 id="news-features" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-8)" }}>
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
        <section aria-labelledby="news-decisions" style={{ marginBottom: "var(--space-16)" }}>
          <Reveal>
            <h2 id="news-decisions" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-8)" }}>
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
