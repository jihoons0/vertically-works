"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { PaperTexture } from "@paper-design/shaders-react";

/**
 * The origin banner's paper surface · a crumpled-paper texture behind the
 * founding quote, so the section reads as the page the question was first
 * written on. Static (no animation); palette follows the site theme.
 */
export function OriginShader() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <PaperTexture
      colorBack={dark ? "#161513" : "#ffffff"}
      colorFront={dark ? "#2e2a23" : "#e2dbd0"}
      contrast={0.3}
      roughness={0.4}
      fiber={0.3}
      fiberSize={0.2}
      crumples={0.3}
      crumpleSize={0.35}
      folds={0.65}
      foldCount={5}
      drops={0.2}
      fade={0}
      seed={5.8}
      scale={0.6}
      fit="cover"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
