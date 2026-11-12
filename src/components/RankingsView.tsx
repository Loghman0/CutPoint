import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Crown, Users } from 'lucide-react';
import { Button, EmptyState, LevelPill } from './ui/primitives';

export const RankingsView: React.FC = () => {
  const { editors, toggleFollowEditor, navigateToProfile } = useApp();

  const [tab, setTab] = useState<'Global' | 'Weekly' | 'Monthly' | 'Rising'>('Global');

  const sortedEditors = [...editors].sort((a, b) => b.level - a.level);
  const [top1, top2, top3] = sortedEditors;

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="relative border-b border-ink-100 bg-paper-50/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">Editor leaderboard</h1>
          <p className="text-ink-500 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Recognizing the top video editors based on quality of edits, view counts, challenge
            trophies, and peer upvotes.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div role="tablist" aria-label="Leaderboard period" className="flex items-center justify-center gap-2 border-b border-ink-100 pb-4 mb-12 overflow-x-auto">
          {(['Global', 'Weekly', 'Monthly', 'Rising'] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                tab === t ? 'bg-ink-900 text-paper-0' : 'bg-paper-50 text-ink-500 hover:text-ink-800 border border-ink-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {editors.length === 0 ? (
          <EmptyState
            icon={<Users className="w-5 h-5" />}
            title="No editors ranked yet"
            description="Once editors publish work and earn reputation, the leaderboard will populate here."
          />
        ) : (
          <>
            {top1 && top2 && top3 && (
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 items-end list-none">
                <li className="relative p-6 rounded-lg bg-paper-50 border border-ink-100 hover:border-ink-300 transition-colors text-center order-2 md:order-1">
                  <div className="w-9 h-9 rounded-full bg-ink-200 text-ink-800 font-bold text-sm flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                    2
                  </div>
                  <img src={top2.avatar} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 bg-paper-100" />
                  <h2 className="font-semibold text-ink-900 text-lg">
                    <button onClick={() => navigateToProfile(top2.id)} className="after:absolute after:inset-0 hover:text-signal-600 transition-colors cursor-pointer">
                      {top2.name}
                    </button>
                  </h2>
                  <p className="text-xs text-ink-400">@{top2.username}, rank 2</p>
                  <div className="mt-4 pt-3 border-t border-ink-100 flex justify-between text-xs">
                    <span className="font-semibold text-ink-600">Lvl {top2.level}</span>
                    <span className="text-ink-400">{top2.totalViews.toLocaleString()} views</span>
                  </div>
                </li>

                <li className="relative p-8 rounded-lg bg-paper-50 border-2 border-signal-400 text-center order-1 md:order-2 -mt-4 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-signal-600" aria-hidden="true" />
                  <Crown className="w-8 h-8 text-signal-500 mx-auto mb-2" aria-hidden="true" />
                  <div className="w-12 h-12 rounded-full bg-signal-600 text-paper-0 font-bold text-base flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                    1
                  </div>
                  <img
                    src={top1.avatar}
                    alt=""
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-signal-200 bg-paper-100"
                  />
                  <h2 className="font-semibold text-ink-900 text-xl">
                    <button onClick={() => navigateToProfile(top1.id)} className="after:absolute after:inset-0 hover:text-signal-600 transition-colors cursor-pointer">
                      {top1.name}
                    </button>
                  </h2>
                  <p className="text-xs text-signal-600 font-semibold">@{top1.username}, rank 1</p>
                  <div className="mt-4 pt-3 border-t border-signal-200 flex justify-between text-xs">
                    <span className="font-semibold text-signal-700">
                      Lvl {top1.level} ({top1.percentileRank})
                    </span>
                    <span className="text-ink-500">{top1.totalViews.toLocaleString()} views</span>
                  </div>
                </li>

                <li className="relative p-6 rounded-lg bg-paper-50 border border-ink-100 hover:border-ink-300 transition-colors text-center order-3">
                  <div className="w-9 h-9 rounded-full bg-ink-100 text-ink-700 font-bold text-sm flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                    3
                  </div>
                  <img src={top3.avatar} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 bg-paper-100" />
                  <h2 className="font-semibold text-ink-900 text-lg">
                    <button onClick={() => navigateToProfile(top3.id)} className="after:absolute after:inset-0 hover:text-signal-600 transition-colors cursor-pointer">
                      {top3.name}
                    </button>
                  </h2>
                  <p className="text-xs text-ink-400">@{top3.username}, rank 3</p>
                  <div className="mt-4 pt-3 border-t border-ink-100 flex justify-between text-xs">
                    <span className="font-semibold text-ink-600">Lvl {top3.level}</span>
                    <span className="text-ink-400">{top3.totalViews.toLocaleString()} views</span>
                  </div>
                </li>
              </ul>
            )}

            <div className="bg-paper-50 border border-ink-100 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-ink-600">
                  <caption className="sr-only">Full editor leaderboard, ranked by level</caption>
                  <thead className="bg-paper-0 text-[11px] uppercase font-semibold tracking-wider text-ink-400 border-b border-ink-100">
                    <tr>
                      <th scope="col" className="py-4 px-6">Rank</th>
                      <th scope="col" className="py-4 px-6">Editor</th>
                      <th scope="col" className="py-4 px-6">Level and rank</th>
                      <th scope="col" className="py-4 px-6">Total views</th>
                      <th scope="col" className="py-4 px-6">Trophies</th>
                      <th scope="col" className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {sortedEditors.map((editor, idx) => (
                      <tr key={editor.id} className="hover:bg-paper-100/60 transition-colors">
                        <th scope="row" className="py-4 px-6 font-semibold text-ink-400 font-normal">#{idx + 1}</th>

                        <td className="py-4 px-6">
                          <div className="relative flex items-center gap-3 group w-fit">
                            <img src={editor.avatar} alt="" className="w-10 h-10 rounded-full object-cover bg-paper-100" />
                            <div>
                              <p className="font-semibold text-ink-900">
                                <button
                                  onClick={() => navigateToProfile(editor.id)}
                                  className="after:absolute after:inset-0 hover:text-signal-600 transition-colors cursor-pointer"
                                >
                                  {editor.name}
                                </button>
                              </p>
                              <p className="text-xs text-ink-400">@{editor.username}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <LevelPill level={editor.level} />
                            <span className="text-xs text-ink-400">{editor.percentileRank}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6 font-semibold text-ink-700 tabular-num">
                          {editor.totalViews.toLocaleString()}
                        </td>

                        <td className="py-4 px-6">
                          <span className="font-semibold text-signal-600 flex items-center gap-1">
                            <Trophy className="w-4 h-4" aria-hidden="true" />
                            {editor.challengeWins} wins
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <Button
                            size="sm"
                            variant={editor.isFollowing ? 'secondary' : 'primary'}
                            onClick={() => toggleFollowEditor(editor.id)}
                            aria-pressed={editor.isFollowing}
                          >
                            {editor.isFollowing ? 'Following' : 'Follow'}
                            <span className="sr-only"> {editor.name}</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
