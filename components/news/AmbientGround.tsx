"use client";

/**
 * AmbientGround · the slow mesh-gradient surface the paper card floats on.
 * One component so the front page and the article reader share the exact
 * same ground (the vertically.works install-banner shader idiom).
 */

import { MeshGradient, PaperTexture } from "@paper-design/shaders-react";

/**
 * PaperGrain · a physical paper surface over the card. Multiply-blended so
 * the white ground is neutral and only the fibers, crumples, and folds land
 * on the page — grain over ink, like a real printed sheet. Pointer-inert.
 */
export function PaperGrain() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        mixBlendMode: "multiply",
      }}
    >
      <PaperTexture
        colorBack="#ffffff"
        colorFront="#d3d1cf"
        contrast={0.17}
        roughness={0.35}
        fiber={0.28}
        fiberSize={0.17}
        crumples={0.26}
        crumpleSize={0.19}
        folds={0.65}
        foldCount={8}
        drops={0.13}
        fade={0.12}
        seed={413.8}
        scale={0.5}
        fit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export function AmbientGround() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: -1 }}>
      <MeshGradient
        colors={["#c7d6f4", "#ffe4ad"]}
        distortion={0.34}
        swirl={0.58}
        grainMixer={0.23}
        grainOverlay={0}
        speed={0.66}
        rotation={92}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
