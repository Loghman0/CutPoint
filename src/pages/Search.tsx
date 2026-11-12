import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AtSign, BadgeCheck, Clock, Hash, Search as SearchIcon, TrendingUp, X } from "lucide-react";
import { CATEGORIES, EDITORS, avatar, fmt } from "../lib/data";
import { useStore } from "../lib/store";
import { Avatar, EditCard, FollowButton } from "../components/ui";

const RECENT_SEARCHES = ["cyberpunk", "velocity", "valorant montage", "color grading"];
const TRENDING_TAGS = ["#CyberpunkChallenge", "#velocity", "#amv", "#retention", "#glow", "#montage", "#loop", "#hypedit"];

export default function Search() {
  const { allEdits } = useStore();
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState(RECENT_SEARCHES);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return null;
    const edits = allEdits.filter((e) =>
      [e.title, e.description, e.category, ...e.tags, ...e.software].join(" ").toLowerCase().includes(query)
    );
    const editors = EDITORS.filter((e) =>
      [e.username, e.displayName, e.title, ...e.specialties, ...e.skills].join(" ").toLowerCase().includes(query)
    );
    return { edits, editors };
  }, [q, allEdits]);

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center gap-3 bg-white/[.05] border border-white/10 focus-within:border-[#7c5cff]/70 rounded-2xl px-4 transition-colors">
        <SearchIcon size={19} className="text-white/40 shrink-0" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search edits, editors, tags, software…"
          className="bg-transparent flex-1 py-4 text-[15px] placeholder:text-white/30 outline-none"
        />
        {q && <button onClick={() => setQ("")} className="text-white/40 hover:text-white"><X size={17} /></button>}
        <kbd className="hidden sm:block text-[10.5px] font-mono bg-white/[.07] px-1.5 py-0.5 rounded text-white/40">ESC</kbd>
      </div>

      {!results ? (
        <div className="mt-7 space-y-8">
          {recent.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/45 flex items-center gap-1.5"><Clock size={13} /> Recent</h3>
                <button onClick={() => setRecent([])} className="text-[12px] text-white/40 hover:text-white">Clear</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.map((r) => (
                  <button key={r} onClick={() => setQ(r)} className="px-3.5 py-2 rounded-full bg-white/[.05] border border-white/10 text-[13px] text-white/70 hover:text-white hover:border-white/25 transition-colors">{r}</button>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/45 flex items-center gap-1.5 mb-3"><TrendingUp size={13} /> Trending tags</h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TAGS.map((t) => (
                <button key={t} onClick={() => setQ(t.replace("#", ""))} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/25 text-[13px] font-semibold text-[#c9baff] hover:bg-[#7c5cff]/20 transition-colors"><Hash size={13} />{t.replace("#", "")}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/45 mb-3">Browse categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CATEGORIES.map((c) => (
                <button key={c.name} onClick={() => setQ(c.name)} className="relative rounded-xl overflow-hidden border border-white/[.08] h-[84px] group text-left">
                  <img src={`https://picsum.photos/seed/${c.seed}/300/140`} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/55" />
                  <span className="relative p-3 block font-bold text-[13.5px]">{c.name}<span className="block text-[11px] font-medium text-white/60">{c.count}</span></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7">
          <p className="text-[13.5px] text-white/50 mb-5">
            <b className="text-white">{results.edits.length + results.editors.length}</b> results for <b className="text-white">“{q}”</b>
          </p>
          {results.editors.length > 0 && (
            <>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/45 flex items-center gap-1.5 mb-3"><AtSign size={13} /> Editors ({results.editors.length})</h3>
              <div className="space-y-2 mb-8">
                {results.editors.map((ed) => (
                  <div key={ed.id} className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-[#101016] p-3.5">
                    <Link to={`/editor/${ed.id}`}><Avatar img={ed.avatarImg} size={46} /></Link>
                    <div className="min-w-0 flex-1">
                      <Link to={`/editor/${ed.id}`} className="flex items-center gap-1 font-bold text-[14px] hover:text-[#b7a5ff]">@{ed.username} {ed.verified && <BadgeCheck size={14} className="text-[#7c5cff]" />}</Link>
                      <div className="text-[12px] text-white/50 truncate">{ed.title} · {fmt(ed.followers)} followers</div>
                    </div>
                    <FollowButton editorId={ed.id} size="sm" />
                  </div>
                ))}
              </div>
            </>
          )}
          {results.edits.length > 0 ? (
            <>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/45 mb-3">Edits ({results.edits.length})</h3>
              <div className="columns-1 sm:columns-2 gap-4 [&>*]:mb-4">
                {results.edits.map((e) => (<div key={e.id} className="break-inside-avoid"><EditCard edit={e} /></div>))}
              </div>
            </>
          ) : results.editors.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-14 text-center">
              <img src={avatar(32)} alt="" className="w-14 h-14 rounded-full mx-auto opacity-40 grayscale" />
              <h3 className="font-bold text-[16px] mt-4">No results for “{q}”</h3>
              <p className="text-white/50 text-[13.5px] mt-1">Try “velocity”, “anime”, “montage” or an editor handle.</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
