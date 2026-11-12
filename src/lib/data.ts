export type Aspect = "vertical" | "landscape";

export interface Editor {
  id: string;
  username: string;
  displayName: string;
  avatarImg: number;
  title: string;
  specialties: string[];
  location: string;
  bio: string;
  skills: string[];
  software: string[];
  followers: number;
  following: number;
  totalViews: number;
  totalLikes: number;
  editsCount: number;
  level: number;
  percentile: string;
  rep: number;
  verified: boolean;
  pro: boolean;
  joined: string;
  challengeWins: number;
  battleWins: number;
  streakWeeks: number;
  rising?: boolean;
  growth?: string;
  rate?: string;
  availableForHire?: boolean;
}

export interface Edit {
  id: string;
  title: string;
  description: string;
  editorId: string;
  category: CategoryName;
  tags: string[];
  software: string[];
  skills: string[];
  aspect: Aspect;
  likes: number;
  commentsCount: number;
  views: number;
  saves: number;
  duration: string;
  timeAgo: string;
  hoursAgo: number;
  videoSrc: string;
  featured?: boolean;
  trending?: boolean;
  challengeId?: string;
}

export type CategoryName =
  | "Gaming"
  | "Anime"
  | "Sports"
  | "Cinematic"
  | "Cars"
  | "Music"
  | "Motion Design"
  | "Short-form"
  | "VFX";

export const CATEGORIES: { name: CategoryName; blurb: string; seed: string; count: string }[] = [
  { name: "Gaming", blurb: "Montages, sync & velocity", seed: "cutcat-gaming", count: "48.2K edits" },
  { name: "Anime", blurb: "AMVs, manga motion & glow", seed: "cutcat-anime", count: "36.7K edits" },
  { name: "Sports", blurb: "Hype reels & documentaries", seed: "cutcat-sports", count: "22.4K edits" },
  { name: "Cinematic", blurb: "Films, travel & color", seed: "cutcat-cine", count: "18.9K edits" },
  { name: "Cars", blurb: "Automotive & rollers", seed: "cutcat-cars", count: "12.1K edits" },
  { name: "Music", blurb: "Music videos & visualizers", seed: "cutcat-music", count: "27.3K edits" },
  { name: "Motion Design", blurb: "Kinetic type & brand", seed: "cutcat-motion", count: "15.8K edits" },
  { name: "Short-form", blurb: "Reels, Shorts & TikTok", seed: "cutcat-short", count: "61.5K edits" },
  { name: "VFX", blurb: "Compositing & simulation", seed: "cutcat-vfx", count: "9.6K edits" },
];

const V = (f: string) => `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${f}`;

