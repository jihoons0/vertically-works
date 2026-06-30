import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vertically Works — Designing Interfaces for Vertical Writing Systems",
  description: "A living design system exploring interaction patterns for vertical interfaces. Not typography — interaction.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPLICATIONS = [
  {
    id: "vertically-verse",
    name: "Vertically Verse",
    platform: "iOS",
    status: "Live",
    icon: "聖",
    externalHref: "https://github.com/jihoons/exploring",
    hasVideo: true,
    description:
      "A fully vertical, right-to-left scripture reader for Korean, Japanese, and Chinese. Every control, gesture, and transition rethought for the top→bottom, R→L axis.",
  },
  {
    id: "music",
    name: "Music",
    status: "Coming soon",
    icon: "楽",
    description: "How should playback controls and album art behave in a vertical interface?",
  },
  {
    id: "messaging",
    name: "Messaging",
    status: "Coming soon",
    icon: "語",
    description: "Should chat bubbles stack vertically? Where does the input field belong?",
  },
  {
    id: "maps",
    name: "Maps",
    status: "Coming soon",
    icon: "地",
    description: "How do directional labels and navigation instructions adapt to a vertical reading axis?",
  },
];

// Challenges and Principles merged — no sub-pages, content lives here
const CHALLENGES = [
  {
    id: "motion-direction",
    tag: "Motion",
    question: "Should a sheet animate from screen geometry or reading direction?",
    why: "In horizontal UIs the answer is obvious — gravity and screen edges align. Rotate the reading axis and they diverge. A sheet that slides up feels natural on a vertical phone, but in an RTL column layout the same animation travels against the direction the reader just came from. Getting this wrong creates a directional contradiction that breaks flow even when the user can't name it.",
  },
  {
    id: "mixed-language",
    tag: "Typography",
    question: "How should mixed CJK and Latin content behave in the same column?",
    why: "Real documents don't contain pure CJK. Every verse reference, date, and proper noun mixes scripts. Each character class — hangul, kanji, Latin digit, ASCII punctuation — has a different correct orientation in a vertical column. Unicode defines this per-character, but most UI frameworks ignore it entirely, leaving digit strings rotated sideways and punctuation in the wrong position.",
  },
  {
    id: "navigation-direction",
    tag: "Navigation",
    question: "Where does the navigation rail belong in a vertical-first interface?",
    why: "Bottom navigation exists because thumbs reach down and horizontal apps read left-to-right. Change both axes and the argument breaks. A vertical RTL reading interface has its primary axis running down each column, and its progression axis running right-to-left. Neither of those maps cleanly to a bottom rail or a left sidebar. The \"natural\" position is genuinely unknown.",
  },
  {
    id: "selection",
    tag: "Interaction",
    question: "How does text selection work when reading flows top-to-bottom, right-to-left?",
    why: "OS text selection was designed for left-to-right baselines. Dragging to select assumes horizontal anchor points. In a vertical, RTL column layout the anchor is at the top of a column and the selection must cross column breaks rightward. Tate-chu-yoko digit groups behave as single units. The selection rectangle model breaks entirely.",
  },
];

