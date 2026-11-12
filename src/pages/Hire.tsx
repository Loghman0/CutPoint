import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Briefcase, Filter, ShieldCheck, Star } from "lucide-react";
import { EDITORS, fmt } from "../lib/data";
import { Avatar, FollowButton } from "../components/ui";
import { useStore } from "../lib/store";
import { cn } from "../lib/cn";

const FILTERS = ["All styles", "Gaming", "Anime", "Cinematic", "Sports", "Short-form", "Motion Design"];

export default function Hire() {
  const { pushToast } = useStore();
  const [f, setF] = useState("All styles");
  const list = EDITORS.filter((e) => f === "All styles" || e.specialties.includes(f)).slice(0, 8);

  return (
    <div>
      <div className="rounded-3xl border border-white/[.08] bg-gradient-to-br from-[#151024] to-[#0b0b12] p-7 md:p-10 relative overflow-hidden grain">
        <div className="absolute -top-20 right-0 w-[360px] h-[260px] bg-[#7c5cff]/25 blur-[100px]" />
        <div className="relative max-w-2xl">
          <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#34f5c5]">For creators & brands · launching soon</span>
          <h1 className="font-display font-extrabold tracking-tight text-[30px] md:text-[44px] leading-tight mt-2">Hire editors with<br />proof, not promises.</h1>
          <p className="text-white/60 text-[14.5px] mt-3 leading-relaxed">Search by style, skill, software and reputation. Every profile shows real work, real stats and real challenge wins. Full hiring with escrow & contracts is on the roadmap.</p>
          <div className="flex flex-wrap gap-2.5 mt-6">
            <button onClick={() => pushToast("You're on the list", "We'll invite you to the hiring beta first")} className="inline-flex items-center gap-2 bg-white text-black font-bold text-[14px] px-6 py-3 rounded-full hover:bg-white/85">Get hiring access <ArrowRight size={15} /></button>
            <button onClick={() => pushToast("Brief saved as draft", "Full briefs open with the hiring launch")} className="border border-white/20 font-bold text-[14px] px-6 py-3 rounded-full hover:bg-white/5">Post a brief</button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-7 mb-4 overflow-x-auto no-scrollbar">
        <Filter size={15} className="text-white/40 shrink-0" />
        {FILTERS.map((x) => (
          <button key={x} onClick={() => setF(x)} className={cn("px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap border", f === x ? "bg-[#7c5cff] border-[#7c5cff]" : "border-white/10 text-white/55 hover:text-white")}>{x}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3.5">
        {list.map((ed) => (
          <div key={ed.id} className="rounded-2xl border border-white/[.08] bg-[#101016] p-5 hover:border-[#7c5cff]/40 transition-all">
            <div className="flex items-start gap-3.5">
              <Link to={`/editor/${ed.id}`}><Avatar img={ed.avatarImg} size={58} ring /></Link>
              <div className="min-w-0 flex-1">
                <Link to={`/editor/${ed.id}`} className="flex items-center gap-1 font-bold text-[15px] hover:text-[#b7a5ff]">@{ed.username} {ed.verified && <BadgeCheck size={15} className="text-[#7c5cff]" />}</Link>
                <div className="text-[12.5px] text-white/50">{ed.title}</div>
                <div className="flex items-center gap-2 mt-1.5 text-[12px]">
                  <span className="font-mono text-[#34f5c5] font-bold">{fmt(ed.rep)} REP</span>
                  <span className="text-white/35">·</span>
                  <span className="text-white/55 font-mono">LVL {ed.level}</span>
                  <span className="text-white/35">·</span>
                  <span className="inline-flex items-center gap-1 text-[#ffc24b] font-semibold"><Star size={11} /> {ed.challengeWins} wins</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {[...ed.skills.slice(0, 3), ...ed.software.slice(0, 2)].map((s) => (
                <span key={s} className="text-[11.5px] font-medium bg-white/[.05] border border-white/10 px-2 py-1 rounded-md text-white/60">{s}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <FollowButton editorId={ed.id} size="sm" />
              <button onClick={() => pushToast("Added to shortlist", `@${ed.username} will see your interest when hiring launches`)} className="inline-flex items-center gap-1.5 border border-white/15 hover:bg-white/[.06] text-[12.5px] font-bold px-4 py-1.5 rounded-full transition-colors"><Briefcase size={13} /> Shortlist</button>
              <span className="ml-auto text-[12px] text-white/45 font-semibold">{ed.rate ?? "Rate on request"}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-[#34f5c5]/25 bg-[#34f5c5]/[.05] p-4.5 p-5 flex items-start gap-3 text-[13px] text-white/65 leading-relaxed">
        <ShieldCheck size={18} className="text-[#34f5c5] shrink-0 mt-0.5" />
        Roadmap: verified reviews, escrow payments, contracts and revision tracking. Today you can follow talent and build a shortlist — hiring opens next.
      </div>
    </div>
  );
}
