"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNotes, type Board as BoardType, type Task } from "@/lib/notes/store";
import { ToastProvider, useToast } from "@/components/notes/Toast";
import { Rail, type Filter } from "@/components/notes/Rail";
import { TaskColumn } from "@/components/notes/TaskColumn";
import { Composer, type ComposerHandle } from "@/components/notes/Composer";
import { HelpSheet } from "@/components/notes/HelpSheet";
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
  const [view, setView] = useState<"overview" | "board">("overview");
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("active");
  const [help, setHelp] = useState(false);
  const toast = useToast();
  const { t } = useLocale();

  const activeBoard = boards.find((b) => b.id === activeBoardId) ?? null;

  const openBoard = useCallback((id: string) => {
    setActiveBoardId(id);
    setFilter("active");
    setView("board");
  }, []);
  const zoomOut = useCallback(() => setView("overview"), []);

  const handleClearDone = useCallback(() => {
    if (!activeBoardId) return;
    const removed = store.tasks.filter((x) => x.done && x.boardId === activeBoardId);
    if (removed.length === 0) return;
    store.clearDone(activeBoardId);
    toast(t.toast.clearedDone, { label: t.toast.undo, onClick: () => store.readdMany(removed) });
  }, [store, toast, t, activeBoardId]);

  // Global keys: "?" toggles help; Escape zooms out of a board.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing = el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT" || el.isContentEditable);
      if (e.key === "?" && !typing) {
        e.preventDefault();
        setHelp((h) => !h);
      } else if (e.key === "Escape" && !typing && !help) {
        setView("overview");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [help]);

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
      ) : view === "overview" || !activeBoard ? (
        <div key="overview" style={{ height: "100%", animation: "vd-zoom-back var(--duration-slow) var(--easing-out) both" }}>
          <Overview boards={boards} tasks={tasks} onOpen={openBoard} onAddBoard={store.addBoard} />
        </div>
      ) : (
        <div key={activeBoard.id} style={{ height: "100%", animation: "vd-zoom-in var(--duration-slow) var(--easing-out) both" }}>
          <Board store={store} board={activeBoard} filter={filter} />
          <Rail
            board={activeBoard}
            total={total}
            done={done}
            filter={filter}
            setFilter={setFilter}
            onClearDone={handleClearDone}
            onHelp={() => setHelp(true)}
            onZoomOut={zoomOut}
            onRename={(title) => store.renameBoard(activeBoard.id, title)}
          />
        </div>
      )}

      <HelpSheet open={help} onClose={() => setHelp(false)} />
    </div>
  );
}

function Board({ store, board, filter }: { store: Store; board: BoardType; filter: Filter }) {
  const { tasks, add, toggle, star, remove, edit, move, readd } = store;
  const boardId = board.id;
  const composerRef = useRef<ComposerHandle>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const { t } = useLocale();
  const [overflowing, setOverflowing] = useState(false);

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

      {/* Studio footer — vertical, bottom-left */}
      <span
        className="v-text"
        style={{
          position: "absolute",
          bottom: "var(--space-6)",
          left: "var(--space-6)",
          fontSize: "0.625rem",
          letterSpacing: "0.14em",
          color: "var(--color-fg-subtle)",
          fontFamily: "var(--font-geist-mono)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        © 2026 Vertically Works
      </span>
    </div>
  );
}

function ColumnDir({ children }: { children: React.ReactNode }) {
  return <div style={{ direction: "ltr", display: "flex", flexShrink: 0 }}>{children}</div>;
}
