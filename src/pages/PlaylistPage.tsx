import { useParams, useNavigate } from 'react-router-dom';
import { Play, Shuffle, ArrowLeft, Clock3 } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { TrackItem } from '../components/TrackItem';
import { getPlaylistById } from '../data/sampleData';
import { formatTime, calculateTotalDuration } from '../utils/formatTime';

/**
 * Single playlist page
 * Shows playlist details and tracks
 */
export const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setQueue, setCurrentPlaylist, toggleShuffle } = usePlayerStore();

  // Get playlist data
  const playlist = id ? getPlaylistById(id) : null;

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Playlist not found</h2>
        <button
          onClick={() => navigate('/library')}
          className="btn btn-primary"
        >
          Go to Library
        </button>
      </div>
    );
  }

  /**
   * Play all tracks in playlist
   */
  const handlePlayAll = () => {
    setCurrentPlaylist(playlist);
    setQueue(playlist.tracks, 0);
  };

  /**
   * Shuffle and play
   */
  const handleShufflePlay = () => {
    setCurrentPlaylist(playlist);
    setQueue(playlist.tracks, 0);
    toggleShuffle();
  };

  // Calculate total duration
  const totalDuration = calculateTotalDuration(
    playlist.tracks.map((t) => t.duration)
  );

  return (
    <div className="space-y-6 pb-32 md:pb-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Playlist header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
        {/* Cover image */}
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-48 h-48 md:w-56 md:h-56 rounded-xl shadow-2xl object-cover"
        />

        {/* Playlist info */}
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
            Playlist
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="text-gray-400 mb-4">{playlist.description}</p>
          )}
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
            <span>{playlist.tracks.length} tracks</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock3 className="w-4 h-4" />
              {formatTime(totalDuration)}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayAll}
          disabled={playlist.tracks.length === 0}
          className="btn btn-primary text-lg px-8 py-3 disabled:opacity-50"
        >
          <Play className="w-5 h-5 mr-2" />
          Play
        </button>
        <button
          onClick={handleShufflePlay}
          disabled={playlist.tracks.length === 0}
          className="btn btn-ghost text-lg px-6 py-3 border border-gray-700 disabled:opacity-50"
        >
          <Shuffle className="w-5 h-5 mr-2" />
          Shuffle
        </button>
      </div>

      {/* Track list */}
      <div>
        {/* Track list header */}
        <div className="hidden md:flex items-center gap-4 px-3 py-2 text-sm text-gray-400 border-b border-gray-800">
          <div className="w-8 text-center">#</div>
          <div className="w-12" />
          <div className="flex-1">Title</div>
          <div className="flex-1">Album</div>
          <div className="w-12 text-right">Duration</div>
        </div>

        {/* Tracks */}
        {playlist.tracks.length > 0 ? (
          <div className="space-y-1 mt-2">
            {playlist.tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                index={index}
                playlist={playlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>This playlist is empty</p>
            <p className="text-sm mt-2">Add some tracks to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
