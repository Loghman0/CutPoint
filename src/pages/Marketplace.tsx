import { Layers, Music, Palette, Type, Wand2, Zap } from "lucide-react";
import { useStore } from "../lib/store";

const PACKS = [
  { icon: Zap, name: "Velocity Starter Pack", by: "@fragmason", price: "$19", sales: "2.1K sold", tag: "Transitions", color: "#7c5cff" },
  { icon: Palette, name: "Midnight Wangan LUTs", by: "@drift THEORY", price: "$14", sales: "1.4K sold", tag: "Color", color: "#ffc24b" },
  { icon: Type, name: "Kinetic Type Kit Vol.2", by: "@type.in.motion", price: "$29", sales: "980 sold", tag: "Motion", color: "#34f5c5" },
  { icon: Wand2, name: "Glow & CC Essentials", by: "@yuki.amv", price: "$12", sales: "3.8K sold", tag: "Anime", color: "#ff5c7a" },
  { icon: Music, name: "Hype SFX Bundle", by: "@sprint.cut", price: "$9", sales: "1.1K sold", tag: "Audio", color: "#6cb8ff" },
  { icon: Layers, name: "Seamless Loop Overlays", by: "@kaito.cuts", price: "$16", sales: "760 sold", tag: "Overlays", color: "#a78bfa" },
];

export default function Marketplace() {
  const { pushToast } = useStore();
  return (
    <div>
      <div className="rounded-3xl border border-white/[.08] bg-gradient-to-br from-[#12101f] to-[#0b0b12] p-7 md:p-10 relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-[340px] h-[280px] bg-[#7c5cff]/20 blur-[100px]" />
        <div className="relative">
          <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#ffc24b]">Marketplace · coming soon</span>
          <h1 className="font-display font-extrabold tracking-tight text-[30px] md:text-[44px] leading-tight mt-2">Sell your sauce.<br />Buy the shortcut.</h1>
          <p className="text-white/60 text-[14.5px] mt-3 max-w-xl leading-relaxed">Presets, LUTs, transitions, templates, motion graphics, project files and sound packs — sold by editors, reviewed by the community. Creators keep 90% on every sale.</p>
          <button onClick={() => pushToast("Seller waitlist joined", "We'll notify you when storefronts open")} className="mt-6 bg-[#7c5cff] hover:bg-[#8d71ff] font-bold text-[14px] px-6 py-3 rounded-full transition-colors shadow-[0_6px_28px_rgba(124,92,255,.45)]">Open a storefront</button>
        </div>
      </div>

      <h2 className="font-display font-bold text-[19px] mt-8 mb-4">Preview: best-selling style packs</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {PACKS.map((p) => (
          <div key={p.name} className="rounded-2xl border border-white/[.08] bg-[#101016] p-5 hover:border-[#7c5cff]/40 hover:-translate-y-1 transition-all group">
            <div className="w-11 h-11 rounded-xl grid place-items-center mb-4" style={{ background: `${p.color}1a`, color: p.color, border: `1px solid ${p.color}44` }}><p.icon size={20} /></div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">{p.tag}</div>
            <h3 className="font-display font-bold text-[16px] mt-0.5">{p.name}</h3>
            <div className="text-[12.5px] text-white/50 mt-0.5">{p.by} · {p.sales}</div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-display font-extrabold text-[19px]">{p.price}</span>
              <button onClick={() => pushToast("Added to wishlist", "Checkout opens with the marketplace launch")} className="text-[12.5px] font-bold border border-white/15 group-hover:bg-[#7c5cff] group-hover:border-[#7c5cff] px-4 py-2 rounded-full transition-all">Wishlist</button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-white/35 text-[12.5px] mt-8">Mock preview — real storefronts, reviews and instant downloads ship in Season 2.</p>
    </div>
  );
}
