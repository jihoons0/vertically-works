import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { WipBanner } from "@/components/apps/WipBanner";

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
  },
  {
    title: "Three editions",
    description:
      "한 · あ · 中 each carry their own source set (연합뉴스·한겨레·KBS, NHK·朝日, BBC 中文·中央社), with the chrome in that edition's language. Switching editions switches newspapers, never translations.",
  },
  {
    title: "The typography stress test",
    description:
      "Real headlines are full of dates, tickers, and acronyms. Every feed line passes through the studio's typography pipeline: verticalized punctuation, tate-chu-yoko (縦中横) digit runs, and kinsoku/금칙 column composition.",
  },
  {
    title: "Pull to turn the page",
    description:
      "Articles paginate as tiered columns. Overscroll past the leftmost column and a ring fills with the pull; it arms at 100% and the next page enters from the left edge · interruptible, tracking the pointer 1:1.",
  },
  {
    title: "An honest reader",
    description:
      "Full articles are extracted as text when the publisher page allows it. When extraction fails, the reader falls back to a single elegant description page with a prominent 원문 보기 link · never a fake full article.",
  },
  {
    title: "Sources you own",
    description:
      "Default feeds can be toggled per edition and any RSS URL added alongside them. A dead feed surfaces its failure in the Sources sheet and never blanks the front page.",
  },
];

const DECISIONS = [
  {
    title: "Why a newspaper?",
    body: "Newspapers are the strongest historical case for vertical CJK setting: for over a century, Korean, Japanese, and Chinese dailies were composed top to bottom, right to left, and Japanese national papers still are, in print. Every digital edition fell back to horizontal. News is where vertical setting was lost, so it is where restoring it means the most.",
  },
  {
    title: "Why live feeds instead of curated demos?",
    body: "Hand-picked sample text flatters a typography system. Live headlines do not: they arrive full of digits, Latin acronyms, and mixed punctuation, several times an hour. If the pipeline holds up against a real news day, it holds up anywhere. The stress test is the product.",
  },
  {
    title: "Why does the left arrow mean next?",
    body: "On a right-to-left reading axis, forward is leftward. The keyboard follows the reading direction rather than screen convention: ← turns to the next page, → goes back, and pages enter and exit at the left edge. Reversing this to match horizontal habits would break the very premise being tested.",
  },
];

export default function VerticallyNewsPage() {
  return (
    <>
      <AppHero
        title="Vertically News"
        status="WIP"
        platform="Web"
        meta="한 · あ · 中 editions"
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        {/* WIP notice · the live front page embeds here at launch */}
        <Reveal style={{ marginBottom: "var(--space-16)" }}>
          <WipBanner>
            Vertically News is a work in progress, going live soon · the live front page opens
            here at launch.
          </WipBanner>
        </Reveal>

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
                <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.65 }}>
                  {f.description}
                </p>
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
