import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Users } from 'lucide-react';
import { Badge, Button, EmptyState, LevelPill, Panel } from './ui/primitives';
import { EditCategory } from '../types';

const STYLE_FILTERS = ['All', 'Gaming', 'Motion Design', 'Anime', 'Sports', 'Short-form'] as const;
type StyleFilter = (typeof STYLE_FILTERS)[number];

export const HireEditorsView: React.FC = () => {
  const { editors, addToast } = useApp();

  const [selectedStyle, setSelectedStyle] = useState<StyleFilter>('All');
  const [maxRate, setMaxRate] = useState<number>(500);

  const availableEditors = editors.filter((ed) => ed.availableForHire);

  const filtered = availableEditors.filter((ed) => {
    if (selectedStyle !== 'All' && !ed.specialties.includes(selectedStyle as EditCategory)) return false;
    if (ed.startingPrice && ed.startingPrice > maxRate) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="bg-paper-50/60 border-b border-ink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">
            Discover and hire video editors
          </h1>
          <p className="text-ink-500 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
            Filter editors by editing style, software stack, starting rates, and verified
            platform reputation.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <Panel className="p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
          <fieldset className="flex items-center gap-2 flex-wrap border-0 p-0 m-0">
            <legend className="text-ink-400 mb-0">Editing style</legend>
            {STYLE_FILTERS.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                aria-pressed={selectedStyle === style}
                className={`px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                  selectedStyle === style
                    ? 'bg-signal-600 text-paper-0 font-bold border-signal-600'
                    : 'bg-paper-0 text-ink-500 border-ink-100 hover:text-ink-800'
                }`}
              >
                {style}
              </button>
            ))}
          </fieldset>

          <div className="flex items-center gap-3">
            <label htmlFor="max-rate" className="text-ink-400">
              Max starting rate
            </label>
            <span className="text-signal-600 font-mono font-bold tabular-num">${maxRate}</span>
            <input
              id="max-rate"
              type="range"
              min="50"
              max="500"
              step="25"
              value={maxRate}
              onChange={(e) => setMaxRate(Number(e.target.value))}
              className="accent-signal-600 cursor-pointer"
            />
          </div>
        </Panel>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3">
              <EmptyState
                icon={<Users className="w-5 h-5" />}
                title={availableEditors.length === 0 ? 'No editors available for hire yet' : 'No editors match your filters'}
                description={
                  availableEditors.length === 0
                    ? 'When editors mark themselves as available for hire, they will appear here.'
                    : 'Try adjusting the style or rate filters above.'
                }
              />
            </div>
          ) : (
            filtered.map((editor) => (
              <Panel key={editor.id} hover className="p-6 flex flex-col justify-between gap-5">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={editor.avatar} alt="" className="w-[52px] h-[52px] rounded-full object-cover bg-paper-100" />
                      <div>
                        <h3 className="font-semibold text-ink-900 text-base flex items-center gap-1.5">
                          {editor.name}
                          {editor.isVerified && (
                            <>
                              <ShieldCheck className="w-4 h-4 text-signal-600" aria-hidden="true" />
                              <span className="sr-only">Verified editor</span>
                            </>
                          )}
                        </h3>
                        <p className="text-xs text-ink-400">@{editor.username}</p>
                        <span className="text-[10px] text-ok-600 font-bold">Available for hire</span>
                      </div>
                    </div>

                    <LevelPill level={editor.level} />
                  </div>

                  <p className="text-xs text-ink-500 mt-4 line-clamp-3 leading-relaxed">{editor.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {editor.specialties.map((s) => (
                      <Badge key={s} className="normal-case font-medium">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-ink-300 block uppercase">Starting price</span>
                    <span className="text-lg font-bold text-ink-900 font-mono">
                      {editor.startingPrice ? `$${editor.startingPrice} / edit` : 'Contact for rate'}
                    </span>
                  </div>

                  <Button size="sm" onClick={() => addToast(`Inquiry sent to @${editor.username}`)}>
                    Request quote
                  </Button>
                </div>
              </Panel>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
