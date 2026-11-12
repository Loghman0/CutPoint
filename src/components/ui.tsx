import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Bookmark, Eye, Heart, MessageCircle, Play, Plus, Check, Flame, Clock } from "lucide-react";
import { avatar, editorById, fmt, thumb, type Edit } from "../lib/data";
import { useStore } from "../lib/store";
import { cn } from "../lib/cn";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group shrink-0">
      <div className="relative w-9 h-9 rounded-xl bg-[#7c5cff] grid place-items-center shadow-[0_0_28px_rgba(124,92,255,.45)] group-hover:shadow-[0_0_36px_rgba(124,92,255,.65)] transition-shadow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 5.5v13l8-3.2 8-3.3-8-3.3-8-3.2Z" fill="white" />
          <path d="M4 5.5 12 8.7v6.6L4 12V5.5Z" fill="white" opacity=".55" />
        </svg>
        <span className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-[#34f5c5] border-2 border-[#07070c]" />
      </div>
      {!compact && (
        <div className="leading-none">
          <div className="font-display font-800 font-extrabold tracking-tight text-[17px]">CUTPOINT</div>
          <div className="text-[10px] tracking-[.22em] text-white/40 font-semibold mt-0.5">EDITORS HOME</div>
        </div>
      )}
    </Link>
  );
}

export function Avatar({ img, size = 40, ring = false }: { img: number; size?: number; ring?: boolean }) {
  if (img === 0)
    return (
      <div style={{ width: size, height: size }} className="rounded-full bg-[#7c5cff] grid place-items-center shrink-0 font-display font-bold text-white text-xs">CP</div>
    );
  return (
    <img
      src={avatar(img)}
      alt="avatar"
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size }}
      className={cn("rounded-full object-cover shrink-0 bg-white/10", ring && "ring-2 ring-[#7c5cff] ring-offset-2 ring-offset-[#07070c]")}
    />
  );
}

export function FollowButton({ editorId, size = "md" }: { editorId: string; size?: "sm" | "md" }) {
  const { isFollowing, toggleFollow, user } = useStore();
  const nav = useNavigate();
  const on = isFollowing(editorId);
  return (
    <button
      onClick={(e) => {
        e.preventDefault(); e.stopPropagation();
        if (!user) return nav("/signup");
        toggleFollow(editorId);
      }}
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-full transition-all active:scale-95",
        size === "sm" ? "text-[12px] px-3.5 py-1.5" : "text-[13px] px-5 py-2",
        on ? "bg-white/10 text-white hover:bg-white/15 border border-white/10"
          : "bg-[#7c5cff] text-white hover:bg-[#8d71ff] shadow-[0_4px_20px_rgba(124,92,255,.4)]"
      )}
    >
      {on ? <><Check size={14} /> Following</> : <><Plus size={14} /> Follow</>}
    </button>
  );
}

export function LikeButton({ editId, count, big = false }: { editId: string; count: number; big?: boolean }) {
  const { isLiked, toggleLike } = useStore();
  const [pop, setPop] = useState(false);
  const on = isLiked(editId);
  return (
    <button
      onClick={(e) => {
        e.preventDefault(); e.stopPropagation();
        toggleLike(editId);
        setPop(true); setTimeout(() => setPop(false), 350);
      }}
      className={cn("inline-flex items-center gap-1.5 font-semibold transition-colors", big ? "text-[15px]" : "text-[12.5px]", on ? "text-[#ff5c7a]" : "text-white/60 hover:text-white")}
    >
      <motion.span animate={pop ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.3 }} className="grid place-items-center">
        <Heart size={big ? 21 : 16} fill={on ? "currentColor" : "none"} strokeWidth={2.2} />
      </motion.span>
      {fmt(count + (on ? 1 : 0))}
    </button>
  );
}

export function SaveButton({ editId, iconOnly = true }: { editId: string; iconOnly?: boolean }) {
  const { isSaved, toggleSave } = useStore();
  const on = isSaved(editId);
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(editId); }}
      className={cn("inline-flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors", on ? "text-[#ffc24b]" : "text-white/60 hover:text-white")}
    >
      <Bookmark size={16} fill={on ? "currentColor" : "none"} strokeWidth={2.2} />
      {!iconOnly && (on ? "Saved" : "Save")}
    </button>
  );
}

