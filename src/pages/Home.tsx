import { useMemo, useState } from "react";
import { Compass, Flame, Inbox, Plus, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../lib/data";
import { useStore } from "../lib/store";
import { CardSkeleton, EditCard, EmptyState } from "../components/ui";
import { cn } from "../lib/cn";

const TABS = [
  { id: "foryou", label: "For You", icon: Sparkles },
  { id: "following", label: "Following", icon: Users },
  { id: "trending", label: "Trending", icon: Flame },
  { id: "new", label: "New", icon: Compass },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function Home() {
  const { allEdits, followed, user } = useStore();
  const [tab, setTab] = useState<Tab>("foryou");
  const [cat, setCat] = useState<string>("All");
  const [loading] = useState(false);
  const nav = useNavigate();

  const edits = useMemo(() => {
    let list = [...allEdits];
    if (tab === "foryou") {
      const ints = user?.interests ?? [];
      if (ints.length) {
        list.sort((a, b) => {
          const sa = ints.includes(a.category) ? 0 : 1;
          const sb = ints.includes(b.category) ? 0 : 1;
          return sa - sb || b.views - a.views;
        });
      } else list.sort((a, b) => b.views - a.views);
    } else if (tab === "following") {
      list = list.filter((e) => followed.has(e.editorId));
    } else if (tab === "trending") {
      list = list.filter((e) => e.trending).concat(list.filter((e) => !e.trending)).slice(0, 14);
      list.sort((a, b) => b.likes / Math.max(b.hoursAgo, 1) - a.likes / Math.max(a.hoursAgo, 1));
    } else {
      list = [...list].sort((a, b) => a.hoursAgo - b.hoursAgo);
    }
    if (cat !== "All") list = list.filter((e) => e.category === cat);
    return list;
  }, [allEdits, tab, cat, followed, user]);

  // Masonry-ish: distribute into columns? Use CSS columns for mixed aspect.
  return (
    <div>
      {/* Tabs */}
      <div className="sticky top-[57px] lg:top-[65px] z-20 -mx-4 md:-mx-8 px-4 md:px-8 py-3 bg-[#07070c]/90 backdrop-blur-lg border-b border-white/[.06]">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-bold whitespace-nowrap border transition-all",
                tab === t.id ? "bg-white text-black border-white" : "bg-white/[.04] text-white/60 border-white/10 hover:text-white hover:border-white/25"
              )}
            >
              <t.icon size={15} /> {t.label}
            </button>
          ))}
          <span className="w-px h-6 bg-white/10 mx-1 shrink-0" />
          {["All", ...CATEGORIES.map((c) => c.name)].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "px-3.5 py-2 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all",
                cat === c ? "bg-[#7c5cff] text-white shadow-[0_4px_16px_rgba(124,92,255,.4)]" : "text-white/50 hover:text-white hover:bg-white/[.06]"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-5">
        {tab === "following" && followed.size === 0 ? (
          <EmptyState
            icon={<Users size={22} />}
            title="Your Following feed is quiet"
            desc="Follow editors whose work you love and their freshest cuts will land here first."
            action={<button onClick={() => nav("/explore")} className="bg-[#7c5cff] font-bold text-[13.5px] px-6 py-2.5 rounded-full">Discover editors</button>}
          />
        ) : edits.length === 0 ? (
          <EmptyState icon={<Inbox size={22} />} title="Nothing here yet" desc="No edits match this filter. Try another category." />
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">{[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}</div>
        ) : (
          <div className="columns-1 sm:columns-2 xl:columns-3 gap-4 [&>*]:mb-4">
            {edits.map((e) => (
              <div key={e.id} className="break-inside-avoid"><EditCard edit={e} /></div>
            ))}
          </div>
        )}

        {edits.length > 0 && (
          <div className="text-center py-10">
            <p className="text-white/35 text-[13px] mb-4">You're all caught up — hungry for more?</p>
            <button onClick={() => nav("/create")} className="inline-flex items-center gap-2 border border-[#7c5cff]/40 bg-[#7c5cff]/10 text-[#c9baff] font-bold text-[13.5px] px-6 py-3 rounded-full hover:bg-[#7c5cff]/20 transition-colors">
              <Plus size={16} /> Post your own edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
