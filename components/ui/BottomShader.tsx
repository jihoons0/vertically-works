"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GrainGradient } from "@paper-design/shaders-react";

// Day: translucent cream/sky over white · night: taupe, deep blue, deep teal over black.
const LIGHT = { colors: ["#ffe7c730", "#b3deff99", "#dbfffe54"], back: "#ffffff" };
const DARK = { colors: ["#665b4d", "#00457a", "#003c47"], back: "#000000" };

/**
 * The home page's closing surface · a grainy wave behind the contact section
 * and the footer as one continuous field. Palette follows the theme; rendered
 * as a static frame (speed 0) so it holds still and skips the animation loop.
 */
export function BottomShader() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const palette = mounted && resolvedTheme === "dark" ? DARK : LIGHT;

  return (
    <GrainGradient
      colors={palette.colors}
      colorBack={palette.back}
      softness={0.88}
      intensity={0.03}
      noise={0.11}
      shape="wave"
      speed={0}
      scale={0.8}
      offsetX={-0.04}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
