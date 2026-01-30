import { z } from 'zod';

/**
 * Zod schema for playlist creation form validation
 */
export const createPlaylistSchema = z.object({
  name: z
    .string()
    .min(1, 'Playlist name is required')
    .min(3, 'Playlist name must be at least 3 characters')
    .max(50, 'Playlist name must be less than 50 characters')
    .trim(),
  description: z
    .string()
    .max(200, 'Description must be less than 200 characters')
    .trim()
    .optional()
    .default(''),
});

/**
 * Type inference from schema
 */
export type CreatePlaylistInput = z.infer<typeof createPlaylistSchema>;

/**
 * Validation helper function
 */
export const validatePlaylistForm = (data: unknown) => {
  return createPlaylistSchema.safeParse(data);
};
