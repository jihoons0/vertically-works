"use client";

import { useState } from "react";
import type { Board, Task } from "@/lib/notes/store";
import { useLocale } from "@/lib/notes/i18n";
import { PostItTile } from "@/components/notes/PostItTile";
import { VTextField } from "@/components/notes/VTextField";

/**
 * The zoomed-out canvas: a responsive grid of post-it tiles (one per board) plus
 * a tile to create a new board.
 */
export function Overview({
  boards,
  tasks,
  onOpen,
  onAddBoard,
}: {
  boards: Board[];
  tasks: Task[];
  onOpen: (id: string) => void;
  onAddBoard: (title: string) => void;
}) {
  const { t } = useLocale();

  return (
    <div style={{ height: "100%", width: "100%", overflowY: "auto", overflowX: "hidden" }}>
      {/* min-height wrapper centers the grid vertically but still lets it scroll. */}
      <div className="vd-overview-pad">
        <div role="list" aria-label={t.boards.overview} className="vd-overview-grid">
          {boards.map((b) => (
            <PostItTile key={b.id} board={b} tasks={tasks} onOpen={onOpen} />
          ))}
          <NewTile onAdd={onAddBoard} label={t.boards.newBoard} />
        </div>
      </div>
    </div>
  );
}

function NewTile({ onAdd, label }: { onAdd: (title: string) => void; label: string }) {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");

  const commit = () => {
    onAdd(title);
    setTitle("");
    setAdding(false);
  };

  const base: React.CSSProperties = {
    aspectRatio: "1 / 1",
    width: "100%",
    borderRadius: "var(--radius-2xl)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (!adding) {
    return (
      <button
        className="pressable new-tile"
        aria-label={label}
        onClick={() => setAdding(true)}
        style={{
          ...base,
          border: "1.5px dashed var(--color-border-strong)",
          background: "transparent",
          cursor: "pointer",
          color: "var(--color-fg-subtle)",
          fontSize: "1.75rem",
          fontFamily: "inherit",
        }}
      >
        ＋
      </button>
    );
  }

  return (
    <div style={{ ...base, border: "1.5px dashed var(--color-fg)", padding: "var(--space-4)" }}>
      <VTextField
        value={title}
        onChange={setTitle}
        onEnter={commit}
        onEscape={() => {
          setTitle("");
          setAdding(false);
        }}
        onBlur={commit}
        autoFocus
        ariaLabel={label}
        placeholder={label}
        style={{ fontSize: "1.0625rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--color-fg)" }}
      />
    </div>
  );
}
