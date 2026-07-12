"use client";

import { useLocale } from "@/lib/notes/i18n";
import type { Board } from "@/lib/notes/store";

export type Filter = "active" | "done" | "all";

const FILTER_IDS: Filter[] = ["active", "done", "all"];

const CELL = 46; // filter cell height
const GAP = 2;

export function TrashIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function GridIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function PencilIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

export function Rail({
  board,
  closing,
  filter,
  setFilter,
  onZoomOut,
  onEditBoard,
}: {
  board: Board;
  closing?: boolean;
  total: number;
  done: number;
  filter: Filter;
  setFilter: (f: Filter) => void;
  onHelp: () => void;
  onZoomOut: () => void;
  onEditBoard: () => void;
}) {
  const { t } = useLocale();
  const activeIndex = FILTER_IDS.indexOf(filter);

  return (
    <aside
      aria-label={t.a11y.controls}
      className="vd-rail"
      data-closing={closing ? "" : undefined}
      style={{
        position: "fixed",
        right: "var(--space-4)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-3)",
      }}
    >
      {/* Grid — a circular icon button that zooms back out to the overview
          (the group tree). Just the icon; the board's identity is the button
          below it. */}
      <button
        className="pressable"
        aria-label={t.boards.back}
        onClick={onZoomOut}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
          color: "var(--color-fg)",
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: "var(--shadow-column)",
          flexShrink: 0,
        }}
      >
        <GridIcon size={18} />
      </button>

      {/* Board name + pencil — the group's identity; tapping opens the
          rename / delete overlay. Name on top, pencil below. */}
      <button
        className="pressable new-tile"
        aria-label={`${t.boards.editBoard} · ${board.title}`}
        onClick={onEditBoard}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-2)",
          padding: "var(--space-4) var(--space-2)",
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
          color: "var(--color-fg)",
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: "var(--shadow-column)",
        }}
      >
        <span
          className="v-text"
          style={{ fontSize: "1.0625rem", fontWeight: 700, letterSpacing: "0.08em", whiteSpace: "nowrap", maxHeight: "30vh", overflow: "hidden" }}
        >
          {board.title}
        </span>
        <PencilIcon size={13} />
      </button>

      {/* Filter — a capsule styled exactly like the language toggle, with a
          sliding indicator. No title, no panel, no divider. */}
      <div
        role="tablist"
        aria-label={t.a11y.view}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: GAP,
          padding: 3,
          borderRadius: "var(--radius-full)",
          background: "var(--color-bg-subtle)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-column)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 3,
            right: 3,
            top: 3,
            height: CELL,
            borderRadius: "var(--radius-full)",
            background: "var(--color-fg)",
            transform: `translateY(${activeIndex * (CELL + GAP)}px)`,
            transition: "transform var(--duration-base) var(--easing-drawer)",
          }}
        />
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
                position: "relative",
                zIndex: 1,
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                width: 40,
                height: CELL,
                borderRadius: "var(--radius-full)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: on ? "var(--color-bg)" : "var(--color-fg-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color var(--duration-base) var(--easing-default)",
              }}
            >
              {t.filters[id]}
            </button>
          );
        })}
      </div>

    </aside>
  );
}
