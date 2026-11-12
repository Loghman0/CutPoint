import React, { useEffect, useRef, useState } from 'react';
import { AppProvider, useApp, AppView } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { ToastContainer } from './components/Toast';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { PublishModal } from './components/PublishModal';
import { FeedView } from './components/FeedView';
import { ExploreView } from './components/ExploreView';
import { EditDetailModal } from './components/EditDetailModal';
import { EditorProfileView } from './components/EditorProfileView';
import { ChallengesView } from './components/ChallengesView';
import { RankingsView } from './components/RankingsView';
import { SearchView } from './components/SearchView';
import { NotificationsView } from './components/NotificationsView';
import { SettingsView } from './components/SettingsView';
import { HireEditorsView } from './components/HireEditorsView';
import { AssetsMarketplaceView } from './components/AssetsMarketplaceView';
import { EditBattlesView } from './components/EditBattlesView';

const VIEW_TITLES: Record<AppView, string> = {
  landing: 'CutPoint',
  feed: 'Feed',
  explore: 'Explore',
  challenges: 'Challenges',
  'challenge-detail': 'Challenge',
  rankings: 'Rankings',
  search: 'Search',
  notifications: 'Notifications',
  profile: 'Profile',
  'edit-detail': 'Edit',
  settings: 'Settings',
  hire: 'Hire Editors',
  marketplace: 'Assets',
  battles: 'Edit Battles',
};

const MainContent: React.FC = () => {
  const { currentView } = useApp();
  const [announcement, setAnnouncement] = useState('');
  const isFirstRender = useRef(true);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = VIEW_TITLES[currentView] ?? 'CutPoint';
    document.title = currentView === 'landing' ? 'CutPoint - The Home for Video Editors' : `${title} - CutPoint`;

    // Announce the new view to screen reader users on navigation (skip the
    // very first mount, since that's not a user-triggered navigation) and
    // move focus to the page heading so keyboard/AT users land somewhere
    // sensible instead of staying on the nav control they just activated.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setAnnouncement(`Navigated to ${title}`);
    headingRef.current?.focus();
  }, [currentView]);

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <main id="main-content" className="min-h-screen">
        {/* Focus target for route changes; not visually rendered. */}
        <div ref={headingRef} tabIndex={-1} className="sr-only" aria-hidden="true" />
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'feed' && <FeedView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'edit-detail' && <EditDetailModal />}
        {currentView === 'profile' && <EditorProfileView />}
        {(currentView === 'challenges' || currentView === 'challenge-detail') && <ChallengesView />}
        {currentView === 'rankings' && <RankingsView />}
        {currentView === 'search' && <SearchView />}
        {currentView === 'notifications' && <NotificationsView />}
        {currentView === 'settings' && <SettingsView />}
        {currentView === 'hire' && <HireEditorsView />}
        {currentView === 'marketplace' && <AssetsMarketplaceView />}
        {currentView === 'battles' && <EditBattlesView />}
      </main>
    </>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-paper-0 text-ink-900 font-sans">
        <Navbar />
        <MainContent />
        <MobileNav />
        <AuthModal />
        <OnboardingModal />
        <PublishModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}

export default App;
