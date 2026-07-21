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
  Chiron_Sung_HK,
  Zen_Antique,
  DotGothic16,
  Long_Cang,
} from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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

// News · optional CJK reading faces, opt-in per edition via the app's
// typeface picker (see app/run/news + lib/news/prefs). Script-sliced CJK, so
// no preload — only the unicode-range chunks an article uses stream in.
const chironSungHK = Chiron_Sung_HK({ variable: "--font-chiron-sung-hk", display: "swap", preload: false });
const zenAntique = Zen_Antique({ weight: "400", variable: "--font-zen-antique", display: "swap", preload: false });
const dotGothic16 = DotGothic16({ weight: "400", variable: "--font-dotgothic16", display: "swap", preload: false });
const longCang = Long_Cang({ weight: "400", variable: "--font-long-cang", display: "swap", preload: false });

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
  // Google Analytics 4 · loads in production only, so local dev stays out of the
  // reports. Defaults to the site's Measurement ID; override with NEXT_PUBLIC_GA_ID.
  // @next/third-parties + GA4 Enhanced Measurement track App Router route changes.
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-PP1Z3F3QT6";
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} ${notoSans.variable} ${notoSansKR.variable} ${notoSansJP.variable} ${notoSansTC.variable} ${notoSerifKR.variable} ${notoSerifJP.variable} ${notoSerifTC.variable} ${baram.variable} ${chironSungHK.variable} ${zenAntique.variable} ${dotGothic16.variable} ${longCang.variable}`}
    >
      <body style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
        <ThemeProvider>
          {children}
          {process.env.NODE_ENV === "development" && (
            <>
              <Agentation endpoint="http://localhost:4747" />
              {/* Figma page-capture bridge (generate_figma_design) · dev only */}
              <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
            </>
          )}
        </ThemeProvider>
      </body>
      {process.env.NODE_ENV === "production" && gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
