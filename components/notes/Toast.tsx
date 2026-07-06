"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ToastAction = { label: string; onClick: () => void };
type ToastState = { id: number; msg: string; action?: ToastAction; closing: boolean } | null;

const Ctx = createContext<(msg: string, action?: ToastAction) => void>(() => {});

export function useToast() {
  return useContext(Ctx);
}

/**
 * A toast rethought for the vertical axis: a vertical pill that slides in from
 * the top-right (reading-start) edge, clear of the column corridor, and slides
 * back out the way it came. Reads on the same axis as the content. An optional
 * action (e.g. undo) sits below the message as a second vertical pill.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const seq = useRef(0);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const push = useCallback((msg: string, action?: ToastAction) => {
    clear();
    const id = ++seq.current;
    setToast({ id, msg, action, closing: false });
    const life = action ? 4200 : 1900;
    timers.current.push(
      setTimeout(() => setToast((t) => (t && t.id === id ? { ...t, closing: true } : t)), life)
    );
    timers.current.push(
      setTimeout(() => setToast((t) => (t && t.id === id ? null : t)), life + 300)
    );
  }, []);

  const dismiss = () => {
    clear();
    setToast((t) => (t ? { ...t, closing: true } : t));
    setTimeout(() => setToast(null), 220);
  };

  return (
    <Ctx.Provider value={push}>
      {children}
      {toast && (
        <div
          key={toast.id}
          style={{
            position: "fixed",
            top: "var(--space-6)",
            right: "var(--space-6)",
            zIndex: 100,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "var(--space-2)",
            transformOrigin: "top right",
            animation: `${toast.closing ? "vd-toast-out" : "vd-toast-in"} ${
              toast.closing ? 200 : 320
            }ms var(--easing-out) both`,
            willChange: "transform, opacity",
          }}
        >
          {toast.action && (
            <button
              className="pressable"
              onClick={() => {
                toast.action?.onClick();
                dismiss();
              }}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                background: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--color-border-strong)",
                padding: "var(--space-4) var(--space-2)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8125rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "var(--shadow-column)",
              }}
            >
              {toast.action.label}
            </button>
          )}
          <div
            aria-live="polite"
            aria-atomic="true"
            style={{
              background: "var(--color-fg)",
              color: "var(--color-bg)",
              padding: "var(--space-5) var(--space-2)",
              borderRadius: "var(--radius-full)",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              boxShadow: "var(--shadow-lift)",
            }}
          >
            {toast.msg}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