const PRINCIPLES = [
  { id: "reading-flow", title: "Respect Reading Flow", description: "Every motion, hierarchy, and interaction begins with how the reader moves through content — not convention." },
  { id: "motion-meaning", title: "Motion Has Meaning", description: "Animations reinforce reading direction. Nothing animates because it looks nice." },
  { id: "interaction-first", title: "Interaction Before Typography", description: "The purpose is behavior that matches how people read. Typography enables it — it's not the goal." },
  { id: "mixed-first", title: "Mixed Language First", description: "Design for the edge case — mixed scripts — not the average. Real content always mixes." },
  { id: "accessibility", title: "Accessibility Is Fundamental", description: "Keyboard, touch, screen reader, and reduced motion are part of the interaction model, not afterthoughts." },
  { id: "uncertainty", title: "Research Never Ends", description: "Document open questions alongside resolved ones. Treating uncertainty as closed produces brittle systems." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════ Hero ══════════════════════════════════ */}
      {/* #9: top-align — reduced top padding, content starts near nav */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-16) var(--space-6) clamp(64px, 8vw, 120px)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "start",
          gap: "var(--space-12)",
        }}
      >
        <div style={{ paddingTop: 0 }}>
          <p
            className="animate-fade-up"
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-fg-subtle)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 500,
              margin: "0 0 var(--space-5)",
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
              margin: "0 0 var(--space-6)",
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
              margin: "0 0 var(--space-8)",
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
                display: "inline-flex", alignItems: "center",
                height: 40, padding: "0 var(--space-5)",
                fontSize: "0.9375rem", fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                background: "var(--color-fg)", color: "var(--color-bg)",
              }}
            >
              Explore Components
            </Link>
            <Link
              href="/playground"
              className="btn-outline-hover"
              style={{
                display: "inline-flex", alignItems: "center",
                height: 40, padding: "0 var(--space-5)",
                fontSize: "0.9375rem", fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                border: "1px solid", color: "var(--color-fg)",
              }}
            >
              Open Playground
            </Link>
          </div>
        </div>

        {/* Vertical text — live demo of the concept */}
        <div
          className="animate-fade-up delay-4"
          style={{
            writingMode: "vertical-rl",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-3)",
            userSelect: "none",
          }}
          aria-hidden
        >
          <span style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.18em", color: "var(--color-fg)", lineHeight: 1 }}>縦書き</span>
          <span style={{ width: 1, height: 16, background: "var(--color-border-strong)", display: "block", flexShrink: 0 }} />
          <span style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.18em", color: "var(--color-fg-muted)", lineHeight: 1 }}>세로쓰기</span>
          <span style={{ width: 1, height: 16, background: "var(--color-border)", display: "block", flexShrink: 0 }} />
          <span style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.18em", color: "var(--color-fg-subtle)", lineHeight: 1 }}>竖排</span>
        </div>
      </section>

      {/* ═══════════════════════════ The Question ══════════════════════════════ */}
      {/* #7: 2-column — content left, vertical text right */}
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
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "var(--space-16)",
            alignItems: "center",
          }}
        >
          <div>
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
            <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: 0, maxWidth: "52ch", lineHeight: 1.7 }}>
              That question affects navigation, motion, hierarchy, selection, scrolling, animation, and AI.
              The answer is not rotating existing interfaces. It requires rethinking interaction itself.
            </p>
          </div>

          {/* 3 lines of vertical text as second column */}
          <div
            style={{
              display: "flex",
              gap: "var(--space-5)",
              userSelect: "none",
            }}
            aria-hidden
          >
            <span style={{ writingMode: "vertical-rl", fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.15em", color: "var(--color-fg)", lineHeight: 1 }}>縦書き</span>
            <span style={{ writingMode: "vertical-rl", fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.15em", color: "var(--color-fg-muted)", lineHeight: 1 }}>세로쓰기</span>
            <span style={{ writingMode: "vertical-rl", fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.15em", color: "var(--color-fg-subtle)", lineHeight: 1 }}>竖排</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ Applications ═══════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
        <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-4)" }}>
          Applications
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
          Real Implementations
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-10)", maxWidth: "48ch", lineHeight: 1.65 }}>
          What happens when vertical-first thinking is applied to actual product categories.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {/* #1: Vertically Verse — video placeholder + external link */}
          <Link
            href={APPLICATIONS[0].externalHref!}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 160px",
              gap: "var(--space-8)",
              padding: "var(--space-8)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "-0.02em" }}>
                  Vertically Verse
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg)", padding: "2px 8px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border-strong)" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  Live
                </span>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>iOS</span>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-5)", lineHeight: 1.65, maxWidth: "52ch" }}>
                {APPLICATIONS[0].description}
              </p>
              <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                View on GitHub →
              </span>
            </div>

            {/* Video placeholder — portrait phone ratio */}
            <div
              style={{
                width: 160,
                aspectRatio: "9/16",
                borderRadius: "var(--radius-xl)",
                background: "var(--color-bg-muted)",
                border: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-3)",
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: "var(--color-fg-subtle)" }} aria-hidden>
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" opacity="0.3" />
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", textAlign: "center" }}>Demo video</span>
            </div>
          </Link>

          {/* #2: Other apps — "Coming soon" not "Concept" */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "var(--space-4)" }}>
            {APPLICATIONS.slice(1).map((app) => (
              <div
                key={app.id}
                style={{
                  padding: "var(--space-6)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                }}
              >
                {/* #3: placeholder icon */}
                <div
                  style={{
                    width: 44, height: 44,
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-bg-muted)",
                    border: "1px solid var(--color-border)",
                    marginBottom: "var(--space-5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.25rem", color: "var(--color-fg-subtle)",
                  }}
                  aria-hidden
                >
                  {app.icon}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                  <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>{app.name}</span>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", padding: "2px 8px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)" }}>
                    {app.status}
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: 0 }}>
                  {app.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Challenges + Principles (merged) ══════════════════ */}
      {/* #4 + #5: non-clickable, content inline, combined */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-4)" }}>
            Challenges & Principles
          </span>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
            What This Project Explores
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-12)", maxWidth: "52ch", lineHeight: 1.65 }}>
            Open design questions and the principles we've derived from attempting to answer them.
          </p>

          {/* Challenges — expanded, non-clickable */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-12)" }}>
            {CHALLENGES.map((c, i) => (
              <div
                key={c.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: "var(--space-6)",
                  padding: "var(--space-6) var(--space-8)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", paddingTop: 3 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span style={{ display: "inline-block", fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-2)" }}>
                    {c.tag}
                  </span>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-3)", letterSpacing: "-0.01em", lineHeight: 1.4 }}>
                    {c.question}
                  </p>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.7, maxWidth: "62ch" }}>
                    {c.why}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Principles — compact, non-clickable */}
          <div style={{ marginBottom: "var(--space-4)" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-6)" }}>
              Derived Principles
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-3)" }}>
            {PRINCIPLES.map((p) => (
              <div
                key={p.id}
                style={{
                  padding: "var(--space-5) var(--space-6)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                }}
              >
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-2)", letterSpacing: "-0.01em" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ Components — full-width ══════════════════════════ */}
      {/* #6: full-width stacked demos, not 3-column grid */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
        <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-4)" }}>
          Components
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
          Interaction Primitives
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-10)", maxWidth: "48ch", lineHeight: 1.65 }}>
          Reusable components with documented reasoning. Every one answers a design question.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {/* Button — full width */}
          <Link
            href="/components/button"
            className="card-hover-border"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              border: "1px solid",
              borderRadius: "var(--radius-xl)",
              background: "var(--color-bg)",
              overflow: "hidden",
              minHeight: 200,
            }}
          >
            <div style={{ padding: "var(--space-8)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "var(--space-3)" }}>Actions</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-3)", letterSpacing: "-0.02em" }}>Button</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>Where does the label sit relative to the touch target when the button is oriented for a vertical layout?</p>
            </div>
            <div style={{ background: "var(--color-bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-5)", padding: "var(--space-8)" }}>
              <div style={{ writingMode: "vertical-rl", padding: "var(--space-4) var(--space-4)", background: "var(--color-fg)", color: "var(--color-bg)", borderRadius: "var(--radius-xl)", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.05em" }}>다음 장</div>
              <div style={{ writingMode: "vertical-rl", padding: "var(--space-4) var(--space-4)", border: "1.5px solid var(--color-border-strong)", borderRadius: "var(--radius-xl)", fontSize: "1rem", color: "var(--color-fg)", letterSpacing: "0.05em" }}>이전 장</div>
              <div style={{ writingMode: "vertical-rl", padding: "var(--space-3) var(--space-3)", background: "var(--color-bg-muted)", borderRadius: "var(--radius-lg)", fontSize: "0.875rem", color: "var(--color-fg-muted)", letterSpacing: "0.05em" }}>설정</div>
            </div>
          </Link>

          {/* Navigation Rail — full width */}
          <Link
            href="/components/navigation-rail"
            className="card-hover-border"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              border: "1px solid",
              borderRadius: "var(--radius-xl)",
              background: "var(--color-bg)",
              overflow: "hidden",
              minHeight: 200,
            }}
          >
            <div style={{ padding: "var(--space-8)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "var(--space-3)" }}>Navigation</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-3)", letterSpacing: "-0.02em" }}>Navigation Rail</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>Should the primary navigation axis align with or cross the reading direction?</p>
            </div>
            <div style={{ background: "var(--color-bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-8)", padding: "var(--space-8)" }}>
              {/* Vertical rail */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "var(--space-3)", background: "var(--color-bg)" }}>
                {[{ char: "書", active: true }, { char: "検", active: false }, { char: "設", active: false }].map((item, i) => (
                  <div key={i} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-lg)", background: item.active ? "var(--color-fg)" : "transparent", color: item.active ? "var(--color-bg)" : "var(--color-fg-muted)", fontSize: "1.125rem" }}>{item.char}</div>
                ))}
              </div>
              {/* vs horizontal bottom bar */}
              <div style={{ display: "flex", flexDirection: "row", gap: "var(--space-2)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "var(--space-3)", background: "var(--color-bg)" }}>
                {[{ char: "書", active: false }, { char: "検", active: true }, { char: "設", active: false }].map((item, i) => (
                  <div key={i} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-lg)", background: item.active ? "var(--color-fg)" : "transparent", color: item.active ? "var(--color-bg)" : "var(--color-fg-muted)", fontSize: "1.125rem" }}>{item.char}</div>
                ))}
              </div>
            </div>
          </Link>

          {/* Tooltip — full width */}
          <Link
            href="/components/tooltip"
            className="card-hover-border"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              border: "1px solid",
              borderRadius: "var(--radius-xl)",
              background: "var(--color-bg)",
              overflow: "hidden",
              minHeight: 200,
            }}
          >
            <div style={{ padding: "var(--space-8)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "var(--space-3)" }}>Overlays</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-3)", letterSpacing: "-0.02em" }}>Tooltip</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>Which direction should a tooltip expand when the baseline is vertical? Below the trigger reads horizontally. To the left follows reading direction.</p>
            </div>
            <div style={{ background: "var(--color-bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-10)", padding: "var(--space-8)" }}>
              {/* Option A: tooltip below */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
                <div style={{ writingMode: "vertical-rl", padding: "var(--space-2) var(--space-3)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontSize: "0.875rem", color: "var(--color-fg-muted)" }}>창 1:1</div>
                <div style={{ width: 1, height: 10, background: "var(--color-border-strong)" }} />
                <div style={{ padding: "var(--space-1) var(--space-3)", background: "var(--color-fg)", color: "var(--color-bg)", borderRadius: "var(--radius-md)", fontSize: "0.75rem", whiteSpace: "nowrap" }}>창세기 1장</div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", marginTop: "var(--space-1)" }}>below</span>
              </div>
              {/* Option B: tooltip to left */}
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "var(--space-2)" }}>
                <div style={{ padding: "var(--space-1) var(--space-3)", background: "var(--color-fg)", color: "var(--color-bg)", borderRadius: "var(--radius-md)", fontSize: "0.75rem", whiteSpace: "nowrap" }}>창세기 1장</div>
                <div style={{ width: 10, height: 1, background: "var(--color-border-strong)" }} />
                <div>
                  <div style={{ writingMode: "vertical-rl", padding: "var(--space-2) var(--space-3)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontSize: "0.875rem", color: "var(--color-fg-muted)" }}>창 1:1</div>
                  <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", display: "block", marginTop: "var(--space-1)", textAlign: "center" }}>left</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div style={{ marginTop: "var(--space-8)" }}>
          <Link href="/components" className="link-muted-hover" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
            View all components →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════ Playground Teaser ══════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <div
            style={{
              padding: "clamp(32px, 6vw, 64px) clamp(24px, 4vw, 48px)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
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
              <Link href="/playground" className="btn-subtle-hover" style={{ display: "inline-flex", alignItems: "center", height: 40, padding: "0 var(--space-5)", fontSize: "0.9375rem", fontWeight: 500, borderRadius: "var(--radius-lg)", border: "1px solid", color: "var(--color-fg)" }}>
                Preview Playground
              </Link>
            </div>

            <div
              style={{ display: "flex", gap: "var(--space-6)", userSelect: "none" }}
              aria-hidden
            >
              <span style={{ writingMode: "vertical-rl", fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)", letterSpacing: "0.12em", lineHeight: 1.9, color: "var(--color-fg)" }}>太初、神が天と地を創造された</span>
              <span style={{ writingMode: "vertical-rl", fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)", letterSpacing: "0.12em", lineHeight: 1.9, color: "var(--color-fg-muted)" }}>태초에 하나님이 천지를 창조하시니라</span>
              <span style={{ writingMode: "vertical-rl", fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)", letterSpacing: "0.12em", lineHeight: 1.9, color: "var(--color-fg-subtle)" }}>起初　神創造天地</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
