interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Let the description span the full container width instead of the 52ch measure. */
  descriptionWide?: boolean;
  /** Let the title span the full container width instead of the 18ch measure. */
  titleWide?: boolean;
  children?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, descriptionWide, titleWide, children }: PageHeaderProps) {
  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "clamp(48px, 8vw, 96px) var(--space-6) var(--space-12)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {eyebrow && (
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--color-fg-subtle)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: "0 0 var(--space-5)",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.08,
          color: "var(--color-fg)",
          margin: "0 0 var(--space-5)",
          maxWidth: titleWide ? "none" : "18ch",
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
            color: "var(--color-fg-muted)",
            lineHeight: 1.65,
            maxWidth: descriptionWide ? "none" : "52ch",
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
