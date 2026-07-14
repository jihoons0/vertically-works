import { COMPONENTS_REGISTRY } from "@/lib/components-registry";
import { DocsSidebar } from "@/components/nav/DocsSidebar";

/**
 * Shared docs shell for /components, /components/setup, and every
 * /components/[slug] page: a sticky sidebar rail (Overview + component
 * groups) beside the page's own content column. Only plain nav data crosses
 * to the client sidebar · the registry's demo trees stay server-side.
 */
export default function ComponentsDocsLayout({ children }: { children: React.ReactNode }) {
  const items = COMPONENTS_REGISTRY.map(({ slug, name, category }) => ({ slug, name, category }));

  return (
    <div className="components-detail">
      {/* Sidebar · hidden on mobile (.components-sidebar) */}
      <aside
        className="components-sidebar"
        style={{
          position: "sticky",
          top: 56,
          height: "calc(100dvh - 56px)",
          overflowY: "auto",
          borderRight: "1px solid var(--color-border)",
          padding: "var(--space-6) 0",
        }}
      >
        <DocsSidebar items={items} />
      </aside>

      {children}
    </div>
  );
}
