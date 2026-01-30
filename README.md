# 🎵 Music Player

A modern, responsive music player application built with React, TypeScript, and Tailwind CSS. Features playlist management, playback controls, shuffle/repeat modes, and a beautiful dark-themed UI designed for the best user experience.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **Playback Controls**: Full control with play, pause, next, and previous track navigation
- **Seekable Progress Bar**: Interactive progress bar with real-time time display (current/total)
- **Volume Control**: Adjustable volume slider with mute/unmute toggle functionality
- **Shuffle Mode**: Randomize track order using Fisher-Yates algorithm for true randomness
- **Repeat Modes**: Three modes - Off, Repeat All (loop playlist), Repeat One (loop single track)
- **Playlist Management**: Create, browse, and manage custom playlists
- **Library View**: Switch between grid and list view modes for better organization
- **Queue Management**: Dynamic queue system with track reordering support
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile
- **Beautiful Dark UI**: Modern dark theme with smooth CSS animations and transitions
- **Client-Side Routing**: SPA navigation with React Router for instant page transitions
- **Type Safety**: Full TypeScript support for better code quality and developer experience

## Live Demo

[🎮 View Live Demo](https://your-demo-url.netlify.app)

## Technologies

- **React 18**: Modern UI library with hooks and concurrent features
- **TypeScript**: Static type checking for enhanced code quality and maintainability
- **Vite**: Lightning-fast build tool and development server with HMR
- **Zustand**: Lightweight and flexible state management solution
- **React Router v6**: Declarative client-side routing for SPA navigation
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Zod**: TypeScript-first schema validation for form handling
- **Lucide React**: Beautiful, consistent icon library
- **HTML5 Audio API**: Native browser API for audio playback control
- **ESLint**: Code linting for consistent code style

## Installation

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm package manager

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Serkanbyx/music-player.git
cd music-player
```

2. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

The optimized build output will be generated in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Browse Music**: Navigate to the Player page to see all available tracks
2. **Play a Track**: Click on any track to start playback immediately
3. **Control Playback**: Use the bottom player bar to play/pause, skip, or adjust volume
4. **Create Playlists**: Go to Library and create custom playlists to organize your music
5. **Shuffle & Repeat**: Toggle shuffle mode for random playback or set repeat mode for continuous listening
6. **Manage Library**: Switch between grid and list views in the Library page
7. **View Playlist**: Click on any playlist card to see its contents and play tracks

## How It Works?

### State Management with Zustand

The application uses Zustand for centralized state management. The player store handles:

```typescript
interface PlayerStore {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  queue: Track[];
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
}
```

### Shuffle Algorithm

Track shuffling uses the Fisher-Yates algorithm for unbiased randomization:

```typescript
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
```

### Routing Structure

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/player` |
| `/player` | Main player view with all tracks and playlists |
| `/library` | Library view with tabs for playlists and tracks |
| `/playlist/:id` | Single playlist detail view |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx       # Main layout with sidebar and player bar
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── PlayerBar.tsx    # Bottom player controls
│   ├── TrackItem.tsx    # Single track row component
│   ├── PlaylistCard.tsx # Playlist card for grid view
│   └── CreatePlaylistModal.tsx
├── pages/               # Route pages
│   ├── PlayerPage.tsx   # Home/main player view
│   ├── LibraryPage.tsx  # Library with playlists and tracks
│   └── PlaylistPage.tsx # Single playlist view
├── store/               # Zustand state management
│   └── usePlayerStore.ts
├── hooks/               # Custom React hooks
│   └── useAudioPlayer.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── schemas/             # Zod validation schemas
│   └── playlist.schema.ts
├── data/                # Sample data
│   └── sampleData.ts
├── utils/               # Utility functions
│   └── formatTime.ts
├── App.tsx              # Main app component with routes
├── main.tsx             # Entry point
└── index.css            # Global styles with Tailwind
```

## Customization

### Add Your Own Tracks

Edit the `src/data/sampleData.ts` file to add your own music:

```typescript
export const tracks: Track[] = [
  {
    id: '1',
    title: 'Your Song Title',
    artist: 'Artist Name',
    album: 'Album Name',
    duration: 240, // Duration in seconds
    coverUrl: 'https://your-cover-image.jpg',
    audioUrl: '/audio/your-song.mp3',
  },
  // Add more tracks...
];
```

### Change Theme Colors

Modify the Tailwind configuration in `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#1e293b',
          200: '#0f172a',
          300: '#020617',
        },
        primary: '#0ea5e9',
      },
    },
  },
};
```

## Features in Detail

### Completed Features

✅ Play/Pause controls with keyboard support  
✅ Next/Previous track navigation  
✅ Seekable progress bar  
✅ Volume control with mute toggle  
✅ Shuffle mode with Fisher-Yates algorithm  
✅ Repeat modes (Off, All, One)  
✅ Playlist creation and management  
✅ Grid and list view modes  
✅ Responsive design for all devices  
✅ Dark theme UI  
✅ Client-side routing  

### Future Features

- [ ] 🔮 Audio visualizer with frequency bars
- [ ] 🔮 Equalizer settings
- [ ] 🔮 Lyrics display
- [ ] 🔮 Keyboard shortcuts
- [ ] 🔮 Last.fm integration
- [ ] 🔮 Offline support with PWA
- [ ] 🔮 User authentication
- [ ] 🔮 Cloud playlist sync

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy!

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch:

```bash
git checkout -b feat/amazing-feature
```

3. Commit your changes with descriptive messages:

```bash
git commit -m "feat: add amazing feature"
```

4. Push to the branch:

```bash
git push origin feat/amazing-feature
```

5. Open a Pull Request

### Commit Message Format

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `chore:` - Maintenance tasks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

**Serkan Bayraktar**

- Website: [serkanbayraktar.com](https://serkanbayraktar.com)
- GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- Email: [serkanbyx1@gmail.com](mailto:serkanbyx1@gmail.com)

## Acknowledgments

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Unsplash](https://unsplash.com/) - Cover images

## Contact

- **Issues**: [GitHub Issues](https://github.com/Serkanbyx/music-player/issues)
- **Email**: [serkanbyx1@gmail.com](mailto:serkanbyx1@gmail.com)
- **Website**: [serkanbayraktar.com](https://serkanbayraktar.com)

---

⭐ If you like this project, don't forget to give it a star!
