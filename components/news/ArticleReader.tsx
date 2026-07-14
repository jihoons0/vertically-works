"use client";

/**
 * ArticleReader · the standalone /article/[id] route, kept for deep links.
 *
 * In-app the front page swaps the card body to an inline ArticleView instead
 * of navigating; this route re-derives the item from the cached feed (no DB)
 * for shared/bookmarked URLs and renders the same ArticleView inside the
 * shared paper shell. Aged-out items are reconstructed from the link/title
 * riding in the URL, or get the calm 「기사가 지면에서 내려갔습니다」 page.
 */

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VerticalButton } from "@/components/news/vw/vertical-button";
import { VerticalText } from "./VerticalText";
import { AmbientGround, PaperGrain } from "./AmbientGround";
import { ArticleView, safeHost } from "./ArticleView";
import { STRINGS } from "@/lib/news/i18n";
import { getCustomFeeds, getDisabledSources } from "@/lib/news/prefs";
import { LANG_TAGS, type EditionId, type SectionId } from "@/lib/news/sources";
import type { NewsItem } from "@/lib/news/rss";

type Status = "loading" | "ready" | "gone";

export function ArticleReader({ id }: { id: string }) {
  const router = useRouter();
  const search = useSearchParams();
  const edition = (search.get("edition") ?? "ko") as EditionId;
  const section = (search.get("section") ?? "all") as SectionId;
  const fallbackLink = search.get("u") ?? undefined;
  const fallbackTitle = search.get("t") ?? undefined;
  const fallbackSource = search.get("s") ?? undefined;
  const t = STRINGS[edition];

  const [item, setItem] = useState<NewsItem | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  // ── Re-derive the item from the cached feed (no DB) ──
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ edition, section });
    for (const url of getCustomFeeds(edition)) params.append("custom", url);
    for (const off of getDisabledSources(edition)) params.append("off", off);
    fetch(`/api/news/feed?${params}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data: { items: NewsItem[] }) => {
        const found = data.items?.find((it) => it.id === id);
        if (found) {
          setItem(found);
          setStatus("ready");
        } else reconstructOrGiveUp();
      })
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        reconstructOrGiveUp();
      });

    // Aged out of the feed — but the link and title rode along in the URL,
    // so the extraction proxy can still set the full article vertically.
    function reconstructOrGiveUp() {
      if (fallbackLink && fallbackTitle) {
        setItem({
          id,
          edition,
          section,
          sourceName: fallbackSource ?? safeHost(fallbackLink),
          title: fallbackTitle,
          description: "",
          link: fallbackLink,
          publishedAt: "",
        });
        setStatus("ready");
      } else setStatus("gone");
    }
    return () => controller.abort();
  }, [id, edition, section, fallbackLink, fallbackTitle, fallbackSource]);

  if (status === "loading") {
    return (
      <PaperShell>
        <div style={centerStyle}>
          <p className="vt-reading" style={quietTextStyle}>
            <VerticalText text={t.loading} />
          </p>
        </div>
      </PaperShell>
    );
  }

  if (status === "gone") {
    return (
      <PaperShell mainProps={{ lang: LANG_TAGS[edition] }}>
        <div style={centerStyle}>
          <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-8)", alignItems: "center" }}>
            <p className="vt-reading" style={{ ...quietTextStyle, fontSize: "1.25rem" }}>
              <VerticalText text={t.gone} />
            </p>
            <p className="vt-reading" style={quietTextStyle}>
              <VerticalText text={t.goneHint} />
            </p>
            <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-3)" }}>
              {fallbackLink && (
                <VerticalButton onClick={() => window.open(fallbackLink, "_blank", "noopener")}>
                  {t.original}
                </VerticalButton>
              )}
              <VerticalButton variant="outline" onClick={() => router.push("/apps/news")}>
                {t.back}
              </VerticalButton>
            </div>
          </div>
        </div>
      </PaperShell>
    );
  }

  return (
    <PaperShell mainProps={{ lang: LANG_TAGS[edition], className: "vn-article-enter" }}>
      <ArticleView item={item!} edition={edition} onClose={() => router.push("/apps/news")} />
      <style>{`
        .vn-article-enter { animation: vn-article-in var(--duration-page) var(--easing-out) both; }
        @keyframes vn-article-in {
          from { opacity: 0; transform: translateX(-14px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vn-article-enter { animation-duration: 160ms; animation-name: vn-article-fade; }
          @keyframes vn-article-fade { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>
    </PaperShell>
  );
}

/**
 * The article route shares the front page's stage: a giant paper card with an
 * inset bounding box, floating on the ambient mesh-gradient ground.
 */
function PaperShell({
  children,
  mainProps,
}: {
  children: React.ReactNode;
  mainProps?: React.HTMLAttributes<HTMLElement>;
}) {
  const { style: mainStyle, ...restMain } = mainProps ?? {};
  return (
    <main
      {...restMain}
      style={{
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "var(--space-4) var(--space-6) var(--space-5)",
        ...mainStyle,
      }}
    >
      <AmbientGround />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          background: "var(--color-bg)",
          boxShadow: "var(--shadow-soft)",
          overflow: "hidden",
        }}
      >
        {children}
        <PaperGrain />
      </div>
    </main>
  );
}

const centerStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const quietTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "0.9375rem",
  letterSpacing: "0.15em",
  lineHeight: 2,
  color: "var(--color-fg-muted)",
  maxHeight: "70vh",
};
