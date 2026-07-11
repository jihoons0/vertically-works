"use client";

import type { Board, Task } from "@/lib/notes/store";

/**
 * A post-it tile in the zoomed-out overview: a square with a bold vertical title
 * at the reading start (right), a few muted vertical previews of its notes to the
 * left, and an active count. Tapping it zooms into the board's column list.
 */
export function PostItTile({
  board,
  tasks,
  onOpen,
}: {
  board: Board;
  tasks: Task[];
  onOpen: (id: string) => void;
}) {
  const boardTasks = tasks.filter((t) => t.boardId === board.id);
  const active = boardTasks.filter((t) => !t.done);
  const previews = active.slice(0, 3);

  return (
    <button
      className={`pressable tile tile-${board.accent ?? "sky"}`}
      aria-label={board.title}
      onClick={() => onOpen(board.id)}
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
      }}
    >
      {/* Title — bold vertical, at the reading start */}
      <span
        className="v-text"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "var(--color-fg)",
          whiteSpace: "nowrap",
          maxHeight: "100%",
          overflow: "hidden",
        }}
      >
        {board.title}
      </span>

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
    </button>
  );
}
