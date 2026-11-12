import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Flame, Compass, Plus, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView, currentUser, setIsAuthModalOpen, setIsPublishModalOpen, navigateToProfile } =
    useApp();

  const linkClass = (active: boolean) =>
    `flex flex-col items-center gap-1 py-1.5 px-2 min-w-11 text-[11px] font-medium transition-colors cursor-pointer rounded-md ${
      active ? 'text-signal-600' : 'text-ink-500 hover:text-ink-800'
    }`;

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper-0/95 backdrop-blur-xl border-t border-paper-100 px-2 pb-[env(safe-area-inset-bottom)] pt-2 flex items-center justify-around"
    >
      <button onClick={() => setCurrentView('landing')} aria-current={currentView === 'landing' ? 'page' : undefined} className={linkClass(currentView === 'landing')}>
        <Home className="w-5 h-5" aria-hidden="true" />
        Home
      </button>

      <button onClick={() => setCurrentView('feed')} aria-current={currentView === 'feed' ? 'page' : undefined} className={linkClass(currentView === 'feed')}>
        <Flame className="w-5 h-5" aria-hidden="true" />
        Feed
      </button>

      <button
        onClick={() => {
          if (currentUser) setIsPublishModalOpen(true);
          else setIsAuthModalOpen(true);
        }}
        aria-label="Publish a new edit"
        className="w-12 h-12 rounded-full bg-signal-600 text-paper-0 flex items-center justify-center shadow-lg -mt-3 active:scale-90 transition-transform cursor-pointer"
      >
        <Plus className="w-6 h-6" strokeWidth={3} aria-hidden="true" />
      </button>

      <button onClick={() => setCurrentView('explore')} aria-current={currentView === 'explore' ? 'page' : undefined} className={linkClass(currentView === 'explore')}>
        <Compass className="w-5 h-5" aria-hidden="true" />
        Explore
      </button>

      <button
        onClick={() => {
          if (currentUser) navigateToProfile(currentUser.id);
          else setIsAuthModalOpen(true);
        }}
        aria-current={currentView === 'profile' ? 'page' : undefined}
        className={linkClass(currentView === 'profile')}
      >
        <User className="w-5 h-5" aria-hidden="true" />
        Profile
      </button>
    </nav>
  );
};
