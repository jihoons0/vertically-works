"use client";

import { useEffect, useState, type CSSProperties } from "react";

// Secular vertical-writing sample, one passage per language.
const SAMPLES: Record<Lang, { label: string; text: string }> = {
  ko: { label: "한국어", text: "글씨를 세로로 쓰는 것을 세로쓰기라 한다." },
  ja: { label: "日本語", text: "文字を縦に書くことを縦書きという。" },
  zh: { label: "中文", text: "把文字豎著書寫稱為豎排。" },
};

type Lang = "ko" | "ja" | "zh";
type Orient = "vertical" | "horizontal";
type Reading = "rtl" | "ltr";
type Theme = "light" | "dark" | "sepia";
type Device = "mobile" | "tablet" | "desktop";

type State = {
  lang: Lang;
  orient: Orient;
  reading: Reading;
  theme: Theme;
  size: number;
  device: Device;
  grid: boolean;
};

const DEFAULTS: State = {
  lang: "ko",
  orient: "vertical",
  reading: "rtl",
  theme: "light",
  size: 22,
  device: "desktop",
  grid: false,
};

const DEVICE_WIDTH: Record<Device, number> = { mobile: 320, tablet: 600, desktop: 900 };

// ── URL persistence (plain history API — no Suspense needed) ──
function encode(s: State): string {
  const p = new URLSearchParams();
  p.set("lang", s.lang);
  p.set("dir", s.orient === "vertical" ? "v" : "h");
  p.set("read", s.reading);
  p.set("theme", s.theme);
  p.set("size", String(s.size));
  p.set("device", s.device);
  p.set("grid", s.grid ? "1" : "0");
  return p.toString();
}

function decode(search: string): Partial<State> {
  const p = new URLSearchParams(search);
  const out: Partial<State> = {};
  const lang = p.get("lang");
  if (lang === "ko" || lang === "ja" || lang === "zh") out.lang = lang;
  const dir = p.get("dir");
  if (dir === "v") out.orient = "vertical";
  if (dir === "h") out.orient = "horizontal";
  const read = p.get("read");
  if (read === "rtl" || read === "ltr") out.reading = read;
  const theme = p.get("theme");
  if (theme === "light" || theme === "dark" || theme === "sepia") out.theme = theme;
  const size = Number(p.get("size"));
  if (Number.isFinite(size) && size >= 14 && size <= 48) out.size = size;
  const device = p.get("device");
  if (device === "mobile" || device === "tablet" || device === "desktop") out.device = device;
  const grid = p.get("grid");
  if (grid === "1") out.grid = true;
  if (grid === "0") out.grid = false;
  return out;
}

