"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./bento-shared";

/**
 * Inline looping app preview. Muted + playsInline so browsers allow autoplay;
 * under prefers-reduced-motion it parks on the first frame instead.
 */
export function AppVideo({ src, label, poster }: { src: string; label: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduced) video.pause();
    else video.play().catch(() => {});
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      poster={poster}
      aria-label={label}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}
