import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import {
  Editor,
  EditItem,
  Challenge,
  NotificationItem,
  EditCategory,
  MarketplaceAsset,
  EditBattle
} from '../types';
import { SEED_CHALLENGES, SEED_NOTIFICATIONS, SEED_MARKETPLACE_ASSETS, SEED_EDIT_BATTLES } from '../data/seedData';

export type AppView =
  | 'landing'
  | 'feed'
  | 'explore'
  | 'challenges'
  | 'challenge-detail'
  | 'rankings'
  | 'search'
  | 'notifications'
  | 'profile'
  | 'edit-detail'
  | 'settings'
  | 'hire'
  | 'marketplace'
  | 'battles';

export interface ToastMessage {
  id: string;
  title: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation & View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedEdit: EditItem | null;
  setSelectedEdit: (edit: EditItem | null) => void;
  selectedEditor: Editor | null;
  setSelectedEditor: (editor: Editor | null) => void;
  selectedChallenge: Challenge | null;
  setSelectedChallenge: (challenge: Challenge | null) => void;

  // Current User State
  currentUser: Editor | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Editor | null>>;
  isLoggedIn: boolean;
  userRole: 'Editor' | 'Creator';
  setUserRole: (role: 'Editor' | 'Creator') => void;

  // Auth & Onboarding Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isPublishModalOpen: boolean;
  setIsPublishModalOpen: (open: boolean) => void;

  // Dark Mode
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Data Collections
  edits: EditItem[];
  editors: Editor[];
  challenges: Challenge[];
  notifications: NotificationItem[];
  marketplaceAssets: MarketplaceAsset[];
  editBattles: EditBattle[];

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: EditCategory | 'All';
  setSelectedCategory: (category: EditCategory | 'All') => void;

