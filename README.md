# Music Player

A modern, responsive music player built with React, TypeScript, and Tailwind CSS. Features playlist management, playback controls, shuffle/repeat modes, and a beautiful dark UI.

![Music Player](https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=600&fit=crop)

## Features

- **Playback Controls**: Play, pause, next, previous track navigation
- **Progress Bar**: Seekable progress bar with time display
- **Volume Control**: Adjustable volume with mute toggle
- **Shuffle Mode**: Randomize track order
- **Repeat Modes**: Off, repeat all, repeat one
- **Playlist Management**: Create and browse playlists
- **Library View**: Grid and list view modes
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Modern dark theme with smooth animations

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Zod** - Form validation
- **Lucide React** - Icons
- **HTML5 Audio API** - Audio playback

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
└── index.css            # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd music-player
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/player` |
| `/player` | Main player view with all tracks and playlists |
| `/library` | Library view with tabs for playlists and tracks |
| `/playlist/:id` | Single playlist view |

## State Management

The player state is managed with Zustand and includes:

- `currentTrack` - Currently playing track
- `isPlaying` - Play/pause state
- `progress` - Current playback position
- `volume` - Volume level (0-1)
- `queue` - Current playback queue
- `isShuffled` - Shuffle mode state
- `repeatMode` - Repeat mode (off/all/one)

## License

MIT

## Author

Created with React + Vite
