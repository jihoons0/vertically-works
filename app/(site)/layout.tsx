import { SiteFrame } from "@/components/layout/SiteFrame";

// Everything under (site) wears the documentation chrome (Navigation + Footer).
// Route groups don't affect the URL, so these pages keep their paths. The
// running apps (app/run/*) and API routes live outside this group, so they
// never get chrome — which is what makes the subdomain host-rewrites render bare.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
