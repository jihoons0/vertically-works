import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { Agentation } from "agentation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vertically Works",
    template: "%s · Vertically Works",
  },
  description:
    "The canonical reference for vertical interface design. Exploring interaction patterns for vertical writing systems.",
  keywords: ["vertical text", "CJK", "writing direction", "interface design", "design system"],
  authors: [{ name: "Jihoon Suh", url: "https://vertically.works" }],
  openGraph: {
    title: "Vertically Works",
    description:
      "The canonical reference for vertical interface design. Exploring interaction patterns for vertical writing systems.",
    url: "https://vertically.works",
    siteName: "Vertically Works",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertically Works",
    description: "The canonical reference for vertical interface design.",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
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
