import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, Compass, Play, Swords, TrendingUp, Trophy, Users, Zap, Star, ChevronRight, BadgeCheck } from "lucide-react";
import { CATEGORIES, EDITORS, EDITS, avatar, editorById, fmt, thumb } from "../lib/data";
import { Avatar, FollowButton, Logo } from "../components/ui";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const } }),
};

function HeroCollage() {
  const picks = [EDITS[0], EDITS[5], EDITS[3], EDITS[1], EDITS[17], EDITS[9]];
  return (
    <div className="grid grid-cols-3 gap-2.5 md:gap-3 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
      {[0, 1, 2].map((col) => (
        <div key={col} className={`space-y-2.5 md:space-y-3 ${col === 1 ? "pt-8" : col === 2 ? "pt-4" : ""}`}>
          {[0, 1].map((row) => {
            const e = picks[col * 2 + row];
            const ed = editorById(e.editorId);
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + (col * 2 + row) * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
                onClick={() => (window.location.href = "/home")}
              >
                <img src={thumb(e.id + e.title.length, e.aspect)} alt={e.title} className="w-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-700" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 p-3 w-full">
                  <div className="flex items-center gap-1.5 mb-1">
                    <img src={avatar(ed.avatarImg)} className="w-5 h-5 rounded-full object-cover" alt="" />
                    <span className="text-[11px] font-semibold text-white/85">@{ed.username}</span>
                  </div>
                  <div className="text-[12px] font-bold leading-tight clamp-2">{e.title}</div>
                </div>
                <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/20 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={13} fill="white" className="text-white ml-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Landing() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-[#07070c] text-white overflow-x-hidden">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#07070c]/80 backdrop-blur-xl border-b border-white/[.07]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3.5 flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-[13.5px] font-medium text-white/60">
            <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
            <Link to="/challenges" className="hover:text-white transition-colors">Challenges</Link>
            <Link to="/rankings" className="hover:text-white transition-colors">Rankings</Link>
            <Link to="/hire" className="hover:text-white transition-colors">Hire <span className="text-[9px] font-bold text-[#34f5c5] align-super ml-0.5">SOON</span></Link>
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <button onClick={() => nav("/login")} className="text-[13.5px] font-semibold text-white/70 hover:text-white px-3 py-2">Log in</button>
            <button onClick={() => nav("/signup")} className="text-[13.5px] font-bold bg-white text-black px-5 py-2.5 rounded-full hover:bg-white/85 transition-colors">Join free</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-10 grain">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#7c5cff]/20 blur-[140px]" />
          <div className="absolute top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#34f5c5]/[.06] blur-[120px]" />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.div variants={fade} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 rounded-full border border-[#7c5cff]/30 bg-[#7c5cff]/10 px-3.5 py-1.5 text-[12px] font-semibold text-[#c9baff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34f5c5] animate-pulse" />
              128,400+ editors already cutting here
            </motion.div>
            <motion.h1 variants={fade} initial="hidden" animate="show" custom={1} className="font-display font-extrabold tracking-tight text-[42px] leading-[1.02] md:text-[68px] mt-5 text-balance">
              The home for <span className="bg-gradient-to-r from-[#7c5cff] via-[#a78bfa] to-[#34f5c5] bg-clip-text text-transparent">video editors.</span>
            </motion.h1>
            <motion.p variants={fade} initial="hidden" animate="show" custom={2} className="text-white/60 text-[16px] md:text-[18px] leading-relaxed mt-5 max-w-lg">
              Share your edits. Build your reputation. Get discovered. The global stage where editing is a craft — not a commodity.
            </motion.p>
            <motion.div variants={fade} initial="hidden" animate="show" custom={3} className="flex flex-wrap items-center gap-3 mt-7">
              <button onClick={() => nav("/explore")} className="group inline-flex items-center gap-2 bg-[#7c5cff] hover:bg-[#8d71ff] font-bold text-[15px] px-7 py-3.5 rounded-full shadow-[0_8px_36px_rgba(124,92,255,.5)] transition-all active:scale-[.98]">
                Explore Edits <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button onClick={() => nav("/signup")} className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 hover:bg-white/[.05] font-bold text-[15px] px-7 py-3.5 rounded-full transition-all">
                Join the Community
              </button>
            </motion.div>
            <motion.div variants={fade} initial="hidden" animate="show" custom={4} className="flex items-center gap-5 mt-8 text-[13px]">
              <div><span className="font-display font-extrabold text-[20px] block">2.4M</span><span className="text-white/45">edits shared</span></div>
              <div className="w-px h-9 bg-white/10" />
              <div><span className="font-display font-extrabold text-[20px] block">860M</span><span className="text-white/45">views generated</span></div>
              <div className="w-px h-9 bg-white/10" />
              <div><span className="font-display font-extrabold text-[20px] block">4,200+</span><span className="text-white/45">creators hiring</span></div>
            </motion.div>
          </div>
          <HeroCollage />
        </div>
      </section>

      {/* Loop strip */}
      <section className="border-y border-white/[.07] bg-white/[.015]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-5 flex items-center gap-3 overflow-x-auto no-scrollbar text-[13px] font-semibold text-white/60 whitespace-nowrap">
          {["Show your work", "Build your reputation", "Get discovered", "Get hired", "Make money"].map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 && <ChevronRight size={15} className="text-[#7c5cff]" />}
              <span className={i === 0 ? "text-white" : ""}>{s}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
          <div className="text-[11px] font-bold tracking-[.2em] text-[#7c5cff] uppercase">Why Cutpoint</div>
          <h2 className="font-display font-extrabold tracking-tight text-[30px] md:text-[44px] leading-tight mt-2">Built for the craft of editing.</h2>
          <p className="text-white/55 text-[15px] mt-3">Not another feed to get lost in. A reputation network where great cuts compound into career.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-9">
          {[
            { icon: Play, t: "Share your work", d: "Post edits in 9:16 or 16:9. External links today, native uploads soon.", c: "#7c5cff" },
            { icon: Award, t: "Build reputation", d: "Levels, badges and Top % rankings that prove your skill.", c: "#ffc24b" },
            { icon: Swords, t: "Compete", d: "Weekly challenges and head-to-head Edit Battles. Voted by the community.", c: "#ff5c7a" },
            { icon: Compass, t: "Discover talent", d: "Addictive discovery across gaming, anime, sports, cinema and more.", c: "#34f5c5" },
            { icon: Users, t: "Get hired", d: "Creators shortlist editors by style, skill and reputation. Coming soon.", c: "#6cb8ff" },
          ].map((f, i) => (
            <motion.div key={f.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-2xl border border-white/[.08] bg-[#101016] p-5 hover:border-[#7c5cff]/40 hover:-translate-y-1 transition-all group">
              <div className="w-10 h-10 rounded-xl grid place-items-center mb-4" style={{ background: `${f.c}1a`, color: f.c, border: `1px solid ${f.c}44` }}>
                <f.icon size={19} />
              </div>
              <h3 className="font-display font-bold text-[15.5px]">{f.t}</h3>
              <p className="text-white/50 text-[13px] leading-relaxed mt-1.5">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending preview */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] font-bold tracking-[.2em] text-[#ff5c3d] uppercase flex items-center gap-1.5"><TrendingUp size={13} /> Trending now</div>
            <h2 className="font-display font-extrabold text-[26px] md:text-[34px] tracking-tight mt-1">Talent lives here.</h2>
          </div>
          <Link to="/explore" className="hidden sm:inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#b7a5ff] hover:text-white transition-colors">View all <ArrowRight size={15} /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[EDITS[5], EDITS[0], EDITS[2], EDITS[4]].map((e) => {
            const ed = editorById(e.editorId);
            return (
              <Link key={e.id} to={`/edit/${e.id}`} className="group rounded-2xl overflow-hidden border border-white/[.08] bg-[#101016] hover:border-[#7c5cff]/50 transition-all hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img src={thumb(e.id + e.title.length, e.aspect)} alt={e.title} className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 text-[11px] font-semibold bg-black/60 backdrop-blur px-2 py-1 rounded-md inline-flex items-center gap-1"><Play size={10} fill="currentColor" />{e.duration}</span>
                </div>
                <div className="p-3">
                  <div className="text-[13px] font-bold leading-snug clamp-1">{e.title}</div>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[12px] text-white/55">
                    <Avatar img={ed.avatarImg} size={18} /> @{ed.username}
                    <span className="ml-auto">{fmt(e.views)} views</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Challenge banner */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 pb-16 md:pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-[#7c5cff]/30 bg-gradient-to-br from-[#151024] via-[#0d0d16] to-[#071210] p-7 md:p-12 grain">
          <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-[#7c5cff]/25 blur-[100px]" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.18em] uppercase text-[#34f5c5]"><Trophy size={13} /> Weekly edit challenge · Live</div>
              <h3 className="font-display font-extrabold text-[34px] md:text-[52px] tracking-tight mt-2">CYBER<span className="text-[#7c5cff]">PUNK</span></h3>
              <p className="text-white/60 text-[14.5px] mt-2 max-w-md">1,284 editors are cutting Night City this week. $500 cash + Pro Annual + homepage feature. 3 days remaining.</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => nav("/challenge/c1")} className="bg-white text-black font-bold text-[14px] px-6 py-3 rounded-full hover:bg-white/85 transition-colors">View Challenge</button>
                <button onClick={() => nav("/signup")} className="border border-white/20 font-bold text-[14px] px-6 py-3 rounded-full hover:bg-white/5 transition-colors">Enter free</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {[EDITS[16], EDITS[17], EDITS[15]].map((e) => (
                <img key={e.id} src={thumb(e.id + "x", e.aspect)} alt="" className="rounded-xl aspect-[3/4] object-cover border border-white/10" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rankings teaser */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-4 items-stretch">
          <div className="rounded-3xl border border-white/[.08] bg-[#101016] p-7 md:p-9">
            <div className="text-[11px] font-bold tracking-[.2em] text-[#ffc24b] uppercase flex items-center gap-1.5"><Star size={13} /> Reputation that matters</div>
            <h3 className="font-display font-extrabold text-[26px] md:text-[32px] tracking-tight mt-2">Climb from Level 1<br />to the Top 1%.</h3>
            <p className="text-white/55 text-[14px] mt-3 leading-relaxed">Every view, like, challenge win and battle victory builds your Editor Level. Creators hire from the leaderboard — not from DMs.</p>
            <div className="flex items-center gap-2 mt-5">
              {["LVL 9", "LVL 21", "LVL 27", "LVL 34"].map((l, i) => (
                <span key={l} className={`font-mono text-[11px] font-semibold px-2.5 py-1.5 rounded-lg ${i === 2 ? "bg-[#7c5cff] text-white" : "bg-white/[.06] text-white/50 border border-white/10"}`}>{l}</span>
              ))}
              <Zap size={15} className="text-[#ffc24b]" />
            </div>
          </div>
          <div className="rounded-3xl border border-white/[.08] bg-[#101016] p-4 md:p-5">
            {EDITORS.slice(2, 6).map((ed, i) => (
              <div key={ed.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/[.03] transition-colors">
                <span className={`font-display font-extrabold text-[18px] w-7 text-center ${i === 0 ? "text-[#ffc24b]" : i === 1 ? "text-white/70" : i === 2 ? "text-[#d08a4e]" : "text-white/30"}`}>{i + 1}</span>
                <Avatar img={ed.avatarImg} size={42} />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[14px] font-bold">@{ed.username} {ed.verified && <BadgeCheck size={14} className="text-[#7c5cff]" />}</div>
                  <div className="text-[12px] text-white/45">{ed.specialties.slice(0, 2).join(" · ")}</div>
                </div>
                <span className="ml-auto font-mono text-[12px] text-[#34f5c5] font-semibold">{fmt(ed.rep)} REP</span>
              </div>
            ))}
            <Link to="/rankings" className="flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#b7a5ff] py-3 hover:text-white transition-colors">Full leaderboard <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-white/[.07] bg-white/[.015]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-14">
          <h3 className="font-display font-extrabold text-[22px] md:text-[28px] tracking-tight text-center">Every style has a home.</h3>
          <div className="flex flex-wrap justify-center gap-2.5 mt-6">
            {CATEGORIES.map((c) => (
              <Link key={c.name} to="/explore" className="px-4 py-2 rounded-full border border-white/12 bg-white/[.04] text-[13px] font-semibold text-white/70 hover:text-white hover:border-[#7c5cff]/60 hover:bg-[#7c5cff]/10 transition-all">{c.name}</Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => nav("/signup")} className="inline-flex items-center gap-2 bg-[#7c5cff] hover:bg-[#8d71ff] font-bold text-[15px] px-8 py-3.5 rounded-full shadow-[0_8px_36px_rgba(124,92,255,.5)] transition-all">Claim your handle <ArrowRight size={17} /></button>
            <p className="text-white/40 text-[12.5px] mt-3">Free forever for editors · No credit card</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[.07]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center gap-4">
          <Logo />
          <p className="text-white/35 text-[12.5px] md:ml-4">A global home for video editors — creativity, community, competition, reputation and career.</p>
          <div className="md:ml-auto flex gap-5 text-[12.5px] font-medium text-white/45">
            <Link to="/explore" className="hover:text-white">Explore</Link>
            <Link to="/challenges" className="hover:text-white">Challenges</Link>
            <Link to="/rankings" className="hover:text-white">Rankings</Link>
            <Link to="/signup" className="hover:text-white">Join</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
