"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GrainGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "@/components/home/bento-shared";

/**
 * The home page's closing surface · a grainy wave drifting behind the contact
 * section and the footer as one continuous field. Same translucent colors in
 * both themes; only the backing flips (white by day, black by night). Still
 * frame under prefers-reduced-motion.
 */
export function BottomShader() {
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <GrainGradient
      colors={["#ffe7c730", "#b3deff99", "#dbfffe54"]}
      colorBack={dark ? "#000000" : "#ffffff"}
      softness={0.88}
      intensity={0.03}
      noise={0.11}
      shape="wave"
      speed={reduced ? 0 : 0.62}
      scale={0.8}
      offsetX={-0.04}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