export const EDITORS: Editor[] = [
  {
    id: "e1", username: "kaito.cuts", displayName: "Kaito Mori", avatarImg: 12,
    title: "Anime & Short-form Editor", specialties: ["Anime", "Short-form", "Motion Design"],
    location: "Osaka, Japan", bio: "AMV editor obsessed with frame-perfect sync. 6 yrs cutting anime edits, openings & trailer-style shorts. I live in After Effects + Premiere.",
    skills: ["Velocity Sync", "Masking", "Glow Compositing", "Kinetic Type", "Sound Design"],
    software: ["After Effects", "Premiere Pro", "Topaz"], followers: 18200, following: 340,
    totalViews: 2400000, totalLikes: 312000, editsCount: 184, level: 27, percentile: "Top 5%",
    rep: 9840, verified: true, pro: true, joined: "Mar 2023", challengeWins: 4, battleWins: 11, streakWeeks: 14, growth: "+2.4K this week", rate: "$80–150 / edit", availableForHire: true,
  },
  {
    id: "e2", username: "nova.frames", displayName: "Nova Reyes", avatarImg: 47,
    title: "Cinematic & Color Specialist", specialties: ["Cinematic", "Music", "Short-form"],
    location: "Los Angeles, USA", bio: "Ex-wedding videographer turned cinematic storyteller. DaVinci color nerd. I cut travel films, music visuals & creator docs.",
    skills: ["Color Grading", "Story Structure", "Sound Design", "Speed Ramping"],
    software: ["DaVinci Resolve", "Premiere Pro"], followers: 24100, following: 512,
    totalViews: 5100000, totalLikes: 402000, editsCount: 132, level: 31, percentile: "Top 2%",
    rep: 12480, verified: true, pro: true, joined: "Jan 2023", challengeWins: 6, battleWins: 8, streakWeeks: 22, rate: "$200–450 / project", availableForHire: true,
  },
  {
    id: "e3", username: "fragmason", displayName: "Mason Cole", avatarImg: 13,
    title: "Gaming Montage Editor", specialties: ["Gaming", "Short-form"],
    location: "London, UK", bio: "Valorant / CoD / Fortnite montages. Shake, punch-ins & bass-boosted sync. 400+ montages delivered for creators & orgs.",
    skills: ["Shake Presets", "Velocity", "3D Camera", "Thumbnail Design"],
    software: ["After Effects", "Premiere Pro"], followers: 31800, following: 210,
    totalViews: 8900000, totalLikes: 720000, editsCount: 412, level: 34, percentile: "Top 1%",
    rep: 15210, verified: true, pro: true, joined: "Nov 2022", challengeWins: 8, battleWins: 19, streakWeeks: 31, rate: "$60–120 / edit", availableForHire: true,
  },
  {
    id: "e4", username: "sprint.cut", displayName: "Amara Diallo", avatarImg: 45,
    title: "Sports Hype Editor", specialties: ["Sports", "Cinematic"],
    location: "Paris, France", bio: "I turn match footage into cinema. Football hype edits, athlete docs & stadium openers. Timing is everything.",
    skills: ["Hype Cutting", "Stadium Sound", "Film Grain", "Match Sync"],
    software: ["Premiere Pro", "After Effects"], followers: 12400, following: 188,
    totalViews: 3100000, totalLikes: 288000, editsCount: 96, level: 24, percentile: "Top 8%",
    rep: 8210, verified: true, pro: false, joined: "Jun 2023", challengeWins: 2, battleWins: 5, streakWeeks: 9, rate: "$100–220 / edit", availableForHire: true,
  },
  {
    id: "e5", username: "drift THEORY", displayName: "Jonas Lindqvist", avatarImg: 59,
    title: "Automotive Editor", specialties: ["Cars", "Cinematic", "Short-form"],
    location: "Stockholm, Sweden", bio: "Car edits, rollers & exhaust symphonies. If it has an engine I'll make it look expensive.",
    skills: ["Roller Cuts", "Engine Sync", "Drone FPV", "LUT Design"],
    software: ["DaVinci Resolve", "After Effects"], followers: 9800, following: 240,
    totalViews: 1900000, totalLikes: 201000, editsCount: 78, level: 21, percentile: "Top 12%",
    rep: 6940, verified: false, pro: false, joined: "Sep 2023", challengeWins: 1, battleWins: 3, streakWeeks: 6, rising: true, growth: "+1.8K this week", rate: "$90–180 / edit", availableForHire: true,
  },
  {
    id: "e6", username: "yuki.amv", displayName: "Yuki Tanaka", avatarImg: 32,
    title: "AMV & Glow Artist", specialties: ["Anime", "Music"],
    location: "Tokyo, Japan", bio: "JJK / Demon Slayer / One Piece edits. Glow, outlines & manga panels in motion. Commissions open.",
    skills: ["Glow Compositing", "Manga Motion", "Lip Sync", "CC Design"],
    software: ["After Effects", "Alight Motion"], followers: 27600, following: 190,
    totalViews: 7400000, totalLikes: 890000, editsCount: 260, level: 33, percentile: "Top 2%",
    rep: 14680, verified: true, pro: true, joined: "Feb 2023", challengeWins: 7, battleWins: 14, streakWeeks: 26, rate: "$50–110 / edit", availableForHire: true,
  },
  {
    id: "e7", username: "beat.surgeon", displayName: "Dre Walker", avatarImg: 53,
    title: "Music Video Editor", specialties: ["Music", "VFX", "Cinematic"],
    location: "Atlanta, USA", bio: "Music videos & performance visuals for indie artists. Cut on beat, grade for mood, deliver for screens big & small.",
    skills: ["Beat Cutting", "Multi-cam", "VFX Cleanup", "Grade"],
    software: ["Premiere Pro", "DaVinci Resolve"], followers: 15300, following: 300,
    totalViews: 4200000, totalLikes: 310000, editsCount: 88, level: 26, percentile: "Top 6%",
    rep: 9310, verified: true, pro: true, joined: "Apr 2023", challengeWins: 3, battleWins: 6, streakWeeks: 11, rate: "$250–600 / video", availableForHire: true,
  },
  {
    id: "e8", username: "type.in.motion", displayName: "Sofia Marchetti", avatarImg: 44,
    title: "Motion Designer", specialties: ["Motion Design", "Short-form"],
    location: "Milan, Italy", bio: "Kinetic typography, brand stings & product explainers. Clean grids, bouncy easings, zero clutter.",
    skills: ["Kinetic Type", "Brand Systems", "Easing", "Lottie"],
    software: ["After Effects", "Illustrator", "Figma"], followers: 11700, following: 410,
    totalViews: 1600000, totalLikes: 144000, editsCount: 64, level: 22, percentile: "Top 10%",
    rep: 7420, verified: false, pro: true, joined: "Aug 2023", challengeWins: 2, battleWins: 2, streakWeeks: 8, rising: true, growth: "+1.2K this week", rate: "$150–350 / project", availableForHire: true,
  },
  {
    id: "e9", username: "pixel.ghost", displayName: "Ravi Nair", avatarImg: 68,
    title: "VFX & Compositing", specialties: ["VFX", "Gaming", "Cinematic"],
    location: "Bangalore, India", bio: "Compositing, screen replacements & game-trailer style VFX. Blender + AE pipeline.",
    skills: ["Compositing", "Tracking", "Blender 3D", "Particles"],
    software: ["After Effects", "Blender", "Nuke"], followers: 8600, following: 150,
    totalViews: 1300000, totalLikes: 121000, editsCount: 52, level: 19, percentile: "Top 15%",
    rep: 5880, verified: false, pro: false, joined: "Oct 2023", challengeWins: 1, battleWins: 1, streakWeeks: 5, rising: true, growth: "+980 this week",
  },
  {
    id: "e10", username: "lena.cuts", displayName: "Lena Fischer", avatarImg: 26,
    title: "YouTube & Retention Editor", specialties: ["Short-form", "Cinematic"],
    location: "Berlin, Germany", bio: "Long-form YouTube retention editing: hooks, pattern interrupts, b-roll systems. 40M+ views edited for creators.",
    skills: ["Retention", "Hooks", "B-roll Systems", "Captions"],
    software: ["Premiere Pro", "After Effects"], followers: 19900, following: 275,
    totalViews: 6100000, totalLikes: 388000, editsCount: 210, level: 29, percentile: "Top 3%",
    rep: 11040, verified: true, pro: true, joined: "Dec 2022", challengeWins: 5, battleWins: 7, streakWeeks: 19, rate: "$1.2K–2.5K / mo", availableForHire: true,
  },
  {
    id: "e11", username: "omar.fx", displayName: "Omar Haddad", avatarImg: 60,
    title: "Short-form Speed Editor", specialties: ["Short-form", "Sports"],
    location: "Dubai, UAE", bio: "48-hour turnaround short-form machine. Real estate, fitness & food reels that stop thumbs.",
    skills: ["Hook Design", "Auto-captions", "SFX", "Fast Turnaround"],
    software: ["CapCut", "Premiere Pro"], followers: 6400, following: 320,
    totalViews: 980000, totalLikes: 87000, editsCount: 340, level: 17, percentile: "Top 20%",
    rep: 4920, verified: false, pro: false, joined: "Jan 2024", challengeWins: 0, battleWins: 0, streakWeeks: 4, rising: true, growth: "+760 this week",
  },
  {
    id: "e12", username: "junior.reel", displayName: "Diego Fuentes", avatarImg: 15,
    title: "Rising Cinematic Editor", specialties: ["Cinematic", "Cars"],
    location: "Mexico City, Mexico", bio: "19. Shooting on Sony, cutting travel & street films. Learning in public — new edit every week.",
    skills: ["Travel Films", "Transitions", "Color", "Story"],
    software: ["Premiere Pro", "DaVinci Resolve"], followers: 2100, following: 480,
    totalViews: 240000, totalLikes: 31000, editsCount: 28, level: 9, percentile: "Top 42%",
    rep: 2140, verified: false, pro: false, joined: "Apr 2024", challengeWins: 0, battleWins: 0, streakWeeks: 3, rising: true, growth: "+540 this week",
  },
];

