import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Check, Clapperboard, Sparkles } from "lucide-react";
import { CATEGORIES } from "../lib/data";
import { Logo } from "../components/ui";
import { useStore } from "../lib/store";

export default function Onboarding() {
  const nav = useNavigate();
  const { user, updateUser, setOnboardingDone, pushToast } = useStore();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<"editor" | "creator">(user?.role ?? "editor");
  const [picks, setPicks] = useState<string[]>(user?.interests ?? []);

  const toggle = (c: string) => setPicks((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const finish = () => {
    updateUser({ role, interests: picks });
    setOnboardingDone(true);
    pushToast("Welcome to CUTPOINT", picks.length ? `Your feed is tuned for ${picks.slice(0, 3).join(", ")}` : "Your personalized feed is ready");
    nav("/home");
  };

  return (
    <div className="min-h-screen bg-[#07070c] text-white flex flex-col">
      <header className="max-w-[720px] w-full mx-auto px-5 pt-6 flex items-center justify-between">
        <Logo />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i <= step ? "bg-[#7c5cff]" : "bg-white/10"}`} />
          ))}
        </div>
      </header>

      <div className="flex-1 grid place-items-center px-5 py-10">
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-[640px]">
          {step === 0 && (
            <div className="text-center">
              <h1 className="font-display font-extrabold text-[32px] md:text-[44px] tracking-tight">What brings you<br />to CUTPOINT?</h1>
              <p className="text-white/55 text-[15px] mt-3">We'll tune your entire experience around it.</p>
              <div className="grid sm:grid-cols-2 gap-3.5 mt-8 text-left">
                <button onClick={() => setRole("editor")} className={`rounded-2xl border p-6 text-left transition-all hover:-translate-y-0.5 ${role === "editor" ? "border-[#7c5cff] bg-[#7c5cff]/10 shadow-[0_0_40px_rgba(124,92,255,.25)]" : "border-white/10 bg-white/[.02]"}`}>
                  <span className="w-11 h-11 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/30 grid place-items-center text-[#b7a5ff]"><Clapperboard size={20} /></span>
                  <div className="font-display font-bold text-[18px] mt-4 flex items-center gap-2">I'm an Editor {role === "editor" && <Check size={17} className="text-[#34f5c5]" />}</div>
                  <p className="text-white/50 text-[13.5px] mt-1.5 leading-relaxed">Share edits, join challenges, climb rankings and get hired.</p>
                </button>
                <button onClick={() => setRole("creator")} className={`rounded-2xl border p-6 text-left transition-all hover:-translate-y-0.5 ${role === "creator" ? "border-[#34f5c5] bg-[#34f5c5]/[.07] shadow-[0_0_40px_rgba(52,245,197,.15)]" : "border-white/10 bg-white/[.02]"}`}>
                  <span className="w-11 h-11 rounded-xl bg-[#34f5c5]/10 border border-[#34f5c5]/30 grid place-items-center text-[#34f5c5]"><Briefcase size={20} /></span>
                  <div className="font-display font-bold text-[18px] mt-4 flex items-center gap-2">I'm a Creator {role === "creator" && <Check size={17} className="text-[#34f5c5]" />}</div>
                  <p className="text-white/50 text-[13.5px] mt-1.5 leading-relaxed">Discover editors by style, follow talent, build a hire shortlist.</p>
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="text-center">
              <h1 className="font-display font-extrabold text-[30px] md:text-[40px] tracking-tight">{role === "editor" ? "What do you cut?" : "What talent do you need?"}</h1>
              <p className="text-white/55 text-[15px] mt-3">Pick at least 3 — this powers your For You feed. {picks.length}/9 selected</p>
              <div className="flex flex-wrap justify-center gap-2.5 mt-8">
                {CATEGORIES.map((c) => {
                  const on = picks.includes(c.name);
                  return (
                    <button key={c.name} onClick={() => toggle(c.name)} className={`px-5 py-3 rounded-full text-[14px] font-bold border transition-all active:scale-95 ${on ? "bg-[#7c5cff] border-[#7c5cff] shadow-[0_4px_20px_rgba(124,92,255,.4)]" : "bg-white/[.04] border-white/12 text-white/65 hover:border-white/30 hover:text-white"}`}>
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#34f5c5] bg-[#34f5c5]/10 border border-[#34f5c5]/25 px-3 py-1.5 rounded-full"><Sparkles size={13} /> YOUR CUTPOINT IS READY</span>
              <h1 className="font-display font-extrabold text-[30px] md:text-[42px] tracking-tight mt-4">Show your work →<br /><span className="bg-gradient-to-r from-[#7c5cff] to-[#34f5c5] bg-clip-text text-transparent">Build your reputation.</span></h1>
              <div className="grid grid-cols-3 gap-2.5 mt-8 text-left">
                {["Post your first edit", "Enter CYBERPUNK challenge", "Follow 5 editors"].map((t, i) => (
                  <div key={t} className="rounded-2xl border border-white/10 bg-white/[.02] p-4">
                    <div className="font-mono text-[11px] text-[#7c5cff] font-bold">0{i + 1}</div>
                    <div className="text-[13.5px] font-bold mt-1 leading-snug">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-9">
            <button onClick={() => (step === 0 ? nav("/") : setStep(step - 1))} className="text-[14px] font-semibold text-white/50 hover:text-white px-4 py-2.5">{step === 0 ? "Skip" : "Back"}</button>
            {step < 2 ? (
              <button onClick={() => setStep(step + 1)} disabled={step === 1 && picks.length < 1} className="inline-flex items-center gap-2 bg-white text-black font-bold text-[14.5px] px-7 py-3 rounded-full hover:bg-white/85 disabled:opacity-40 transition-all">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={finish} className="inline-flex items-center gap-2 bg-[#7c5cff] hover:bg-[#8d71ff] font-bold text-[14.5px] px-8 py-3 rounded-full shadow-[0_6px_28px_rgba(124,92,255,.5)] transition-all">
                Enter CUTPOINT <ArrowRight size={16} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
