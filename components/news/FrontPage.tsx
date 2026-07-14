"use client";

/**
 * The 1면 — a single horizontal scroller of full-height headline columns,
 * reading R→L. First story at the right edge; forward = leftward. DOM order
 * = reading order (`row-reverse` handles the visuals). Paging forward
 * collapses the chrome; scrolling back, tapping the indicator, or focusing
 * chrome restores it (PRD §6.1).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AmbientGround, PaperGrain } from "./AmbientGround";
import { VerticalListCell } from "@/components/news/vw/vertical-list-cell";
import { VerticalTooltip } from "@/components/news/vw/tooltip";
import { Masthead } from "./Masthead";
import { EditionCapsule } from "./EditionCapsule";
import { SectionRail } from "./SectionRail";
import { ColumnSkeleton } from "./ColumnSkeleton";
import { VerticalText } from "./VerticalText";
import { ArticleView } from "./ArticleView";
import { SourcesSheet } from "./SourcesSheet";
import { ThemeSheet } from "./ThemeSheet";
import { STRINGS } from "@/lib/news/i18n";
import { relativeTime } from "@/lib/news/time";
import {
  getCustomFeeds,
  getDisabledSources,
  getEdition,
  setEditionAttr,
} from "@/lib/news/prefs";
import { LANG_TAGS, type EditionId, type SectionId } from "@/lib/news/sources";
import type { FeedFailure, NewsItem } from "@/lib/news/rss";

const CELL_WIDTH = 116;
const CELL_GAP = 16;
const TITLE_COLUMNS_WIDTH = 62; // two vertical text columns

export function FrontPage() {
  const [edition, setEdition] = useState<EditionId>("ko");
  const [section, setSection] = useState<SectionId>("all");
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [failures, setFailures] = useState<FeedFailure[]>([]);
  const [chromeHidden, setChromeHidden] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [sourcesRev, setSourcesRev] = useState(0); // bump to refetch after sheet edits
  const [storyIndex, setStoryIndex] = useState(1);
  const [mobile, setMobile] = useState(false);
  // The article opens INSIDE the card body — no page navigation. The list
  // stays mounted underneath (scroll position survives for free).
  const [activeStory, setActiveStory] = useState<NewsItem | null>(null);
  const [articleClosing, setArticleClosing] = useState(false);
  const activeRef = useRef<NewsItem | null>(null);
  activeRef.current = activeStory;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);

  const t = STRINGS[edition];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // The pre-paint <head> script set the real edition; adopt it after mount.
  useEffect(() => {
    setEdition(getEdition());
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setItems(null);
    const params = new URLSearchParams({ edition, section });
    for (const url of getCustomFeeds(edition)) params.append("custom", url);
    for (const id of getDisabledSources(edition)) params.append("off", id);
    fetch(`/api/news/feed?${params}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data: { items: NewsItem[]; failures: FeedFailure[] }) => {
        setItems(data.items ?? []);
        setFailures(data.failures ?? []);
      })
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setItems([]);
        setFailures([{ sourceName: "—", url: "", reason: String(e) }]);
      });
    return () => controller.abort();
  }, [edition, section, sourcesRev]);

  // ── Inline article open / collapse ──
  const doClose = useCallback(() => {
    if (!activeRef.current) return;
    setArticleClosing(true);
    window.setTimeout(() => {
      setActiveStory(null);
      setArticleClosing(false);
    }, 240);
  }, []);

  const openArticle = (item: NewsItem) => {
    setActiveStory(item);
    setArticleClosing(false);
    // The URL still names the article (deep-linkable, hardware-back works)
    // without a route change — the card body swap IS the navigation.
    const carry = new URLSearchParams({
      edition,
      section,
      u: item.link,
      t: item.title,
      s: item.sourceName,
    });
    try {
      window.history.pushState({ vnArticle: item.id }, "", `/apps/news/article/${item.id}?${carry}`);
    } catch {}
  };

  const collapseArticle = useCallback(() => {
    if (window.history.state?.vnArticle) window.history.back(); // → popstate → doClose
    else doClose();
  }, [doClose]);

  // Hardware/browser back collapses the article instead of leaving the page.
  useEffect(() => {
    const onPop = () => doClose();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [doClose]);

  const changeEdition = (next: EditionId) => {
    setEditionAttr(next); // chrome language + reading font swap with the source set
    setSection("all");
    setEdition(next);
    collapseArticle();
  };

  const changeSection = (next: SectionId) => {
    setSection(next);
    collapseArticle();
  };

  // Chrome minimize: forward (leftward) travel hides, backward travel restores.
  // In a row-reverse scroller the start edge is scrollLeft 0; forward is negative.
  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const forward = -el.scrollLeft;
    const delta = forward - lastScroll.current;
    lastScroll.current = forward;
    if (forward < window.innerWidth * 0.3) setChromeHidden(false);
    else if (delta > 4) setChromeHidden(true);
    else if (delta < -4) setChromeHidden(false);
    const step = CELL_WIDTH + CELL_GAP;
    setStoryIndex(Math.min(Math.max(1, Math.round(forward / step) + 1), items?.length ?? 1));
  }, [items?.length]);

  const restoreChrome = () => setChromeHidden(false);

  return (
    <main
      aria-label={t.frontPage}
      style={{
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: mobile ? "var(--space-3)" : "var(--space-4) var(--space-6) var(--space-5)",
      }}
    >
      {/* ─── Ambient ground · the paper floats on a slow mesh gradient ─── */}
      <AmbientGround />

      {/* ─── The paper · one giant card: chrome, hairline, and columns ─── */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          background: "var(--color-bg)",
          boxShadow: "var(--shadow-soft)",
          overflow: "hidden",
        }}
      >
      {/* ─── Chrome · short bar: masthead right, capsule centered, rail left ─── */}
      <header
        onFocusCapture={restoreChrome}
        className={chromeHidden ? "vn-chrome vn-chrome-hidden" : "vn-chrome"}
        style={{
          position: "relative",
          flexShrink: 0,
          display: "flex",
          flexDirection: "row-reverse", // masthead at the reading start
          flexWrap: mobile ? "wrap" : undefined, // narrow screens: rail wraps under
          alignItems: "center",
          gap: mobile ? "var(--space-3)" : "var(--space-5)",
          padding: mobile
            ? "var(--space-3) var(--space-3) var(--space-2)"
            : "var(--space-4) var(--space-5) var(--space-2)",
        }}
      >
        <Masthead edition={edition} compact={mobile} wordmark={false} />
        {/* Language toggle · horizontal, centered on the page axis */}
        {!mobile ? (
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <EditionCapsule
              edition={edition}
              onEditionChange={changeEdition}
              orientation="horizontal"
              glyph={38}
              aria-label={t.editionCapsule}
            />
          </div>
        ) : (
          <EditionCapsule
            edition={edition}
            onEditionChange={changeEdition}
            orientation="horizontal"
            glyph={30}
            aria-label={t.editionCapsule}
          />
        )}
        <SectionRail
          edition={edition}
          section={section}
          onSectionChange={changeSection}
          compact={mobile}
          aria-label={t.sections}
        />
        {!mobile && (
          <>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-2)", alignItems: "center" }}>
              <VerticalTooltip content={t.sources} placement="below">
                <SourcesIconButton label={t.sources} onClick={() => setSourcesOpen(true)} />
              </VerticalTooltip>
              <VerticalTooltip content={`${t.themes} · ${t.typeface}`} placement="below">
                <ThemeIconButton label={`${t.themes} · ${t.typeface}`} onClick={() => setThemeOpen(true)} />
              </VerticalTooltip>
            </div>
          </>
        )}
      </header>

      {/* ─── Dividing hairline · fades out toward both ends ─── */}
      <div
        aria-hidden
        style={{
          height: 1,
          flexShrink: 0,
          margin: "var(--space-2) var(--space-4) 0",
          background:
            "linear-gradient(to right, transparent, var(--color-border-strong) 14%, var(--color-border-strong) 86%, transparent)",
        }}
      />

      {/* ─── Story columns · the article layers over them in place ─── */}
      <section style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        aria-hidden={activeStory ? true : undefined}
        inert={activeStory ? true : undefined}
        className={activeStory && !articleClosing ? "no-scrollbar vn-list-dimmed" : "no-scrollbar vn-list"}
        style={{
          height: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          display: "flex",
          flexDirection: "row-reverse", // DOM order = reading order; start at the right
          alignItems: "stretch",
          gap: CELL_GAP,
          padding: mobile ? "var(--space-4)" : "var(--space-6)",
          scrollBehavior: "auto",
        }}
      >
        {items === null ? (
          <ColumnSkeleton count={10} height="100%" cellWidth={CELL_WIDTH} gap={CELL_GAP} />
        ) : items.length === 0 ? (
          <p
            className="vt-reading"
            style={{ margin: "auto", fontSize: "1rem", color: "var(--color-fg-muted)", letterSpacing: "0.2em" }}
          >
            <VerticalText text={t.empty} />
          </p>
        ) : (
          <div
            key={`${edition}-${section}`}
            role="list"
            aria-label={t.stories}
            style={{ display: "flex", flexDirection: "row-reverse", gap: CELL_GAP, height: "100%" }}
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                role="listitem"
                className="vn-cell-in"
                style={{
                  height: "100%",
                  flexShrink: 0,
                  animationDelay: `${Math.min(i, 12) * 24}ms`,
                }}
              >
                <VerticalListCell
                  lang={LANG_TAGS[edition]}
                  title={
                    <span style={{ fontFamily: "var(--font-reading)", lineHeight: 1.9 }}>
                      <VerticalText text={item.title} />
                    </span>
                  }
                  subtitle={
                    <>
                      <VerticalText text={item.sourceName} exempt chrome />
                      {relativeTime(item.publishedAt, edition) && (
                        <>
                          {" · "}
                          <VerticalText text={relativeTime(item.publishedAt, edition)} chrome />
                        </>
                      )}
                    </>
                  }
                  onClick={() => openArticle(item)}
                  style={{ width: CELL_WIDTH, height: "100%" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── The article, in place · slides in from the left edge (forward
           direction) and dismisses to the same edge ─── */}
      {activeStory && (
        <div
          className={articleClosing ? "vn-article-layer vn-article-layer-out" : "vn-article-layer"}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            background: "var(--color-bg)",
          }}
        >
          <ArticleView item={activeStory} edition={edition} onClose={collapseArticle} />
        </div>
      )}
      </section>
      <PaperGrain />
      </div>

      {/* ─── Floating bottom cluster · indicator (+ sheets on mobile) ─── */}
      <div
        style={{
          position: "absolute",
          left: mobile ? "var(--space-5)" : "var(--space-10)",
          bottom: mobile ? "var(--space-5)" : "var(--space-8)",
          zIndex: 10,
          display: activeStory ? "none" : "flex",
          alignItems: "flex-end",
          gap: "var(--space-2)",
        }}
      >
        {items !== null && items.length > 0 && (
          <button
            data-vw="indicator"
            type="button"
            onClick={restoreChrome}
            className="pressable"
            style={{ ...floatingPillStyle, fontFamily: "var(--font-mono)" }}
          >
            <VerticalText text={t.storyIndicator(storyIndex, items.length)} chrome />
          </button>
        )}
        {mobile && (
          <>
            <SourcesIconButton label={t.sources} onClick={() => setSourcesOpen(true)} floating />
            <ThemeIconButton label={`${t.themes} · ${t.typeface}`} onClick={() => setThemeOpen(true)} floating />
          </>
        )}
      </div>

      <SourcesSheet
        open={sourcesOpen}
        onClose={() => {
          setSourcesOpen(false);
          setSourcesRev((r) => r + 1);
        }}
        edition={edition}
        failures={failures}
      />
      <ThemeSheet open={themeOpen} onClose={() => setThemeOpen(false)} edition={edition} />

      <style>{`
        /* Chrome slides out where reading is headed and back the same way.
           Exit/enter = strong ease-out; interruptible transition retargets
           mid-flight when the scroll direction flips. */
        .vn-chrome {
          transform: translateY(0);
          opacity: 1;
          transition: transform var(--duration-slow) var(--easing-out), opacity var(--duration-slow) var(--easing-default);
        }
        /* In-flow chrome: quiet down without shifting the card below. */
        .vn-chrome-hidden {
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
        }
        /* Story columns land with a short right-to-left stagger — direction of
           reading, first column first. Decorative: never blocks interaction. */
        .vn-cell-in {
          animation: vn-cell-in var(--duration-slow) var(--easing-out) both;
        }
        @keyframes vn-cell-in {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        /* The inline article enters from the left edge — where reading is
           headed — and dismisses to the same edge (spatial consistency).
           The list underneath settles back: dim to focus, not a scrim. */
        .vn-article-layer { animation: vn-layer-in var(--duration-slow) var(--easing-drawer) both; }
        .vn-article-layer-out { animation: vn-layer-out 240ms var(--easing-drawer) both; }
        @keyframes vn-layer-in {
          from { opacity: 0; transform: translateX(-4%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes vn-layer-out {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-4%); }
        }
        .vn-list {
          opacity: 1;
          transform: translateX(0) scale(1);
          transition: opacity var(--duration-slow) var(--easing-drawer), transform var(--duration-slow) var(--easing-drawer);
        }
        .vn-list-dimmed {
          opacity: 0.25;
          transform: translateX(12px) scale(0.995);
          transition: opacity var(--duration-slow) var(--easing-drawer), transform var(--duration-slow) var(--easing-drawer);
        }
        @media (prefers-reduced-motion: reduce) {
          /* Gentler, not zero: chrome and columns fade in place, no travel. */
          .vn-chrome { transition: opacity 160ms var(--easing-default); }
          .vn-chrome-hidden { transform: translateY(0); }
          .vn-cell-in { animation: vn-cell-fade 160ms var(--easing-default) both; }
          @keyframes vn-cell-fade { from { opacity: 0; } to { opacity: 1; } }
          .vn-article-layer { animation: vn-layer-fade 160ms var(--easing-default) both; }
          .vn-article-layer-out { animation: vn-layer-fade 160ms var(--easing-default) both reverse; }
          @keyframes vn-layer-fade { from { opacity: 0; } to { opacity: 1; } }
          .vn-list-dimmed { transform: none; }
        }
      `}</style>
    </main>
  );
}

