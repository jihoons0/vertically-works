import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Libre_Baskerville,
  Noto_Sans,
  Noto_Sans_KR,
  Noto_Sans_JP,
  Noto_Sans_TC,
  Noto_Serif_KR,
  Noto_Serif_JP,
  Noto_Serif_TC,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { Agentation } from "agentation";

// Geist stays for the embedded applications (Notes, Listen) and code.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Site voice: Libre Baskerville titles paired with Noto Serif CJK,
// Noto Sans (+ KR/JP/TC) for everything else. CJK families skip preload ·
// their glyph chunks stream by unicode-range as needed.
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-title",
});
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-noto-sans" });
const notoSansKR = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-noto-sans-kr", preload: false });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp", preload: false });
const notoSansTC = Noto_Sans_TC({ subsets: ["latin"], variable: "--font-noto-sans-tc", preload: false });
const notoSerifKR = Noto_Serif_KR({ subsets: ["latin"], variable: "--font-noto-serif-kr", preload: false });
const notoSerifJP = Noto_Serif_JP({ subsets: ["latin"], variable: "--font-noto-serif-jp", preload: false });
const notoSerifTC = Noto_Serif_TC({ subsets: ["latin"], variable: "--font-noto-serif-tc", preload: false });

// Baram · Yong Jae Lee's vertical-native Korean typeface, the one that started
// the project. Hangul only (no JP/CN glyphs), so it's used on the Korean word
// in the hero motif and nowhere else.
const baram = localFont({
  src: "./fonts/BaramExtraBold.otf",
  variable: "--font-baram",
  weight: "800",
  display: "swap",
  preload: false,
});

const STORY_ONE_LINER =
  "Every UI component you know assumes horizontal text. Vertically Works is what interface design becomes when reading flows top to bottom, right to left.";

export const metadata: Metadata = {
  title: {
    default: "Vertically Works · React components for vertical writing interfaces (CJK)",
    template: "%s · Vertically Works",
  },
  description:
    "An open-source design system for vertical writing · Korean, Japanese, Chinese. Real React components on true writing-mode: vertical-rl, a shadcn-compatible registry, and live apps.",
  keywords: ["vertical text", "CJK", "writing direction", "interface design", "design system"],
  authors: [{ name: "Jihoon Suh", url: "https://jihoonsuh.com" }],
  openGraph: {
    title: "Vertically Works",
    description: STORY_ONE_LINER,
    url: "https://vertically.works",
    siteName: "Vertically Works",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertically Works",
    description: STORY_ONE_LINER,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} ${notoSans.variable} ${notoSansKR.variable} ${notoSansJP.variable} ${notoSansTC.variable} ${notoSerifKR.variable} ${notoSerifJP.variable} ${notoSerifTC.variable} ${baram.variable}`}
    >
      <body style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
        <ThemeProvider>
          <SiteFrame>{children}</SiteFrame>
          {process.env.NODE_ENV === "development" && (
            <>
              <Agentation endpoint="http://localhost:4747" />
              {/* Figma page-capture bridge (generate_figma_design) · dev only */}
              <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
