import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vertically Works — Designing Interfaces for Vertical Writing Systems",
  description:
    "A living design system exploring interaction patterns for vertical interfaces. Not typography — interaction.",
};

const CHALLENGES = [
  {
    id: "motion-direction",
    question: "Should a sheet animate from screen geometry or reading direction?",
    description:
      "When a bottom sheet slides up in a horizontal interface, the direction is obvious. In a vertical, RTL interface, what is the natural axis of dismissal?",
    tag: "Motion",
  },
  {
    id: "mixed-language",
    question: "How should mixed CJK and Latin content behave in the same column?",
    description:
      "A verse reference like 「창 1:1」 contains hangul, Latin digits, and CJK brackets. Each glyph needs different orientation rules.",
    tag: "Typography",
  },
  {
    id: "navigation-direction",
    question: "Where does the navigation rail belong in a vertical-first interface?",
    description:
      "Horizontal apps put navigation at the bottom. Vertical reading flows right-to-left. The natural rail position is left? Right? Neither?",
    tag: "Navigation",
  },
  {
    id: "selection",
    question: "How does text selection work when reading flows top-to-bottom, right-to-left?",
    description:
      "Click-drag selection assumes left-to-right baseline. Vertical selection must handle RTL column ordering and tate-chu-yoko digit groups.",
    tag: "Interaction",
  },
];

const PRINCIPLES = [
  {
    id: "reading-flow",
    title: "Respect Reading Flow",
    description: "Every motion, hierarchy, and interaction begins with how the reader moves through content — not convention.",
  },
  {
    id: "motion-meaning",
    title: "Motion Has Meaning",
    description: "Animations should reinforce reading direction. Nothing animates because it looks nice.",
  },
  {
    id: "interaction-first",
    title: "Interaction Before Typography",
    description: "The purpose is not beautiful text. It is behavior. Typography enables interaction.",
  },
  {
    id: "mixed-first",
    title: "Mixed Language First",
    description: "Designing for CJK alone is insufficient. Real content mixes scripts. Design for the edge case, not the average.",
  },
  {
    id: "accessibility",
    title: "Accessibility Is Fundamental",
    description: "Keyboard, touch, screen reader, and reduced motion are not afterthoughts — they are part of the interaction model.",
  },
  {
    id: "document-uncertainty",
    title: "Research Never Ends",
    description: "Many questions have no correct answer yet. Document open questions alongside resolved ones.",
  },
];

const APPLICATIONS = [
  {
    id: "vertically-verse",
    name: "Vertically Verse",
    description:
      "A fully vertical, right-to-left scripture reader for Korean, Japanese, and Chinese. Every control, gesture, and transition rethought for the top→bottom, R→L axis.",
    status: "Live",
    platform: "iOS",
    href: "/applications/vertically-verse",
    icon: "聖",
  },
  {
    id: "music",
    name: "Music",
    description: "How should playback controls and album art behave in a vertical interface?",
    status: "Planned",
    platform: "Concept",
    href: "/applications/music",
    icon: "楽",
  },
  {
    id: "messaging",
    name: "Messaging",
    description: "Should chat bubbles stack vertically? Where does the input field belong?",
    status: "Planned",
    platform: "Concept",
    href: "/applications/messaging",
    icon: "語",
  },
  {
    id: "maps",
    name: "Maps",
    description: "How do directional labels and navigation instructions adapt to a vertical reading axis?",
    status: "Planned",
    platform: "Concept",
    href: "/applications/maps",
    icon: "地",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.75rem",
        fontWeight: 500,
        color: "var(--color-fg-subtle)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: "var(--space-4)",
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2
      style={{
        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
        fontWeight: 600,
        letterSpacing: "-0.03em",
        color: "var(--color-fg)",
        margin: "0 0 var(--space-3)",
        lineHeight: 1.15,
      }}
    >
      {children}
    </h2>
  );
}

