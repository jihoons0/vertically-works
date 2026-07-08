"use client";

import { useEffect, useRef } from "react";
import { MARKETS, type MarketCode, type Show } from "@/lib/listen/podcasts";
import type { Track } from "@/lib/listen/tracks";

/** Full-width browse sheet dropping from the top, over a scrim. The body is
 *  vertical UI: shows and episodes are column cells flowing right-to-left,
 *  each section labeled by a vertical column at its reading start. Browsing
 *  here never touches playback; only picking an episode commits. */

function VLabel({ text }: { text: string }) {
  return (
    <span
      aria-hidden
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        color: "var(--color-fg-muted)",
        flexShrink: 0,
        padding: "var(--space-2) var(--space-1)",
        alignSelf: "flex-start",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

/** A show as a vertical column cell — artwork at the reading start (top),
 *  vertical title below, 자막 badge over the artwork when transcripts exist. */
function ShowColumn({
  show,
  isActive,
  hasTranscript,
  onClick,
}: {
  show: Show;
  isActive: boolean;
  hasTranscript: boolean;
  onClick: () => void;
}) {
  const disabled = !show.feedUrl;
  return (
    <button
      className="pressable"
      role="option"
      aria-selected={isActive}
      aria-disabled={disabled || undefined}
      aria-label={`${show.title} — ${show.publisher}${hasTranscript ? " · 자막 지원" : ""}`}
      onClick={() => !disabled && onClick()}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        width: 104,
        height: 296,
        padding: "var(--space-3)",
        gap: "var(--space-3)",
        borderRadius: "var(--radius-2xl)",
        border: isActive ? "1px solid var(--color-fg)" : "1px solid var(--color-border)",
        background: "var(--color-bg)",
        boxShadow: isActive ? "var(--shadow-column)" : "none",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.45 : 1,
        fontFamily: "inherit",
        transition: "border-color var(--duration-fast) var(--easing-out), box-shadow var(--duration-fast) var(--easing-out)",
      }}
    >
      <span style={{ position: "relative", display: "block", flexShrink: 0 }}>
        {show.artwork ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={show.artwork}
            alt=""
            width={80}
            height={80}
            loading="lazy"
            style={{ borderRadius: "var(--radius-xl)", display: "block", boxShadow: "var(--shadow-column)" }}
          />
        ) : (
          <span style={{ display: "block", width: 80, height: 80, borderRadius: "var(--radius-xl)", background: "var(--color-bg-muted)" }} />
        )}
        {hasTranscript && (
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              fontSize: "0.5625rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--color-bg)",
              background: "var(--color-fg)",
              borderRadius: "var(--radius-full)",
              padding: "3px 7px",
              boxShadow: "var(--shadow-column)",
            }}
          >
            자막
          </span>
        )}
      </span>

      <span
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-start",
          gap: "var(--space-2)",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--color-fg)",
            letterSpacing: "0.05em",
            maxHeight: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {show.title}
        </span>
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.6875rem",
            color: "var(--color-fg-subtle)",
            letterSpacing: "0.05em",
            paddingTop: 2,
            maxHeight: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {show.publisher}
        </span>
      </span>

      {show.rank > 0 && (
        <span style={{ fontSize: "0.625rem", fontFamily: "var(--font-geist-mono)", color: "var(--color-fg-subtle)", flexShrink: 0 }}>
          {String(show.rank).padStart(2, "0")}
        </span>
      )}
    </button>
  );
}

