import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vertically Chat",
  robots: { index: false },
};

// Bare "coming soon" screen served at chat.vertically.works (and /run/chat in
// dev). Lives outside app/(site), so it renders chrome-free like the other apps.
export default function RunChatPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "var(--space-8)",
        textAlign: "center",
      }}
    >
      <div>
        <p
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontFamily: "var(--font-site-title)",
            fontSize: "clamp(2rem, 6vw, 3rem)",
            color: "var(--color-fg)",
            margin: "0 auto var(--space-6)",
            lineHeight: 1.1,
          }}
        >
          세로쓰기 AI
        </p>
        <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: 0 }}>
          Vertically Chat is coming soon.
        </p>
      </div>
    </main>
  );
}
