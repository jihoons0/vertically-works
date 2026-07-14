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
      colors={["#b6f7dd42", "#fffcf5", "#8accffd6", "#f3f0ff45"]}
      distortion={0.35}
      swirl={0}
      grainMixer={0.3}
      grainOverlay={0}
      speed={reduced ? 0 : 0.3}
      scale={1.6}
      rotation={96}
      offsetX={0.14}
      offsetY={0.08}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
