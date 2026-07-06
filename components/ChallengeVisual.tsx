// Compact, monochrome diagrams of each challenge's core axis conflict.
// Token-based only; vertical text used where it sharpens the point. Shared by the
// /challenges page and the homepage Challenges section.
export function ChallengeVisual({ id }: { id: string }) {
  const fg = "var(--color-fg)";
  const sub = "var(--color-fg-subtle)";
  const strong = "var(--color-border-strong)";
  const muted = "var(--color-bg-muted)";
  const bg = "var(--color-bg)";

  switch (id) {
    case "motion-direction":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative", width: 50, height: 88, border: `1.5px solid ${strong}`, borderRadius: 10, overflow: "hidden", background: bg }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "48%", background: fg, borderRadius: "6px 6px 0 0", display: "flex", justifyContent: "center", paddingTop: 4 }}>
              <span style={{ color: bg, fontSize: 13, fontWeight: 700 }}>↑</span>
            </div>
          </div>
          <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: 12, color: sub, letterSpacing: "0.1em" }}>읽기 ↓</span>
        </div>
      );
    case "mixed-language":
      return (
        <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: 22, letterSpacing: "0.12em", color: fg }}>
          「창 1:1」
        </span>
      );
    case "navigation-direction":
      return (
        <div style={{ position: "relative", width: 56, height: 92, border: `1.5px solid ${strong}`, borderRadius: 10, background: bg, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 8, top: 10, bottom: 10, right: 22, display: "flex", flexDirection: "row-reverse", gap: 4 }}>
            {[0, 1, 2].map((i) => <div key={i} style={{ width: 2, background: muted, borderRadius: 2 }} />)}
          </div>
          <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 16, background: muted, borderLeft: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11, color: sub, fontWeight: 700 }}>?</span>
          </div>
        </div>
      );
    case "selection":
      return (
        <div style={{ position: "relative", display: "flex", flexDirection: "row-reverse", gap: 8 }}>
          {["세로쓰기", "라고도", "부른다"].map((t, i) => (
            <span key={i} style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: 13, letterSpacing: "0.08em", color: fg }}>{t}</span>
          ))}
          <div style={{ position: "absolute", top: "18%", bottom: "26%", left: "-6%", right: "-6%", background: "color-mix(in srgb, var(--color-fg) 16%, transparent)", borderRadius: 3 }} />
        </div>
      );
    case "ime-vertical":
      return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ writingMode: "vertical-rl", fontSize: 22, color: fg, borderInlineStart: `2px solid ${fg}`, paddingInlineStart: 3 }}>가</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, border: `1px solid ${strong}`, borderRadius: 6, padding: "4px 6px", background: bg }}>
            {["1 가", "2 家", "3 加"].map((x) => <span key={x} style={{ fontSize: 10, color: sub, fontFamily: "var(--font-geist-mono)" }}>{x}</span>)}
          </div>
        </div>
      );
    case "keyboard-navigation":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 22px)", gridAutoRows: 22, gap: 4 }}>
            {[
              { ch: "", k: "a" }, { ch: "↑", k: "up" }, { ch: "", k: "b" },
              { ch: "←", k: "left", on: true }, { ch: "↓", k: "down", on: true }, { ch: "→", k: "right" },
            ].map(({ ch, k, on }) =>
              ch === "" ? <span key={k} /> : (
                <span key={k} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 5, fontSize: 12, fontWeight: 600, border: `1px solid ${on ? fg : "var(--color-border)"}`, background: on ? fg : bg, color: on ? bg : sub }}>{ch}</span>
              )
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 10, color: sub }}>
            <span>↓ 다음 글자</span>
            <span>← 다음 줄</span>
          </div>
        </div>
      );
    case "drag-reorder":
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 12, height: 60, borderRadius: 6, background: i === 1 ? fg : muted, border: `1px solid ${i === 1 ? fg : strong}`, transform: i === 1 ? "translateY(-6px)" : "none", boxShadow: i === 1 ? "0 6px 14px rgba(0,0,0,0.18)" : "none" }} />
            ))}
          </div>
          <span style={{ fontSize: 14, color: sub }}>↔</span>
        </div>
      );
    case "ai-chat":
      return (
        <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: 8 }}>
          <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: 12, color: fg, background: muted, borderRadius: 999, padding: "10px 6px", letterSpacing: "0.05em" }}>안녕하세요</span>
          <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: 12, color: bg, background: fg, borderRadius: 999, padding: "10px 6px", marginTop: 22, letterSpacing: "0.05em" }}>반가워요</span>
        </div>
      );
    default:
      return null;
  }
}
