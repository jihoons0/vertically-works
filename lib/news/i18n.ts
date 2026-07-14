/**
 * Chrome strings per edition — landmarks and labels follow the edition's
 * language (PRD §10). Voice: reverent restraint, no marketing gloss.
 */

import type { EditionId } from "./sources";

export interface Strings {
  frontPage: string;
  stories: string;
  editionCapsule: string;
  sections: string;
  sources: string;
  themes: string;
  addFeed: string;
  feedUrl: string;
  add: string;
  adding: string;
  remove: string;
  removeConfirmTitle: string;
  removeConfirmBody: string;
  cancel: string;
  parseErrorTitle: string;
  parseErrorBody: string;
  feedFailed: string;
  customFeeds: string;
  defaultSources: string;
  themeLight: string;
  themeDark: string;
  themeSepia: string;
  typeface: string;
  serifName: string;
  sansName: string;
  original: string;
  share: string;
  back: string;
  gone: string;
  goneHint: string;
  nextPage: string;
  prevPage: string;
  pageOf: (n: number, total: number) => string;
  storyIndicator: (n: number, total: number) => string;
  loading: string;
  noBody: string;
  empty: string;
  close: string;
}

export const STRINGS: Record<EditionId, Strings> = {
  ko: {
    frontPage: "1면",
    stories: "기사 목록",
    editionCapsule: "판 선택",
    sections: "지면",
    sources: "피드",
    themes: "지면 색",
    addFeed: "피드 추가",
    feedUrl: "RSS 주소",
    add: "추가",
    adding: "확인 중…",
    remove: "삭제",
    removeConfirmTitle: "피드를 삭제할까요",
    removeConfirmBody: "이 피드의 기사가 1면에서 내려갑니다.",
    cancel: "취소",
    parseErrorTitle: "피드를 읽지 못했습니다",
    parseErrorBody: "RSS나 Atom 형식이 아니거나, 응답이 없습니다.",
    feedFailed: "불러오기 실패",
    customFeeds: "추가한 피드",
    defaultSources: "기본 피드",
    themeLight: "밝게",
    themeDark: "어둡게",
    themeSepia: "세피아",
    typeface: "글꼴",
    serifName: "명조",
    sansName: "고딕",
    original: "원문 보기",
    share: "공유",
    back: "1면으로",
    gone: "기사가 지면에서 내려갔습니다",
    goneHint: "피드가 갱신되어 본문이 남아 있지 않습니다. 원문으로 읽을 수 있습니다.",
    nextPage: "다음 면",
    prevPage: "이전 면",
    pageOf: (n, total) => `${n} / ${total}면`,
    storyIndicator: (n, total) => `${n} / ${total}`,
    loading: "지면을 짜는 중",
    noBody: "본문이 아직 지면에 없습니다. 원문으로 읽어주세요.",
    empty: "오늘 지면에 실을 기사가 없습니다",
    close: "닫기",
  },
  ja: {
    frontPage: "一面",
    stories: "記事一覧",
    editionCapsule: "版の選択",
    sections: "紙面",
    sources: "フィード",
    themes: "紙面の色",
    addFeed: "フィード追加",
    feedUrl: "RSSアドレス",
    add: "追加",
    adding: "確認中…",
    remove: "削除",
    removeConfirmTitle: "フィードを削除しますか",
    removeConfirmBody: "このフィードの記事が一面から下がります。",
    cancel: "取消",
    parseErrorTitle: "フィードを読めませんでした",
    parseErrorBody: "RSS・Atom形式ではないか、応答がありません。",
    feedFailed: "読み込み失敗",
    customFeeds: "追加したフィード",
    defaultSources: "既定のフィード",
    themeLight: "明るく",
    themeDark: "暗く",
    themeSepia: "セピア",
    typeface: "書体",
    serifName: "明朝",
    sansName: "ゴシック",
    original: "元の記事",
    share: "共有",
    back: "一面へ",
    gone: "記事は紙面から下がりました",
    goneHint: "フィードが更新され、本文が残っていません。元の記事で読めます。",
    nextPage: "次の面",
    prevPage: "前の面",
    pageOf: (n, total) => `${n} / ${total}面`,
    storyIndicator: (n, total) => `${n} / ${total}`,
    loading: "紙面を組んでいます",
    noBody: "本文はまだ紙面にありません。元の記事でお読みください。",
    empty: "今日の紙面に載せる記事がありません",
    close: "閉じる",
  },
  zh: {
    frontPage: "頭版",
    stories: "新聞列表",
    editionCapsule: "選擇版本",
    sections: "版面",
    sources: "訂閱源",
    themes: "版面色",
    addFeed: "新增訂閱",
    feedUrl: "RSS網址",
    add: "新增",
    adding: "確認中…",
    remove: "刪除",
    removeConfirmTitle: "要刪除這個訂閱嗎",
    removeConfirmBody: "此訂閱的新聞將自頭版撤下。",
    cancel: "取消",
    parseErrorTitle: "無法讀取訂閱",
    parseErrorBody: "不是RSS或Atom格式，或沒有回應。",
    feedFailed: "讀取失敗",
    customFeeds: "自訂訂閱",
    defaultSources: "預設訂閱",
    themeLight: "明亮",
    themeDark: "深色",
    themeSepia: "仿古",
    typeface: "字體",
    serifName: "明體",
    sansName: "黑體",
    original: "原文連結",
    share: "分享",
    back: "回頭版",
    gone: "新聞已自版面撤下",
    goneHint: "訂閱已更新，本文不再保留。可前往原文閱讀。",
    nextPage: "下一版",
    prevPage: "上一版",
    pageOf: (n, total) => `${n} / ${total}版`,
    storyIndicator: (n, total) => `${n} / ${total}`,
    loading: "正在排版",
    noBody: "本文尚未見報，請閱讀原文。",
    empty: "今日版面沒有可載的新聞",
    close: "關閉",
  },
};