export const EDITS: Edit[] = [
  { id: "v1", title: "NEON RONIN — Jujutsu Kaisen 4K AMV", description: "Sukuna vs Gojo reimagined as a neon-noir duel. 3 weeks of masking, glow compositing and hand-timed velocity. Footage belongs to MAPPA — edit for showcase only.", editorId: "e1", category: "Anime", tags: ["amv", "jujutsu-kaisen", "velocity", "4k"], software: ["After Effects", "Premiere Pro"], skills: ["Velocity Sync", "Glow Compositing"], aspect: "vertical", likes: 48200, commentsCount: 1204, views: 812000, saves: 9600, duration: "0:47", timeAgo: "2h ago", hoursAgo: 2, videoSrc: V("ForBiggerBlazes.mp4"), featured: true, trending: true },
  { id: "v2", title: "Valorant Champions Montage — PRX Style", description: "TenZ-inspired flick sync cut for a Radiant client. Custom shake preset + punch-in system. Full project breakdown in comments.", editorId: "e3", category: "Gaming", tags: ["valorant", "montage", "shake"], software: ["After Effects"], skills: ["Shake Presets", "Velocity"], aspect: "landscape", likes: 31500, commentsCount: 842, views: 640000, saves: 7200, duration: "2:14", timeAgo: "5h ago", hoursAgo: 5, videoSrc: V("ForBiggerEscapes.mp4"), featured: true, trending: true },
  { id: "v3", title: "MBAPPÉ — Speed of Light (UCL Hype)", description: "Champions League nights. Built from 40+ match clips with stadium ambience rebuilt from scratch. Headphones recommended.", editorId: "e4", category: "Sports", tags: ["football", "hype", "ucl"], software: ["Premiere Pro", "After Effects"], skills: ["Hype Cutting"], aspect: "vertical", likes: 27800, commentsCount: 690, views: 512000, saves: 5400, duration: "0:58", timeAgo: "8h ago", hoursAgo: 8, videoSrc: V("ForBiggerFun.mp4"), trending: true },
  { id: "v4", title: "TOKYO DRIFT — Night Rollers in 35mm Grain", description: "Shot on Sony A7SIII, graded with my custom 'Midnight Wangan' LUT. No dialogue, just engines and sodium light.", editorId: "e5", category: "Cars", tags: ["jdm", "rollers", "color-grade"], software: ["DaVinci Resolve"], skills: ["Color Grading", "Roller Cuts"], aspect: "landscape", likes: 19400, commentsCount: 512, views: 388000, saves: 4800, duration: "3:02", timeAgo: "12h ago", hoursAgo: 12, videoSrc: V("ForBiggerJoyrides.mp4"), featured: true },
  { id: "v5", title: "After Hours — Cinematic Travel Film", description: "48 hours in Lisbon cut to a synthwave pulse. Speed ramps mapped to the kick. LUT + transition pack dropping soon.", editorId: "e2", category: "Cinematic", tags: ["travel", "synthwave", "speed-ramp"], software: ["DaVinci Resolve", "Premiere Pro"], skills: ["Color Grading", "Speed Ramping"], aspect: "landscape", likes: 22100, commentsCount: 445, views: 296000, saves: 6100, duration: "2:47", timeAgo: "1d ago", hoursAgo: 26, videoSrc: V("Sintel.mp4"), featured: true, trending: true },
  { id: "v6", title: "DEMON SLAYER — Hinokami Glow Edit", description: "Tanjiro vs Rui with hand-placed glow frames. 120 layers. My most detailed CC to date.", editorId: "e6", category: "Anime", tags: ["demon-slayer", "glow", "cc"], software: ["After Effects"], skills: ["Glow Compositing"], aspect: "vertical", likes: 56900, commentsCount: 2100, views: 1100000, saves: 14200, duration: "0:39", timeAgo: "1d ago", hoursAgo: 30, videoSrc: V("ForBiggerMeltdowns.mp4"), featured: true, trending: true },
  { id: "v7", title: "MIDNIGHT FREQUENCY — Indie Music Video", description: "One-take performance + projected visuals. Cut for an Atlanta R&B artist. Grade breakdown in thread.", editorId: "e7", category: "Music", tags: ["music-video", "rnb", "grade"], software: ["Premiere Pro", "DaVinci Resolve"], skills: ["Beat Cutting", "Grade"], aspect: "landscape", likes: 12800, commentsCount: 320, views: 204000, saves: 2100, duration: "3:31", timeAgo: "2d ago", hoursAgo: 50, videoSrc: V("ElephantsDream.mp4") },
  { id: "v8", title: "KINETIC — Brand Typography in Motion", description: "Spec sting for a fintech brand. 100% type, zero footage. Easing curves shared in project file.", editorId: "e8", category: "Motion Design", tags: ["kinetic-type", "branding", "spec"], software: ["After Effects"], skills: ["Kinetic Type"], aspect: "landscape", likes: 9600, commentsCount: 210, views: 98000, saves: 3400, duration: "0:45", timeAgo: "2d ago", hoursAgo: 55, videoSrc: V("ForBiggerBlazes.mp4") },
  { id: "v9", title: "PORTAL HEIST — Blender x AE Composite", description: "Full breakdown: 3D portal in Blender, tracked & comped in AE. 60 hours start to finish.", editorId: "e9", category: "VFX", tags: ["blender", "compositing", "breakdown"], software: ["Blender", "After Effects"], skills: ["Compositing", "Tracking"], aspect: "landscape", likes: 18200, commentsCount: 640, views: 310000, saves: 5900, duration: "1:58", timeAgo: "3d ago", hoursAgo: 74, videoSrc: V("BigBuckBunny.mp4"), trending: true },
  { id: "v10", title: "I Edited 30 Days of Shorts — Retention System", description: "The exact hook + caption + b-roll system I use for YouTube clients. Timeline tour included.", editorId: "e10", category: "Short-form", tags: ["retention", "youtube", "tutorial"], software: ["Premiere Pro"], skills: ["Retention", "Hooks"], aspect: "vertical", likes: 24500, commentsCount: 890, views: 480000, saves: 11200, duration: "0:59", timeAgo: "3d ago", hoursAgo: 78, videoSrc: V("ForBiggerFun.mp4"), featured: true },
  { id: "v11", title: "ONE PIECE — Gear 5 Awakening (IMAX Feel)", description: "Letterboxed, grain, and a choir swell. Tried to make Gear 5 feel like a film premiere.", editorId: "e6", category: "Anime", tags: ["one-piece", "gear5", "cinematic"], software: ["After Effects"], skills: ["Glow Compositing"], aspect: "vertical", likes: 41200, commentsCount: 1500, views: 890000, saves: 9800, duration: "0:52", timeAgo: "4d ago", hoursAgo: 100, videoSrc: V("ForBiggerEscapes.mp4"), trending: true },
  { id: "v12", title: "WARZONE WIN — 1v4 Clutch Sync", description: "Client clutch cut with bass-reactive shake. Every gunshot lands on frame.", editorId: "e3", category: "Gaming", tags: ["warzone", "clutch", "sync"], software: ["After Effects", "Premiere Pro"], skills: ["Shake Presets"], aspect: "vertical", likes: 18900, commentsCount: 430, views: 350000, saves: 2600, duration: "0:44", timeAgo: "4d ago", hoursAgo: 102, videoSrc: V("ForBiggerJoyrides.mp4") },
  { id: "v13", title: "DUBAI IN 60 SECONDS — Real Estate Reel", description: "48-hour turnaround for a marina penthouse. Hook in 0.8s, captions burned, CTA end-card.", editorId: "e11", category: "Short-form", tags: ["real-estate", "reels", "fast"], software: ["CapCut", "Premiere Pro"], skills: ["Hook Design"], aspect: "vertical", likes: 7200, commentsCount: 180, views: 156000, saves: 1900, duration: "0:58", timeAgo: "5d ago", hoursAgo: 124, videoSrc: V("ForBiggerMeltdowns.mp4") },
  { id: "v14", title: "STREETS OF CDMX — Shot & Cut in a Weekend", description: "Learning in public #23. All handheld, all natural light. Feedback welcome.", editorId: "e12", category: "Cinematic", tags: ["street", "travel", "learning"], software: ["Premiere Pro"], skills: ["Story", "Color"], aspect: "landscape", likes: 3400, commentsCount: 210, views: 42000, saves: 680, duration: "1:47", timeAgo: "5d ago", hoursAgo: 126, videoSrc: V("TearsOfSteel.mp4") },
  { id: "v15", title: "CHAMPIONS ANTHEM — Stadium Opener", description: "Spec opener for a cup final broadcast. Crowd builds, lights drop, anthem hits.", editorId: "e4", category: "Sports", tags: ["stadium", "opener", "broadcast"], software: ["Premiere Pro"], skills: ["Hype Cutting"], aspect: "landscape", likes: 11300, commentsCount: 290, views: 188000, saves: 2400, duration: "1:12", timeAgo: "6d ago", hoursAgo: 150, videoSrc: V("Sintel.mp4"), challengeId: "c2" },
  { id: "v16", title: "GT3 RS — Apex Predator (FPV Chase)", description: "FPV drone + A7IV ground cams. Cut to engine telemetry. My loudest edit ever.", editorId: "e5", category: "Cars", tags: ["porsche", "fpv", "track"], software: ["DaVinci Resolve"], skills: ["Roller Cuts"], aspect: "vertical", likes: 15600, commentsCount: 380, views: 274000, saves: 3100, duration: "0:49", timeAgo: "6d ago", hoursAgo: 152, videoSrc: V("ForBiggerBlazes.mp4"), challengeId: "c1" },
  { id: "v17", title: "CYBERPUNK 2077 — Neon City Trailer Cut", description: "My entry for the CYBERPUNK weekly challenge. Phantom Liberty footage, custom HUD overlays.", editorId: "e3", category: "Gaming", tags: ["cyberpunk", "trailer", "challenge"], software: ["After Effects"], skills: ["3D Camera"], aspect: "landscape", likes: 26800, commentsCount: 720, views: 445000, saves: 5300, duration: "1:34", timeAgo: "1d ago", hoursAgo: 28, videoSrc: V("BigBuckBunny.mp4"), challengeId: "c1", trending: true },
  { id: "v18", title: "CYBERPUNK GEISHA — Anime x Night City", description: "Ghost in the Shell meets Night City. Challenge entry — all overlays drawn frame by frame.", editorId: "e1", category: "Anime", tags: ["cyberpunk", "challenge", "amv"], software: ["After Effects"], skills: ["Masking"], aspect: "vertical", likes: 33400, commentsCount: 980, views: 520000, saves: 8100, duration: "0:55", timeAgo: "20h ago", hoursAgo: 20, videoSrc: V("ForBiggerFun.mp4"), challengeId: "c1", trending: true, featured: true },
  { id: "v19", title: "GOLDEN HOUR — Amalfi Coast Diary", description: "No trends, just light. Shot on FX3, graded in Resolve with halation + grain.", editorId: "e2", category: "Cinematic", tags: ["amalfi", "golden-hour", "fx3"], software: ["DaVinci Resolve"], skills: ["Color Grading"], aspect: "landscape", likes: 14700, commentsCount: 360, views: 176000, saves: 4200, duration: "2:20", timeAgo: "7d ago", hoursAgo: 170, videoSrc: V("ElephantsDream.mp4") },
  { id: "v20", title: "VELOCITY BLUEPRINT — Free Preset Demo", description: "Dropping my velocity pack free this week. Demo cut + download in bio.", editorId: "e11", category: "Short-form", tags: ["velocity", "preset", "free"], software: ["CapCut"], skills: ["Hook Design"], aspect: "vertical", likes: 9800, commentsCount: 540, views: 210000, saves: 7600, duration: "0:36", timeAgo: "2d ago", hoursAgo: 52, videoSrc: V("ForBiggerEscapes.mp4") },
  { id: "v21", title: "ECHOES — Kinetic Album Visualizer", description: "Full-album visualizer system. Type reacts to stems — kick, snare, vocal isolated.", editorId: "e8", category: "Motion Design", tags: ["visualizer", "album", "audio-reactive"], software: ["After Effects"], skills: ["Kinetic Type"], aspect: "landscape", likes: 8100, commentsCount: 190, views: 92000, saves: 2800, duration: "1:05", timeAgo: "8d ago", hoursAgo: 196, videoSrc: V("TearsOfSteel.mp4") },
  { id: "v22", title: "HOOK LAB — 5 Intros, 1 Timeline", description: "Retention teardown: same clip, 5 different hooks. Which one kept you watching?", editorId: "e10", category: "Short-form", tags: ["hooks", "retention", "breakdown"], software: ["Premiere Pro"], skills: ["Retention"], aspect: "vertical", likes: 17300, commentsCount: 760, views: 340000, saves: 8900, duration: "1:01", timeAgo: "1d ago", hoursAgo: 32, videoSrc: V("ForBiggerMeltdowns.mp4"), trending: true },
  { id: "v23", title: "MIDNIGHT WANGAN — Cinematic Loop", description: "Seamless loop challenge entry. Watch the headlights — they never cut.", editorId: "e12", category: "Cars", tags: ["loop", "night", "challenge"], software: ["Premiere Pro", "DaVinci Resolve"], skills: ["Transitions"], aspect: "vertical", likes: 5200, commentsCount: 240, views: 88000, saves: 1300, duration: "0:30", timeAgo: "3d ago", hoursAgo: 76, videoSrc: V("ForBiggerJoyrides.mp4") },
  { id: "v24", title: "IRON BLOOM — VFX Short (Breakdown)", description: "Flowers growing through concrete — full Nuke to AE pipeline walkthrough.", editorId: "e9", category: "VFX", tags: ["short-film", "simulation", "breakdown"], software: ["Nuke", "After Effects"], skills: ["Compositing"], aspect: "landscape", likes: 12400, commentsCount: 410, views: 168000, saves: 3600, duration: "2:02", timeAgo: "4d ago", hoursAgo: 98, videoSrc: V("TearsOfSteel.mp4") },
];

