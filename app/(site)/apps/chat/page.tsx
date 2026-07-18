import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { RelatedPill } from "@/components/ui/RelatedPill";
import { WipBanner } from "@/components/apps/WipBanner";
import { NotifyForm } from "@/components/apps/NotifyForm";

export const metadata: Metadata = {
  title: "Vertically Chat",
  description:
    "What an AI chat interface becomes when the conversation reads top to bottom, right to left. The newest open question, not built yet.",
};

export default function VerticallyChatPage() {
  return (
    <>
      <AppHero
        title="Vertically Chat"
        description="What an AI chat interface becomes when the conversation reads top to bottom, right to left."
        status="WIP"
        platform="Web"
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        <Reveal style={{ marginBottom: "var(--space-6)" }}>
          <WipBanner>
            Vertically Chat isn&apos;t built yet. It&apos;s the newest of the open questions, so the
            thinking lives in Challenges for now. The live app opens here once it exists.
          </WipBanner>
        </Reveal>
        <Reveal style={{ marginBottom: "var(--space-12)" }}>
          <NotifyForm app="Vertically Chat" />
        </Reveal>

        <Reveal>
          <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", lineHeight: 1.7, maxWidth: "60ch", margin: "0 0 var(--space-6)" }}>
            Chat UIs assume horizontal bubbles that alternate left and right. For someone reading
            vertically that model is imported, not native. A vertical chat has to decide where a new
            message enters, how the two speakers separate on one reading axis, and where the composer
            sits without fighting the flow.
          </p>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            <RelatedPill label="AI chat interfaces" href="/challenges#ai-chat" />
            <RelatedPill label="Message" href="/components/message" />
            <RelatedPill label="Text Field" href="/components/text-field" />
          </div>
        </Reveal>
      </div>
    </>
  );
}
