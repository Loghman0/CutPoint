import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell, Briefcase, CheckCircle2, Compass, Crown, Home, Plus, Search, Store, Trophy, User, X,
} from "lucide-react";
import { Avatar, Logo } from "./ui";
import { useStore } from "../lib/store";
import { cn } from "../lib/cn";

const NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/challenges", label: "Challenges", icon: Trophy },
  { to: "/rankings", label: "Rankings", icon: Crown },
  { to: "/search", label: "Search", icon: Search },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

const MOBILE_NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/create", label: "Create", icon: Plus, fab: true },
  { to: "/challenges", label: "Challenges", icon: Trophy },
  { to: "/me", label: "Profile", icon: User },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, notifRead, toasts } = useStore();
  const loc = useLocation();
  const nav = useNavigate();
  const profileTo = user ? "/me" : "/signup";

  return (
    <div className="min-h-screen bg-[#07070c] text-white">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[248px] flex-col border-r border-white/[.07] bg-[#0a0a11]/95 backdrop-blur z-40 px-4 py-5">
        <div className="px-2"><Logo /></div>
        <nav className="mt-7 space-y-1 flex-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-all",
                isActive ? "bg-[#7c5cff]/15 text-white border border-[#7c5cff]/25" : "text-white/60 hover:text-white hover:bg-white/[.05] border border-transparent"
              )}
            >
              <n.icon size={19} strokeWidth={2.1} />
              {n.label}
              {n.to === "/notifications" && !notifRead && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[#ff5c7a] shadow-[0_0_8px_#ff5c7a]" />
              )}
            </NavLink>
          ))}
          <NavLink
            to={profileTo}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-all",
              isActive || loc.pathname.startsWith("/editor")
                ? "bg-[#7c5cff]/15 text-white border border-[#7c5cff]/25"
                : "text-white/60 hover:text-white hover:bg-white/[.05] border border-transparent"
            )}
          >
            <User size={19} strokeWidth={2.1} /> Profile
          </NavLink>
        </nav>

        <button
          onClick={() => nav(user ? "/create" : "/signup")}
          className="w-full flex items-center justify-center gap-2 bg-[#7c5cff] hover:bg-[#8d71ff] rounded-xl py-3 text-[14px] font-bold shadow-[0_6px_28px_rgba(124,92,255,.45)] transition-all active:scale-[.98]"
        >
          <Plus size={18} strokeWidth={2.5} /> Publish Edit
        </button>

        <div className="mt-3 space-y-1 rounded-xl border border-white/[.07] bg-white/[.02] p-2">
          {[
            { to: "/hire", icon: Briefcase, label: "Hire Editors" },
            { to: "/marketplace", icon: Store, label: "Marketplace" },
          ].map((f) => (
            <Link key={f.to} to={f.to} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-white/55 hover:text-white hover:bg-white/[.05] transition-colors">
              <f.icon size={16} /> {f.label}
              <span className="ml-auto text-[9.5px] font-bold tracking-widest text-[#34f5c5] bg-[#34f5c5]/10 border border-[#34f5c5]/25 px-1.5 py-0.5 rounded">SOON</span>
            </Link>
          ))}
        </div>

        <div className="mt-3">
          {user ? (
            <Link to="/me" className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/[.05] transition-colors">
              <Avatar img={user.avatarImg} size={34} />
              <div className="min-w-0">
                <div className="text-[13px] font-semibold truncate">@{user.username}</div>
                <div className="text-[11px] text-white/45 capitalize">{user.role}</div>
              </div>
            </Link>
          ) : (
            <button onClick={() => nav("/signup")} className="w-full rounded-xl border border-[#7c5cff]/40 bg-[#7c5cff]/10 py-2.5 text-[13px] font-bold text-[#c9baff] hover:bg-[#7c5cff]/20 transition-colors">
              Join the community
            </button>
          )}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#07070c]/90 backdrop-blur-lg border-b border-white/[.07]">
        <div className="flex items-center gap-3 px-4 py-3">
          <Logo />
          <div className="ml-auto flex items-center gap-2">
            <Link to="/search" className="w-9 h-9 grid place-items-center rounded-full bg-white/[.06] text-white/70"><Search size={17} /></Link>
            <Link to="/notifications" className="relative w-9 h-9 grid place-items-center rounded-full bg-white/[.06] text-white/70">
              <Bell size={17} />
              {!notifRead && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff5c7a]" />}
            </Link>
            {user ? (
              <Link to="/me"><Avatar img={user.avatarImg} size={34} /></Link>
            ) : (
              <button onClick={() => nav("/signup")} className="text-[12.5px] font-bold bg-[#7c5cff] px-4 py-2 rounded-full">Join</button>
            )}
          </div>
        </div>
      </header>

      {/* Desktop top bar */}
      <header className="hidden lg:block sticky top-0 z-30 bg-[#07070c]/85 backdrop-blur-lg border-b border-white/[.07]">
        <div className="flex items-center gap-3 pl-[272px] pr-8 py-3.5 max-w-[1500px]">
          <button
            onClick={() => nav("/search")}
            className="flex items-center gap-2.5 flex-1 max-w-md bg-white/[.05] hover:bg-white/[.08] border border-white/[.08] rounded-full px-4 py-2.5 text-[13.5px] text-white/40 transition-colors"
          >
            <Search size={16} /> Search edits, editors, tags…
            <kbd className="ml-auto text-[10.5px] font-mono bg-white/[.07] px-1.5 py-0.5 rounded">/</kbd>
          </button>
          <div className="ml-auto flex items-center gap-2.5">
            <Link to="/notifications" className="relative w-10 h-10 grid place-items-center rounded-full bg-white/[.05] border border-white/[.08] text-white/70 hover:text-white transition-colors">
              <Bell size={18} />
              {!notifRead && <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ff5c7a] shadow-[0_0_8px_#ff5c7a]" />}
            </Link>
            <Link to="/settings" className="text-[13px] font-semibold text-white/60 hover:text-white px-3 py-2 transition-colors">Settings</Link>
            {user ? (
              <Link to="/me" className="flex items-center gap-2.5 pl-1 pr-1 py-1 rounded-full hover:bg-white/[.05] transition-colors">
                <Avatar img={user.avatarImg} size={34} />
              </Link>
            ) : (
              <>
                <button onClick={() => nav("/login")} className="text-[13.5px] font-semibold text-white/70 hover:text-white px-3 py-2">Log in</button>
                <button onClick={() => nav("/signup")} className="text-[13.5px] font-bold bg-white text-black px-5 py-2.5 rounded-full hover:bg-white/85 transition-colors">Sign up</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="lg:pl-[248px]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pb-28 lg:pb-16 pt-5 md:pt-7 min-h-[80vh]">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0a0a11]/95 backdrop-blur-lg border-t border-white/[.08] px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5 py-1.5">
          {MOBILE_NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => cn("flex flex-col items-center gap-1 py-1.5 rounded-xl text-[10px] font-semibold", isActive ? "text-[#b7a5ff]" : "text-white/45")}
            >
              {n.fab ? (
                <span className="w-11 h-7 -mt-4 grid place-items-center rounded-full bg-[#7c5cff] text-white shadow-[0_4px_20px_rgba(124,92,255,.6)]"><Plus size={20} strokeWidth={2.5} /></span>
              ) : (
                <n.icon size={21} strokeWidth={2} />
              )}
              {n.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Toasts */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 z-[100] space-y-2.5 w-[calc(100%-2rem)] max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: .96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: .96 }}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#14141d]/95 backdrop-blur-xl p-4 shadow-2xl"
            >
              <span className="w-8 h-8 rounded-full bg-[#34f5c5]/15 text-[#34f5c5] grid place-items-center shrink-0"><CheckCircle2 size={17} /></span>
              <div className="min-w-0">
                <div className="text-[13.5px] font-bold">{t.title}</div>
                {t.desc && <div className="text-[12.5px] text-white/55 mt-0.5">{t.desc}</div>}
              </div>
              <X size={15} className="ml-auto text-white/40 shrink-0" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
