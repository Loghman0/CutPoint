import React, { useId, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings as SettingsIcon } from 'lucide-react';
import { Button, Field, Input, Textarea } from './ui/primitives';

export const SettingsView: React.FC = () => {
  const { currentUser, setCurrentUser, addToast } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [price, setPrice] = useState<number | ''>(currentUser?.startingPrice ?? '');
  const [availableForHire, setAvailableForHire] = useState(currentUser?.availableForHire ?? false);

  const switchId = useId();

  if (!currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      name,
      bio,
      location,
      startingPrice: price === '' ? undefined : price,
      availableForHire,
    });
    addToast('Profile settings saved');
  };

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-signal-100 text-signal-600 flex items-center justify-center" aria-hidden="true">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-ink-900">Account &amp; Profile Settings</h1>
            <p className="text-xs text-ink-400">Manage your CutPoint editor identity and hiring rates</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5 bg-paper-50 border border-ink-100 rounded-lg">
          <Field id="settings-name" label="Display name">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </Field>

          <Field id="settings-location" label="Location / Timezone">
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Los Angeles, USA" />
          </Field>

          <div className="flex items-center justify-between p-3.5 rounded-md bg-paper-0 border border-ink-100">
            <div>
              <span id={switchId} className="text-sm font-semibold text-ink-900 block">
                Available for hire
              </span>
              <span className="text-xs text-ink-400">Show up in the Hire Editors directory</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={availableForHire}
              aria-labelledby={switchId}
              onClick={() => setAvailableForHire((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${availableForHire ? 'bg-signal-600' : 'bg-ink-200'}`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-paper-0 transition-transform ${
                  availableForHire ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <Field id="settings-price" label="Starting commission rate ($ per edit)">
            <Input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 180"
            />
          </Field>

          <Field id="settings-bio" label="Bio and pitch">
            <Textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell creators what makes your editing style unique..." />
          </Field>

          <Button type="submit" size="lg" className="w-full">
            Save changes
          </Button>
        </form>
      </div>
    </div>
  );
};
