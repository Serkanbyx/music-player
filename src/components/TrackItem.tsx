import { Play, Pause } from 'lucide-react';
import type { Track, Playlist } from '../types';
import { usePlayerStore } from '../store/usePlayerStore';
import { formatTime } from '../utils/formatTime';

interface TrackItemProps {
  track: Track;
  index: number;
  playlist?: Playlist;
  showIndex?: boolean;
}

/**
 * Single track item component
 * Displays track info and handles play/pause
 */
export const TrackItem = ({
  track,
  index,
  playlist,
  showIndex = true,
}: TrackItemProps) => {
  const { currentTrack, isPlaying, setTrack, togglePlay } = usePlayerStore();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  /**
   * Handle track click
   */
  const handleClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      setTrack(track, playlist);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
        isCurrentTrack
          ? 'bg-primary-500/20 hover:bg-primary-500/30'
          : 'hover:bg-white/5'
      }`}
    >
      {/* Index or play button */}
      <div className="w-8 text-center">
        {isCurrentlyPlaying ? (
          <div className="flex items-center justify-center">
            <Pause className="w-5 h-5 text-primary-400" />
          </div>
        ) : (
          <>
            {showIndex && (
              <span className="text-gray-400 group-hover:hidden">
                {index + 1}
              </span>
            )}
            <Play className={`w-5 h-5 text-white ${showIndex ? 'hidden group-hover:block' : ''}`} />
          </>
        )}
      </div>

      {/* Cover image */}
      <img
        src={track.coverUrl}
        alt={track.title}
        className="w-12 h-12 rounded object-cover"
      />

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <h4
          className={`font-medium truncate ${
            isCurrentTrack ? 'text-primary-400' : 'text-white'
          }`}
        >
          {track.title}
        </h4>
        <p className="text-sm text-gray-400 truncate">{track.artist}</p>
      </div>

      {/* Album - hidden on mobile */}
      <div className="hidden md:block flex-1 min-w-0">
        <p className="text-sm text-gray-400 truncate">{track.album}</p>
      </div>

      {/* Duration */}
      <div className="text-sm text-gray-400 w-12 text-right">
        {formatTime(track.duration)}
      </div>
    </div>
  );
};

export default TrackItem;
