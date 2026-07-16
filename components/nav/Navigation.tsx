"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CjkToggle } from "@/components/home/bento-shared";
import { usePreviewLang } from "@/components/providers/PreviewLangProvider";
import { ChevronDown, Menu, X } from "lucide-react";

// First-visit hint on the language toggle · dismissed once, remembered forever.
const LANG_HINT_KEY = "vw-lang-hint-dismissed";

const NAV_LINKS = [
  { href: "/apps", label: "Apps" },
  { href: "/components", label: "Components" },
  { href: "/challenges", label: "Challenges" },
  { href: "/principles", label: "Principles" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

// Shown in the Applications hover dropdown (desktop) and indented in the mobile menu.
// `wip` entries link to their detail page but carry a WIP tag until the app is live.
const APP_LINKS: { href: string; name: string; sub: string; wip?: boolean }[] = [
  { href: "/apps/vertically-verse", name: "Vertically Verse", sub: "Scripture reader · iOS" },
  { href: "/apps/vertically-do", name: "Vertically To-do", sub: "To-do list · Web" },
  { href: "/apps/vertically-news", name: "Vertically News", sub: "Daily newspaper · Web" },
  { href: "/apps/vertically-listen", name: "Vertically Listen", sub: "Podcast player · Web", wip: true },
];

// Small tag for apps that are announced but not yet live.
function WipBadge() {
  return (
    <span
      style={{
        fontSize: "0.625rem",
        fontWeight: 500,
        color: "var(--color-fg-subtle)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-full)",
        padding: "1px 6px",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        flexShrink: 0,
      }}
    >
      WIP
    </span>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const { lang, setLang } = usePreviewLang();

  const [showLangHint, setShowLangHint] = useState(false);
  useEffect(() => {
    try {
      if (!window.localStorage.getItem(LANG_HINT_KEY)) setShowLangHint(true);
    } catch {
      /* storage unavailable · never show */
    }
  }, []);
  const dismissLangHint = () => {
    setShowLangHint(false);
    try {
      window.localStorage.setItem(LANG_HINT_KEY, "1");
    } catch {
      /* in-memory only */
    }
  };

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
          className="nav-links"
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            const hasDropdown = link.href === "/apps";
            return (
              <li
                key={link.href}
                style={hasDropdown ? { position: "relative" } : undefined}
                onMouseEnter={hasDropdown ? () => setAppsOpen(true) : undefined}
                onMouseLeave={hasDropdown ? () => setAppsOpen(false) : undefined}
                onFocus={hasDropdown ? () => setAppsOpen(true) : undefined}
                onBlur={
                  hasDropdown
                    ? (e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) setAppsOpen(false);
                      }
                    : undefined
                }
                onKeyDown={hasDropdown ? (e) => { if (e.key === "Escape") setAppsOpen(false); } : undefined}
              >
                <Link
                  href={link.href}
                  aria-expanded={hasDropdown ? appsOpen : undefined}
                  aria-haspopup={hasDropdown || undefined}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--color-fg)" : "var(--color-fg-muted)",
                    padding: "var(--space-2) var(--space-3)",
                    borderRadius: "var(--radius-md)",
                    transition: `color var(--duration-fast) var(--easing-default),
                                 background var(--duration-fast) var(--easing-default)`,
                    background: active ? "var(--color-bg-muted)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
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
                  {hasDropdown && (
                    <ChevronDown
                      size={11}
                      strokeWidth={2.5}
                      aria-hidden
                      style={{
                        transform: appsOpen ? "rotate(180deg)" : "none",
                        transition: "transform var(--duration-fast) var(--easing-out)",
                        opacity: 0.6,
                      }}
                    />
                  )}
                </Link>

                {/* Applications dropdown · hover/focus disclosure */}
                {hasDropdown && (
                  <div
                    aria-hidden={!appsOpen}
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      paddingTop: "var(--space-2)", // hover bridge · no dead gap
                      zIndex: 60,
                      opacity: appsOpen ? 1 : 0,
                      transform: appsOpen ? "none" : "translateY(-4px)",
                      pointerEvents: appsOpen ? "auto" : "none",
                      transition:
                        "opacity var(--duration-fast) var(--easing-out), transform var(--duration-fast) var(--easing-out)",
                    }}
                  >
                    <ul
                      role="list"
                      aria-label="Applications"
                      style={{
                        listStyle: "none",
                        margin: 0,
                        minWidth: 224,
                        padding: "var(--space-2)",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid var(--color-border)",
                        background: "var(--color-bg)",
                        boxShadow: "var(--shadow-overlay)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {APP_LINKS.map((app) => (
                        <li key={app.href}>
                          <Link
                            href={app.href}
                            tabIndex={appsOpen ? 0 : -1}
                            onClick={() => setAppsOpen(false)}
                            style={{
                              display: "block",
                              padding: "var(--space-2) var(--space-3)",
                              borderRadius: "var(--radius-md)",
                              transition: "background var(--duration-fast) var(--easing-default)",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-bg-subtle)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                            }}
                          >
                            <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-fg)", marginBottom: 1 }}>
                              {app.name}
                              {app.wip && <WipBadge />}
                            </span>
                            <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-fg-subtle)" }}>
                              {app.sub}
                            </span>
                          </Link>
                        </li>
                      ))}
                      <li style={{ borderTop: "1px solid var(--color-border)", marginTop: 2, paddingTop: 2 }}>
                        <Link
                          href="/apps"
                          tabIndex={appsOpen ? 0 : -1}
                          onClick={() => setAppsOpen(false)}
                          className="link-muted-hover"
                          style={{
                            display: "block",
                            padding: "var(--space-2) var(--space-3)",
                            borderRadius: "var(--radius-md)",
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                          }}
                        >
                          All applications →
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right side · GitHub sits left of the language toggle; on mobile the
            GitHub/theme pair moves into the menu so 한/あ/中 keeps its spot */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginLeft: "auto" }}>
          <span className="nav-extras">
          <Link
            href="https://github.com/jihoons0/vertically-works"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
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
          </span>

          {/* Preview language · drives every vertical-UI demo site-wide */}
          <span className="nav-lang" style={{ position: "relative", display: "inline-flex" }}>
            <CjkToggle
              value={lang}
              onChange={(l) => {
                setLang(l);
                if (showLangHint) dismissLangHint();
              }}
            />
            {showLangHint && (
              <span
                role="status"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  zIndex: 70,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  whiteSpace: "nowrap",
                  background: "var(--color-fg)",
                  color: "var(--color-bg)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  padding: "var(--space-2) var(--space-2) var(--space-2) var(--space-3)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-overlay)",
                }}
              >
                {/* caret · points up at the toggle */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -4,
                    right: 44,
                    width: 8,
                    height: 8,
                    background: "var(--color-fg)",
                    transform: "rotate(45deg)",
                  }}
                />
                Change demo language
                <button
                  onClick={dismissLangHint}
                  aria-label="Dismiss"
                  className="pressable"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 18,
                    height: 18,
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    background: "color-mix(in srgb, var(--color-bg) 22%, transparent)",
                    color: "var(--color-bg)",
                    cursor: "pointer",
                    fontSize: "0.6875rem",
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  <X size={11} strokeWidth={2.5} aria-hidden />
                </button>
              </span>
            )}
          </span>

          <span className="nav-extras">
            <ThemeToggle />
          </span>

          {/* Mobile hamburger · visibility controlled by .nav-mobile-btn CSS class */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              alignItems: "center",
              justifyContent: "center",
              // 38px square · matches the 한/あ/中 toggle's overall height beside it
              width: 38,
              height: 38,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "transparent",
              color: "var(--color-fg-muted)",
              cursor: "pointer",
            }}
            className="nav-mobile-btn"
          >
{mobileOpen ? <X size={16} strokeWidth={2} aria-hidden /> : <Menu size={16} strokeWidth={2} aria-hidden />}
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
className="nav-mobile-dropdown"
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

                  {/* App sublinks, indented under Applications */}
                  {link.href === "/apps" && (
                    <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {APP_LINKS.map((app) => {
                        const subActive = pathname === app.href || pathname.startsWith(app.href + "/");
                        return (
                          <li key={app.href}>
                            <Link
                              href={app.href}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--space-2)",
                                padding: "var(--space-2) var(--space-3)",
                                marginLeft: "var(--space-4)",
                                fontSize: "0.875rem",
                                fontWeight: subActive ? 500 : 400,
                                color: subActive ? "var(--color-fg)" : "var(--color-fg-muted)",
                                borderRadius: "var(--radius-md)",
                                background: subActive ? "var(--color-bg-muted)" : "transparent",
                              }}
                            >
                              {app.name}
                              {app.wip && <WipBadge />}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* GitHub + theme · tucked into the menu on mobile */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)", marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}>
            <Link
              href="https://github.com/jihoons0/vertically-works"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.875rem", color: "var(--color-fg-muted)", padding: "var(--space-2) var(--space-3)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </Link>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
