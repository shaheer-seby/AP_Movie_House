import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const tabs = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'Genres', path: '/genres' },
  { name: 'Directors', path: '/directors' },
  { name: 'Support', path: '/help' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const isActive = (path) => {
    if (path === '/') return router.pathname === '/';
    return router.pathname.startsWith(path);
  };
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition">
          Movie House
        </Link>

        <div className="flex md:hidden">
        <button
            onClick={toggleTheme}
            className="px-4 py-2 w-full rounded-lg"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <nav className="hidden md:flex ">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              href={tab.path}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isActive(tab.path)
                  ? 'bg-white text-gray-900'
                  : 'bg-blue-900 hover:bg-blue-600'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
        <button
            onClick={toggleTheme}
            className="hidden md:block px-4 py-2 rounded-lg"
          >
            {darkMode ? ' ☀️ ' : '🌙'}
          </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              href={tab.path}
              className={`block w-full px-4 py-2 rounded-lg font-medium text-center transition ${
                isActive(tab.path)
                  ? 'bg-white text-gray-900'
                  : 'bg-blue-900 hover:bg-blue-700'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
