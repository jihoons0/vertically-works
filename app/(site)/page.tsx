import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ChallengeVisual } from "@/components/ChallengeVisual";
import { BentoGrid } from "@/components/home/BentoGrid";
import { ContactForm } from "@/components/home/ContactForm";
import { BottomShader } from "@/components/ui/BottomShader";
import { Footer } from "@/components/layout/Footer";
import { HeroVerticalMotif } from "@/components/home/HeroVerticalMotif";
import { InstallBanner } from "@/components/ui/InstallBanner";
import { AppTile, type ShowcaseApp } from "@/components/apps/AppShowcase";
import { Beam } from "@/components/ui/Beam";

export const metadata: Metadata = {
  title: "Vertically Works · React components for vertical writing interfaces (CJK)",
  description:
    "An open-source design system for vertical writing · Korean, Japanese, Chinese. Real React components on true writing-mode: vertical-rl, a shadcn-compatible registry, and live apps.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

// Home leads with the flagship apps as full-width showcases · Verse, To-do, Chat.
// Flagship apps · full-width showcases. Listen (WIP) lives only on /apps.
const APPLICATIONS: ShowcaseApp[] = [
  {
    id: "verse",
    name: "Verse",
    platform: "iOS",
    status: "Live",
    href: "/apps/verse",
    tagline: "A fully vertical Bible reader",
    description:
      "A fully vertical, right-to-left Bible for Korean, Japanese, and Chinese. Columns snap one at a time and verse numbers stand upright with tate-chu-yoko.",
    media: { type: "video", src: "/videos/vertically-verse.mp4", aspect: "2 / 3" },
  },
  {
    id: "todo",
    name: "To-do",
    platform: "Web",
    status: "Live",
    href: "/apps/todo",
    tagline: "Every task is a column",
    description:
      "A to-do list where every task is a full-height column you read top to bottom. Pull down to delete, drag sideways to reorder, switch 한 / あ / 中 to re-localize it all.",
    media: { type: "video", src: "/videos/vertically-notes.mp4", aspect: "1294 / 1484" },
  },
  {
    id: "news",
    name: "News",
    platform: "Web",
    status: "Live",
    href: "/apps/news",
    tagline: "Headlines as a vertical newspaper",
    description:
      "A daily front page of live Korean, Japanese, and Chinese headlines, set right-to-left as a vertical newspaper — real-world digits, acronyms, and line-breaking under load.",
    media: { type: "video", src: "/videos/vertically-news.mp4", aspect: "1734 / 1544" },
  },
  {
    id: "chat",
    name: "Chat",
    platform: "Web",
    status: "Live",
    href: "/apps/chat",
    tagline: "An AI chat that reads vertically",
    description:
      "An AI chat that reads top to bottom, right to left. Every turn is a column — new turns enter from the left, oldest at the right edge, with the composer as the rightmost column.",
    media: { type: "video", src: "/videos/vertically-chat.mp4", aspect: "1828 / 1544" },
  },
];

// Challenges · all eight, animated; full write-ups live on /challenges
const CHALLENGES = [
  { id: "motion-direction", tag: "Motion", question: "Should a sheet animate from screen geometry or reading direction?" },
  { id: "mixed-language", tag: "Typography", question: "How should mixed CJK and Latin content behave in the same column?" },
  { id: "navigation-direction", tag: "Navigation", question: "Where does the navigation rail belong in a vertical-first interface?" },
  { id: "selection", tag: "Interaction", question: "How does text selection work when reading flows top-to-bottom, right-to-left?" },
  { id: "ime-vertical", tag: "IME", question: "Where does the IME candidate window appear when input is vertical?" },
  { id: "keyboard-navigation", tag: "Accessibility", question: "What do the arrow keys mean in a vertical, RTL interface?" },
  { id: "drag-reorder", tag: "Interaction", question: "How does drag-and-drop reordering work when list items are columns?" },
  { id: "ai-chat", tag: "AI", question: "How should AI chat interfaces adapt to vertical writing systems?" },
];

const PRINCIPLES = [
  { id: "reading-flow", title: "Respect Reading Flow", description: "Begin with how the reader moves, not convention." },
  { id: "motion-meaning", title: "Motion Has Meaning", description: "Animation reinforces reading direction, never decoration." },
  { id: "interaction-first", title: "Interaction Before Typography", description: "Behavior is the goal; typography enables it." },
  { id: "mixed-first", title: "Mixed Language First", description: "Design for mixed scripts, not the average." },
  { id: "accessibility", title: "Accessibility Is Fundamental", description: "Keyboard, touch, screen reader, reduced motion, built in." },
  { id: "progressive-familiarity", title: "Progressive Familiarity", description: "New readers need a ramp · deepen the vertical commitment gradually." },
  { id: "uncertainty", title: "Research Never Ends", description: "Document open questions beside resolved ones." },
];

// Secondary link-button for section heading rows · right-aligned "All …" CTAs.
function SectionCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="btn-cta-hover pressable section-cta"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        height: 40, padding: "0 var(--space-5)",
        fontSize: "0.9375rem",
        borderRadius: "var(--radius-lg)",
        border: "none", color: "var(--color-fg)",
        flexShrink: 0,
      }}
    >
      {/* On mobile the label is visually hidden (kept for screen readers) and the
          button collapses to a right-aligned icon button · see .section-cta CSS. */}
      <span className="section-cta-label">{children}</span>
      <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════ Hero ══════════════════════════════════ */}
      <section>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "var(--space-20) var(--space-6) clamp(56px, 7vw, 104px)",
          }}
        >
        <div className="home-hero">
          <Reveal style={{ paddingTop: 0 }}>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.04,
                color: "var(--color-fg)",
                margin: "0 0 var(--space-6)",
              }}
            >
              Interfaces for<br />vertical writing
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.1875rem)",
                color: "var(--color-fg-muted)",
                lineHeight: 1.6,
                maxWidth: "52ch",
                margin: "0 0 var(--space-6)",
              }}
            >
              Every UI component you know assumes horizontal text. Vertically Works is
              what buttons, toggles, dialogs, and lists become when reading flows top to
              bottom, right to left.
            </p>

            {/* Stat row · the facts, scannable. A row with dividers on wide
                screens; a clean vertical stack (no dividers) on narrow ones. */}
            <div className="hero-stats" style={{ margin: "0 0 var(--space-8)", fontSize: "0.9375rem", color: "var(--color-fg-muted)" }}>
              <span><strong style={{ color: "var(--color-fg)", fontWeight: 600 }}>20</strong> components</span>
              <span aria-hidden className="hero-stat-divider" />
              <span>Korean, Japanese, Chinese</span>
              <span aria-hidden className="hero-stat-divider" />
              <span><strong style={{ color: "var(--color-fg)", fontWeight: 600 }}>4</strong> applications</span>
            </div>

            <div
              style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", alignItems: "center" }}
            >
              <Beam size="sm" style={{ display: "inline-flex" }}>
                <Link
                  href="/components"
                  className="btn-primary-hover"
                  style={{
                    display: "inline-flex", alignItems: "center",
                    height: 40, padding: "0 var(--space-5)",
                    fontSize: "0.9375rem", fontWeight: 500,
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-fg)", color: "var(--color-bg)",
                  }}
                >
                  Explore Components
                </Link>
              </Beam>
              <Link
                href="https://github.com/jihoons0/vertically-works"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-hover"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  height: 40, padding: "0 var(--space-5)",
                  fontSize: "0.9375rem", fontWeight: 500,
                  borderRadius: "var(--radius-lg)",
                  border: "none", color: "var(--color-fg)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </Link>
            </div>
          </Reveal>

          {/* Vertical writing, writing itself · hidden on narrow screens */}
          <Reveal delay={150} className="home-hero-motif">
            <HeroVerticalMotif />
          </Reveal>
        </div>
        </div>
      </section>

      {/* ══════════════════════════ Applications ═══════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-10)" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: 0, lineHeight: 1.15 }}>
              Applications
            </h2>
            <SectionCta href="/apps">All applications</SectionCta>
          </div>
        </Reveal>

        {/* Flagship apps · a 2×2 grid of compact tiles (shader + video, title
            below). Full case-study cards live on /apps. */}
        <div className="home-apps-2x2">
          {APPLICATIONS.map((app, i) => (
            <Reveal key={app.id} delay={(i % 2) * 60}>
              <AppTile app={app} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ The System in Motion · self-playing demos ═════════════ */}
      <section>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          {/* No scroll reveal · the section crests the fold on desktop, where a
              scroll-triggered fade left it looking empty on first paint. */}
          <BentoGrid
            title="Components"
            action={<SectionCta href="/components">All components</SectionCta>}
          />
        </div>
      </section>

      {/* ═══════════ Where this began · the 2019 article behind the site ═══════ */}
      <section
        className="origin-banner-mono"
        style={{
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Monochrome banner · black on white by day, white on black at night
            (.origin-banner-mono). No shader here; the navy mesh moved to the app
            showcases. The article card still bleeds past the bottom edge. */}
        {/* The original article, as a tall card anchored top-right · it bleeds
            past the banner's bottom edge, clipped flat by the section. */}
        <a
          href="https://uxdesign.cc/vertically-works-design-exploration-on-vertical-typography-75164eed11a8"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read the original 2019 article on UX Collective"
          className="origin-article"
        >
          <img
            src="/images/origin-article.png"
            alt="The original 2019 UX Collective article, Introducing Vertically Works"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </a>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 88px) var(--space-6)" }}>
          <Reveal>
            {/* Constrained so the copy always wraps clear of the article card */}
            <figure style={{ margin: 0, maxWidth: "min(100%, 620px)" }}>
              {/* Byline · a living study, one person · kicker above the quote */}
              <div style={{ marginBottom: "var(--space-6)", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <img
                  src="/images/jihoon-avatar.jpg"
                  alt="Jihoon Suh"
                  width={36}
                  height={36}
                  style={{ borderRadius: "50%", display: "block", flexShrink: 0, border: "1px solid var(--color-border)" }}
                />
                <p style={{ margin: 0, fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.5 }}>
                  A living study by{" "}
                  <a
                    href="https://jihoonsuh.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-muted-hover"
                    style={{ color: "var(--color-fg)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}
                  >
                    Jihoon Suh
                  </a>
                  .
                </p>
              </div>
              <blockquote
                style={{
                  margin: "0 0 var(--space-5)",
                  fontFamily: "var(--font-site-title)",
                  fontSize: "clamp(1.5rem, 3.2vw, 2.375rem)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  color: "var(--color-fg)",
                }}
              >
                “Why don’t we have any user interfaces in vertical format?”
              </blockquote>
              <figcaption style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.65, maxWidth: "52ch" }}>
                Asked in{" "}
                <cite style={{ color: "var(--color-fg)", fontWeight: 500, fontStyle: "italic" }}>
                  Introducing Vertically Works
                </cite>
                , the design exploration published on UX Collective in December 2019.
                Everything on this site is the long answer to that question.
              </figcaption>
              <Link
                href="/about"
                className="btn-primary-hover"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  height: 40, padding: "0 var(--space-5)",
                  marginTop: "var(--space-6)",
                  fontSize: "0.9375rem", fontWeight: 500,
                  borderRadius: "var(--radius-lg)",
                  // Filled to the banner's inverted tokens · black-on-white in dark
                  // mode, white-on-black in light mode.
                  background: "var(--color-fg)", color: "var(--color-bg)",
                }}
              >
                Learn more about why I&rsquo;m doing this
                <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
              </Link>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ Challenges + Principles (merged) ══════════════════ */}
      <section>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-12)" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: 0, lineHeight: 1.15 }}>
              What This Project Explores
            </h2>
            <SectionCta href="/challenges">All challenges</SectionCta>
          </div>
          </Reveal>

          {/* Challenges · all eight as a 4×2 grid on desktop */}
          <div className="challenges-grid" style={{ marginBottom: "var(--space-16)" }}>
            {CHALLENGES.map((c, i) => (
              <Reveal
                key={c.id}
                delay={(i % 4) * 60}
                style={{
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                  padding: "var(--space-5)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    height: 124,
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-bg-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "var(--space-3)",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <ChallengeVisual id={c.id} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-2)" }}>
                    {c.tag}
                  </span>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.45 }}>
                    {c.question}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Principles · numbered, one pass to scan */}
          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-8)", lineHeight: 1.2 }}>
            Derived Principles
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "var(--space-8) var(--space-6)" }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.id} delay={i * 40}>
                <span style={{ display: "block", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", marginBottom: "var(--space-3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-2)", letterSpacing: "-0.01em" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>
                  {p.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Install · copy them into your project ═════════════ */}
      <InstallBanner />

      {/* ═══ Contact + footer · one grainy wave surface closes the page ═══ */}
      <section id="contact" style={{ scrollMarginTop: 72, position: "relative" }}>
        <BottomShader />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "clamp(80px, 11vw, 160px) var(--space-6) clamp(64px, 9vw, 128px)" }}>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Footer transparent />
        </div>
      </section>
    </>
  );
}
