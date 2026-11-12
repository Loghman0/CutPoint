import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AtSign, Check, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Logo } from "../components/ui";
import { useStore } from "../lib/store";
import { thumb } from "../lib/data";

export function AuthShell({ children, title, sub }: { children: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="min-h-screen bg-[#07070c] text-white grid lg:grid-cols-2">
      <div className="hidden lg:block relative overflow-hidden">
        <img src={thumb("cut-auth-side", "vertical")} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/60 to-[#7c5cff]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07070c]/60" />
        <div className="absolute bottom-0 p-10">
          <div className="flex -space-x-3 mb-4">
            {[12, 47, 32, 13].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/80?img=${i}`} className="w-10 h-10 rounded-full border-2 border-[#07070c] object-cover" alt="" />
            ))}
            <span className="w-10 h-10 rounded-full bg-[#7c5cff] border-2 border-[#07070c] grid place-items-center text-[11px] font-bold">128K</span>
          </div>
          <p className="font-display font-bold text-[26px] leading-tight max-w-sm">“I posted one AMV and got three client DMs in a week.”</p>
          <p className="text-white/60 text-[13.5px] mt-2">— @yuki.amv, Top 2% editor</p>
        </div>
        <div className="absolute top-6 left-6"><Logo /></div>
      </div>
      <div className="flex flex-col px-5 md:px-12 py-6 max-w-[560px] w-full mx-auto justify-center min-h-screen">
        <div className="lg:hidden mb-8"><Logo /></div>
        <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white mb-7 w-fit"><ArrowLeft size={15} /> Back home</Link>
        <h1 className="font-display font-extrabold tracking-tight text-[30px] md:text-[36px]">{title}</h1>
        <p className="text-white/55 text-[14.5px] mt-2">{sub}</p>
        <div className="mt-7">{children}</div>
      </div>
    </div>
  );
}

function Field({ icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 bg-white/[.05] border border-white/10 focus-within:border-[#7c5cff]/70 rounded-xl px-4 transition-colors">
      <span className="text-white/40">{icon}</span>
      <input {...props} className="bg-transparent flex-1 py-3.5 text-[14px] placeholder:text-white/30 outline-none" />
    </label>
  );
}

export function Signup() {
  const nav = useNavigate();
  const { login, setOnboardingDone } = useStore();
  const [role, setRole] = useState<"editor" | "creator">("editor");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = () => {
    if (form.username.trim().length < 3) return setErr("Pick a handle with at least 3 characters.");
    if (!form.email.includes("@")) return setErr("Enter a valid email address.");
    if (form.password.length < 6) return setErr("Password needs at least 6 characters.");
    setErr("");
    login({ username: form.username.replace(/[^a-zA-Z0-9._]/g, "").toLowerCase() || "you.cuts", displayName: form.username || "You", role, interests: [], avatarImg: 5 });
    setOnboardingDone(false);
    nav("/onboarding");
  };

  return (
    <AuthShell title="Claim your handle." sub="Join 128,400+ editors building reputation, competing and getting discovered.">
      <div className="grid grid-cols-2 gap-2.5 p-1.5 rounded-2xl bg-white/[.04] border border-white/10 mb-5">
        {(["editor", "creator"] as const).map((r) => (
          <button key={r} onClick={() => setRole(r)} className={`rounded-xl py-3 px-3 text-left transition-all ${role === r ? "bg-[#7c5cff] shadow-[0_4px_20px_rgba(124,92,255,.4)]" : "hover:bg-white/[.05]"}`}>
            <div className="text-[14px] font-bold capitalize flex items-center gap-2">{r === "editor" ? "🎬 I'm an Editor" : "💡 I'm a Creator"} {role === r && <Check size={15} />}</div>
            <div className={`text-[12px] mt-0.5 ${role === r ? "text-white/80" : "text-white/45"}`}>{r === "editor" ? "Share work & build rep" : "Discover & hire talent"}</div>
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <Field icon={<AtSign size={17} />} placeholder="Handle — e.g. kaito.cuts" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Field icon={<Mail size={17} />} placeholder="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <div className="relative">
          <Field icon={<Lock size={17} />} placeholder="Password (6+ characters)" type={show ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>
        </div>
      </div>
      {err && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#ff5c7a] text-[13px] font-medium mt-3">{err}</motion.p>}
      <button onClick={submit} className="w-full mt-5 bg-[#7c5cff] hover:bg-[#8d71ff] font-bold text-[15px] py-3.5 rounded-xl shadow-[0_6px_28px_rgba(124,92,255,.45)] transition-all active:scale-[.99]">Create free account</button>
      <p className="text-center text-[13px] text-white/45 mt-4">Already cutting here? <Link to="/login" className="text-[#b7a5ff] font-semibold hover:text-white">Log in</Link></p>
      <p className="text-center text-[11.5px] text-white/30 mt-5">By joining you agree to showcase rules: original edits or credited footage only.</p>
    </AuthShell>
  );
}

export function Login() {
  const nav = useNavigate();
  const { login } = useStore();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = () => {
    if (!form.email.includes("@")) return setErr("Enter a valid email address.");
    if (form.password.length < 4) return setErr("Enter your password.");
    login({ username: "you.cuts", displayName: "You", role: "editor", interests: ["Gaming", "Anime", "Cinematic"], avatarImg: 5 });
    nav("/home");
  };

  return (
    <AuthShell title="Welcome back, editor." sub="Your feed, challenges and reputation kept warming up without you.">
      <div className="space-y-3">
        <Field icon={<Mail size={17} />} placeholder="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <div className="relative">
          <Field icon={<Lock size={17} />} placeholder="Password" type={show ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>
        </div>
      </div>
      {err && <p className="text-[#ff5c7a] text-[13px] font-medium mt-3">{err}</p>}
      <button onClick={submit} className="w-full mt-5 bg-white text-black hover:bg-white/85 font-bold text-[15px] py-3.5 rounded-xl transition-all active:scale-[.99]">Log in</button>
      <button onClick={() => { login({ username: "you.cuts", displayName: "You", role: "editor", interests: ["Gaming", "Anime", "Cinematic"], avatarImg: 5 }); nav("/home"); }} className="w-full mt-2.5 border border-white/15 hover:bg-white/[.05] font-bold text-[14px] py-3.5 rounded-xl transition-all">
        Continue as demo editor →
      </button>
      <p className="text-center text-[13px] text-white/45 mt-4">New here? <Link to="/signup" className="text-[#b7a5ff] font-semibold hover:text-white">Create account</Link></p>
    </AuthShell>
  );
}
