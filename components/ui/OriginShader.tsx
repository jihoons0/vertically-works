"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "@/components/home/bento-shared";

/**
 * The origin banner's backdrop, a soft mesh-gradient wash behind the founding
 * quote so the section reads as its own surface. Two fixed palettes: a light
 * wash for light/sepia, a deeper, more saturated one for dark. Drifts slowly;
 * freezes under prefers-reduced-motion.
 */
const LIGHT_COLORS = ["#6b9aff", "#24d3ff", "#ffb8c9", "#ffd4b3"];
const DARK_COLORS = ["#3363cc", "#10beea", "#ff2457", "#fb9241"];

export function OriginShader() {
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <MeshGradient
      colors={dark ? DARK_COLORS : LIGHT_COLORS}
      distortion={0.7}
      swirl={0}
      grainMixer={0.2}
      grainOverlay={0}
      speed={reduced ? 0 : 0.3}
      scale={1.88}
      rotation={312}
      offsetY={-0.2}
      fit="cover"
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
