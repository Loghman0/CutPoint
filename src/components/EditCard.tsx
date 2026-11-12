import React, { useState, useRef } from 'react';
import { EditItem } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, MessageSquare, Bookmark, Eye, Play, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

interface EditCardProps {
  edit: EditItem;
}

export const EditCard: React.FC<EditCardProps> = ({ edit }) => {
  const { toggleLikeEdit, toggleSaveEdit, toggleFollowEditor, navigateToEdit, navigateToProfile, editors } =
    useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const editorObj = editors.find((ed) => ed.id === edit.editorId) || {
    id: edit.editorId,
    name: edit.editor.name,
    username: edit.editor.username,
    avatar: edit.editor.avatar,
    level: edit.editor.level,
    percentileRank: edit.editor.percentileRank,
    isFollowing: false,
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <article
      className="group relative bg-paper-50 rounded-md border border-ink-100 overflow-hidden hover:border-ink-300 transition-colors duration-200 flex flex-col justify-between"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media */}
      <div
        className={`relative w-full overflow-hidden bg-paper-0 ${
          edit.aspectRatio === '9:16' ? 'aspect-[9/14]' : 'aspect-video'
        }`}
      >
        <video
          ref={videoRef}
          src={edit.videoUrl}
          poster={edit.thumbnailUrl}
          muted={isMuted}
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-paper-0 via-transparent to-paper-0/30 opacity-80 group-hover:opacity-50 transition-opacity pointer-events-none" aria-hidden="true" />

        <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none" aria-hidden="true">
          <span className="px-2 py-1 rounded-md bg-paper-0/85 text-ink-700 text-[11px] font-semibold backdrop-blur-sm">
            {edit.category}
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-paper-0/70 text-ink-400 text-[10px]">
            {edit.aspectRatio}
          </span>
        </div>

        {edit.duration && (
          <div aria-hidden="true" className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-paper-0/85 text-ink-600 text-[11px] z-10 pointer-events-none tabular-num">
            {edit.duration}
          </div>
        )}

        <button
          onClick={() => navigateToEdit(edit)}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10 cursor-pointer"
        >
          <span className="sr-only">
            Open {edit.title}, by @{edit.editor.username}
          </span>
          {!isPlaying && (
            <span aria-hidden="true" className="w-12 h-12 rounded-full bg-paper-0/70 text-signal-600 border border-signal-300 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-signal-600 group-hover:text-paper-0 transition-all">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </span>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute preview' : 'Mute preview'}
            className="absolute bottom-3 right-3 min-w-11 min-h-11 flex items-center justify-center rounded-full bg-paper-0/85 text-ink-700 hover:text-signal-600 transition-colors z-20 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <img src={edit.editor.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 bg-paper-100" />
            <div className="flex flex-col truncate">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigateToProfile(editorObj.id)}
                  className="font-bold text-xs text-ink-700 hover:text-signal-600 transition-colors truncate cursor-pointer"
                >
                  @{edit.editor.username}
                </button>
                {edit.editor.isVerified && (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-signal-600 shrink-0" aria-hidden="true" />
                    <span className="sr-only">Verified editor</span>
                  </>
                )}
              </div>
              <span className="text-[10px] text-ink-400">
                Level {edit.editor.level}, {edit.editor.percentileRank}
              </span>
            </div>
          </div>

          <button
            onClick={() => toggleFollowEditor(editorObj.id)}
            aria-pressed={editorObj.isFollowing}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
              editorObj.isFollowing
                ? 'bg-paper-100 text-ink-600 border border-ink-200 hover:bg-ink-100'
                : 'bg-signal-50 text-signal-600 border border-signal-200 hover:bg-signal-600 hover:text-paper-0'
            }`}
          >
            {editorObj.isFollowing ? 'Following' : 'Follow'}
            <span className="sr-only"> @{edit.editor.username}</span>
          </button>
        </div>

        <h3 className="font-bold text-ink-900 text-sm line-clamp-2 leading-snug">
          <button onClick={() => navigateToEdit(edit)} className="text-left hover:text-signal-600 transition-colors cursor-pointer">
            {edit.title}
          </button>
        </h3>

        <ul className="flex flex-wrap gap-1.5 list-none" aria-label="Software used">
          {edit.software.map((sw) => (
            <li key={sw} className="px-2 py-0.5 rounded-md bg-paper-0 text-[10px] font-medium text-ink-400 border border-ink-100">
              {sw}
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-ink-100 flex items-center justify-between text-xs text-ink-500">
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleLikeEdit(edit.id)}
              aria-pressed={edit.isLiked}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                edit.isLiked ? 'text-rose-600 font-bold' : 'hover:text-ink-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${edit.isLiked ? 'fill-rose-600' : ''}`} aria-hidden="true" />
              <span>{edit.likesCount.toLocaleString()}</span>
              <span className="sr-only">{edit.isLiked ? 'likes, liked' : 'likes'}</span>
            </button>

            <button
              onClick={() => navigateToEdit(edit)}
              className="flex items-center gap-1 hover:text-ink-700 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>{edit.commentsCount}</span>
              <span className="sr-only">comments</span>
            </button>

            <div className="flex items-center gap-1 text-[11px] text-ink-400 tabular-num">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{edit.viewsCount.toLocaleString()}</span>
              <span className="sr-only">views</span>
            </div>
          </div>

          <button
            onClick={() => toggleSaveEdit(edit.id)}
            aria-pressed={edit.isSaved}
            aria-label={edit.isSaved ? 'Remove from saved' : 'Save to bookmarks'}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              edit.isSaved ? 'text-signal-600 bg-signal-50' : 'text-ink-500 hover:text-ink-900 hover:bg-paper-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${edit.isSaved ? 'fill-signal-600' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};
