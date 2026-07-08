"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "@/lib/listen/tracks";

const STORAGE_KEY = "vl:state:v1";

type PersistedState = {
  volume: number;
  muted: boolean;
};

export type Player = ReturnType<typeof usePlayer>;

/** The queue is a show's episodes; it may be empty until one is chosen. */
export function usePlayer(tracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Whether the track about to mount into <audio> should start playing.
  const pendingPlayRef = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);

  // Restore persisted volume once, after hydration.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PersistedState>;
        if (typeof saved.volume === "number") setVolumeState(Math.max(0, Math.min(1, saved.volume)));
        if (typeof saved.muted === "boolean") setMuted(saved.muted);
      }
    } catch {
      // Corrupt storage — start fresh.
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const state: PersistedState = { volume, muted };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable (private mode) — playback still works.
    }
  }, [mounted, volume, muted]);

  // Keep the element's volume in sync (also after src swaps).
  useEffect(() => {
    const a = audioRef.current;
    if (a) a.volume = muted ? 0 : volume;
  }, [volume, muted, currentIndex]);

  // When the queue swaps, keep the index in range.
  useEffect(() => {
    if (tracks.length > 0 && currentIndex >= tracks.length) setCurrentIndex(0);
  }, [tracks, currentIndex]);

  const track: Track | undefined =
    tracks.length > 0 ? tracks[Math.min(currentIndex, tracks.length - 1)] : undefined;

  // Autoplay policies: only ever call play() in response to a user gesture
  // or as a continuation of an already-playing session.
  const play = useCallback(() => {
    audioRef.current?.play().catch(() => setIsPlaying(false));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a || !a.currentSrc) return;
    if (a.paused) a.play().catch(() => setIsPlaying(false));
    else a.pause();
  }, []);

  const goTo = useCallback(
    (index: number, autoplay: boolean) => {
      const n = tracks.length;
      if (n === 0) return;
      const clamped = Math.max(0, Math.min(index, n - 1));
      if (clamped === currentIndex) {
        // Same episode: restart it.
        const a = audioRef.current;
        if (a) {
          a.currentTime = 0;
          setCurrentTime(0);
          if (autoplay) a.play().catch(() => setIsPlaying(false));
        }
        return;
      }
      pendingPlayRef.current = autoplay;
      setCurrentIndex(clamped);
      setCurrentTime(0);
      setDuration(0);
    },
    [tracks.length, currentIndex]
  );

  /** Pause and jump to the first episode — used when the queue swaps. */
  const resetToStart = useCallback(() => {
    audioRef.current?.pause();
    pendingPlayRef.current = false;
    setCurrentIndex(0);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  /** Jump to an index and play — for committing a pick as the queue swaps
   *  in the same render (the src-keyed effect below fires either way). */
  const startAt = useCallback((index: number) => {
    pendingPlayRef.current = true;
    setCurrentIndex(Math.max(0, index));
    setCurrentTime(0);
    setDuration(0);
  }, []);

  // After the <audio> src swaps (index change OR queue swap), resume if
  // a play is pending.
  const src = track?.src;
  useEffect(() => {
    if (!src || !pendingPlayRef.current) return;
    pendingPlayRef.current = false;
    audioRef.current?.play().catch(() => setIsPlaying(false));
  }, [src]);

  const next = useCallback(() => {
    if (currentIndex >= tracks.length - 1) return;
    goTo(currentIndex + 1, isPlaying);
  }, [goTo, currentIndex, tracks.length, isPlaying]);

  const prev = useCallback(() => {
    const a = audioRef.current;
    // Convention: early in an episode go to the previous one; later, restart.
    if (a && a.currentTime > 3) {
      a.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    goTo(currentIndex - 1, isPlaying);
  }, [goTo, currentIndex, isPlaying]);

  const select = useCallback(
    (index: number) => {
      if (index === currentIndex && audioRef.current?.currentSrc) togglePlay();
      else goTo(index, true);
    },
    [currentIndex, goTo, togglePlay]
  );

  const seek = useCallback(
    (time: number) => {
      const a = audioRef.current;
      if (!a || !track) return;
      const max = duration || track.duration || a.duration || 0;
      const t = Math.max(0, max > 0 ? Math.min(time, max) : time);
      a.currentTime = t;
      setCurrentTime(t);
    },
    [duration, track]
  );

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
    setMuted(false);
  }, []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  // Props for the single <audio> element — events keep React state truthful.
  const audioProps = {
    ref: audioRef,
    src: track?.src,
    preload: "metadata" as const,
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
    onTimeUpdate: () => setCurrentTime(audioRef.current?.currentTime ?? 0),
    onLoadedMetadata: () => setDuration(audioRef.current?.duration ?? 0),
    // Episodes are a finite list — advance, but don't wrap at the end.
    onEnded: () => {
      if (currentIndex < tracks.length - 1) goTo(currentIndex + 1, true);
    },
  };

  // Derived: the last transcript line whose time has passed (small lookahead
  // so lines light up right on the phrase).
  const lyrics = track?.lyrics ?? [];
  let activeLyricIndex = -1;
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].time <= currentTime + 0.12) activeLyricIndex = i;
    else break;
  }

  return {
    tracks,
    track,
    currentIndex,
    isPlaying,
    currentTime,
    duration: duration || (track?.duration ?? 0),
    activeLyricIndex,
    volume,
    muted,
    mounted,
    audioProps,
    togglePlay,
    play,
    pause,
    next,
    prev,
    select,
    seek,
    setVolume,
    toggleMute,
    resetToStart,
    startAt,
  };
}

export function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}
