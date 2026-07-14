import { Reveal } from "@/components/Reveal";
import { InstallCard } from "@/components/ui/InstallCard";
import { BannerShader } from "@/components/ui/BannerShader";

/**
 * The install banner · pitch on the left, the npx card on the right, over the
 * animated mesh-gradient surface (.install-twoup lays out the two columns).
 * One component so home, the apps launcher, and the doc landing pages all
 * share the exact same upsell. The shader palette follows the site theme
 * (cream/sky by day, teal/ink at night), so the ink follows the theme too.
 */
export function InstallBanner() {
  return (
    <section>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(32px, 5vw, 64px) var(--space-6)", containerType: "inline-size" }}>
        <div
          className="install-twoup"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "calc(var(--radius-xl) * 1.6)",
            padding: "clamp(32px, 5vw, 56px)",
          }}
        >
          <BannerShader />
          <Reveal style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
              Bring them into your project
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: 0, maxWidth: "52ch", lineHeight: 1.65 }}>
              Every component is source you own · no runtime dependency. Run{" "}
              <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>init</code> once for the tokens, then{" "}
              <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>add</code> any component · fetched live from the registry, nothing to configure.
            </p>
          </Reveal>
          <Reveal delay={80} style={{ position: "relative", zIndex: 1 }}>
            <InstallCard command="npx verticallyworks init" github="https://github.com/jihoons0/vertically-works" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
