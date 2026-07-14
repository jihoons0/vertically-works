"use client";

/**
 * Write to Us · the contact section that grew out of the retired home-page
 * playground, keeping its anatomy: a controls panel on the left, a live
 * canvas on the right. The canvas is the letter itself.
 *
 * Design decisions (and what this section teaches):
 * - The composition surface honors a writing-direction toggle. In vertical
 *   mode the title and message are REAL vertical writing surfaces ·
 *   `writing-mode: vertical-rl` + `text-orientation: mixed` on the actual
 *   form controls (supported since Chrome 119 / Safari 17.4 / Firefox 120) ·
 *   never a rotated horizontal box.
 * - Name and email deliberately stay horizontal — fields AND labels: CJK IME
 *   composition assumes a horizontal baseline (the registry text-field's
 *   reasoning), and the labels are English chrome, not vertical content.
 * - Sending composes a mail draft (mailto:) in the visitor's own mail app ·
 *   nothing is stored on the site, and the UI says so.
 * - Motion: only the surface's box transition, on --duration/--easing tokens;
 *   the global reduced-motion reset flattens it.
 */

import { useId, useState, type CSSProperties, type FormEvent, type InputHTMLAttributes } from "react";
import { usePreviewLang } from "@/components/providers/PreviewLangProvider";
import type { Lang } from "@/components/home/bento-shared";

const CONTACT_EMAIL = "office@designwithorbital.com";

type Dir = "vertical" | "horizontal";
type Purpose = "collab" | "general" | "feature";

const PURPOSES: { id: Purpose; label: string; subject: string }[] = [
  { id: "collab", label: "Collaboration", subject: "Collaboration" },
  { id: "general", label: "General", subject: "General" },
  { id: "feature", label: "Feature · App request", subject: "Feature · App request" },
];

// Composition placeholders follow the site-wide preview language.
const PLACEHOLDERS: Record<Lang, { name: string; title: string; body: string }> = {
  ko: { name: "이름 · Name", title: "제목 · Title", body: "여기에 쓰세요 · Write here…" },
  ja: { name: "名前 · Name", title: "題名 · Title", body: "ここに書いてください · Write here…" },
  zh: { name: "姓名 · Name", title: "標題 · Title", body: "在這裡書寫 · Write here…" },
};

