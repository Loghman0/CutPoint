import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EditCategory, AspectRatio } from '../types';
import { EditCard } from './EditCard';
import { Filter, Clapperboard } from 'lucide-react';
import { Button, EmptyState } from './ui/primitives';
import { motion, useReducedMotion, Variants } from 'framer-motion';

const FEED_TABS = [
  { id: 'foryou', label: 'For You' },
  { id: 'following', label: 'Following' },
  { id: 'trending', label: 'Trending' },
  { id: 'new', label: 'New' },
] as const;

const CATEGORY_PILLS: (EditCategory | 'All')[] = [
  'All',
  'Gaming',
  'Anime',
  'Sports',
  'Cinematic',
  'Cars',
  'Music',
  'Motion Design',
  'Short-form',
  'VFX',
];

export const FeedView: React.FC = () => {
  const { edits, selectedCategory, setSelectedCategory, currentUser, setIsPublishModalOpen, setIsAuthModalOpen } =
    useApp();
  const prefersReducedMotion = useReducedMotion();

  const [activeTab, setActiveTab] = useState<'foryou' | 'following' | 'trending' | 'new'>('foryou');
  const [aspectFilter, setAspectFilter] = useState<'All' | AspectRatio>('All');

  let filteredEdits = edits.filter((e) => {
    if (selectedCategory !== 'All' && e.category !== selectedCategory) return false;
    if (aspectFilter !== 'All' && e.aspectRatio !== aspectFilter) return false;
    if (activeTab === 'following' && !e.editor.isVerified) return true;
    return true;
  });

  if (activeTab === 'trending') {
    filteredEdits = [...filteredEdits].sort((a, b) => b.likesCount - a.likesCount);
  } else if (activeTab === 'new') {
    filteredEdits = [...filteredEdits].reverse();
  }

  const containerVariants: Variants = prefersReducedMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } } };

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-24 lg:pb-12">
      <div className="sticky top-16 z-30 bg-paper-0/95 backdrop-blur-xl border-b border-ink-100 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div role="tablist" aria-label="Feed sort" className="flex items-center gap-1 bg-paper-50 p-1 rounded-full border border-ink-100 w-full sm:w-auto overflow-x-auto">
            {FEED_TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-signal-600 text-paper-0' : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span id="orientation-label" className="text-xs text-ink-400 font-semibold hidden md:inline">
              Orientation:
            </span>
            <div role="group" aria-labelledby="orientation-label" className="flex items-center gap-1 bg-paper-50 p-1 rounded-full border border-ink-100 text-xs font-semibold">
              {(['All', '16:9', '9:16'] as const).map((val) => (
                <button
                  key={val}
                  aria-pressed={aspectFilter === val}
                  onClick={() => setAspectFilter(val)}
                  className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    aspectFilter === val ? 'bg-paper-100 text-signal-600' : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {val === '9:16' ? '9:16 Short' : val}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div role="group" aria-label="Filter by category" className="max-w-[1400px] mx-auto mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {CATEGORY_PILLS.map((cat) => (
            <button
              key={cat}
              aria-pressed={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-signal-600 border-signal-600 text-paper-0 font-bold'
                  : 'bg-paper-50 text-ink-500 hover:text-ink-700 border-ink-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {filteredEdits.length === 0 && edits.length === 0 ? (
          <EmptyState
            icon={<Clapperboard className="w-5 h-5" />}
            title="No edits published yet"
            description="Once editors start publishing, their work will show up here in the feed."
            action={<Button onClick={() => (currentUser ? setIsPublishModalOpen(true) : setIsAuthModalOpen(true))}>Publish the first edit</Button>}
          />
        ) : filteredEdits.length === 0 ? (
          <div className="text-center py-20 bg-paper-50 rounded-lg border border-ink-100 p-8 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-signal-100 text-signal-600 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
              <Filter className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-ink-900">No edits found</h2>
            <p className="text-sm text-ink-500 mt-2">Try switching your category or orientation filter to discover more work.</p>
            <Button
              className="mt-6"
              onClick={() => {
                setSelectedCategory('All');
                setAspectFilter('All');
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none"
          >
            {filteredEdits.map((edit) => (
              <motion.li key={edit.id} variants={itemVariants}>
                <EditCard edit={edit} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
};
