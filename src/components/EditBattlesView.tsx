import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Swords, Check } from 'lucide-react';
import { EmptyState, Panel } from './ui/primitives';

export const EditBattlesView: React.FC = () => {
  const { addToast, editBattles } = useApp();

  const [localVotes, setLocalVotes] = useState<Record<string, { a: number; b: number; voted: 'A' | 'B' | null }>>(
    {}
  );

  const getVotes = (battleId: string, initialA: number, initialB: number) =>
    localVotes[battleId] || { a: initialA, b: initialB, voted: null };

  const handleVote = (battleId: string, choice: 'A' | 'B', initialA: number, initialB: number) => {
    setLocalVotes((prev) => {
      const current = prev[battleId] || { a: initialA, b: initialB, voted: null };
      if (current.voted === choice) return prev;

      let { a, b } = current;
      if (choice === 'A') {
        a += 1;
        if (current.voted === 'B') b -= 1;
      } else {
        b += 1;
        if (current.voted === 'A') a -= 1;
      }

      return { ...prev, [battleId]: { a, b, voted: choice } };
    });
  };

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="bg-paper-50/60 border-b border-ink-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">1v1 edit battles</h1>
          <p className="text-ink-500 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Two editors use the exact same raw footage pack. The community votes for the winner.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {editBattles.length === 0 ? (
          <EmptyState
            icon={<Swords className="w-5 h-5" />}
            title="No battles live right now"
            description="When two editors go head-to-head with the same footage pack, it will show up here for the community to vote on."
          />
        ) : (
          <div className="space-y-8">
            {editBattles.map((battle) => {
              const votes = getVotes(battle.id, battle.editorA.votes, battle.editorB.votes);
              const total = Math.max(votes.a + votes.b, 1);
              const pctA = Math.round((votes.a / total) * 100);
              const pctB = 100 - pctA;

              return (
                <Panel key={battle.id} className="p-8 space-y-8">
                  <div className="text-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-signal-600">
                      {battle.status === 'Live' ? 'Live battle' : 'Ended'}
                    </span>
                    <h2 className="text-2xl font-bold text-ink-900 mt-1">{battle.title}</h2>
                    <p className="text-xs text-ink-400 mt-1">Ends in {battle.endsIn}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-signal-600">
                        @{battle.editorA.editor.username} ({pctA}%)
                      </span>
                      <span className="text-sky-600">
                        @{battle.editorB.editor.username} ({pctB}%)
                      </span>
                    </div>
                    <div
                      role="img"
                      aria-label={`@${battle.editorA.editor.username} has ${pctA}% of votes, @${battle.editorB.editor.username} has ${pctB}%`}
                      className="w-full h-3 bg-paper-100 rounded-full overflow-hidden flex border border-ink-100"
                    >
                      <div className="h-full bg-signal-600 transition-all duration-300" style={{ width: `${pctA}%` }} />
                      <div className="h-full bg-sky-500 transition-all duration-300" style={{ width: `${pctB}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-md bg-paper-0 border border-ink-100 space-y-4 text-center">
                      <img src={battle.editorA.edit.thumbnailUrl} alt="" className="w-full aspect-video object-cover rounded-md" />
                      <div>
                        <h3 className="font-semibold text-ink-900 text-base">@{battle.editorA.editor.username}</h3>
                        <p className="text-xs text-ink-400">{battle.editorA.edit.title}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleVote(battle.id, 'A', battle.editorA.votes, battle.editorB.votes);
                          addToast(`Voted for @${battle.editorA.editor.username}`);
                        }}
                        aria-pressed={votes.voted === 'A'}
                        className={`w-full py-3 rounded-full font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                          votes.voted === 'A' ? 'bg-signal-600 text-paper-0' : 'bg-paper-100 text-ink-600 hover:bg-ink-100'
                        }`}
                      >
                        {votes.voted === 'A' && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                        {votes.voted === 'A' ? `Voted for @${battle.editorA.editor.username}` : `Vote for @${battle.editorA.editor.username}`}
                      </button>
                    </div>

                    <div className="p-5 rounded-md bg-paper-0 border border-ink-100 space-y-4 text-center">
                      <img src={battle.editorB.edit.thumbnailUrl} alt="" className="w-full aspect-video object-cover rounded-md" />
                      <div>
                        <h3 className="font-semibold text-ink-900 text-base">@{battle.editorB.editor.username}</h3>
                        <p className="text-xs text-ink-400">{battle.editorB.edit.title}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleVote(battle.id, 'B', battle.editorA.votes, battle.editorB.votes);
                          addToast(`Voted for @${battle.editorB.editor.username}`);
                        }}
                        aria-pressed={votes.voted === 'B'}
                        className={`w-full py-3 rounded-full font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                          votes.voted === 'B' ? 'bg-sky-500 text-paper-0' : 'bg-paper-100 text-ink-600 hover:bg-ink-100'
                        }`}
                      >
                        {votes.voted === 'B' && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                        {votes.voted === 'B' ? `Voted for @${battle.editorB.editor.username}` : `Vote for @${battle.editorB.editor.username}`}
                      </button>
                    </div>
                  </div>
                </Panel>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
