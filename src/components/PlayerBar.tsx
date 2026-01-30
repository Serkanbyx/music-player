import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Repeat1,
  Shuffle,
} from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { formatTime } from '../utils/formatTime';

/**
 * Player bar component - fixed at bottom
 * Contains playback controls, progress, volume, and current track info
 */
export const PlayerBar = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  const { seekTo } = useAudioPlayer();

  /**
   * Handle progress bar click/change
   */
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seekTo(time);
  };

  /**
   * Handle volume change
   */
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  /**
   * Get repeat icon based on mode
   */
  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;

  // Progress percentage for styling
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:static bg-dark-200 border-t border-gray-800 md:shrink-0 z-50">
      {/* Progress bar - full width at top */}
      <div className="relative h-1 bg-gray-700 md:hidden">
        <div
          className="absolute h-full bg-primary-500"
          style={{ width: `${progressPercent}%` }}
        />
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress}
          onChange={handleProgressChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Seek"
        />
      </div>

      <div className="flex items-center justify-between gap-4 p-3 md:p-4">
        {/* Track info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {currentTrack ? (
            <>
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover ${
                  isPlaying ? 'disc-spin' : 'disc-spin disc-spin-paused'
                }`}
              />
              <div className="min-w-0">
                <h4 className="font-medium text-sm md:text-base truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-dark-100 flex items-center justify-center">
                <Play className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-gray-500 text-sm">No track selected</p>
            </div>
          )}
        </div>

        {/* Playback controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Shuffle button - hidden on mobile */}
            <button
              onClick={toggleShuffle}
              className={`hidden md:block icon-btn ${
                isShuffled ? 'icon-btn-active' : ''
              }`}
              aria-label="Toggle shuffle"
            >
              <Shuffle className="w-5 h-5" />
            </button>

            {/* Previous track */}
            <button
              onClick={previousTrack}
              className="icon-btn"
              disabled={!currentTrack}
              aria-label="Previous track"
            >
              <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              disabled={!currentTrack}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-dark-300 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
              )}
            </button>

            {/* Next track */}
            <button
              onClick={nextTrack}
              className="icon-btn"
              disabled={!currentTrack}
              aria-label="Next track"
            >
              <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Repeat button - hidden on mobile */}
            <button
              onClick={toggleRepeat}
              className={`hidden md:block icon-btn ${
                repeatMode !== 'off' ? 'icon-btn-active' : ''
              }`}
              aria-label="Toggle repeat"
            >
              <RepeatIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar - desktop only */}
          <div className="hidden md:flex items-center gap-3 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(progress)}
            </span>
            <div className="relative flex-1 h-1 group">
              <div className="absolute inset-0 bg-gray-600 rounded-full" />
              <div
                className="absolute h-full bg-white rounded-full group-hover:bg-primary-500 transition-colors"
                style={{ width: `${progressPercent}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={progress}
                onChange={handleProgressChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Seek"
              />
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume control - desktop only */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={toggleMute}
            className="icon-btn"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <div className="relative w-24 h-1 group">
            <div className="absolute inset-0 bg-gray-600 rounded-full" />
            <div
              className="absolute h-full bg-white rounded-full"
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Mobile controls for shuffle/repeat */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleShuffle}
            className={`icon-btn ${isShuffled ? 'icon-btn-active' : ''}`}
            aria-label="Toggle shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={toggleRepeat}
            className={`icon-btn ${repeatMode !== 'off' ? 'icon-btn-active' : ''}`}
            aria-label="Toggle repeat"
          >
            <RepeatIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
