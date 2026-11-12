import React, { useId, useState } from 'react';
import { useApp } from '../context/AppContext';
import { AspectRatio, EditCategory, SoftwareTool, SkillTag } from '../types';
import { Scissors } from 'lucide-react';
import { Button, Field, Input, Modal, Textarea } from './ui/primitives';

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

const SKILLS_LIST: SkillTag[] = [
  'Color Grading',
  'Speed Ramping',
  'Sound Design',
  '3D Tracking',
  'Typography',
  'Transitions',
  'VFX Compositing',
  'Velocity',
  'Masking',
  'Character Anim',
];

export const PublishModal: React.FC = () => {
  const { isPublishModalOpen, setIsPublishModalOpen, publishEdit, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [category, setCategory] = useState<EditCategory>('Gaming');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [selectedSoftware, setSelectedSoftware] = useState<SoftwareTool[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SkillTag[]>([]);
  const [tagsInput, setTagsInput] = useState('');

  const titleId = useId();

  if (!currentUser) return null;

  const toggleSoftware = (sw: SoftwareTool) => {
    setSelectedSoftware((prev) => (prev.includes(sw) ? prev.filter((s) => s !== sw) : [...prev, sw]));
  };

  const toggleSkill = (sk: SkillTag) => {
    setSelectedSkills((prev) => (prev.includes(sk) ? prev.filter((s) => s !== sk) : [...prev, sk]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    publishEdit({
      title: title.trim(),
      description: description.trim(),
      videoUrl: videoUrl.trim(),
      thumbnailUrl: thumbnailUrl.trim(),
      aspectRatio,
      category,
      tags,
      software: selectedSoftware,
      skills: selectedSkills,
      editorId: currentUser.id,
    });
  };

  return (
    <Modal
      isOpen={isPublishModalOpen}
      onClose={() => setIsPublishModalOpen(false)}
      titleId={titleId}
      className="max-w-2xl p-6 sm:p-8 my-8 max-h-[calc(100dvh-4rem)] overflow-y-auto"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-md bg-signal-100 text-signal-600 flex items-center justify-center">
          <Scissors className="w-4 h-4" aria-hidden="true" />
        </div>
        <span id={titleId} className="font-bold text-ink-900 text-lg">
          Publish new edit
        </span>
      </div>
      <p className="text-ink-400 text-xs sm:text-sm mb-6">
        Show your latest edit to the CutPoint community and gain reputation points.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field id="publish-title" label="Edit title" required>
          <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. CYBERPUNK 2099: Neon Speed Sync" />
        </Field>

        <Field id="publish-video" label="Video URL" required hint="Direct file upload isn't connected yet. Paste a hosted video URL for now.">
          <Input
            required
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://your-video-host.com/edit.mp4"
          />
        </Field>

        <Field id="publish-thumbnail" label="Thumbnail cover image URL" required>
          <Input
            required
            type="url"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="https://your-image-host.com/thumbnail.jpg"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <fieldset className="border-0 p-0 m-0">
            <legend className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-1.5">Aspect ratio</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['16:9', '9:16'] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  aria-pressed={aspectRatio === ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-2.5 rounded-md text-xs font-bold border transition-colors cursor-pointer ${
                    aspectRatio === ratio ? 'bg-signal-50 text-signal-700 border-signal-300' : 'bg-paper-0 text-ink-500 border-ink-100'
                  }`}
                >
                  {ratio === '16:9' ? '16:9 Landscape' : '9:16 Vertical'}
                </button>
              ))}
            </div>
          </fieldset>

          <Field id="publish-category" label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EditCategory)}
              className="w-full h-11 bg-paper-0 text-ink-900 text-sm rounded-md px-4 border border-ink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus:border-signal-500 transition-colors cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <fieldset className="border-0 p-0 m-0">
          <legend className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-1.5">Software used</legend>
          <div className="flex flex-wrap gap-2">
            {SOFTWARE_LIST.map((sw) => {
              const isSelected = selectedSoftware.includes(sw);
              return (
                <button
                  key={sw}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleSoftware(sw)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    isSelected ? 'bg-ink-900 text-paper-0 border-ink-900 font-bold' : 'bg-paper-0 text-ink-500 border-ink-100 hover:text-ink-800'
                  }`}
                >
                  {sw}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="border-0 p-0 m-0">
          <legend className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-1.5">Skills showcased</legend>
          <div className="flex flex-wrap gap-2">
            {SKILLS_LIST.map((sk) => {
              const isSelected = selectedSkills.includes(sk);
              return (
                <button
                  key={sk}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleSkill(sk)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    isSelected ? 'bg-signal-600 text-paper-0 border-signal-600 font-bold' : 'bg-paper-0 text-ink-500 border-ink-100 hover:text-ink-800'
                  }`}
                >
                  {sk}
                </button>
              );
            })}
          </div>
        </fieldset>

        <Field id="publish-description" label="Description and breakdown">
          <Textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your editing process, plugins, color grading, or audio design choices..."
          />
        </Field>

        <Field id="publish-tags" label="Tags" hint="Comma separated">
          <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="e.g. cyberpunk, speedramp, colorgrade" />
        </Field>

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full">
            Publish edit (+250 XP)
          </Button>
        </div>
      </form>
    </Modal>
  );
};