function SectionDesc({ children }: { children: string }) {
  return (
    <p
      style={{
        fontSize: "1rem",
        color: "var(--color-fg-muted)",
        margin: "0 0 var(--space-12)",
        maxWidth: "48ch",
        lineHeight: 1.65,
      }}
    >
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════ Hero ══════════════════════════════════ */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(64px, 10vw, 128px) var(--space-6) clamp(80px, 12vw, 160px)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "start",
          gap: "var(--space-16)",
        }}
      >
        <div>
          <p
            className="animate-fade-up"
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-fg-subtle)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 500,
              margin: "0 0 var(--space-6)",
            }}
          >
            Design System · Vertical Writing Systems
          </p>

          <h1
            className="animate-fade-up delay-1"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              color: "var(--color-fg)",
              maxWidth: "14ch",
              margin: "0 0 var(--space-8)",
            }}
          >
            Designing Interfaces for Vertical Writing Systems
          </h1>

          <p
            className="animate-fade-up delay-2"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--color-fg-muted)",
              lineHeight: 1.65,
              maxWidth: "44ch",
              margin: "0 0 var(--space-10)",
            }}
          >
            A living design system exploring interaction patterns for vertical interfaces.
            Not typography — interaction.
          </p>

          <div
            className="animate-fade-up delay-3"
            style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", alignItems: "center" }}
          >
            <Link
              href="/components"
              className="btn-primary-hover"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                padding: "0 var(--space-5)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                background: "var(--color-fg)",
                color: "var(--color-bg)",
              }}
            >
              Explore Components
            </Link>

            <Link
              href="/playground"
              className="btn-outline-hover"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                padding: "0 var(--space-5)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                border: "1px solid",
                color: "var(--color-fg)",
              }}
            >
              Open Playground
            </Link>

            <Link
              href="/applications/vertically-verse"
              className="link-muted-hover"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                padding: "0 var(--space-3)",
                fontSize: "0.9375rem",
                fontWeight: 500,
              }}
            >
              View Vertically Verse →
            </Link>
          </div>
        </div>

        {/* Vertical text — a live demo of the concept */}
        <div
          className="animate-fade-up delay-4"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-4)",
            paddingTop: "var(--space-8)",
            userSelect: "none",
          }}
          aria-hidden
        >
          <span style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.18em", color: "var(--color-fg)", lineHeight: 1 }}>
            縦書き
          </span>
          <span style={{ width: 1, height: 20, background: "var(--color-border-strong)", display: "block", flexShrink: 0 }} />
          <span style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.18em", color: "var(--color-fg-muted)", lineHeight: 1 }}>
            세로쓰기
          </span>
          <span style={{ width: 1, height: 20, background: "var(--color-border)", display: "block", flexShrink: 0 }} />
          <span style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.18em", color: "var(--color-fg-subtle)", lineHeight: 1 }}>
            竖排
          </span>
        </div>
      </section>

      {/* ═══════════════════════════ The Question ══════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(48px, 8vw, 96px) var(--space-6)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1.25rem, 3vw, 2rem)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.45,
              color: "var(--color-fg)",
              maxWidth: "34ch",
              margin: "0 0 var(--space-5)",
            }}
          >
            &ldquo;If digital interfaces had been invented around vertical writing systems,
            what would software look like today?&rdquo;
          </p>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-fg-muted)",
              margin: 0,
              maxWidth: "52ch",
              lineHeight: 1.7,
            }}
          >
            That question affects navigation, motion, hierarchy, selection, scrolling, animation, components, and AI.
            The answer is not rotating existing interfaces. It requires rethinking interaction itself.
          </p>
        </div>
      </section>

      {/* ══════════════════════════ Applications ═══════════════════════════════ */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(48px, 8vw, 96px) var(--space-6)",
        }}
      >
        <SectionLabel>Applications</SectionLabel>
        <SectionTitle>Real Implementations</SectionTitle>
        <SectionDesc>What happens when vertical-first thinking is applied to actual product categories.</SectionDesc>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--space-4)" }}>
          {APPLICATIONS.map((app) => (
            <Link
              key={app.id}
              href={app.href}
              className="card-hover"
              style={{
                display: "block",
                padding: "var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid",
              }}
            >
              <div
                style={{
                  width: 44, height: 44,
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-bg-muted)",
                  border: "1px solid var(--color-border)",
                  marginBottom: "var(--space-5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.25rem", color: "var(--color-fg-muted)",
                }}
                aria-hidden
              >
                {app.icon}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>
                  {app.name}
                </span>
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: "0.6875rem", fontWeight: 500,
                    color: app.status === "Live" ? "var(--color-fg)" : "var(--color-fg-subtle)",
                    padding: "2px 8px", borderRadius: "var(--radius-full)", border: "1px solid",
                    borderColor: app.status === "Live" ? "var(--color-border-strong)" : "var(--color-border)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {app.status === "Live" && (
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0 }} />
                  )}
                  {app.status}
                </span>
              </div>

              <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: "0 0 var(--space-5)" }}>
                {app.description}
              </p>
              <span style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)" }}>{app.platform}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ Challenges ════════════════════════════════ */}
      <section style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-subtle)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <SectionLabel>Challenges</SectionLabel>
          <SectionTitle>Why Vertical Interfaces Are Difficult</SectionTitle>
          <SectionDesc>Design problems with no obvious answer when the reading axis changes.</SectionDesc>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {CHALLENGES.map((challenge, i) => (
              <Link
                key={challenge.id}
                href={`/challenges/${challenge.id}`}
                className="card-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: "var(--space-5)",
                  padding: "var(--space-5) var(--space-6)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid",
                  alignItems: "start",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", paddingTop: 3 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span style={{ display: "inline-block", fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-2)" }}>
                    {challenge.tag}
                  </span>
                  <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--color-fg)", margin: "0 0 var(--space-2)", letterSpacing: "-0.01em", lineHeight: 1.45 }}>
                    {challenge.question}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.65 }}>
                    {challenge.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "var(--space-8)" }}>
            <Link href="/challenges" className="link-muted-hover" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
              View all challenges →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ Principles ════════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
        <SectionLabel>Principles</SectionLabel>
        <SectionTitle>Guidance from Observation</SectionTitle>
        <SectionDesc>Not opinions. Patterns derived from building real interfaces on the vertical axis.</SectionDesc>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-4)" }}>
          {PRINCIPLES.map((p) => (
            <Link
              key={p.id}
              href={`/principles/${p.id}`}
              className="card-hover"
              style={{
                display: "block",
                padding: "var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid",
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-3)", letterSpacing: "-0.01em" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.65 }}>
                {p.description}
              </p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "var(--space-8)" }}>
          <Link href="/principles" className="link-muted-hover" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
            View all principles →
          </Link>
        </div>
      </section>

      {/* ══════════════════════ Featured Components ═════════════════════════════ */}
      <section style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-subtle)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <SectionLabel>Components</SectionLabel>
          <SectionTitle>Interaction Primitives</SectionTitle>
          <SectionDesc>Reusable components with documented reasoning. Every one answers a design question.</SectionDesc>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-4)" }}>
            {/* Button */}
            <Link
              href="/components/button"
              className="card-hover-border"
              style={{
                display: "flex", flexDirection: "column",
                padding: "var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid",
                background: "var(--color-bg)",
                gap: "var(--space-5)",
              }}
            >
              <div style={{ height: 96, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "var(--space-5)", borderRadius: "var(--radius-lg)", background: "var(--color-bg-subtle)", border: "1px solid var(--color-border)", gap: "var(--space-3)" }}>
                <div style={{ writingMode: "vertical-rl", padding: "var(--space-3) var(--space-3)", background: "var(--color-fg)", color: "var(--color-bg)", borderRadius: "var(--radius-lg)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.05em" }}>다음 장</div>
                <div style={{ writingMode: "vertical-rl", padding: "var(--space-3) var(--space-3)", border: "1px solid var(--color-border-strong)", borderRadius: "var(--radius-lg)", fontSize: "0.875rem", color: "var(--color-fg)", letterSpacing: "0.05em" }}>이전 장</div>
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "var(--space-2)" }}>Actions</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-2)", letterSpacing: "-0.01em" }}>Button</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>Where does the label sit relative to the touch target when the button is oriented for a vertical layout?</p>
              </div>
            </Link>

            {/* Navigation Rail */}
            <Link
              href="/components/navigation-rail"
              className="card-hover-border"
              style={{
                display: "flex", flexDirection: "column",
                padding: "var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid",
                background: "var(--color-bg)",
                gap: "var(--space-5)",
              }}
            >
              <div style={{ height: 96, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "var(--space-5)", borderRadius: "var(--radius-lg)", background: "var(--color-bg-subtle)", border: "1px solid var(--color-border)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "var(--space-2)", background: "var(--color-bg)" }}>
                  {["書", "検", "設"].map((char, i) => (
                    <div key={i} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-md)", background: i === 0 ? "var(--color-fg)" : "transparent", color: i === 0 ? "var(--color-bg)" : "var(--color-fg-muted)", fontSize: "1rem" }}>{char}</div>
                  ))}
                </div>
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "var(--space-2)" }}>Navigation</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-2)", letterSpacing: "-0.01em" }}>Navigation Rail</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>Should the navigation axis be horizontal or vertical in a vertical-reading interface?</p>
              </div>
            </Link>

            {/* Tooltip */}
            <Link
              href="/components/tooltip"
              className="card-hover-border"
              style={{
                display: "flex", flexDirection: "column",
                padding: "var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid",
                background: "var(--color-bg)",
                gap: "var(--space-5)",
              }}
            >
              <div style={{ height: 96, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "var(--space-5)", borderRadius: "var(--radius-lg)", background: "var(--color-bg-subtle)", border: "1px solid var(--color-border)" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "var(--space-2)" }}>
                  <div style={{ padding: "var(--space-1) var(--space-3)", background: "var(--color-fg)", color: "var(--color-bg)", borderRadius: "var(--radius-md)", fontSize: "0.8125rem", whiteSpace: "nowrap" }}>창세기 1장</div>
                  <div style={{ width: 1, height: 8, background: "var(--color-border-strong)", marginLeft: "var(--space-3)" }} />
                  <div style={{ writingMode: "vertical-rl", padding: "var(--space-2) var(--space-3)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", fontSize: "0.875rem", color: "var(--color-fg-muted)" }}>창 1:1</div>
                </div>
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "var(--space-2)" }}>Overlays</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-2)", letterSpacing: "-0.01em" }}>Tooltip</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>Which direction should a tooltip expand when the baseline is vertical?</p>
              </div>
            </Link>
          </div>

          <div style={{ marginTop: "var(--space-8)" }}>
            <Link href="/components" className="link-muted-hover" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
              View all components →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ Playground Teaser ══════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
        <div
          style={{
            padding: "clamp(32px, 6vw, 64px) clamp(24px, 4vw, 48px)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-subtle)",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: "var(--space-16)",
            overflow: "hidden",
          }}
        >
          <div>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-4)" }}>
              Coming Soon
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-4)" }}>
              Playground
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-6)", lineHeight: 1.65, maxWidth: "42ch" }}>
              Experiment with writing direction, language, animation speed, and layout in real time.
              Compare how the same interface behaves across vertical and horizontal axes.
            </p>
            <Link
              href="/playground"
              className="btn-subtle-hover"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                padding: "0 var(--space-5)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                border: "1px solid",
                color: "var(--color-fg)",
              }}
            >
              Preview Playground
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--space-6)",
              writingMode: "vertical-rl",
              fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
              letterSpacing: "0.12em",
              lineHeight: 1.9,
              userSelect: "none",
            }}
            aria-hidden
          >
            <span style={{ color: "var(--color-fg)" }}>太初、神が天と地を創造された</span>
            <span style={{ color: "var(--color-fg-muted)" }}>태초에 하나님이 천지를 창조하시니라</span>
            <span style={{ color: "var(--color-fg-subtle)" }}>起初　神創造天地</span>
          </div>
        </div>
      </section>
    </>
  );
}
