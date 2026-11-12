import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, BadgeCheck, Briefcase, Calendar, Eye, Flame, Heart, MapPin, Settings, Share2, Swords, Trophy } from "lucide-react";
import { editorById, fmt } from "../lib/data";
import { useStore } from "../lib/store";
import { Avatar, EditCard, FollowButton, LevelBadge } from "../components/ui";

export function EditorProfileInner({ editorId, isMine = false }: { editorId: string; isMine?: boolean }) {
  const { allEdits, user, followed, pushToast } = useStore();
  const ed = editorById(editorId);
  const edits = allEdits.filter((e) => e.editorId === editorId);
  const featured = edits.slice(0, 2);
  const followerCount = ed.followers + (followed.has(ed.id) ? 1 : 0);

  const achievements = [
    { icon: Trophy, label: "Challenge Winner", detail: `${ed.challengeWins} wins`, gold: true },
    { icon: Flame, label: `${ed.streakWeeks}-week streak`, detail: "Posting consistently", gold: false },
    { icon: Eye, label: `${fmt(ed.totalViews)} views`, detail: "All-time reach", gold: false },
    { icon: Swords, label: `${ed.battleWins} battle wins`, detail: "Head-to-head", gold: ed.battleWins > 5 },
  ];

  return (
    <div>
      {/* Cover */}
      <div className="relative rounded-3xl overflow-hidden border border-white/[.08] h-[170px] md:h-[230px]">
        <img src={`https://picsum.photos/seed/${ed.id}-cover/1400/400`} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/40 to-transparent" />
        <div className="absolute inset-0 bg-[#7c5cff]/10" />
        {ed.pro && <span className="absolute top-4 right-4 text-[11px] font-bold tracking-widest bg-[#ffc24b] text-black px-2.5 py-1 rounded-lg">PRO</span>}
      </div>

      {/* Header */}
      <div className="px-1 md:px-4 -mt-12 md:-mt-14 relative">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <Avatar img={ed.avatarImg} size={112} ring />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-extrabold text-[24px] md:text-[30px] tracking-tight">@{ed.username}</h1>
              {ed.verified && <BadgeCheck size={22} className="text-[#7c5cff]" />}
            </div>
            <p className="text-white/60 text-[14px] font-medium">{ed.displayName} · {ed.title}</p>
            <p className="text-[13px] text-[#b7a5ff] font-medium mt-0.5">{ed.specialties.join(" · ")}</p>
          </div>
          <div className="flex items-center gap-2">
            {isMine ? (
              <Link to="/settings" className="inline-flex items-center gap-2 border border-white/15 hover:bg-white/[.05] font-bold text-[13.5px] px-5 py-2.5 rounded-full transition-colors"><Settings size={15} /> Edit profile</Link>
            ) : (
              <>
                <FollowButton editorId={ed.id} />
                <button onClick={() => pushToast("Hire request noted", "Full hiring opens soon — the editor was notified")} className="inline-flex items-center gap-1.5 bg-white text-black hover:bg-white/85 font-bold text-[13px] px-5 py-2 rounded-full transition-colors"><Briefcase size={14} /> {ed.rate ? "Hire" : "Contact"}</button>
                <button onClick={() => pushToast("Profile link copied", "Share this editor with anyone")} className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-white/60 hover:text-white transition-colors"><Share2 size={15} /></button>
              </>
            )}
          </div>
        </div>

        <div className="mt-3"><LevelBadge level={ed.level} percentile={ed.percentile} /></div>

        <div className="flex items-center gap-4 mt-3.5 text-[13.5px] flex-wrap">
          <span><b className="font-display">{fmt(ed.totalViews)}</b> <span className="text-white/45">Views</span></span>
          <span><b className="font-display">{edits.length || ed.editsCount}</b> <span className="text-white/45">Edits</span></span>
          <span><b className="font-display">{fmt(followerCount)}</b> <span className="text-white/45">Followers</span></span>
          <span className="inline-flex items-center gap-1 text-[#34f5c5] font-semibold"><Flame size={14} /> {fmt(ed.rep)} REP</span>
        </div>
        {ed.rate && isMine === false && <p className="text-[12.5px] text-white/45 mt-1.5">Typical rate: {ed.rate} {ed.availableForHire && <span className="text-[#34f5c5] font-semibold">· Available for work</span>}</p>}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6 mt-7">
        <div>
          {featured.length > 0 && (
            <>
              <h2 className="font-display font-bold text-[17px] mb-3">Featured Work</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-7">
                {featured.map((e, i) => (
                  <motion.div key={e.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><EditCard edit={e} /></motion.div>
                ))}
              </div>
            </>
          )}
          <h2 className="font-display font-bold text-[17px] mb-3">All Edits · {edits.length || ed.editsCount}</h2>
          {edits.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center text-white/45 text-[13.5px]">No edits published yet.</div>
          ) : (
            <div className="columns-1 sm:columns-2 gap-4 [&>*]:mb-4">
              {edits.map((e) => (<div key={e.id} className="break-inside-avoid"><EditCard edit={e} /></div>))}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5">
            <h3 className="font-display font-bold text-[15px]">About</h3>
            <p className="text-white/60 text-[13.5px] leading-relaxed mt-2">{ed.bio}</p>
            <div className="flex items-center gap-1.5 text-[12.5px] text-white/45 mt-3"><MapPin size={13} /> {ed.location}</div>
            <div className="flex items-center gap-1.5 text-[12.5px] text-white/45 mt-1.5"><Calendar size={13} /> Joined {ed.joined}</div>
          </div>

          <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5">
            <h3 className="font-display font-bold text-[15px]">Skills</h3>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {ed.skills.map((s) => (<span key={s} className="text-[12px] font-semibold bg-[#7c5cff]/10 border border-[#7c5cff]/25 text-[#c9baff] px-2.5 py-1 rounded-lg">{s}</span>))}
            </div>
            <h3 className="font-display font-bold text-[15px] mt-4">Software</h3>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {ed.software.map((s) => (<span key={s} className="text-[12px] font-semibold bg-white/[.05] border border-white/10 text-white/65 px-2.5 py-1 rounded-lg">{s}</span>))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5">
            <h3 className="font-display font-bold text-[15px] flex items-center gap-1.5"><Award size={15} className="text-[#ffc24b]" /> Achievements</h3>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {achievements.map((a) => (
                <div key={a.label} className={`rounded-xl border p-3 ${a.gold ? "border-[#ffc24b]/35 bg-[#ffc24b]/[.06]" : "border-white/[.08] bg-white/[.02]"}`}>
                  <a.icon size={17} className={a.gold ? "text-[#ffc24b]" : "text-[#b7a5ff]"} />
                  <div className="text-[12px] font-bold mt-1.5 leading-tight">{a.label}</div>
                  <div className="text-[11px] text-white/45">{a.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#7c5cff]/25 bg-gradient-to-br from-[#7c5cff]/12 to-transparent p-5">
            <h3 className="font-display font-bold text-[15px]">Statistics</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3 text-[13px]">
              {[["Views", fmt(ed.totalViews)], ["Likes", fmt(ed.totalLikes)], ["Followers", fmt(followerCount)], ["Challenge wins", String(ed.challengeWins)], ["Battle wins", String(ed.battleWins)], ["Rep score", fmt(ed.rep)]].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between border-b border-white/[.06] pb-2"><span className="text-white/50">{l}</span><b className="font-display">{v}</b></div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-black/30 border border-white/[.07] p-3">
              <div className="flex justify-between text-[11.5px] font-semibold text-white/55"><span>Progress to LVL {ed.level + 1}</span><span className="text-[#34f5c5]">72%</span></div>
              <div className="h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#7c5cff] to-[#34f5c5]" /></div>
            </div>
          </div>

          {!isMine && (
            <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5 flex items-center gap-2 text-[12.5px] text-white/45">
              <Heart size={14} className="text-[#ff5c7a]" /> {user ? "You follow this editor's journey." : "Log in to follow and get notified of new cuts."}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default function EditorProfile() {
  const { id } = useParams();
  return <EditorProfileInner editorId={id!} />;
}
