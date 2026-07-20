import type { Metadata, Viewport } from "next";
import "./chat.css";
import ChatApp from "./ChatApp";

export const metadata: Metadata = {
  title: "Vertically Chat",
  description:
    "Vertically Chat · an AI chat interface built for vertical, right-to-left reading. Turns are columns, the thread flows right to left, and the assistant streams top to bottom. A Vertically Works application.",
};

// interactive-widget keeps the composer + thread above the on-screen keyboard on
// Chrome/Android; the app also runs a VisualViewport handler for iOS Safari.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

// Served at chat.vertically.works (and /run/chat in dev). Lives outside
// app/(site), so it renders chrome-free like the other apps.
export default function RunChatPage() {
  return <ChatApp />;
}
