/**
 * The live application embedded in a minimal browser frame · the core visual
 * for web apps on their detail pages: not a mockup, the real thing running.
 */
export function AppEmbed({
  src,
  title,
  height = 560,
}: {
  src: string;
  title: string;
  height?: number;
}) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "var(--space-3) var(--space-4)",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="corner-round"
            style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-border-strong)", display: "inline-block" }}
          />
        ))}
        <span style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", marginLeft: "var(--space-2)" }}>
          vertically.works{src}
        </span>
      </div>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{ width: "100%", height, border: "none", display: "block", background: "var(--color-bg)" }}
      />
    </div>
  );
}
