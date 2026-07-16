"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNotes, type Board as BoardType, type Task } from "@/lib/notes/store";
import { ToastProvider, useToast } from "@/components/notes/Toast";
import { Rail, TrashIcon, type Filter } from "@/components/notes/Rail";
import { TaskColumn } from "@/components/notes/TaskColumn";
import { Composer, type ComposerHandle } from "@/components/notes/Composer";
import { HelpSheet } from "@/components/notes/HelpSheet";
import { BoardEditSheet } from "@/components/notes/BoardEditSheet";
import { LeftControls } from "@/components/notes/LeftControls";
import { Overview } from "@/components/notes/Overview";
import { LocaleProvider, useLocale } from "@/lib/notes/i18n";
import { FontProvider } from "@/lib/notes/font";

type Store = ReturnType<typeof useNotes>;

export function TodoApp() {
  return (
    <LocaleProvider>
      <FontProvider>
        <ToastProvider>
          <Shell />
        </ToastProvider>
      </FontProvider>
    </LocaleProvider>
  );
}

function Shell() {
  const store = useNotes();
  const { boards, tasks, mounted } = store;
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [filter, setFilter] = useState<Filter>("all");
  const [help, setHelp] = useState(false);
  // The board whose 이름 편집 sheet is open — reachable from the rail (open
  // board) or straight from an overview tile's pencil.
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const toast = useToast();
  const { t } = useLocale();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeBoard = boards.find((b) => b.id === activeBoardId) ?? null;
  const editingBoard = boards.find((b) => b.id === editingBoardId) ?? null;
  const boardOpen = !!activeBoard && !closing; // fully open (drives the overview recede)

  // Zoom in from the tapped tile's centre.
  const openBoard = useCallback((id: string, rect?: DOMRect) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (rect) setOrigin(`${Math.round(rect.left + rect.width / 2)}px ${Math.round(rect.top + rect.height / 2)}px`);
    setFilter("all");
    setClosing(false);
    setActiveBoardId(id);
  }, []);

  // Zoom out: play the exit, then unmount the board layer.
  const zoomOut = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setActiveBoardId(null);
      setClosing(false);
    }, 260);
  }, []);

  const handleClearDone = useCallback(() => {
    if (!activeBoardId) return;
    const removed = store.tasks.filter((x) => x.done && x.boardId === activeBoardId);
    if (removed.length === 0) return;
    store.clearDone(activeBoardId);
    toast(t.toast.clearedDone, { label: t.toast.undo, onClick: () => store.readdMany(removed) });
  }, [store, toast, t, activeBoardId]);

  const handleRenameBoard = useCallback(
    (title: string) => {
      if (editingBoardId) store.renameBoard(editingBoardId, title);
    },
    [store, editingBoardId]
  );

  // Delete the board being edited. If it's the open board, return to the
  // overview — it has no tile to zoom back to. Undo restores board + tasks.
  const handleDeleteBoard = useCallback(() => {
    if (!editingBoardId) return;
    const board = boards.find((b) => b.id === editingBoardId);
    if (!board) return;
    const boardTasks = tasks.filter((x) => x.boardId === editingBoardId);
    store.removeBoard(editingBoardId);
    if (activeBoardId === editingBoardId) {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setClosing(false);
      setActiveBoardId(null);
    }
    toast(t.toast.boardDeleted, { label: t.toast.undo, onClick: () => store.restoreBoard(board, boardTasks) });
  }, [editingBoardId, activeBoardId, boards, tasks, store, toast, t]);

  // Global keys: "?" toggles help; Escape zooms out of a board.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing = el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT" || el.isContentEditable);
      if (e.key === "?" && !typing) {
        e.preventDefault();
        setHelp((h) => !h);
      } else if (e.key === "Escape" && !typing && !help && activeBoardId) {
        zoomOut();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [help, activeBoardId, zoomOut]);

  const boardTasks = activeBoardId ? tasks.filter((x) => x.boardId === activeBoardId) : [];
  const total = mounted ? boardTasks.length : 0;
  const done = mounted ? boardTasks.filter((x) => x.done).length : 0;

  return (
    <div style={{ position: "relative", height: "100dvh", width: "100%", overflow: "hidden" }}>
      <LeftControls />

      {!mounted ? (
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="v-text" style={{ color: "var(--color-fg-subtle)", fontSize: "0.875rem", letterSpacing: "0.1em" }}>
            {t.loading}
          </span>
        </div>
      ) : (
        <>
          {/* Overview — the base layer; recedes behind an open board. */}
          <div className="vd-ov-layer" data-recede={boardOpen ? "" : undefined}>
            <Overview boards={boards} tasks={tasks} onOpen={openBoard} onAddBoard={store.addBoard} onEditBoard={setEditingBoardId} />
          </div>

          {/* Focused board — zooms in from the tapped tile; rail animates in on its own. */}
          {activeBoard && (
            <>
              <div className="vd-board-layer" data-closing={closing ? "" : undefined} style={{ transformOrigin: origin }}>
                <Board store={store} board={activeBoard} filter={filter} onClearDone={handleClearDone} />
              </div>
              <Rail
                board={activeBoard}
                closing={closing}
                total={total}
                done={done}
                filter={filter}
                setFilter={setFilter}
                onHelp={() => setHelp(true)}
                onZoomOut={zoomOut}
                onEditBoard={() => setEditingBoardId(activeBoard.id)}
              />
            </>
          )}
        </>
      )}

      {/* Wordmark — persistent, bottom-left, on both the overview and board views */}
      {mounted && (
        <span
          className="v-text"
          style={{
            position: "fixed",
            bottom: "var(--space-6)",
            left: "var(--space-6)",
            zIndex: 20,
            fontSize: "0.625rem",
            letterSpacing: "0.14em",
            color: "var(--color-fg-subtle)",
            fontFamily: "var(--font-geist-mono)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Vertically To-do
        </span>
      )}

      <HelpSheet open={help} onClose={() => setHelp(false)} />
      <BoardEditSheet
        open={!!editingBoard}
        board={editingBoard}
        onRename={handleRenameBoard}
        onDelete={handleDeleteBoard}
        onClose={() => setEditingBoardId(null)}
      />
    </div>
  );
}

function Board({
  store,
  board,
  filter,
  onClearDone,
}: {
  store: Store;
  board: BoardType;
  filter: Filter;
  onClearDone: () => void;
}) {
  const { tasks, add, toggle, star, remove, edit, move, readd } = store;
  const boardId = board.id;
  const composerRef = useRef<ComposerHandle>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const { t } = useLocale();
  const [overflowing, setOverflowing] = useState(false);
  const [trashTip, setTrashTip] = useState(false);

  const { active, done } = useMemo(() => {
    const mine = tasks.filter((x) => x.boardId === boardId);
    const a = mine.filter((x) => !x.done);
    const d = mine.filter((x) => x.done).sort((x, y) => (y.completedAt ?? 0) - (x.completedAt ?? 0));
    return { active: a, done: d };
  }, [tasks, boardId]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    const check = () => setOverflowing(el.scrollWidth - el.clientWidth > 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active.length, done.length, filter, boardId]);

  const handleToggle = useCallback(
    (id: string) => {
      const task = tasks.find((x) => x.id === id);
      toggle(id);
      if (task) toast(task.done ? t.toast.uncompleted : t.toast.completed);
    },
    [tasks, toggle, toast, t]
  );
  const handleAdd = useCallback(
    (text: string, starred: boolean) => {
      add(boardId, text, undefined, starred);
      toast(t.toast.added);
    },
    [add, boardId, toast, t]
  );
  const handleRemove = useCallback(
    (id: string) => {
      const task = tasks.find((x) => x.id === id);
      remove(id);
      if (task) toast(t.toast.deleted, { label: t.toast.undo, onClick: () => readd(task) });
    },
    [tasks, remove, toast, readd, t]
  );
  const handleMove = useCallback((id: string, dir: -1 | 1) => move(boardId, id, dir), [move, boardId]);

  const showComposer = filter !== "done";
  const showActive = filter !== "done";
  const showDone = filter !== "active";
  const showDivider = filter === "all" && active.length > 0 && done.length > 0;
  const isEmpty =
    (filter === "active" && active.length === 0) ||
    (filter === "done" && done.length === 0) ||
    (filter === "all" && active.length === 0 && done.length === 0);

  const columnProps = { onToggle: handleToggle, onStar: star, onRemove: handleRemove, onEdit: edit, onMove: handleMove };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={scrollerRef}
        role="list"
        aria-label={board.title}
        style={{ direction: "rtl", height: "100%", display: "flex", overflowX: "auto", overflowY: "hidden" }}
      >
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "var(--space-3)",
            padding: "var(--space-8) var(--space-16)",
          }}
        >
          {showComposer && (
            <ColumnDir>
              <Composer ref={composerRef} onAdd={handleAdd} />
            </ColumnDir>
          )}

          {showActive &&
            active.map((task, i) => (
              <ColumnDir key={task.id}>
                <TaskColumn task={task} index={i} {...columnProps} />
              </ColumnDir>
            ))}

          {showDivider && (
            <div aria-hidden style={{ flexShrink: 0, alignSelf: "stretch", width: 1, margin: "var(--space-8) var(--space-2)", background: "var(--color-border)" }} />
          )}

          {showDone &&
            done.map((task, i) => (
              <ColumnDir key={task.id}>
                <TaskColumn task={task} index={i} {...columnProps} />
              </ColumnDir>
            ))}

          {/* Clear completed — the red trashcan rides the tail (far left) of the
              crossed-out cells, vertically centered; in the 완료 and 전체 views. */}
          {filter !== "active" && done.length > 0 && (
            <div
              style={{ direction: "ltr", position: "relative", flexShrink: 0, display: "flex", alignItems: "center", paddingInlineStart: "var(--space-3)" }}
              onPointerEnter={() => setTrashTip(true)}
              onPointerLeave={() => setTrashTip(false)}
            >
              <button
                className="pressable"
                aria-label={t.clearDone}
                onClick={onClearDone}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  background: "#ef4444",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(239,68,68,0.35)",
                  transition: "transform 140ms var(--easing-out), background var(--duration-fast) var(--easing-default)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#dc2626"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#ef4444"; }}
              >
                <TrashIcon />
              </button>
              {trashTip && (
                <span
                  role="tooltip"
                  style={{
                    position: "absolute",
                    right: "calc(100% + var(--space-2))",
                    top: "50%",
                    transform: "translateY(-50%)",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    background: "var(--color-fg)",
                    color: "var(--color-bg)",
                    padding: "var(--space-3) var(--space-2)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                    boxShadow: "var(--shadow-column)",
                    pointerEvents: "none",
                    animation: "vd-fade-in 120ms ease both",
                  }}
                >
                  {t.clearDone}
                </span>
              )}
            </div>
          )}

          {isEmpty && (
            <div style={{ direction: "ltr", display: "flex", alignItems: "center", color: "var(--color-fg-subtle)", paddingInline: "var(--space-12)" }}>
              <span className="v-text" style={{ fontSize: "1rem", letterSpacing: "0.14em", lineHeight: 1.7 }}>
                {filter === "done" ? t.emptyDone : t.emptyActive}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Trailing-edge fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 64,
          pointerEvents: "none",
          background: "linear-gradient(to right, var(--color-bg), transparent)",
          opacity: overflowing ? 1 : 0,
          transition: "opacity var(--duration-base) var(--easing-default)",
        }}
      />
    </div>
  );
}

function ColumnDir({ children }: { children: React.ReactNode }) {
  return <div style={{ direction: "ltr", display: "flex", flexShrink: 0 }}>{children}</div>;
}
