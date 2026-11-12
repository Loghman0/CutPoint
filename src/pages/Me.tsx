import { Link } from "react-router-dom";
import { Bookmark, Clock, Plus } from "lucide-react";
import { useStore } from "../lib/store";
import { EditorProfileInner } from "./Profile";
import { EditCard, EmptyState } from "../components/ui";

export default function Me() {
  const { user, myEdits, saved, allEdits } = useStore();

  if (!user) {
    return (
      <div className="max-w-[520px] mx-auto rounded-3xl border border-white/10 bg-[#101016] p-10 text-center mt-8">
        <h1 className="font-display font-extrabold text-[24px]">Your profile awaits.</h1>
        <p className="text-white/55 text-[14px] mt-2">Join to publish edits, build reputation and get discovered.</p>
        <div className="flex gap-2.5 justify-center mt-6">
          <Link to="/signup" className="bg-[#7c5cff] font-bold text-[14px] px-7 py-3 rounded-full">Join free</Link>
          <Link to="/login" className="border border-white/15 font-bold text-[14px] px-7 py-3 rounded-full">Log in</Link>
        </div>
      </div>
    );
  }

  const savedEdits = allEdits.filter((e) => saved.has(e.id));

  return (
    <div>
      <EditorProfileInner editorId="e1" isMine />
      {myEdits.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display font-bold text-[17px] mb-3 flex items-center gap-2"><Clock size={16} className="text-[#34f5c5]" /> Your fresh uploads · {myEdits.length}</h2>
          <div className="columns-1 sm:columns-2 gap-4 [&>*]:mb-4">
            {myEdits.map((e) => (<div key={e.id} className="break-inside-avoid"><EditCard edit={e} /></div>))}
          </div>
        </div>
      )}
      <div className="mt-8">
        <h2 className="font-display font-bold text-[17px] mb-3 flex items-center gap-2"><Bookmark size={16} className="text-[#ffc24b]" /> Saved · {savedEdits.length}</h2>
        {savedEdits.length === 0 ? (
          <EmptyState icon={<Bookmark size={22} />} title="No saves yet" desc="Tap the bookmark on any edit to build your reference library." action={<Link to="/explore" className="inline-block bg-[#7c5cff] font-bold text-[13.5px] px-6 py-2.5 rounded-full">Explore edits</Link>} />
        ) : (
          <div className="columns-1 sm:columns-2 gap-4 [&>*]:mb-4">
            {savedEdits.map((e) => (<div key={e.id} className="break-inside-avoid"><EditCard edit={e} /></div>))}
          </div>
        )}
      </div>
      <Link to="/create" className="fixed bottom-24 lg:bottom-8 right-5 lg:right-8 z-30 inline-flex items-center gap-2 bg-[#7c5cff] hover:bg-[#8d71ff] font-bold text-[14px] pl-4 pr-5 py-3.5 rounded-full shadow-[0_8px_32px_rgba(124,92,255,.55)] transition-all hover:scale-105 active:scale-95">
        <Plus size={18} strokeWidth={2.5} /> New edit
      </Link>
    </div>
  );
}
