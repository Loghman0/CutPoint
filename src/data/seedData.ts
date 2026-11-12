import { Editor, EditItem, Challenge, NotificationItem, EditBattle, MarketplaceAsset } from '../types';

/**
 * DATA SOURCE NOTE
 * -----------------
 * This app previously shipped with hardcoded demo accounts and videos.
 * All of that has been removed. These arrays are the real "no backend
 * connected yet" starting state — empty, not fake data in disguise.
 *
 * Next step (per project plan): replace the empty arrays and the
 * `services/api.ts` stub functions with real calls to your database or
 * API (REST/GraphQL/Supabase/etc). Every place in the app that reads
 * these collections goes through `AppContext`, so wiring a backend is
 * mostly a matter of:
 *   1. Fetching real data in `AppContext`'s initial state / effects
 *      instead of reading these empty arrays.
 *   2. Implementing the functions in `src/services/api.ts` to actually
 *      call your backend instead of mutating local React state.
 *   3. Replacing the localStorage persistence in AppContext with your
 *      backend as the source of truth (localStorage is a placeholder
 *      for "logged in as a demo user" behavior only).
 */

export const SEED_EDITORS: Editor[] = [];
export const SEED_EDITS: EditItem[] = [];
export const SEED_CHALLENGES: Challenge[] = [];
export const SEED_NOTIFICATIONS: NotificationItem[] = [];
export const SEED_EDIT_BATTLES: EditBattle[] = [];
export const SEED_MARKETPLACE_ASSETS: MarketplaceAsset[] = [];
