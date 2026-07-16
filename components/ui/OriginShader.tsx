"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "@/components/home/bento-shared";

/**
 * The origin banner's backdrop · a soft mesh-gradient wash behind the founding
 * quote, so the section reads as its own surface. Colours are fixed (not
 * theme-driven) so the band looks intentional in every theme. Drifts slowly;
 * freezes under prefers-reduced-motion.
 */
export function OriginShader() {
  const reduced = useReducedMotion();

  return (
    <MeshGradient
      colors={["#6b9aff", "#24d3ff", "#ffb8c9", "#ffd4b3"]}
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
