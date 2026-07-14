"use client";

/**
 * Sources sheet (PRD §6.3) · slides in from the LEFT edge — forward direction
 * = deeper — and dismisses to the same edge (kit sheet handles the geometry
 * and modal semantics). Default sources toggle on/off (up = on); a custom RSS
 * URL can be added per edition (validated server-side through the same proxy);
 * parse errors and remove-confirmation use the kit dialog. Feed failures from
 * the last fetch surface here, never as a blank front page.
 */

import { useEffect, useState } from "react";
import { VerticalSheet } from "@/components/news/vw/sheet";
import { VerticalToggle } from "@/components/news/vw/toggle";
import { VerticalDialog } from "@/components/news/vw/dialog";
import { VerticalTextField } from "@/components/news/vw/text-field";
import { VerticalButton } from "@/components/news/vw/vertical-button";
import { VerticalText } from "./VerticalText";
import { STRINGS } from "@/lib/news/i18n";
import {
  getCustomFeeds,
  getDisabledSources,
  setCustomFeeds,
  setDisabledSources,
} from "@/lib/news/prefs";
import { sourcesFor, type EditionId } from "@/lib/news/sources";
import type { FeedFailure } from "@/lib/news/rss";

export function SourcesSheet({
  open,
  onClose,
  edition,
  failures,
}: {
  open: boolean;
  onClose: () => void;
  edition: EditionId;
  failures: FeedFailure[];
}) {
  const t = STRINGS[edition];
  const defaults = sourcesFor(edition);

  const [disabled, setDisabled] = useState<string[]>([]);
  const [custom, setCustom] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [removeTarget, setRemoveTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setDisabled(getDisabledSources(edition));
    setCustom(getCustomFeeds(edition));
    setUrl("");
  }, [open, edition]);

  const toggleSource = (id: string, on: boolean) => {
    const next = on ? disabled.filter((d) => d !== id) : [...disabled, id];
    setDisabled(next);
    setDisabledSources(edition, next);
  };

  const addFeed = async () => {
    const candidate = url.trim();
    if (!candidate || adding) return;
    setAdding(true);
    try {
      const res = await fetch(`/api/news/feed?edition=${edition}&validate=${encodeURIComponent(candidate)}`);
      const verdict = await res.json();
      if (!verdict.ok) {
        setParseError(verdict.reason ?? t.parseErrorBody);
        return;
      }
      const next = [...custom.filter((c) => c !== candidate), candidate];
      setCustom(next);
      setCustomFeeds(edition, next);
      setUrl("");
    } catch {
      setParseError(t.parseErrorBody);
    } finally {
      setAdding(false);
    }
  };

  const removeFeed = (target: string) => {
    const next = custom.filter((c) => c !== target);
    setCustom(next);
    setCustomFeeds(edition, next);
    setRemoveTarget(null);
  };

  const failedNames = new Set(failures.map((f) => f.sourceName));

  return (
    <VerticalSheet
      open={open}
      onClose={onClose}
      edge="left"
      aria-label={t.sources}
      panelStyle={{ width: "min(88vw, 480px)", maxWidth: "min(88vw, 480px)" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        {/* Default sources · vertical cells, toggle up = on */}
        <section aria-label={t.defaultSources}>
          <h2 style={sheetHeadingStyle}>{t.defaultSources}</h2>
          <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "flex-end" }}>
            {defaults.map((source) => {
              const on = !disabled.includes(source.id);
              const failed = failedNames.has(source.name);
              const labelId = `src-${source.id}`;
              return (
                <div
                  key={source.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    padding: "var(--space-4) var(--space-3)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                    minHeight: 220,
                  }}
                >
                  <span
                    id={labelId}
                    className="vt-reading"
                    style={{ fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "0.1em", flex: 1 }}
                  >
                    <VerticalText text={source.name} exempt />
                  </span>
                  {failed && (
                    <span
                      className="vt-reading"
                      style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.08em" }}
                    >
                      <VerticalText text={t.feedFailed} />
                    </span>
                  )}
                  <VerticalToggle checked={on} onCheckedChange={(next) => toggleSource(source.id, next)} aria-labelledby={labelId} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Custom feeds */}
        <section aria-label={t.customFeeds}>
          <h2 style={sheetHeadingStyle}>{t.addFeed}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void addFeed();
            }}
            style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}
          >
            <VerticalTextField
              label={t.feedUrl}
              value={url}
              onChange={setUrl}
              placeholder="https://…/rss.xml"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              style={{ flex: 1 }}
            />
            <VerticalButton type="submit" variant="outline" disabled={adding} style={{ minHeight: 96 }}>
              {adding ? t.adding : t.add}
            </VerticalButton>
          </form>

          {custom.length > 0 && (
            <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "flex-end", marginTop: "var(--space-4)" }}>
              {custom.map((feedUrl) => (
                <div
                  key={feedUrl}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    padding: "var(--space-4) var(--space-3)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                    minHeight: 220,
                  }}
                >
                  {/* Latin URL text rotates as one unit per §2 — native to vertical-rl. */}
                  <span
                    className="vt-reading"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                      flex: 1,
                      maxHeight: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "var(--color-fg-muted)",
                    }}
                  >
                    <VerticalText text={shortUrl(feedUrl)} exempt />
                  </span>
                  <VerticalButton variant="ghost" onClick={() => setRemoveTarget(feedUrl)} style={{ minHeight: 72, fontSize: "0.75rem" }}>
                    {t.remove}
                  </VerticalButton>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Parse error · dim-to-focus */}
      <VerticalDialog
        open={parseError !== null}
        onClose={() => setParseError(null)}
        title={t.parseErrorTitle}
        description={t.parseErrorBody}
        actions={
          <VerticalButton variant="outline" onClick={() => setParseError(null)}>
            {t.close}
          </VerticalButton>
        }
      />

      {/* Remove confirmation */}
      <VerticalDialog
        open={removeTarget !== null}
        onClose={() => setRemoveTarget(null)}
        title={t.removeConfirmTitle}
        description={t.removeConfirmBody}
        actions={
          <>
            <VerticalButton onClick={() => removeTarget && removeFeed(removeTarget)}>{t.remove}</VerticalButton>
            <VerticalButton variant="ghost" onClick={() => setRemoveTarget(null)}>
              {t.cancel}
            </VerticalButton>
          </>
        }
      />
    </VerticalSheet>
  );
}

const sheetHeadingStyle: React.CSSProperties = {
  margin: "0 0 var(--space-4)",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "var(--color-fg-subtle)",
};

function shortUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "") + (u.pathname === "/" ? "" : u.pathname);
  } catch {
    return url;
  }
}
