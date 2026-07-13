import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ChallengeVisual } from "@/components/ChallengeVisual";
import { BentoGrid } from "@/components/home/BentoGrid";
import { HeroVerticalMotif } from "@/components/home/HeroVerticalMotif";
import { InstallCard } from "@/components/ui/InstallCard";
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
    video: null,
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
          <div
            style={{
              height: 332,
              aspectRatio: "2/3",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-3)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: "var(--color-fg-subtle)" }} aria-hidden>
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" opacity="0.3" />
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", textAlign: "center" }}>Demo coming soon</span>
          </div>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════ Hero ══════════════════════════════════ */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-16) var(--space-6) clamp(56px, 7vw, 104px)",
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
                  display: "inline-flex", alignItems: "center",
                  height: 40, padding: "0 var(--space-5)",
                  fontSize: "0.9375rem", fontWeight: 500,
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid", color: "var(--color-fg)",
                }}
              >
                See the apps →
              </Link>
            </div>
          </Reveal>

          {/* Vertical writing, writing itself · hidden on narrow screens */}
          <Reveal delay={150} className="home-hero-motif">
            <HeroVerticalMotif />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ The System in Motion · self-playing demos ═════════════ */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <Reveal>
            <BentoGrid
              title="Components"
              description="The interaction primitives of a vertical interface · buttons, toggles, dialogs, lists · each answering a design question the horizontal web never had to. Real, accessible React components you copy into your project with one command. Below, four of them replay as they behave on the reading axis."
            />
          </Reveal>

          <div style={{ marginTop: "var(--space-10)" }}>
            <Link
              href="/components"
              className="btn-cta-hover pressable"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 var(--space-5)",
                fontSize: "0.9375rem", fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                border: "1px solid", color: "var(--color-fg)",
              }}
            >
              View all components →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Install · copy them into your project ═════════════ */}
      <section style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-subtle)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
              Bring them into your project
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-8)", maxWidth: "52ch", lineHeight: 1.65 }}>
              Every component is source you own · no runtime dependency. Run{" "}
              <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>init</code> once for the tokens, then{" "}
              <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>add</code> any component · fetched live from the registry, nothing to configure.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ maxWidth: 560 }}>
              <InstallCard command="npx verticallyworks init" github="https://github.com/jihoons0/vertically-works" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════ Applications ═══════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
        <Reveal>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
            Applications
          </h2>
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
                      border: "1px solid",
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

        <div style={{ marginTop: "var(--space-8)" }}>
          <Link
            href="/apps"
            className="btn-cta-hover pressable"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              height: 40, padding: "0 var(--space-5)",
              fontSize: "0.9375rem", fontWeight: 500,
              borderRadius: "var(--radius-lg)",
              border: "1px solid", color: "var(--color-fg)",
            }}
          >
            All applications →
          </Link>
        </div>
      </section>

      {/* ═══════════════════ Challenges + Principles (merged) ══════════════════ */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <Reveal>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
            What This Project Explores
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-12)", maxWidth: "52ch", lineHeight: 1.65 }}>
            Open questions, and the principles derived from trying to answer them.
          </p>
          </Reveal>

          {/* Challenges · all eight, each card acting out its question */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: "var(--space-4)",
              marginBottom: "var(--space-16)",
            }}
          >
            {CHALLENGES.map((c, i) => (
              <Reveal
                key={c.id}
                delay={(i % 3) * 60}
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
          <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-8)" }}>
            Derived Principles
          </span>
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

    </>
  );
}
