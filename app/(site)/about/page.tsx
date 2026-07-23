import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InstallBanner } from "@/components/ui/InstallBanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "A living study by Jihoon Suh of what interface design becomes when reading flows top to bottom, right to left.",
};

const ESSAY_URL =
  "https://uxdesign.cc/vertically-works-design-exploration-on-vertical-typography-75164eed11a8";

const FAQ = [
  {
    q: "Isn't most digital CJK text horizontal anyway?",
    a: "Yes, and that's the point. Korean went almost fully horizontal within living memory, and Japanese and Chinese screens default to horizontal too. But vertical setting never died: novels, manga, scripture, newspapers, signage. The toolchain picks the axis now, not the designer. This project exists so the choice can be real again.",
  },
  {
    q: "Why not just rotate existing components?",
    a: "Rotation moves pixels, not behavior. A rotated toggle animates on the wrong axis. Rotated text stops being text: selection breaks, screen readers read the wrong order, IME composition falls apart. Everything here is built on true writing-mode: vertical-rl, so text stays selectable, searchable, and accessible, and motion, focus, and gesture are designed for the axis instead of spun ninety degrees.",
  },
  {
    q: "Does this work with keyboards and screen readers?",
    a: (
      <>
        It is the hardest part, so I build it in from the start. The arrow keys remap (down for the
        next character, left for the next line), focus traverses columns right to left, and every
        duration collapses to zero under prefers-reduced-motion. Each component documents its
        accessibility behavior, and what is still unsolved sits in{" "}
        <Link
          href="/challenges"
          style={{ color: "var(--color-fg)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Challenges
        </Link>
        , not hidden.
      </>
    ),
  },
  {
    q: "Can I use this in production?",
    a: "The components are MIT-licensed source you copy and own, with zero runtime dependencies. Nothing to lock into, nothing to break under you. The system is young, though. Treat it like early shadcn/ui: read the source, adapt it, and file what you find.",
  },
];

const linkStyle = {
  color: "var(--color-fg)",
  fontWeight: 500,
  textDecoration: "underline",
  textUnderlineOffset: 3,
} as const;

const paragraph = {
  fontSize: "1.0625rem",
  color: "var(--color-fg-muted)",
  lineHeight: 1.75,
  margin: "0 0 var(--space-6)",
} as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About this project" />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-12) var(--space-6) var(--space-24)" }}>
        <div className="about-layout">
          {/* Byline · a small right-hand column beside the body; stacks on top on narrow screens */}
          <aside className="about-aside">
            <div
              style={{
                padding: "var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-subtle)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", alignItems: "flex-start" }}>
                <img
                  src="/images/jihoon-avatar.jpg"
                  alt="Jihoon Suh"
                  width={52}
                  height={52}
                  style={{ borderRadius: "50%", display: "block", flexShrink: 0, border: "1px solid var(--color-border)" }}
                />
                <p style={{ fontSize: "0.9375rem", color: "var(--color-fg)", lineHeight: 1.7, margin: 0 }}>
                  A living study by <strong style={{ fontWeight: 600 }}>Jihoon Suh</strong>. Started
                  in 2019 as an essay asking one question: can vertical type work in user interface?
                  Seven years later, this is the answer in progress.
                </p>
              </div>
              <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", marginTop: "var(--space-5)" }}>
                <Link href={ESSAY_URL} target="_blank" rel="noopener noreferrer" className="link-muted-hover" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.875rem", fontWeight: 500 }}>
                  The original essay <ArrowUpRight size={13} strokeWidth={2.25} aria-hidden />
                </Link>
                <Link href="https://jihoonsuh.com" target="_blank" rel="noopener noreferrer" className="link-muted-hover" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.875rem", fontWeight: 500 }}>
                  jihoonsuh.com <ArrowUpRight size={13} strokeWidth={2.25} aria-hidden />
                </Link>
              </div>
            </div>

            {/* Also read · sits under the byline in the right column */}
            <div style={{ marginTop: "var(--space-8)" }}>
              <h2 style={{ fontFamily: "var(--font-site-sans)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 var(--space-4)" }}>
                Also read
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {[
                  { href: "/challenges", title: "Challenges", gloss: "Design problems with no obvious answer once the reading axis changes." },
                  { href: "/principles", title: "Principles", gloss: "Rules I settled on while building on the vertical axis." },
                ].map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="card-hover"
                    style={{ display: "block", padding: "var(--space-4) var(--space-5)", borderRadius: "var(--radius-xl)", borderWidth: 1, borderStyle: "solid" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
                      <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.01em" }}>
                        {r.title}
                      </h3>
                      <ArrowRight size={15} strokeWidth={2.25} aria-hidden style={{ color: "var(--color-fg-subtle)", flexShrink: 0 }} />
                    </div>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.55 }}>
                      {r.gloss}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <div className="about-body">
            {/* Story */}
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-6)", lineHeight: 1.2 }}>
              Where this came from
            </h2>

            <p style={paragraph}>
              Vertically Works began with a typeface. Baram, Yong Jae Lee&rsquo;s crowd-funded Korean
              font from 2015, was drawn natively for vertical setting. It showed me how much labor hides
              inside a script: a Korean typeface needs more than 3,350 glyphs before it can say anything.
              Print spent centuries refining vertical typography. Screens started horizontal and stayed
              there.
            </p>

            <p style={paragraph}>
              In 2019, I turned the itch into{" "}
              <Link href={ESSAY_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                an essay
              </Link>{" "}
              and some scrappy explorations, all asking one question: can vertical type work in an
              interface? Nobody knew. The components you would need to find out did not exist.
            </p>

            <p style={paragraph}>
              The question outlasted the essay. Every few months I came back and hit the same wall: you
              cannot study vertical interaction with horizontal parts. So I built the parts.
            </p>

            <p style={paragraph}>
              Vertically Works is the result. Components built on true writing-mode: vertical-rl,
              applications that put them under load, and open questions documented as carefully as the
              answers.
            </p>

            <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-subtle)", margin: "var(--space-8) 0 0" }}>
              &mdash; Jihoon Suh, New York
            </p>

            {/* FAQ */}
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "var(--space-20) 0 var(--space-8)", lineHeight: 1.2 }}>
              Questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
              {FAQ.map((item) => (
                <div key={item.q}>
                  <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.4 }}>
                    {item.q}
                  </h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.7, margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <InstallBanner />
    </>
  );
}
