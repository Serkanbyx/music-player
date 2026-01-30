import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { PlayerBar } from './PlayerBar';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout component
 * Contains sidebar navigation, main content area, and player bar
 */
export const Layout = ({ children }: LayoutProps) => {
  // Initialize audio player hook at the top level
  useAudioPlayer();

  return (
    <div className="flex flex-col h-screen bg-dark-300">
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 pb-20 md:pb-8">{children}</div>
        </main>
      </div>

      {/* Fixed player bar at bottom */}
      <PlayerBar />
    </div>
  );
};

export default Layout;
