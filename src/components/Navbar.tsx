import { Moon, Sun, ChevronDown, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, category?: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAuthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'teachers', label: 'Instructors' },
    { id: 'categories', label: 'Categories' },
    { id: 'courses', label: 'All Courses' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo.svg" 
              alt="DevScholar Logo" 
              className="w-10 h-10"
            />
            <span className="text-xl font-bold tracking-tight">DevScholar</span>
          </button>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'text-blue-600 dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Premium Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="relative w-16 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 flex items-center justify-between px-2">
                <Sun size={14} className={`transition-colors duration-300 ${!isDark ? 'text-amber-500' : 'text-gray-400/30'}`} />
                <Moon size={14} className={`transition-colors duration-300 ${isDark ? 'text-blue-400' : 'text-gray-400/30'}`} />
              </div>
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 transform transition-transform duration-300 flex items-center justify-center ${
                  isDark ? 'translate-x-8' : 'translate-x-0'
                }`}
              >
                {isDark ? (
                  <Moon size={12} className="text-blue-400" />
                ) : (
                  <Sun size={12} className="text-amber-500" />
                )}
              </div>
            </button>

            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  <User size={16} />
                  <span className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isAuthDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAuthDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      {user.email}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsAuthDropdownOpen(false);
                        onNavigate('home');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Sign In
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isAuthDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAuthDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <button
                      onClick={() => {
                        onNavigate('login');
                        setIsAuthDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('signup');
                        setIsAuthDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
