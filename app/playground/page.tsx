import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlaygroundClient } from "@/components/PlaygroundClient";

export const metadata: Metadata = {
  title: "Playground",
  description: "Experiment with vertical writing systems in real time.",
};

export default function PlaygroundPage() {
  return (
    <>
      <PageHeader
        eyebrow="Playground"
        title="Experiment"
        description="See the same content across writing directions, languages, themes, and devices in real time. Every control updates the preview live, and your configuration is saved to the URL."
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-24)",
        }}
      >
        <PlaygroundClient />

        {/* What's next */}
        <div style={{ marginTop: "var(--space-16)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-3)" }}>
            Coming Next
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-8)", maxWidth: "52ch", lineHeight: 1.65 }}>
            Live controls, themeable preview, device frames, and shareable URLs are in. These are still on the way.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {[
              { title: "Side-by-side comparison", desc: "Show vertical and horizontal renderings of the same content at once." },
              { title: "Component isolation", desc: "Drop any component from the library into the canvas with full control over its props." },
              { title: "Animation scrubbing", desc: "Step through motion frame by frame to inspect timing and easing decisions." },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  padding: "var(--space-5) var(--space-6)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                }}
              >
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-2)", letterSpacing: "-0.01em" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
