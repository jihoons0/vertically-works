"use client";

import { useRef } from "react";
import { formatTime } from "@/lib/listen/store";
import type { Strings } from "@/lib/listen/i18n";
import { ThemeToggle } from "@/components/listen/ThemeToggle";

/** Conventional bottom-center player bar: horizontal progress with times,
 *  volume, ±15s, previous/next episode, play/pause. Navigation is
 *  horizontal; reading stays vertical — the same split the house slider
 *  guidance draws. */

function IconButton({
  ariaLabel,
  onClick,
  disabled,
  children,
  size = 44,
}: {
  ariaLabel: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <button
      className="pressable"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "var(--radius-full)",
        border: "none",
        background: "none",
        color: "var(--color-fg-muted)",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "color var(--duration-fast) var(--easing-out), opacity var(--duration-fast) var(--easing-out)",
      }}
    >
      {children}
    </button>
  );
}

export function PlayerBar({
  t,
  currentTime,
  duration,
  isPlaying,
  volume,
  muted,
  disabled,
  onTogglePlay,
  onSeek,
  onPrev,
  onNext,
  onVolumeChange,
  onToggleMute,
}: {
  t: Strings;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  disabled: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}) {
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;
  const level = muted ? 0 : Math.max(0, Math.min(1, volume));

  const seekFromPointer = (e: React.PointerEvent) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect || duration <= 0) return;
    const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(p * duration);
  };

  const volumeFromPointer = (e: React.PointerEvent) => {
    const rect = volumeRef.current?.getBoundingClientRect();
    if (!rect) return;
    onVolumeChange(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  };

  return (
    <div
      className="vl-player"
      style={{
        width: "min(680px, 100%)",
        maxWidth: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        padding: "var(--space-4) var(--space-6) var(--space-3)",
        borderRadius: "var(--radius-2xl)",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
        boxShadow: "var(--shadow-column)",
      }}
    >
      {/* Progress — time flows with the bar's horizontal axis */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <span
          style={{
            fontSize: "0.6875rem",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--color-fg)",
            fontVariantNumeric: "tabular-nums",
            minWidth: 44,
            textAlign: "right",
          }}
        >
          {formatTime(currentTime)}
        </span>
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={t.seek}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`}
          aria-disabled={disabled || undefined}
          onPointerDown={(e) => {
            if (disabled) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            seekFromPointer(e);
          }}
          onPointerMove={(e) => {
            if (!disabled && e.buttons === 1) seekFromPointer(e);
          }}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "ArrowRight") {
              e.preventDefault();
              onSeek(Math.min(duration, currentTime + 5));
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              onSeek(Math.max(0, currentTime - 5));
            }
          }}
          style={{
            flex: 1,
            height: 24,
            display: "flex",
            alignItems: "center",
            cursor: disabled ? "default" : "ew-resize",
            touchAction: "none",
          }}
        >
          <div
            ref={progressRef}
            style={{
              width: "100%",
              height: 4,
              background: "var(--color-border)",
              borderRadius: "var(--radius-full)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${progress * 100}%`,
                background: "var(--color-fg)",
                borderRadius: "var(--radius-full)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${progress * 100}%`,
                transform: "translate(-50%, -50%)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "var(--color-fg)",
                border: "2px solid var(--color-bg)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                opacity: disabled ? 0 : 1,
              }}
            />
          </div>
        </div>
        <span
          style={{
            fontSize: "0.6875rem",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--color-fg-subtle)",
            fontVariantNumeric: "tabular-nums",
            minWidth: 44,
          }}
        >
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls — theme bottom-left, transport centered, volume right */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "var(--space-1)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <ThemeToggle />
        </div>
        <div className="vl-transport" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <IconButton ariaLabel={t.prevEp} onClick={onPrev} disabled={disabled}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 20L9 12l10-8v16z" fill="currentColor" stroke="none" />
              <path d="M5 5v14" />
            </svg>
          </IconButton>
          <IconButton ariaLabel={t.back15} onClick={() => onSeek(Math.max(0, currentTime - 15))} disabled={disabled}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 4v6h6" />
              <path d="M3.5 13a8.5 8.5 0 1 0 2-6.5L2 10" />
              <text x="12.5" y="16.5" textAnchor="middle" fontSize="7.5" fill="currentColor" stroke="none" fontFamily="var(--font-geist-mono)">
                15
              </text>
            </svg>
          </IconButton>
          <button
            className="pressable"
            onClick={onTogglePlay}
            aria-label={isPlaying ? t.pause : t.play}
            disabled={disabled}
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
              cursor: disabled ? "default" : "pointer",
              opacity: disabled ? 0.4 : 1,
              boxShadow: "var(--shadow-column)",
              margin: "0 var(--space-2)",
            }}
          >
            {isPlaying ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                <path d="M9 7v10M15 7v10" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 6.5v11L18 12z" />
              </svg>
            )}
          </button>
          <IconButton ariaLabel={t.fwd15} onClick={() => onSeek(currentTime + 15)} disabled={disabled}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 4v6h-6" />
              <path d="M20.5 13a8.5 8.5 0 1 1-2-6.5L22 10" />
              <text x="11.5" y="16.5" textAnchor="middle" fontSize="7.5" fill="currentColor" stroke="none" fontFamily="var(--font-geist-mono)">
                15
              </text>
            </svg>
          </IconButton>
          <IconButton ariaLabel={t.nextEp} onClick={onNext} disabled={disabled}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 4l10 8-10 8V4z" fill="currentColor" stroke="none" />
              <path d="M19 5v14" />
            </svg>
          </IconButton>
        </div>
        <div className="vl-player-volume" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "var(--space-1)" }}>
          <IconButton ariaLabel={muted ? t.unmute : t.mute} onClick={onToggleMute} size={36}>
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M23 9l-6 6M17 9l6 6" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </IconButton>
          <div
            role="slider"
            tabIndex={0}
            aria-label={t.volume}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(level * 100)}
            aria-valuetext={muted ? t.mute : `${Math.round(level * 100)}%`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              volumeFromPointer(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons === 1) volumeFromPointer(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                e.preventDefault();
                onVolumeChange(Math.min(1, level + 0.05));
              } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                e.preventDefault();
                onVolumeChange(Math.max(0, level - 0.05));
              }
            }}
            style={{
              width: 76,
              height: 24,
              display: "flex",
              alignItems: "center",
              cursor: "ew-resize",
              touchAction: "none",
            }}
          >
            <div
              ref={volumeRef}
              style={{
                width: "100%",
                height: 4,
                background: "var(--color-border)",
                borderRadius: "var(--radius-full)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${level * 100}%`,
                  background: "var(--color-fg-muted)",
                  borderRadius: "var(--radius-full)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${level * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "var(--color-fg)",
                  border: "2px solid var(--color-bg)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
