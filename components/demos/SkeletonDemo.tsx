"use client";
import { useState } from "react";
import { usePicked, skeletonText } from "@/components/demos/sampleText";

export function SkeletonDemo() {
  const t = usePicked(skeletonText);
  const COLUMNS = t.columns;
  const [loading, setLoading] = useState(true);

  const reload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1600);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-3)" }}>
        <button className="pressable" onClick={reload} style={{ padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-full)", background: "var(--color-fg)", color: "var(--color-bg)", border: "none", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          {t.reload}
        </button>
        <button className="pressable" onClick={() => setLoading((l) => !l)} style={{ padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)", color: "var(--color-fg)", border: "1px solid var(--color-border)", fontSize: "0.8125rem", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
          {loading ? t.showReal : t.showSkel}
        </button>
      </div>

      <div style={{ background: "var(--color-bg-muted)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "var(--space-8)", display: "flex", flexDirection: "row-reverse", justifyContent: "center", gap: "var(--space-8)", minHeight: 300 }} aria-busy={loading}>
        {loading
          ? COLUMNS.map((_, col) => (
              <div key={col} style={{ display: "flex", flexDirection: "column", gap: 5, width: 22 }}>
                {/* verse-number ghost */}
                <div className="vw-skel" style={{ height: 12, width: 12, borderRadius: 3, marginBottom: 2, animationDelay: `${col * 90}ms` }} />
                {Array.from({ length: 11 - (col % 3) }).map((_, cell) => (
                  <div key={cell} className="vw-skel" style={{ height: 22, width: "100%", borderRadius: 3, animationDelay: `${(col * 40 + cell * 30)}ms` }} />
                ))}
              </div>
            ))
          : COLUMNS.map((text, col) => (
              <div key={col} style={{ display: "flex", gap: 4 }}>
                <span style={{ writingMode: "vertical-rl", fontSize: "0.625rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", alignSelf: "flex-start", paddingTop: 2 }}>{col + 1}</span>
                <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "1rem", letterSpacing: "0.1em", lineHeight: 1.9, color: "var(--color-fg)", animation: "vw-fade-in 300ms ease both", animationDelay: `${col * 60}ms` }}>{text}</span>
              </div>
            ))}
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        The skeleton mirrors the real column geometry · same width, same cell height, same RTL column order · so text lands exactly where the ghosts were. It pulses (opacity) rather than sweeping a horizontal shimmer.
      </p>

      <style>{`
        .vw-skel {
          background: var(--color-border);
          animation: vw-pulse 1.5s ease-in-out infinite;
        }
        @keyframes vw-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.75; }
        }
        @keyframes vw-fade-in {
          from { opacity: 0; transform: translateX(6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vw-skel { animation: none; opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
