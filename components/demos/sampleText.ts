"use client";

// Per-demo sample text for the component doc demos, in the three writing systems
// the site supports. Demos read the current language from the nav-bar selector
// (usePreviewLang) via usePicked() below, so switching 한 / あ / 中 in the nav
// re-languages every live demo.
//
// Chinese follows the site's existing convention: Traditional (直書 for vertical
// writing), matching lib/notes/i18n.ts and lib/listen/i18n.ts. Japanese uses 縦書き.
// The recurring passage is the short history of vertical writing shared across
// several demos; each language says the same thing idiomatically, not word-for-word.

import { usePreviewLang } from "@/components/providers/PreviewLangProvider";
import type { Lang } from "@/components/home/bento-shared";

/** Read the entry for the currently-selected demo language. One call per demo. */
export function usePicked<T>(map: Record<Lang, T>): T {
  const { lang } = usePreviewLang();
  return map[lang];
}

// ── button ────────────────────────────────────────────────────────────────
export const buttonText: Record<Lang, string[]> = {
  ko: ["다음 장", "이전 장", "설정", "비활성"],
  ja: ["次の章", "前の章", "設定", "無効"],
  zh: ["下一章", "上一章", "設定", "停用"],
};

// ── tooltip ───────────────────────────────────────────────────────────────
export const tooltipText: Record<Lang, { verses: { ref: string; text: string }[]; num: string }> = {
  ko: {
    num: "번",
    verses: [
      { ref: "1", text: "글씨를 세로로 쓰는 것을 세로쓰기라 한다" },
      { ref: "2", text: "전통적으로 한국어와 중국어가 세로로 쓰였다" },
      { ref: "3", text: "죽간을 쓰던 때부터 세로로 써 왔다" },
    ],
  },
  ja: {
    num: "番",
    verses: [
      { ref: "1", text: "文字を縦に書くことを縦書きという" },
      { ref: "2", text: "伝統的に韓国語と中国語は縦に書かれた" },
      { ref: "3", text: "竹簡の時代から縦に書かれてきた" },
    ],
  },
  zh: {
    num: "號",
    verses: [
      { ref: "1", text: "將文字縱向書寫稱為直書" },
      { ref: "2", text: "韓文與中文傳統上皆為直書" },
      { ref: "3", text: "自竹簡時代起便縱向書寫" },
    ],
  },
};

// ── toggle ────────────────────────────────────────────────────────────────
export const toggleText: Record<Lang, { dark: string; serif: string; preview: [string, string] }> = {
  ko: { dark: "야간 모드", serif: "명조체", preview: ["글씨를 세로로 쓰는 것", "세로쓰기라 한다"] },
  ja: { dark: "夜間モード", serif: "明朝体", preview: ["文字を縦に書くことを", "縦書きという"] },
  zh: { dark: "夜間模式", serif: "明體", preview: ["將文字縱向書寫", "稱為直書"] },
};

// ── sheet ─────────────────────────────────────────────────────────────────
export const sheetText: Record<Lang, { open: string; title: string; bookmarks: { ref: string; text: string }[] }> = {
  ko: {
    open: "열기",
    title: "책갈피",
    bookmarks: [
      { ref: "세로 1", text: "글씨를 세로로 쓰는 것을 세로쓰기라 한다" },
      { ref: "역사 2", text: "죽간을 쓰던 때부터 세로로 써 왔다" },
      { ref: "역사 3", text: "옛 문헌은 세로쓰기로 되어 있다" },
    ],
  },
  ja: {
    open: "開く",
    title: "しおり",
    bookmarks: [
      { ref: "縦書 1", text: "文字を縦に書くことを縦書きという" },
      { ref: "歴史 2", text: "竹簡の時代から縦に書かれてきた" },
      { ref: "歴史 3", text: "古い文献は縦書きで記されている" },
    ],
  },
  zh: {
    open: "開啟",
    title: "書籤",
    bookmarks: [
      { ref: "直書 1", text: "將文字縱向書寫稱為直書" },
      { ref: "歷史 2", text: "自竹簡時代起便縱向書寫" },
      { ref: "歷史 3", text: "古代文獻皆以直書寫成" },
    ],
  },
};

