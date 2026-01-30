import { useEffect, useRef, useCallback } from 'react';
import { usePlayerStore } from '../store/usePlayerStore';

/**
 * Custom hook for managing HTML5 Audio API
 * Connects Zustand store state with actual audio playback
 */
export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    progress,
    setProgress,
    nextTrack,
    pause,
  } = usePlayerStore();

  /**
   * Initialize audio element
   */
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /**
   * Update audio source when track changes
   */
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrack?.id]);

  /**
   * Handle play/pause state changes
   */
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error('Playback failed:', error);
        pause();
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack, pause]);

  /**
   * Update volume
   */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  /**
   * Animation frame loop for progress updates
   */
  const updateProgress = useCallback(() => {
    if (audioRef.current && isPlaying) {
      setProgress(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, [isPlaying, setProgress]);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, updateProgress]);

  /**
   * Handle track end
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [nextTrack]);

  /**
   * Seek to specific time
   */
  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, [setProgress]);

  /**
   * Get current audio element reference
   */
  const getAudioElement = useCallback(() => audioRef.current, []);

  return {
    audioRef,
    seekTo,
    getAudioElement,
  };
};

export default useAudioPlayer;
