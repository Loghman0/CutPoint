import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Crown, Flame, Medal, TrendingUp } from "lucide-react";
import { EDITORS } from "../lib/data";
import { Avatar, FollowButton, SectionHead } from "../components/ui";
import { fmt } from "../lib/data";
import { cn } from "../lib/cn";

const TABS = ["Global", "Weekly", "Monthly", "Rising"] as const;

export default function Rankings() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Global");

  const rows = useMemo(() => {
    let list = [...EDITORS];
    if (tab === "Global") list.sort((a, b) => b.rep - a.rep);
    else if (tab === "Weekly") list.sort((a, b) => b.streakWeeks - a.streakWeeks || b.rep - a.rep);
    else if (tab === "Monthly") list.sort((a, b) => b.totalViews - a.totalViews);
    else list = list.filter((e) => e.rising || e.level < 22).sort((a, b) => (b.followers / Math.max(b.editsCount, 1)) - (a.followers / Math.max(a.editsCount, 1)));
    return list;
  }, [tab]);

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div>
      <SectionHead kicker="Leaderboard" title="Rankings" desc="Reputation is earned: views, likes, challenge wins, battles and consistency. Updated hourly." />

      <div className="flex gap-2 mb-7 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-5 py-2.5 rounded-full text-[13.5px] font-bold whitespace-nowrap border transition-all", tab === t ? "bg-white text-black border-white" : "bg-white/[.04] text-white/60 border-white/10 hover:text-white")}>{t}</button>
        ))}
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 items-end mb-8 max-w-[860px] mx-auto">
        {[top3[1], top3[0], top3[2]].map((ed, i) => {
          const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
          if (!ed) return <div key={i} />;
          const first = rank === 1;
          return (
            <motion.div key={ed.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={cn("rounded-3xl border text-center relative overflow-hidden", first ? "border-[#ffc24b]/50 bg-gradient-to-b from-[#ffc24b]/[.1] to-[#101016] p-5 md:p-7 shadow-[0_12px_60px_rgba(255,194,75,.15)]" : "border-white/[.08] bg-[#101016] p-4 md:p-5")}>
              {first && <Crown size={22} className="mx-auto text-[#ffc24b] mb-2" />}
              <div className={cn("font-display font-extrabold", first ? "text-[26px] text-[#ffc24b]" : "text-[20px] text-white/40")}>#{rank}</div>
              <Link to={`/editor/${ed.id}`} className="block mt-1"><Avatar img={ed.avatarImg} size={first ? 84 : 64} ring={first} /></Link>
              <Link to={`/editor/${ed.id}`} className="flex items-center justify-center gap-1 font-bold text-[13.5px] md:text-[15px] mt-2.5 hover:text-[#b7a5ff] truncate">@{ed.username} {ed.verified && <BadgeCheck size={14} className="text-[#7c5cff]" />}</Link>
              <div className="text-[11.5px] text-white/45 truncate">{ed.specialties.slice(0, 2).join(" · ")}</div>
              <div className="font-mono text-[12px] md:text-[13px] font-bold text-[#34f5c5] mt-1.5">{fmt(ed.rep)} REP</div>
              <div className="text-[11px] text-white/40 mt-0.5 font-mono">LVL {ed.level} · {ed.percentile}</div>
              <div className="mt-3 hidden sm:block"><FollowButton editorId={ed.id} size="sm" /></div>
            </motion.div>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[.08] bg-[#101016] overflow-hidden max-w-[860px] mx-auto">
        <div className="hidden md:grid grid-cols-[52px_1fr_110px_110px_130px] gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white/35 border-b border-white/[.07]">
          <span>Rank</span><span>Editor</span><span className="text-right">Rep</span><span className="text-right">Level</span><span className="text-right">Action</span>
        </div>
        {rest.map((ed, i) => {
          const rank = i + 4;
          return (
            <div key={ed.id} className="flex md:grid md:grid-cols-[52px_1fr_110px_110px_130px] items-center gap-2 px-4 md:px-5 py-3 border-b border-white/[.05] last:border-0 hover:bg-white/[.025] transition-colors">
              <span className="font-display font-bold text-white/40 text-[15px] w-8 md:w-auto flex items-center gap-1">
                {rank <= 10 ? <Medal size={14} className="text-white/25" /> : null}{rank}
              </span>
              <Link to={`/editor/${ed.id}`} className="flex items-center gap-3 min-w-0 flex-1">
                <Avatar img={ed.avatarImg} size={40} />
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-bold text-[13.5px] truncate">@{ed.username} {ed.verified && <BadgeCheck size={13} className="text-[#7c5cff] shrink-0" />} {ed.rising && <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#34f5c5] bg-[#34f5c5]/10 px-1.5 py-0.5 rounded"><TrendingUp size={10} /> RISING</span>}</span>
                  <span className="block text-[11.5px] text-white/45 truncate">{ed.title}</span>
                </span>
              </Link>
              <span className="font-mono text-[12.5px] font-bold text-[#34f5c5] md:text-right">{fmt(ed.rep)}</span>
              <span className="hidden md:block font-mono text-[12px] text-white/55 text-right">LVL {ed.level}</span>
              <span className="md:text-right ml-auto md:ml-0"><FollowButton editorId={ed.id} size="sm" /></span>
            </div>
          );
        })}
      </div>

      <div className="max-w-[860px] mx-auto mt-5 rounded-2xl border border-white/[.08] bg-white/[.02] p-4 flex items-start gap-3 text-[12.5px] text-white/50 leading-relaxed">
        <Flame size={16} className="text-[#ff5c3d] shrink-0 mt-0.5" />
        How REP works: views & likes build your base, challenge wins multiply it, battle victories spike it, and weekly consistency keeps the flame alive. Exact weights stay secret to prevent gaming the system.
      </div>
    </div>
  );
}
