"use client";

import { useEffect, useRef } from "react";
import { ChatShader } from "./ChatShader";

type Lang = "ja" | "ko" | "en";
type Theme = "navy" | "light" | "dark" | "sepia";
type Seg = { t: "text" | "tcy"; v: string };
type LangPack = {
  htmlLang: string;
  name: string;
  you: string;
  ai: string;
  placeholder: string;
  inputAria: string;
  send: string;
  intro: string;
  reply: Seg[];
};

const LANGS: Record<Lang, LangPack> = {
  ja: {
    htmlLang: "ja", name: "日本語", you: "あなた", ai: "アシスタント",
    placeholder: "質問を入力…", inputAria: "メッセージ", send: "送信",
    intro: "こんにちは。「縦書きチャット」へようこそ。これは縦書きのための実験的なAIチャットです。下の入力欄から質問すると、縦書きで返答します。何でも聞いてください。",
    reply: [
      { t: "text", v: "縦書きのUIは、横書きの部品を回転させるものではありません。読みの軸そのものを作り直します。" },
      { t: "text", v: "たとえばトグルは、つまみが読みの軸（上下）を進み、上が「オン」。行は上から下へ、列は右から左へ流れます。" },
      { t: "tcy", v: "2024" }, { t: "text", v: "年以降、主要ブラウザが縦書きを十分に実装したので、本物の縦書きが使えます。回転ではありません。" },
      { t: "text", v: "——このチャット自体がその実験です。話者は列の左右ではなく、列の先頭（上）で示しています。" },
    ],
  },
  ko: {
    htmlLang: "ko", name: "한국어", you: "나", ai: "AI",
    placeholder: "질문을 입력…", inputAria: "메시지", send: "보내기",
    intro: '안녕하세요. "세로쓰기 채팅"에 오신 것을 환영합니다. 세로쓰기를 위한 실험적인 AI 채팅입니다. 아래 입력창에 질문하면 세로로 답해 드립니다. 무엇이든 물어보세요.',
    reply: [
      { t: "text", v: "세로쓰기 UI는 가로 부품을 회전시킨 것이 아닙니다. 읽기 축 자체를 다시 만듭니다." },
      { t: "text", v: "예를 들어 토글은 손잡이가 읽기 축(위아래)을 따라가고, 위가 “켬”입니다. 행은 위에서 아래로, 열은 오른쪽에서 왼쪽으로 흐릅니다." },
      { t: "tcy", v: "2024" }, { t: "text", v: "년 이후 주요 브라우저가 세로쓰기를 충분히 구현해, 진짜 세로쓰기를 쓸 수 있습니다. 회전이 아닙니다." },
      { t: "text", v: "——이 채팅 자체가 그 실험입니다. 화자는 열의 좌우가 아니라 열의 첫머리(위)에서 표시합니다." },
    ],
  },
  en: {
    htmlLang: "en", name: "English", you: "You", ai: "Assistant",
    placeholder: "Ask a question…", inputAria: "Message", send: "Send",
    intro: "Hello, and welcome to Vertically Chat — an experiment in an AI chat interface built for vertical writing. Ask anything in the field below and it replies down the column.",
    reply: [
      { t: "text", v: "A vertical UI is not horizontal parts rotated. It rebuilds the reading axis itself." },
      { t: "text", v: "A toggle’s knob travels the reading axis (up–down), with up meaning “on.” Lines run top to bottom; columns run right to left." },
      { t: "text", v: "Since 2024, major browsers support vertical writing well enough for the real thing — never rotation." },
      { t: "text", v: "——This chat is that experiment. The speaker is marked at the top of each column, not by side." },
    ],
  },
};
const LANG_ORDER: Lang[] = ["ja", "ko", "en"];
const THEME_ORDER: Theme[] = ["navy", "light", "dark", "sepia"];
const THEME_LABELS: Record<Lang, Record<Theme, string>> = {
  ja: { navy: "ネイビー", light: "ライト", dark: "ダーク", sepia: "セピア" },
  ko: { navy: "네이비", light: "라이트", dark: "다크", sepia: "세피아" },
  en: { navy: "Navy", light: "Light", dark: "Dark", sepia: "Sepia" },
};