// ── verse ─────────────────────────────────────────────────────────────────
export const verseText: Record<Lang, { columns: { ref: string; text: string }[][]; highlight: string; cancel: string }> = {
  ko: {
    highlight: "하이라이트",
    cancel: "취소",
    columns: [
      [
        { ref: "1", text: "글씨를 세로로 쓰는 것을 세로쓰기라 한다" },
        { ref: "2", text: "전통적으로 한국어·중국어·일본어가 세로로 쓰였다" },
      ],
      [
        { ref: "3", text: "우종서의 가장 오래된 기록은 중국에서 발견되었다" },
        { ref: "4", text: "죽간을 쓰던 때부터 한자 문화권은 세로로 썼다" },
      ],
      [
        { ref: "5", text: "그에 따라 옛 문헌은 전부 세로쓰기로 되어 있다" },
        { ref: "6", text: "가로로 쓰면 두루마리를 말고 펴기가 불편했다" },
      ],
    ],
  },
  ja: {
    highlight: "ハイライト",
    cancel: "キャンセル",
    columns: [
      [
        { ref: "1", text: "文字を縦に書くことを縦書きという" },
        { ref: "2", text: "韓国語・中国語・日本語は伝統的に縦書きだった" },
      ],
      [
        { ref: "3", text: "右起こし縦書きの最古の記録は中国で見つかった" },
        { ref: "4", text: "竹簡の時代から漢字文化圏は縦に書いた" },
      ],
      [
        { ref: "5", text: "そのため古い文献はすべて縦書きである" },
        { ref: "6", text: "横書きでは巻物の巻き解きが不便だった" },
      ],
    ],
  },
  zh: {
    highlight: "標記",
    cancel: "取消",
    columns: [
      [
        { ref: "1", text: "將文字縱向書寫稱為直書" },
        { ref: "2", text: "韓文・中文・日文傳統上皆為直書" },
      ],
      [
        { ref: "3", text: "右起直書最早的紀錄發現於中國" },
        { ref: "4", text: "自竹簡時代起漢字文化圈便縱向書寫" },
      ],
      [
        { ref: "5", text: "因此古代文獻皆以直書寫成" },
        { ref: "6", text: "若為橫書則卷軸捲展不便" },
      ],
    ],
  },
};

// ── popover menu ──────────────────────────────────────────────────────────
export const popoverText: Record<Lang, { colors: string[]; actions: string[]; done: string; open: string; close: string; toolbar: string }> = {
  ko: { colors: ["노란색", "초록색", "파란색", "분홍색"], actions: ["저장", "노트", "복사"], done: "완료", open: "메뉴 열기", close: "메뉴 닫기", toolbar: "구절 동작" },
  ja: { colors: ["黄色", "緑", "青", "ピンク"], actions: ["保存", "ノート", "コピー"], done: "完了", open: "メニューを開く", close: "メニューを閉じる", toolbar: "節の操作" },
  zh: { colors: ["黃色", "綠色", "藍色", "粉紅"], actions: ["儲存", "筆記", "複製"], done: "完成", open: "開啟選單", close: "關閉選單", toolbar: "節段操作" },
};

