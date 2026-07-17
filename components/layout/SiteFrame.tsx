"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/nav/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PreviewLangProvider } from "@/components/providers/PreviewLangProvider";

// The documentation chrome, rendered for every route under app/(site). The
// running apps (app/run/*) live outside that group and never reach here, so
// they render bare and own the whole viewport — including when a subdomain
// host-rewrite points at them.
export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <PreviewLangProvider>
      <Navigation />
      <main style={{ flex: 1 }}>{children}</main>
      {/* Home carries its own footer inside the contact section's shader */}
      {pathname !== "/" && <Footer />}
    </PreviewLangProvider>
  );
}
