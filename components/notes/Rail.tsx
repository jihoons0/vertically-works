"use client";

import { useTheme } from "next-themes";
import { useLocale } from "@/lib/notes/i18n";

export type Filter = "active" | "done" | "all";

const FILTER_IDS: Filter[] = ["active", "done", "all"];

const iconBtn: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: "var(--radius-full)",
  border: "1px solid var(--color-border)",
  background: "var(--color-bg)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.9rem",
  color: "var(--color-fg)",
  fontFamily: "inherit",
};

export function Rail({
  total,
  done,
  filter,
  setFilter,
  onClearDone,
  onHelp,
}: {
  total: number;
  done: number;
  filter: Filter;
  setFilter: (f: Filter) => void;
  onClearDone: () => void;
  onHelp: () => void;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");
  const { t } = useLocale();
  const ratio = total === 0 ? 0 : done / total;

  return (
    <aside
      aria-label={t.a11y.controls}
      className="vd-rail"
      style={{
        flexShrink: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-4)",
        padding: "var(--space-6) var(--space-4)",
        borderInlineStart: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
      }}
    >
      {/* Top zone — identity + progress, filling the upper half so the filter lands
          exactly at the vertical centre. */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row-reverse", gap: "var(--space-1)", alignItems: "flex-start" }}>
          <span className="v-text" style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--color-fg)" }}>
            {t.appTitle}
          </span>
          <span
            className="v-text"
            style={{ fontSize: "0.625rem", letterSpacing: "0.18em", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", paddingTop: 2 }}
          >
            VERTICALLY&nbsp;DO
          </span>
        </div>

        {/* Progress meter — a vertical bar filling top→down along the reading axis */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)", flex: 1, minHeight: 0 }}>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={done}
            aria-label={t.a11y.progress}
            style={{ position: "relative", width: 6, flex: 1, minHeight: 48, borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)", overflow: "hidden" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: `${ratio * 100}%`,
                background: "var(--color-fg)",
                borderRadius: "var(--radius-full)",
                transition: "height var(--duration-slow) var(--easing-drawer)",
              }}
            />
          </div>
          <span className="tcy" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6875rem", color: "var(--color-fg-muted)" }}>
            {done}/{total}
          </span>
        </div>
      </div>

      {/* Filter — vertical segmented control, vertically centred in the rail */}
      <div
        role="tablist"
        aria-label={t.a11y.view}
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 3,
          borderRadius: "var(--radius-full)",
          background: "var(--color-bg-muted)",
          border: "1px solid var(--color-border)",
        }}
      >
        {FILTER_IDS.map((id) => {
          const on = filter === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={on}
              className="pressable"
              onClick={() => setFilter(id)}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                padding: "var(--space-3) var(--space-2)",
                borderRadius: "var(--radius-full)",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                background: on ? "var(--color-fg)" : "transparent",
                color: on ? "var(--color-bg)" : "var(--color-fg-muted)",
                transition: "background var(--duration-base) var(--easing-out), color var(--duration-base) var(--easing-default)",
              }}
            >
              {t.filters[id]}
            </button>
          );
        })}
      </div>

      {/* Bottom zone — actions pinned to the bottom, mirroring the top zone. */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: "var(--space-3)" }}>
        {done > 0 && (
          <button
            className="pressable link-muted-hover"
            onClick={onClearDone}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              padding: "var(--space-1)",
            }}
          >
            {t.clearDone}
          </button>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <button className="pressable" aria-label={t.a11y.help} onClick={onHelp} style={iconBtn}>
            ?
          </button>
          <button className="pressable" aria-label={isDark ? t.a11y.light : t.a11y.dark} onClick={toggle} style={iconBtn}>
            {isDark ? "☾" : "☀"}
          </button>
        </div>
      </div>
    </aside>
  );
}
