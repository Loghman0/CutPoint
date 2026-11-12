# CutPoint

CutPoint is a social platform and marketplace for video editors — publish edits, build a
verifiable reputation, compete in challenges, and get hired by creators.

This app is **frontend-complete and production-ready on the UI layer**, running entirely on
local state with no backend connected yet. There are no demo accounts, no seeded videos, and
no fabricated stats anywhere — every list starts empty and shows a real "nothing here yet"
state until you connect a database.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (token-based theme, see `src/index.css`)
- lucide-react for icons

## Design system — "Studio"

A warm, editorial palette: warm paper surfaces, graphite ink text, and a single restrained
copper/amber accent. No neon, no gradients-as-glow. Built in OKLCH with every text/background
pairing verified against WCAG AA contrast.

- **Tokens**: `src/index.css` (`@theme` block) — `ink-*` (text/neutral dark), `paper-*`
  (surfaces), `copper-*` (accent), plus `ok`/`warn`/`err` functional colors.
- **Type**: Fraunces (serif, display headings only) + Inter (body/UI) + IBM Plex Mono
  (numeric data only — prices, counts, timestamps — never decoration).
- **Shared primitives**: `src/components/ui/primitives.tsx` — `Button`, `Panel`, `Badge`,
  `Eyebrow`, `LevelPill`, `Input`, `Textarea`, `EmptyState`. Build new UI from these rather
  than raw Tailwind classes so the system stays consistent.

## Data layer — where to connect a database

Nothing in this app talks to a real backend yet. Two files are the intended integration
points:

- **`src/data/seedData.ts`** — currently exports empty arrays (`SEED_EDITORS`, `SEED_EDITS`,
  etc.). This is the "no backend connected" starting state, not fake data in disguise.
- **`src/services/api.ts`** — a fully-typed stub layer (`authApi`, `editorsApi`, `editsApi`,
  `commentsApi`, `challengesApi`, `notificationsApi`). Every function currently throws
  `ApiNotConfiguredError`. Implement these against your database/API of choice (Supabase, a
  custom REST API, GraphQL, etc.) and wire them into `src/context/AppContext.tsx`.

`AppContext.tsx` currently persists state to `localStorage` as a placeholder so the app is
usable and testable without a backend. Once real persistence exists, replace the
`localStorage` reads/writes in `AppContext.tsx` with calls into `services/api.ts`.

### Suggested order of work

1. Pick a backend (Supabase is a fast fit for this schema — see `src/types.ts` for the full
   `Editor`, `EditItem`, `Challenge`, `NotificationItem`, etc. shapes already used throughout
   the UI).
2. Implement `authApi` first — real sign up / sign in replaces the current
   "create a local profile" flow in `AuthModal.tsx`.
3. Implement `editorsApi` and `editsApi`, and swap the `useState` + `localStorage` pattern in
   `AppContext.tsx` for real fetches (e.g. on mount, and after mutations).
4. Add real file upload for video/thumbnail — `PublishModal.tsx` currently takes a pasted
   URL as a placeholder for this.
5. `commentsApi`, `challengesApi`, `notificationsApi` as needed.

## Running locally

```bash
npm install
npm run dev
```

```bash
npm run build   # production build
npm run lint    # eslint
```
