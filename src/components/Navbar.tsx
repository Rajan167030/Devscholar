import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-black border-b-[8px] border-b-transparent ml-1"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">UNLOCKEDCODING</span>
          </button>

          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'categories' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'courses' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'about' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              About
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
