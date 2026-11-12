import React, { useId, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Scissors, Video, Briefcase, Check, Loader2, Eye as EyeIcon } from 'lucide-react';
import { Button, Field, Input, Modal } from './ui/primitives';
import { supabase } from '../lib/supabase';

const ROLE_OPTIONS = [
  { key: 'Viewer' as const, icon: EyeIcon, label: "I'm a Viewer", sub: 'Watch and support' },
  { key: 'Editor' as const, icon: Video, label: "I'm an Editor", sub: 'Share edits, build rep' },
  { key: 'Creator' as const, icon: Briefcase, label: "I'm a Creator", sub: 'Hire top editors' },
];

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setIsOnboardingOpen, addToast } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [role, setRole] = useState<'Editor' | 'Creator' | 'Viewer'>('Viewer');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const titleId = useId();
  const roleGroupId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');

    try {
      if (mode === 'signup') {
        const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '') || `user${Math.floor(Math.random() * 10000)}`;

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: cleanUsername,
              full_name: name.trim() || 'New User',
              role: role,
            },
          },
        });

        if (error) throw error;

        setIsAuthModalOpen(false);
        addToast('Account created. Welcome to CutPoint.', 'success');
        setIsOnboardingOpen(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        setIsAuthModalOpen(false);
        addToast('Welcome back!', 'success');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setFormError(message);
      addToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} titleId={titleId} className="max-w-md p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-md bg-ink-900 text-paper-0 flex items-center justify-center">
          <Scissors className="w-4 h-4" aria-hidden="true" />
        </div>
        <span className="font-bold text-lg text-ink-900 tracking-tight">
          Cut<span className="text-signal-600">point</span>
        </span>
      </div>

      <h2 id={titleId} className="text-2xl font-bold text-ink-900">
        {mode === 'signup' ? 'Create your account' : 'Welcome back'}
      </h2>
      <p className="text-ink-500 text-xs sm:text-sm mt-1">
        {mode === 'signup'
          ? 'Join the network for video editors and creators.'
          : 'Enter your credentials to access your portfolio.'}
      </p>

      {mode === 'signup' && (
        <div role="radiogroup" aria-label="Account type" id={roleGroupId} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ROLE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              role="radio"
              aria-checked={role === opt.key}
              onClick={() => setRole(opt.key)}
              className={`p-3.5 rounded-md border text-left flex flex-col gap-1.5 transition-colors cursor-pointer ${
                role === opt.key ? 'bg-signal-50 border-signal-300 text-ink-900' : 'bg-paper-0 border-ink-100 text-ink-500 hover:border-ink-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <opt.icon className={`w-4 h-4 ${role === opt.key ? 'text-signal-600' : 'text-ink-400'}`} aria-hidden="true" />
                {role === opt.key && <Check className="w-3.5 h-3.5 text-signal-600" aria-hidden="true" />}
              </div>
              <span className="font-semibold text-xs text-ink-900">{opt.label}</span>
              <span className="text-[10px] text-ink-500">{opt.sub}</span>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        {mode === 'signup' && (
          <Field id="auth-name" label="Full name" required>
            <Input
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
            />
          </Field>
        )}

        <Field id="auth-username" label="Username" required>
          <div className="relative">
            <span aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 text-sm z-10">
              @
            </span>
            <Input
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourname"
              className="pl-8"
            />
          </div>
        </Field>

        <Field id="auth-email" label="Email address" required>
          <Input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
          />
        </Field>

        <Field id="auth-password" label="Password" required hint={mode === 'signup' ? 'At least 6 characters' : undefined} error={formError || undefined}>
          <Input
            type="password"
            required
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            disabled={loading}
            minLength={6}
          />
        </Field>

        <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>{mode === 'signup' ? 'Creating account' : 'Signing in'}</span>
            </>
          ) : mode === 'signup' ? (
            'Create account'
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-ink-500">
        {mode === 'signup' ? (
          <span>
            Already have an account?{' '}
            <button type="button" onClick={() => setMode('signin')} className="text-signal-600 font-semibold hover:underline cursor-pointer">
              Sign in
            </button>
          </span>
        ) : (
          <span>
            Don&apos;t have an account yet?{' '}
            <button type="button" onClick={() => setMode('signup')} className="text-signal-600 font-semibold hover:underline cursor-pointer">
              Sign up
            </button>
          </span>
        )}
      </div>
    </Modal>
  );
};
