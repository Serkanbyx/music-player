/**
 * Formats time in seconds to MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
export const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Formats time in seconds to HH:MM:SS format (for longer durations)
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
export const formatTimeLong = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '0:00:00';

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculates total duration of a track list
 * @param durations - Array of durations in seconds
 * @returns Total duration in seconds
 */
export const calculateTotalDuration = (durations: number[]): number => {
  return durations.reduce((total, duration) => total + duration, 0);
};
