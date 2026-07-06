"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SEED_TASKS, detectInitialLocale } from "@/lib/notes/i18n";

export interface Task {
  id: string;
  text: string;
  note?: string;
  done: boolean;
  starred: boolean;
  createdAt: number;
  completedAt?: number;
}

const STORAGE_KEY = "vd:tasks:v1";

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

// Seed the teaching tasks in whichever CJK script the visitor lands in.
function buildSeed(): Task[] {
  const now = Date.now();
  return SEED_TASKS[detectInitialLocale()].map((s, i) => ({
    id: uid(),
    text: s.text,
    note: s.note,
    done: !!s.done,
    starred: !!s.starred,
    createdAt: now - i * 1000,
    completedAt: s.done ? now - 9000 : undefined,
  }));
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);
  const firstWrite = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setTasks(JSON.parse(raw));
      } else {
        setTasks(buildSeed());
      }
    } catch {
      setTasks(buildSeed());
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Skip the very first write so a fresh seed isn't clobbered before hydration settles.
    if (firstWrite.current) {
      firstWrite.current = false;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage full or unavailable — in-memory still works */
    }
  }, [tasks, mounted]);

  const add = useCallback((text: string, note?: string, starred = false) => {
    const t = text.trim();
    if (!t) return;
    setTasks((prev) => [
      { id: uid(), text: t, note: note?.trim() || undefined, done: false, starred, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const toggle = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, done: !t.done, completedAt: !t.done ? Date.now() : undefined }
          : t
      )
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
    setTasks((prev) =>
      prev.map((x) => (x.id === id ? { ...x, text: t, note: note?.trim() || undefined } : x))
    );
  }, []);

  const clearDone = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.done));
  }, []);

  // Re-insert previously removed task(s) — used to power undo. Keeps each task's
  // original id/createdAt so it sorts back roughly where it was.
  const readd = useCallback((task: Task) => {
    setTasks((prev) => (prev.some((t) => t.id === task.id) ? prev : [task, ...prev]));
  }, []);

  const readdMany = useCallback((restored: Task[]) => {
    setTasks((prev) => {
      const have = new Set(prev.map((t) => t.id));
      const fresh = restored.filter((t) => !have.has(t.id));
      return [...prev, ...fresh];
    });
  }, []);

  const move = useCallback((id: string, dir: -1 | 1) => {
    // Reorder among *active* tasks. dir -1 = toward reading start (right/earlier),
    // dir +1 = toward the tail (left/later).
    setTasks((prev) => {
      const active = prev.filter((t) => !t.done);
      const done = prev.filter((t) => t.done);
      const i = active.findIndex((t) => t.id === id);
      if (i < 0) return prev;
      const j = i + dir;
      if (j < 0 || j >= active.length) return prev;
      const next = [...active];
      [next[i], next[j]] = [next[j], next[i]];
      return [...next, ...done];
    });
  }, []);

  return { tasks, mounted, add, toggle, star, remove, edit, clearDone, move, readd, readdMany };
}
