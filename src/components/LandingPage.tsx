import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Scissors,
  Play,
  Trophy,
  Zap,
  Award,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { LevelPill, Button } from './ui/primitives';
import { motion, useReducedMotion, Variants } from 'framer-motion';

const PILLARS = [
  {
    icon: Scissors,
    title: 'Showcase your craft',
    desc: 'Publish high-res edits and tag the exact software and skills you used: After Effects, Premiere, DaVinci.',
  },
  {
    icon: TrendingUp,
    title: 'Build proof of skill',
    desc: 'Earn editor levels and top-percentile badges. Let your track record speak louder than a resume.',
  },
  {
    icon: Trophy,
    title: 'Compete in challenges',
    desc: 'Download weekly footage packs, cut under tight deadlines, and claim trophies and prize pools.',
  },
  {
    icon: Briefcase,
    title: 'Get hired by creators',
    desc: 'Creators and agencies filter editors by software, style, turnaround speed, and rate, then hire direct.',
  },
  {
    icon: Award,
    title: 'Climb the leaderboard',
    desc: 'Ascend global, weekly, and rising leaderboards from Level 1 Novice to Level 30 Legendary Editor.',
  },
  {
    icon: Zap,
    title: 'Head-to-head battles',
    desc: 'Enter live edit battles with the same footage and the same brief. The community votes on the winner.',
  },
];

