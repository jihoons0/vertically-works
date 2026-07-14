import { ImageResponse } from "next/og";

// The share card recreates the hero: Baskerville title on the left, the
// vertical-writing motif on the right · 縦書き and 竖排 as ink pills,
// 세로쓰기 in quiet gray · over the site's light-blue hero wash.

export const alt = "Vertically Works · Designing Interfaces for Vertical Writing Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Google Fonts glyph-subset loader · unknown UA yields TTF, which satori needs.
async function loadFont(family: string, text: string, weight: number) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`
    )
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
  if (!url) throw new Error(`No TTF url for ${family}`);
  return (await fetch(url)).arrayBuffer();
}

const TITLE = "Designing Interfaces for Vertical Writing Systems";

function Column({ chars, pill }: { chars: string; pill: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        padding: pill ? "22px 12px" : "22px 4px",
        borderRadius: 999,
        background: pill ? "#141414" : "transparent",
        color: pill ? "#ffffff" : "#a3a3a3",
        fontSize: 46,
        fontFamily: "cjk",
        lineHeight: 1,
      }}
    >
      {Array.from(chars).map((ch, i) => (
        <span key={i} style={{ display: "flex" }}>
          {ch}
        </span>
      ))}
    </div>
  );
}

export default async function OpengraphImage() {
  const [baskerville, serifKR, serifJP, serifSC, notoSans] = await Promise.all([
    loadFont("Libre Baskerville", TITLE, 700),
    loadFont("Noto Serif KR", "세로쓰기", 600),
    loadFont("Noto Serif JP", "縦書き", 600),
    loadFont("Noto Serif SC", "竖排", 600),
    loadFont("Noto Sans", "vertically.works", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(900px 500px at 85% -10%, #e8f2ff 0%, #ffffff 60%)",
          padding: "72px 80px",
        }}
      >
        {/* Title + wordmark */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "title",
              fontSize: 76,
              fontWeight: 700,
              color: "#0a0a0a",
              lineHeight: 1.12,
              letterSpacing: "-1px",
              maxWidth: 700,
            }}
          >
            {TITLE}
          </div>
          <div style={{ display: "flex", fontFamily: "sans", fontSize: 28, color: "#737373" }}>
            vertically.works
          </div>
        </div>

        {/* Vertical motif · reading order, right to left */}
        <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: 26 }}>
          <Column chars="縦書き" pill />
          <Column chars="竖排" pill />
          <Column chars="세로쓰기" pill={false} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "title", data: baskerville, weight: 700, style: "normal" },
        { name: "cjk", data: serifKR, weight: 600, style: "normal" },
        { name: "cjk", data: serifJP, weight: 600, style: "normal" },
        { name: "cjk", data: serifSC, weight: 600, style: "normal" },
        { name: "sans", data: notoSans, weight: 500, style: "normal" },
      ],
    }
  );
}