export interface Challenge {
  id: string;
  title: string;
  theme: string;
  description: string;
  status: "active" | "upcoming" | "completed";
  endsIn: string;
  endsHours: number;
  participants: number;
  prize: string;
  prizeDetail: string;
  seed: string;
  sponsor?: string;
  brief: string[];
  winnerId?: string;
  winnerEditId?: string;
  entriesCount: number;
}

export const CHALLENGES: Challenge[] = [
  {
    id: "c1", title: "Weekly Edit Challenge", theme: "CYBERPUNK", endsIn: "3 days remaining", endsHours: 72,
    participants: 1284, entriesCount: 842, prize: "$500 + Pro Annual", prizeDetail: "$500 cash, 1yr CUTPOINT Pro, homepage feature for a week.",
    seed: "cut-ch-cyber", sponsor: "Sponsored by NeonRig",
    description: "Create an edit around the theme CYBERPUNK using the provided footage pack — or bring your own. Night cities, chrome, holograms, attitude.",
    brief: ["Use at least 10s of the provided footage pack (or recreate its mood with original footage)", "Max runtime 90 seconds", "Any software allowed — disclose tools in your post", "Tag your entry #CyberpunkChallenge"],
    status: "active",
  },
  {
    id: "c2", title: "Sports Hype Invitational", theme: "90 SECONDS OF NOISE", endsIn: "6 days remaining", endsHours: 144,
    participants: 642, entriesCount: 388, prize: "$1,000 + Brand Deal Intro", prizeDetail: "$1,000 cash + intro call with two sports media brands hiring editors.",
    seed: "cut-ch-sports", description: "Cut the loudest 90 seconds of sport you've ever made. Crowds, comebacks, last-minute winners.",
    brief: ["Max runtime 90 seconds", "Original sound design required (no raw broadcast audio)", "Any sport, any era", "Tag #NoiseChallenge"],
    status: "active",
  },
  {
    id: "c3", title: "Loop Masters", theme: "SEAMLESS LOOP", endsIn: "Starts in 4 days", endsHours: -96,
    participants: 0, entriesCount: 0, prize: "$300 + Preset Bundle", prizeDetail: "$300 cash + featured preset bundle placement.",
    seed: "cut-ch-loop", description: "A perfect loop. No visible cut. Hypnotize the feed — cars, type, anime, anything that spins forever.",
    brief: ["Must loop seamlessly in-feed", "Max 30 seconds", "Vertical 9:16 required"],
    status: "upcoming",
  },
  {
    id: "c4", title: "One Song Challenge", theme: "AFTER HOURS", endsIn: "Ended 5 days ago", endsHours: 999,
    participants: 2103, entriesCount: 1874, prize: "$750", prizeDetail: "$750 cash + homepage feature.",
    seed: "cut-ch-song", description: "Everyone cut to the same synthwave track. 2,103 editors, one song, wildly different films.",
    brief: ["Use the provided track only", "Max 60 seconds"],
    status: "completed", winnerId: "e2", winnerEditId: "v19",
  },
];

