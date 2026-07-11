"use client";

import { useCallback, useEffect, useState } from "react";
import { SEED_TASKS, STRINGS, detectInitialLocale } from "@/lib/notes/i18n";

export interface Task {
  id: string;
  boardId: string;
  text: string;
  note?: string;
  done: boolean;
  starred: boolean;
  createdAt: number;
  completedAt?: number;
}

export interface Board {
  id: string;
  title: string;
  accent?: string; // paper-tint key → styled in notes.css (.tile-<accent>)
  createdAt: number;
}

const TASKS_KEY = "vd:tasks:v1";
const BOARDS_KEY = "vd:boards:v1";

// Subtle paper tints, cycled across new boards.
export const ACCENTS = ["amber", "rose", "sky", "sage", "lilac"] as const;
// Fixed accents for the seeded starter boards (메모 / last = plain white paper).
const STARTER_ACCENTS = ["amber", "rose", "sky", "paper"] as const;

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

// A fresh start: starter category boards, with the teaching tasks in the first one.
function buildInitial(): { boards: Board[]; tasks: Task[] } {
  const now = Date.now();
  const locale = detectInitialLocale();
  const boards: Board[] = STRINGS[locale].boards.starters.map((title, i) => ({
    id: uid(),
    title,
    accent: STARTER_ACCENTS[i] ?? ACCENTS[i % ACCENTS.length],
    createdAt: now - i * 1000,
  }));
  const firstId = boards[0].id;
  const tasks: Task[] = SEED_TASKS[locale].map((s, i) => ({
    id: uid(),
    boardId: firstId,
    text: s.text,
    note: s.note,
    done: !!s.done,
    starred: !!s.starred,
    createdAt: now - i * 1000,
    completedAt: s.done ? now - 9000 : undefined,
  }));
  return { boards, tasks };
}

// Lossless upgrade from the old flat task list → one default board.
function migrateLegacy(legacy: Task[]): { boards: Board[]; tasks: Task[] } {
  const now = Date.now();
  const board: Board = {
    id: uid(),
    title: STRINGS[detectInitialLocale()].boards.defaultTitle,
    accent: ACCENTS[0],
    createdAt: now,
  };
  return { boards: [board], tasks: legacy.map((t) => ({ ...t, boardId: t.boardId || board.id })) };
}

export function useNotes() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let init: { boards: Board[]; tasks: Task[] };
    try {
      const rawBoards = localStorage.getItem(BOARDS_KEY);
      const rawTasks = localStorage.getItem(TASKS_KEY);
      if (rawBoards) {
        init = { boards: JSON.parse(rawBoards), tasks: rawTasks ? JSON.parse(rawTasks) : [] };
      } else if (rawTasks) {
        init = migrateLegacy(JSON.parse(rawTasks));
      } else {
        init = buildInitial();
      }
    } catch {
      init = buildInitial();
    }
    setBoards(init.boards);
    setTasks(init.tasks);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(BOARDS_KEY, JSON.stringify(boards));
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch {
      /* storage full or unavailable — in-memory still works */
    }
  }, [boards, tasks, mounted]);

  // ── Board ops ──
  const addBoard = useCallback((title: string): string | undefined => {
    const t = title.trim();
    if (!t) return;
    const id = uid();
    setBoards((prev) => [...prev, { id, title: t, accent: ACCENTS[prev.length % ACCENTS.length], createdAt: Date.now() }]);
    return id;
  }, []);

  const renameBoard = useCallback((id: string, title: string) => {
    const t = title.trim();
    if (!t) return;
    setBoards((prev) => prev.map((b) => (b.id === id ? { ...b, title: t } : b)));
  }, []);

  const removeBoard = useCallback((id: string) => {
    setBoards((prev) => prev.filter((b) => b.id !== id));
    setTasks((prev) => prev.filter((t) => t.boardId !== id));
  }, []);

  // ── Task ops (scoped to a board) ──
  const add = useCallback((boardId: string, text: string, note?: string, starred = false) => {
    const t = text.trim();
    if (!t) return;
    setTasks((prev) => [
      { id: uid(), boardId, text: t, note: note?.trim() || undefined, done: false, starred, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const toggle = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done, completedAt: !t.done ? Date.now() : undefined } : t))
    );
  }, []);

  const star = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t)));
  }, []);

  const remove = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const edit = useCallback((id: string, text: string, note?: string) => {
    const t = text.trim();
    if (!t) return;
    setTasks((prev) => prev.map((x) => (x.id === id ? { ...x, text: t, note: note?.trim() || undefined } : x)));
  }, []);

  const clearDone = useCallback((boardId: string) => {
    setTasks((prev) => prev.filter((t) => !(t.done && t.boardId === boardId)));
  }, []);

  const readd = useCallback((task: Task) => {
    setTasks((prev) => (prev.some((t) => t.id === task.id) ? prev : [task, ...prev]));
  }, []);

  const readdMany = useCallback((restored: Task[]) => {
    setTasks((prev) => {
      const have = new Set(prev.map((t) => t.id));
      return [...prev, ...restored.filter((t) => !have.has(t.id))];
    });
  }, []);

  // Reorder among a board's active tasks. dir -1 = toward reading start, +1 = tail.
  const move = useCallback((boardId: string, id: string, dir: -1 | 1) => {
    setTasks((prev) => {
      const inBoard = prev.filter((t) => t.boardId === boardId && !t.done);
      const rest = prev.filter((t) => !(t.boardId === boardId && !t.done));
      const i = inBoard.findIndex((t) => t.id === id);
      if (i < 0) return prev;
      const j = i + dir;
      if (j < 0 || j >= inBoard.length) return prev;
      const next = [...inBoard];
      [next[i], next[j]] = [next[j], next[i]];
      return [...next, ...rest];
    });
  }, []);

  return { boards, tasks, mounted, addBoard, renameBoard, removeBoard, add, toggle, star, remove, edit, clearDone, move, readd, readdMany };
}
