"use client";

/**
 * NavRail · the right-edge vertical breadcrumb (NEW · registry candidate).
 *
 * Crumbs read top→bottom — Date › Region › Category › Article — separated by a
 * rotated `›`. Region and Category are hover-to-open selectors (CrumbSelect);
 * the Article crumb reads as the front-page context on home and becomes the
 * open article's (clipped) title while reading — tapping it returns home. The
 * rail anchors to the right because FrontPage renders it first inside a
 * `row-reverse` shell. Sources/Theme sit at the bottom.
 */

import { useState, type ReactNode } from "react";
import { CrumbSelect, type CrumbOption } from "@/components/news/vw/crumb-select";
import { VerticalTooltip } from "@/components/news/vw/tooltip";
import { VerticalText } from "./VerticalText";
import { mastheadDate } from "@/lib/news/time";
import type { Strings } from "@/lib/news/i18n";
import {
  EDITIONS,
  EDITION_FLAGS,
  EDITION_NAMES,
  SECTIONS,
  SECTION_LABELS,
  LANG_TAGS,
  type EditionId,
  type SectionId,
} from "@/lib/news/sources";
import type { NewsItem } from "@/lib/news/rss";

export function NavRail({
  edition,
  section,
  onEditionChange,
  onSectionChange,
  activeStory,
  onArticleCrumb,
  onOpenSources,
  onOpenTheme,
  t,
  compact = false,
}: {
  edition: EditionId;
  section: SectionId;
  onEditionChange: (e: EditionId) => void;
  onSectionChange: (s: SectionId) => void;
  activeStory: NewsItem | null;
  onArticleCrumb: () => void;
  onOpenSources: () => void;
  onOpenTheme: () => void;
  t: Strings;
  compact?: boolean;
}) {
  // Only one selector opens at a time — lift the open crumb here.
  const [openCrumb, setOpenCrumb] = useState<string | null>(null);

  const regionOptions: CrumbOption<EditionId>[] = EDITIONS.map((id) => ({
    id,
    lang: LANG_TAGS[id],
    label: (
      <>
        <span aria-hidden style={{ writingMode: "horizontal-tb", lineHeight: 1 }}>
          {EDITION_FLAGS[id]}
        </span>
        <VerticalText text={EDITION_NAMES[id]} exempt chrome />
      </>
    ),
  }));

  const sectionOptions: CrumbOption<SectionId>[] = SECTIONS.map((id) => ({
    id,
    label: <VerticalText text={SECTION_LABELS[edition][id]} chrome />,
  }));

  return (
    <nav
      aria-label={t.trace}
      style={{
        flexShrink: 0,
        width: compact ? 44 : 64,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: compact ? "var(--space-4) 0" : "var(--space-5) 0",
        borderLeft: "1px solid var(--color-border)",
        zIndex: 20,
      }}
    >
      {/* The breadcrumb trace · date › region › category › article.
          Overflow stays visible so the hover popovers can open leftward past
          the rail; the article crumb self-clips via its own max-height. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-2)",
          minHeight: 0,
        }}
      >
        {/* Date · non-interactive */}
        <time
          className="vt-reading"
          dateTime={new Date().toISOString().slice(0, 10)}
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.12em",
            color: "var(--color-fg-muted)",
            flexShrink: 0,
          }}
        >
          <VerticalText text={mastheadDate(edition)} chrome />
        </time>

        <Sep />

        {/* Region · hover-open selector */}
        <CrumbSelect
          value={edition}
          options={regionOptions}
          onChange={onEditionChange}
          ariaLabel={t.editionCapsule}
          openId={openCrumb}
          onOpenChange={setOpenCrumb}
          triggerLabel={
            /* Collapsed crumb shows the flag upright only; the country name
               appears in the popover on hover. */
            <span aria-hidden style={{ writingMode: "horizontal-tb", fontSize: "1.05rem", lineHeight: 1 }}>
              {EDITION_FLAGS[edition]}
            </span>
          }
        />

        <Sep />

        {/* Category · hover-open selector */}
        <CrumbSelect
          value={section}
          options={sectionOptions}
          onChange={onSectionChange}
          ariaLabel={t.sections}
          openId={openCrumb}
          onOpenChange={setOpenCrumb}
          triggerLabel={<VerticalText text={SECTION_LABELS[edition][section]} chrome />}
        />

        <Sep />

        {/* Article · always present; front-page context, or the open title */}
        <button
          type="button"
          className="pressable"
          onClick={onArticleCrumb}
          aria-current={activeStory ? undefined : "page"}
          aria-label={activeStory ? t.back : undefined}
          lang={activeStory ? LANG_TAGS[edition] : undefined}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            maxHeight: compact ? 150 : 200,
            overflow: "hidden",
            whiteSpace: "nowrap",
            border: "none",
            background: "transparent",
            color: activeStory ? "var(--color-fg)" : "var(--color-fg-subtle)",
            fontSize: "0.8125rem",
            fontWeight: activeStory ? 600 : 500,
            letterSpacing: "0.04em",
            fontFamily: activeStory ? "var(--font-reading)" : undefined,
            padding: "var(--space-2) var(--space-1)",
            borderRadius: "var(--radius-full)",
            cursor: "pointer",
            transition: "color var(--duration-fast) var(--easing-default)",
          }}
        >
          {activeStory ? (
            <VerticalText text={activeStory.title} />
          ) : (
            <VerticalText text={t.frontPage} chrome />
          )}
        </button>
      </div>

      {/* Bottom cluster · sources + theme */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-3)",
          paddingTop: "var(--space-4)",
        }}
      >
        <VerticalTooltip content={t.sources} placement="left">
          <RailIconButton label={t.sources} onClick={onOpenSources}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="3" />
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            </svg>
          </RailIconButton>
        </VerticalTooltip>
        <VerticalTooltip content={`${t.themes} · ${t.typeface}`} placement="left">
          <RailIconButton label={`${t.themes} · ${t.typeface}`} onClick={onOpenTheme}>
            <span
              aria-hidden
              className="corner-round"
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--color-bg) 50%, var(--color-fg) 50%)",
                border: "1px solid var(--color-border-strong)",
              }}
            />
          </RailIconButton>
        </VerticalTooltip>
      </div>
    </nav>
  );
}

/** A crumb separator · `›` rotated to point down the reading (top→bottom) axis. */
function Sep() {
  return (
    <span
      aria-hidden
      style={{
        color: "var(--color-fg-subtle)",
        fontSize: "0.75rem",
        lineHeight: 1,
        transform: "rotate(90deg)",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      ›
    </span>
  );
}

/** A round chrome control for the rail's bottom cluster. */
function RailIconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      data-vw="chrome-button"
      type="button"
      className="pressable corner-round"
      aria-label={label}
      onClick={onClick}
      style={{
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: "1px solid var(--color-border-strong)",
        background: "color-mix(in srgb, var(--color-bg) 78%, transparent)",
        color: "var(--color-fg-muted)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}
