import Link from "next/link";
import { CircleHelp, Diamond, Link as LinkIcon, Triangle } from "lucide-react";

/**
 * Related-reference pill · a jumping point between doc surfaces. Linked pills
 * carry a colored type cue in front, keyed off the destination:
 *   ◆ purple → component page      🔗 orange → application
 *   ? blue   → challenge           ▲ green  → principle
 * Plain pills (no href) stay unadorned concept tags.
 *
 * The var() fallbacks duplicate the :root defaults in globals.css on purpose:
 * the icon must never paint gray, even against a stale stylesheet.
 */
const REF_COLORS = {
  component: "var(--color-ref-component, #8b5cf6)",
  app: "var(--color-ref-app, #ea8a3a)",
  challenge: "var(--color-ref-challenge, #3b82f6)",
  principle: "var(--color-ref-principle, #16a34a)",
};

export function RelatedPill({ label, href }: { label: string; href?: string }) {
  if (!href) return <span className="related-pill">{label}</span>;

  const icon = href.startsWith("/components") ? (
    <Diamond size={10} strokeWidth={0} fill="currentColor" aria-hidden style={{ color: REF_COLORS.component, flexShrink: 0 }} />
  ) : href.startsWith("/apps") ? (
    <LinkIcon size={11} strokeWidth={2.75} aria-hidden style={{ color: REF_COLORS.app, flexShrink: 0 }} />
  ) : href.startsWith("/challenges") ? (
    <CircleHelp size={11} strokeWidth={2.75} aria-hidden style={{ color: REF_COLORS.challenge, flexShrink: 0 }} />
  ) : href.startsWith("/principles") ? (
    <Triangle size={10} strokeWidth={0} fill="currentColor" aria-hidden style={{ color: REF_COLORS.principle, flexShrink: 0 }} />
  ) : null;

  return (
    <Link href={href} className="related-pill">
      {icon}
      {label}
    </Link>
  );
}