// All the imperative streaming/DOM logic, scoped to the app root. Returns a
// cleanup fn (StrictMode-safe: async loops bail once disposed).
function mountChat(root: HTMLElement): () => void {
  const q = <T extends HTMLElement>(sel: string) => root.querySelector(sel) as T;
  const thread = q<HTMLElement>(".thread");
  const form = q<HTMLFormElement>("form");
  const input = q<HTMLInputElement>('input[type="text"]');
  const sendBtn = q<HTMLButtonElement>(".send");
  const langBtn = q<HTMLButtonElement>(".lang");
  const themeBtn = q<HTMLButtonElement>(".theme");
  const langPop = q<HTMLElement>(".lang-pop");
  const themePop = q<HTMLElement>(".theme-pop");

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let disposed = false;
  let busy = false;
  let lang: Lang = "ja";
  const history: { role: "user" | "assistant"; text: string }[] = [];
  const L = () => LANGS[lang];
  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  // ── rail hover menus ──
  function buildMenu(pop: HTMLElement, items: { v: string; label: string }[], onPick: (v: string) => void) {
    pop.replaceChildren();
    for (const it of items) {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.v = it.v;
      b.textContent = it.label;
      b.setAttribute("role", "menuitemradio");
      b.addEventListener("click", () => onPick(it.v));
      pop.append(b);
    }
  }
  function markCurrent(pop: HTMLElement, v: string) {
    for (const b of Array.from(pop.children)) b.setAttribute("aria-checked", String((b as HTMLElement).dataset.v === v));
  }

  // ── theme ──
  function setTheme(v: string) {
    const t = (THEME_ORDER as string[]).includes(v) ? (v as Theme) : THEME_ORDER[0];
    root.setAttribute("data-theme", t);
    markCurrent(themePop, t);
    relabelThemes();
  }
  function relabelThemes() {
    const cur = (root.getAttribute("data-theme") || "navy") as Theme;
    themeBtn.textContent = THEME_LABELS[lang][cur];
    for (const b of Array.from(themePop.children)) {
      (b as HTMLElement).textContent = THEME_LABELS[lang][(b as HTMLElement).dataset.v as Theme];
    }
  }
  const onThemeClick = () => {
    const cur = (root.getAttribute("data-theme") || "navy") as Theme;
    setTheme(THEME_ORDER[(THEME_ORDER.indexOf(cur) + 1) % THEME_ORDER.length]);
  };

  // ── language ──
  function applyLang(next: Lang) {
    lang = next;
    root.setAttribute("lang", L().htmlLang);
    input.placeholder = L().placeholder;
    input.setAttribute("aria-label", L().inputAria);
    sendBtn.textContent = L().send;
    langBtn.textContent = L().name;
    markCurrent(langPop, lang);
    relabelThemes();
  }
  function setLang(v: string) {
    if (busy || v === lang) return;
    applyLang(v as Lang);
    showIntro();
  }
  const onLangClick = () => setLang(LANG_ORDER[(LANG_ORDER.indexOf(lang) + 1) % LANG_ORDER.length]);

  // ── thread building ──
  function makeCap(who: "user" | "ai") {
    const cap = document.createElement("span");
    cap.className = "cap";
    const dot = document.createElement("span");
    dot.className = "dot corner-round";
    cap.append(dot, document.createTextNode(who === "user" ? L().you : L().ai));
    return cap;
  }
  function addTurn(who: "user" | "ai") {
    const turn = document.createElement("div");
    turn.className = "turn writing-vertical " + who;
    const body = document.createElement("div");
    body.className = "body";
    turn.append(makeCap(who), body);
    thread.prepend(turn);
    thread.scrollLeft = 0;
    return body;
  }
  function userTurn(text: string) {
    const body = addTurn("user");
    body.textContent = text;
    history.push({ role: "user", text });
  }
  async function typeInto(span: HTMLElement, text: string) {
    if (reduce) { span.textContent += text; thread.scrollLeft = 0; return; }
    for (const ch of text) {
      if (disposed) return;
      span.textContent += ch;
      thread.scrollLeft = 0;
      await sleep(14);
    }
  }

  async function streamModelReply(body: HTMLElement, caret: HTMLElement): Promise<string> {
    const span = document.createElement("span");
    body.insertBefore(span, caret);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lang, messages: history }),
      });
      if (!res.ok || !res.body) throw new Error("api " + res.status);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let text = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done || disposed) break;
        const chunk = dec.decode(value, { stream: true });
        text += chunk;
        await typeInto(span, chunk);
      }
      if (!text.trim()) throw new Error("empty");
      return text;
    } catch {
      span.remove();
      return "";
    }
  }

  async function assistantTurn() {
    const body = addTurn("ai");
    const caret = document.createElement("span");
    caret.className = "caret";
    body.append(caret);

    // Retry once — Vertex's first streamed response is occasionally empty, and a
    // transient blip shouldn't surface the (off-topic) canned reply.
    let full = "";
    for (let attempt = 0; attempt < 2 && !full && !disposed; attempt++) {
      if (attempt > 0) await sleep(400);
      full = await streamModelReply(body, caret);
    }
    if (!full && !disposed) {
      for (const seg of L().reply) {
        const span = document.createElement("span");
        if (seg.t === "tcy") span.className = "tcy";
        body.insertBefore(span, caret);
        await typeInto(span, seg.v);
        full += seg.v;
      }
    }
    caret.remove();
    history.push({ role: "assistant", text: full });
  }

  async function turn(text: string) {
    if (busy) return;
    busy = true;
    sendBtn.disabled = true;
    userTurn(text);
    await sleep(reduce ? 0 : 400);
    await assistantTurn();
    busy = false;
    sendBtn.disabled = false;
    if (!disposed) input.focus();
  }

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v || busy) return;
    input.value = "";
    turn(v);
  };

  // Short assistant intro about the tool (no fake user turn, no model call, not
  // added to history), shown on load and after a language switch.
  async function showIntro() {
    if (busy) return;
    busy = true;
    sendBtn.disabled = true;
    thread.replaceChildren();
    history.length = 0;
    const body = addTurn("ai");
    const caret = document.createElement("span");
    caret.className = "caret";
    body.append(caret);
    const span = document.createElement("span");
    body.insertBefore(span, caret);
    await sleep(reduce ? 0 : 250);
    await typeInto(span, L().intro);
    caret.remove();
    busy = false;
    sendBtn.disabled = false;
    if (!disposed) input.focus();
  }

  // Mobile keyboard · shrink the shell to the space above the on-screen keyboard.
  const vv = window.visualViewport;
  const fitViewport = () => { if (vv) root.style.height = vv.height + "px"; };

  // wire up
  themeBtn.addEventListener("click", onThemeClick);
  langBtn.addEventListener("click", onLangClick);
  form.addEventListener("submit", onSubmit);
  if (vv) {
    vv.addEventListener("resize", fitViewport);
    vv.addEventListener("scroll", fitViewport);
    fitViewport();
  }
  buildMenu(themePop, THEME_ORDER.map((v) => ({ v, label: THEME_LABELS[lang][v] })), setTheme);
  markCurrent(themePop, root.getAttribute("data-theme") || "navy");
  buildMenu(langPop, LANG_ORDER.map((c) => ({ v: c, label: LANGS[c].name })), setLang);
  markCurrent(langPop, lang);
  showIntro();

  return () => {
    disposed = true;
    themeBtn.removeEventListener("click", onThemeClick);
    langBtn.removeEventListener("click", onLangClick);
    form.removeEventListener("submit", onSubmit);
    if (vv) {
      vv.removeEventListener("resize", fitViewport);
      vv.removeEventListener("scroll", fitViewport);
    }
  };
}

export default function ChatApp() {
  const appRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = appRef.current;
    if (!root) return;
    return mountChat(root);
  }, []);

  return (
    <div className="vc-app" ref={appRef} data-theme="navy" lang="ja">
      <ChatShader />
      <header>
        <div className="brand">
          <h1 className="writing-vertical">縦書きチャット</h1>
          <span className="sub writing-vertical">Vertically Chat</span>
        </div>
        <div className="controls">
          <div className="menu">
            <button className="lang pressable" data-vw="" type="button" aria-haspopup="menu" aria-label="言語を選択">日本語</button>
            <div className="menu-pop lang-pop" role="menu" aria-label="言語" />
          </div>
          <div className="menu">
            <button className="theme pressable" data-vw="" type="button" aria-haspopup="menu" aria-label="テーマを選択">ネイビー</button>
            <div className="menu-pop theme-pop" role="menu" aria-label="テーマ" />
          </div>
        </div>
      </header>

      <main className="thread" aria-live="polite" />

      <form autoComplete="off">
        <input type="text" className="corner-round" data-vw="" placeholder="質問を入力…" aria-label="メッセージ" />
        <button className="send pressable corner-round" data-vw="" type="submit">送信</button>
      </form>
    </div>
  );
}
