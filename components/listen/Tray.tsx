"use client";

import { MARKETS, type MarketCode, type Show } from "@/lib/listen/podcasts";
import type { Track } from "@/lib/listen/tracks";

/** The selection tray — a compact panel docked at the reading start.
 *  Scannable horizontal rows (the house search guidance: results read
 *  horizontally); the vertical reading experience lives in the stage. */

function Row({
  onClick,
  disabled,
  selected,
  children,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <button
      className="pressable"
      role="option"
      aria-selected={selected ?? false}
      aria-disabled={disabled || undefined}
      aria-label={label}
      onClick={() => !disabled && onClick()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        width: "100%",
        padding: "var(--space-2) var(--space-3)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid transparent",
        background: selected ? "var(--color-bg-muted)" : "none",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.45 : 1,
        fontFamily: "inherit",
        textAlign: "left",
        transition: "background var(--duration-fast) var(--easing-out)",
      }}
    >
      {children}
    </button>
  );
}

export function Tray({
  browsing,
  shows,
  episodes,
  currentIndex,
  isPlaying,
  activeShow,
  market,
  status,
  onMarket,
  onSelectShow,
  onSelectEpisode,
  onBack,
  onRetry,
}: {
  browsing: "shows" | "episodes";
  shows: Show[];
  episodes: Track[];
  currentIndex: number;
  isPlaying: boolean;
  activeShow: Show | null;
  market: MarketCode;
  status: "idle" | "loading" | "error";
  onMarket: (market: MarketCode) => void;
  onSelectShow: (show: Show) => void;
  onSelectEpisode: (index: number) => void;
  onBack: () => void;
  onRetry: () => void;
}) {
  const atShows = browsing === "shows";

  return (
    <aside
      style={{
        width: "min(300px, 38vw)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        borderLeft: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
      }}
    >
      {/* Tray header — market chips at the root, back row inside a show */}
      <div
        style={{
          padding: "var(--space-4) var(--space-4) var(--space-3)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
          borderBottom: "1px solid var(--color-border)",
          flexShrink: 0,
        }}
      >
        {atShows ? (
          <>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em", color: "var(--color-fg)" }}>
              오늘의 인기 팟캐스트
            </span>
            <div role="radiogroup" aria-label="차트 지역" style={{ display: "flex", gap: "var(--space-1)", flexWrap: "wrap" }}>
              {MARKETS.map(({ code, label }) => {
                const active = code === market;
                return (
                  <button
                    key={code}
                    className="pressable"
                    role="radio"
                    aria-checked={active}
                    disabled={status === "loading"}
                    onClick={() => onMarket(code)}
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.02em",
                      padding: "3px 10px",
                      borderRadius: "var(--radius-full)",
                      border: active ? "1px solid var(--color-fg)" : "1px solid var(--color-border)",
                      background: active ? "var(--color-fg)" : "transparent",
                      color: active ? "var(--color-bg)" : "var(--color-fg-muted)",
                      cursor: status === "loading" ? "default" : "pointer",
                      fontFamily: "inherit",
                      transition:
                        "background var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out), border-color var(--duration-fast) var(--easing-out)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <button
            className="pressable"
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontSize: "0.75rem",
              color: "var(--color-fg-muted)",
              background: "none",
              border: "none",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-1) 0",
              cursor: "pointer",
              fontFamily: "inherit",
              minWidth: 0,
            }}
          >
            <span aria-hidden>‹</span>
            <span style={{ whiteSpace: "nowrap" }}>인기 팟캐스트</span>
            <span
              style={{
                fontWeight: 600,
                color: "var(--color-fg)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minWidth: 0,
              }}
            >
              · {activeShow?.title}
            </span>
          </button>
        )}
      </div>

      {/* The list */}
      <div
        role="listbox"
        aria-label={atShows ? "인기 팟캐스트" : `${activeShow?.title ?? ""} 에피소드`}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: "var(--space-3)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-1)",
        }}
      >
        {status === "loading" && (
          <span style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)", padding: "var(--space-3)" }} role="status">
            여는 중…
          </span>
        )}
        {status === "error" && (
          <button
            className="pressable"
            onClick={onRetry}
            style={{
              fontSize: "0.75rem",
              color: "var(--color-fg-muted)",
              padding: "var(--space-3)",
              background: "none",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            불러오지 못했어요 · 다시 시도
          </button>
        )}

        {status === "idle" && atShows &&
          shows.map((show) => (
            <Row
              key={show.id}
              onClick={() => onSelectShow(show)}
              disabled={!show.feedUrl}
              selected={activeShow?.id === show.id}
              label={`${show.rank}위 ${show.title}`}
            >
              <span
                style={{
                  fontSize: "0.625rem",
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--color-fg-subtle)",
                  width: 16,
                  flexShrink: 0,
                }}
              >
                {String(show.rank).padStart(2, "0")}
              </span>
              {show.artwork ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={show.artwork}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  style={{ borderRadius: "var(--radius-lg)", display: "block", flexShrink: 0 }}
                />
              ) : (
                <span style={{ width: 36, height: 36, borderRadius: "var(--radius-lg)", background: "var(--color-bg-muted)", flexShrink: 0 }} />
              )}
              <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--color-fg)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {show.title}
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--color-fg-subtle)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {show.publisher}
                </span>
              </span>
              <span aria-hidden style={{ color: "var(--color-fg-subtle)", flexShrink: 0 }}>
                ›
              </span>
            </Row>
          ))}

        {status === "idle" && !atShows &&
          episodes.map((episode, i) => {
            const isCurrent = i === currentIndex;
            return (
              <Row key={episode.id} onClick={() => onSelectEpisode(i)} selected={isCurrent}>
                <span
                  style={{
                    fontSize: "0.625rem",
                    fontFamily: "var(--font-geist-mono)",
                    color: "var(--color-fg-subtle)",
                    width: 16,
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1, gap: 1 }}>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: isCurrent ? 600 : 500,
                      color: "var(--color-fg)",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.35,
                    }}
                  >
                    {episode.title}
                  </span>
                  <span style={{ fontSize: "0.625rem", fontFamily: "var(--font-geist-mono)", color: "var(--color-fg-subtle)" }}>
                    {episode.credit?.split("·").pop()?.trim() ?? ""}
                  </span>
                </span>
                {isCurrent ? (
                  <span
                    style={{
                      fontSize: "0.5625rem",
                      fontWeight: 600,
                      color: "var(--color-bg)",
                      background: "var(--color-fg)",
                      borderRadius: "var(--radius-full)",
                      padding: "2px 8px",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {isPlaying ? "재생 중" : "일시 정지"}
                  </span>
                ) : (
                  <span aria-hidden style={{ color: "var(--color-fg-subtle)", flexShrink: 0 }}>
                    ›
                  </span>
                )}
              </Row>
            );
          })}
      </div>
    </aside>
  );
}