export const LandingPage: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen, edits, editors, navigateToEdit, navigateToProfile } = useApp();
  const prefersReducedMotion = useReducedMotion();

  const hasEdits = edits.length > 0;
  const hasEditors = editors.length > 0;

  const containerVariants: Variants = prefersReducedMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

  const itemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 26 } } };

  return (
    <div className="bg-paper-0 text-ink-800 overflow-x-hidden">
      {/* ===================== HERO ===================== */}
      <section className="relative border-b border-ink-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-100 text-xs font-semibold text-ink-600 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-500" aria-hidden="true" />
              Where video editors get discovered
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-ink-900 max-w-xl">
              Your edits deserve an audience that gets it.
            </h1>

            <p className="mt-6 text-lg text-ink-600 max-w-lg leading-relaxed">
              CutPoint is the social platform built for editors: publish your work, build a
              reputation, join monthly competitions, and get hired by creators looking for
              exactly your style.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => setCurrentView('feed')}>
                <Play className="w-4 h-4 fill-paper-0" aria-hidden="true" />
                Browse the feed
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsAuthModalOpen(true)}>
                Create your profile
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3 h-full">
              <div className="p-6 rounded-lg bg-ink-900 text-paper-0 flex flex-col justify-between">
                <Users className="w-5 h-5 text-signal-400" aria-hidden="true" />
                <div>
                  <div className="text-3xl font-bold tabular-num">{editors.length}</div>
                  <div className="text-xs text-ink-300 mt-1">Editors on the platform</div>
                </div>
              </div>
              <div className="p-6 rounded-lg bg-paper-50 border border-ink-100 flex flex-col justify-between">
                <Scissors className="w-5 h-5 text-signal-600" aria-hidden="true" />
                <div>
                  <div className="text-3xl font-bold text-ink-900 tabular-num">{edits.length}</div>
                  <div className="text-xs text-ink-500 mt-1">Edits published</div>
                </div>
              </div>
              <div className="col-span-2 p-6 rounded-lg border border-ink-100 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-ink-900">Monthly competitions</div>
                  <div className="text-xs text-ink-500 mt-0.5">New footage pack, new brief, real prizes</div>
                </div>
                <button
                  onClick={() => setCurrentView('challenges')}
                  className="shrink-0 flex items-center gap-1 text-sm font-semibold text-signal-600 hover:text-signal-700 cursor-pointer"
                >
                  See challenges
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRENDING EDITS ===================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">
            {hasEdits ? 'Fresh from the community' : 'Be the first to publish'}
          </h2>
          {hasEdits && (
            <button
              onClick={() => setCurrentView('explore')}
              className="flex items-center gap-1 text-sm font-semibold text-signal-600 hover:text-signal-700 cursor-pointer"
            >
              View all edits <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {hasEdits ? (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none"
          >
            {edits.slice(0, 6).map((edit) => (
              <motion.li variants={itemVariants} key={edit.id}>
                <article className="group relative bg-paper-50 rounded-md border border-ink-100 overflow-hidden hover:border-ink-300 transition-colors">
                  <div className="relative aspect-video overflow-hidden bg-paper-0">
                    <img
                      src={edit.thumbnailUrl}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-paper-0 via-paper-0/10 to-transparent" aria-hidden="true" />
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-paper-0/85 text-ink-700 text-[11px] font-semibold backdrop-blur-sm">
                      {edit.category}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                      <div className="w-12 h-12 rounded-full bg-signal-600 text-paper-0 flex items-center justify-center">
                        <Play className="w-5 h-5 fill-paper-0 ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-ink-900 text-sm line-clamp-1">
                      <button
                        onClick={() => navigateToEdit(edit)}
                        className="text-left after:absolute after:inset-0 hover:text-signal-600 transition-colors cursor-pointer"
                      >
                        {edit.title}
                      </button>
                    </h3>

                    <div className="mt-3 flex items-center justify-between text-xs text-ink-400">
                      <div className="flex items-center gap-2">
                        <img src={edit.editor.avatar} alt="" className="w-6 h-6 rounded-full object-cover bg-paper-100" />
                        <span className="font-medium text-ink-600">@{edit.editor.username}</span>
                      </div>
                      <LevelPill level={edit.editor.level} />
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="rounded-lg border border-dashed border-ink-200 p-12 text-center">
            <p className="text-ink-500 text-sm max-w-sm mx-auto leading-relaxed">
              No edits have been published yet. Once editors start sharing their work, it will
              show up here for everyone to discover.
            </p>
            <Button className="mt-6" onClick={() => setIsAuthModalOpen(true)}>
              Publish the first edit
            </Button>
          </div>
        )}
      </section>

      {/* ===================== FEATURE PILLARS ===================== */}
      <section className="border-y border-ink-100 bg-paper-50/60">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink-900 tracking-tight">
              Built around what makes editors good, not who has the most followers.
            </h2>
          </div>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-6 gap-px bg-ink-100 border border-ink-100 rounded-md overflow-hidden list-none"
          >
            {PILLARS.map((p, i) => (
              <motion.li
                variants={itemVariants}
                key={p.title}
                className={`bg-paper-0 p-7 hover:bg-paper-50 transition-colors ${
                  i === 0 ? 'md:col-span-4' : 'md:col-span-2'
                }`}
              >
                <p.icon className="w-6 h-6 text-signal-600 mb-5" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="text-base font-bold text-ink-900 mb-2">{p.title}</h3>
                <p className="text-ink-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ===================== TOP EDITORS ===================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">
            {hasEditors ? 'Editors on CutPoint' : 'Be one of the first editors'}
          </h2>
          {hasEditors && (
            <button
              onClick={() => setCurrentView('explore')}
              className="flex items-center gap-1 text-sm font-semibold text-signal-600 hover:text-signal-700 cursor-pointer"
            >
              View all editors <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {hasEditors ? (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 list-none"
          >
            {editors.slice(0, 4).map((editor) => (
              <motion.li variants={itemVariants} key={editor.id}>
                <div className="relative p-5 rounded-md bg-paper-50 border border-ink-100 hover:border-ink-300 transition-colors group">
                  <div className="flex items-center gap-3">
                    <img src={editor.avatar} alt="" className="w-11 h-11 rounded-full object-cover bg-paper-100" />
                    <div className="truncate">
                      <h3 className="font-bold text-ink-900 text-sm truncate">
                        <button
                          onClick={() => navigateToProfile(editor.id)}
                          className="text-left after:absolute after:inset-0 hover:text-signal-600 transition-colors cursor-pointer"
                        >
                          {editor.name}
                        </button>
                      </h3>
                      <p className="text-xs text-ink-400 truncate">@{editor.username}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-ink-100 flex items-center justify-between text-xs">
                    <LevelPill level={editor.level} />
                    <span className="flex items-center gap-1 text-ink-400 font-medium">
                      <Users className="w-3.5 h-3.5" aria-hidden="true" />
                      {editor.followersCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="rounded-lg border border-dashed border-ink-200 p-12 text-center">
            <p className="text-ink-500 text-sm max-w-sm mx-auto leading-relaxed">
              No editors have joined yet. Create your profile to be featured here first.
            </p>
            <Button className="mt-6" onClick={() => setIsAuthModalOpen(true)}>
              Create your profile
            </Button>
          </div>
        )}
      </section>

      {/* ===================== CLOSING CTA ===================== */}
      <section className="border-t border-ink-100 bg-ink-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-paper-0 tracking-tight leading-[1.1]">
              Your next opportunity starts with your next upload.
            </h2>
            <p className="mt-5 text-ink-300 max-w-xl leading-relaxed">
              Join editors who publish their best work, build a reputation that travels, and
              unlock paid opportunities from creators actively hiring.
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Button size="lg" variant="accent" onClick={() => setIsAuthModalOpen(true)} className="w-full lg:w-auto">
              Create your profile
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
