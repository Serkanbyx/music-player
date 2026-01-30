import { useState } from 'react';
import { Music, ListMusic, Grid, List } from 'lucide-react';
import { PlaylistCard } from '../components/PlaylistCard';
import { TrackItem } from '../components/TrackItem';
import { samplePlaylists, sampleTracks } from '../data/sampleData';

type ViewMode = 'grid' | 'list';
type TabMode = 'playlists' | 'tracks';

/**
 * Library page
 * Shows all playlists and tracks with filtering options
 */
export const LibraryPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState<TabMode>('playlists');

  return (
    <div className="space-y-6 pb-32 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Your Library</h1>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary-500/20 text-primary-400'
                : 'text-gray-400 hover:bg-white/5'
            }`}
            aria-label="Grid view"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-500/20 text-primary-400'
                : 'text-gray-400 hover:bg-white/5'
            }`}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('playlists')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'playlists'
              ? 'border-primary-500 text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <ListMusic className="w-5 h-5" />
          <span>Playlists</span>
          <span className="text-sm text-gray-500">
            ({samplePlaylists.length})
          </span>
        </button>
        <button
          onClick={() => setActiveTab('tracks')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'tracks'
              ? 'border-primary-500 text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Music className="w-5 h-5" />
          <span>Tracks</span>
          <span className="text-sm text-gray-500">({sampleTracks.length})</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'playlists' ? (
        viewMode === 'grid' ? (
          /* Playlists grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {samplePlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          /* Playlists list */
          <div className="space-y-2">
            {samplePlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => window.location.href = `/playlist/${playlist.id}`}
              >
                <img
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{playlist.name}</h3>
                  <p className="text-sm text-gray-400">
                    {playlist.tracks.length} tracks
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Tracks list */
        <div>
          {/* Track list header */}
          <div className="hidden md:flex items-center gap-4 px-3 py-2 text-sm text-gray-400 border-b border-gray-800">
            <div className="w-8 text-center">#</div>
            <div className="w-12" />
            <div className="flex-1">Title</div>
            <div className="flex-1">Album</div>
            <div className="w-12 text-right">Duration</div>
          </div>

          <div className="space-y-1 mt-2">
            {sampleTracks.map((track, index) => (
              <TrackItem key={track.id} track={track} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
