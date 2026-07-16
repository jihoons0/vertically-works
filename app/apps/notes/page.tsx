import type { Metadata } from "next";
import "./notes.css";
import { TodoApp } from "@/components/notes/TodoApp";

export const metadata: Metadata = {
  title: "To-do",
  description:
    "Vertically To-do · a to-do list rethought for the vertical, right-to-left axis. Tasks are columns you read top-to-bottom; drag to delete, reorder sideways, and switch between 한 / あ / 中. A Vertically Works application.",
};

export default function NotesPage() {
  return (
    <div className="notes-shell">
      <TodoApp />
    </div>
  );
}
