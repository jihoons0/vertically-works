import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ChallengeVisual } from "@/components/ChallengeVisual";
import { PlaygroundClient } from "@/components/PlaygroundClient";
import { BentoGrid } from "@/components/home/BentoGrid";
import { HeroVerticalMotif } from "@/components/home/HeroVerticalMotif";
import { InstallCommand } from "@/components/ui/InstallCommand";
import { AppVideo } from "@/components/home/AppVideo";
import { Beam } from "@/components/ui/Beam";

export const metadata: Metadata = {
  title: "Vertically Works — Designing Interfaces for Vertical Writing Systems",
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
      "A fully vertical, right-to-left scripture reader for Korean, Japanese, and Chinese. Every control, gesture, and transition rethought for the top→bottom, R→L axis.",
  },
  {
    id: "notes",
    name: "Vertically Do",
    platform: "Web",
    status: "Live",
    href: "/apps/vertically-do",
    video: null,
    description:
      "A to-do list where tasks are columns read top→bottom. Drag a column down to delete, sideways to reorder — and flip the whole interface across 한 / あ / 中.",
  },
  {
    id: "listen",
    name: "Vertically Listen",
    platform: "Web",
    status: "Live",
    href: "/apps/vertically-listen",
    video: null,
    description:
      "A podcast player where today's top CJK shows stack as a shelf of full-height columns, and time-synced transcripts fall as vertical verse. Reading stays vertical; transport stays horizontal.",
  },
];

// Challenges — all eight, animated; full write-ups live on /challenges
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
      {/* Media slot — full-bleed video when we have one, phone-frame placeholder otherwise */}
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

          {/* Vertical writing, writing itself — hidden on narrow screens */}
          <Reveal delay={150} className="home-hero-motif">
            <HeroVerticalMotif />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ The System in Motion — self-playing demos ═════════════ */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
              Components
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-10)", maxWidth: "56ch", lineHeight: 1.65 }}>
              The interaction primitives of a vertical interface — buttons, toggles,
              dialogs, lists — each answering a design question the horizontal web never
              had to. Real, accessible React components you copy into your project with one
              command. Below, four of them replay as they behave on the reading axis.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <BentoGrid />
          </Reveal>

          <div style={{ marginTop: "var(--space-10)", display: "flex", flexDirection: "column", gap: "var(--space-4)", alignItems: "flex-start" }}>
            <InstallCommand command="npx verticallyworks init" />
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
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
              <a
                href="https://github.com/jihoons0/vertically-works"
                target="_blank"
                rel="noopener noreferrer"
                className="link-muted-hover"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.875rem", fontWeight: 500, color: "var(--color-fg-muted)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub ↗
              </a>
            </div>
          </div>
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

          {/* Challenges — all eight, each card acting out its question */}
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

          {/* Principles — numbered, one pass to scan */}
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

      {/* ═══════════════════ Playground — embedded, try it here ══════════════════ */}
      <section
        id="playground"
        style={{
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
          scrollMarginTop: 72,
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
              Playground
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-8)", maxWidth: "52ch", lineHeight: 1.65 }}>
              The full playground, embedded. Language, writing and reading direction, theme,
              device, and type size — every control updates the canvas live.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <PlaygroundClient embedded />
          </Reveal>

          <div style={{ marginTop: "var(--space-8)" }}>
            <Link
              href="/playground"
              className="btn-cta-hover pressable"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 var(--space-5)",
                fontSize: "0.9375rem", fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                border: "1px solid", color: "var(--color-fg)",
              }}
            >
              Open the full playground →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
