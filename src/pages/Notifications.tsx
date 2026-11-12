import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, BellOff, CheckCheck, Heart, MessageCircle, Swords, Trophy, UserPlus, Briefcase, Sparkles } from "lucide-react";
import { NOTIFICATIONS, avatar } from "../lib/data";
import { useStore } from "../lib/store";
import { Avatar, EmptyState } from "../components/ui";
import { cn } from "../lib/cn";

const ICONS: Record<string, { icon: typeof Heart; bg: string; fg: string }> = {
  like: { icon: Heart, bg: "bg-[#ff5c7a]/12", fg: "text-[#ff5c7a]" },
  follow: { icon: UserPlus, bg: "bg-[#7c5cff]/12", fg: "text-[#b7a5ff]" },
  comment: { icon: MessageCircle, bg: "bg-[#6cb8ff]/12", fg: "text-[#6cb8ff]" },
  challenge: { icon: Trophy, bg: "bg-[#ffc24b]/12", fg: "text-[#ffc24b]" },
  system: { icon: Sparkles, bg: "bg-[#34f5c5]/12", fg: "text-[#34f5c5]" },
  hire: { icon: Briefcase, bg: "bg-[#34f5c5]/12", fg: "text-[#34f5c5]" },
};

export default function Notifications() {
  const { setNotifRead, notifRead } = useStore();
  const [filter, setFilter] = useState("All");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const items = NOTIFICATIONS.filter((n) => {
    const unread = !n.read && !readIds.has(n.id) && !notifRead;
    if (filter === "Unread") return unread;
    return true;
  });

  const markAll = () => {
    setReadIds(new Set(NOTIFICATIONS.map((n) => n.id)));
    setNotifRead(true);
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display font-extrabold text-[26px] tracking-tight">Notifications</h1>
          <p className="text-white/50 text-[13.5px]">Likes, follows, challenges and hire interest.</p>
        </div>
        <button onClick={markAll} className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#b7a5ff] hover:text-white border border-white/10 hover:border-white/25 rounded-full px-4 py-2 transition-colors"><CheckCheck size={15} /> Mark all read</button>
      </div>

      <div className="flex gap-2 mb-4">
        {["All", "Unread"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("px-4 py-2 rounded-full text-[13px] font-bold border", filter === f ? "bg-white text-black border-white" : "text-white/55 border-white/10 hover:text-white")}>{f}</button>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={<BellOff size={22} />} title="All caught up" desc="No unread notifications. Keep posting — the next like is around the corner." />
      ) : (
        <div className="space-y-2">
          {items.map((n) => {
            const unread = !n.read && !readIds.has(n.id) && !notifRead;
            const meta = ICONS[n.type];
            return (
              <div key={n.id} className={cn("flex items-start gap-3 rounded-2xl border p-4 transition-colors", unread ? "border-[#7c5cff]/30 bg-[#7c5cff]/[.06]" : "border-white/[.07] bg-[#101016]")}>
                <div className="relative shrink-0">
                  {n.actor === "CUTPOINT" ? <Avatar img={0} size={44} /> : <img src={avatar(n.avatarImg)} alt="" className="w-11 h-11 rounded-full object-cover" />}
                  <span className={cn("absolute -bottom-1 -right-1 w-6 h-6 rounded-full grid place-items-center border-2 border-[#07070c]", meta.bg, meta.fg)}><meta.icon size={12} /></span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] leading-snug"><b>@{n.actor}</b> <span className="text-white/70">{n.text}</span></p>
                  <div className="text-[12px] text-white/40 mt-1">{n.time}</div>
                  {n.editId && <Link to={`/edit/${n.editId}`} className="inline-block text-[12.5px] font-bold text-[#b7a5ff] hover:text-white mt-1.5">View edit →</Link>}
                </div>
                {unread && <span className="w-2 h-2 rounded-full bg-[#7c5cff] shrink-0 mt-2" />}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-4 flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-[#ffc24b]/12 text-[#ffc24b] grid place-items-center"><Trophy size={17} /></span>
          <div className="text-[12.5px]"><b>Challenge alerts on</b><div className="text-white/50">CYBERPUNK ends in 3 days</div></div>
        </div>
        <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-4 flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-[#7c5cff]/12 text-[#b7a5ff] grid place-items-center"><Swords size={17} /></span>
          <div className="text-[12.5px]"><b>Edit Battles soon</b><div className="text-white/50">Get notified at launch</div></div>
        </div>
      </div>
    </div>
  );
}
