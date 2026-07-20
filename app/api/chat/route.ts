import { NextRequest } from "next/server";
import { GoogleAuth } from "google-auth-library";

/**
 * Vertically Chat model proxy. The client (app/run/chat) POSTs { lang, messages }
 * and this streams a plain-text reply from a Gemini model on Vertex AI.
 *
 * The service-account credential stays on the server — never sent to the browser.
 * Setup (Vercel project settings + .env.local for dev):
 *   GCP_PROJECT                   — Google Cloud project id (e.g. vertically-works)
 *   GCP_LOCATION                  — region; "global" for gemini-3.5-flash (default)
 *   GEMINI_MODEL                  — model id (default gemini-3.5-flash)
 *   GOOGLE_SERVICE_ACCOUNT_JSON   — the SA key JSON, as a single-line string
 *
 * With GCP_PROJECT unset the route returns 204 and the client falls back to its
 * canned reply, so the page always responds.
 */

export const runtime = "nodejs"; // google-auth-library needs the Node runtime
export const dynamic = "force-dynamic";

const PROJECT = process.env.GCP_PROJECT || "";
const LOCATION = process.env.GCP_LOCATION || "global";
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const SA_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "";

// Short, column-friendly persona per language.
const SYSTEM: Record<string, string> = {
  ja: "あなたは「縦書きチャット」という縦書きAIチャットのデモのアシスタントです。日本語で、簡潔に2〜4文で、丁寧に答えてください。コードや長いURLは避けてください。",
  ko: '당신은 "세로쓰기 채팅"이라는 세로쓰기 AI 채팅 데모의 어시스턴트입니다. 한국어로 간결하게 2~4문장으로 정중하게 답하세요. 코드나 긴 URL은 피하세요.',
  en: 'You are the assistant in "Vertically Chat", a demo of a vertical-writing AI chat interface. Answer concisely and thoughtfully in English, in 2–4 short sentences. Avoid code blocks and long URLs.',
};

let cachedAuth: GoogleAuth | null = null;
function getAuth(): GoogleAuth {
  if (!cachedAuth) {
    const credentials = SA_JSON ? JSON.parse(SA_JSON) : undefined;
    cachedAuth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform",
      credentials,
    });
  }
  return cachedAuth;
}

type ChatMessage = { role?: string; text?: string };
type GemChunk = { candidates?: { content?: { parts?: { text?: string }[] } }[] };

export async function POST(req: NextRequest) {
  // Not configured → 204; the client uses its canned fallback (no console error).
  if (!PROJECT) return new Response(null, { status: 204 });

  let payload: { lang?: string; messages?: ChatMessage[] };
  try {
    payload = await req.json();
  } catch {
    return new Response("bad-json", { status: 400 });
  }

  const lang = payload.lang && payload.lang in SYSTEM ? payload.lang : "en";
  const contents = (payload.messages || []).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.text || "") }],
  }));
  const body = {
    contents,
    systemInstruction: { parts: [{ text: SYSTEM[lang] }] },
    generationConfig: { temperature: 0.8, maxOutputTokens: 800 },
  };

  let gRes: Response;
  try {
    const token = await getAuth().getAccessToken();
    const host = LOCATION === "global" ? "aiplatform.googleapis.com" : `${LOCATION}-aiplatform.googleapis.com`;
    const url = `https://${host}/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:streamGenerateContent?alt=sse`;
    gRes = await fetch(url, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("[chat] auth/upstream error:", err);
    return new Response("proxy-error", { status: 502 });
  }

  if (!gRes.ok || !gRes.body) {
    const detail = await gRes.text().catch(() => "");
    console.error(`[chat] upstream ${gRes.status}: ${detail.slice(0, 300)}`);
    return new Response(detail || "upstream-error", { status: gRes.status || 502 });
  }

  // Transform Gemini's SSE (`data: {json}`) into a plain-text token stream.
  const upstream = gRes.body;
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.getReader();
      const dec = new TextDecoder();
      const enc = new TextEncoder();
      let buf = "";
      const emit = (line: string) => {
        const s = line.trim();
        if (!s.startsWith("data:")) return;
        const data = s.slice(5).trim();
        if (!data || data === "[DONE]") return;
        try {
          const j = JSON.parse(data) as GemChunk;
          const text = j.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
          if (text) controller.enqueue(enc.encode(text));
        } catch {
          /* skip keepalives / partials */
        }
      };
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? ""; // keep the last (possibly partial) line
          for (const line of lines) emit(line);
        }
        buf += dec.decode(); // flush trailing bytes
        for (const line of buf.split("\n")) emit(line); // final buffered event(s)
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-cache" },
  });
}
