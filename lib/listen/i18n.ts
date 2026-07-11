import type { MarketCode } from "@/lib/listen/podcasts";

/** UI strings per market — the language selector IS the market selector,
 *  so choosing 日本語 both localizes the chrome and points the charts at
 *  Japan. 대만/홍콩 share Traditional Chinese with their own labels. */

export type Strings = {
  langName: string;
  choosePodcast: string;
  trace: string;
  idleTitle: string;
  browseToday: string;
  loading: string;
  loadError: string;
  todaysPodcasts: string;
  subtitledBand: string;
  subtitleBadge: string;
  chartBand: string;
  episodesBand: string;
  backToShows: string;
  close: string;
  playingPill: string;
  pausedPill: string;
  epIntro: string;
  noTranscript: string;
  findingLyrics: string;
  play: string;
  pause: string;
  prevEp: string;
  nextEp: string;
  back15: string;
  fwd15: string;
  volume: string;
  mute: string;
  unmute: string;
  seek: string;
  theme: string;
  langSelector: string;
  episodeListOf: (show: string) => string;
};

/** Capsule glyphs — the Vertically Do 한/あ/中 control, extended. */
export const LANG_GLYPHS: Record<MarketCode, string> = {
  kr: "한",
  jp: "あ",
  cn: "中",
  tw: "台",
  hk: "港",
};

export const STRINGS: Record<MarketCode, Strings> = {
  kr: {
    langName: "한국어",
    choosePodcast: "팟캐스트 고르기",
    trace: "위치",
    idleTitle: "재생할 팟캐스트를 고르세요",
    browseToday: "오늘의 팟캐스트 고르기",
    loading: "여는 중…",
    loadError: "불러오지 못했어요 · 다시 시도",
    todaysPodcasts: "오늘의 인기 팟캐스트",
    subtitledBand: "자막 지원 팟캐스트",
    subtitleBadge: "자막",
    chartBand: "오늘의 인기 차트",
    episodesBand: "에피소드 · 최신부터",
    backToShows: "팟캐스트 목록",
    close: "닫기",
    playingPill: "재생 중",
    pausedPill: "일시 정지",
    epIntro: "에피소드 소개",
    noTranscript: "이 피드는 자막을 제공하지 않아요",
    findingLyrics: "자막 찾는 중…",
    play: "재생",
    pause: "일시 정지",
    prevEp: "이전 에피소드",
    nextEp: "다음 에피소드",
    back15: "15초 뒤로",
    fwd15: "15초 앞으로",
    volume: "음량",
    mute: "음소거",
    unmute: "음소거 해제",
    seek: "재생 위치",
    theme: "테마 전환",
    langSelector: "언어 · 차트 지역",
    episodeListOf: (show) => `${show} 에피소드`,
  },
  jp: {
    langName: "日本語",
    choosePodcast: "ポッドキャストを選ぶ",
    trace: "現在地",
    idleTitle: "ポッドキャストを選んでください",
    browseToday: "今日のポッドキャストを選ぶ",
    loading: "読み込み中…",
    loadError: "読み込めませんでした · 再試行",
    todaysPodcasts: "今日の人気ポッドキャスト",
    subtitledBand: "字幕つきポッドキャスト",
    subtitleBadge: "字幕",
    chartBand: "今日の人気チャート",
    episodesBand: "エピソード · 新しい順",
    backToShows: "ポッドキャスト一覧",
    close: "閉じる",
    playingPill: "再生中",
    pausedPill: "一時停止",
    epIntro: "エピソード紹介",
    noTranscript: "このフィードは字幕を提供していません",
    findingLyrics: "字幕を探しています…",
    play: "再生",
    pause: "一時停止",
    prevEp: "前のエピソード",
    nextEp: "次のエピソード",
    back15: "15秒戻る",
    fwd15: "15秒進む",
    volume: "音量",
    mute: "ミュート",
    unmute: "ミュート解除",
    seek: "再生位置",
    theme: "テーマ切替",
    langSelector: "言語・チャート地域",
    episodeListOf: (show) => `${show} のエピソード`,
  },
  cn: {
    langName: "中文 · 简",
    choosePodcast: "选择播客",
    trace: "位置",
    idleTitle: "选择一个播客",
    browseToday: "挑选今天的播客",
    loading: "加载中…",
    loadError: "加载失败 · 重试",
    todaysPodcasts: "今日热门播客",
    subtitledBand: "支持字幕的播客",
    subtitleBadge: "字幕",
    chartBand: "今日热门榜单",
    episodesBand: "单集 · 最新在前",
    backToShows: "播客列表",
    close: "关闭",
    playingPill: "播放中",
    pausedPill: "已暂停",
    epIntro: "单集简介",
    noTranscript: "此来源不提供字幕",
    findingLyrics: "正在查找字幕…",
    play: "播放",
    pause: "暂停",
    prevEp: "上一集",
    nextEp: "下一集",
    back15: "后退15秒",
    fwd15: "前进15秒",
    volume: "音量",
    mute: "静音",
    unmute: "取消静音",
    seek: "播放进度",
    theme: "切换主题",
    langSelector: "语言 · 榜单地区",
    episodeListOf: (show) => `${show} 的单集`,
  },
  tw: {
    langName: "中文 · 台",
    choosePodcast: "選擇播客",
    trace: "位置",
    idleTitle: "選擇一個播客",
    browseToday: "挑選今天的播客",
    loading: "載入中…",
    loadError: "載入失敗 · 重試",
    todaysPodcasts: "今日熱門播客",
    subtitledBand: "支援字幕的播客",
    subtitleBadge: "字幕",
    chartBand: "今日熱門榜單",
    episodesBand: "單集 · 最新在前",
    backToShows: "播客列表",
    close: "關閉",
    playingPill: "播放中",
    pausedPill: "已暫停",
    epIntro: "單集簡介",
    noTranscript: "此來源不提供字幕",
    findingLyrics: "正在尋找字幕…",
    play: "播放",
    pause: "暫停",
    prevEp: "上一集",
    nextEp: "下一集",
    back15: "後退15秒",
    fwd15: "前進15秒",
    volume: "音量",
    mute: "靜音",
    unmute: "取消靜音",
    seek: "播放進度",
    theme: "切換主題",
    langSelector: "語言 · 榜單地區",
    episodeListOf: (show) => `${show} 的單集`,
  },
  hk: {
    langName: "中文 · 港",
    choosePodcast: "選擇播客",
    trace: "位置",
    idleTitle: "選擇一個播客",
    browseToday: "挑選今天的播客",
    loading: "載入中…",
    loadError: "載入失敗 · 重試",
    todaysPodcasts: "今日熱門播客",
    subtitledBand: "支援字幕的播客",
    subtitleBadge: "字幕",
    chartBand: "今日熱門榜單",
    episodesBand: "單集 · 最新在前",
    backToShows: "播客列表",
    close: "關閉",
    playingPill: "播放中",
    pausedPill: "已暫停",
    epIntro: "單集簡介",
    noTranscript: "此來源不提供字幕",
    findingLyrics: "正在尋找字幕…",
    play: "播放",
    pause: "暫停",
    prevEp: "上一集",
    nextEp: "下一集",
    back15: "後退15秒",
    fwd15: "前進15秒",
    volume: "音量",
    mute: "靜音",
    unmute: "取消靜音",
    seek: "播放進度",
    theme: "切換主題",
    langSelector: "語言 · 榜單地區",
    episodeListOf: (show) => `${show} 的單集`,
  },
};
