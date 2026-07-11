import { Reveal } from "@/components/Reveal";

/**
 * Header for application detail pages: eyebrow, title, and a status/platform
 * row on a subtle band — the core visual (video or live embed) leads directly
 * below it.
 */
export function AppHero({
  eyebrow = "Application",
  title,
  status,
  platform,
  meta,
}: {
  eyebrow?: string;
  title: string;
  status: string;
  platform: string;
  meta?: string;
}) {
  return (
    <section
      style={{
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 6vw, 80px) var(--space-6)" }}>
        <Reveal>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--color-fg-subtle)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: "0 0 var(--space-3)",
            }}
          >
            {eyebrow}
          </p>
          <h1
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--color-fg)",
              margin: "0 0 var(--space-4)",
            }}
          >
            {title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "var(--color-fg)",
                padding: "3px 10px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border-strong)",
              }}
            >
              {status === "Live" && (
                <span
                  className="corner-round"
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}
                />
              )}
              {status}
            </span>
            <span style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)" }}>{platform}</span>
            {meta && <span style={{ fontSize: "0.875rem", color: "var(--color-fg-subtle)" }}>{meta}</span>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
