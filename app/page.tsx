import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ChallengeVisual } from "@/components/ChallengeVisual";
import { BentoGrid } from "@/components/home/BentoGrid";
import { ContactForm } from "@/components/home/ContactForm";
import { HeroVerticalMotif } from "@/components/home/HeroVerticalMotif";
import { HeroShader } from "@/components/home/HeroShader";
import { InstallBanner } from "@/components/ui/InstallBanner";
import { AppVideo } from "@/components/home/AppVideo";
import { Beam } from "@/components/ui/Beam";

export const metadata: Metadata = {
  title: "Vertically Works · Designing Interfaces for Vertical Writing Systems",
  description: "A living design system exploring interaction patterns for vertical interfaces.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPLICATIONS = [
  {
    id: "vertically-verse",
    name: "Vertically Verse",
    platform: "iOS",
    status: "Live",
    href: "/apps/vertically-verse",
    video: "/videos/vertically-verse.mp4",
    description:
      "A fully vertical, right-to-left Bible for Korean, Japanese, and Chinese.",
  },
  {
    id: "notes",
    name: "Vertically Notes",
    platform: "Web",
    status: "Live",
    href: "/apps/vertically-do",
    video: "/videos/vertically-notes.mp4",
    description:
      "A to-do list where every task is a column you read top to bottom.",
  },
  {
    id: "listen",
    name: "Vertically Listen",
    platform: "Web",
    status: "WIP",
    href: null,
    video: null,
    description:
      "A podcast player where transcripts fall as time-synced vertical verse.",
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
  { id: "uncertainty", title: "Research Never Ends", description: "Document open questions beside resolved ones." },
];

// ─── App card ─────────────────────────────────────────────────────────────────

function AppCardContent({ app }: { app: (typeof APPLICATIONS)[number] }) {
  return (
    <>
      {/* Media slot · full-bleed video when we have one, phone-frame placeholder otherwise */}
      <div
        style={{
          height: 380,
          background: "var(--color-bg-muted)",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {app.video ? (
          <AppVideo src={app.video} label={`${app.name} demo`} />
        ) : (
          <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>Coming soon</span>
        )}
      </div>

      <div style={{ padding: "var(--space-5) var(--space-6) var(--space-6)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-3)" }}>
          <span style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>{app.name}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg)", padding: "2px 8px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border-strong)" }}>
            {app.status === "Live" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />}
            {app.status}
          </span>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>{app.platform}</span>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: 0 }}>
          {app.description}
        </p>
      </div>
    </>
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
      <span aria-hidden style={{ fontSize: "1.05em", lineHeight: 1 }}>➔</span>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ═══════ Hero · a big rounded banner over the animated mesh gradient ═══════ */}
      <section>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-6) var(--space-6) 0" }}>
          {/* Light-scoped: the gradient is a light surface, so the ink stays
              dark inside the banner regardless of the site theme. */}
          <div
            data-theme="light"
            style={{
              position: "relative",
              borderRadius: "calc(var(--radius-xl) * 1.6)",
              overflow: "hidden",
              padding: "clamp(48px, 7vw, 104px) clamp(28px, 5vw, 72px)",
            }}
          >
            <HeroShader />
            <div style={{ position: "relative", zIndex: 1 }}>
        <div className="home-hero">
          <Reveal style={{ paddingTop: 0 }}>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.04,
                color: "var(--color-fg)",
                maxWidth: "14ch",
                margin: "0 0 var(--space-6)",
              }}
            >
              Designing Interfaces for Vertical Writing Systems
            </h1>

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
                <span aria-hidden style={{ fontSize: "1.05em", lineHeight: 1 }}>➔</span>
              </Link>
            </div>
          </Reveal>

          {/* Vertical writing, writing itself · hidden on narrow screens */}
          <Reveal delay={150} className="home-hero-motif">
            <HeroVerticalMotif />
          </Reveal>
        </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ The System in Motion · self-playing demos ═════════════ */}
      <section>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <Reveal>
            <BentoGrid
              title="Components"
              description="The interaction primitives of a vertical interface · real, accessible React components you copy into your project with one command."
              action={<SectionCta href="/components">All components</SectionCta>}
            />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ Install · copy them into your project ═════════════ */}
      <InstallBanner />

      {/* ══════════════════════════ Applications ═══════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-3)" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: 0, lineHeight: 1.15 }}>
              Applications
            </h2>
            <SectionCta href="/apps">All applications</SectionCta>
          </div>
          <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-10)", maxWidth: "48ch", lineHeight: 1.65 }}>
            What happens when vertical-first thinking is applied to actual product categories.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "var(--space-4)" }}>
          {APPLICATIONS.map((app, i) => (
            <Reveal key={app.id} delay={i * 70}>
              {app.href ? (
                <Beam>
                  <Link
                    href={app.href}
                    className="card-hover"
                    style={{
                      display: "block",
                      borderRadius: "var(--radius-xl)",
                      // width/style only — the `border` shorthand would reset
                      // border-color to currentColor over .card-hover's token
                      borderWidth: 1,
                      borderStyle: "solid",
                      overflow: "hidden",
                    }}
                  >
                    <AppCardContent app={app} />
                  </Link>
                </Beam>
              ) : (
                <div
                  style={{
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-bg)",
                    overflow: "hidden",
                  }}
                >
                  <AppCardContent app={app} />
                </div>
              )}
            </Reveal>
          ))}
        </div>

      </section>

      {/* ═══════════════════ Challenges + Principles (merged) ══════════════════ */}
      <section>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-3)" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: 0, lineHeight: 1.15 }}>
              What This Project Explores
            </h2>
            <SectionCta href="/challenges">All challenges</SectionCta>
          </div>
          <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-12)", maxWidth: "52ch", lineHeight: 1.65 }}>
            Open questions, and the principles derived from trying to answer them.
          </p>
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

      {/* ═══════ Contact · white fading into a light-blue cloud, footer continues it ═══════ */}
      <section
        id="contact"
        className="cloud-fade"
        style={{ scrollMarginTop: 72 }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
