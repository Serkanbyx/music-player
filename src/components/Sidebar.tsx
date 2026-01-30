import { NavLink } from 'react-router-dom';
import { Home, Library, Music2, Plus } from 'lucide-react';
import { useState } from 'react';
import { CreatePlaylistModal } from './CreatePlaylistModal';

/**
 * Sidebar navigation component
 * Contains main navigation links and playlist creation
 */
export const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { to: '/player', icon: Home, label: 'Home' },
    { to: '/library', icon: Library, label: 'Library' },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-dark-200 border-r border-gray-800">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-800">
          <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
            <Music2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">Music Player</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-6 border-t border-gray-800" />

          {/* Create playlist button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Playlist</span>
          </button>
        </nav>

        {/* Footer */}
        <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-800">
          Created by{' '}
          <a
            href="https://serkanbayraktar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400 transition-colors"
          >
            Serkanby
          </a>
          {' | '}
          <a
            href="https://github.com/Serkanbyx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400 transition-colors"
          >
            Github
          </a>
        </footer>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-20 left-0 right-0 md:hidden bg-dark-200 border-t border-gray-800 z-40">
        <ul className="flex justify-around py-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-primary-400' : 'text-gray-400'
                  }`
                }
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col items-center gap-1 px-6 py-2 text-gray-400"
            >
              <Plus className="w-6 h-6" />
              <span className="text-xs">Create</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Create playlist modal */}
      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
