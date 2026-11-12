import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, ExternalLink, Eye, ImagePlus, Link2, Lock, Tag, Type } from "lucide-react";
import { CATEGORIES, thumb } from "../lib/data";
import { useStore } from "../lib/store";
import { cn } from "../lib/cn";

const SOFTWARE = ["Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "Final Cut Pro", "Blender", "Photoshop", "Alight Motion"];
const SKILLS = ["Velocity Sync", "Color Grading", "Motion Design", "Sound Design", "Masking", "Kinetic Type", "Compositing", "Retention", "Hooks", "Transitions"];

const STEPS = ["Video", "Details", "Publish"];

export default function Create() {
  const nav = useNavigate();
  const { user, publishEdit, pushToast } = useStore();
  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    url: "", title: "", description: "", category: "Gaming",
    tags: "", software: ["Premiere Pro"], skills: ["Velocity Sync"],
    visibility: "Public", aspect: "vertical" as "vertical" | "landscape",
  });

  const toggle = (key: "software" | "skills", v: string) =>
    setF((s) => ({ ...s, [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : [...s[key], v] }));

  const validVideo = f.url.trim().length > 6 || f.title.trim().length > 2;
  const validDetails = f.title.trim().length >= 4 && f.description.trim().length >= 10;

  const publish = () => {
    const id = `u${Date.now()}`;
    const tagList = f.tags.split(/[,\s]+/).map((t) => t.replace("#", "").trim().toLowerCase()).filter(Boolean).slice(0, 8);
    publishEdit({
      id, title: f.title.trim(), description: f.description.trim(),
      editorId: "e1", category: f.category as never, tags: tagList.length ? tagList : ["fresh", "community"],
      software: f.software, skills: f.skills, aspect: f.aspect,
      likes: 0, commentsCount: 0, views: 12, saves: 0,
      duration: f.aspect === "vertical" ? "0:45" : "2:10", timeAgo: "Just now", hoursAgo: 0,
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    });
    // If logged in as demo user, attribute to own profile via myEdits shown in /me — keep editorId mapping simple: still show in feed
    nav(`/edit/${id}`);
  };

  const inp = "w-full bg-white/[.05] border border-white/10 focus:border-[#7c5cff]/70 rounded-xl px-4 py-3 text-[14px] outline-none placeholder:text-white/30 transition-colors";

  return (
    <div className="max-w-[880px] mx-auto">
      <h1 className="font-display font-extrabold text-[26px] md:text-[32px] tracking-tight">Publish an Edit</h1>
      <p className="text-white/55 text-[14px] mt-1">External video links for now — native uploads are coming soon.</p>

      {/* Stepper */}
      <div className="flex items-center gap-2 mt-6 mb-7">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
            <button onClick={() => i < step && setStep(i)} className={cn("flex items-center gap-2 text-[13px] font-bold", i <= step ? "text-white" : "text-white/35")}>
              <span className={cn("w-7 h-7 rounded-full grid place-items-center text-[12px] font-mono font-bold", i < step ? "bg-[#34f5c5] text-black" : i === step ? "bg-[#7c5cff] text-white" : "bg-white/10 text-white/40")}>{i < step ? <Check size={14} /> : i + 1}</span>
              {s}
            </button>
            {i < STEPS.length - 1 && <span className={cn("flex-1 h-px", i < step ? "bg-[#34f5c5]/50" : "bg-white/10")} />}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_280px] gap-5">
        <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-white/[.08] bg-[#101016] p-5 md:p-6">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-bold flex items-center gap-1.5 mb-2"><Link2 size={14} className="text-[#7c5cff]" /> Video URL / embed</label>
                <input value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} placeholder="YouTube, TikTok, Drive or direct .mp4 link…" className={inp} />
                <p className="text-[12px] text-white/40 mt-1.5">Paste any public link. We'll generate the player + thumbnail automatically.</p>
              </div>
              <div>
                <label className="text-[13px] font-bold mb-2 block">Format</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(["vertical", "landscape"] as const).map((a) => (
                    <button key={a} onClick={() => setF({ ...f, aspect: a })} className={cn("rounded-xl border p-3.5 flex items-center gap-3 transition-all", f.aspect === a ? "border-[#7c5cff] bg-[#7c5cff]/10" : "border-white/10 bg-white/[.02] hover:border-white/25")}>
                      <span className={cn("rounded bg-white/10 border border-white/15", a === "vertical" ? "w-6 h-10" : "w-12 h-7")} />
                      <span className="text-left"><span className="block text-[13.5px] font-bold capitalize">{a}</span><span className="block text-[11.5px] text-white/45 font-mono">{a === "vertical" ? "9:16" : "16:9"}</span></span>
                      {f.aspect === a && <Check size={15} className="ml-auto text-[#34f5c5]" />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[13px] font-bold flex items-center gap-1.5 mb-2"><ImagePlus size={14} className="text-[#7c5cff]" /> Thumbnail <span className="text-white/35 font-medium">(optional)</span></label>
                <div className="rounded-xl border border-dashed border-white/15 bg-white/[.02] py-8 text-center text-[13px] text-white/45 hover:border-[#7c5cff]/50 hover:text-white/70 transition-colors cursor-pointer" onClick={() => pushToast("Auto-thumbnail on", "We'll pull frames from your video URL")}>Drop an image, or we'll auto-generate one <span className="text-[#b7a5ff] font-semibold">from your video</span></div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-bold flex items-center gap-1.5 mb-2"><Type size={14} className="text-[#7c5cff]" /> Title</label>
                <input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="NEON RONIN — Jujutsu Kaisen 4K AMV" maxLength={90} className={inp} />
                <div className="text-right text-[11px] text-white/30 font-mono mt-1">{f.title.length}/90</div>
              </div>
              <div>
                <label className="text-[13px] font-bold mb-2 block">Description</label>
                <textarea value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} placeholder="What did you make, how long did it take, what should people watch for?" rows={4} maxLength={600} className={cn(inp, "resize-none")} />
              </div>
              <div>
                <label className="text-[13px] font-bold mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button key={c.name} onClick={() => setF({ ...f, category: c.name })} className={cn("px-3.5 py-2 rounded-full text-[12.5px] font-bold border transition-all", f.category === c.name ? "bg-[#7c5cff] border-[#7c5cff]" : "bg-white/[.04] border-white/10 text-white/60 hover:text-white")}>{c.name}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[13px] font-bold flex items-center gap-1.5 mb-2"><Tag size={14} className="text-[#7c5cff]" /> Tags</label>
                <input value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} placeholder="velocity, amv, glow — comma separated" className={inp} />
              </div>
              <div>
                <label className="text-[13px] font-bold mb-2 block">Software used</label>
                <div className="flex flex-wrap gap-2">
                  {SOFTWARE.map((s) => (
                    <button key={s} onClick={() => toggle("software", s)} className={cn("px-3 py-1.5 rounded-lg text-[12.5px] font-semibold border transition-all", f.software.includes(s) ? "bg-white text-black border-white" : "border-white/12 text-white/55 hover:text-white")}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[13px] font-bold mb-2 block">Skills shown</label>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((s) => (
                    <button key={s} onClick={() => toggle("skills", s)} className={cn("px-3 py-1.5 rounded-lg text-[12.5px] font-semibold border transition-all", f.skills.includes(s) ? "bg-[#7c5cff]/20 border-[#7c5cff]/50 text-[#c9baff]" : "border-white/12 text-white/55 hover:text-white")}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[13px] font-bold flex items-center gap-1.5 mb-2"><Eye size={14} className="text-[#7c5cff]" /> Visibility</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Public", "Unlisted"].map((v) => (
                    <button key={v} onClick={() => setF({ ...f, visibility: v })} className={cn("rounded-xl border py-3 text-[13.5px] font-bold flex items-center justify-center gap-2", f.visibility === v ? "border-[#7c5cff] bg-[#7c5cff]/10" : "border-white/10 text-white/55")}>{v === "Unlisted" && <Lock size={14} />}{v}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 text-[13px] font-bold text-[#34f5c5]"><Check size={15} /> Ready to ship</div>
              <h3 className="font-display font-extrabold text-[20px] mt-2 leading-tight">{f.title || "Untitled edit"}</h3>
              <p className="text-white/55 text-[13.5px] mt-1.5 leading-relaxed clamp-2">{f.description || "No description yet."}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#b7a5ff] bg-[#7c5cff]/12 border border-[#7c5cff]/25 px-2 py-1 rounded-md">{f.category}</span>
                {f.software.map((s) => <span key={s} className="text-[11.5px] text-white/55 bg-white/[.05] px-2 py-1 rounded-md">{s}</span>)}
              </div>
              <div className="mt-4 rounded-xl border border-white/10 overflow-hidden flex gap-4 bg-black/30">
                <img src={thumb("preview-" + f.title.length, f.aspect)} alt="" className={cn("object-cover bg-white/5", f.aspect === "vertical" ? "w-20 aspect-[9/16]" : "w-40 aspect-video")} />
                <div className="py-3 pr-4 text-[12.5px] text-white/55 space-y-1">
                  <div className="flex items-center gap-1.5"><ExternalLink size={12} /> {f.url ? f.url.slice(0, 38) + (f.url.length > 38 ? "…" : "") : "Direct upload preview"}</div>
                  <div>Format: <b className="text-white">{f.aspect} {f.aspect === "vertical" ? "9:16" : "16:9"}</b></div>
                  <div>Visibility: <b className="text-white">{f.visibility}</b></div>
                  <div>Posting as: <b className="text-white">@{user?.username ?? "you.cuts"}</b></div>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-[#34f5c5]/[.06] border border-[#34f5c5]/25 p-3.5 text-[12.5px] text-white/65 leading-relaxed">Publishing earns <b className="text-[#34f5c5]">+50 REP</b>. Challenge-tagged edits earn double during active events.</div>
            </div>
          )}

          <div className="flex items-center justify-between mt-7 pt-5 border-t border-white/[.07]">
            <button onClick={() => (step === 0 ? nav(-1) : setStep(step - 1))} className="inline-flex items-center gap-1 text-[14px] font-semibold text-white/50 hover:text-white px-2 py-2"><ChevronLeft size={16} /> {step === 0 ? "Cancel" : "Back"}</button>
            {step < 2 ? (
              <button onClick={() => setStep(step + 1)} disabled={step === 0 ? !validVideo : !validDetails} className="inline-flex items-center gap-1.5 bg-white text-black font-bold text-[14px] px-6 py-3 rounded-full hover:bg-white/85 disabled:opacity-30 transition-all">Continue <ChevronRight size={16} /></button>
            ) : (
              <button onClick={publish} className="bg-[#7c5cff] hover:bg-[#8d71ff] font-bold text-[14.5px] px-8 py-3 rounded-full shadow-[0_6px_28px_rgba(124,92,255,.5)] transition-all active:scale-[.98]">Publish Edit</button>
            )}
          </div>
        </motion.div>

        {/* Tips rail */}
        <aside className="space-y-3 h-fit md:sticky md:top-24">
          <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-4.5 p-5">
            <h4 className="font-display font-bold text-[14px]">Edits that pop</h4>
            <ul className="text-[12.5px] text-white/55 space-y-2 mt-2.5 leading-relaxed">
              <li>⚡ Hook in the first 2 seconds</li>
              <li>🏷️ 3–6 specific tags beat 20 vague ones</li>
              <li>🛠️ List real software — creators filter by it</li>
              <li>🏆 Tag challenge entries to earn 2× REP</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#7c5cff]/25 bg-[#7c5cff]/[.07] p-5">
            <h4 className="font-display font-bold text-[14px]">Native uploads soon</h4>
            <p className="text-[12.5px] text-white/55 mt-1.5 leading-relaxed">Direct 4K uploads, auto-captions and version history are on the roadmap. External links keep the MVP fast and free.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
