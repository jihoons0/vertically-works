"use client";

import { BorderBeam, type BorderBeamSize } from "border-beam";
import { useTheme } from "next-themes";
import { useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

const emptySubscribe = () => () => {};
/** False during SSR/hydration, true after — without a setState-in-effect. */
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/**
 * Site-themed border-beam highlight (border-beam package): a monochrome
 * traveling glow for elements that need live emphasis. Follows the site
 * theme via next-themes (sepia reads as light). The beam is CSS-keyframe
 * driven, so the global prefers-reduced-motion freeze stops the travel and
 * leaves a faint static edge glow.
 */
export function Beam({
  children,
  size = "md",
  strength = 1,
  style,
}: {
  children: ReactNode;
  size?: BorderBeamSize;
  strength?: number;
  style?: CSSProperties;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";

  // The package's light presets run the stroke at ~0.12 opacity — a whisper on
  // white. Its opacity math multiplies by these CSS hook variables (default 1),
  // so boost them in light/sepia to match the dark theme's visibility.
  const lightBoost: CSSProperties = dark
    ? {}
    : ({
        "--beam-stroke-opacity": 3,
        "--beam-inner-opacity": 1.5,
        "--beam-bloom-opacity": 1.5,
      } as CSSProperties);

  return (
    <BorderBeam
      size={size}
      colorVariant="mono"
      staticColors
      theme={dark ? "dark" : "light"}
      strength={strength}
      style={{ display: "block", ...lightBoost, ...style }}
    >
      {children}
    </BorderBeam>
  );
}
