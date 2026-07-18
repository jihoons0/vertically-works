"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

// Same no-backend pattern as the home ContactForm: submit composes a mail
// draft to the owner. Swap this one line for a POST to a real waitlist
// endpoint (Buttondown/Formspree/Vercel KV) when one exists.
const CONTACT_EMAIL = "jihoons@designwithorbital.com";

/**
 * Waitlist capture for the in-progress app pages · an email field that opens a
 * pre-filled "notify me" draft. `app` is the full app name, used in the copy
 * and the mail subject.
 */
export function NotifyForm({ app }: { app: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const inputId = "notify-" + app.replace(/\s+/g, "-").toLowerCase();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email.");
      return;
    }
    setError("");
    const subject = `[Waitlist] Notify me when ${app} launches`;
    const body = `Please add me to the ${app} waitlist and notify me at launch.\n\nEmail: ${email.trim()}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div
      style={{
        padding: "var(--space-6) var(--space-8)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
      }}
    >
      <h3 style={{ fontFamily: "var(--font-site-sans)", fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-fg)", margin: "0 0 var(--space-2)", lineHeight: 1.3 }}>
        Get notified at launch
      </h3>
      <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-5)", lineHeight: 1.6, maxWidth: "46ch" }}>
        Leave your email and I&apos;ll let you know the moment {app} is live.
      </p>

      {sent ? (
        <p aria-live="polite" style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-fg)", margin: 0 }}>
          <Check size={16} strokeWidth={2.5} aria-hidden />
          Thanks · a draft opened in your mail app. Send it and you&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="notify-form">
          <label htmlFor={inputId} style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap", border: 0 }}>
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
            style={{
              flex: 1,
              minWidth: 0,
              height: 44,
              padding: "0 var(--space-4)",
              borderRadius: "var(--radius-lg)",
              border: `1.5px solid ${error ? "var(--color-fg)" : "var(--color-border-strong)"}`,
              background: "var(--color-bg)",
              color: "var(--color-fg)",
              fontSize: "0.9375rem",
              fontFamily: "inherit",
              transition: "border-color var(--duration-fast) var(--easing-default)",
            }}
          />
          <button
            type="submit"
            className="btn-primary-hover"
            style={{
              flexShrink: 0,
              height: 44,
              padding: "0 var(--space-6)",
              borderRadius: "var(--radius-lg)",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.9375rem",
              fontWeight: 500,
              background: "var(--color-fg)",
              color: "var(--color-bg)",
            }}
          >
            Notify me
          </button>
          {error && (
            <span role="alert" style={{ flexBasis: "100%", fontSize: "0.8125rem", color: "var(--color-fg)", fontWeight: 500 }}>
              {error}
            </span>
          )}
        </form>
      )}
    </div>
  );
}