// ── marker ────────────────────────────────────────────────────────────────
type MarkerType = "status" | "separator" | "system" | "date";
export const markerText: Record<Lang, { markers: { type: MarkerType; label: string; sub?: string; icon?: string }[]; verses: string[]; ch1Done: string }> = {
  ko: {
    ch1Done: "1장 완료",
    verses: [
      "글씨를 세로로 쓰는 것을 세로쓰기라 한다",
      "전통적으로 한국어와 중국어가 세로로 쓰였다",
      "죽간을 쓰던 때부터 세로로 써 왔고",
      "옛 문헌은 세로쓰기로 되어 있다",
    ],
    markers: [
      { type: "status", label: "읽기 시작", sub: "오전 9:23", icon: "▶" },
      { type: "system", label: "1장 완료", icon: "✓" },
      { type: "separator", label: "쉬는 중", sub: "12분" },
      { type: "status", label: "다시 읽기", sub: "오전 9:45", icon: "↺" },
      { type: "system", label: "2장 완료", icon: "✓" },
      { type: "date", label: "오늘" },
    ],
  },
  ja: {
    ch1Done: "1章完了",
    verses: [
      "文字を縦に書くことを縦書きという",
      "伝統的に韓国語と中国語は縦に書かれた",
      "竹簡の時代から縦に書いてきて",
      "古い文献は縦書きで記されている",
    ],
    markers: [
      { type: "status", label: "読み始め", sub: "午前9:23", icon: "▶" },
      { type: "system", label: "1章完了", icon: "✓" },
      { type: "separator", label: "休憩中", sub: "12分" },
      { type: "status", label: "再読", sub: "午前9:45", icon: "↺" },
      { type: "system", label: "2章完了", icon: "✓" },
      { type: "date", label: "今日" },
    ],
  },
  zh: {
    ch1Done: "第1章完成",
    verses: [
      "將文字縱向書寫稱為直書",
      "韓文與中文傳統上皆為直書",
      "自竹簡時代起便縱向書寫",
      "古代文獻皆以直書寫成",
    ],
    markers: [
      { type: "status", label: "開始閱讀", sub: "上午9:23", icon: "▶" },
      { type: "system", label: "第1章完成", icon: "✓" },
      { type: "separator", label: "休息中", sub: "12分鐘" },
      { type: "status", label: "重新閱讀", sub: "上午9:45", icon: "↺" },
      { type: "system", label: "第2章完成", icon: "✓" },
      { type: "date", label: "今天" },
    ],
  },
};

// ── message ───────────────────────────────────────────────────────────────
export const messageText: Record<Lang, { messages: { from: "them" | "me"; text: string; time: string }[]; me: string; friend: string; input: string; send: string }> = {
  ko: {
    me: "나", friend: "친", input: "메시지 입력…", send: "전송",
    messages: [
      { from: "them", text: "세로쓰기의 유래가 흥미로웠어요", time: "오전 9:14" },
      { from: "me", text: "어떤 부분이요?", time: "오전 9:15" },
      { from: "them", text: "죽간에서 세로쓰기가 시작됐대요", time: "오전 9:16" },
      { from: "me", text: "그 부분 저도 좋아해요", time: "오전 9:16" },
    ],
  },
  ja: {
    me: "私", friend: "友", input: "メッセージを入力…", send: "送信",
    messages: [
      { from: "them", text: "縦書きの由来が面白かったです", time: "午前9:14" },
      { from: "me", text: "どの辺りが？", time: "午前9:15" },
      { from: "them", text: "竹簡から縦書きが始まったそうです", time: "午前9:16" },
      { from: "me", text: "そこ、私も好きです", time: "午前9:16" },
    ],
  },
  zh: {
    me: "我", friend: "友", input: "輸入訊息…", send: "傳送",
    messages: [
      { from: "them", text: "直書的由來很有意思", time: "上午9:14" },
      { from: "me", text: "哪個部分呢？", time: "上午9:15" },
      { from: "them", text: "據說直書始於竹簡", time: "上午9:16" },
      { from: "me", text: "那部分我也喜歡", time: "上午9:16" },
    ],
  },
};

// ── icon button ─────────────────────────────────────────────────────────── (next, prev, save, search, settings)
export const iconButtonText: Record<Lang, string[]> = {
  ko: ["다음", "이전", "저장", "검색", "설정"],
  ja: ["次", "前", "保存", "検索", "設定"],
  zh: ["下一", "上一", "儲存", "搜尋", "設定"],
};

// ── text field ────────────────────────────────────────────────────────────
export const textFieldText: Record<Lang, { label: string; placeholder: string }> = {
  ko: { label: "검색어", placeholder: "구절을 입력하세요…" },
  ja: { label: "検索語", placeholder: "一節を入力してください…" },
  zh: { label: "搜尋詞", placeholder: "請輸入一段文字…" },
};

