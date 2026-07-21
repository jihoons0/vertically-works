"use client";

import { StaticMeshGradient } from "@paper-design/shaders-react";

/**
 * Static mesh-gradient wash behind a flagship app showcase's media panel · one
 * distinct frozen palette per app, so each case study reads as its own surface.
 * Sits absolutely behind the framed video/screenshot (which carries its own z-index).
 */
type ShaderConfig = {
  colors: string[];
  positions: number;
  waveX: number;
  waveXShift: number;
  waveY: number;
  waveYShift: number;
  mixing: number;
  grainMixer: number;
  grainOverlay: number;
  rotation: number;
};

const SHADERS: Record<string, ShaderConfig> = {
  verse: {
    colors: ["#fbedd0", "#00e1ff", "#a3afff", "#554dff"],
    positions: 38,
    waveX: 0.76,
    waveXShift: 0.44,
    waveY: 0.92,
    waveYShift: 0,
    mixing: 0.93,
    grainMixer: 0.57,
    grainOverlay: 0.04,
    rotation: 270,
  },
  todo: {
    colors: ["#e6fad1", "#f8eeaa", "#cbc9c8", "#ec658d"],
    positions: 38,
    waveX: 0.51,
    waveXShift: 0.72,
    waveY: 0.78,
    waveYShift: 0.65,
    mixing: 0.93,
    grainMixer: 0.57,
    grainOverlay: 0.04,
    rotation: 270,
  },
  chat: {
    colors: ["#d9d9d9", "#94f5af", "#e8bfe8", "#e5c9bd"],
    positions: 38,
    waveX: 0.76,
    waveXShift: 0.44,
    waveY: 0.92,
    waveYShift: 0,
    mixing: 0.93,
    grainMixer: 0.57,
    grainOverlay: 0,
    rotation: 270,
  },
  // News · shares Listen's shader (the muted paper tones read as flat gray).
  news: {
    colors: ["#efe7ff", "#c9b3ff", "#9b8cff", "#5b4bd6"],
    positions: 38,
    waveX: 0.51,
    waveXShift: 0.72,
    waveY: 0.78,
    waveYShift: 0.65,
    mixing: 0.93,
    grainMixer: 0.57,
    grainOverlay: 0.04,
    rotation: 270,
  },
  // Listen has no demo asset yet · the shader fills its media panel on its own.
  listen: {
    colors: ["#efe7ff", "#c9b3ff", "#9b8cff", "#5b4bd6"],
    positions: 38,
    waveX: 0.51,
    waveXShift: 0.72,
    waveY: 0.78,
    waveYShift: 0.65,
    mixing: 0.93,
    grainMixer: 0.57,
    grainOverlay: 0.04,
    rotation: 270,
  },
};

export function AppShowcaseShader({ appId }: { appId: string }) {
  const config = SHADERS[appId];
  if (!config) return null;

  return (
    <StaticMeshGradient
      {...config}
      fit="cover"
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
