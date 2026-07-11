"use client";

import { useState } from "react";
import { CjkToggle, type Lang } from "./bento-shared";
import { LoopButtonOverlay } from "./LoopButtonOverlay";
import { LoopToggle } from "./LoopToggle";
import { LoopAccordion } from "./LoopAccordion";
import { LoopTooltip } from "./LoopTooltip";

/**
 * Four self-playing interaction loops with a 한/あ/中 language toggle in the
 * header. 2×2 on desktop, single column on small screens (.home-bento).
 */
export function BentoGrid() {
  const [lang, setLang] = useState<Lang>("ko");
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "var(--space-4)" }}>
        <CjkToggle value={lang} onChange={setLang} />
      </div>
      <div className="home-bento">
        <LoopButtonOverlay lang={lang} />
        <LoopToggle lang={lang} />
        <LoopAccordion lang={lang} />
        <LoopTooltip lang={lang} />
      </div>
    </div>
  );
}
