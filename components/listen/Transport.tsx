"use client";

/** Playback controls stacked on the reading axis: previous is up,
 *  next is down (the house arrow language), play/pause between them. */

type TransportProps = {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
};

function SkipButton({
  label,
  path,
  onClick,
  ariaLabel,
}: {
  label: string;
  path: string;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      className="pressable"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-3)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        color: "var(--color-fg-muted)",
        cursor: "pointer",
        fontFamily: "inherit",
        minWidth: 44,
        minHeight: 44,
        transition: "background var(--duration-micro) ease, border-color var(--duration-fast) ease",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={path} />
      </svg>
      <span
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "0.6875rem",
          color: "var(--color-fg-subtle)",
          letterSpacing: "0.05em",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </button>
  );
}

export function Transport({ isPlaying, onTogglePlay, onNext, onPrev }: TransportProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)" }}>
      {/* Previous — back up the reading axis */}
      <SkipButton label="이전" ariaLabel="이전 곡" onClick={onPrev} path="M12 20V7M5 13l7-7 7 7M5 3h14" />

      <button
        className="pressable"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "일시 정지" : "재생"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "var(--radius-full)",
          border: "none",
          background: "var(--color-fg)",
          color: "var(--color-bg)",
          cursor: "pointer",
          boxShadow: "var(--shadow-column)",
        }}
      >
        {isPlaying ? (
          // Pause — bars sit perpendicular to the vertical time axis
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
            <path d="M7 9h10M7 15h10" />
          </svg>
        ) : (
          // Play — the triangle points down: playback advances along the reading axis
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6.6 7h10.8L12 17.4z" />
          </svg>
        )}
      </button>

      {/* Next — continue down the reading axis */}
      <SkipButton label="다음" ariaLabel="다음 곡" onClick={onNext} path="M12 4v13M5 11l7 7 7-7M5 21h14" />
    </div>
  );
}
