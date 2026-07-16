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
import { OriginShader } from "@/components/ui/OriginShader";
import { AppVideo } from "@/components/home/AppVideo";
import { AppShowcaseShader } from "@/components/home/AppShowcaseShader";
import { Beam } from "@/components/ui/Beam";

export const metadata: Metadata = {
  title: "Vertically Works · React components for vertical writing interfaces (CJK)",
  description:
    "An open-source design system for vertical writing · Korean, Japanese, Chinese. Real React components on true writing-mode: vertical-rl, a shadcn-compatible registry, and live apps.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type AppMedia =
  | { type: "video"; src: string; aspect: string }
  | { type: "image"; src: string; aspect: string }
  | null;

type Application = {
  id: string;
  name: string;
  platform: string;
  status: "Live" | "Beta" | "WIP";
  href: string;
  description: string;
  highlights: string[];
  media: AppMedia;
};

// The three flagship apps lead as full-width showcases; anything after is a
// compact card. Order is canonical · Verse, Notes, News, then Listen.
const APPLICATIONS: Application[] = [
  {
    id: "vertically-verse",
    name: "Verse",
    platform: "iOS",
    status: "Live",
    href: "/apps/vertically-verse",
    description:
      "A fully vertical, right-to-left Bible for Korean, Japanese, and Chinese.",
    highlights: [
      "Columns snap per column, not per page",
      "Tate-chu-yoko (縦中横) verse numbers",
      "RTL-native chrome, scroll-driven immersion",
    ],
    media: { type: "video", src: "/videos/vertically-verse.mp4", aspect: "2 / 3" },
  },
  {
    id: "notes",
    name: "To-do",
    platform: "Web",
    status: "Live",
    href: "/apps/vertically-do",
    description:
      "A to-do list where every task is a column you read top to bottom.",
    highlights: [
      "Tasks are full-height columns, newest at the reading start",
      "Pull down to delete, drag sideways to reorder",
      "한 / あ / 中 re-localizes the whole interface",
    ],
    media: { type: "video", src: "/videos/vertically-notes.mp4", aspect: "1294 / 1484" },
  },
  {
    id: "news",
    name: "News",
    platform: "Web",
    status: "WIP",
    href: "/apps/vertically-news",
    description:
      "A daily newspaper setting live Korean, Japanese, and Chinese headlines right to left.",
    highlights: [],
    media: null,
  },
  {
    id: "listen",
    name: "Listen",
    platform: "Web",
    status: "WIP",
    href: "/apps/vertically-listen",
    description:
      "A podcast player where transcripts fall as time-synced vertical verse.",
    highlights: [],
    media: null,
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

// ─── App cards ────────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: Application["status"] }) {
  const live = status === "Live";
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: "0.6875rem", fontWeight: 500,
        color: live ? "var(--color-fg)" : "var(--color-fg-subtle)",
        padding: "2px 8px", borderRadius: "var(--radius-full)",
        border: "1px solid",
        borderColor: live ? "var(--color-border-strong)" : "var(--color-border)",
      }}
    >
      {live && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />}
      {status}
    </span>
  );
}

