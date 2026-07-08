"use client";

import { useRef } from "react";
import { formatTime } from "@/lib/listen/store";

/** Vertical seek control. Time flows down the reading axis, so the played
 *  portion fills from the top and dragging down scrubs forward.
 *  Ported from the Vertically Works vertical slider pattern. */
export function Scrubber({
  currentTime,
  duration,
  onSeek,
  length = 180,
}: {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  length?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  const handlePointer = (e: React.PointerEvent) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || duration <= 0) return;
    const p = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    onSeek(p * duration);
  };

  const nudge = (delta: number) => onSeek(Math.max(0, Math.min(duration, currentTime + delta)));

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="재생 위치"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(currentTime)}
      aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        handlePointer(e);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) handlePointer(e);
      }}
      onKeyDown={(e) => {
        switch (e.key) {
          case "ArrowDown":
          case "ArrowRight":
            e.preventDefault();
            nudge(5);
            break;
          case "ArrowUp":
          case "ArrowLeft":
            e.preventDefault();
            nudge(-5);
            break;
          case "PageDown":
            e.preventDefault();
            nudge(15);
            break;
          case "PageUp":
            e.preventDefault();
            nudge(-15);
            break;
          case "Home":
            e.preventDefault();
            onSeek(0);
            break;
          case "End":
            e.preventDefault();
            onSeek(duration);
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
        {/* Played portion — fills from the top, like text already read */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: `${progress * 100}%`,
            background: "var(--color-fg)",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: `calc(${progress * 100}% - 8px)`,
            transform: "translateX(-50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "var(--color-fg)",
            border: "2px solid var(--color-bg)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}
