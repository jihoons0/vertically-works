import { LoopButtonOverlay } from "./LoopButtonOverlay";
import { LoopToggle } from "./LoopToggle";
import { LoopAccordion } from "./LoopAccordion";
import { LoopTooltip } from "./LoopTooltip";

/**
 * Four self-playing interaction loops — the design system demonstrating
 * itself. 2×2 on desktop, single column on small screens (.home-bento).
 */
export function BentoGrid() {
  return (
    <div className="home-bento">
      <LoopButtonOverlay />
      <LoopToggle />
      <LoopAccordion />
      <LoopTooltip />
    </div>
  );
}