export function ContactForm() {
  const { lang } = usePreviewLang();
  const ph = PLACEHOLDERS[lang];
  const [dir, setDir] = useState<Dir>("vertical");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState<Purpose>("general");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; body?: string }>({});
  const [sent, setSent] = useState(false);

  const isV = dir === "vertical";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Your name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "A valid email is required.";
    if (!body.trim()) errs.body = "Write a message before sending.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const subjectTag = PURPOSES.find((p) => p.id === purpose)?.subject ?? "General";
    const subject = `[${subjectTag}] ${title.trim() || "(no title)"}`;
    const lines = [`Name: ${name.trim()}`, `Email: ${email.trim()}`, `Purpose: ${subjectTag}`, "", body];
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  // ── Composition surface styles · the playground's textStyle, grown up ──
  const titleStyle: CSSProperties = {
    fontFamily: "inherit",
    fontSize: "1.0625rem",
    fontWeight: 600,
    color: "var(--color-fg)",
    background: "transparent",
    letterSpacing: "-0.01em",
    // Longhands only, same keys in both modes — mixing the `border` shorthand
    // with per-side longhands across rerenders trips React's style warning.
    borderStyle: "solid",
    borderColor: "var(--color-border)",
    borderTopWidth: 0,
    borderRightWidth: 0,
    transition: `width var(--duration-base) var(--easing-out), height var(--duration-base) var(--easing-out)`,
    ...(isV
      ? {
          writingMode: "vertical-rl" as const,
          textOrientation: "mixed" as const,
          height: "100%",
          width: 52,
          padding: "var(--space-2) 0 var(--space-2) var(--space-4)",
          borderLeftWidth: 1,
          borderBottomWidth: 0,
        }
      : {
          width: "100%",
          padding: "0 0 var(--space-3)",
          borderLeftWidth: 0,
          borderBottomWidth: 1,
        }),
  };

  const bodyStyle: CSSProperties = {
    fontFamily: "inherit",
    fontSize: "0.9375rem",
    color: "var(--color-fg)",
    background: "transparent",
    border: "none",
    resize: "none" as const,
    lineHeight: 1.9,
    letterSpacing: "0.04em",
    transition: `width var(--duration-base) var(--easing-out), height var(--duration-base) var(--easing-out)`,
    ...(isV
      ? { writingMode: "vertical-rl" as const, textOrientation: "mixed" as const, height: "100%", flex: 1, minWidth: 0 }
      : { width: "100%", minHeight: 220, lineHeight: 1.75 }),
  };

  return (
    <div>
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
        Write to Us
      </h2>
      <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-10)", lineHeight: 1.65 }}>
        Questions, ideas, collaborations — write to us anytime. Compose your message
        vertically or horizontally, whichever way you think.
      </p>

      {/* One bounding box · sender and compose divided by a single hairline */}
      <form onSubmit={handleSubmit} noValidate className="contact-card">
        {/* ── Sender pane ── */}
        <div className="contact-sender">
            {/* Stacked horizontal labels · they're English chrome, not vertical content */}
            <Field
              label="Name"
              value={name}
              onChange={setName}
              error={errors.name}
              placeholder={ph.name}
              autoComplete="name"
              required
            />
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              error={errors.email}
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
            />
            <RadioStack label="Purpose" value={purpose} onChange={setPurpose} options={PURPOSES} />
        </div>

        {/* ── Compose pane · the letter itself ── */}
        <div className="contact-compose">
          <div
            style={{
              padding: "var(--space-6)",
              display: "flex",
              flexDirection: isV ? "row-reverse" : "column",
              gap: isV ? "var(--space-5)" : "var(--space-4)",
              height: isV ? 400 : "auto",
            }}
          >
            <input
              aria-label="Title"
              placeholder={ph.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={titleStyle}
            />
            <textarea
              aria-label="Message"
              aria-invalid={errors.body ? true : undefined}
              placeholder={ph.body}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={bodyStyle}
            />
          </div>

          {/* Send row · status left, direction toggle beside Send on the right */}
          <div style={{ marginTop: "auto", padding: "var(--space-4) var(--space-6)", borderTop: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <span aria-live="polite" style={{ fontSize: "0.75rem", color: "var(--color-fg)", fontWeight: 500, alignSelf: "center" }}>
              {sent ? "✓ Draft opened — send it from your mail app." : errors.body ?? ""}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <Segmented
                ariaLabel="Writing direction"
                value={dir}
                onChange={setDir}
                options={[
                  { id: "vertical", label: "Vertical" },
                  { id: "horizontal", label: "Horizontal" },
                ]}
                style={{ width: 200 }}
              />
            <button
              type="submit"
              className="btn-primary-hover pressable"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                padding: "0 var(--space-6)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                background: "var(--color-fg)",
                color: "var(--color-bg)",
              }}
            >
              Send →
            </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// ── Field · stacked horizontal label + input (English chrome stays horizontal) ──
function Field({
  label,
  value,
  onChange,
  error,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <label htmlFor={id} style={{ fontSize: "0.8125rem", color: "var(--color-fg)", fontWeight: 500 }}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        style={{
          height: 40,
          padding: "0 var(--space-3)",
          borderRadius: "var(--radius-lg)",
          border: `1.5px solid ${error ? "var(--color-fg)" : "var(--color-border-strong)"}`,
          background: "var(--color-bg)",
          color: "var(--color-fg)",
          fontSize: "0.9375rem",
          fontFamily: "inherit",
          width: "100%",
          transition: "border-color var(--duration-fast) var(--easing-default)",
        }}
        {...rest}
      />
      {error && (
        <p id={errorId} style={{ fontSize: "0.75rem", color: "var(--color-fg)", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ── RadioStack · vertically stacked radio choices (the sender rail has room) ──
function RadioStack<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-fg)", fontWeight: 500 }}>{label}</span>
      </div>
      <div role="radiogroup" aria-label={label} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.id)}
              className="pressable"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "var(--space-2) var(--space-3)",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: active ? "var(--color-bg-muted)" : "transparent",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.875rem",
                fontWeight: active ? 600 : 400,
                color: active ? "var(--color-fg)" : "var(--color-fg-muted)",
                textAlign: "left",
                transition: "background var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
              }}
            >
              <span
                aria-hidden
                className="corner-round"
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: `1.5px solid ${active ? "var(--color-fg)" : "var(--color-border-strong)"}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "border-color var(--duration-fast) var(--easing-out)",
                }}
              >
                <span
                  className="corner-round"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--color-fg)",
                    transform: active ? "scale(1)" : "scale(0)",
                    transition: "transform var(--duration-fast) var(--easing-out)",
                  }}
                />
              </span>
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Segmented · the playground's control, kept alive here ──
function Segmented<T extends string>({
  label,
  ariaLabel,
  value,
  onChange,
  options,
  style,
}: {
  label?: string;
  ariaLabel: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
  style?: CSSProperties;
}) {
  return (
    <div style={style}>
      {label && (
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-fg)", fontWeight: 500 }}>{label}</span>
        </div>
      )}
      <div role="group" aria-label={ariaLabel} style={{ display: "flex", gap: 2, padding: 3, borderRadius: "var(--radius-lg)", background: "var(--color-bg-muted)", border: "1px solid var(--color-border)" }}>
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              className="pressable"
              style={{
                flex: 1,
                padding: "5px 0",
                borderRadius: "var(--radius-md)",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.75rem",
                fontWeight: 500,
                background: active ? "var(--color-fg)" : "transparent",
                color: active ? "var(--color-bg)" : "var(--color-fg-muted)",
                transition: "background var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
