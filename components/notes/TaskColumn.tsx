"use client";

import { useEffect, useRef, useState } from "react";
import type { Task } from "@/lib/notes/store";
import { VTextField } from "@/components/notes/VTextField";
import { useLocale } from "@/lib/notes/i18n";

const DELETE_THRESHOLD = 88; // px of vertical travel to arm delete
const REVEAL_RAMP = 34; // px over which the trashcan fades/scales in
const REORDER_THRESHOLD = 52; // px of horizontal travel to shift one slot
const FLICK_VELOCITY = 0.55; // px/ms — only a decisive flick deletes under threshold
const FLICK_MIN_TRAVEL = 44; // px — and it must have travelled far enough to be intentional
const CHECK_HOLD = 700; // ms the checked state stays visible before the cell departs
const CHECK_EXIT = 220; // ms scale+fade departure

function TrashIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function TaskColumn({
  task,
  index,
  onToggle,
  onStar,
  onRemove,
  onEdit,
  onMove,
}: {
  task: Task;
  index: number;
  onToggle: (id: string) => void;
  onStar: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
}) {
  const { t } = useLocale();
  const [pull, setPull] = useState(0); // vertical drag distance (delete axis)
  const [shift, setShift] = useState(0); // horizontal drag distance (reorder axis)
  const [dragging, setDragging] = useState(false);
  const [removing, setRemoving] = useState<0 | -1 | 1>(0); // exit direction once armed
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  // Check-off choreography: "checking" shows the completed state in place for a
  // beat (tap again to change your mind), then "leaving" scales/fades the cell
  // out before the store commit removes it from the view.
  const [checkPhase, setCheckPhase] = useState<"idle" | "checking" | "leaving">("idle");
  const checkTimers = useRef<number[]>([]);

  useEffect(() => () => checkTimers.current.forEach(clearTimeout), []);

  const shownDone = task.done || checkPhase !== "idle";

  const handleCheck = () => {
    if (task.done) {
      onToggle(task.id); // unchecking is instant — no ceremony for undo
      return;
    }
    if (checkPhase === "leaving") return;
    if (checkPhase === "checking") {
      // Second tap during the hold = change of mind; transitions retarget smoothly.
      checkTimers.current.forEach(clearTimeout);
      checkTimers.current = [];
      setCheckPhase("idle");
      return;
    }
    setCheckPhase("checking");
    checkTimers.current.push(window.setTimeout(() => setCheckPhase("leaving"), CHECK_HOLD));
    checkTimers.current.push(window.setTimeout(() => onToggle(task.id), CHECK_HOLD + CHECK_EXIT));
  };

  const start = useRef<{ x: number; y: number } | null>(null);
  const axis = useRef<"x" | "y" | null>(null);
  const moved = useRef(false);
  const vel = useRef(0); // last vertical velocity, px/ms
  const lastSample = useRef<{ y: number; t: number } | null>(null);

  // ── Delete-gesture math ──
  const mag = Math.abs(pull);
  const deleteProgress = removing ? 1 : Math.min(1, mag / DELETE_THRESHOLD);
  const revealProgress = removing ? 1 : Math.min(1, mag / REVEAL_RAMP);
  const armed = deleteProgress >= 1;
  // The card follows the finger 1:1, then damps past the threshold so it never
  // flies off — "things slow down before they stop."
  const dyEff = mag <= DELETE_THRESHOLD ? pull : Math.sign(pull) * (DELETE_THRESHOLD + (mag - DELETE_THRESHOLD) * 0.4);
  // Trash sits in the *vacated* slot: card moving down reveals the top, and vice-versa.
  const movingDown = removing ? removing > 0 : pull > 0;
  const showTrash = removing !== 0 || (axis.current === "y" && mag > 1);

  const beginRemove = (dirDown: boolean) => {
    setRemoving(dirDown ? 1 : -1);
    setDragging(false);
    start.current = null;
    axis.current = null;
    window.setTimeout(() => onRemove(task.id), 200);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (editing || removing || leaving) return;
    if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
    start.current = { x: e.clientX, y: e.clientY };
    lastSample.current = { y: e.clientY, t: performance.now() };
    vel.current = 0;
    axis.current = null;
    moved.current = false;
    setDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* pointer may already be released; capture is a best-effort enhancement */
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (!axis.current && Math.hypot(dx, dy) > 6) {
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      moved.current = true;
    }
    const now = performance.now();
    if (lastSample.current) {
      const dt = now - lastSample.current.t;
      if (dt > 0) vel.current = (e.clientY - lastSample.current.y) / dt;
    }
    lastSample.current = { y: e.clientY, t: now };
    if (axis.current === "y") setPull(dy);
    else if (axis.current === "x") setShift(dx);
  };

  const end = () => {
    if (axis.current === "y") {
      const flick = Math.abs(vel.current) > FLICK_VELOCITY && mag > FLICK_MIN_TRAVEL;
      if (armed || flick) {
        beginRemove(pull !== 0 ? pull > 0 : vel.current > 0);
        return;
      }
      setPull(0); // release: snap back
    } else if (axis.current === "x" && Math.abs(shift) > REORDER_THRESHOLD) {
      onMove(task.id, shift > 0 ? -1 : 1);
      setShift(0);
    } else {
      setShift(0);
    }
    setDragging(false);
    start.current = null;
    axis.current = null;
  };

  const commitEdit = () => {
    const t = draft.trim();
    if (t && t !== task.text) onEdit(task.id, t);
    else setDraft(task.text);
    setEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (editing) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleCheck();
    } else if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      onRemove(task.id);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onMove(task.id, -1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onMove(task.id, 1);
    } else if (e.key.toLowerCase() === "s") {
      e.preventDefault();
      onStar(task.id);
    } else if (e.key.toLowerCase() === "e") {
      e.preventDefault();
      setDraft(task.text);
      setEditing(true);
    }
  };

  // ── Card transform / transition ──
  const leaving = checkPhase === "leaving";
  const cardTransform = removing
    ? `translateY(${removing * 44}px) scale(0.9)`
    : leaving
      ? "scale(0.9)"
      : `translate(${shift}px, ${dyEff}px) scale(${dragging ? 1.03 : 1})`;
  const cardTransition = removing
    ? "transform 200ms var(--easing-out), opacity 200ms var(--easing-out)"
    : leaving
      ? `transform ${CHECK_EXIT}ms var(--easing-out), opacity ${CHECK_EXIT}ms var(--easing-out)`
      : dragging
        ? "box-shadow var(--duration-fast) var(--easing-out)"
        : "transform var(--duration-base) var(--easing-out), opacity var(--duration-base) var(--easing-out), box-shadow var(--duration-base) var(--easing-out), background var(--duration-base) var(--easing-default)";

  return (
    <div
      role="listitem"
      tabIndex={0}
      className="v-col"
      aria-label={`${task.text}${task.done ? `, ${t.filters.done}` : ""}`}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      style={{
        position: "relative",
        flexShrink: 0,
        // Shrink-wrap to the text: long titles wrap into more vertical lines and
        // the cell widens with them, up to a cap.
        minWidth: 78,
        maxWidth: 220,
        height: "min(64vh, 520px)",
        // pan-x lets touch users scroll the board horizontally; vertical swipes
        // still go to the delete gesture. (Mouse drag-to-reorder is unaffected.)
        touchAction: "pan-x",
        // Entrance lives on the wrapper so the card's transform stays free for the
        // drag gesture — a filling animation on the card would lock its transform.
        animation: "vd-column-in var(--duration-slow) var(--easing-out) both",
      }}
    >
      {/* Trashcan reveal — behind the card, in the vacated slot */}
      {showTrash && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            [movingDown ? "top" : "bottom"]: 14,
            display: "flex",
            justifyContent: "center",
            opacity: revealProgress,
            transform: `scale(${0.9 + 0.1 * revealProgress})`,
            transition: dragging ? "none" : "opacity 180ms var(--easing-out), transform 180ms var(--easing-out)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 42,
              height: 42,
              borderRadius: "var(--radius-full)",
              border: `1.5px solid ${armed ? "var(--color-fg)" : "var(--color-border-strong)"}`,
              background: "var(--color-bg)",
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
              transition: "border-color 150ms var(--easing-out), transform 200ms var(--easing-spring)",
              transform: `scale(${armed ? 1.08 : 1})`,
            }}
          >
            {/* Fill meter — a disc that grows to full as the gesture arms */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "var(--radius-full)",
                background: "var(--color-fg)",
                transform: `scale(${deleteProgress})`,
                transformOrigin: "center",
                transition: dragging ? "none" : "transform 180ms var(--easing-out)",
              }}
            />
            <span
              style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                placeItems: "center",
                color: armed ? "var(--color-bg)" : "var(--color-fg-muted)",
                transition: "color 150ms var(--easing-out)",
              }}
            >
              <TrashIcon />
            </span>
          </div>
        </div>
      )}

      {/* The card — follows the drag; occludes the trash at rest */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-4) var(--space-2)",
          borderRadius: "var(--radius-2xl)",
          border: `1px solid ${task.starred && !shownDone ? "var(--color-border-strong)" : "var(--color-border)"}`,
          background: shownDone ? "var(--color-bg-subtle)" : "var(--color-bg)",
          boxShadow: dragging ? "var(--shadow-lift)" : "var(--shadow-column)",
          cursor: editing ? "text" : dragging ? "grabbing" : "grab",
          userSelect: "none",
          opacity: removing || leaving ? 0 : shownDone ? 0.62 : 1,
          transform: cardTransform,
          transition: cardTransition,
          overflow: "hidden",
        }}
      >
        {/* Top cluster — index + star */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
          <span className="tcy" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6875rem", color: "var(--color-fg-subtle)", letterSpacing: "0.05em" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <button
            data-no-drag
            className="pressable"
            aria-label={task.starred ? t.a11y.unstar : t.a11y.star}
            aria-pressed={task.starred}
            onClick={() => onStar(task.id)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem", lineHeight: 1, padding: 2, color: task.starred ? "var(--color-fg)" : "var(--color-fg-subtle)", transition: "color var(--duration-fast) var(--easing-default)" }}
          >
            {task.starred ? "★" : "☆"}
          </button>
        </div>

        {/* Title + note — vertical text, horizontally centered. Click title to edit. */}
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "var(--space-2)",
            flex: 1,
            minHeight: 0,
            paddingBlock: "var(--space-3)",
            width: "100%",
          }}
        >
          {editing ? (
            <VTextField
              value={draft}
              onChange={setDraft}
              onEnter={commitEdit}
              onEscape={() => {
                setDraft(task.text);
                setEditing(false);
              }}
              onBlur={commitEdit}
              autoFocus
              ariaLabel={t.a11y.edit}
              style={{ fontFamily: "var(--vd-task-font)", fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "0.08em", lineHeight: 1.5, color: "var(--color-fg)" }}
            />
          ) : (
            <button
              data-no-drag
              onClick={() => {
                if (moved.current) return;
                setDraft(task.text);
                setEditing(true);
              }}
              aria-label={t.a11y.edit}
              className="v-text"
              style={{
                background: "none",
                border: "none",
                cursor: "text",
                fontFamily: "var(--vd-task-font)",
                fontSize: "1.0625rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                lineHeight: 1.5,
                textAlign: "start",
                color: shownDone ? "var(--color-done)" : "var(--color-fg)",
                textDecorationLine: shownDone ? "line-through" : "none",
                textDecorationThickness: "1.5px",
                transition: "color 200ms var(--easing-default)",
                maxHeight: "100%",
                overflow: "hidden",
                padding: 0,
              }}
            >
              {task.text}
            </button>
          )}
        </div>

        {/* Bottom — completion control (tap) at the reading end */}
        <button
          data-no-drag
          className="pressable"
          aria-label={shownDone ? t.a11y.uncomplete : t.a11y.complete}
          aria-pressed={shownDone}
          onClick={handleCheck}
          style={{
            width: 30,
            height: 30,
            borderRadius: "var(--radius-full)",
            border: `1.5px solid ${shownDone ? "var(--color-fg)" : "var(--color-border-strong)"}`,
            background: shownDone ? "var(--color-fg)" : "transparent",
            color: "var(--color-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "0.8rem",
            lineHeight: 1,
            transition: "background var(--duration-base) var(--easing-out), border-color var(--duration-base) var(--easing-out)",
          }}
        >
          {/* ✓ pops in from a visible scale — never from scale(0) */}
          <span
            aria-hidden
            style={{
              display: "block",
              lineHeight: 1,
              transform: shownDone ? "scale(1)" : "scale(0.5)",
              opacity: shownDone ? 1 : 0,
              transition: "transform 180ms var(--easing-spring), opacity 140ms var(--easing-out)",
            }}
          >
            ✓
          </span>
        </button>
      </div>
    </div>
  );
}
