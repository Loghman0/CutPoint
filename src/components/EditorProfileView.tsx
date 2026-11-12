import React, { useId, useState } from 'react';
import { useApp } from '../context/AppContext';
import { EditCard } from './EditCard';
import { ShieldCheck, Trophy, Eye, Users, Zap, Layers, Share2, MapPin, UserX, Clapperboard } from 'lucide-react';
import { Badge, Button, EmptyState, IconButton, Panel, StatBlock } from './ui/primitives';

const TABS = [
  { id: 'featured', label: 'Featured Work' },
  { id: 'edits', label: 'All Edits' },
  { id: 'skills', label: 'Skills & Software' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'about', label: 'About & Hardware' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export const EditorProfileView: React.FC = () => {
  const { selectedEditor, currentUser, edits, toggleFollowEditor, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<TabId>('featured');
  const panelId = useId();

  const profileUser = selectedEditor || currentUser;

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-paper-0 text-ink-800 flex items-center justify-center px-4">
        <EmptyState
          icon={<UserX className="w-5 h-5" />}
          title="Profile not found"
          description="This editor doesn't exist or hasn't set up their profile yet."
        />
      </div>
    );
  }

  const isSelf = currentUser && currentUser.id === profileUser.id;

  const userEdits = edits.filter((e) => e.editorId === profileUser.id || e.editor.username === profileUser.username);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Profile link copied');
  };

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="relative h-40 sm:h-56 md:h-72 w-full overflow-hidden bg-paper-100 border-b border-ink-100">
        {profileUser.banner && <img src={profileUser.banner} alt="" className="w-full h-full object-cover opacity-75" />}
        <div className="absolute inset-0 bg-gradient-to-t from-paper-0 via-paper-0/50 to-transparent" aria-hidden="true" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-16 relative z-20">
        <Panel className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                <img src={profileUser.avatar} alt="" className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border-4 border-paper-50 bg-paper-100" />
                {profileUser.availableForHire && (
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-ok-600 border-2 border-paper-50" aria-hidden="true" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-ink-900">
                    {profileUser.name}
                    {profileUser.availableForHire && <span className="sr-only">, available for hire</span>}
                  </h1>
                  {profileUser.isVerified && (
                    <>
                      <ShieldCheck className="w-5 h-5 text-signal-600" aria-hidden="true" />
                      <span className="sr-only">Verified editor</span>
                    </>
                  )}
                  <span className="px-3 py-1 rounded-full bg-signal-600 text-paper-0 font-bold text-xs">Level {profileUser.level}</span>
                  <Badge className="normal-case font-semibold">{profileUser.percentileRank}</Badge>
                </div>

                <p className="text-signal-600 text-sm mt-1">@{profileUser.username}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {profileUser.specialties.map((spec) => (
                    <Badge key={spec} className="normal-case font-medium">
                      {spec}
                    </Badge>
                  ))}
                  {profileUser.location && (
                    <span className="flex items-center gap-1 text-xs text-ink-400 ml-1">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      {profileUser.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {!isSelf && (
                <>
                  <Button
                    variant={profileUser.isFollowing ? 'secondary' : 'primary'}
                    size="lg"
                    className="flex-1 md:flex-none"
                    onClick={() => toggleFollowEditor(profileUser.id)}
                    aria-pressed={profileUser.isFollowing}
                  >
                    {profileUser.isFollowing ? 'Following' : 'Follow editor'}
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1 md:flex-none"
                    onClick={() => addToast(`Contact request sent to @${profileUser.username}`)}
                  >
                    Hire / Contact
                  </Button>
                </>
              )}

              <IconButton label="Copy link to this profile" onClick={handleShare} className="bg-paper-100 hover:bg-ink-100 border border-ink-200">
                <Share2 className="w-4 h-4" aria-hidden="true" />
              </IconButton>
            </div>
          </div>

          <ul className="mt-8 pt-6 border-t border-ink-100 grid grid-cols-2 sm:grid-cols-4 gap-3 list-none">
            {[
              { icon: Eye, label: 'Total Views', value: profileUser.totalViews.toLocaleString() },
              { icon: Layers, label: 'Published Edits', value: profileUser.editsCount },
              { icon: Users, label: 'Followers', value: profileUser.followersCount.toLocaleString() },
              { icon: Trophy, label: 'Challenge Wins', value: profileUser.challengeWins },
            ].map((s) => (
              <li key={s.label} className="p-4 rounded-md bg-paper-0 border border-ink-100 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-400 mb-1.5 uppercase tracking-wide">
                  <s.icon className="w-3.5 h-3.5 text-signal-600" aria-hidden="true" />
                  {s.label}
                </div>
                <span className="text-xl font-bold text-ink-900 tabular-num">{s.value}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <div role="tablist" aria-label="Profile sections" className="mt-8 border-b border-ink-100 flex items-center gap-1 overflow-x-auto [scrollbar-width:none]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              id={`${panelId}-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`${panelId}-panel`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-bold text-sm transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id ? 'border-signal-600 text-signal-600' : 'border-transparent text-ink-400 hover:text-ink-700'
              }`}
            >
              {tab.label}
              {tab.id === 'edits' && ` (${userEdits.length})`}
              {tab.id === 'achievements' && ` (${profileUser.achievements.length})`}
            </button>
          ))}
        </div>

        <div id={`${panelId}-panel`} role="tabpanel" aria-labelledby={`${panelId}-tab-${activeTab}`} className="mt-8">
          {(activeTab === 'featured' || activeTab === 'edits') &&
            (userEdits.length === 0 ? (
              <EmptyState
                icon={<Clapperboard className="w-5 h-5" />}
                title="No edits published yet"
                description={isSelf ? 'Publish your first edit to start building your portfolio.' : `@${profileUser.username} hasn't published any edits yet.`}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {userEdits.map((edit) => (
                  <EditCard key={edit.id} edit={edit} />
                ))}
              </div>
            ))}

          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Panel className="p-6 space-y-5">
                <h2 className="text-base font-bold text-ink-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-signal-600" aria-hidden="true" />
                  Editing mastery ratings
                </h2>

                {profileUser.skills.length === 0 ? (
                  <p className="text-sm text-ink-400">No skills added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {profileUser.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-ink-700">{skill.name}</span>
                          <span className="text-signal-600">{skill.level}%</span>
                        </div>
                        <div
                          role="progressbar"
                          aria-label={skill.name}
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          className="w-full h-1.5 rounded-full bg-paper-0 overflow-hidden border border-ink-100"
                        >
                          <div className="h-full rounded-full bg-signal-600" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel className="p-6 space-y-5">
                <h2 className="text-base font-bold text-ink-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-signal-600" aria-hidden="true" />
                  Primary software suite
                </h2>

                {profileUser.software.length === 0 ? (
                  <p className="text-sm text-ink-400">No software listed yet.</p>
                ) : (
                  <ul className="grid grid-cols-2 gap-2.5 list-none">
                    {profileUser.software.map((sw) => (
                      <li key={sw} className="p-3.5 rounded-md bg-paper-0 border border-ink-100 flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-signal-600" aria-hidden="true" />
                        <span className="font-semibold text-sm text-ink-700">{sw}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>
          )}

          {activeTab === 'achievements' &&
            (profileUser.achievements.length === 0 ? (
              <EmptyState
                icon={<Trophy className="w-5 h-5" />}
                title="No achievements yet"
                description="Achievements are earned through challenge wins, milestones, and community recognition."
              />
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
                {profileUser.achievements.map((badge) => (
                  <li key={badge.id}>
                    <Panel hover className="p-6 flex items-start gap-4 h-full">
                      <div className="text-3xl w-14 h-14 flex items-center justify-center rounded-md bg-paper-0 border border-ink-100 shrink-0" aria-hidden="true">
                        {badge.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-ink-900 text-base">{badge.title}</h3>
                          <Badge tone="warn">{badge.rarity || 'Epic'}</Badge>
                        </div>
                        <p className="text-xs text-ink-500 mt-1 leading-relaxed">{badge.description}</p>
                      </div>
                    </Panel>
                  </li>
                ))}
              </ul>
            ))}

          {activeTab === 'about' && (
            <Panel className="p-8 max-w-3xl space-y-6">
              <div>
                <h2 className="text-base font-bold text-ink-900 mb-2">Biography</h2>
                <p className="text-ink-600 text-sm leading-relaxed whitespace-pre-line">{profileUser.bio || 'No biography added yet.'}</p>
              </div>

              <div className="pt-5 border-t border-ink-100">
                <h2 className="text-base font-bold text-ink-900 mb-3">Availability and commission info</h2>
                <div className="p-4 rounded-md bg-paper-0 border border-ink-100 flex items-center justify-between flex-wrap gap-3">
                  <StatBlock label="Starting rate" value={profileUser.startingPrice ? `$${profileUser.startingPrice} / edit` : 'Not set'} />
                  {profileUser.availableForHire ? <Badge tone="ok">Available for commissions</Badge> : <Badge tone="neutral">Not currently available</Badge>}
                </div>
              </div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
};