export interface AppComment { id: string; editId: string; username: string; avatarImg: number; text: string; likes: number; time: string; }

export const COMMENTS: AppComment[] = [
  { id: "cm1", editId: "v1", username: "fragmason", avatarImg: 13, text: "That mask at 0:31 is disgusting (compliment). How many roto frames?", likes: 842, time: "1h ago" },
  { id: "cm2", editId: "v1", username: "yuki.amv", avatarImg: 32, text: "Glow stack is so clean. Dropping a tutorial on this exact CC soon.", likes: 512, time: "2h ago" },
  { id: "cm3", editId: "v1", username: "lena.cuts", avatarImg: 26, text: "Hook retention must be insane on this. What's your opening 2s rule?", likes: 230, time: "2h ago" },
  { id: "cm4", editId: "v6", username: "kaito.cuts", avatarImg: 12, text: "120 layers is wild. Respect the patience on those glow frames.", likes: 640, time: "5h ago" },
  { id: "cm5", editId: "v5", username: "drift THEORY", avatarImg: 59, text: "That kick-mapped ramp at 1:12 gave me chills. LUT when?", likes: 180, time: "8h ago" },
];

export interface AppNotification { id: string; type: "like" | "follow" | "comment" | "challenge" | "system" | "hire"; actor: string; avatarImg: number; text: string; time: string; read: boolean; editId?: string; }

