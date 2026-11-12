import React from 'react';
import { useApp } from '../context/AppContext';
import { EditCard } from './EditCard';
import { EditCategory } from '../types';
import { Compass, Flame, Play, Layers, Users, Clapperboard } from 'lucide-react';
import { Badge, EmptyState } from './ui/primitives';
import { motion, useReducedMotion, Variants } from 'framer-motion';

const CATEGORY_TILES: { name: EditCategory; img: string }[] = [
  { name: 'Gaming', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Anime', img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80' },
  { name: 'Sports', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=80' },
  { name: 'Cinematic', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80' },
  { name: 'Cars', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80' },
  { name: 'Music', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80' },
  { name: 'Motion Design', img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80' },
  { name: 'Short-form', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80' },
  { name: 'VFX', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80' },
];

const VisuallyHiddenFollowStatus: React.FC<{ name: string; following?: boolean }> = ({ name, following }) => (
  <span className="sr-only">{following ? `, currently following ${name}` : ` ${name}`}</span>
);

export const ExploreView: React.FC = () => {
  const { edits, editors, setSelectedCategory, setCurrentView, navigateToProfile, navigateToEdit, toggleFollowEditor } =
    useApp();
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = prefersReducedMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 28 } } };

  const featuredEdit = edits[0];

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="relative border-b border-ink-100 bg-paper-50/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">Discover editors</h1>
            <p className="text-ink-500 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              Browse trending edits across nine categories, rising editors gaining momentum, and
              the work the community is talking about right now.
            </p>
          </div>

          {featuredEdit && (
            <div className="relative w-full lg:w-80 bg-paper-0 rounded-md border border-ink-100 p-3 hover:border-signal-400 group transition-colors shrink-0">
              <div className="relative aspect-video rounded-md overflow-hidden mb-3">
                <img
                  src={featuredEdit.thumbnailUrl}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-ink-900/20 flex items-center justify-center" aria-hidden="true">
                  <div className="w-10 h-10 rounded-full bg-signal-600 text-paper-0 flex items-center justify-center">
                    <Play className="w-5 h-5 fill-paper-0 ml-0.5" />
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-signal-600">
                Featured today
              </span>
              <h3 className="font-semibold text-ink-900 text-xs line-clamp-1 mt-0.5">
                <button
                  onClick={() => navigateToEdit(featuredEdit)}
                  className="text-left after:absolute after:inset-0 hover:text-signal-600 transition-colors cursor-pointer"
                >
                  {featuredEdit.title}
                </button>
              </h3>
              <p className="text-[11px] text-ink-400 mt-1">by @{featuredEdit.editor.username}</p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        <section aria-labelledby="categories-heading">
          <div className="mb-6">
            <h2 id="categories-heading" className="text-xl sm:text-2xl font-bold text-ink-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-signal-600" aria-hidden="true" />
              Browse categories
            </h2>
            <p className="text-xs text-ink-400 mt-1">Filter by editing genre and style</p>
          </div>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 list-none"
          >
            {CATEGORY_TILES.map((tile) => {
              const categoryCount = edits.filter((e) => e.category === tile.name).length;
              return (
                <motion.li variants={itemVariants} key={tile.name}>
                  <button
                    onClick={() => {
                      setSelectedCategory(tile.name);
                      setCurrentView('feed');
                    }}
                    className="group relative aspect-[4/3] w-full rounded-md overflow-hidden border border-ink-100 hover:border-signal-400 transition-colors cursor-pointer text-left"
                  >
                    <img
                      src={tile.img}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-paper-0 text-sm sm:text-base">{tile.name}</h3>
                      <span className="text-[10px] text-ink-100/80">
                        {categoryCount} {categoryCount === 1 ? 'edit' : 'edits'}
                      </span>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        </section>

        <section aria-labelledby="editors-heading">
          <div className="mb-6">
            <h2 id="editors-heading" className="text-xl sm:text-2xl font-bold text-ink-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-signal-600" aria-hidden="true" />
              Trending and rising editors
            </h2>
            <p className="text-xs text-ink-400 mt-1">Editors gaining community reputation and followers</p>
          </div>

          {editors.length === 0 ? (
            <EmptyState
              icon={<Users className="w-5 h-5" />}
              title="No editors yet"
              description="As editors join and build their profiles, they will be featured here."
            />
          ) : (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-none"
            >
              {editors.map((editor) => (
                <motion.li
                  variants={itemVariants}
                  key={editor.id}
                  className="relative p-5 rounded-lg bg-paper-50 border border-ink-100 hover:border-ink-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <img src={editor.avatar} alt="" className="w-11 h-11 rounded-full object-cover bg-paper-100" />
                      <div className="truncate">
                        <h3 className="font-semibold text-ink-900 text-sm truncate">
                          <button
                            onClick={() => navigateToProfile(editor.id)}
                            className="text-left after:absolute after:inset-0 hover:text-signal-600 transition-colors cursor-pointer"
                          >
                            {editor.name}
                          </button>
                        </h3>
                        <p className="text-xs text-ink-400">@{editor.username}</p>
                      </div>
                    </div>

                    <p className="text-xs text-ink-500 mt-3 line-clamp-2 leading-relaxed">{editor.bio}</p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {editor.specialties.map((spec) => (
                        <Badge key={spec} className="normal-case font-medium">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-ink-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-ink-300 uppercase tracking-wide">Reputation</span>
                      <span className="text-xs font-semibold text-ink-700">
                        Lvl {editor.level}, {editor.percentileRank}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFollowEditor(editor.id)}
                      aria-pressed={editor.isFollowing}
                      className={`relative z-10 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                        editor.isFollowing
                          ? 'bg-paper-100 text-ink-600 border border-ink-200'
                          : 'bg-ink-900 text-paper-0 hover:bg-ink-800'
                      }`}
                    >
                      {editor.isFollowing ? 'Following' : 'Follow'}
                      <VisuallyHiddenFollowStatus name={editor.name} following={editor.isFollowing} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </section>

        <section aria-labelledby="trending-heading">
          <div className="mb-6">
            <h2 id="trending-heading" className="text-xl sm:text-2xl font-bold text-ink-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-signal-600" aria-hidden="true" />
              Trending edits worldwide
            </h2>
            <p className="text-xs text-ink-400 mt-1">Most viewed and upvoted creations</p>
          </div>

          {edits.length === 0 ? (
            <EmptyState
              icon={<Clapperboard className="w-5 h-5" />}
              title="No edits yet"
              description="Published edits from the community will appear here once there is something to show."
            />
          ) : (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none"
            >
              {edits.map((edit) => (
                <motion.li variants={itemVariants} key={edit.id}>
                  <EditCard edit={edit} />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </section>
      </div>
    </div>
  );
};
