"use client";

/**
 * The 1면 — headline columns laid into two stacked rows, reading R→L. The
 * grid flows column-major (top→bottom, then leftward) and scrolls as one; the
 * first story sits at the top-right. Navigation lives in the right-edge
 * `NavRail` breadcrumb (date › region › category › article). DOM order =
 * reading order; `direction: rtl` handles the visuals (PRD §6.1).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { PaperGrain } from "./AmbientGround";
import { VerticalListCell } from "@/components/news/vw/vertical-list-cell";
import { NavRail } from "./NavRail";
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

const CELL_WIDTH = 128;
const CELL_GAP = 16;
const ROWS = 2; // the front page lays articles into two stacked rows

export function FrontPage() {
  const [edition, setEdition] = useState<EditionId>("ko");
  const [section, setSection] = useState<SectionId>("all");
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [failures, setFailures] = useState<FeedFailure[]>([]);
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
      const base = window.location.pathname.startsWith("/run/news") ? "/run/news" : "";
      window.history.pushState({ vnArticle: item.id }, "", `${base}/article/${item.id}?${carry}`);
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

  // Track scroll position for the story indicator. The grid flows column-major
  // into 2 rows and scrolls R→L; `direction: rtl` reports a negative scrollLeft
  // at the start edge (0) growing negative forward — same convention as the old
  // row-reverse scroller. `Math.abs` guards any browser that flips the sign.
  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const forward = Math.abs(el.scrollLeft);
    lastScroll.current = forward;
    const col = Math.round(forward / (CELL_WIDTH + CELL_GAP));
    setStoryIndex(Math.min(Math.max(1, col * ROWS + 1), items?.length ?? 1));
  }, [items?.length]);

  return (
    <main
      aria-label={t.frontPage}
      style={{
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-bg)",
      }}
    >
      {/* ─── The paper · full-bleed: chrome, hairline, and columns ─── */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          background: "var(--color-bg)",
          overflow: "hidden",
        }}
      >
      {/* ─── Rail at the reading start (right) · columns fill the rest ─── */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "row-reverse" }}>
        <NavRail
          edition={edition}
          section={section}
          onEditionChange={changeEdition}
          onSectionChange={changeSection}
          activeStory={activeStory}
          onArticleCrumb={collapseArticle}
          onOpenSources={() => setSourcesOpen(true)}
          onOpenTheme={() => setThemeOpen(true)}
          t={t}
          compact={mobile}
        />

        {/* ─── Story columns · the article layers over them in place ─── */}
        <section style={{ flex: 1, minWidth: 0, position: "relative", overflow: "hidden" }}>
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
              direction: "rtl", // first column at the right; forward = leftward
              padding: mobile ? "var(--space-4)" : "var(--space-6)",
              scrollBehavior: "auto",
            }}
          >
            {items === null ? (
              <ColumnSkeleton count={12} cellWidth={CELL_WIDTH} gap={CELL_GAP} />
            ) : items.length === 0 ? (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p
                  className="vt-reading"
                  style={{ margin: 0, fontSize: "1rem", color: "var(--color-fg-muted)", letterSpacing: "0.2em" }}
                >
                  <VerticalText text={t.empty} />
                </p>
              </div>
            ) : (
              <div
                key={`${edition}-${section}`}
                role="list"
                aria-label={t.stories}
                style={{
                  display: "grid",
                  gridTemplateRows: "1fr 1fr", // two stacked rows
                  gridAutoFlow: "column", // fill top→bottom, then next column
                  gridAutoColumns: `${CELL_WIDTH}px`,
                  gap: CELL_GAP,
                  height: "100%",
                }}
              >
                {items.map((item, i) => (
                  <div
                    key={item.id}
                    role="listitem"
                    className="vn-cell-in"
                    style={{
                      height: "100%",
                      minWidth: 0,
                      minHeight: 0, // let the 1fr row size the cell, not its content
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
                      body={
                        item.description ? (
                          <span style={{ fontFamily: "var(--font-reading)" }}>
                            <VerticalText text={item.description} />
                          </span>
                        ) : undefined
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
                      style={{ width: "100%", height: "100%" }}
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
      </div>
      <PaperGrain />
      </div>

      {/* ─── Floating story indicator · tap returns to the first column ─── */}
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
            onClick={() => scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" })}
            className="pressable"
            style={{ ...floatingPillStyle, fontFamily: "var(--font-mono)" }}
          >
            <VerticalText text={t.storyIndicator(storyIndex, items.length)} chrome />
          </button>
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
          /* Gentler, not zero: columns fade in place, no travel. */
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
