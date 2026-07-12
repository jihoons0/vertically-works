"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useState } from "react";

export type Locale = "ko" | "ja" | "zh";

export const LOCALES: { id: Locale; glyph: string; label: string }[] = [
  { id: "ko", glyph: "한", label: "한국어" },
  { id: "ja", glyph: "あ", label: "日本語" },
  { id: "zh", glyph: "中", label: "中文" },
];

export interface Strings {
  appTitle: string;
  filters: { active: string; done: string; all: string };
  clearDone: string;
  loading: string;
  emptyActive: string;
  emptyDone: string;
  composerPlaceholder: string;
  toast: {
    added: string;
    completed: string;
    uncompleted: string;
    deleted: string;
    clearedDone: string;
    boardDeleted: string;
    undo: string;
  };
  a11y: {
    controls: string;
    board: string;
    progress: string;
    view: string;
    dark: string;
    light: string;
    help: string;
    star: string;
    unstar: string;
    complete: string;
    uncomplete: string;
    remove: string;
    edit: string;
    addStar: string;
    newTask: string;
    taskContent: string;
    addTask: string;
    language: string;
  };
  help: {
    title: string;
    close: string;
    rows: { keys: string; label: string }[];
  };
  boards: {
    starters: string[];
    defaultTitle: string;
    newBoard: string;
    overview: string;
    back: string;
    editBoard: string;
    rename: string;
    deleteBoard: string;
  };
}

export const STRINGS: Record<Locale, Strings> = {
  ko: {
    appTitle: "세로 할 일",
    filters: { active: "진행", done: "완료", all: "전체" },
    clearDone: "완료 비우기",
    loading: "불러오는 중…",
    emptyActive: "오른쪽에서 새 할 일을 쓰세요",
    emptyDone: "완료한 일이 아직 없어요",
    composerPlaceholder: "할 일…",
    toast: {
      added: "추가했어요",
      completed: "완료했어요",
      uncompleted: "다시 진행으로",
      deleted: "지웠어요",
      clearedDone: "완료를 비웠어요",
      boardDeleted: "보드를 지웠어요",
      undo: "되돌리기",
    },
    a11y: {
      controls: "컨트롤",
      board: "할 일 보드",
      progress: "완료 진행도",
      view: "보기",
      dark: "다크 모드",
      light: "라이트 모드",
      help: "사용법",
      star: "중요로 표시",
      unstar: "중요 해제",
      complete: "완료로 표시",
      uncomplete: "완료 취소",
      remove: "삭제",
      edit: "내용 편집",
      addStar: "중요로 추가",
      newTask: "새 할 일 작성",
      taskContent: "할 일 내용",
      addTask: "할 일 추가",
      language: "언어",
    },
    help: {
      title: "사용법",
      close: "닫기",
      rows: [
        { keys: "위·아래로 당기기", label: "삭제 · 휴지통" },
        { keys: "옆으로 당기기", label: "순서 옮기기" },
        { keys: "동그라미 누르기", label: "완료 토글" },
        { keys: "제목 누르기", label: "내용 편집" },
        { keys: "Enter", label: "새 할 일 추가" },
        { keys: "Space", label: "완료 토글" },
        { keys: "← →", label: "순서 이동" },
        { keys: "E", label: "편집" },
        { keys: "S", label: "중요 표시" },
        { keys: "Delete", label: "삭제" },
        { keys: "?", label: "이 도움말" },
      ],
    },
    boards: {
      starters: ["오늘", "장보기", "아이디어", "메모"],
      defaultTitle: "메모",
      newBoard: "새 보드",
      overview: "보드",
      back: "축소",
      editBoard: "이름 편집",
      rename: "보드 이름",
      deleteBoard: "보드 삭제",
    },
  },
  ja: {
    appTitle: "縦のやること",
    filters: { active: "未完", done: "完了", all: "全部" },
    clearDone: "完了を消す",
    loading: "読み込み中…",
    emptyActive: "右から新しいタスクを",
    emptyDone: "完了したものはまだありません",
    composerPlaceholder: "タスク…",
    toast: {
      added: "追加しました",
      completed: "完了しました",
      uncompleted: "未完に戻す",
      deleted: "削除しました",
      clearedDone: "完了を消しました",
      boardDeleted: "ボードを削除しました",
      undo: "元に戻す",
    },
    a11y: {
      controls: "コントロール",
      board: "タスクボード",
      progress: "完了の進み具合",
      view: "表示",
      dark: "ダークモード",
      light: "ライトモード",
      help: "使い方",
      star: "重要にする",
      unstar: "重要を解除",
      complete: "完了にする",
      uncomplete: "完了を取り消す",
      remove: "削除",
      edit: "内容を編集",
      addStar: "重要として追加",
      newTask: "新しいタスクを作成",
      taskContent: "タスクの内容",
      addTask: "タスクを追加",
      language: "言語",
    },
    help: {
      title: "使い方",
      close: "閉じる",
      rows: [
        { keys: "上下に引く", label: "削除・ゴミ箱" },
        { keys: "横に引く", label: "並べ替え" },
        { keys: "丸を押す", label: "完了の切替" },
        { keys: "題を押す", label: "内容を編集" },
        { keys: "Enter", label: "タスク追加" },
        { keys: "Space", label: "完了の切替" },
        { keys: "← →", label: "順序を移動" },
        { keys: "E", label: "編集" },
        { keys: "S", label: "重要にする" },
        { keys: "Delete", label: "削除" },
        { keys: "?", label: "このヘルプ" },
      ],
    },
    boards: {
      starters: ["今日", "買い物", "アイデア", "メモ"],
      defaultTitle: "メモ",
      newBoard: "新しいボード",
      overview: "ボード",
      back: "縮小",
      editBoard: "名前を編集",
      rename: "ボード名",
      deleteBoard: "ボードを削除",
    },
  },
  zh: {
    appTitle: "直書待辦",
    filters: { active: "進行", done: "完成", all: "全部" },
    clearDone: "清除完成",
    loading: "載入中…",
    emptyActive: "從右側新增待辦",
    emptyDone: "尚無完成項目",
    composerPlaceholder: "待辦…",
    toast: {
      added: "已新增",
      completed: "已完成",
      uncompleted: "恢復進行",
      deleted: "已刪除",
      clearedDone: "已清除完成",
      boardDeleted: "已刪除看板",
      undo: "復原",
    },
    a11y: {
      controls: "控制",
      board: "待辦看板",
      progress: "完成進度",
      view: "檢視",
      dark: "深色模式",
      light: "淺色模式",
      help: "使用說明",
      star: "標為重要",
      unstar: "取消重要",
      complete: "標為完成",
      uncomplete: "取消完成",
      remove: "刪除",
      edit: "編輯內容",
      addStar: "加為重要",
      newTask: "撰寫新待辦",
      taskContent: "待辦內容",
      addTask: "新增待辦",
      language: "語言",
    },
    help: {
      title: "使用說明",
      close: "關閉",
      rows: [
        { keys: "上下拖曳", label: "刪除・垃圾桶" },
        { keys: "左右拖曳", label: "調整順序" },
        { keys: "點圓圈", label: "切換完成" },
        { keys: "點標題", label: "編輯內容" },
        { keys: "Enter", label: "新增待辦" },
        { keys: "Space", label: "切換完成" },
        { keys: "← →", label: "移動順序" },
        { keys: "E", label: "編輯" },
        { keys: "S", label: "標為重要" },
        { keys: "Delete", label: "刪除" },
        { keys: "?", label: "本說明" },
      ],
    },
    boards: {
      starters: ["今天", "購物", "點子", "備忘"],
      defaultTitle: "備忘",
      newBoard: "新看板",
      overview: "看板",
      back: "縮小",
      editBoard: "編輯名稱",
      rename: "看板名稱",
      deleteBoard: "刪除看板",
    },
  },
};

