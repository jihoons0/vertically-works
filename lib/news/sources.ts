/**
 * Default source registry per edition (PRD §5).
 *
 * An edition = language + default source set + UI chrome language. Feed URLs
 * were confirmed live at build time (2026-07); a feed that fails to parse is
 * skipped with the failure surfaced in the Sources sheet, never a blank page.
 * KBS ships no stable public RSS, so the third Korean source is SBS.
 */

export type EditionId = "ko" | "ja" | "zh";
export type SectionId = "all" | "politics" | "economy" | "society" | "culture";

export const EDITIONS: EditionId[] = ["ko", "ja", "zh"];
export const SECTIONS: SectionId[] = ["all", "politics", "economy", "society", "culture"];

export interface FeedSource {
  id: string;
  edition: EditionId;
  /** Displayed vertically in the UI · exempt from verticalization. */
  name: string;
  /** Section feeds this source offers · absent sections simply don't contribute. */
  feeds: Partial<Record<SectionId, string>>;
}

export const DEFAULT_SOURCES: FeedSource[] = [
  // ── Korean 한 ──
  {
    id: "yna",
    edition: "ko",
    name: "연합뉴스",
    feeds: {
      all: "https://www.yna.co.kr/rss/news.xml",
      politics: "https://www.yna.co.kr/rss/politics.xml",
      economy: "https://www.yna.co.kr/rss/economy.xml",
      society: "https://www.yna.co.kr/rss/society.xml",
      culture: "https://www.yna.co.kr/rss/culture.xml",
    },
  },
  {
    id: "hani",
    edition: "ko",
    name: "한겨레",
    feeds: {
      all: "https://www.hani.co.kr/rss/",
      politics: "https://www.hani.co.kr/rss/politics/",
      economy: "https://www.hani.co.kr/rss/economy/",
      society: "https://www.hani.co.kr/rss/society/",
      culture: "https://www.hani.co.kr/rss/culture/",
    },
  },
  {
    id: "sbs",
    edition: "ko",
    name: "SBS 뉴스",
    feeds: {
      all: "https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=01&plink=RSSREADER",
    },
  },

  // ── Japanese あ ──
  {
    id: "nhk",
    edition: "ja",
    name: "NHKニュース",
    feeds: {
      all: "https://www3.nhk.or.jp/rss/news/cat0.xml",
      politics: "https://www3.nhk.or.jp/rss/news/cat4.xml",
      economy: "https://www3.nhk.or.jp/rss/news/cat5.xml",
      society: "https://www3.nhk.or.jp/rss/news/cat1.xml",
      culture: "https://www3.nhk.or.jp/rss/news/cat2.xml",
    },
  },
  {
    id: "asahi",
    edition: "ja",
    name: "朝日新聞",
    feeds: {
      all: "https://www.asahi.com/rss/asahi/newsheadlines.rdf",
    },
  },

  // ── Chinese 中 · traditional-character sources preferred ──
  {
    id: "bbc-zh",
    edition: "zh",
    name: "BBC中文",
    feeds: {
      all: "https://feeds.bbci.co.uk/zhongwen/trad/rss.xml",
    },
  },
  {
    id: "cna",
    edition: "zh",
    name: "中央社",
    feeds: {
      politics: "https://feeds.feedburner.com/rsscna/politics",
      economy: "https://feeds.feedburner.com/rsscna/finance",
      society: "https://feeds.feedburner.com/rsscna/social",
      culture: "https://feeds.feedburner.com/rsscna/culture",
    },
  },
  {
    id: "ltn",
    edition: "zh",
    name: "自由時報",
    feeds: {
      all: "https://news.ltn.com.tw/rss/all.xml",
      politics: "https://news.ltn.com.tw/rss/politics.xml",
      economy: "https://news.ltn.com.tw/rss/business.xml",
      society: "https://news.ltn.com.tw/rss/society.xml",
    },
  },
];

export function sourcesFor(edition: EditionId): FeedSource[] {
  return DEFAULT_SOURCES.filter((s) => s.edition === edition);
}

/** Section labels, in each edition's own language (chrome follows the edition). */
export const SECTION_LABELS: Record<EditionId, Record<SectionId, string>> = {
  ko: { all: "종합", politics: "정치", economy: "경제", society: "사회", culture: "문화" },
  ja: { all: "総合", politics: "政治", economy: "経済", society: "社会", culture: "文化" },
  zh: { all: "綜合", politics: "政治", economy: "經濟", society: "社會", culture: "文化" },
};

export const EDITION_GLYPHS: Record<EditionId, string> = { ko: "한", ja: "あ", zh: "中" };

/** The vertical masthead wordmark per edition (PRD §6.1). */
export const WORDMARKS: Record<EditionId, string> = {
  ko: "세로신문",
  ja: "縦書新聞",
  zh: "直書新聞",
};

export const LANG_TAGS: Record<EditionId, string> = { ko: "ko", ja: "ja", zh: "zh-Hant" };
