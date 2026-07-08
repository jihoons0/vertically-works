import type { Metadata } from "next";
import "./listen.css";
import { ListenApp } from "@/components/listen/ListenApp";

export const metadata: Metadata = {
  title: "Listen",
  description:
    "Vertically Listen — a music player rethought for the vertical, right-to-left axis. The playlist is a shelf of columns, lyrics fall like verse, playback advances down the reading axis, and today's CJK charts play as 30-second previews. A Vertically Works application.",
};

export default function ListenPage() {
  return (
    <div className="listen-shell">
      <ListenApp />
    </div>
  );
}