export const SEED_TASKS: Record<
  Locale,
  { text: string; note?: string; starred?: boolean; done?: boolean }[]
> = {
  ko: [
    { text: "세로로 읽고 쓰기", starred: true },
    { text: "동그라미 눌러 완료" },
    { text: "위·아래로 당겨 삭제" },
    { text: "옆으로 당겨 순서 바꾸기" },
    { text: "죽간에 글을 새기다", done: true },
  ],
  ja: [
    { text: "縦に読み書き", starred: true },
    { text: "丸を押して完了" },
    { text: "上下に引いて削除" },
    { text: "横に引いて並べ替え" },
    { text: "木簡に文字を刻む", done: true },
  ],
  zh: [
    { text: "直書閱讀", starred: true },
    { text: "點圓圈完成" },
    { text: "上下拖曳刪除" },
    { text: "左右拖曳排序" },
    { text: "竹簡刻字", done: true },
  ],
};

const STORAGE_KEY = "vd:locale";

type LocaleCtx = { locale: Locale; setLocale: (l: Locale) => void; t: Strings };
const Ctx = createContext<LocaleCtx>({ locale: "ko", setLocale: () => {}, t: STRINGS.ko });

export function useLocale() {
  return useContext(Ctx);
}

export function detectInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && STRINGS[stored]) return stored;
    const lang = navigator.language.slice(0, 2).toLowerCase();
    if (lang === "ja") return "ja";
    if (lang === "zh") return "zh";
  } catch {
    /* ignore */
  }
  return "ko";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Start at the SSR default so hydration matches; adopt the stored/detected
  // locale after mount.
  const [locale, setLocaleState] = useState<Locale>("ko");

  useEffect(() => {
    setLocaleState(detectInitialLocale());
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  return createElement(Ctx.Provider, { value: { locale, setLocale, t: STRINGS[locale] } }, children);
}
