import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Check, Eye, Lock, LogOut, Monitor, Shield, User } from "lucide-react";
import { useStore } from "../lib/store";
import { Avatar } from "../components/ui";
import { cn } from "../lib/cn";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Eye },
] as const;

export default function Settings() {
  const { user, updateUser, logout, pushToast } = useStore();
  const nav = useNavigate();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("profile");
  const [form, setForm] = useState({ displayName: user?.displayName ?? "", bio: "Cutting stories frame by frame.", location: "", rate: "" });
  const [toggles, setToggles] = useState({ likes: true, follows: true, challenges: true, hire: true, weekly: false });
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="max-w-[520px] mx-auto rounded-3xl border border-white/10 bg-[#101016] p-10 text-center">
        <Lock size={28} className="mx-auto text-[#7c5cff]" />
        <h1 className="font-display font-extrabold text-[22px] mt-4">Log in to manage settings</h1>
        <p className="text-white/55 text-[14px] mt-2">Your profile, notifications and privacy live here.</p>
        <button onClick={() => nav("/signup")} className="mt-5 bg-[#7c5cff] font-bold text-[14px] px-7 py-3 rounded-full">Join CUTPOINT</button>
      </div>
    );
  }

  const save = () => {
    updateUser({ displayName: form.displayName });
    setSaved(true);
    pushToast("Settings saved", "Your profile is up to date");
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ k, label, desc }: { k: keyof typeof toggles; label: string; desc: string }) => (
    <button onClick={() => setToggles((t) => ({ ...t, [k]: !t[k] }))} className="w-full flex items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.02] p-3.5 text-left hover:border-white/20 transition-colors">
      <span className="flex-1"><span className="block text-[13.5px] font-bold">{label}</span><span className="block text-[12px] text-white/45 mt-0.5">{desc}</span></span>
      <span className={cn("w-10 h-6 rounded-full p-1 transition-colors shrink-0", toggles[k] ? "bg-[#7c5cff]" : "bg-white/15")}>
        <span className={cn("block w-4 h-4 rounded-full bg-white transition-transform", toggles[k] && "translate-x-4")} />
      </span>
    </button>
  );

  const inp = "w-full bg-white/[.05] border border-white/10 focus:border-[#7c5cff]/70 rounded-xl px-4 py-3 text-[14px] outline-none placeholder:text-white/30 transition-colors";

  return (
    <div className="max-w-[860px] mx-auto">
      <h1 className="font-display font-extrabold text-[26px] tracking-tight">Settings</h1>
      <p className="text-white/50 text-[13.5px]">Manage your identity, account and attention.</p>
      <div className="grid md:grid-cols-[210px_1fr] gap-5 mt-6">
        <div className="flex md:flex-col gap-1.5 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={cn("flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold whitespace-nowrap", tab === t.id ? "bg-[#7c5cff]/15 text-white border border-[#7c5cff]/30" : "text-white/55 hover:text-white hover:bg-white/[.04] border border-transparent")}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
          <button onClick={() => { logout(); nav("/"); }} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold text-[#ff5c7a] hover:bg-[#ff5c7a]/10 whitespace-nowrap"><LogOut size={16} /> Log out</button>
        </div>

        <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5 md:p-6 min-h-[420px]">
          {tab === "profile" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar img={user.avatarImg} size={64} />
                <div><div className="font-bold text-[15px]">@{user.username}</div><button onClick={() => pushToast("Avatar upload soon", "Custom avatars ship with native uploads")} className="text-[12.5px] font-bold text-[#b7a5ff] hover:text-white mt-0.5">Change avatar</button></div>
              </div>
              <div><label className="text-[13px] font-bold block mb-1.5">Display name</label><input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} className={inp} /></div>
              <div><label className="text-[13px] font-bold block mb-1.5">Bio</label><textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className={inp + " resize-none"} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[13px] font-bold block mb-1.5">Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, Country" className={inp} /></div>
                <div><label className="text-[13px] font-bold block mb-1.5">Rate</label><input value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} placeholder="$120 / edit" className={inp} /></div>
              </div>
              <button onClick={save} className="inline-flex items-center gap-2 bg-[#7c5cff] hover:bg-[#8d71ff] font-bold text-[14px] px-6 py-3 rounded-xl transition-all">{saved ? <><Check size={16} /> Saved</> : "Save changes"}</button>
            </div>
          )}
          {tab === "account" && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-[16px]">Account</h3>
              {["Change email", "Change password", "Connected accounts (YouTube, TikTok)"].map((a) => (
                <button key={a} onClick={() => pushToast("Coming right up", `${a} ships in the next release`)} className="w-full text-left rounded-xl border border-white/[.08] bg-white/[.02] px-4 py-3.5 text-[13.5px] font-semibold hover:border-white/20 transition-colors">{a}</button>
              ))}
              <div className="rounded-xl border border-[#ffc24b]/30 bg-[#ffc24b]/[.06] p-4 text-[13px]">
                <b className="flex items-center gap-1.5"><Monitor size={14} /> CUTPOINT Pro — coming soon</b>
                <p className="text-white/55 mt-1">Priority ranking, 4K showcases, advanced analytics and a Pro badge.</p>
              </div>
            </div>
          )}
          {tab === "notifications" && (
            <div className="space-y-2.5">
              <h3 className="font-display font-bold text-[16px] mb-1">Notifications</h3>
              <Toggle k="likes" label="Likes & comments" desc="When someone engages with your edits" />
              <Toggle k="follows" label="New followers" desc="Grow alerts in real time" />
              <Toggle k="challenges" label="Challenge deadlines" desc="48h + 6h reminders before close" />
              <Toggle k="hire" label="Hire interest" desc="When creators save you to a shortlist" />
              <Toggle k="weekly" label="Weekly recap email" desc="Your stats, every Monday" />
            </div>
          )}
          {tab === "privacy" && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-[16px]">Privacy & safety</h3>
              <div className="rounded-xl border border-white/[.08] p-4 text-[13.5px] text-white/65 leading-relaxed flex gap-2.5"><Shield size={17} className="text-[#34f5c5] shrink-0 mt-0.5" /> Showcase rule: post original edits or credited footage. Stolen work is removed and hurts REP.</div>
              {["Profile visibility: Public", "Show my likes publicly", "Allow hire inquiries"].map((a) => (
                <div key={a} className="rounded-xl border border-white/[.08] bg-white/[.02] px-4 py-3.5 text-[13.5px] font-semibold flex items-center justify-between">{a}<span className="text-[11px] font-bold text-[#34f5c5] bg-[#34f5c5]/10 px-2 py-1 rounded-md">ON</span></div>
              ))}
              <button onClick={() => pushToast("Export started", "We'll email your data archive shortly")} className="text-[13px] font-bold text-white/55 hover:text-white">Download my data →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
