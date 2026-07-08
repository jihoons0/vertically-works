"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "@/lib/listen/tracks";

const STORAGE_KEY = "vl:state:v1";

type PersistedState = {
  currentIndex: number;
  karaokeOn: boolean;
  volume: number;
  muted: boolean;
};

export type Player = ReturnType<typeof usePlayer>;

/** `tracks` may swap wholesale (library ↔ charts); `persist` gates writing
 *  to localStorage so ephemeral chart sessions don't clobber library state. */
export function usePlayer(tracks: Track[], { persist = true }: { persist?: boolean } = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Whether the track that is about to mount into <audio> should start playing.
  const pendingPlayRef = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [karaokeOn, setKaraokeOn] = useState(true);
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);

  // Restore persisted state once, after hydration.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PersistedState>;
        if (
          typeof saved.currentIndex === "number" &&
          saved.currentIndex >= 0 &&
          saved.currentIndex < tracks.length
        ) {
          setCurrentIndex(saved.currentIndex);
        }
        if (typeof saved.karaokeOn === "boolean") setKaraokeOn(saved.karaokeOn);
        if (typeof saved.volume === "number") setVolumeState(Math.max(0, Math.min(1, saved.volume)));
        if (typeof saved.muted === "boolean") setMuted(saved.muted);
      }
    } catch {
      // Corrupt storage — start fresh.
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !persist) return;
    const state: PersistedState = { currentIndex, karaokeOn, volume, muted };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable (private mode) — playback still works.
    }
  }, [mounted, persist, currentIndex, karaokeOn, volume, muted]);

  // When the track list itself swaps, keep the index in range.
  useEffect(() => {
    if (tracks.length > 0 && currentIndex >= tracks.length) setCurrentIndex(0);
  }, [tracks, currentIndex]);

  // Keep the element's volume in sync (also after src swaps re-mount audio).
  useEffect(() => {
    const a = audioRef.current;
    if (a) a.volume = muted ? 0 : volume;
  }, [volume, muted, currentIndex]);

  const track = tracks[Math.min(currentIndex, tracks.length - 1)];

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
    if (!a) return;
    if (a.paused) a.play().catch(() => setIsPlaying(false));
    else a.pause();
  }, []);

  const goTo = useCallback(
    (index: number, autoplay: boolean) => {
      const n = tracks.length;
      if (n === 0) return;
      pendingPlayRef.current = autoplay;
      setCurrentIndex(((index % n) + n) % n);
      setCurrentTime(0);
      setDuration(0);
    },
    [tracks.length]
  );

  /** Pause and jump to the first track — used when the source list swaps. */
  const resetToStart = useCallback(() => {
    audioRef.current?.pause();
    pendingPlayRef.current = false;
    setCurrentIndex(0);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  // After the <audio> src swaps to the new track, resume if we were playing.
  useEffect(() => {
    if (!pendingPlayRef.current) return;
    pendingPlayRef.current = false;
    audioRef.current?.play().catch(() => setIsPlaying(false));
  }, [currentIndex]);

  const next = useCallback(() => goTo(currentIndex + 1, isPlaying), [goTo, currentIndex, isPlaying]);

  const prev = useCallback(() => {
    const a = audioRef.current;
    // Convention: early in a track go to the previous one; later, restart it.
    if (a && a.currentTime > 3) {
      a.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    goTo(currentIndex - 1, isPlaying);
  }, [goTo, currentIndex, isPlaying]);

  const select = useCallback(
    (index: number) => {
      if (index === currentIndex) togglePlay();
      else goTo(index, true);
    },
    [currentIndex, goTo, togglePlay]
  );

  const seek = useCallback(
    (time: number) => {
      const a = audioRef.current;
      if (!a) return;
      const t = Math.max(0, Math.min(time, duration || track.duration));
      a.currentTime = t;
      setCurrentTime(t);
    },
    [duration, track.duration]
  );

  const toggleKaraoke = useCallback(() => setKaraokeOn((on) => !on), []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
    setMuted(false);
  }, []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  // Props for the single <audio> element — events keep React state truthful.
  const audioProps = {
    ref: audioRef,
    src: track.src,
    preload: "metadata" as const,
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
    onTimeUpdate: () => setCurrentTime(audioRef.current?.currentTime ?? 0),
    onLoadedMetadata: () => setDuration(audioRef.current?.duration ?? 0),
    onEnded: () => goTo(currentIndex + 1, true),
  };

  // Derived: the last lyric line whose time has passed (with a small
  // lookahead so lines light up right on the phrase).
  let activeLyricIndex = -1;
  for (let i = 0; i < track.lyrics.length; i++) {
    if (track.lyrics[i].time <= currentTime + 0.12) activeLyricIndex = i;
    else break;
  }

  return {
    tracks,
    track,
    currentIndex,
    isPlaying,
    currentTime,
    duration: duration || track.duration,
    karaokeOn,
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
    toggleKaraoke,
    setVolume,
    toggleMute,
    resetToStart,
  };
}

export function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
