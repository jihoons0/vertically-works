"use client";

import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Static mesh-gradient wash behind a flagship app showcase's media panel · one
 * distinct palette per app, so each case study reads as its own surface. Sits
 * absolutely behind the video/screenshot (which carries its own z-index).
 * Rendered at speed 0 · a single frozen frame, no animation loop.
 */
type ShaderConfig = {
  colors: string[];
  distortion: number;
  swirl: number;
  grainMixer: number;
  grainOverlay: number;
  speed: number;
  rotation: number;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
};

const SHADERS: Record<string, ShaderConfig> = {
  "vertically-verse": {
    colors: ["#f5e2bc", "#c7ffd2", "#ff8661", "#ffd447"],
    distortion: 0.68,
    swirl: 0.16,
    grainMixer: 0.11,
    grainOverlay: 0,
    speed: 0.4,
    rotation: 88,
  },
  notes: {
    colors: ["#e0eaff", "#241d9a", "#cbb3b9", "#4eb3d4"],
    distortion: 0.5,
    swirl: 0.09,
    grainMixer: 0.11,
    grainOverlay: 0,
    speed: 0.14,
    scale: 1.48,
    rotation: 312,
    offsetX: -0.04,
    offsetY: -0.2,
  },
};

export function AppShowcaseShader({ appId }: { appId: string }) {
  const config = SHADERS[appId];
  if (!config) return null;

  return (
    <MeshGradient
      {...config}
      speed={0}
      frame={0}
      fit="cover"
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
