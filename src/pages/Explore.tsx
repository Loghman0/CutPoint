import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Flame, TrendingUp } from "lucide-react";
import { CATEGORIES, EDITORS, EDITS, editorById, fmt, thumb } from "../lib/data";
import { Avatar, EditCard, FollowButton, SectionHead } from "../components/ui";
import { useStore } from "../lib/store";

export default function Explore() {
  const { allEdits } = useStore();
  const trending = allEdits.filter((e) => e.trending).slice(0, 6);
  const trendEditors = [...EDITORS].sort((a, b) => b.followers - a.followers).slice(0, 4);
  const rising = EDITORS.filter((e) => e.rising);

  return (
    <div className="space-y-12">
      {/* Categories */}
      <section>
        <SectionHead kicker="Browse" title="Categories" desc="Jump into the style you love — every lane has its legends." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.slice(0, 10).map((c) => (
            <Link key={c.name} to="/home" className="group relative rounded-2xl overflow-hidden border border-white/[.08] hover:border-[#7c5cff]/60 transition-all hover:-translate-y-0.5 h-[132px]">
              <img src={`https://picsum.photos/seed/${c.seed}/400/260`} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
              <div className="absolute bottom-0 p-3.5">
                <div className="font-display font-bold text-[15px]">{c.name}</div>
                <div className="text-[11.5px] text-white/60">{c.count}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending edits */}
      <section>
        <SectionHead
          kicker="Most watched" title="Trending Edits"
          desc="What the community can't stop replaying right now."
          action={<Link to="/home" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#b7a5ff] hover:text-white">Open feed <ArrowRight size={14} /></Link>}
        />
        {/* Hero + grid */}
        <div className="grid lg:grid-cols-2 gap-4 mb-4">
          {trending.slice(0, 2).map((e) => {
            const ed = editorById(e.editorId);
            return (
              <Link key={e.id} to={`/edit/${e.id}`} className="group relative rounded-2xl overflow-hidden border border-white/[.08] hover:border-[#7c5cff]/50 transition-all min-h-[260px] md:min-h-[320px] flex">
                <img src={thumb(e.id + e.title.length, "landscape")} alt={e.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1 text-[11px] font-bold bg-[#ff5c3d] px-2.5 py-1 rounded-lg uppercase tracking-wide"><Flame size={12} /> #{trending.indexOf(e) + 1} Trending</span>
                <div className="relative mt-auto p-5 w-full">
                  <div className="flex items-center gap-2 text-[12.5px] text-white/70"><Avatar img={ed.avatarImg} size={22} /> @{ed.username} {ed.verified && <BadgeCheck size={13} className="text-[#7c5cff]" />}</div>
                  <h3 className="font-display font-bold text-[19px] md:text-[22px] mt-1.5 leading-tight">{e.title}</h3>
                  <div className="text-[12.5px] text-white/60 mt-1">{fmt(e.views)} views · {fmt(e.likes)} likes · {e.category}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="columns-1 sm:columns-2 xl:columns-4 gap-4 [&>*]:mb-4">
          {trending.slice(2).map((e) => (<div key={e.id} className="break-inside-avoid"><EditCard edit={e} /></div>))}
        </div>
      </section>

      {/* Trending editors */}
      <section>
        <SectionHead kicker="Follow-worthy" title="Trending Editors" desc="The cutters setting the standard this week." />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {trendEditors.map((ed) => (
            <div key={ed.id} className="rounded-2xl border border-white/[.08] bg-[#101016] p-5 hover:border-[#7c5cff]/40 hover:-translate-y-1 transition-all">
              <div className="flex items-start gap-3">
                <Link to={`/editor/${ed.id}`}><Avatar img={ed.avatarImg} size={52} ring /></Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/editor/${ed.id}`} className="flex items-center gap-1 font-bold text-[14.5px] hover:text-[#b7a5ff] truncate">@{ed.username} {ed.verified && <BadgeCheck size={14} className="text-[#7c5cff] shrink-0" />}</Link>
                  <div className="text-[12px] text-white/50 truncate">{ed.title}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3.5 text-[12px] text-white/55">
                <span><b className="text-white">{fmt(ed.followers)}</b> followers</span>
                <span className="font-mono text-[#34f5c5] font-semibold">{fmt(ed.rep)} REP</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {ed.specialties.slice(0, 3).map((s) => (
                  <span key={s} className="text-[11px] font-semibold text-white/55 bg-white/[.05] border border-white/10 px-2 py-0.5 rounded-md">{s}</span>
                ))}
              </div>
              <div className="mt-4"><FollowButton editorId={ed.id} size="sm" /></div>
            </div>
          ))}
        </div>
      </section>

      {/* Rising */}
      <section className="rounded-3xl border border-[#34f5c5]/20 bg-gradient-to-br from-[#34f5c5]/[.06] to-transparent p-6 md:p-8">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-[#34f5c5]"><TrendingUp size={14} /> Rising editors — gaining fast</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-5">
          {rising.map((ed) => (
            <Link key={ed.id} to={`/editor/${ed.id}`} className="rounded-2xl border border-white/[.08] bg-[#0d0d14] p-4 hover:border-[#34f5c5]/50 hover:-translate-y-1 transition-all text-center group">
              <Avatar img={ed.avatarImg} size={64} />
              <div className="font-bold text-[13.5px] mt-2.5 group-hover:text-[#8df5d6] truncate">@{ed.username}</div>
              <div className="text-[11.5px] text-[#34f5c5] font-semibold mt-0.5">{ed.growth}</div>
              <div className="text-[11.5px] text-white/45 mt-1">{ed.specialties[0]}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
