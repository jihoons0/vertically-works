"use client";

/** Vertical switch — the thumb travels along the reading axis, up = on.
 *  Ported from the Vertically Works toggle pattern. */
export function VSwitch({
  label,
  ariaLabel,
  on,
  onToggle,
}: {
  label: string;
  ariaLabel: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className="pressable"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={ariaLabel}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-2)",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      <span
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "0.6875rem",
          letterSpacing: "0.05em",
          color: on ? "var(--color-fg)" : "var(--color-fg-subtle)",
          transition: "color var(--duration-base) var(--easing-out)",
        }}
      >
        {label}
      </span>
      <span
        role="presentation"
        style={{
          width: 26,
          height: 44,
          borderRadius: "var(--radius-full)",
          background: on ? "var(--color-fg)" : "var(--color-border-strong)",
          position: "relative",
          flexShrink: 0,
          display: "inline-block",
          transition: "background var(--duration-base) var(--easing-out)",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 3,
            top: on ? 3 : 21,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "var(--color-bg)",
            transition: "top var(--duration-base) var(--easing-out)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}
        />
      </span>
    </button>
  );
}
