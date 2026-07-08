"use client";

import { useRef } from "react";

/** Vertical volume control — drag up to increase (the house slider rule:
 *  upward motion = more), fill anchored at the bottom. The speaker icon
 *  toggles mute. */
export function VolumeControl({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
  length = 88,
}: {
  volume: number;
  muted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  length?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const level = muted ? 0 : Math.max(0, Math.min(1, volume));

  const handlePointer = (e: React.PointerEvent) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = 1 - Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    onVolumeChange(p);
  };

  const nudge = (delta: number) => onVolumeChange(Math.max(0, Math.min(1, level + delta)));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
      <div
        role="slider"
        tabIndex={0}
        aria-label="음량"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(level * 100)}
        aria-valuetext={muted ? "음소거" : `${Math.round(level * 100)}%`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          handlePointer(e);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) handlePointer(e);
        }}
        onKeyDown={(e) => {
          switch (e.key) {
            case "ArrowUp":
            case "ArrowRight":
              e.preventDefault();
              nudge(0.05);
              break;
            case "ArrowDown":
            case "ArrowLeft":
              e.preventDefault();
              nudge(-0.05);
              break;
            case "Home":
              e.preventDefault();
              onVolumeChange(0);
              break;
            case "End":
              e.preventDefault();
              onVolumeChange(1);
              break;
          }
        }}
        style={{
          width: 24,
          height: length,
          display: "flex",
          justifyContent: "center",
          cursor: "ns-resize",
          touchAction: "none",
          flexShrink: 0,
        }}
      >
        <div
          ref={trackRef}
          style={{
            width: 4,
            height: "100%",
            background: "var(--color-border)",
            borderRadius: 2,
            position: "relative",
          }}
        >
          {/* Louder = fuller, from the bottom up */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: `${level * 100}%`,
              background: "var(--color-fg-muted)",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: `calc(${level * 100}% - 6px)`,
              transform: "translateX(-50%)",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "var(--color-fg)",
              border: "2px solid var(--color-bg)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>

      <button
        className="pressable"
        onClick={onToggleMute}
        aria-pressed={muted}
        aria-label={muted ? "음소거 해제" : "음소거"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: "var(--radius-lg)",
          border: "none",
          background: "none",
          color: muted ? "var(--color-fg-subtle)" : "var(--color-fg-muted)",
          cursor: "pointer",
        }}
      >
        {muted ? (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M23 9l-6 6M17 9l6 6" />
          </svg>
        ) : (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </div>
  );
}
