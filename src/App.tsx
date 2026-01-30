import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PlayerPage } from './pages/PlayerPage';
import { LibraryPage } from './pages/LibraryPage';
import { PlaylistPage } from './pages/PlaylistPage';

/**
 * Main application component
 * Defines routes and wraps everything in the Layout
 */
function App() {
  return (
    <Layout>
      <Routes>
        {/* Main player view */}
        <Route path="/" element={<Navigate to="/player" replace />} />
        <Route path="/player" element={<PlayerPage />} />
        
        {/* Library and playlist management */}
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/player" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