// ── search ────────────────────────────────────────────────────────────────
export const searchText: Record<Lang, { corpus: { ref: string; text: string }[]; placeholder: string; hint: string; noResults: string; clear: string }> = {
  ko: {
    placeholder: "검색…", noResults: "결과 없음", clear: "지우기",
    hint: "세로 · 죽간 · 두루마리 · 우종서 를 검색해 보세요",
    corpus: [
      { ref: "세로쓰기 1", text: "서자방향 가운데 글씨를 세로로 쓰는 것" },
      { ref: "세로쓰기 2", text: "한국어·중국어·일본어가 전통적으로 세로로 쓰였다" },
      { ref: "역사 1", text: "우종서의 가장 오래된 기록은 중국에서 나왔다" },
      { ref: "역사 2", text: "죽간을 쓰던 때부터 한자 문화권은 세로로 썼다" },
      { ref: "역사 3", text: "옛 문헌은 전부 세로쓰기로 되어 있다" },
      { ref: "역사 4", text: "오른쪽부터 쓰는 것은 두루마리를 펴던 관행이다" },
    ],
  },
  ja: {
    placeholder: "検索…", noResults: "結果なし", clear: "消去",
    hint: "「縦書き・竹簡・巻物・右起こし」で検索してみてください",
    corpus: [
      { ref: "縦書き 1", text: "書字方向のうち文字を縦に書くこと" },
      { ref: "縦書き 2", text: "韓国語・中国語・日本語は伝統的に縦書きだった" },
      { ref: "歴史 1", text: "右起こし縦書きの最古の記録は中国で見つかった" },
      { ref: "歴史 2", text: "竹簡の時代から漢字文化圏は縦に書いた" },
      { ref: "歴史 3", text: "古い文献はすべて縦書きである" },
      { ref: "歴史 4", text: "右から書くのは巻物を広げる慣習による" },
    ],
  },
  zh: {
    placeholder: "搜尋…", noResults: "無結果", clear: "清除",
    hint: "試著搜尋「直書 · 竹簡 · 卷軸 · 右起」",
    corpus: [
      { ref: "直書 1", text: "書寫方向中將文字縱向書寫者" },
      { ref: "直書 2", text: "韓文・中文・日文傳統上皆為直書" },
      { ref: "歷史 1", text: "右起直書最早的紀錄出自中國" },
      { ref: "歷史 2", text: "自竹簡時代起漢字文化圈便縱向書寫" },
      { ref: "歷史 3", text: "古代文獻皆以直書寫成" },
      { ref: "歷史 4", text: "由右而書源自展開卷軸的慣例" },
    ],
  },
};

// ── slider ────────────────────────────────────────────────────────────────
export const sliderText: Record<Lang, { glyph: string; line: string; preview: string }> = {
  ko: { glyph: "글자", line: "행간", preview: "글씨를 세로로 쓰는 것을 세로쓰기라 한다" },
  ja: { glyph: "文字", line: "行間", preview: "文字を縦に書くことを縦書きという" },
  zh: { glyph: "文字", line: "行距", preview: "將文字縱向書寫稱為直書" },
};

// ── tabs ──────────────────────────────────────────────────────────────────  (order: read, search, history)
export const tabsText: Record<Lang, { label: string; content: string }[]> = {
  ko: [
    { label: "읽기", content: "글씨를 세로로 쓰는 것을 세로쓰기라 한다" },
    { label: "검색", content: "검색 결과가 여기에 표시됩니다" },
    { label: "기록", content: "최근 읽은 문서가 여기에 표시됩니다" },
  ],
  ja: [
    { label: "読む", content: "文字を縦に書くことを縦書きという" },
    { label: "検索", content: "検索結果がここに表示されます" },
    { label: "履歴", content: "最近読んだ文書がここに表示されます" },
  ],
  zh: [
    { label: "閱讀", content: "將文字縱向書寫稱為直書" },
    { label: "搜尋", content: "搜尋結果將顯示於此" },
    { label: "紀錄", content: "最近閱讀的文件將顯示於此" },
  ],
};