/** Full-width flagship row · media on one side, copy on the other (alternating). */
function AppShowcase({ app, reverse }: { app: Application; reverse: boolean }) {
  return (
    <Link href={app.href} className={`card-hover app-showcase${reverse ? " reverse" : ""}`}>
      <div className="app-showcase-media">
        <AppShowcaseShader appId={app.id} />
        {app.media?.type === "video" ? (
          <div className="app-showcase-frame" style={{ aspectRatio: app.media.aspect }}>
            <AppVideo src={app.media.src} label={`${app.name} demo`} />
          </div>
        ) : app.media?.type === "image" ? (
          <img src={app.media.src} alt={`${app.name} preview`} className="app-showcase-shot" />
        ) : null}
      </div>

      <div className="app-showcase-body">
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-1)" }}>
          <StatusPill status={app.status} />
          <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>{app.platform}</span>
        </div>
        <h3 style={{ fontSize: "clamp(1.375rem, 2.4vw, 1.875rem)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: 0, lineHeight: 1.1 }}>
          {app.name}
        </h3>
        <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6, maxWidth: "42ch" }}>
          {app.description}
        </p>
        {app.highlights.length > 0 && (
          <ul style={{ margin: "var(--space-1) 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {app.highlights.map((h) => (
              <li key={h} style={{ display: "flex", gap: "var(--space-3)", alignItems: "baseline" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--color-border-strong)", flexShrink: 0, marginTop: 7, display: "inline-block" }} />
                <span style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", lineHeight: 1.55 }}>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <span className="app-showcase-cta" style={{ marginTop: "var(--space-2)" }}>
          View case study
          <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
        </span>
      </div>
    </Link>
  );
}

/** Compact card for secondary / in-progress apps · no media. */
function AppCompact({ app }: { app: Application }) {
  return (
    <Link
      href={app.href}
      className="card-hover"
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "var(--space-6)", flexWrap: "wrap",
        padding: "var(--space-6) var(--space-8)",
        borderRadius: "var(--radius-xl)",
        borderWidth: 1, borderStyle: "solid",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-2)" }}>
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-fg)", margin: 0 }}>{app.name}</h3>
          <StatusPill status={app.status} />
          <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>{app.platform}</span>
        </div>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>{app.description}</p>
      </div>
      <span className="app-showcase-cta" style={{ flexShrink: 0 }}>
        View case study
        <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
      </span>
    </Link>
  );
}

// Secondary link-button for section heading rows · right-aligned "All …" CTAs.
function SectionCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="btn-cta-hover pressable"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        height: 40, padding: "0 var(--space-5)",
        fontSize: "0.9375rem",
        borderRadius: "var(--radius-lg)",
        border: "none", color: "var(--color-fg)",
        flexShrink: 0,
      }}
    >
      {children}
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
                href="/apps"
                className="btn-outline-hover"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  height: 40, padding: "0 var(--space-5)",
                  fontSize: "0.9375rem", fontWeight: 500,
                  borderRadius: "var(--radius-lg)",
                  border: "none", color: "var(--color-fg)",
                }}
              >
                See the apps
                <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
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

      {/* ═══════════ Where this began · the 2019 article behind the site ═══════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--color-bg-subtle)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Soft mesh-gradient backdrop · the surface the question was first written on */}
        <OriginShader />
        {/* Legibility scrim · lifts the reading side toward the page bg so dark text
            stays crisp over the gradient, then fades out before the article card. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-bg) 82%, transparent) 0%, color-mix(in srgb, var(--color-bg) 55%, transparent) 42%, transparent 68%)",
          }}
        />
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
                className="btn-ghost-hover"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  height: 40, padding: "0 var(--space-5)",
                  marginTop: "var(--space-6)",
                  fontSize: "0.9375rem", fontWeight: 500,
                  borderRadius: "var(--radius-lg)",
                }}
              >
                Learn more about why I&rsquo;m doing this
                <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
              </Link>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ The System in Motion · self-playing demos ═════════════ */}
      <section>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          {/* No scroll reveal · the section crests the fold on desktop, where a
              scroll-triggered fade left it looking empty on first paint. */}
          <BentoGrid
            title="Components"
            description="The interaction primitives of a vertical interface · real, accessible React components you copy into your project with one command."
            action={<SectionCta href="/components">All components</SectionCta>}
          />
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

        {/* Flagship apps · those with a visual · full-width alternating showcases */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {APPLICATIONS.filter((a) => a.media).map((app, i) => (
            <Reveal key={app.id} delay={i * 60}>
              <AppShowcase app={app} reverse={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        {/* In-progress apps · no visual yet · compact cards */}
        {APPLICATIONS.some((a) => !a.media) && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
            {APPLICATIONS.filter((a) => !a.media).map((app, i) => (
              <Reveal key={app.id} delay={i * 60}>
                <AppCompact app={app} />
              </Reveal>
            ))}
          </div>
        )}
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
