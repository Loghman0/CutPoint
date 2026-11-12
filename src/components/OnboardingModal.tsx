import React, { useId, useState } from 'react';
import { useApp } from '../context/AppContext';
import { EditCategory, SoftwareTool } from '../types';
import { Check, Sparkles } from 'lucide-react';
import { Button, Modal } from './ui/primitives';

const CATEGORIES: EditCategory[] = [
  'Gaming',
  'Anime',
  'Sports',
  'Cinematic',
  'Cars',
  'Music',
  'Motion Design',
  'Short-form',
  'VFX',
];

const SOFTWARE_LIST: SoftwareTool[] = [
  'After Effects',
  'Premiere Pro',
  'DaVinci Resolve',
  'Final Cut Pro',
  'Blender',
  'Cinema 4D',
  'CapCut Pro',
];

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, currentUser, setCurrentUser, addToast, setCurrentView } = useApp();

  const [selectedCats, setSelectedCategories] = useState<EditCategory[]>([]);
  const [selectedSoft, setSelectedSoftware] = useState<SoftwareTool[]>([]);

  const titleId = useId();

  if (!currentUser) return null;

  const toggleCategory = (cat: EditCategory) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  const toggleSoftware = (sw: SoftwareTool) => {
    setSelectedSoftware((prev) => (prev.includes(sw) ? prev.filter((s) => s !== sw) : [...prev, sw]));
  };

  const handleFinish = () => {
    setCurrentUser({ ...currentUser, specialties: selectedCats, software: selectedSoft });
    setIsOnboardingOpen(false);
    addToast('Preferences saved, experience personalized');
    setCurrentView('feed');
  };

  return (
    <Modal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} titleId={titleId} className="max-w-xl p-6 sm:p-8">
      <div className="flex items-center gap-2 text-signal-600 text-xs uppercase tracking-widest font-bold mb-2">
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        Editor profile personalization
      </div>

      <h2 id={titleId} className="text-2xl sm:text-3xl font-bold text-ink-900">What are your specialties?</h2>
      <p className="text-ink-400 text-xs sm:text-sm mt-1">
        Select your primary editing categories and software tools to customize your
        recommendations and feed. You can change these later in Settings.
      </p>

      <fieldset className="mt-6 border-0 p-0 m-0">
        <legend className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-3">
          Primary categories
        </legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCats.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleCategory(cat)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-signal-600 text-paper-0 font-bold'
                    : 'bg-paper-0 text-ink-500 hover:text-ink-800 border border-ink-100'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />}
                {cat}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6 border-0 p-0 m-0">
        <legend className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-3">
          Software tools you master
        </legend>
        <div className="flex flex-wrap gap-2">
          {SOFTWARE_LIST.map((sw) => {
            const isSelected = selectedSoft.includes(sw);
            return (
              <button
                key={sw}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleSoftware(sw)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-ink-900 text-paper-0 font-bold'
                    : 'bg-paper-0 text-ink-500 hover:text-ink-800 border border-ink-100'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />}
                {sw}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8">
        <Button size="lg" className="w-full" onClick={handleFinish}>
          Complete onboarding and enter platform
        </Button>
      </div>
    </Modal>
  );
};
