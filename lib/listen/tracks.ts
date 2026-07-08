export type LyricLine = {
  /** Seconds into the track at which this line becomes active. */
  time: number;
  text: string;
};

export type Track = {
  id: string;
  title: string;
  titleLatin?: string;
  artist: string;
  /** Path under /public, e.g. "/audio/arirang-chorus.m4a". */
  src: string;
  duration: number;
  /** Attribution shown in the poster view; required by CC BY sources. */
  credit?: string;
  /** 30-second chart preview rather than a full local file. */
  isPreview?: boolean;
  /** Album art URL (used for system media chrome, not the in-app UI). */
  artwork?: string;
  /** Untimed verse lines shown when timed lyrics aren't applicable. */
  plainLyrics?: string[];
  lyrics: LyricLine[];
};

/* Seeded tracks — real, openly licensed recordings:
 *
 * - 아리랑 (U.S. Army Chorus, sung) — public domain (US government work).
 *   commons.wikimedia.org/wiki/File:Arirang.ogg
 * - 경기아리랑 / 도라지타령 / 밀양아리랑 — live 국악 ensemble performances,
 *   CC BY 4.0, 한국저작권위원회 공유마당 (gongu.copyright.or.kr), via
 *   Wikimedia Commons (Gyeonggi Arirang.wav / Doraji Taryeong.wav /
 *   Miryang Arirang.wav).
 *
 * The instrumental tracks carry the traditional public-domain verse with
 * ESTIMATED line times (the music is continuous) — tune the numbers freely.
 */
const SEEDED: Track[] = [
  {
    id: "arirang-chorus",
    title: "아리랑",
    titleLatin: "Arirang",
    artist: "미 육군 합창단",
    src: "/audio/arirang-chorus.m4a",
    duration: 88.9,
    credit: "U.S. Army Chorus · Public Domain",
    lyrics: [
      { time: 5.5, text: "아리랑 아리랑 아라리요" },
      { time: 15.5, text: "아리랑 고개로 넘어간다" },
      { time: 25.5, text: "나를 버리고 가시는 님은" },
      { time: 35.5, text: "십리도 못 가서 발병 난다" },
      { time: 45.5, text: "아리랑 아리랑 아라리요" },
      { time: 55.5, text: "아리랑 고개로 넘어간다" },
      { time: 65.5, text: "나를 버리고 가시는 님은" },
      { time: 75.0, text: "십리도 못 가서 발병 난다" },
    ],
  },
  {
    id: "gyeonggi-arirang",
    title: "경기아리랑",
    titleLatin: "Gyeonggi Arirang",
    artist: "국악 합주",
    src: "/audio/gyeonggi-arirang.m4a",
    duration: 51.4,
    credit: "공유마당 · CC BY 4.0",
    lyrics: [
      { time: 2.0, text: "아리랑 아리랑 아라리요" },
      { time: 13.5, text: "아리랑 고개로 넘어간다" },
      { time: 25.0, text: "나를 버리고 가시는 님은" },
      { time: 36.5, text: "십리도 못 가서 발병 난다" },
    ],
  },
  {
    id: "doraji-taryeong",
    title: "도라지타령",
    titleLatin: "Doraji Taryeong",
    artist: "국악 합주",
    src: "/audio/doraji-taryeong.m4a",
    duration: 101.5,
    credit: "공유마당 · CC BY 4.0",
    lyrics: [
      { time: 3.0, text: "도라지 도라지 백도라지" },
      { time: 17.5, text: "심심산천에 백도라지" },
      { time: 32.0, text: "한두 뿌리만 캐어도" },
      { time: 46.5, text: "대바구니로 반실만 되누나" },
      { time: 61.0, text: "에헤요 에헤요 에헤야" },
      { time: 75.5, text: "어여라 난다 지화자 좋다" },
    ],
  },
  {
    id: "miryang-arirang",
    title: "밀양아리랑",
    titleLatin: "Miryang Arirang",
    artist: "국악 합주",
    src: "/audio/miryang-arirang.m4a",
    duration: 49.3,
    credit: "공유마당 · CC BY 4.0",
    lyrics: [
      { time: 2.5, text: "날 좀 보소 날 좀 보소 날 좀 보소" },
      { time: 14.0, text: "동지 섣달 꽃 본 듯이 날 좀 보소" },
      { time: 25.5, text: "아리 아리랑 쓰리 쓰리랑 아라리가 났네" },
      { time: 37.0, text: "아리랑 고개로 날 넘겨 주소" },
    ],
  },
];

/** Add your own music here: drop a file in public/audio/ and append an
 *  entry (lyrics optional — pass [] to disable karaoke for that track). */
const CUSTOM: Track[] = [];

export const TRACKS: Track[] = [...SEEDED, ...CUSTOM];
