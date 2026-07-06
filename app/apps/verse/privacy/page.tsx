import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Vertically Verse, the vertical CJK scripture reader. The app collects no data.",
};

const wrap: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "var(--space-12) var(--space-6) var(--space-24)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-10)",
};

const h2: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "var(--color-fg-subtle)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin: 0,
};

const p: React.CSSProperties = {
  fontSize: "0.9375rem",
  color: "var(--color-fg-muted)",
  lineHeight: 1.75,
  margin: 0,
  maxWidth: "64ch",
};

const link: React.CSSProperties = {
  color: "var(--color-fg)",
  textDecoration: "underline",
  textUnderlineOffset: "0.15em",
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Data we collect",
    body: (
      <p style={p}>
        <strong style={{ color: "var(--color-fg)", fontWeight: 600 }}>None.</strong>{" "}
        Vertically Verse does not collect, store, transmit, or share any personal information.
        The app has no account system, no analytics, no advertising, and no tracking of any kind.
      </p>
    ),
  },
  {
    heading: "How the app works",
    body: (
      <ul style={{ ...p, paddingLeft: "1.2em", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <li>All scripture text and fonts are bundled inside the app and read entirely on your device.</li>
        <li>The app makes no network requests and requires no internet connection to function.</li>
        <li>Your settings — language, font size, theme, and highlights — are stored only on your device and are never sent anywhere.</li>
      </ul>
    ),
  },
  {
    heading: "Third parties",
    body: (
      <p style={p}>
        The app integrates no third-party SDKs, analytics providers, or advertising networks.
        No data is shared with any third party, because no data is collected.
      </p>
    ),
  },
  {
    heading: "Children’s privacy",
    body: (
      <p style={p}>
        Because the app collects no data from anyone, it collects no data from children.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p style={p}>
        If this policy changes, the updated version will be posted on this page with a new
        “last updated” date.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p style={p}>
        Questions about this policy? Email{" "}
        <Link href="mailto:jihoon8846@gmail.com" style={link}>
          jihoon8846@gmail.com
        </Link>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vertically Verse"
        title="Privacy Policy"
        description="Vertically Verse is a scripture reader published by Vertically Works. It is built to require none of your data."
      />

      <div style={wrap}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8125rem", color: "var(--color-fg-subtle)", margin: 0 }}>
          Last updated 6 July 2026
        </p>

        {SECTIONS.map((s) => (
          <section key={s.heading} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <h2 style={h2}>{s.heading}</h2>
            {s.body}
          </section>
        ))}

        <p style={{ ...p, color: "var(--color-fg-subtle)", fontSize: "0.8125rem", paddingTop: "var(--space-6)", borderTop: "1px solid var(--color-border)" }}>
          Looking for help using the app? See{" "}
          <Link href="/apps/verse/support" style={link}>Support</Link>.
        </p>
      </div>
    </>
  );
}