export function PlaygroundClient({ embedded = false }: { embedded?: boolean }) {
  const [s, setS] = useState<State>(DEFAULTS);
  const set = <K extends keyof State>(key: K, value: State[K]) => setS((prev) => ({ ...prev, [key]: value }));

  // Hydrate from URL once on mount. When embedded (e.g. on the home page) the
  // page's URL isn't ours — leave it alone in both directions.
  useEffect(() => {
    if (embedded) return;
    const fromUrl = decode(window.location.search);
    if (Object.keys(fromUrl).length) setS((prev) => ({ ...prev, ...fromUrl }));
  }, [embedded]);

  // Reflect state into the URL (shareable config).
  useEffect(() => {
    if (embedded) return;
    const qs = encode(s);
    window.history.replaceState(null, "", `${window.location.pathname}?${qs}`);
  }, [s, embedded]);

  // ── Derived preview styles ──
  const isVertical = s.orient === "vertical";
  const writingMode = isVertical ? (s.reading === "rtl" ? "vertical-rl" : "vertical-lr") : "horizontal-tb";

  const textStyle: CSSProperties = {
    writingMode,
    ...(isVertical ? { textOrientation: "mixed" } : { direction: s.reading }),
    fontSize: s.size,
    lineHeight: 1.9,
    letterSpacing: "0.08em",
    color: "var(--color-fg)",
    margin: 0,
    // Physical caps so the block is clearly smaller than the canvas, leaving
    // room for the alignment control to move it (top/center/bottom).
    ...(isVertical ? { maxHeight: 200 } : { maxWidth: "36ch" }),
  };

  const gridBg: CSSProperties = s.grid
    ? {
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in srgb, var(--color-fg) 7%, transparent) 0 1px, transparent 1px 40px), repeating-linear-gradient(to bottom, color-mix(in srgb, var(--color-fg) 7%, transparent) 0 1px, transparent 1px 40px)",
      }
    : {};

  return (
    <div className="playground-grid">
      {/* ── Controls ── */}
      <div className="playground-controls" style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--color-bg)" }}>
        <div style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>Controls</span>
          <button onClick={() => setS(DEFAULTS)} className="pressable" style={ghostBtn}>Reset</button>
        </div>

        <div style={{ padding: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Segmented label="Language" value={s.lang} onChange={(v) => set("lang", v)} options={[{ id: "ko", label: "한" }, { id: "ja", label: "あ" }, { id: "zh", label: "中" }]} />
          <Segmented label="Writing direction" value={s.orient} onChange={(v) => set("orient", v)} options={[{ id: "vertical", label: "Vertical" }, { id: "horizontal", label: "Horizontal" }]} />
          <Segmented label="Reading direction" value={s.reading} onChange={(v) => set("reading", v)} options={[{ id: "rtl", label: "RTL" }, { id: "ltr", label: "LTR" }]} />
          <Segmented label="Theme" value={s.theme} onChange={(v) => set("theme", v)} options={[{ id: "light", label: "Light" }, { id: "dark", label: "Dark" }, { id: "sepia", label: "Sepia" }]} />
          <Segmented label="Device" value={s.device} onChange={(v) => set("device", v)} options={[{ id: "mobile", label: "Mobile" }, { id: "tablet", label: "Tablet" }, { id: "desktop", label: "Desktop" }]} />

          {/* Font size slider */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={controlLabel}>Font size</span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)" }}>{s.size}px</span>
            </div>
            <input type="range" min={14} max={48} step={1} value={s.size} onChange={(e) => set("size", Number(e.target.value))} aria-label="Font size" style={{ width: "100%", accentColor: "var(--color-fg)" }} />
          </div>

          {/* Grid toggle */}
          <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
            <span style={controlLabel}>Grid</span>
            <input type="checkbox" checked={s.grid} onChange={(e) => set("grid", e.target.checked)} style={{ accentColor: "var(--color-fg)", width: 16, height: 16, cursor: "pointer" }} />
          </label>
        </div>
      </div>

      {/* ── Preview ── */}
      <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--color-bg)" }}>
        <div style={{ padding: "var(--space-3) var(--space-5)", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-fg)", letterSpacing: "-0.01em" }}>Preview</span>
          <span style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)" }}>{SAMPLES[s.lang].label} · {isVertical ? "vertical" : "horizontal"} · {s.reading.toUpperCase()}</span>
        </div>

        <div style={{ padding: "var(--space-8)", display: "flex", justifyContent: "center", background: "var(--color-bg-subtle)" }}>
          {/* Device frame */}
          <div
            data-theme={s.theme}
            style={{
              width: "100%",
              maxWidth: DEVICE_WIDTH[s.device],
              height: 440,
              borderRadius: s.device === "desktop" ? "var(--radius-lg)" : 24,
              border: `${s.device === "desktop" ? 1 : 2}px solid var(--color-border-strong)`,
              background: "var(--color-bg)",
              transition: "max-width 220ms var(--easing-out), background 200ms ease",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--space-8)",
              ...gridBg,
            }}
          >
            <p style={textStyle}>{SAMPLES[s.lang].text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Small control primitives ──
const controlLabel: CSSProperties = { fontSize: "0.8125rem", color: "var(--color-fg)", fontWeight: 500 };
const ghostBtn: CSSProperties = { fontSize: "0.75rem", color: "var(--color-fg-subtle)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 };

function Segmented<T extends string>({
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
        <span style={controlLabel}>{label}</span>
      </div>
      <div role="group" aria-label={label} style={{ display: "flex", gap: 2, padding: 3, borderRadius: "var(--radius-lg)", background: "var(--color-bg-muted)", border: "1px solid var(--color-border)" }}>
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
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
                transition: "background 150ms var(--easing-out), color 150ms var(--easing-out)",
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
