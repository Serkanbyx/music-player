import { Play, Clock3 } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { TrackItem } from '../components/TrackItem';
import { PlaylistCard } from '../components/PlaylistCard';
import { sampleTracks, samplePlaylists } from '../data/sampleData';
import { formatTime } from '../utils/formatTime';

/**
 * Main player page / Home page
 * Shows current playing info, all tracks, and playlists
 */
export const PlayerPage = () => {
  const { currentTrack, isPlaying, setQueue, queue } = usePlayerStore();

  /**
   * Play all tracks
   */
  const handlePlayAll = () => {
    setQueue(sampleTracks, 0);
  };

  /**
   * Calculate total duration
   */
  const totalDuration = sampleTracks.reduce((acc, track) => acc + track.duration, 0);

  return (
    <div className="space-y-8 pb-32 md:pb-8">
      {/* Hero section - currently playing or welcome */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-900/50 to-dark-200 p-6 md:p-8">
        {currentTrack ? (
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Cover art */}
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className={`w-40 h-40 md:w-48 md:h-48 rounded-xl shadow-2xl object-cover ${
                isPlaying ? 'disc-spin' : ''
              }`}
            />
            
            {/* Track info */}
            <div className="text-center md:text-left">
              <p className="text-sm text-primary-400 font-medium uppercase tracking-wider mb-2">
                Now Playing
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {currentTrack.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{currentTrack.artist}</p>
              <p className="text-gray-400">{currentTrack.album}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Music Player
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Select a track to start listening
            </p>
            <button
              onClick={handlePlayAll}
              className="btn btn-primary text-lg px-8 py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              Play All Tracks
            </button>
          </div>
        )}
      </section>

      {/* Playlists section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {samplePlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* All tracks section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">All Tracks</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Clock3 className="w-4 h-4" />
              {formatTime(totalDuration)}
            </span>
            <button
              onClick={handlePlayAll}
              className="btn btn-primary text-sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Play All
            </button>
          </div>
        </div>

        {/* Track list header */}
        <div className="hidden md:flex items-center gap-4 px-3 py-2 text-sm text-gray-400 border-b border-gray-800">
          <div className="w-8 text-center">#</div>
          <div className="w-12" /> {/* Cover image spacer */}
          <div className="flex-1">Title</div>
          <div className="flex-1">Album</div>
          <div className="w-12 text-right">Duration</div>
        </div>

        {/* Track list */}
        <div className="space-y-1 mt-2">
          {sampleTracks.map((track, index) => (
            <TrackItem
              key={track.id}
              track={track}
              index={index}
              playlist={undefined}
            />
          ))}
        </div>
      </section>

      {/* Queue section - only show if there's a queue */}
      {queue.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Queue</h2>
          <div className="space-y-1">
            {queue.map((track, index) => (
              <TrackItem
                key={`queue-${track.id}-${index}`}
                track={track}
                index={index}
                showIndex={true}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PlayerPage;
