"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/nav/Navigation";
import { Footer } from "@/components/layout/Footer";

// Most routes are documentation and wear the site chrome. Full-screen application
// routes (the Vertically Do to-do app) render bare so they own the whole viewport.
// Only the app itself is bare — the /apps launcher and the Verse pages keep chrome.
const BARE_ROUTES = ["/apps/notes"];

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));

  if (bare) return <>{children}</>;

  return (
    <>
      <Navigation />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  );
}
