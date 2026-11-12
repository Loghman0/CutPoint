import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Clock, Download, ArrowLeft, CheckCircle2, Users, ArrowRight } from 'lucide-react';
import { Badge, Button, EmptyState, Panel, StatBlock } from './ui/primitives';

const ChallengeDetail: React.FC = () => {
  const { selectedChallenge, setSelectedChallenge, setCurrentView, currentUser, setIsAuthModalOpen, addToast } =
    useApp();

  if (!selectedChallenge) return null;
  const c = selectedChallenge;

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="sticky top-16 z-30 bg-paper-0/95 backdrop-blur-xl border-b border-ink-100 px-4 py-3">
        <div className="max-w-[1400px] mx-auto">
          <button
            onClick={() => {
              setSelectedChallenge(null);
              setCurrentView('challenges');
            }}
            className="flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-ink-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to challenges
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <div className="relative rounded-md overflow-hidden border border-ink-100 aspect-[21/9] bg-paper-50">
          <img src={c.bannerUrl} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper-0 via-paper-0/30 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 right-6">
            <Badge tone={c.status === 'Active' ? 'accent' : 'neutral'}>{c.status}</Badge>
            <h1 className="text-2xl sm:text-4xl font-bold text-ink-900 mt-3">{c.theme}</h1>
            <p className="text-ink-600 text-sm mt-1">{c.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Panel className="p-6">
              <h2 className="text-base font-bold text-ink-900 mb-2">Brief</h2>
              <p className="text-ink-600 text-sm leading-relaxed">{c.description}</p>
            </Panel>

            <Panel className="p-6">
              <h2 className="text-base font-bold text-ink-900 mb-3">Rules</h2>
              <ul className="space-y-2">
                {c.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink-600">
                    <CheckCircle2 className="w-4 h-4 text-signal-600 mt-0.5 shrink-0" aria-hidden="true" />
                    {rule}
                  </li>
                ))}
              </ul>
            </Panel>

            {c.providedFootageUrl && (
              <Panel className="p-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-base font-bold text-ink-900">Official footage pack</h2>
                  <p className="text-xs text-ink-400 mt-1">Required to enter this challenge</p>
                </div>
                <Button variant="secondary" onClick={() => addToast('Footage pack download started')}>
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download pack
                </Button>
              </Panel>
            )}
          </div>

          <div className="space-y-6">
            <Panel className="p-6 grid grid-cols-2 gap-4">
              <StatBlock label="Prize pool" value={c.prizePool} />
              <StatBlock label="Participants" value={c.participantsCount} />
              <StatBlock label="Ends in" value={c.daysRemaining > 0 ? `${c.daysRemaining}d` : 'Ended'} />
              <StatBlock label="Badge" value={c.badgeReward} />
            </Panel>

            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                if (currentUser) addToast(`Ready to submit. Publish your edit and tag "${c.title}"`);
                else setIsAuthModalOpen(true);
              }}
            >
              Submit an entry
            </Button>

            {c.winningEdits && c.winningEdits.length > 0 && (
              <Panel className="p-6">
                <h2 className="text-sm font-bold text-ink-900 mb-4 uppercase tracking-wide">Winners</h2>
                <ul className="space-y-3 list-none">
                  {c.winningEdits.map((w) => (
                    <li key={w.rank} className="flex items-center gap-3">
                      <span className="font-mono font-bold text-signal-600 w-5">#{w.rank}</span>
                      <img src={w.editor.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ink-800 truncate">{w.editor.name}</p>
                        <p className="text-[11px] text-ink-400 truncate">{w.edit.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChallengesView: React.FC = () => {
  const {
    challenges,
    navigateToChallenge,
    setIsPublishModalOpen,
    currentUser,
    setIsAuthModalOpen,
    selectedChallenge,
    currentView,
  } = useApp();

  const [filter, setFilter] = useState<'Active' | 'Upcoming' | 'Completed'>('Active');

  if (currentView === 'challenge-detail' && selectedChallenge) {
    return <ChallengeDetail />;
  }

  const filteredChallenges = challenges.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="relative border-b border-ink-100 bg-paper-50/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">Monthly edit challenges</h1>
            <p className="text-ink-500 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              Compete against editors worldwide. Download official footage packs, cut under tight
              deadlines, and claim trophies and prize pools.
            </p>
          </div>

          <Button
            size="lg"
            className="shrink-0"
            onClick={() => {
              if (currentUser) setIsPublishModalOpen(true);
              else setIsAuthModalOpen(true);
            }}
          >
            Submit challenge entry
          </Button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div role="tablist" aria-label="Challenge status" className="flex items-center gap-2 border-b border-ink-100 pb-4 mb-8">
          {(['Active', 'Upcoming', 'Completed'] as const).map((st) => (
            <button
              key={st}
              role="tab"
              aria-selected={filter === st}
              onClick={() => setFilter(st)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                filter === st
                  ? 'bg-signal-600 text-paper-0'
                  : 'bg-paper-50 text-ink-500 hover:text-ink-800 border border-ink-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {filteredChallenges.length === 0 ? (
          <EmptyState
            icon={<Trophy className="w-5 h-5" />}
            title={`No ${filter.toLowerCase()} challenges`}
            description="Check back soon, or explore a different status above."
          />
        ) : (
          <ul className="space-y-6 list-none">
            {filteredChallenges.map((challenge) => (
              <li
                key={challenge.id}
                className="group relative rounded-md bg-paper-50 border border-ink-100 overflow-hidden hover:border-signal-400 transition-colors grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="lg:col-span-5 relative aspect-video lg:aspect-auto overflow-hidden bg-paper-0">
                  <img
                    src={challenge.bannerUrl}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-paper-0 via-paper-0/20 to-transparent lg:hidden" aria-hidden="true" />
                  <span className="absolute top-4 left-4">
                    <Badge tone="accent">{challenge.status}</Badge>
                  </span>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider text-signal-600">
                        {challenge.title}
                      </span>
                      {challenge.sponsor && (
                        <span className="text-xs font-semibold text-ink-400">
                          Sponsored by <span className="text-ink-600">{challenge.sponsor}</span>
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-2">
                      <button
                        onClick={() => navigateToChallenge(challenge)}
                        className="text-left after:absolute after:inset-0 group-hover:text-signal-600 transition-colors cursor-pointer"
                      >
                        {challenge.theme}
                      </button>
                    </h2>

                    <p className="text-ink-500 text-sm mt-2 leading-relaxed">{challenge.description}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-ink-100">
                    <StatBlock label="Prize pool" value={challenge.prizePool} />
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-ink-400" aria-hidden="true" />
                      <StatBlock label="Participants" value={challenge.participantsCount} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-signal-600" aria-hidden="true" />
                      <StatBlock
                        label="Deadline"
                        value={challenge.daysRemaining > 0 ? `${challenge.daysRemaining}d left` : 'Ended'}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <span className="text-xs font-bold text-signal-600 flex items-center gap-1 group-hover:gap-2 transition-all" aria-hidden="true">
                      View details and entries
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
