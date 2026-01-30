import type { Track, Playlist } from '../types';

/**
 * Sample tracks for demonstration
 * Using royalty-free music URLs from public sources
 */
export const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Energetic Rock',
    artist: 'Audio Library',
    album: 'Rock Collection',
    duration: 185,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Chill Vibes',
    artist: 'Ambient Sounds',
    album: 'Relaxation',
    duration: 210,
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Electronic Dreams',
    artist: 'Synth Wave',
    album: 'Digital Age',
    duration: 240,
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Acoustic Morning',
    artist: 'Guitar Masters',
    album: 'Sunrise Sessions',
    duration: 195,
    coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: '5',
    title: 'Jazz Night',
    artist: 'Smooth Jazz Band',
    album: 'Late Hours',
    duration: 275,
    coverUrl: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: '6',
    title: 'Pop Anthem',
    artist: 'Chart Toppers',
    album: 'Summer Hits',
    duration: 220,
    coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: '7',
    title: 'Classical Piano',
    artist: 'Piano Virtuoso',
    album: 'Timeless Classics',
    duration: 320,
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: '8',
    title: 'Hip Hop Beat',
    artist: 'Urban Flow',
    album: 'Street Sound',
    duration: 198,
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
];

/**
 * Sample playlists for demonstration
 */
export const samplePlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'Favorites',
    description: 'Your all-time favorite tracks',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    tracks: [sampleTracks[0], sampleTracks[2], sampleTracks[4], sampleTracks[6]],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'playlist-2',
    name: 'Chill Mix',
    description: 'Relaxing tunes for any mood',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    tracks: [sampleTracks[1], sampleTracks[3], sampleTracks[6]],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 'playlist-3',
    name: 'Workout Beats',
    description: 'High energy tracks to keep you moving',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    tracks: [sampleTracks[0], sampleTracks[2], sampleTracks[5], sampleTracks[7]],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: 'playlist-4',
    name: 'Late Night Jazz',
    description: 'Smooth jazz for evening relaxation',
    coverUrl: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=300&h=300&fit=crop',
    tracks: [sampleTracks[4], sampleTracks[6], sampleTracks[1]],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-19'),
  },
];

/**
 * Get all tracks
 */
export const getAllTracks = (): Track[] => sampleTracks;

/**
 * Get all playlists
 */
export const getAllPlaylists = (): Playlist[] => samplePlaylists;

/**
 * Get track by ID
 */
export const getTrackById = (id: string): Track | undefined => {
  return sampleTracks.find((track) => track.id === id);
};

/**
 * Get playlist by ID
 */
export const getPlaylistById = (id: string): Playlist | undefined => {
  return samplePlaylists.find((playlist) => playlist.id === id);
};
