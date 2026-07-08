"use client";

import { MARKETS, type MarketCode } from "@/lib/listen/podcasts";

/** Market chooser for chart mode — a slim column at the reading start of
 *  the shelf: pick where "most famous" is measured. */
export function MarketPicker({
  market,
  onChange,
  disabled,
}: {
  market: MarketCode;
  onChange: (market: MarketCode) => void;
  disabled?: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="차트 지역"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-4)",
        flexShrink: 0,
        padding: "0 var(--space-2)",
        opacity: disabled ? 0.5 : 1,
        transition: "opacity var(--duration-fast) var(--easing-out)",
      }}
    >
      {MARKETS.map(({ code, label }) => {
        const isActive = code === market;
        return (
          <button
            key={code}
            className="pressable"
            role="radio"
            aria-checked={isActive}
            disabled={disabled}
            onClick={() => onChange(code)}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "var(--color-fg)" : "var(--color-fg-subtle)",
              background: "none",
              border: "none",
              borderRight: isActive ? "2px solid var(--color-fg)" : "2px solid transparent",
              borderRadius: 2,
              padding: "var(--space-2) 2px",
              cursor: disabled ? "default" : "pointer",
              fontFamily: "inherit",
              transition:
                "color var(--duration-fast) var(--easing-out), border-color var(--duration-fast) var(--easing-out)",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
