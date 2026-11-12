import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EditCard } from './EditCard';
import { Search, User, Scissors } from 'lucide-react';
import { LevelPill } from './ui/primitives';

export const SearchView: React.FC = () => {
  const { searchQuery, setSearchQuery, edits, editors, navigateToProfile } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'edits' | 'editors'>('all');

  const q = searchQuery.toLowerCase().trim();

  const matchingEdits = edits.filter((e) => {
    if (!q) return true;
    return (
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q)) ||
      e.software.some((sw) => sw.toLowerCase().includes(q)) ||
      e.editor.username.toLowerCase().includes(q)
    );
  });

  const matchingEditors = editors.filter((ed) => {
    if (!q) return true;
    return (
      ed.name.toLowerCase().includes(q) ||
      ed.username.toLowerCase().includes(q) ||
      ed.specialties.some((s) => s.toLowerCase().includes(q)) ||
      ed.software.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="bg-paper-50/60 border-b border-ink-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900">Search CutPoint</h1>

          <div role="search">
            <label htmlFor="main-search" className="sr-only">
              Search edits, editors, and tags
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
              <input
                id="main-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search edits, editors, tags (#aftereffects, #cyberpunk)..."
                className="w-full bg-paper-0 text-ink-900 text-base rounded-full pl-12 pr-4 py-3.5 border border-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus:border-signal-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="text-ink-400 self-center">Popular:</span>
            {['After Effects', 'DaVinci Resolve', 'Gaming', 'Cyberpunk', 'Speed Ramping', 'Velocity'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-full bg-paper-50 hover:bg-paper-100 text-ink-600 border border-ink-100 cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div role="tablist" aria-label="Result type" className="flex items-center gap-2 border-b border-ink-100 pb-4 mb-8">
          {(
            [
              { id: 'all', label: `All Results (${matchingEdits.length + matchingEditors.length})` },
              { id: 'edits', label: `Edits (${matchingEdits.length})` },
              { id: 'editors', label: `Editors (${matchingEditors.length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                activeTab === tab.id ? 'bg-signal-600 text-paper-0' : 'bg-paper-50 text-ink-500 hover:text-ink-800 border border-ink-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {(activeTab === 'all' || activeTab === 'editors') && matchingEditors.length > 0 && (
            <section aria-labelledby="matching-editors-heading">
              <h2 id="matching-editors-heading" className="text-lg font-bold text-ink-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-signal-600" aria-hidden="true" />
                Matching editors ({matchingEditors.length})
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-none">
                {matchingEditors.map((editor) => (
                  <li key={editor.id}>
                    <button
                      onClick={() => navigateToProfile(editor.id)}
                      className="w-full p-4 rounded-md bg-paper-50 border border-ink-100 hover:border-ink-300 transition-colors cursor-pointer flex items-center gap-3 text-left"
                    >
                      <img src={editor.avatar} alt="" className="w-12 h-12 rounded-full object-cover bg-paper-100" />
                      <div className="truncate">
                        <h3 className="font-bold text-ink-900 text-sm truncate">{editor.name}</h3>
                        <p className="text-xs text-ink-400">@{editor.username}</p>
                        <LevelPill level={editor.level} className="mt-1" />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(activeTab === 'all' || activeTab === 'edits') && matchingEdits.length > 0 && (
            <section aria-labelledby="matching-edits-heading">
              <h2 id="matching-edits-heading" className="text-lg font-bold text-ink-900 mb-4 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-signal-600" aria-hidden="true" />
                Matching edits ({matchingEdits.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchingEdits.map((edit) => (
                  <EditCard key={edit.id} edit={edit} />
                ))}
              </div>
            </section>
          )}

          {matchingEdits.length === 0 && matchingEditors.length === 0 && (
            <div className="text-center py-20 bg-paper-50/60 rounded-lg border border-ink-100 p-8 max-w-md mx-auto">
              {searchQuery.trim() ? (
                <>
                  <p className="text-lg font-bold text-ink-900">No results found for &quot;{searchQuery}&quot;</p>
                  <p className="text-sm text-ink-500 mt-1">Try searching for software like After Effects or category names like Gaming.</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-ink-900">Nothing to search yet</p>
                  <p className="text-sm text-ink-500 mt-1">Once editors and edits are on the platform, you'll be able to search them here.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
