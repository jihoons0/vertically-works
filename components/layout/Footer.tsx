import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-8)",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--space-8)",
            flexWrap: "wrap",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: 320 }}>
            <span style={{ fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-fg)" }}>
              Vertically Works
            </span>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", lineHeight: 1.6, margin: 0 }}>
              The canonical reference for vertical interface design. Exploring how software changes when writing direction becomes the foundation of interaction.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "var(--space-12)", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Explore
              </span>
              {[
                { href: "/apps", label: "Applications" },
                { href: "/components", label: "Components" },
                { href: "/challenges", label: "Challenges" },
                { href: "/principles", label: "Principles" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Connect
              </span>
              {[
                { href: "https://github.com/jihoons", label: "GitHub" },
                { href: "https://uxdesign.cc/vertically-works-design-exploration-on-vertical-typography-75164eed11a8", label: "Original Article" },
                { href: "mailto:jihoon8846@gmail.com", label: "Email" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Vertically Verse
              </span>
              {[
                { href: "/verse/privacy", label: "Privacy Policy" },
                { href: "/verse/support", label: "Support" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid var(--color-border)",
            flexWrap: "wrap",
            gap: "var(--space-4)",
          }}
        >
          <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>
            © 2026 Vertically Works. Open knowledge.
          </span>

          {/* #8: 3 separate vertical columns · shorter height, wider spread */}
          <div style={{ display: "flex", gap: "var(--space-3)", userSelect: "none" }} aria-hidden>
            {["縦書き", "세로쓰기", "竖排"].map((text) => (
              <span
                key={text}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "0.75rem",
                  color: "var(--color-fg-subtle)",
                  letterSpacing: "0.08em",
                  lineHeight: 1,
                }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
