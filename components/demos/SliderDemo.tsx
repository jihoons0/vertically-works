"use client";
import { useState, useRef } from "react";

export function SliderDemo() {
  const [fontSize, setFontSize] = useState(18);
  const [spacing, setSpacing] = useState(55);
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePointer = (e: React.PointerEvent, setter: (v: number) => void, min: number, max: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const normalized = 1 - (e.clientY - rect.top) / rect.height;
    setter(Math.round(min + Math.max(0, Math.min(1, normalized)) * (max - min)));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ background: "var(--color-bg-muted)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "var(--space-8)", display: "flex", gap: "var(--space-12)", justifyContent: "center", alignItems: "center", minHeight: 280 }}>

        {/* Vertical sliders */}
        <div style={{ display: "flex", gap: "var(--space-10)", alignItems: "center" }}>
          {[
            { label: "글자", sub: "Font size", value: fontSize, setter: setFontSize, min: 12, max: 28 },
            { label: "행간", sub: "Line spacing", value: spacing, setter: setSpacing, min: 40, max: 80 },
          ].map(({ label, sub, value, setter, min, max }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)" }}>
              <span style={{ writingMode: "vertical-rl", fontSize: "0.75rem", color: "var(--color-fg-subtle)", letterSpacing: "0.08em", userSelect: "none" }}>{label}</span>
              <div
                ref={trackRef}
                onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); handlePointer(e, setter, min, max); }}
                onPointerMove={(e) => { if (e.buttons === 1) handlePointer(e, setter, min, max); }}
                style={{ width: 6, height: 140, background: "var(--color-border)", borderRadius: 3, position: "relative", cursor: "ns-resize", touchAction: "none" }}
              >
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${((value - min) / (max - min)) * 100}%`, background: "var(--color-fg)", borderRadius: 3 }} />
                <div style={{ position: "absolute", left: "50%", bottom: `calc(${((value - min) / (max - min)) * 100}% - 10px)`, transform: "translateX(-50%)", width: 20, height: 20, borderRadius: "50%", background: "var(--color-fg)", border: "2px solid var(--color-bg)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }} />
              </div>
              <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)" }}>{value}</span>
              <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)" }}>{sub}</span>
            </div>
          ))}
        </div>

        {/* Live preview */}
        <div style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: `${fontSize}px`, lineHeight: `${spacing / 100 * 2}`, letterSpacing: "0.1em", color: "var(--color-fg)", transition: "font-size 100ms ease, line-height 100ms ease", maxHeight: 200, overflow: "hidden" }}>
          글씨를 세로로 쓰는 것을 세로쓰기라 한다
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        Drag up to increase. Vertical sliders match the reading axis — up = more, down = less. Labels in vertical Korean above each track.
      </p>
    </div>
  );
}
