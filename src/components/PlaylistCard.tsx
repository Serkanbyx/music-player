import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Playlist } from '../types';
import { usePlayerStore } from '../store/usePlayerStore';

interface PlaylistCardProps {
  playlist: Playlist;
}

/**
 * Playlist card component for grid display
 * Shows playlist cover, name, and track count
 */
export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const navigate = useNavigate();
  const { setQueue, setCurrentPlaylist } = usePlayerStore();

  /**
   * Handle card click - navigate to playlist
   */
  const handleClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  /**
   * Handle play button click - start playing playlist
   */
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.tracks.length > 0) {
      setCurrentPlaylist(playlist);
      setQueue(playlist.tracks, 0);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-dark-100 rounded-xl p-4 cursor-pointer card-hover"
    >
      {/* Cover image */}
      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden shadow-lg">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-full h-full object-cover"
        />
        
        {/* Play button overlay */}
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary-500 shadow-lg flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-primary-400"
          aria-label={`Play ${playlist.name}`}
        >
          <Play className="w-6 h-6 text-white ml-0.5" />
        </button>
      </div>

      {/* Playlist info */}
      <h3 className="font-bold text-lg truncate">{playlist.name}</h3>
      <p className="text-sm text-gray-400 truncate-2 mt-1">
        {playlist.description || `${playlist.tracks.length} tracks`}
      </p>
    </div>
  );
};

export default PlaylistCard;
