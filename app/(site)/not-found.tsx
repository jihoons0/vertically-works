import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "clamp(80px, 12vw, 160px) var(--space-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-8)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-5)" }}>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 700,
            letterSpacing: "-0.06em",
            color: "var(--color-border-strong)",
            lineHeight: 1,
          }}
        >
          404
        </span>
        <span
          style={{
            writingMode: "vertical-rl",
            fontSize: "0.875rem",
            color: "var(--color-fg-subtle)",
            letterSpacing: "0.08em",
            userSelect: "none",
          }}
          aria-hidden
        >
          見つかりません
        </span>
      </div>

      <h1
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "var(--color-fg)",
          margin: 0,
          maxWidth: "18ch",
        }}
      >
        Page not found.
      </h1>

      <p
        style={{
          fontSize: "1rem",
          color: "var(--color-fg-muted)",
          lineHeight: 1.7,
          maxWidth: "44ch",
          margin: 0,
        }}
      >
        This page doesn&apos;t exist. The content you&apos;re looking for may have moved,
        or this URL may never have existed.
      </p>

      <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <Link
          href="/"
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
          Go home
        </Link>
        <Link
          href="/components"
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
          Browse components
        </Link>
      </div>
    </div>
  );
}
