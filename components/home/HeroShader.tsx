"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "@/components/home/bento-shared";

/**
 * The hero banner's animated mesh gradient. Fills its (relative) parent;
 * under prefers-reduced-motion the shader holds a still frame (speed 0).
 */
export function HeroShader() {
  const reduced = useReducedMotion();

  return (
    <MeshGradient
      colors={["#c9ded6", "#b8cbff", "#50b1fb", "#cdc2ff5c"]}
      distortion={0.63}
      swirl={0.35}
      grainMixer={0.3}
      grainOverlay={0}
      speed={reduced ? 0 : 0.4}
      scale={0.84}
      rotation={96}
      offsetX={0.2}
      offsetY={0.02}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
