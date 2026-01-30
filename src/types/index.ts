/**
 * Represents a single music track
 */
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // Duration in seconds
  coverUrl: string;
  audioUrl: string;
}

/**
 * Represents a playlist containing multiple tracks
 */
export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Repeat mode options for the player
 */
export type RepeatMode = 'off' | 'all' | 'one';

/**
 * Player state interface for Zustand store
 */
export interface PlayerState {
  // Current playback state
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // Current playback position in seconds
  duration: number; // Total duration of current track
  volume: number; // Volume level 0-1
  isMuted: boolean;

  // Queue management
  queue: Track[];
  originalQueue: Track[]; // Original queue order for unshuffle
  queueIndex: number;

  // Playback modes
  isShuffled: boolean;
  repeatMode: RepeatMode;

  // Current playlist context
  currentPlaylist: Playlist | null;
}

/**
 * Player actions interface for Zustand store
 */
export interface PlayerActions {
  // Playback controls
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  stop: () => void;

  // Track navigation
  nextTrack: () => void;
  previousTrack: () => void;
  setTrack: (track: Track, playlist?: Playlist) => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;

  // Progress and seeking
  setProgress: (progress: number) => void;
  seek: (time: number) => void;

  // Volume controls
  setVolume: (volume: number) => void;
  toggleMute: () => void;

  // Playback modes
  toggleShuffle: () => void;
  toggleRepeat: () => void;

  // Playlist management
  setCurrentPlaylist: (playlist: Playlist | null) => void;
}

/**
 * Combined store type
 */
export type PlayerStore = PlayerState & PlayerActions;

/**
 * Form data for creating a new playlist
 */
export interface CreatePlaylistForm {
  name: string;
  description: string;
}
