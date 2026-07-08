"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/nav/Navigation";
import { Footer } from "@/components/layout/Footer";

// Most routes are documentation and wear the site chrome. The in-repo apps
// (/apps/notes, /apps/listen) render bare so they own the whole viewport;
// everything else — the /apps launcher, the Verse pages — keeps the site chrome.
const BARE_ROUTES = ["/apps/notes", "/apps/listen"];

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
