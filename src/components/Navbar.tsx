import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scissors,
  Search,
  Plus,
  Bell,
  Flame,
  Compass,
  Trophy,
  BarChart3,
  User,
  Settings,
  ShoppingBag,
  Swords,
  Briefcase,
  LogOut,
  ChevronDown,
  Home,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { IconButton, LevelPill, VisuallyHidden } from './ui/primitives';

const NAV_LINKS = [
  { view: 'landing' as const, label: 'Home', icon: Home },
  { view: 'feed' as const, label: 'Feed', icon: Flame },
  { view: 'explore' as const, label: 'Explore', icon: Compass },
  { view: 'challenges' as const, label: 'Challenges', icon: Trophy },
  { view: 'rankings' as const, label: 'Rankings', icon: BarChart3 },
];

const NAV_LINKS_SECONDARY = [
  { view: 'hire' as const, label: 'Hire Editors', icon: Briefcase },
  { view: 'marketplace' as const, label: 'Assets', icon: ShoppingBag },
  { view: 'battles' as const, label: 'Edit Battles', icon: Swords },
];

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    notifications,
    currentUser,
    setCurrentUser,
    setIsAuthModalOpen,
    setIsPublishModalOpen,
    searchQuery,
    setSearchQuery,
    navigateToProfile,
    darkMode,
    toggleDarkMode,
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isUserMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) setCurrentView('search');
  };

  const goTo = (view: typeof currentView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-paper-0/90 backdrop-blur-xl border-b border-ink-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-7">
          <button
            onClick={() => {
              setCurrentView('landing');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 group cursor-pointer rounded-md"
          >
            <div className="w-8 h-8 rounded-md bg-ink-900 flex items-center justify-center group-hover:bg-ink-800 transition-colors">
              <Scissors className="w-4 h-4 text-paper-0" strokeWidth={2.25} aria-hidden="true" />
            </div>
            <span className="font-semibold text-[17px] tracking-tight text-ink-900">
              Cut<span className="text-signal-600">point</span>
            </span>
          </button>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ view, label, icon: Icon }) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                aria-current={currentView === view ? 'page' : undefined}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  currentView === view
                    ? 'bg-paper-100 text-ink-900'
                    : 'text-ink-500 hover:text-ink-900 hover:bg-paper-50'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {label}
              </button>
            ))}

            <span className="w-px h-5 bg-ink-100 mx-1.5" aria-hidden="true" />

            {NAV_LINKS_SECONDARY.map(({ view, label, icon: Icon }) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                aria-current={currentView === view ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  currentView === view
                    ? 'text-ink-900 bg-paper-100'
                    : 'text-ink-400 hover:text-ink-800 hover:bg-paper-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 max-w-xs md:max-w-md hidden sm:block">
          <form onSubmit={handleSearchSubmit} role="search">
            <label htmlFor="site-search" className="sr-only">
              Search edits, editors, and software
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
              <input
                id="site-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (currentView !== 'search') setCurrentView('search');
                }}
                placeholder="Search edits, editors, #software..."
                className="w-full bg-paper-50 text-sm text-ink-900 placeholder-ink-400 rounded-full pl-10 pr-4 py-2 border border-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus:border-signal-500 transition-colors"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              if (currentUser) setIsPublishModalOpen(true);
              else setIsAuthModalOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-ink-900 hover:bg-ink-800 text-paper-0 font-semibold text-xs sm:text-sm transition-colors active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            Publish Edit
          </button>

          <IconButton label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleDarkMode}>
            {darkMode ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
          </IconButton>

          <IconButton
            label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
            onClick={() => setCurrentView('notifications')}
            className="relative"
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-0.5 rounded-full bg-signal-600 text-[10px] font-bold text-paper-0 flex items-center justify-center"
              >
                {unreadCount}
              </span>
            )}
          </IconButton>

          {currentUser ? (
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
                className="flex items-center gap-2 p-1 pr-2 rounded-full bg-paper-50 border border-ink-100 hover:border-ink-300 transition-colors cursor-pointer"
              >
                <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-full object-cover bg-paper-100" />
                <span className="hidden md:inline font-semibold text-xs text-ink-700 max-w-[100px] truncate">
                  @{currentUser.username}
                </span>
                <VisuallyHidden>Open account menu</VisuallyHidden>
                <ChevronDown className="w-3.5 h-3.5 text-ink-400" aria-hidden="true" />
              </button>

              {isUserMenuOpen && (
                <div
                  role="menu"
                  aria-label="Account"
                  className="absolute right-0 mt-2 w-60 bg-paper-0 border border-ink-100 rounded-lg shadow-xl shadow-ink-900/10 py-2 z-50 text-ink-700 text-sm animate-rise-in"
                >
                  <div className="px-4 py-2.5 border-b border-ink-100 mb-1">
                    <p className="font-semibold text-ink-900 truncate">{currentUser.name}</p>
                    <p className="text-xs text-signal-600">@{currentUser.username}</p>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px]">
                      <LevelPill level={currentUser.level} />
                      <span className="text-ink-400">{currentUser.percentileRank}</span>
                    </div>
                  </div>

                  <button
                    role="menuitem"
                    onClick={() => {
                      navigateToProfile(currentUser.id);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-paper-50 text-left transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-ink-400" aria-hidden="true" />
                    My portfolio and profile
                  </button>

                  <button
                    role="menuitem"
                    onClick={() => {
                      setCurrentView('settings');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-paper-50 text-left transition-colors cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-ink-400" aria-hidden="true" />
                    Settings
                  </button>

                  <button
                    role="menuitem"
                    onClick={() => {
                      setCurrentView('battles');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-paper-50 text-left transition-colors cursor-pointer"
                  >
                    <Swords className="w-4 h-4 text-signal-600" aria-hidden="true" />
                    Edit battles arena
                  </button>

                  <div className="border-t border-ink-100 my-1" />

                  <button
                    role="menuitem"
                    onClick={() => {
                      setCurrentUser(null);
                      setIsUserMenuOpen(false);
                      setCurrentView('landing');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-err-100/50 text-err-600 text-left transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-paper-100 hover:bg-ink-100 text-ink-900 font-medium text-xs sm:text-sm border border-ink-100 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          <IconButton
            label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </IconButton>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-ink-100 bg-paper-0 animate-rise-in max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <nav aria-label="Mobile" className="px-4 py-3 space-y-0.5">
            <form onSubmit={handleSearchSubmit} role="search" className="mb-3 sm:hidden">
              <label htmlFor="mobile-search" className="sr-only">
                Search edits, editors, and software
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
                <input
                  id="mobile-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search CutPoint..."
                  className="w-full bg-paper-50 text-sm text-ink-900 placeholder-ink-400 rounded-full pl-10 pr-4 py-2.5 border border-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400"
                />
              </div>
            </form>

            {[...NAV_LINKS, ...NAV_LINKS_SECONDARY, { view: 'notifications' as const, label: 'Notifications', icon: Bell }].map(
              ({ view, label, icon: Icon }) => (
                <button
                  key={view}
                  onClick={() => goTo(view)}
                  aria-current={currentView === view ? 'page' : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    currentView === view ? 'bg-paper-100 text-ink-900' : 'text-ink-600 hover:bg-paper-50'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  {label}
                </button>
              )
            )}

            <div className="border-t border-ink-100 my-2" />

            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    navigateToProfile(currentUser.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-ink-600 hover:bg-paper-50 transition-colors cursor-pointer"
                >
                  <User className="w-5 h-5" aria-hidden="true" />
                  My profile
                </button>
                <button
                  onClick={() => goTo('settings')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-ink-600 hover:bg-paper-50 transition-colors cursor-pointer"
                >
                  <Settings className="w-5 h-5" aria-hidden="true" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    setIsMobileMenuOpen(false);
                    setCurrentView('landing');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-err-600 hover:bg-err-100/50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-5 h-5" aria-hidden="true" />
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-full bg-ink-900 text-paper-0 font-semibold text-sm cursor-pointer"
              >
                Sign in
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
