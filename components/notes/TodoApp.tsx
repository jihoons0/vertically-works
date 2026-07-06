"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTasks, type Task } from "@/lib/notes/store";
import { ToastProvider, useToast } from "@/components/notes/Toast";
import { Rail, type Filter } from "@/components/notes/Rail";
import { TaskColumn } from "@/components/notes/TaskColumn";
import { Composer, type ComposerHandle } from "@/components/notes/Composer";
import { HelpSheet } from "@/components/notes/HelpSheet";
import { CJKToggle } from "@/components/notes/CJKToggle";
import { LocaleProvider, useLocale } from "@/lib/notes/i18n";

export function TodoApp() {
  return (
    <LocaleProvider>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </LocaleProvider>
  );
}

function Shell() {
  const store = useTasks();
  const [filter, setFilter] = useState<Filter>("active");
  const [help, setHelp] = useState(false);
  const toast = useToast();
  const { t } = useLocale();

  const handleClearDone = useCallback(() => {
    const removed: Task[] = store.tasks.filter((task) => task.done);
    if (removed.length === 0) return;
    store.clearDone();
    toast(t.toast.clearedDone, { label: t.toast.undo, onClick: () => store.readdMany(removed) });
  }, [store, toast, t]);

  // Global "?" opens help (ignored while typing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT")) return;
      if (e.key === "?") {
        e.preventDefault();
        setHelp((h) => !h);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const total = store.mounted ? store.tasks.length : 0;
  const done = store.mounted ? store.tasks.filter((t) => t.done).length : 0;

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100dvh", width: "100%" }}>
      <CJKToggle />
      <Board store={store} filter={filter} />
      <Rail
        total={total}
        done={done}
        filter={filter}
        setFilter={setFilter}
        onClearDone={handleClearDone}
        onHelp={() => setHelp(true)}
      />
      <HelpSheet open={help} onClose={() => setHelp(false)} />
    </div>
  );
}

function Board({ store, filter }: { store: ReturnType<typeof useTasks>; filter: Filter }) {
  const { tasks, mounted, add, toggle, star, remove, edit, move, readd } = store;
  const composerRef = useRef<ComposerHandle>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const { t } = useLocale();
  const [overflowing, setOverflowing] = useState(false);

  const { active, done } = useMemo(() => {
    // Active tasks keep their array order so drag-to-reorder actually sticks;
    // newest are unshifted to the front (the reading start). Starring is pure
    // emphasis (the ★ + border), not a re-sort. Done tasks show most-recent-first.
    const a = tasks.filter((t) => !t.done);
    const d = tasks
      .filter((t) => t.done)
      .sort((x, y) => (y.completedAt ?? 0) - (x.completedAt ?? 0));
    return { active: a, done: d };
  }, [tasks]);

  // Keep the reading start (right / newest) in view, and track overflow for the
  // trailing-edge fade.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = 0; // rtl scroll origin sits at the right (the reading start)
    const check = () => setOverflowing(el.scrollWidth - el.clientWidth > 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tasks.length, filter, mounted]);

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
      add(text, undefined, starred);
      toast(t.toast.added);
    },
    [add, toast, t]
  );
  const handleRemove = useCallback(
    (id: string) => {
      const task = tasks.find((x) => x.id === id);
      remove(id);
      if (task) toast(t.toast.deleted, { label: t.toast.undo, onClick: () => readd(task) });
    },
    [tasks, remove, toast, readd, t]
  );
  if (!mounted) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="v-text" style={{ color: "var(--color-fg-subtle)", fontSize: "0.875rem", letterSpacing: "0.1em" }}>
          {t.loading}
        </span>
      </div>
    );
  }

  const showComposer = filter !== "done";
  const showActive = filter !== "done";
  const showDone = filter !== "active";
  const showDivider = filter === "all" && active.length > 0 && done.length > 0;

  const isEmpty =
    (filter === "active" && active.length === 0) ||
    (filter === "done" && done.length === 0) ||
    (filter === "all" && tasks.length === 0);

  const columnProps = {
    onToggle: handleToggle,
    onStar: star,
    onRemove: handleRemove,
    onEdit: edit,
    onMove: move,
  };

  return (
    <div style={{ position: "relative", flex: 1, minWidth: 0, height: "100%" }}>
      <div
        ref={scrollerRef}
        role="list"
        aria-label={t.a11y.board}
        style={{
          direction: "rtl", // lay columns right→left and put scroll origin at the right
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <div
          style={{
            margin: "auto", // center when it fits; scroll when it overflows
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "var(--space-3)",
            padding: "var(--space-8) var(--space-10)",
          }}
        >
          {showComposer && (
            <ColumnDir>
              <Composer ref={composerRef} onAdd={handleAdd} />
            </ColumnDir>
          )}

          {showActive &&
            active.map((t, i) => (
              <ColumnDir key={t.id}>
                <TaskColumn task={t} index={i} {...columnProps} />
              </ColumnDir>
            ))}

          {showDivider && (
            <div
              aria-hidden
              style={{ flexShrink: 0, alignSelf: "stretch", width: 1, margin: "var(--space-8) var(--space-2)", background: "var(--color-border)" }}
            />
          )}

          {showDone &&
            done.map((t, i) => (
              <ColumnDir key={t.id}>
                <TaskColumn task={t} index={i} {...columnProps} />
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

      {/* Trailing-edge fade — the tail (older / done) dissolves at the far left,
          echoing the Verse flowing-reader dimmed trailing edge. */}
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

// Resets writing direction to ltr inside each column so its explicitly-authored
// flex layout is unaffected by the board's rtl scroll container.
function ColumnDir({ children }: { children: React.ReactNode }) {
  return <div style={{ direction: "ltr", display: "flex", flexShrink: 0 }}>{children}</div>;
}
