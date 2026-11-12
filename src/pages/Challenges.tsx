import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, CheckCircle2, Clock, Flame, Trophy, Users } from "lucide-react";
import { CHALLENGES, EDITS, editorById, thumb } from "../lib/data";
import { Avatar, SectionHead } from "../components/ui";
import { cn } from "../lib/cn";

function ChallengeCard({ c, large = false }: { c: (typeof CHALLENGES)[number]; large?: boolean }) {
  return (
    <Link to={`/challenge/${c.id}`} className={cn("group relative rounded-3xl overflow-hidden border transition-all hover:-translate-y-1", large ? "border-[#7c5cff]/40 shadow-[0_12px_60px_rgba(124,92,255,.25)]" : "border-white/[.08] hover:border-[#7c5cff]/50")}>
      <img src={`https://picsum.photos/seed/${c.seed}/900/420`} alt={c.theme} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />
      <div className={cn("relative p-6 md:p-8", large ? "md:p-10" : "") }>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg", c.status === "active" ? "bg-[#34f5c5] text-black" : c.status === "upcoming" ? "bg-white/15 text-white border border-white/20" : "bg-white/10 text-white/60")}> 
            {c.status === "active" ? <><Flame size={12} /> Active</> : c.status === "upcoming" ? <><CalendarClock size={12} /> Upcoming</> : <><CheckCircle2 size={12} /> Completed</>}
          </span>
          {c.sponsor && <span className="text-[11.5px] text-white/55 font-medium">{c.sponsor}</span>}
        </div>
        <div className="text-[12px] font-bold tracking-[.18em] text-white/55 uppercase mt-4">{c.title}</div>
        <h3 className={cn("font-display font-extrabold tracking-tight leading-none mt-1", large ? "text-[38px] md:text-[56px]" : "text-[30px] md:text-[36px]")}>{c.theme}</h3>
        <p className="text-white/65 text-[13.5px] mt-2.5 max-w-md leading-relaxed clamp-2">{c.description}</p>
        <div className="flex items-center gap-4 mt-4 text-[12.5px] font-semibold text-white/70">
          <span className="inline-flex items-center gap-1.5"><Users size={14} /> {c.participants > 0 ? c.participants.toLocaleString() + " in" : "Be first in"}</span>
          <span className="inline-flex items-center gap-1.5 text-[#ffc24b]"><Trophy size={14} /> {c.prize}</span>
          <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {c.endsIn}</span>
        </div>
        <span className={cn("inline-flex items-center gap-1.5 mt-5 font-bold rounded-full transition-all", large ? "bg-white text-black text-[14px] px-6 py-3 group-hover:bg-[#7c5cff] group-hover:text-white" : "bg-white/12 border border-white/20 backdrop-blur text-[13px] px-5 py-2.5 group-hover:bg-[#7c5cff] group-hover:border-[#7c5cff]")}>View Challenge <ArrowRight size={15} /></span>
      </div>
    </Link>
  );
}

export function ChallengeList() {
  const active = CHALLENGES.filter((c) => c.status === "active");
  const upcoming = CHALLENGES.filter((c) => c.status === "upcoming");
  const done = CHALLENGES.filter((c) => c.status === "completed");
  return (
    <div className="space-y-10">
      <SectionHead kicker="Compete" title="Challenges" desc="Weekly themes, real prizes, community-voted winners. Winning here is the fastest way to climb." />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><ChallengeCard c={active[0]} large /></motion.div>
      <div>
        <h2 className="font-display font-bold text-[19px] mb-4">Active now</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {active.slice(1).map((c) => <ChallengeCard key={c.id} c={c} />)}
          <div className="rounded-3xl border border-dashed border-white/12 bg-white/[.015] p-7 flex flex-col justify-center">
            <h3 className="font-display font-bold text-[19px]">Edit Battles <span className="text-[10px] font-bold tracking-widest text-[#34f5c5] bg-[#34f5c5]/10 border border-[#34f5c5]/25 px-2 py-0.5 rounded-md align-middle ml-1">BETA SOON</span></h3>
            <p className="text-white/55 text-[13.5px] mt-2 leading-relaxed">Two editors. Same footage. Community votes. <b className="text-white">@fragmason vs @yuki.amv</b> headlines the first card.</p>
            <div className="flex items-center gap-2 mt-4">
              <Avatar img={13} size={34} /><span className="font-display font-extrabold text-[14px]">VS</span><Avatar img={32} size={34} />
              <span className="text-[12px] text-white/45 ml-1">Vote opens with Season 1</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-display font-bold text-[19px] mb-4">Upcoming</h2>
        <div className="grid md:grid-cols-2 gap-4">{upcoming.map((c) => <ChallengeCard key={c.id} c={c} />)}</div>
      </div>
      <div>
        <h2 className="font-display font-bold text-[19px] mb-4">Completed</h2>
        <div className="grid md:grid-cols-2 gap-4">{done.map((c) => <ChallengeCard key={c.id} c={c} />)}</div>
      </div>
    </div>
  );
}

export function ChallengeDetail({ id }: { id: string }) {
  const c = CHALLENGES.find((x) => x.id === id)!;
  const entries = EDITS.filter((e) => e.challengeId === c.id);
  const winner = c.winnerId ? editorById(c.winnerId) : null;
  const pct = Math.min(92, Math.round((c.endsHours / 168) * 100));
  return (
    <div>
      <div className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[300px] md:min-h-[360px] flex">
        <img src={`https://picsum.photos/seed/${c.seed}/1400/520`} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/55 to-black/20" />
        <div className="relative mt-auto p-6 md:p-10 w-full">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#34f5c5] text-black px-2.5 py-1 rounded-lg"><Flame size={12} /> {c.status} · {c.endsIn}</span>
          <div className="text-[12px] font-bold tracking-[.2em] text-white/55 uppercase mt-3">{c.title}</div>
          <h1 className="font-display font-extrabold tracking-tight text-[40px] md:text-[64px] leading-none">{c.theme}</h1>
          <p className="text-white/70 text-[14.5px] mt-3 max-w-2xl leading-relaxed">{c.description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-5 mt-5">
        <div>
          {c.status === "active" && (
            <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5">
              <div className="flex justify-between text-[12.5px] font-bold"><span className="text-white/60">Time remaining</span><span className="text-[#34f5c5]">{c.endsIn}</span></div>
              <div className="h-2 rounded-full bg-white/10 mt-2.5 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#34f5c5]" /></div>
              <div className="grid grid-cols-3 gap-2.5 mt-4 text-center">
                {["02", "14", "33"].map((v, i) => (
                  <div key={i} className="rounded-xl bg-black/40 border border-white/[.07] py-3"><div className="font-display font-extrabold text-[22px] font-mono">{v}</div><div className="text-[10.5px] uppercase tracking-widest text-white/40">{["days", "hrs", "min"][i]}</div></div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5 md:p-6 mt-4">
            <h2 className="font-display font-bold text-[17px]">The Brief</h2>
            <ul className="mt-3 space-y-2.5">
              {c.brief.map((b, i) => (
                <li key={i} className="flex gap-2.5 text-[13.5px] text-white/70 leading-relaxed"><span className="w-6 h-6 rounded-lg bg-[#7c5cff]/15 border border-[#7c5cff]/30 text-[#b7a5ff] grid place-items-center text-[12px] font-bold shrink-0 font-mono">{i + 1}</span>{b}</li>
              ))}
            </ul>
          </div>

          <h2 className="font-display font-bold text-[18px] mt-7 mb-3">{c.status === "completed" ? "Winning & top entries" : `Top entries · ${entries.length || c.entriesCount} submitted`}</h2>
          {entries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center text-white/45 text-[13.5px]">Entries are rolling in — check back soon, or be the first to submit.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {entries.map((e) => (
                <Link key={e.id} to={`/edit/${e.id}`} className="group rounded-2xl overflow-hidden border border-white/[.08] bg-[#101016] hover:border-[#7c5cff]/50 transition-all">
                  <div className="relative">
                    <img src={thumb(e.id + e.title.length, e.aspect)} alt="" className="w-full aspect-video object-cover group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                    <span className="absolute bottom-2.5 left-2.5 text-[11px] font-semibold bg-black/60 px-2 py-1 rounded-md">▶ {e.duration}</span>
                  </div>
                  <div className="p-3.5 text-[13.5px] font-bold leading-snug">{e.title}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4 h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[#ffc24b]/30 bg-gradient-to-br from-[#ffc24b]/[.08] to-transparent p-5">
            <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#ffc24b]"><Trophy size={15} /> Prize pool</div>
            <div className="font-display font-extrabold text-[22px] mt-1.5">{c.prize}</div>
            <p className="text-[13px] text-white/60 mt-1 leading-relaxed">{c.prizeDetail}</p>
            {c.status === "active" && <Link to="/create" className="block text-center mt-4 bg-[#7c5cff] hover:bg-[#8d71ff] font-bold text-[14px] py-3 rounded-xl transition-colors shadow-[0_6px_24px_rgba(124,92,255,.4)]">Submit Entry</Link>}
          </div>
          {winner && (
            <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5">
              <div className="text-[12px] font-bold uppercase tracking-wider text-white/45">Winner</div>
              <div className="flex items-center gap-3 mt-2.5">
                <Avatar img={winner.avatarImg} size={46} ring />
                <div><div className="font-bold text-[14.5px]">@{winner.username}</div><div className="text-[12px] text-[#ffc24b] font-semibold">🏆 {c.theme} Champion</div></div>
              </div>
            </div>
          )}
          <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5">
            <div className="text-[12px] font-bold uppercase tracking-wider text-white/45">Participants</div>
            <div className="flex items-center mt-2.5">
              <div className="flex -space-x-2.5">{[12, 47, 32, 13, 45].map((i) => (<img key={i} src={`https://i.pravatar.cc/60?img=${i}`} alt="" className="w-8 h-8 rounded-full border-2 border-[#101016] object-cover" />))}</div>
              <span className="text-[13px] font-bold ml-2.5">{c.participants.toLocaleString()}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {["After Effects", "Premiere Pro", "DaVinci", "CapCut"].map((s) => (<span key={s} className="text-[11px] text-white/50 bg-white/[.05] px-2 py-1 rounded-md">{s}</span>))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
