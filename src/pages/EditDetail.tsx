import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, Bookmark, Eye, Flag, Heart, MessageCircle, Play, Send, Share2 } from "lucide-react";
import { COMMENTS, avatar, editById, editorById, fmt, thumb } from "../lib/data";
import { useStore } from "../lib/store";
import { Avatar, EditCard, FollowButton, LikeButton, SaveButton } from "../components/ui";

export default function EditDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { allEdits, commentsExtra, addComment, isLiked, toggleLike, isSaved, toggleSave, pushToast, user } = useStore();
  const [comment, setComment] = useState("");
  const [shared, setShared] = useState(false);

  const edit = useMemo(() => allEdits.find((e) => e.id === id), [allEdits, id]);
  if (!edit) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
        <h2 className="font-display font-bold text-[20px]">Edit not found</h2>
        <p className="text-white/50 text-[14px] mt-2">It may have been removed or the link is wrong.</p>
        <button onClick={() => nav("/home")} className="mt-5 bg-[#7c5cff] font-bold text-[13.5px] px-6 py-2.5 rounded-full">Back to feed</button>
      </div>
    );
  }
  const ed = editorById(edit.editorId);
  const baseComments = COMMENTS.filter((c) => c.editId === edit.id);
  const extra = (commentsExtra[edit.id] ?? []).map((c, i) => ({ id: `x${i}`, editId: edit.id, username: c.username, avatarImg: c.avatarImg, text: c.text, likes: 0, time: c.time }));
  const comments = [...extra, ...baseComments];
  const moreFrom = allEdits.filter((e) => e.editorId === edit.editorId && e.id !== edit.id).slice(0, 3);
  const alsoLike = allEdits.filter((e) => e.category === edit.category && e.id !== edit.id && e.editorId !== edit.editorId).slice(0, 3);
  const liked = isLiked(edit.id);

  const send = () => {
    if (!comment.trim()) return;
    if (!user) return nav("/signup");
    addComment(edit.id, comment.trim());
    setComment("");
    pushToast("Comment posted", "The editor will be notified");
  };

  return (
    <div>
      <button onClick={() => nav(-1)} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/50 hover:text-white mb-4"><ArrowLeft size={15} /> Back</button>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
        {/* Player column */}
        <div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black group">
            <video
              key={edit.id}
              src={edit.videoSrc}
              poster={thumb(edit.id + edit.title.length, edit.aspect)}
              controls playsInline preload="metadata"
              className={`w-full ${edit.aspect === "vertical" ? "aspect-[9/14] max-h-[78vh] object-contain bg-black" : "aspect-video object-contain"}`}
            />
          </div>

          {/* Mobile editor row */}
          <div className="mt-4 flex items-center gap-3">
            <Link to={`/editor/${ed.id}`}><Avatar img={ed.avatarImg} size={46} /></Link>
            <div className="min-w-0 flex-1">
              <Link to={`/editor/${ed.id}`} className="flex items-center gap-1 font-bold text-[15px] hover:text-[#b7a5ff]">@{ed.username} {ed.verified && <BadgeCheck size={15} className="text-[#7c5cff]" />}</Link>
              <div className="text-[12.5px] text-white/50">{fmt(ed.followers)} followers · {ed.title}</div>
            </div>
            <FollowButton editorId={ed.id} />
          </div>

          <h1 className="font-display font-extrabold text-[22px] md:text-[28px] tracking-tight mt-4 leading-tight">{edit.title}</h1>
          <p className="text-white/60 text-[14px] leading-relaxed mt-2">{edit.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#b7a5ff] bg-[#7c5cff]/12 border border-[#7c5cff]/25 px-2.5 py-1 rounded-lg">{edit.category}</span>
            {edit.tags.map((t) => (
              <Link key={t} to={`/search`} className="text-[12px] font-medium text-white/55 bg-white/[.05] border border-white/10 px-2.5 py-1 rounded-lg hover:text-white hover:border-white/25 transition-colors">#{t}</Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <div className="rounded-xl border border-white/[.08] bg-white/[.02] p-3.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Software</div>
              <div className="text-[13.5px] font-semibold mt-1">{edit.software.join(" · ")}</div>
            </div>
            <div className="rounded-xl border border-white/[.08] bg-white/[.02] p-3.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Skills shown</div>
              <div className="text-[13.5px] font-semibold mt-1">{edit.skills.join(" · ")}</div>
            </div>
          </div>

          {/* Action bar */}
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/[.08] bg-[#101016] p-3">
            <button onClick={() => toggleLike(edit.id)} className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-[14px] font-bold transition-all active:scale-95 ${liked ? "bg-[#ff5c7a]/15 text-[#ff5c7a]" : "bg-white/[.05] text-white/70 hover:text-white"}`}>
              <motion.span animate={liked ? { scale: [1, 1.4, 1] } : {}}><Heart size={17} fill={liked ? "currentColor" : "none"} /></motion.span> {fmt(edit.likes + (liked ? 1 : 0))}
            </button>
            <span className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-[14px] font-bold bg-white/[.05] text-white/70"><MessageCircle size={17} /> {fmt(edit.commentsCount + extra.length)}</span>
            <span className="flex-1 hidden sm:inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-[14px] font-bold bg-white/[.05] text-white/70"><Eye size={17} /> {fmt(edit.views)}</span>
            <button onClick={() => toggleSave(edit.id)} className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-[14px] font-bold transition-all active:scale-95 ${isSaved(edit.id) ? "bg-[#ffc24b]/15 text-[#ffc24b]" : "bg-white/[.05] text-white/70 hover:text-white"}`}>
              <Bookmark size={17} fill={isSaved(edit.id) ? "currentColor" : "none"} /> {isSaved(edit.id) ? "Saved" : "Save"}
            </button>
            <button onClick={() => { navigator.clipboard?.writeText(window.location.href).catch(() => {}); setShared(true); setTimeout(() => setShared(false), 2000); pushToast("Link copied", "Share this edit anywhere"); }} className="w-11 h-11 grid place-items-center rounded-xl bg-white/[.05] text-white/70 hover:text-white shrink-0"><Share2 size={17} /></button>
          </div>
          {shared && <p className="text-[#34f5c5] text-[12px] font-semibold mt-2">Link copied to clipboard ✓</p>}

          {/* Comments */}
          <div className="mt-7">
            <h3 className="font-display font-bold text-[17px]">Comments · {comments.length}</h3>
            <div className="flex items-center gap-2.5 mt-3.5">
              <Avatar img={user?.avatarImg ?? 5} size={36} />
              <div className="flex-1 flex items-center gap-2 bg-white/[.05] border border-white/10 focus-within:border-[#7c5cff]/60 rounded-full pl-4 pr-1.5 py-1.5 transition-colors">
                <input value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Add a thoughtful comment…" className="bg-transparent flex-1 text-[13.5px] outline-none placeholder:text-white/30" />
                <button onClick={send} disabled={!comment.trim()} className="w-9 h-9 grid place-items-center rounded-full bg-[#7c5cff] disabled:opacity-30 hover:bg-[#8d71ff] transition-colors"><Send size={15} /></button>
              </div>
            </div>
            <div className="space-y-4 mt-5">
              {comments.length === 0 && <p className="text-white/40 text-[13.5px]">No comments yet — be the first to show love.</p>}
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <img src={avatar(c.avatarImg)} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" loading="lazy" />
                  <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md bg-white/[.04] border border-white/[.07] px-4 py-3">
                    <div className="flex items-center gap-2"><span className="text-[13px] font-bold">@{c.username}</span><span className="text-[11.5px] text-white/35">{c.time}</span></div>
                    <p className="text-[13.5px] text-white/80 mt-1 leading-relaxed">{c.text}</p>
                    <button className="inline-flex items-center gap-1 text-[12px] text-white/40 hover:text-[#ff5c7a] mt-1.5 font-semibold"><Heart size={12} /> {c.likes > 0 ? fmt(c.likes) : "Like"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side rail */}
        <div className="space-y-7">
          <div className="rounded-2xl border border-white/[.08] bg-[#101016] p-5">
            <div className="flex items-center gap-3">
              <Link to={`/editor/${ed.id}`}><Avatar img={ed.avatarImg} size={54} ring /></Link>
              <div className="min-w-0">
                <Link to={`/editor/${ed.id}`} className="flex items-center gap-1 font-bold text-[15px] hover:text-[#b7a5ff]">@{ed.username} {ed.verified && <BadgeCheck size={15} className="text-[#7c5cff]" />}</Link>
                <div className="text-[12.5px] text-white/50 truncate">{ed.title}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              {[[fmt(ed.totalViews), "Views"], [String(ed.editsCount), "Edits"], [fmt(ed.followers), "Followers"]].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-white/[.03] border border-white/[.07] py-2.5"><div className="font-display font-extrabold text-[15px]">{v}</div><div className="text-[11px] text-white/45">{l}</div></div>
              ))}
            </div>
            <div className="mt-4"><FollowButton editorId={ed.id} /></div>
            <button onClick={() => pushToast("Hire request noted", "Full hiring opens soon — the editor was notified of your interest")} className="w-full mt-2 border border-white/12 hover:bg-white/[.05] font-bold text-[13.5px] py-2.5 rounded-xl transition-colors">Contact / Hire</button>
          </div>

          {moreFrom.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-[16px] mb-3 flex items-center gap-2"><Play size={15} className="text-[#7c5cff]" /> More from @{ed.username}</h3>
              <div className="space-y-3">
                {moreFrom.map((e) => (<EditCard key={e.id} edit={e} />))}
              </div>
            </div>
          )}
          {alsoLike.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-[16px] mb-3">You may also like</h3>
              <div className="space-y-3">
                {alsoLike.map((e) => (<EditCard key={e.id} edit={e} />))}
              </div>
            </div>
          )}
          <button onClick={() => pushToast("Thanks for the report", "Our moderators will review this edit")} className="inline-flex items-center gap-1.5 text-[12px] text-white/35 hover:text-white/60"><Flag size={12} /> Report this edit</button>
        </div>
      </div>
    </div>
  );
}