  // Interactions
  toggleLikeEdit: (editId: string) => void;
  toggleSaveEdit: (editId: string) => void;
  toggleFollowEditor: (editorId: string) => void;
  addComment: (editId: string, text: string) => void;
  deleteComment: (editId: string, commentId: string) => void;
  publishEdit: (newEdit: Omit<EditItem, 'id' | 'likesCount' | 'commentsCount' | 'viewsCount' | 'savesCount' | 'createdAt' | 'editor'>) => void;
  submitEditToChallenge: (editId: string, challengeId: string) => void;
  markNotificationAsRead: (notifId: string) => void;
  markAllNotificationsAsRead: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Navigation Helper
  navigateToProfile: (usernameOrId: string) => void;
  navigateToEdit: (edit: EditItem) => void;
  navigateToChallenge: (challenge: Challenge) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ── Data version guard ────────────────────────────────────────────────────────
// Bump this constant whenever the shape of persisted data changes or fake/seed
// data needs to be wiped from existing browsers. On mismatch the app clears
// all cutpoint_* keys and writes the new version so every subsequent load is
// in a clean state.
const DATA_VERSION = 'v2';
(function purgeStaleData() {
  const storedVersion = localStorage.getItem('cutpoint_data_version');
  if (storedVersion !== DATA_VERSION) {
    const keysToPurge = [
      'cutpoint_editors',
      'cutpoint_edits',
      'cutpoint_challenges',
      'cutpoint_notifications',
      'cutpoint_user',
    ];
    keysToPurge.forEach((k) => localStorage.removeItem(k));
    localStorage.setItem('cutpoint_data_version', DATA_VERSION);
  }
})();
// ─────────────────────────────────────────────────────────────────────────────

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // App-wide state, persisted to localStorage as a placeholder until a real backend is connected
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedEdit, setSelectedEdit] = useState<EditItem | null>(null);
  const [selectedEditor, setSelectedEditor] = useState<Editor | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const [editors, setEditors] = useState<Editor[]>([]);
  const [currentUser, setCurrentUser] = useState<Editor | null>(null);
  const [edits, setEdits] = useState<EditItem[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>(SEED_CHALLENGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(SEED_NOTIFICATIONS);

  const [marketplaceAssets] = useState<MarketplaceAsset[]>(SEED_MARKETPLACE_ASSETS);
  const [editBattles] = useState<EditBattle[]>(SEED_EDIT_BATTLES);

  useEffect(() => {
    let mounted = true;

    async function loadProfile(userId: string) {
      if (!mounted) return;
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (!error && data) {
        setCurrentUser({
          id: data.id,
          username: data.username,
          name: data.full_name || '',
          avatar: data.avatar_url || 'https://api.dicebear.com/9.x/notionists/svg?seed=cutpoint&backgroundColor=f7f3ee',
          banner: data.banner_url || 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&auto=format&fit=crop&q=60',
          role: data.role as 'Editor' | 'Creator' | 'Viewer',
          bio: data.bio || '',
          level: data.level || 1,
          xp: data.xp || 0,
          nextLevelXp: 1000,
          percentileRank: 'Unranked',
          specialties: data.specialties || [],
          software: data.software || [],
          skills: [],
          achievements: [],
          followersCount: 0,
          followingCount: 0,
          totalViews: 0,
          totalLikes: 0,
          editsCount: 0,
          challengeWins: 0,
          battleWins: 0,
          isVerified: data.is_verified || false,
          availableForHire: data.available_for_hire || false,
        });
      }
    }

    async function loadPlatformData() {
      if (!mounted) return;

      // Fetch top editors
      const { data: profiles } = await supabase.from('profiles').select('*').limit(20);
      if (profiles) {
        setEditors(profiles.map(p => ({
          id: p.id,
          username: p.username,
          name: p.full_name || '',
          avatar: p.avatar_url || 'https://api.dicebear.com/9.x/notionists/svg?seed=cutpoint&backgroundColor=f7f3ee',
          banner: p.banner_url || 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&auto=format&fit=crop&q=60',
          role: (p.role as Editor['role']) || 'Viewer',
          bio: p.bio || '',
          level: p.level || 1,
          percentileRank: 'Unranked',
          specialties: p.specialties || [],
          software: p.software || [],
          skills: [], achievements: [],
          followersCount: 0, followingCount: 0, totalViews: 0, totalLikes: 0, editsCount: 0, challengeWins: 0, battleWins: 0,
          isVerified: p.is_verified || false, availableForHire: p.available_for_hire || false, nextLevelXp: 1000
        })));
      }

      // Fetch edits (with author profile)
      const { data: editsData } = await supabase.from('edits').select('*, author:profiles(*)').order('created_at', { ascending: false });
      if (editsData) {
        setEdits(editsData.map(e => ({
          id: e.id,
          title: e.title,
          description: e.description || '',
          videoUrl: e.video_url,
          thumbnailUrl: e.thumbnail_url,
          aspectRatio: '16:9',
          category: (e.category as EditCategory) || 'Cinematic',
          tags: [], software: e.software || [], skills: [],
          editorId: e.author_id,
          editor: {
            name: e.author?.full_name || '',
            username: e.author?.username || 'user',
            avatar: e.author?.avatar_url || 'https://api.dicebear.com/9.x/notionists/svg?seed=cutpoint&backgroundColor=f7f3ee',
            level: e.author?.level || 1,
            percentileRank: 'Unranked',
            isVerified: e.author?.is_verified || false,
          },
          likesCount: e.likes_count || 0,
          commentsCount: 0,
          viewsCount: e.views_count || 0,
          savesCount: 0,
          createdAt: e.created_at,
        })));
      }
    }

    loadPlatformData();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EditCategory | 'All'>('All');
  const [userRole, setUserRole] = useState<'Editor' | 'Creator'>('Editor');

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cutpoint_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastIdCounter = useRef(0);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cutpoint_edits', JSON.stringify(edits));
  }, [edits]);

  useEffect(() => {
    localStorage.setItem('cutpoint_editors', JSON.stringify(editors));
  }, [editors]);

  useEffect(() => {
    localStorage.setItem('cutpoint_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cutpoint_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('cutpoint_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const addToast = (title: string, type: 'success' | 'info' | 'error' = 'success') => {
    toastIdCounter.current += 1;
    const id = `toast-${toastIdCounter.current}`;
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleLikeEdit = (editId: string) => {
    setEdits((prevEdits) =>
      prevEdits.map((e) => {
        if (e.id === editId) {
          const isLiked = !e.isLiked;
          const likesCount = isLiked ? e.likesCount + 1 : e.likesCount - 1;
          if (isLiked) addToast('Liked edit ❤️');
          return { ...e, isLiked, likesCount };
        }
        return e;
      })
    );

    if (selectedEdit && selectedEdit.id === editId) {
      setSelectedEdit((prev) => {
        if (!prev) return null;
        const isLiked = !prev.isLiked;
        return {
          ...prev,
          isLiked,
          likesCount: isLiked ? prev.likesCount + 1 : prev.likesCount - 1
        };
      });
    }
  };

  const toggleSaveEdit = (editId: string) => {
    setEdits((prevEdits) =>
      prevEdits.map((e) => {
        if (e.id === editId) {
          const isSaved = !e.isSaved;
          const savesCount = isSaved ? e.savesCount + 1 : e.savesCount - 1;
          addToast(isSaved ? 'Edit saved to bookmarks 🔖' : 'Removed from bookmarks');
          return { ...e, isSaved, savesCount };
        }
        return e;
      })
    );

    if (selectedEdit && selectedEdit.id === editId) {
      setSelectedEdit((prev) => {
        if (!prev) return null;
        const isSaved = !prev.isSaved;
        return {
          ...prev,
          isSaved,
          savesCount: isSaved ? prev.savesCount + 1 : prev.savesCount - 1
        };
      });
    }
  };

  const toggleFollowEditor = (editorId: string) => {
    setEditors((prev) =>
      prev.map((ed) => {
        if (ed.id === editorId) {
          const isFollowing = !ed.isFollowing;
          const followersCount = isFollowing ? ed.followersCount + 1 : ed.followersCount - 1;
          addToast(isFollowing ? `Now following @${ed.username}` : `Unfollowed @${ed.username}`);
          return { ...ed, isFollowing, followersCount };
        }
        return ed;
      })
    );

    if (selectedEditor && selectedEditor.id === editorId) {
      setSelectedEditor((prev) => {
        if (!prev) return null;
        const isFollowing = !prev.isFollowing;
        return {
          ...prev,
          isFollowing,
          followersCount: isFollowing ? prev.followersCount + 1 : prev.followersCount - 1
        };
      });
    }
  };

  const addComment = (editId: string, text: string) => {
    if (!text.trim() || !currentUser) return;

    setEdits((prev) =>
      prev.map((e) => {
        if (e.id === editId) {
          return {
            ...e,
            commentsCount: e.commentsCount + 1
          };
        }
        return e;
      })
    );

    addToast('Comment posted');
  };

  // commentId is part of the public signature for symmetry with addComment/UI callers;
  // comment content itself is only tracked locally in EditDetailModal, so only the count changes here.
  const deleteComment = (editId: string, commentId: string) => {
    void commentId;
    setEdits((prev) =>
      prev.map((e) => {
        if (e.id === editId) {
          return {
            ...e,
            commentsCount: Math.max(0, e.commentsCount - 1)
          };
        }
        return e;
      })
    );
    addToast('Comment deleted', 'info');
  };

  const publishEdit = (newEditData: Omit<EditItem, 'id' | 'likesCount' | 'commentsCount' | 'viewsCount' | 'savesCount' | 'createdAt' | 'editor'>) => {
    if (!currentUser) return;

    const newEdit: EditItem = {
      ...newEditData,
      id: `edit-${Date.now()}`,
      likesCount: 0,
      commentsCount: 0,
      viewsCount: 0,
      savesCount: 0,
      createdAt: 'Just now',
      isLiked: false,
      editor: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        level: currentUser.level,
        percentileRank: currentUser.percentileRank,
        isVerified: currentUser.isVerified
      }
    };

    setEdits((prev) => [newEdit, ...prev]);

    // Update currentUser edit stats & XP
    setCurrentUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        editsCount: prev.editsCount + 1,
        xp: (prev.xp || 0) + 250,
        totalViews: prev.totalViews + 1
      };
    });

    addToast('🎉 Edit published successfully!');
    setIsPublishModalOpen(false);

    // Navigate to feed
    setCurrentView('feed');
  };

  const submitEditToChallenge = (editId: string, challengeId: string) => {
    const targetChallenge = challenges.find(c => c.id === challengeId);
    setEdits((prev) =>
      prev.map((e) => {
        if (e.id === editId) {
          return {
            ...e,
            challengeId,
            challengeName: targetChallenge?.title
          };
        }
        return e;
      })
    );

    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          return {
            ...c,
            participantsCount: c.participantsCount + 1
          };
        }
        return c;
      })
    );

    addToast(`Submitted edit to ${targetChallenge?.title || 'Challenge'}!`);
  };

  const markNotificationAsRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('All notifications marked as read');
  };

  const navigateToProfile = (usernameOrId: string) => {
    const found = editors.find(
      (e) => e.id === usernameOrId || e.username.toLowerCase() === usernameOrId.toLowerCase()
    );
    if (found) {
      setSelectedEditor(found);
      setCurrentView('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentUser && (currentUser.id === usernameOrId || currentUser.username.toLowerCase() === usernameOrId.toLowerCase())) {
      setSelectedEditor(currentUser);
      setCurrentView('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToEdit = (edit: EditItem) => {
    setSelectedEdit(edit);
    setCurrentView('edit-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentView('challenge-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedEdit,
        setSelectedEdit,
        selectedEditor,
        setSelectedEditor,
        selectedChallenge,
        setSelectedChallenge,
        currentUser,
        setCurrentUser,
        isLoggedIn: !!currentUser,
        userRole,
        setUserRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isPublishModalOpen,
        setIsPublishModalOpen,
        edits,
        editors,
        challenges,
        notifications,
        marketplaceAssets,
        editBattles,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        toggleLikeEdit,
        toggleSaveEdit,
        toggleFollowEditor,
        addComment,
        deleteComment,
        publishEdit,
        submitEditToChallenge,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toasts,
        addToast,
        removeToast,
        navigateToProfile,
        navigateToEdit,
        navigateToChallenge,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
