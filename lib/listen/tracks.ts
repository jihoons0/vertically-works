export type LyricLine = {
  /** Seconds into the audio at which this line becomes active. */
  time: number;
  text: string;
};

/** A playable episode in the queue. */
export type Track = {
  id: string;
  title: string;
  /** The show's name. */
  artist: string;
  /** Full episode audio (open RSS enclosure). */
  src: string;
  duration: number;
  /** Show artwork (header thumbnail + system media chrome). */
  artwork?: string;
  /** Caption for the poster/header, e.g. "손에 잡히는 경제 · 2026.07.08". */
  credit?: string;
  /** Podcasting 2.0 transcript to fetch lazily into timed `lyrics`. */
  transcriptUrl?: string;
  /** Show-notes lines — the untimed fallback when no transcript exists. */
  plainLyrics?: string[];
  /** Caption explaining why the text isn't synced. */
  plainNote?: string;
  /** Timed transcript lines (empty until fetched). */
  lyrics: LyricLine[];
};