export function VideoTile({ edit, eager = false }: { edit: Edit; eager?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={cn("relative overflow-hidden bg-[#12121a] group/tile", edit.aspect === "vertical" ? "aspect-[9/16]" : "aspect-video")}
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
    >
      <img
        src={thumb(edit.id + edit.title.length, edit.aspect)}
        alt={edit.title}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={cn("absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/tile:scale-[1.04]", loaded ? "opacity-100" : "opacity-0", playing && "opacity-0")}
      />
      {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
      {playing && (
        <video
          src={edit.videoSrc}
          muted loop playsInline autoPlay
          poster={thumb(edit.id + edit.title.length, edit.aspect)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />
      <div className="absolute inset-0 grid place-items-center opacity-0 group-hover/tile:opacity-100 transition-opacity pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/25 grid place-items-center">
          <Play size={18} className="text-white ml-0.5" fill="currentColor" />
        </div>
      </div>
      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-black/60 backdrop-blur px-2 py-1 rounded-md text-white/90">
          <Play size={10} fill="currentColor" /> {edit.duration}
        </span>
        {edit.aspect === "vertical" && (
          <span className="text-[10px] font-mono font-semibold bg-black/60 backdrop-blur px-1.5 py-1 rounded text-white/70">9:16</span>
        )}
      </div>
      {edit.trending && (
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[10.5px] font-bold bg-[#ff5c3d]/90 backdrop-blur px-2 py-1 rounded-md text-white uppercase tracking-wide">
          <Flame size={11} /> Trending
        </span>
      )}
    </div>
  );
}

export function EditCard({ edit }: { edit: Edit }) {
  const ed = editorById(edit.editorId);
  return (
    <Link to={`/edit/${edit.id}`} className="group block rounded-2xl overflow-hidden bg-[#101016] border border-white/[.07] hover:border-[#7c5cff]/50 hover:shadow-[0_8px_40px_rgba(124,92,255,.18)] transition-all duration-300 hover:-translate-y-1">
      <VideoTile edit={edit} />
      <div className="p-3.5">
        <div className="flex items-start gap-2.5">
          <Link to={`/editor/${ed.id}`} onClick={(e) => e.stopPropagation()} className="shrink-0 hover:opacity-80">
            <Avatar img={ed.avatarImg} size={34} />
          </Link>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-[13.5px] leading-snug clamp-2 group-hover:text-[#b7a5ff] transition-colors">{edit.title}</h3>
            <Link to={`/editor/${ed.id}`} onClick={(e) => e.stopPropagation()} className="mt-1 flex items-center gap-1 text-[12px] text-white/55 hover:text-white transition-colors">
              <span className="truncate font-medium">@{ed.username}</span>
              {ed.verified && <BadgeCheck size={13} className="text-[#7c5cff] shrink-0" />}
            </Link>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3.5 text-white/60">
          <LikeButton editId={edit.id} count={edit.likes} />
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold"><MessageCircle size={16} /> {fmt(edit.commentsCount)}</span>
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold"><Eye size={16} /> {fmt(edit.views)}</span>
          <span className="ml-auto" onClick={(e) => { e.preventDefault(); }}><SaveButton editId={edit.id} /></span>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#b7a5ff] bg-[#7c5cff]/12 border border-[#7c5cff]/25 px-2 py-0.5 rounded-md">{edit.category}</span>
          <span className="text-[10.5px] font-medium text-white/45">{edit.software[0]}</span>
          <span className="text-[10.5px] text-white/30 ml-auto inline-flex items-center gap-1"><Clock size={10} />{edit.timeAgo}</span>
        </div>
      </div>
    </Link>
  );
}

export function SectionHead({ kicker, title, desc, action }: { kicker?: string; title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        {kicker && <div className="text-[11px] font-bold tracking-[.2em] text-[#7c5cff] uppercase mb-1.5">{kicker}</div>}
        <h2 className="font-display font-bold text-[22px] md:text-[26px] tracking-tight">{title}</h2>
        {desc && <p className="text-white/50 text-[13.5px] mt-1 max-w-xl">{desc}</p>}
      </div>
      {action && <div className="shrink-0 hidden sm:block">{action}</div>}
    </div>
  );
}

export function LevelBadge({ level, percentile }: { level: number; percentile: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="font-mono text-[11px] font-semibold bg-gradient-to-r from-[#7c5cff] to-[#a78bfa] text-white px-2.5 py-1 rounded-lg tracking-wide">LVL {level}</span>
      <span className="font-mono text-[11px] font-semibold bg-[#ffc24b]/12 text-[#ffc24b] border border-[#ffc24b]/30 px-2.5 py-1 rounded-lg tracking-wide">{percentile}</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#101016] border border-white/[.06]">
      <div className="aspect-video skeleton-shimmer" />
      <div className="p-3.5 space-y-2.5">
        <div className="h-3.5 rounded skeleton-shimmer w-4/5" />
        <div className="h-3 rounded skeleton-shimmer w-2/5" />
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, desc, action }: { icon: React.ReactNode; title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[.02] py-14 px-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-2xl bg-[#7c5cff]/12 border border-[#7c5cff]/25 grid place-items-center text-[#b7a5ff] mb-4">{icon}</div>
      <h3 className="font-display font-bold text-[17px]">{title}</h3>
      <p className="text-white/50 text-[13.5px] mt-1.5 max-w-sm mx-auto">{desc}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