export function BrowseSheet({
  level,
  shows,
  featured,
  transcriptIds,
  episodes,
  browsingShow,
  activeShowId,
  currentEpisodeId,
  isPlaying,
  market,
  status,
  onMarket,
  onBrowseShow,
  onPickEpisode,
  onBack,
  onClose,
  onRetry,
}: {
  level: "shows" | "episodes";
  shows: Show[];
  featured: Show[];
  transcriptIds: Set<string>;
  episodes: Track[];
  browsingShow: Show | null;
  activeShowId: string | null;
  currentEpisodeId: string | null;
  isPlaying: boolean;
  market: MarketCode;
  status: "idle" | "loading" | "error";
  onMarket: (market: MarketCode) => void;
  onBrowseShow: (show: Show) => void;
  onPickEpisode: (index: number) => void;
  onBack: () => void;
  onClose: () => void;
  onRetry: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0, 0, 0, 0.45)",
        animation: "vl-fade-in var(--duration-base) var(--easing-out) both",
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={level === "shows" ? "인기 팟캐스트 고르기" : `${browsingShow?.title ?? ""} 에피소드 고르기`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          maxHeight: "min(82vh, 780px)",
          display: "flex",
          flexDirection: "column",
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
          borderRadius: "0 0 var(--radius-2xl) var(--radius-2xl)",
          boxShadow: "var(--shadow-lift)",
          outline: "none",
          animation: "vl-sheet-in var(--duration-slow) var(--easing-drawer) both",
        }}
      >
        {/* Sheet header — thin horizontal chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-4)",
            padding: "var(--space-4) var(--space-6)",
            borderBottom: "1px solid var(--color-border)",
            flexShrink: 0,
          }}
        >
          {level === "shows" ? (
            <>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
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
            <>
              <button
                className="pressable"
                onClick={onBack}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-1)",
                  fontSize: "0.8125rem",
                  color: "var(--color-fg-muted)",
                  background: "none",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-1) var(--space-2)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                <span aria-hidden>‹</span> 인기 팟캐스트
              </button>
              {browsingShow?.artwork && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={browsingShow.artwork}
                  alt=""
                  width={32}
                  height={32}
                  style={{ borderRadius: "var(--radius-md)", display: "block", flexShrink: 0 }}
                />
              )}
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minWidth: 0,
                }}
              >
                {browsingShow?.title}
              </span>
            </>
          )}

          <div style={{ flex: 1 }} />
          <button
            className="pressable"
            onClick={onClose}
            aria-label="닫기"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "var(--radius-full)",
              border: "none",
              background: "none",
              color: "var(--color-fg-muted)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Sheet body — vertical UI: column cells flowing right→left */}
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--space-4) var(--space-6) var(--space-6)" }}>
          {status === "loading" && (
            <span role="status" style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>
              여는 중…
            </span>
          )}
          {status === "error" && (
            <button
              className="pressable"
              onClick={onRetry}
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-fg-muted)",
                padding: "var(--space-3) var(--space-4)",
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

          {status === "idle" && level === "shows" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
              {/* Guaranteed karaoke — shows that publish transcripts */}
              <div
                role="listbox"
                aria-label="자막 지원 팟캐스트"
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "stretch",
                  gap: "var(--space-3)",
                  overflowX: "auto",
                  paddingBottom: "var(--space-1)",
                }}
              >
                <VLabel text="자막 지원 · 따라 읽기" />
                {featured.map((show) => (
                  <ShowColumn
                    key={show.id}
                    show={show}
                    isActive={show.id === activeShowId}
                    hasTranscript
                    onClick={() => onBrowseShow(show)}
                  />
                ))}
              </div>

              <div
                role="listbox"
                aria-label="오늘의 인기 차트"
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "stretch",
                  gap: "var(--space-3)",
                  overflowX: "auto",
                  paddingBottom: "var(--space-1)",
                }}
              >
                <VLabel text="오늘의 인기 차트" />
                {shows.map((show) => (
                  <ShowColumn
                    key={show.id}
                    show={show}
                    isActive={show.id === activeShowId}
                    hasTranscript={transcriptIds.has(show.id)}
                    onClick={() => onBrowseShow(show)}
                  />
                ))}
              </div>
            </div>
          )}

          {status === "idle" && level === "episodes" && (
            <div
              role="listbox"
              aria-label={`${browsingShow?.title ?? ""} 에피소드`}
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "stretch",
                gap: "var(--space-3)",
                overflowX: "auto",
                paddingBottom: "var(--space-1)",
              }}
            >
              <VLabel text="에피소드 · 최신부터" />
              {episodes.map((episode, i) => {
                const isCurrent = episode.id === currentEpisodeId;
                const date = episode.credit?.split("·").pop()?.trim() ?? "";
                return (
                  <button
                    key={episode.id}
                    className="pressable"
                    role="option"
                    aria-selected={isCurrent}
                    onClick={() => onPickEpisode(i)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexShrink: 0,
                      width: 76,
                      height: 296,
                      padding: "var(--space-3) var(--space-2)",
                      gap: "var(--space-3)",
                      borderRadius: "var(--radius-2xl)",
                      border: isCurrent ? "1px solid var(--color-fg)" : "1px solid var(--color-border)",
                      background: isCurrent ? "var(--color-bg-subtle)" : "var(--color-bg)",
                      boxShadow: isCurrent ? "var(--shadow-column)" : "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition:
                        "border-color var(--duration-fast) var(--easing-out), background var(--duration-fast) var(--easing-out)",
                    }}
                  >
                    <span style={{ fontSize: "0.625rem", fontFamily: "var(--font-geist-mono)", color: "var(--color-fg-subtle)", flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "flex-start",
                        gap: "var(--space-2)",
                        flex: 1,
                        minHeight: 0,
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          fontSize: "0.8125rem",
                          fontWeight: isCurrent ? 600 : 500,
                          color: "var(--color-fg)",
                          letterSpacing: "0.04em",
                          maxHeight: "100%",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {episode.title}
                      </span>
                      <span
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          fontSize: "0.625rem",
                          fontFamily: "var(--font-geist-mono)",
                          color: "var(--color-fg-subtle)",
                          letterSpacing: "0.04em",
                          paddingTop: 2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {date}
                      </span>
                    </span>

                    {isCurrent ? (
                      <span
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          fontSize: "0.5625rem",
                          fontWeight: 600,
                          color: "var(--color-bg)",
                          background: "var(--color-fg)",
                          borderRadius: "var(--radius-full)",
                          padding: "var(--space-2) 2px",
                          flexShrink: 0,
                        }}
                      >
                        {isPlaying ? "재생 중" : "일시 정지"}
                      </span>
                    ) : (
                      <span
                        aria-hidden
                        style={{ transform: "rotate(90deg)", fontSize: "0.875rem", color: "var(--color-fg-subtle)", lineHeight: 1, flexShrink: 0 }}
                      >
                        ›
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
