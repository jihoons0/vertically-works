"use client";

/**
 * ArticleView · the reading surface, embeddable (PRD §6.2).
 *
 * Renders an already-resolved NewsItem as paginated tiered columns inside
 * whatever container hosts it — the front page's card body (inline, no page
 * navigation) or the standalone /article route for deep links.
 *
 * Fluid-interface notes (apple-design): the pull tracks the pointer 1:1 and
 * is interruptible; enter/exit happen on the same edge; pulling rightward
 * past the first page is the dismiss gesture — the same motion that pages
 * backward keeps going and collapses the article (`onClose`). Escape and the
 * rail's back button do the same.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TieredPage, type TieredPageColumn } from "@/components/news/vw/tiered-page";
import { VerticalButton } from "@/components/news/vw/vertical-button";
import { VerticalSheet } from "@/components/news/vw/sheet";
import { VerticalText } from "./VerticalText";
import { PullRing } from "./PullRing";
import { STRINGS } from "@/lib/news/i18n";
import { relativeTime } from "@/lib/news/time";
import { LANG_TAGS, type EditionId } from "@/lib/news/sources";
import type { NewsItem } from "@/lib/news/rss";
import { composeColumns, tokenize, toVerticalForms, type VTCell } from "@/lib/news/vertical-text";

const COLUMN_WIDTH = 30;
const COLUMN_GAP = 14;
const BODY_GLYPH = 18; // one glyph box of kinsoku slack per column
const BODY_GLYPH_ADVANCE = 17.6; // exact vertical advance: 1rem + 0.1em tracking
const HEAD_GLYPH = 31; // 1.875rem headline glyph + 0.02em tracking
const HEAD_COLUMN = 44; // headline column thickness (1.875rem × 1.45 line-height)
const META_WIDTH = 24; // the attribution column beside the headline
const PULL_THRESHOLD = 96; // px of pull to arm

export function safeHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ArticleView({
  item: story,
  edition,
  onClose,
}: {
  item: NewsItem;
  edition: EditionId;
  onClose: () => void;
}) {
  const t = STRINGS[edition];

  const [fullText, setFullText] = useState<string | null>(null);
  // 'loading' while the extraction proxy is out fetching; 'done' after it
  // resolves either way — so an empty body is a stated fact, not a blank.
  const [bodyState, setBodyState] = useState<"loading" | "done">("loading");
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState<"next" | "prev" | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Pull gesture state · progress in [-1..1+]: negative = previous/dismiss.
  const [pull, setPull] = useState(0);
  const pointer = useRef<{ startX: number; active: boolean }>({ startX: 0, active: false });
  const wheelAccum = useRef(0);
  const wheelIdle = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ width: 0, height: 0 });

  // Full article body: the feed rarely carries it, so ask the extraction
  // proxy for the publisher page's text. The description page shows first;
  // the composed pages take over when the full text lands.
  useEffect(() => {
    setFullText(null);
    setBodyState("loading");
    setPage(0);
    setTurn(null);
    if (story.content && story.content.length > 400) {
      setFullText(story.content);
      setBodyState("done");
      return;
    }
    const controller = new AbortController();
    fetch(`/api/news/article?u=${encodeURIComponent(story.link)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data: { content: string | null }) => {
        if (data.content && data.content.length > (story.content?.length ?? 0)) {
          setFullText(data.content);
        } else if (story.content) setFullText(story.content);
        setBodyState("done");
      })
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        if (story.content) setFullText(story.content);
        setBodyState("done");
      });
    return () => controller.abort();
  }, [story]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      // Ignore transient zero reads (detached/animating nodes).
      if (el.clientWidth > 0 && el.clientHeight > 0) {
        setStage({ width: el.clientWidth, height: el.clientHeight });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Headline geometry · the opening block hugs its own column count ──
  const headline = useMemo(() => {
    if (stage.height === 0) return { width: 200 };
    const glyphs = Array.from(story.title).length;
    const perCol = Math.max(4, Math.floor((stage.height * 0.88) / HEAD_GLYPH));
    const cols = Math.max(1, Math.ceil(glyphs / perCol));
    const width = Math.min(cols * HEAD_COLUMN + META_WIDTH + 20, stage.width * 0.42);
    return { width };
  }, [story, stage]);

  // ── Compose the body into pages of tiered columns ──
  const composed = useMemo(() => {
    if (stage.width === 0 || stage.height === 0) return null;
    const body = fullText ?? "";
    if (!body) return { pages: [] as VTCell[][][], pageHeight: 0 };
    // TieredPage: two tiers + divider (1px + 32px margins).
    const tierHeight = (stage.height - 33) / 2;
    const perColumn = Math.max(6, Math.floor((tierHeight - BODY_GLYPH) / BODY_GLYPH_ADVANCE));
    const cells = tokenize(body.replace(/\n+/g, "　"));
    const spaceWeight = edition === "ko" ? 0.5 : 1;
    // §2: a rotated Latin word stands ≈0.6 boxes per letter; a tcy digit
    // group is one box; spaces are shorter than a glyph box.
    const weight = (c: VTCell) =>
      c.kind === "latin" ? Math.max(1, c.content.length * 0.6) : c.kind === "space" ? spaceWeight : 1;
    const columns = composeColumns(cells, perColumn, {
      cellOf: (c: VTCell) => c,
      weightOf: weight,
    });
    // Wrap the page height to the longest column that actually composed.
    const maxUnits = columns.reduce(
      (max, column) => Math.max(max, column.reduce((sum, c) => sum + weight(c), 0)),
      0
    );
    const pageHeight = Math.ceil(maxUnits * BODY_GLYPH_ADVANCE + 4) * 2 + 33;
    const columnsPerTier = Math.max(2, Math.floor(stage.width / (COLUMN_WIDTH + COLUMN_GAP)));
    const perPage = columnsPerTier * 2;
    const firstPageTier = Math.max(
      1,
      Math.floor((stage.width - headline.width - 32) / (COLUMN_WIDTH + COLUMN_GAP))
    );
    const firstPage = firstPageTier * 2;
    const out: VTCell[][][] = [];
    out.push(columns.slice(0, firstPage));
    for (let i = firstPage; i < columns.length; i += perPage) out.push(columns.slice(i, i + perPage));
    return { pages: out, pageHeight };
  }, [story, fullText, stage, edition, headline.width]);

  const pages = composed?.pages ?? null;
  const total = pages ? Math.max(1, pages.length) : 1;

  const goTo = useCallback(
    (next: number, direction: "next" | "prev") => {
      if (next < 0 || next >= total) return;
      setTurn(direction);
      setPage(next);
    },
    [total]
  );

  const forward = useCallback(() => goTo(page + 1, "next"), [goTo, page]);
  const backward = useCallback(() => {
    // Past the first page, the backward motion keeps going and dismisses —
    // same edge in, same edge out (spatial consistency).
    if (page === 0) onClose();
    else goTo(page - 1, "prev");
  }, [goTo, page, onClose]);

  // ── Keyboard: ← is forward on the R→L axis; Escape collapses ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("input, textarea, [role=dialog]")) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        forward();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        backward();
      } else if (e.key === " ") {
        e.preventDefault();
        forward();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [forward, backward, onClose]);

  // ── Pull-to-paginate · pointer tracks 1:1, fires on release ──
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    pointer.current = { startX: e.clientX, active: true };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointer.current.active) return;
    const dx = e.clientX - pointer.current.startX;
    // Pull leftward (dx<0) = toward the next page; rightward = previous/close.
    setPull(-dx / PULL_THRESHOLD);
  };
  const releasePull = () => {
    if (!pointer.current.active) return;
    pointer.current.active = false;
    setPull((p) => {
      if (p >= 1) forward();
      else if (p <= -1) backward();
      return 0;
    });
  };

  // Wheel/trackpad: accumulate horizontal overscroll, fire when armed.
  const onWheel = (e: React.WheelEvent) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    wheelAccum.current += d;
    const p = wheelAccum.current / PULL_THRESHOLD;
    setPull(p);
    if (p >= 1) {
      wheelAccum.current = 0;
      setPull(0);
      forward();
    } else if (p <= -1) {
      wheelAccum.current = 0;
      setPull(0);
      backward();
    }
    if (wheelIdle.current) clearTimeout(wheelIdle.current);
    wheelIdle.current = setTimeout(() => {
      wheelAccum.current = 0;
      setPull(0);
    }, 180);
  };

  const descriptionOnly = !pages || pages.length === 0;
  const pullVisible = Math.abs(pull) > 0.04;

  return (
    <div
      lang={LANG_TAGS[edition]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={releasePull}
      onPointerCancel={releasePull}
      onWheel={onWheel}
      style={{
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        // Left clearance for the floating action rail.
        padding: "var(--space-6) var(--space-8) var(--space-6) 96px",
        touchAction: "pan-y",
        cursor: pointer.current.active ? "grabbing" : undefined,
      }}
    >
      {/* ─── The page · headline opens page 1 with larger columns ─── */}
      <div ref={stageRef} style={{ flex: 1, minHeight: 0, display: "flex" }}>
      <div
        key={page}
        className={
          turn === null ? undefined : turn === "next" ? "vn-page-in-left" : "vn-page-in-right"
        }
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: "var(--space-8)",
          // The pull tracks the pointer 1:1 · transform-only.
          transform: pullVisible ? `translateX(${-Math.max(-1.4, Math.min(1.4, pull)) * 28}px)` : undefined,
          transition: pullVisible ? "none" : "transform var(--duration-base) var(--easing-out)",
        }}
      >
        {page === 0 && (
          <header
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "var(--space-5)",
              flexShrink: 0,
              maxHeight: "100%",
              width: descriptionOnly ? undefined : headline.width,
              maxWidth: descriptionOnly ? "70%" : headline.width,
            }}
          >
            <h1
              className="vt-reading"
              style={{
                margin: 0,
                fontSize: "1.875rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
                lineHeight: 1.45,
                color: "var(--color-fg)",
                maxHeight: "100%",
                overflow: "hidden",
              }}
            >
              <VerticalText text={story.title} />
            </h1>
            {/* Attribution rides beside the headline as metadata. */}
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-2)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "var(--color-fg-muted)",
                paddingTop: 2,
                maxHeight: "100%",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://${safeHost(story.link)}/favicon.ico`}
                alt=""
                width={14}
                height={14}
                style={{ borderRadius: 3, filter: "grayscale(1)", opacity: 0.85, flexShrink: 0 }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="vt-reading" style={{ overflow: "hidden", minHeight: 0 }}>
                <VerticalText text={story.sourceName} exempt chrome />
                {relativeTime(story.publishedAt, edition) && (
                  <>
                    {" · "}
                    <VerticalText text={relativeTime(story.publishedAt, edition)} chrome />
                  </>
                )}
              </span>
            </span>
            {descriptionOnly && story.description && (
              <p
                className="vt-reading"
                style={{
                  margin: 0,
                  fontSize: "1.0625rem",
                  lineHeight: 2,
                  letterSpacing: "0.1em",
                  color: "var(--color-fg)",
                  maxHeight: "100%",
                  overflow: "hidden",
                }}
              >
                <VerticalText text={story.description} />
              </p>
            )}
          </header>
        )}

        {/* ─── Body · three honest states: composing, composed, absent ─── */}
        {descriptionOnly && bodyState === "loading" && <BodyGhost />}

        {descriptionOnly && bodyState === "done" && !story.description && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p
              className="vt-reading"
              style={{
                margin: 0,
                fontSize: "0.9375rem",
                letterSpacing: "0.15em",
                lineHeight: 2,
                color: "var(--color-fg-muted)",
                maxHeight: "60%",
              }}
            >
              <VerticalText text={t.noBody} />
            </p>
          </div>
        )}

        {!descriptionOnly && pages && (
          // Height wraps the composed columns exactly; centered on the page.
          <div style={{ flex: 1, minWidth: 0, alignSelf: "center" }}>
            <TieredPage
              columns={pages[page].map(
                (column): TieredPageColumn => ({
                  text: (
                    <span className="vt-reading" style={{ letterSpacing: "0.1em" }}>
                      {column.map((cell) =>
                        cell.kind === "digit" ? (
                          <span key={cell.id} className="tcy">
                            {cell.content}
                          </span>
                        ) : (
                          <span key={cell.id}>
                            {cell.content === "　" ? " " : toVerticalForms(cell.content)}
                          </span>
                        )
                      )}
                    </span>
                  ),
                })
              )}
              numbered={false}
              height={composed?.pageHeight || 480}
              columnWidth={COLUMN_WIDTH}
              columnGap={COLUMN_GAP}
            />
          </div>
        )}
      </div>
      </div>

      {/* ─── Pull rings · the left one sits above the action rail ─── */}
      <div style={{ position: "absolute", left: "var(--space-4)", top: "30%", transform: "translateY(-50%)", zIndex: 5 }}>
        <PullRing progress={pull} visible={pull > 0.04 && page < total - 1} />
      </div>
      <div style={{ position: "absolute", right: "var(--space-4)", top: "50%", transform: "translateY(-50%)", zIndex: 5 }}>
        {/* At the first page the rightward pull dismisses — the ring still arms. */}
        <PullRing progress={-pull} visible={pull < -0.04} />
      </div>

      {/* ─── Action rail · vertically centered on the left edge ─── */}
      <nav
        style={{
          position: "absolute",
          left: "var(--space-4)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-3)",
        }}
      >
        <button
          data-vw="icon-button"
          type="button"
          className="pressable corner-round"
          aria-label={t.back}
          onClick={onClose}
          style={iconButtonStyle}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 6-6 6 6 6" />
            <path d="M3 12h14a4 4 0 0 1 4 4v2" />
          </svg>
        </button>
        <button
          data-vw="icon-button"
          type="button"
          className="pressable corner-round"
          aria-label={t.share}
          onClick={() => setShareOpen(true)}
          style={iconButtonStyle}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3v12" />
            <path d="m8 7 4-4 4 4" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
          </svg>
        </button>
        <VerticalButton
          variant="outline"
          onClick={() => window.open(story.link, "_blank", "noopener")}
          style={{ minHeight: 96, fontSize: "0.8125rem" }}
        >
          {t.original}
        </VerticalButton>
      </nav>

      {/* ─── Page indicator · floating mono pill, bottom-left ─── */}
      {!descriptionOnly && total > 1 && (
        <span
          className="vt-reading"
          aria-live="polite"
          style={{
            position: "absolute",
            left: "var(--space-4)",
            bottom: "var(--space-4)",
            zIndex: 10,
            writingMode: "vertical-rl",
            padding: "var(--space-3) var(--space-2)",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--color-border)",
            background: "color-mix(in srgb, var(--color-bg) 78%, transparent)",
            backdropFilter: "blur(8px)",
            color: "var(--color-fg-muted)",
            fontSize: "0.6875rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
          }}
        >
          <VerticalText text={t.pageOf(page + 1, total)} chrome />
        </span>
      )}

      {/* ─── Share · kit sheet ─── */}
      <VerticalSheet open={shareOpen} onClose={() => setShareOpen(false)} edge="bottom" aria-label={t.share}>
        <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-3)", justifyContent: "center" }}>
          {typeof navigator !== "undefined" && "share" in navigator && (
            <VerticalButton
              onClick={() => {
                navigator.share({ title: story.title, url: story.link }).catch(() => {});
                setShareOpen(false);
              }}
            >
              {t.share}
            </VerticalButton>
          )}
          <VerticalButton
            variant="outline"
            onClick={() => {
              navigator.clipboard?.writeText(story.link).then(() => setCopied(true));
            }}
          >
            {copied ? "✓" : "URL"}
          </VerticalButton>
        </div>
      </VerticalSheet>

      <style>{`
        /* Page turns stay inside the 300ms UI budget. */
        .vn-page-in-left { animation: vn-page-left var(--duration-slow) var(--easing-out) both; }
        .vn-page-in-right { animation: vn-page-right var(--duration-slow) var(--easing-out) both; }
        @keyframes vn-page-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes vn-page-right {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vn-page-in-left, .vn-page-in-right {
            animation-duration: 160ms;
            animation-name: vn-page-fade;
          }
          @keyframes vn-page-fade { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>
    </div>
  );
}

/**
 * BodyGhost · loading respects the grid: ghost columns mirror the article's
 * exact column metrics (width, gap, two tiers) so composed text lands where
 * the ghosts were. Opacity-only pulse; static under reduced motion.
 */
function BodyGhost() {
  const heights = [0.92, 0.7, 0.85, 0.62, 0.8, 0.88, 0.66, 0.78, 0.9, 0.72];
  return (
    <div
      aria-hidden
      style={{
        flex: 1,
        minWidth: 0,
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        gap: 33,
        padding: "var(--space-4) 0",
      }}
    >
      {[0, 1].map((tier) => (
        <div
          key={tier}
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "row-reverse",
            gap: COLUMN_GAP + 14,
            overflow: "hidden",
          }}
        >
          {heights.map((h, i) => (
            <span
              key={i}
              className="vn-ghost-col"
              style={{
                width: 16,
                height: `${h * 100}%`,
                flexShrink: 0,
                borderRadius: "var(--radius-full)",
                background: "var(--color-bg-muted)",
                animationDelay: `${(tier * heights.length + i) * 50}ms`,
              }}
            />
          ))}
        </div>
      ))}
      <style>{`
        .vn-ghost-col { animation: vn-ghost-pulse 1.4s var(--easing-in-out) infinite; }
        @keyframes vn-ghost-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (prefers-reduced-motion: reduce) {
          .vn-ghost-col { animation: none; opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

const iconButtonStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  border: "1px solid var(--color-border-strong)",
  background: "color-mix(in srgb, var(--color-bg) 78%, transparent)",
  backdropFilter: "blur(8px)",
  color: "var(--color-fg-muted)",
  cursor: "pointer",
};