// ── chapter navigation ────────────────────────────────────────────────────
export const chapterText: Record<Lang, { chapters: string[]; next: string; prev: string }> = {
  ko: { chapters: ["세로쓰기 1장", "세로쓰기 2장", "세로쓰기 3장"], next: "다음 ‹", prev: "› 이전" },
  ja: { chapters: ["縦書き 第1章", "縦書き 第2章", "縦書き 第3章"], next: "次 ‹", prev: "› 前" },
  zh: { chapters: ["直書 第1章", "直書 第2章", "直書 第3章"], next: "下一 ‹", prev: "› 上一" },
};

// ── hyperlink treatment ───────────────────────────────────────────────────
export const linkText: Record<Lang, { before: string; link1: string; middle: string; link2: string; after: string; emphasis: string; underline: string }> = {
  ko: { before: "글씨를 세로로 쓰는 것을 ", link1: "세로쓰기", middle: "라 한다. 우종서의 기록은 ", link2: "죽간", after: "에서 처음 나타났다.", emphasis: "방점 ·", underline: "밑줄" },
  ja: { before: "文字を縦に書くことを", link1: "縦書き", middle: "という。右起こしの記録は", link2: "竹簡", after: "に初めて現れた。", emphasis: "圏点 ·", underline: "下線" },
  zh: { before: "將文字縱向書寫稱為", link1: "直書", middle: "。右起直書的紀錄最早見於", link2: "竹簡", after: "。", emphasis: "旁點 ·", underline: "底線" },
};

// ── dialog ────────────────────────────────────────────────────────────────
export const dialogText: Record<Lang, { open: string; title: string; body: string; cancel: string; del: string }> = {
  ko: { open: "열기", title: "정말 삭제할까요?", body: "이 렌즈를 삭제하면 되돌릴 수 없어요.", cancel: "취소", del: "삭제" },
  ja: { open: "開く", title: "本当に削除しますか？", body: "このレンズを削除すると元に戻せません。", cancel: "キャンセル", del: "削除" },
  zh: { open: "開啟", title: "確定要刪除嗎？", body: "刪除此鏡頭後將無法復原。", cancel: "取消", del: "刪除" },
};

// ── toast ─────────────────────────────────────────────────────────────────
export const toastText: Record<Lang, { messages: string[]; button: string }> = {
  ko: { messages: ["문단을 저장했어요", "노트에 추가했어요", "복사했어요", "형광펜을 지웠어요"], button: "동작 실행 ↓" },
  ja: { messages: ["段落を保存しました", "ノートに追加しました", "コピーしました", "ハイライトを消しました"], button: "動作を実行 ↓" },
  zh: { messages: ["已儲存段落", "已加入筆記", "已複製", "已清除標記"], button: "執行動作 ↓" },
};

// ── skeleton ──────────────────────────────────────────────────────────────
export const skeletonText: Record<Lang, { columns: string[]; reload: string; showReal: string; showSkel: string }> = {
  ko: {
    reload: "다시 불러오기 ↻", showReal: "실제 내용 보기", showSkel: "스켈레톤 보기",
    columns: [
      "글씨를 세로로 쓰는 것을 세로쓰기라 한다",
      "전통적으로 한국어와 중국어가 세로로 쓰였고",
      "죽간을 쓰던 때부터 이어진 방식이며",
      "옛 문헌은 전부 세로쓰기로 되어 있다",
    ],
  },
  ja: {
    reload: "再読み込み ↻", showReal: "実際の内容を表示", showSkel: "スケルトンを表示",
    columns: [
      "文字を縦に書くことを縦書きという",
      "伝統的に韓国語と中国語は縦書きで",
      "竹簡の時代から続く方式であり",
      "古い文献はすべて縦書きである",
    ],
  },
  zh: {
    reload: "重新載入 ↻", showReal: "顯示實際內容", showSkel: "顯示骨架",
    columns: [
      "將文字縱向書寫稱為直書",
      "韓文與中文傳統上皆為直書",
      "是自竹簡時代延續而來的方式",
      "古代文獻皆以直書寫成",
    ],
  },
};

