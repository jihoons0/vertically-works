"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/applications", label: "Applications" },
  { href: "/challenges", label: "Challenges" },
  { href: "/principles", label: "Principles" },
  { href: "/components", label: "Components" },
  { href: "/patterns", label: "Patterns" },
  { href: "/playground", label: "Playground" },
  { href: "/resources", label: "Resources" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <nav
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 var(--space-6)",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: "var(--space-8)",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--color-fg)",
            flexShrink: 0,
          }}
        >
          Vertically Works
        </Link>

        {/* Desktop nav links */}
        <ul
          role="list"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
            flex: 1,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--color-fg)" : "var(--color-fg-muted)",
                    padding: "var(--space-2) var(--space-3)",
                    borderRadius: "var(--radius-md)",
                    transition: `color var(--duration-fast) var(--easing-default),
                                 background var(--duration-fast) var(--easing-default)`,
                    background: active ? "var(--color-bg-muted)" : "transparent",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-fg)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-bg-subtle)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-fg-muted)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginLeft: "auto" }}>
          <Link
            href="https://github.com/jihoons"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "var(--radius-md)",
              color: "var(--color-fg-muted)",
              transition: `color var(--duration-fast) var(--easing-default)`,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-fg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-fg-muted)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </Link>

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "transparent",
              color: "var(--color-fg-muted)",
              cursor: "pointer",
            }}
            className="flex md:hidden"
          >
            {mobileOpen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            background: "var(--color-bg)",
            padding: "var(--space-4) var(--space-6)",
          }}
          className="md:hidden"
        >
          <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "var(--space-3) var(--space-3)",
                      fontSize: "0.9375rem",
                      fontWeight: active ? 500 : 400,
                      color: active ? "var(--color-fg)" : "var(--color-fg-muted)",
                      borderRadius: "var(--radius-md)",
                      background: active ? "var(--color-bg-muted)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
