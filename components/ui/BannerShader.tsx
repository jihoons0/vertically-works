"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "@/components/home/bento-shared";

// One surface, two moods · cream-to-sky by day, deep teal-and-ink by night.
const LIGHT_COLORS = ["#b6f7dd42", "#fffcf5", "#8accffd6", "#f3f0ff45"];
const DARK_COLORS = ["#19483e", "#171208", "#083c63", "#30304a"];

/**
 * The banner's animated mesh gradient · fills its (relative) parent; palette
 * follows the site theme, and under prefers-reduced-motion the shader holds
 * a still frame (speed 0). Used by the InstallBanner on every page.
 */
export function BannerShader() {
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <MeshGradient
      colors={dark ? DARK_COLORS : LIGHT_COLORS}
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
