import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form delivery · the home page's ContactForm POSTs here and the message
 * is emailed to the site owner through Resend (https://resend.com). The visitor's
 * address becomes reply-to, so replying goes straight back to them.
 *
 * Setup · one env var: RESEND_API_KEY (Resend dashboard → API Keys), set in
 * Vercel's project settings (and .env.local for dev). With no verified domain
 * Resend still sends from `onboarding@resend.dev` to the account owner's address;
 * verify designwithorbital.com later to send from a branded FROM_EMAIL.
 *
 * If the key is missing the route returns 503 and the form falls back to opening
 * a mailto: draft, so a message is never lost.
 */

const TO_EMAIL = "jihoons@designwithorbital.com";
// Branded sender once designwithorbital.com is verified in Resend; until then
// Resend requires the onboarding sender for un-verified domains.
const FROM_EMAIL = "Vertically Works <onboarding@resend.dev>";

const PURPOSE_LABELS: Record<string, string> = {
  collab: "Collaboration",
  general: "General",
  feature: "Feature · App request",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  let data: { name?: string; email?: string; purpose?: string; title?: string; body?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const body = (data.body ?? "").trim();
  const title = (data.title ?? "").trim();
  const purposeLabel = PURPOSE_LABELS[data.purpose ?? "general"] ?? "General";

  if (!name || !isEmail(email) || !body) {
    return NextResponse.json(
      { error: "Name, a valid email, and a message are required." },
      { status: 400 }
    );
  }

  const subject = `[Vertically Works · ${purposeLabel}] ${title || "(no title)"}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Purpose: ${purposeLabel}`,
    ...(title ? [`Title: ${title}`] : []),
    "",
    body,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend send failed:", res.status, detail);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send error:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 502 }
    );
  }
}
