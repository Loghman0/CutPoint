import { Editor, EditItem, Challenge, NotificationItem } from '../types';

/**
 * API SERVICE LAYER (stub)
 * -------------------------
 * This file is the intended integration point for a real backend.
 * Every function currently throws — nothing here silently pretends
 * to work. When you connect a database (Supabase, a custom REST API,
 * GraphQL, etc.), implement these functions to call it, and update
 * `AppContext` to call them instead of only mutating local state.
 *
 * Suggested shape for a real backend:
 *   - auth: sign up / sign in / sign out / session check
 *   - editors: list/search, get by id, update profile
 *   - edits: list/search/filter, get by id, create, delete, like, save
 *   - comments: list by edit, create, delete
 *   - challenges: list, get by id, submit entry
 *   - notifications: list, mark read
 *
 * None of this is wired up yet by design — the UI works fully offline
 * against local state so it can be demoed and tested before a backend
 * exists, but every call site is isolated here so swapping in real
 * persistence doesn't require touching component code.
 */

export class ApiNotConfiguredError extends Error {
  constructor(operation: string) {
    super(
      `CutPoint API is not connected yet. "${operation}" has no backend implementation. ` +
        `Implement this in src/services/api.ts once a database/API is wired up.`
    );
    this.name = 'ApiNotConfiguredError';
  }
}

export const authApi = {
  async signUp(_input: { name: string; username: string; email: string; role: 'Editor' | 'Creator' }): Promise<Editor> {
    throw new ApiNotConfiguredError('authApi.signUp');
  },
  async signIn(_input: { email: string; password: string }): Promise<Editor> {
    throw new ApiNotConfiguredError('authApi.signIn');
  },
  async signOut(): Promise<void> {
    throw new ApiNotConfiguredError('authApi.signOut');
  },
  async getSession(): Promise<Editor | null> {
    throw new ApiNotConfiguredError('authApi.getSession');
  },
};

export const editorsApi = {
  async list(_params?: { specialty?: string; search?: string }): Promise<Editor[]> {
    throw new ApiNotConfiguredError('editorsApi.list');
  },
  async getById(_id: string): Promise<Editor | null> {
    throw new ApiNotConfiguredError('editorsApi.getById');
  },
  async update(_id: string, _patch: Partial<Editor>): Promise<Editor> {
    throw new ApiNotConfiguredError('editorsApi.update');
  },
  async follow(_id: string): Promise<void> {
    throw new ApiNotConfiguredError('editorsApi.follow');
  },
  async unfollow(_id: string): Promise<void> {
    throw new ApiNotConfiguredError('editorsApi.unfollow');
  },
};

export const editsApi = {
  async list(_params?: { category?: string; aspectRatio?: string; search?: string }): Promise<EditItem[]> {
    throw new ApiNotConfiguredError('editsApi.list');
  },
  async getById(_id: string): Promise<EditItem | null> {
    throw new ApiNotConfiguredError('editsApi.getById');
  },
  async create(_input: Partial<EditItem>): Promise<EditItem> {
    throw new ApiNotConfiguredError('editsApi.create');
  },
  async delete(_id: string): Promise<void> {
    throw new ApiNotConfiguredError('editsApi.delete');
  },
  async like(_id: string): Promise<void> {
    throw new ApiNotConfiguredError('editsApi.like');
  },
  async unlike(_id: string): Promise<void> {
    throw new ApiNotConfiguredError('editsApi.unlike');
  },
  async save(_id: string): Promise<void> {
    throw new ApiNotConfiguredError('editsApi.save');
  },
  async unsave(_id: string): Promise<void> {
    throw new ApiNotConfiguredError('editsApi.unsave');
  },
};

export const commentsApi = {
  async listByEdit(_editId: string) {
    throw new ApiNotConfiguredError('commentsApi.listByEdit');
  },
  async create(_editId: string, _text: string) {
    throw new ApiNotConfiguredError('commentsApi.create');
  },
  async delete(_editId: string, _commentId: string) {
    throw new ApiNotConfiguredError('commentsApi.delete');
  },
};

export const challengesApi = {
  async list(): Promise<Challenge[]> {
    throw new ApiNotConfiguredError('challengesApi.list');
  },
  async getById(_id: string): Promise<Challenge | null> {
    throw new ApiNotConfiguredError('challengesApi.getById');
  },
};

export const notificationsApi = {
  async list(): Promise<NotificationItem[]> {
    throw new ApiNotConfiguredError('notificationsApi.list');
  },
  async markRead(_id: string): Promise<void> {
    throw new ApiNotConfiguredError('notificationsApi.markRead');
  },
  async markAllRead(): Promise<void> {
    throw new ApiNotConfiguredError('notificationsApi.markAllRead');
  },
};
