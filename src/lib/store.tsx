import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { EDITS, type Edit } from "./data";

interface Toast { id: number; title: string; desc?: string; }
interface User { username: string; displayName: string; role: "editor" | "creator"; interests: string[]; avatarImg: number; }

interface Store {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  updateUser: (p: Partial<User>) => void;
  liked: Set<string>;
  saved: Set<string>;
  followed: Set<string>;
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  toggleFollow: (editorId: string) => void;
  isLiked: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  isFollowing: (editorId: string) => boolean;
  myEdits: Edit[];
  publishEdit: (e: Edit) => void;
  commentsExtra: Record<string, { username: string; avatarImg: number; text: string; time: string }[]>;
  addComment: (editId: string, text: string) => void;
  toasts: Toast[];
  pushToast: (title: string, desc?: string) => void;
  notifRead: boolean;
  setNotifRead: (v: boolean) => void;
  onboardingDone: boolean;
  setOnboardingDone: (v: boolean) => void;
  allEdits: Edit[];
}

const Ctx = createContext<Store | null>(null);

const load = <T,>(k: string, fb: T): T => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : fb; } catch { return fb; }
};
const save = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* noop */ } };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load("cp_user", null));
  const [likedArr, setLiked] = useState<string[]>(() => load("cp_liked", ["v6", "v2"]));
  const [savedArr, setSaved] = useState<string[]>(() => load("cp_saved", ["v10"]));
  const [followedArr, setFollowed] = useState<string[]>(() => load("cp_followed", ["e1", "e6", "e3"]));
  const [myEdits, setMyEdits] = useState<Edit[]>(() => load("cp_myedits", []));
  const [commentsExtra, setCommentsExtra] = useState<Record<string, { username: string; avatarImg: number; text: string; time: string }[]>>(() => load("cp_comments", {}));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notifRead, setNotifRead] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(() => load("cp_onb", false));

  useEffect(() => save("cp_user", user), [user]);
  useEffect(() => save("cp_liked", likedArr), [likedArr]);
  useEffect(() => save("cp_saved", savedArr), [savedArr]);
  useEffect(() => save("cp_followed", followedArr), [followedArr]);
  useEffect(() => save("cp_myedits", myEdits), [myEdits]);
  useEffect(() => save("cp_comments", commentsExtra), [commentsExtra]);
  useEffect(() => save("cp_onb", onboardingDone), [onboardingDone]);

  const liked = useMemo(() => new Set(likedArr), [likedArr]);
  const saved = useMemo(() => new Set(savedArr), [savedArr]);
  const followed = useMemo(() => new Set(followedArr), [followedArr]);

  const pushToast = (title: string, desc?: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, desc }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  };

  const toggleLike = (id: string) => {
    setLiked((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  };
  const toggleSave = (id: string) => {
    const has = savedArr.includes(id);
    setSaved((a) => (has ? a.filter((x) => x !== id) : [...a, id]));
    pushToast(has ? "Removed from library" : "Saved to library", has ? undefined : "Find it anytime under Profile → Saved");
  };
  const toggleFollow = (editorId: string) => {
    const has = followedArr.includes(editorId);
    setFollowed((a) => (has ? a.filter((x) => x !== editorId) : [...a, editorId]));
    if (!has) pushToast("Following editor", "Their new edits will appear in your Following feed");
  };

  const publishEdit = (e: Edit) => {
    setMyEdits((m) => [e, ...m]);
    pushToast("Edit published", "Your work is live on CUTPOINT");
  };
  const addComment = (editId: string, text: string) => {
    const uname = user?.username ?? "you.cuts";
    setCommentsExtra((c) => ({ ...c, [editId]: [{ username: uname, avatarImg: 5, text, time: "Just now" }, ...(c[editId] ?? [])] }));
  };

  const allEdits = useMemo(() => [...myEdits, ...EDITS], [myEdits]);

  return (
    <Ctx.Provider value={{
      user,
      login: (u) => setUser(u),
      logout: () => { setUser(null); setOnboardingDone(false); localStorage.removeItem("cp_user"); localStorage.removeItem("cp_onb"); },
      updateUser: (p) => setUser((u) => (u ? { ...u, ...p } : u)),
      liked, saved, followed, toggleLike, toggleSave, toggleFollow,
      isLiked: (id) => liked.has(id),
      isSaved: (id) => saved.has(id),
      isFollowing: (id) => followed.has(id),
      myEdits, publishEdit, commentsExtra, addComment,
      toasts, pushToast, notifRead, setNotifRead, onboardingDone, setOnboardingDone, allEdits,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error("store missing");
  return s;
};
