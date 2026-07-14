"use client";

import { usePreviewLang } from "@/components/providers/PreviewLangProvider";
import { LoopButtonOverlay } from "./LoopButtonOverlay";
import { LoopToggle } from "./LoopToggle";
import { LoopAccordion } from "./LoopAccordion";
import { LoopTooltip } from "./LoopTooltip";
import { LoopSheet } from "./LoopSheet";
import { LoopTabs } from "./LoopTabs";

/**
 * The Components showcase: four self-playing interaction loops — 2×2 on
 * desktop, single column on small screens (.home-bento). The demos' 한/あ/中
 * language comes from the site-wide preview-language toggle in the nav.
 */
export function BentoGrid({ title, description }: { title: string; description: string }) {
  const { lang } = usePreviewLang();
  return (
    <div>
      <h2
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "var(--color-fg)",
          margin: "0 0 var(--space-3)",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
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
        <LoopSheet lang={lang} />
        <LoopTabs lang={lang} />
      </div>
    </div>
  );
}