// ── vertical list cell ────────────────────────────────────────────────────
type Cell = { title: string; sub: string; accessory: "chevron" | "value"; value?: string };
export const listCellText: Record<Lang, { cells: Cell[]; aria: string }> = {
  ko: {
    aria: "목차",
    cells: [
      { title: "세로쓰기", sub: "개요", accessory: "chevron" },
      { title: "우종서", sub: "역사", accessory: "chevron" },
      { title: "죽간", sub: "기원", accessory: "chevron" },
      { title: "두루마리", sub: "관행", accessory: "value", value: "읽는 중" },
      { title: "문자 체계", sub: "분류", accessory: "chevron" },
    ],
  },
  ja: {
    aria: "目次",
    cells: [
      { title: "縦書き", sub: "概要", accessory: "chevron" },
      { title: "右起こし", sub: "歴史", accessory: "chevron" },
      { title: "竹簡", sub: "起源", accessory: "chevron" },
      { title: "巻物", sub: "慣習", accessory: "value", value: "読書中" },
      { title: "文字体系", sub: "分類", accessory: "chevron" },
    ],
  },
  zh: {
    aria: "目次",
    cells: [
      { title: "直書", sub: "概述", accessory: "chevron" },
      { title: "右起", sub: "歷史", accessory: "chevron" },
      { title: "竹簡", sub: "起源", accessory: "chevron" },
      { title: "卷軸", sub: "慣例", accessory: "value", value: "閱讀中" },
      { title: "文字系統", sub: "分類", accessory: "chevron" },
    ],
  },
};

// ── tiered page ───────────────────────────────────────────────────────────
// NUMBERED: the vertical-writing passage, one verse per label. PLAIN: a plain
// spread of columns — each language's own canonical vertical poem (Kim Sowol /
// Ono no Komachi / Li Bai), the natural content for a numberless vertical page.
export const tieredText: Record<Lang, { numbered: { label?: string; text: string }[]; plain: { text: string }[] }> = {
  ko: {
    numbered: [
      { label: "1", text: "글씨를 세로로 쓰는" },
      { text: "것을 세로쓰기라 한다" },
      { label: "2", text: "한국어와 중국어와" },
      { text: "일본어가 세로로" },
      { text: "쓰였다" },
      { label: "3", text: "우종서의 가장 오래된" },
      { text: "기록은 중국에서" },
      { text: "발견되었다" },
      { label: "4", text: "죽간을 쓰던 때부터" },
      { text: "세로로 썼다" },
    ],
    plain: [
      { text: "산에는 꽃 피네" },
      { text: "꽃이 피네" },
      { text: "갈 봄 여름 없이" },
      { text: "꽃이 피네" },
      { text: "산에서 우는 작은" },
      { text: "새여 꽃이 좋아" },
      { text: "산에서 사노라네" },
      { text: "산에는 꽃 지네" },
    ],
  },
  ja: {
    numbered: [
      { label: "1", text: "文字を縦に書く" },
      { text: "ことを縦書きという" },
      { label: "2", text: "韓国語と中国語と" },
      { text: "日本語が縦に" },
      { text: "書かれた" },
      { label: "3", text: "右起こしの最も古い" },
      { text: "記録は中国で" },
      { text: "見つかった" },
      { label: "4", text: "竹簡の時代から" },
      { text: "縦に書いてきた" },
    ],
    plain: [
      { text: "花の色は" },
      { text: "うつりにけりな" },
      { text: "いたづらに" },
      { text: "わが身世にふる" },
      { text: "ながめせしまに" },
    ],
  },
  zh: {
    numbered: [
      { label: "1", text: "將文字縱向" },
      { text: "書寫稱為直書" },
      { label: "2", text: "韓文中文" },
      { text: "與日文皆" },
      { text: "縱向書寫" },
      { label: "3", text: "右起直書最早" },
      { text: "的紀錄發現" },
      { text: "於中國" },
      { label: "4", text: "自竹簡時代起" },
      { text: "便縱向書寫" },
    ],
    plain: [
      { text: "床前明月光" },
      { text: "疑是地上霜" },
      { text: "舉頭望明月" },
      { text: "低頭思故鄉" },
    ],
  },
};
