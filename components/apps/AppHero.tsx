import Image from "next/image";
import { Reveal } from "@/components/Reveal";

/**
 * Full-bleed banner lead for application detail pages: the app's own imagery
 * edge-to-edge with the identity overlaid on a fixed dark scrim. Scrim and
 * text colors are locked (not tokenized) because they sit on the image, which
 * does not change with the site theme.
 */
export function AppHero({
  eyebrow = "Application",
  title,
  banner,
  bannerAlt,
  bannerPosition = "center",
  status,
  platform,
  meta,
}: {
  eyebrow?: string;
  title: string;
  banner: string;
  bannerAlt: string;
  bannerPosition?: string;
  status: string;
  platform: string;
  meta?: string;
}) {
  return (
    <section
      style={{
        position: "relative",
        height: "clamp(300px, 40vw, 460px)",
        overflow: "hidden",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <Image
        src={banner}
        alt={bannerAlt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: bannerPosition }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.06) 100%)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end" }}>
        <div style={{ maxWidth: 1280, width: "100%", margin: "0 auto", padding: "0 var(--space-6) var(--space-10)" }}>
          <Reveal>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.72)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "0 0 var(--space-3)",
              }}
            >
              {eyebrow}
            </p>
            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#ffffff",
                margin: "0 0 var(--space-4)",
              }}
            >
              {title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#ffffff",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid rgba(255, 255, 255, 0.45)",
                }}
              >
                {status === "Live" && (
                  <span
                    className="corner-round"
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}
                  />
                )}
                {status}
              </span>
              <span style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)" }}>{platform}</span>
              {meta && <span style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.6)" }}>{meta}</span>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
