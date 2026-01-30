import { useState } from 'react';
import { X } from 'lucide-react';
import { createPlaylistSchema, type CreatePlaylistInput } from '../schemas/playlist.schema';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal for creating a new playlist
 * Uses Zod for form validation
 */
export const CreatePlaylistModal = ({
  isOpen,
  onClose,
}: CreatePlaylistModalProps) => {
  const [formData, setFormData] = useState<CreatePlaylistInput>({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Handle input changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data with Zod
    const result = createPlaylistSchema.safeParse(formData);

    if (!result.success) {
      // Extract and set errors
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Success - create playlist (in a real app, this would call an API)
    console.log('Creating playlist:', result.data);
    
    // Reset form and close modal
    setFormData({ name: '', description: '' });
    setErrors({});
    onClose();
  };

  /**
   * Handle modal close
   */
  const handleClose = () => {
    setFormData({ name: '', description: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="relative bg-dark-200 rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl fade-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6">Create Playlist</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Playlist Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="My Awesome Playlist"
              className={`w-full px-4 py-3 bg-dark-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a description for your playlist..."
              rows={3}
              className={`w-full px-4 py-3 bg-dark-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full btn btn-primary py-3 text-lg font-semibold mt-6"
          >
            Create Playlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
