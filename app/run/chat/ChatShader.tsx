"use client";

import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Static mesh-gradient wash behind the chat, adapted from the To-do app's
 * showcase shader (components/home/AppShowcaseShader) with a navy palette and a
 * different rotation. speed 0 / frame 0 = one frozen frame, no animation loop.
 * Sits behind the app content (z-index via chat.css) and only shows on the navy
 * theme. Decorative + non-interactive.
 */
export function ChatShader() {
  return (
    <div className="vc-shader" aria-hidden>
      <MeshGradient
        colors={["#0b1730", "#14245a", "#243584", "#0e1c3a"]}
        distortion={0.5}
        swirl={0.09}
        grainMixer={0.11}
        grainOverlay={0}
        rotation={210}
        scale={1.6}
        offsetX={-0.08}
        offsetY={-0.12}
        speed={0}
        frame={0}
        fit="cover"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