/** Floating translucent pill · the vertically.works floating-bar idiom. */
const floatingPillStyle: React.CSSProperties = {
  writingMode: "vertical-rl",
  textOrientation: "mixed",
  minHeight: 56,
  padding: "var(--space-3) var(--space-2)",
  borderRadius: "var(--radius-full)",
  border: "1px solid var(--color-border)",
  background: "color-mix(in srgb, var(--color-bg) 78%, transparent)",
  backdropFilter: "blur(8px)",
  color: "var(--color-fg-muted)",
  fontSize: "0.6875rem",
  letterSpacing: "0.1em",
  cursor: "pointer",
};

const chromeIconStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  border: "1px solid var(--color-border-strong)",
  background: "color-mix(in srgb, var(--color-bg) 78%, transparent)",
  backdropFilter: "blur(8px)",
  color: "var(--color-fg-muted)",
  cursor: "pointer",
  flexShrink: 0,
};

/** The sources control · a plain settings icon; the tooltip names it. */
function SourcesIconButton({
  label,
  onClick,
  floating = false,
}: {
  label: string;
  onClick: () => void;
  floating?: boolean;
}) {
  return (
    <button
      data-vw="chrome-button"
      type="button"
      className="pressable corner-round"
      aria-label={label}
      onClick={onClick}
      style={{ ...chromeIconStyle, ...(floating ? { width: 40, height: 40 } : {}) }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      </svg>
    </button>
  );
}

/** The theme control · a circle split paper/ink, painted by the live tokens. */
function ThemeIconButton({
  label,
  onClick,
  floating = false,
}: {
  label: string;
  onClick: () => void;
  floating?: boolean;
}) {
  return (
    <button
      data-vw="chrome-button"
      type="button"
      className="pressable corner-round"
      aria-label={label}
      onClick={onClick}
      style={{ ...chromeIconStyle, ...(floating ? { width: 40, height: 40 } : {}) }}
    >
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
    </button>
  );
}
