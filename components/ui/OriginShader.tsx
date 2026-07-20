"use client";

import { StaticMeshGradient } from "@paper-design/shaders-react";

/**
 * The origin banner's backdrop · a static mesh-gradient wash behind the founding
 * quote so the section reads as its own surface. Frozen (StaticMeshGradient) ·
 * a single navy-to-cream palette, sized to fill the section.
 */
export function OriginShader() {
  return (
    <StaticMeshGradient
      colors={["#011d65ab", "#0a038c99", "#6765eca8", "#f2faef"]}
      positions={0}
      waveX={0.56}
      waveXShift={0}
      waveY={0.95}
      waveYShift={0.63}
      mixing={0.45}
      grainMixer={0.15}
      grainOverlay={0.04}
      fit="cover"
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
