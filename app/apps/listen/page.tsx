import type { Metadata } from "next";
import "./listen.css";
import { ListenApp } from "@/components/listen/ListenApp";

export const metadata: Metadata = {
  title: "Listen",
  description:
    "Vertically Listen · a podcast player rethought for the vertical, right-to-left axis. Today's top CJK shows are a shelf of columns, transcripts fall like time-synced verse, and full episodes stream over open RSS. A Vertically Works application.",
};

export default function ListenPage() {
  return (
    <div className="listen-shell">
      <ListenApp />
    </div>
  );
}
