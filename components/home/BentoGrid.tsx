"use client";

import { useState } from "react";
import { CjkToggle, type Lang } from "./bento-shared";
import { LoopButtonOverlay } from "./LoopButtonOverlay";
import { LoopToggle } from "./LoopToggle";
import { LoopAccordion } from "./LoopAccordion";
import { LoopTooltip } from "./LoopTooltip";

/**
 * The Components showcase. The section heading carries a far-right 한/あ/中
 * language toggle on the same row; the intro fills the container width; four
 * self-playing interaction loops sit below — 2×2 on desktop, single column on
 * small screens (.home-bento).
 */
export function BentoGrid({ title, description }: { title: string; description: string }) {
  const [lang, setLang] = useState<Lang>("ko");
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          marginBottom: "var(--space-3)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--color-fg)",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {title}
        </h2>
        <div style={{ flexShrink: 0 }}>
          <CjkToggle value={lang} onChange={setLang} />
        </div>
      </div>
      <p
        style={{
          fontSize: "1rem",
          color: "var(--color-fg-muted)",
          margin: "0 0 var(--space-10)",
          lineHeight: 1.65,
        }}
      >
        {description}
      </p>
      <div className="home-bento">
        <LoopButtonOverlay lang={lang} />
        <LoopToggle lang={lang} />
        <LoopAccordion lang={lang} />
        <LoopTooltip lang={lang} />
      </div>
    </div>
  );
}
