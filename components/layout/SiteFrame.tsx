"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/nav/Navigation";
import { Footer } from "@/components/layout/Footer";

// Most routes are documentation and wear the site chrome. The Vertically Do to-do
// app (/notes) renders bare so it owns the whole viewport; everything else — the
// /apps launcher, the Verse pages — keeps the site chrome.
const BARE_ROUTES = ["/notes"];

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
