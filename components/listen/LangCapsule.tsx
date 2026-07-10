"use client";

import { MARKETS, type MarketCode } from "@/lib/listen/podcasts";
import { LANG_GLYPHS, STRINGS, type Strings } from "@/lib/listen/i18n";

/** The studio's unified language control from Vertically Do, in its native
 *  vertical orientation: a glyph capsule (한 あ 中 台 港) with the inverted
 *  indicator sliding along the reading axis. Choosing a glyph localizes
 *  the chrome and points the charts at that market. */
export function LangCapsule({
  t,
  market,
  onMarket,
}: {
  t: Strings;
  market: MarketCode;
  onMarket: (market: MarketCode) => void;
}) {
  const activeIndex = MARKETS.findIndex((m) => m.code === market);

  return (
    <div
      role="radiogroup"
      aria-label={t.langSelector}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        borderRadius: "var(--radius-full)",
        background: "var(--color-bg-subtle)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-column)",
      }}
    >
      {/* Sliding indicator */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 3,
          right: 3,
          top: 3,
          height: 34,
          borderRadius: "var(--radius-full)",
          background: "var(--color-fg)",
          transform: `translateY(${activeIndex * 36}px)`,
          transition: "transform var(--duration-base) var(--easing-drawer)",
        }}
      />
      {MARKETS.map(({ code }) => {
        const on = code === market;
        return (
          <button
            key={code}
            role="radio"
            aria-checked={on}
            aria-label={STRINGS[code].langName}
            className="pressable"
            onClick={() => onMarket(code)}
            style={{
              position: "relative",
              zIndex: 1,
              width: 34,
              height: 34,
              borderRadius: "var(--radius-full)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "1rem",
              fontWeight: 600,
              lineHeight: 1,
              color: on ? "var(--color-bg)" : "var(--color-fg-muted)",
              transition: "color var(--duration-base) var(--easing-default)",
            }}
          >
            {LANG_GLYPHS[code]}
          </button>
        );
      })}
    </div>
  );
}
