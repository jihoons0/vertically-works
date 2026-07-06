import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlaygroundPreview } from "@/components/PlaygroundPreview";

export const metadata: Metadata = {
  title: "Playground",
  description: "Experiment with vertical writing systems in real time.",
};

const PLANNED_CONTROLS = [
  { label: "Language", options: ["Korean", "Japanese", "Chinese (Traditional)"] },
  { label: "Writing Direction", options: ["Vertical RL", "Horizontal LTR"] },
  { label: "Reading Direction", options: ["Right to Left", "Left to Right"] },
  { label: "Device", options: ["Mobile", "Tablet", "Desktop"] },
  { label: "Theme", options: ["Light", "Dark", "Sepia"] },
  { label: "Animation Speed", options: ["Normal", "Slow (0.5×)", "Off"] },
  { label: "Reduced Motion", options: ["Off", "On"] },
  { label: "Grid", options: ["Hidden", "Visible"] },
];

export default function PlaygroundPage() {
  return (
    <>
      <PageHeader
        eyebrow="Playground"
        title="Experiment"
        description="Compare, prototype, and explore. The playground lets you see the same content across writing directions, languages, devices, and animation speeds in real time."
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-24)",
        }}
      >
        {/* Coming soon banner */}
        <div
          style={{
            padding: "var(--space-8) var(--space-8)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-subtle)",
            marginBottom: "var(--space-12)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-4)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-border-strong)",
              flexShrink: 0,
            }}
          />
          <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0 }}>
            The interactive playground is in development. The alignment control in the preview is live; the rest are a preview of planned controls.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "var(--space-8)",
            alignItems: "start",
          }}
        >
          {/* Controls panel */}
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              background: "var(--color-bg)",
            }}
          >
            <div
              style={{
                padding: "var(--space-4) var(--space-5)",
                borderBottom: "1px solid var(--color-border)",
                background: "var(--color-bg-subtle)",
              }}
            >
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>
                Controls
              </span>
            </div>
            <div style={{ padding: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              {PLANNED_CONTROLS.map((ctrl) => (
                <div
                  key={ctrl.label}
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    borderRadius: "var(--radius-lg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "var(--space-3)",
                  }}
                >
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-fg)", fontWeight: 500 }}>
                    {ctrl.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-fg-subtle)",
                      padding: "1px 8px",
                      borderRadius: "var(--radius-full)",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-bg-muted)",
                    }}
                  >
                    {ctrl.options[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview panel — the alignment control is live */}
          <PlaygroundPreview />
        </div>

        {/* Planned features */}
        <div style={{ marginTop: "var(--space-16)" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--color-fg)",
              margin: "0 0 var(--space-8)",
            }}
          >
            Planned Features
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {[
              { title: "Real-time preview", desc: "Every control update reflects instantly in the preview canvas." },
              { title: "URL persistence", desc: "Share your configuration via URL. Each state is addressable." },
              { title: "Side-by-side comparison", desc: "Compare vertical vs. horizontal rendering of the same content." },
              { title: "Device simulation", desc: "Preview the same content at mobile, tablet, and desktop breakpoints." },
              { title: "Component isolation", desc: "Preview any individual component in isolation with full control over its props." },
              { title: "Animation scrubbing", desc: "Step through animations frame by frame to inspect motion design decisions." },
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