export const NOTIFICATIONS: AppNotification[] = [
  { id: "n1", type: "challenge", actor: "CUTPOINT", avatarImg: 0, text: "CYBERPUNK challenge ends in 3 days — 842 entries so far. Submit yours.", time: "12m ago", read: false },
  { id: "n2", type: "like", actor: "yuki.amv", avatarImg: 32, text: "and 2.1K others liked your edit \"NEON RONIN\"", time: "1h ago", read: false, editId: "v1" },
  { id: "n3", type: "follow", actor: "fragmason", avatarImg: 13, text: "started following you", time: "3h ago", read: false },
  { id: "n4", type: "comment", actor: "nova.frames", avatarImg: 47, text: "commented: \"That grade is unreal. Breakdown please.\"", time: "6h ago", read: false, editId: "v5" },
  { id: "n5", type: "hire", actor: "PixelForge Studio", avatarImg: 25, text: "viewed your profile and saved 3 of your edits to a hiring shortlist", time: "1d ago", read: true },
  { id: "n6", type: "like", actor: "beat.surgeon", avatarImg: 53, text: "liked your comment on \"MIDNIGHT FREQUENCY\"", time: "1d ago", read: true },
  { id: "n7", type: "system", actor: "CUTPOINT", avatarImg: 0, text: "You reached Editor Level 27 — you're in the Top 5% globally.", time: "2d ago", read: true },
  { id: "n8", type: "follow", actor: "sprint.cut", avatarImg: 45, text: "started following you", time: "3d ago", read: true },
];

export const thumb = (seed: string, aspect: Aspect) =>
  aspect === "vertical"
    ? `https://picsum.photos/seed/${seed}/480/854`
    : `https://picsum.photos/seed/${seed}/800/450`;

export const avatar = (img: number) =>
  img === 0 ? "" : `https://i.pravatar.cc/150?img=${img}`;

export const fmt = (n: number): string => {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
};

export const editorById = (id: string) => EDITORS.find((e) => e.id === id)!;
export const editById = (id: string) => EDITS.find((e) => e.id === id)!;
