"use client";

import type { Board, Task } from "@/lib/notes/store";
import { PencilIcon } from "@/components/notes/Rail";
import { useLocale } from "@/lib/notes/i18n";

/**
 * A post-it tile in the zoomed-out overview: a square with a bold vertical title
 * at the reading start (right), a few muted vertical previews of its notes to the
 * left, and an active count. Tapping it zooms into the board's column list; the
 * pencil in the bottom-right corner opens the edit (rename / delete) overlay.
 * The tile is a role="button" div — not a <button> — so the pencil can nest.
 */
export function PostItTile({
  board,
  tasks,
  onOpen,
  onEdit,
}: {
  board: Board;
  tasks: Task[];
  onOpen: (id: string, rect: DOMRect) => void;
  onEdit: (id: string) => void;
}) {
  const { t } = useLocale();
  const boardTasks = tasks.filter((t) => t.boardId === board.id);
  const active = boardTasks.filter((t) => !t.done);
  const previews = active.slice(0, 3);

  return (
    <div
      role="button"
      tabIndex={0}
      className={`pressable tile tile-${board.accent ?? "sky"}`}
      aria-label={board.title}
      onClick={(e) => onOpen(board.id, e.currentTarget.getBoundingClientRect())}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(board.id, e.currentTarget.getBoundingClientRect());
        }
      }}
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        width: "100%",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-2xl)",
        background: "var(--tile-bg, var(--color-bg-subtle))",
        boxShadow: "var(--shadow-column)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-5) var(--space-4)",
        overflow: "hidden",
        textAlign: "start",
        fontFamily: "inherit",
        userSelect: "none",
      }}
    >
      {/* Reading-start column — title on top, edit pencil pinned to the
          bottom, sharing one horizontal centre line. */}
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          flexShrink: 0,
        }}
      >
        <span
          className="v-text"
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "var(--color-fg)",
            whiteSpace: "nowrap",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {board.title}
        </span>

        {/* Edit — opens 이름 편집 without zooming in. */}
        <button
          className="pressable"
          aria-label={`${t.boards.editBoard} · ${board.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(board.id);
          }}
          onKeyDown={(e) => e.stopPropagation()}
          style={{
            width: 30,
            height: 30,
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg)",
            color: "var(--color-fg-muted)",
            boxShadow: "var(--shadow-column)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "color var(--duration-fast) var(--easing-default), border-color var(--duration-fast) var(--easing-default)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-fg)"; e.currentTarget.style.borderColor = "var(--color-border-strong)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-fg-muted)"; e.currentTarget.style.borderColor = "var(--color-border)"; }}
        >
          <PencilIcon size={13} />
        </button>
      </div>

      {/* Note previews — muted vertical columns */}
      {previews.map((t) => (
        <span
          key={t.id}
          className="v-text"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
            lineHeight: 1.5,
            color: "var(--color-fg-muted)",
            whiteSpace: "nowrap",
            maxHeight: "100%",
            overflow: "hidden",
          }}
        >
          {t.text}
        </span>
      ))}

      {/* Active count — bottom-left corner */}
      <span
        className="tcy"
        style={{
          position: "absolute",
          bottom: "var(--space-3)",
          left: "var(--space-4)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.6875rem",
          color: "var(--color-fg-subtle)",
        }}
      >
        {active.length}
      </span>
    </div>
  );
}
