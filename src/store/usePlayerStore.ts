import { create } from 'zustand';
import type { PlayerStore, Track, Playlist, RepeatMode } from '../types';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Zustand store for music player state management
 */
export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // Initial state
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 0.7,
  isMuted: false,
  queue: [],
  originalQueue: [],
  queueIndex: -1,
  isShuffled: false,
  repeatMode: 'off',
  currentPlaylist: null,

  // Playback controls
  play: () => set({ isPlaying: true }),
  
  pause: () => set({ isPlaying: false }),
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  stop: () =>
    set({
      isPlaying: false,
      progress: 0,
      currentTrack: null,
      queueIndex: -1,
    }),

  // Track navigation
  nextTrack: () => {
    const { queue, queueIndex, repeatMode, isShuffled } = get();
    
    if (queue.length === 0) return;

    let nextIndex = queueIndex + 1;

    // Handle repeat modes
    if (repeatMode === 'one') {
      // Repeat current track - keep same index
      set({ progress: 0 });
      return;
    }

    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        // Loop back to start
        nextIndex = 0;
      } else {
        // Stop at end
        set({ isPlaying: false });
        return;
      }
    }

    const nextTrack = queue[nextIndex];
    set({
      currentTrack: nextTrack,
      queueIndex: nextIndex,
      progress: 0,
      duration: nextTrack.duration,
    });
  },

  previousTrack: () => {
    const { queue, queueIndex, progress, repeatMode } = get();
    
    if (queue.length === 0) return;

    // If more than 3 seconds in, restart current track
    if (progress > 3) {
      set({ progress: 0 });
      return;
    }

    let prevIndex = queueIndex - 1;

    if (prevIndex < 0) {
      if (repeatMode === 'all') {
        // Loop to end
        prevIndex = queue.length - 1;
      } else {
        // Stay at start, restart track
        set({ progress: 0 });
        return;
      }
    }

    const prevTrack = queue[prevIndex];
    set({
      currentTrack: prevTrack,
      queueIndex: prevIndex,
      progress: 0,
      duration: prevTrack.duration,
    });
  },

  setTrack: (track: Track, playlist?: Playlist) => {
    const { queue, isShuffled } = get();
    
    // Find track index in current queue
    let trackIndex = queue.findIndex((t) => t.id === track.id);

    // If track not in queue, add it
    if (trackIndex === -1) {
      const newQueue = playlist ? playlist.tracks : [track];
      trackIndex = newQueue.findIndex((t) => t.id === track.id);
      
      set({
        queue: isShuffled ? shuffleArray(newQueue) : newQueue,
        originalQueue: newQueue,
        currentPlaylist: playlist || null,
      });
      
      // Recalculate index for shuffled queue
      if (isShuffled) {
        trackIndex = get().queue.findIndex((t) => t.id === track.id);
      }
    }

    set({
      currentTrack: track,
      queueIndex: trackIndex,
      progress: 0,
      duration: track.duration,
      isPlaying: true,
    });
  },

  setQueue: (tracks: Track[], startIndex: number = 0) => {
    const { isShuffled } = get();
    const queue = isShuffled ? shuffleArray(tracks) : tracks;
    const track = queue[startIndex];

    set({
      queue,
      originalQueue: tracks,
      currentTrack: track,
      queueIndex: startIndex,
      progress: 0,
      duration: track?.duration || 0,
      isPlaying: true,
    });
  },

  // Progress and seeking
  setProgress: (progress: number) => set({ progress }),
  
  seek: (time: number) => set({ progress: Math.max(0, time) }),

  // Volume controls
  setVolume: (volume: number) =>
    set({
      volume: Math.max(0, Math.min(1, volume)),
      isMuted: volume === 0,
    }),
  
  toggleMute: () =>
    set((state) => ({
      isMuted: !state.isMuted,
    })),

  // Playback modes
  toggleShuffle: () => {
    const { isShuffled, queue, originalQueue, currentTrack } = get();
    
    if (isShuffled) {
      // Restore original order
      const currentIndex = originalQueue.findIndex(
        (t) => t.id === currentTrack?.id
      );
      set({
        isShuffled: false,
        queue: originalQueue,
        queueIndex: currentIndex >= 0 ? currentIndex : 0,
      });
    } else {
      // Shuffle queue
      const shuffled = shuffleArray(queue);
      const currentIndex = shuffled.findIndex(
        (t) => t.id === currentTrack?.id
      );
      set({
        isShuffled: true,
        queue: shuffled,
        queueIndex: currentIndex >= 0 ? currentIndex : 0,
      });
    }
  },

  toggleRepeat: () => {
    const { repeatMode } = get();
    const modes: RepeatMode[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    set({ repeatMode: nextMode });
  },

  // Playlist management
  setCurrentPlaylist: (playlist: Playlist | null) =>
    set({ currentPlaylist: playlist }),
}));

export default usePlayerStore;
