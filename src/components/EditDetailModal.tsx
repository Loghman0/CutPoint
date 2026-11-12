import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Send,
  Trash2,
  ArrowLeft,
} from 'lucide-react';
import { EditCard } from './EditCard';
import { Badge, Button, EmptyState, IconButton, LevelPill, Panel } from './ui/primitives';

interface LocalComment {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    level: number;
  };
  text: string;
  createdAt: string;
}

export const EditDetailModal: React.FC = () => {
  const {
    selectedEdit,
    setSelectedEdit,
    setCurrentView,
    toggleLikeEdit,
    toggleSaveEdit,
    toggleFollowEditor,
    addComment,
    deleteComment,
    addToast,
    navigateToProfile,
    edits,
    editors,
    currentUser,
    setIsAuthModalOpen,
  } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState<LocalComment[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  if (!selectedEdit) {
    return (
      <div className="min-h-screen bg-paper-0 flex items-center justify-center px-4">
        <EmptyState
          title="Edit not found"
          description="This edit may have been removed or is no longer available."
          action={<Button onClick={() => setCurrentView('feed')}>Back to feed</Button>}
        />
      </div>
    );
  }

  const editorObj = editors.find((ed) => ed.id === selectedEdit.editorId) || {
    id: selectedEdit.editorId,
    name: selectedEdit.editor.name,
    username: selectedEdit.editor.username,
    avatar: selectedEdit.editor.avatar,
    level: selectedEdit.editor.level,
    percentileRank: selectedEdit.editor.percentileRank,
    isFollowing: false,
    bio: 'Passionate video editor crafting high impact edits.',
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else videoRef.current.requestFullscreen();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Link copied to clipboard');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!currentUser) {
      addToast('Please sign in to comment', 'error');
      return;
    }

    const newC: LocalComment = {
      id: `c-${Date.now()}`,
      user: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        level: currentUser.level,
      },
      text: commentText.trim(),
      createdAt: 'Just now',
    };

    setLocalComments([newC, ...localComments]);
    addComment(selectedEdit.id, commentText.trim());
    setCommentText('');
  };

  const handleDeleteCommentLocal = (id: string) => {
    setLocalComments(localComments.filter((c) => c.id !== id));
    deleteComment(selectedEdit.id, id);
  };

  const moreFromEditor = edits.filter((e) => e.editorId === selectedEdit.editorId && e.id !== selectedEdit.id);
  const relatedEdits = edits.filter((e) => e.category === selectedEdit.category && e.id !== selectedEdit.id);

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="sticky top-16 z-30 bg-paper-0/95 backdrop-blur-xl border-b border-ink-100 px-4 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedEdit(null);
              setCurrentView('feed');
            }}
            className="flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-ink-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to feed
          </button>

          <div className="flex items-center gap-2">
            <Badge tone="accent">{selectedEdit.category}</Badge>
            <Badge>{selectedEdit.aspectRatio}</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <h1 className="sr-only">{selectedEdit.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="relative rounded-md overflow-hidden bg-paper-50 border border-ink-100 group focus-within:[&_.video-controls]:opacity-100">
              <div
                className={`relative w-full ${
                  selectedEdit.aspectRatio === '9:16' ? 'max-h-[650px] aspect-[9/16] mx-auto' : 'aspect-video'
                }`}
              >
                <video
                  ref={videoRef}
                  src={selectedEdit.videoUrl}
                  poster={selectedEdit.thumbnailUrl}
                  loop
                  playsInline
                  aria-label={selectedEdit.title}
                  className="w-full h-full object-contain bg-ink-900"
                />

                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    aria-label={`Play ${selectedEdit.title}`}
                    className="absolute inset-0 flex items-center justify-center bg-ink-900/40 cursor-pointer"
                  >
                    <span aria-hidden="true" className="w-16 h-16 rounded-full bg-signal-600 text-paper-0 flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-paper-0 ml-1" />
                    </span>
                  </button>
                )}

                <div className="video-controls absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink-900 via-ink-900/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3">
                    <IconButton label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay} className="bg-paper-0/20 text-paper-0 hover:bg-paper-0/30 hover:text-paper-0">
                      {isPlaying ? <Pause className="w-5 h-5" aria-hidden="true" /> : <Play className="w-5 h-5" aria-hidden="true" />}
                    </IconButton>

                    <IconButton label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute} className="bg-paper-0/20 text-paper-0 hover:bg-paper-0/30 hover:text-paper-0">
                      {isMuted ? <VolumeX className="w-5 h-5" aria-hidden="true" /> : <Volume2 className="w-5 h-5" aria-hidden="true" />}
                    </IconButton>

                    <span className="text-xs text-paper-100 tabular-num" aria-hidden="true">
                      {selectedEdit.duration || '0:20'}
                    </span>
                  </div>

                  <IconButton label="Fullscreen" onClick={toggleFullscreen} className="bg-paper-0/20 text-paper-0 hover:bg-paper-0/30 hover:text-paper-0">
                    <Maximize className="w-5 h-5" aria-hidden="true" />
                  </IconButton>
                </div>
              </div>
            </div>

            <Panel className="p-6 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-ink-900">{selectedEdit.title}</h2>
                  <p className="text-xs text-ink-400 mt-1">Published {selectedEdit.createdAt}</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    onClick={() => toggleLikeEdit(selectedEdit.id)}
                    aria-pressed={selectedEdit.isLiked}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs transition-colors cursor-pointer ${
                      selectedEdit.isLiked ? 'bg-rose-100 text-rose-600 border border-rose-200' : 'bg-paper-100 hover:bg-ink-100 text-ink-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${selectedEdit.isLiked ? 'fill-rose-600' : ''}`} aria-hidden="true" />
                    <span>{selectedEdit.likesCount.toLocaleString()}</span>
                    <span className="sr-only">{selectedEdit.isLiked ? 'likes, liked' : 'likes'}</span>
                  </button>

                  <button
                    onClick={() => toggleSaveEdit(selectedEdit.id)}
                    aria-pressed={selectedEdit.isSaved}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs transition-colors cursor-pointer ${
                      selectedEdit.isSaved ? 'bg-signal-100 text-signal-700 border border-signal-200' : 'bg-paper-100 hover:bg-ink-100 text-ink-600'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${selectedEdit.isSaved ? 'fill-signal-600' : ''}`} aria-hidden="true" />
                    <span>Save</span>
                  </button>

                  <IconButton label="Copy link to this edit" onClick={handleShare} className="bg-paper-100 hover:bg-ink-100">
                    <Share2 className="w-4 h-4" aria-hidden="true" />
                  </IconButton>
                </div>
              </div>

              <p className="text-ink-600 text-sm leading-relaxed whitespace-pre-line">{selectedEdit.description}</p>

              <div className="pt-3 border-t border-ink-100 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-ink-400 uppercase tracking-wider mr-1">Software</span>
                {selectedEdit.software.map((sw) => (
                  <Badge key={sw} className="normal-case font-medium">
                    {sw}
                  </Badge>
                ))}

                {selectedEdit.skills && selectedEdit.skills.length > 0 && (
                  <>
                    <span className="text-[11px] font-bold text-ink-400 uppercase tracking-wider ml-2">Skills</span>
                    {selectedEdit.skills.map((sk) => (
                      <Badge key={sk} tone="accent" className="normal-case font-medium">
                        {sk}
                      </Badge>
                    ))}
                  </>
                )}
              </div>

              {selectedEdit.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2 pt-1 list-none" aria-label="Tags">
                  {selectedEdit.tags.map((tag) => (
                    <li key={tag}>
                      <span className="text-xs text-ink-400">#{tag}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel className="p-6 space-y-6">
              <h3 className="text-lg font-bold text-ink-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-signal-600" aria-hidden="true" />
                Community discussion ({localComments.length})
              </h3>

              {currentUser ? (
                <form onSubmit={handlePostComment} className="flex gap-3">
                  <img src={currentUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0 bg-paper-100" />
                  <div className="flex-1 relative">
                    <label htmlFor="new-comment" className="sr-only">
                      Add a comment
                    </label>
                    <input
                      id="new-comment"
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Ask about plugins, feedback, or sound design..."
                      className="w-full bg-paper-0 text-ink-800 text-sm rounded-full pl-4 pr-11 py-2.5 border border-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus:border-signal-500 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      aria-label="Post comment"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-signal-600 hover:text-signal-700 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between gap-3 p-3 rounded-md bg-paper-50 border border-ink-100">
                  <span className="text-sm text-ink-500">Sign in to join the discussion.</span>
                  <Button size="sm" onClick={() => setIsAuthModalOpen(true)}>
                    Sign in
                  </Button>
                </div>
              )}

              {localComments.length === 0 ? (
                <EmptyState title="No comments yet" description="Be the first to share feedback on this edit." />
              ) : (
                <ul className="space-y-3 pt-2 list-none">
                  {localComments.map((comment) => (
                    <li key={comment.id} className="p-4 rounded-md bg-paper-0 border border-ink-100 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button onClick={() => navigateToProfile(comment.user.username)} className="shrink-0 cursor-pointer rounded-full">
                          <img src={comment.user.avatar} alt="" className="w-9 h-9 rounded-full object-cover bg-paper-100" />
                        </button>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              onClick={() => navigateToProfile(comment.user.username)}
                              className="font-bold text-xs text-ink-900 hover:text-signal-600 cursor-pointer"
                            >
                              @{comment.user.username}
                            </button>
                            <LevelPill level={comment.user.level} />
                            <span className="text-[10px] text-ink-300">{comment.createdAt}</span>
                          </div>
                          <p className="text-sm text-ink-600 mt-1.5 leading-snug">{comment.text}</p>
                        </div>
                      </div>

                      {currentUser && currentUser.username === comment.user.username && (
                        <IconButton
                          label="Delete comment"
                          onClick={() => handleDeleteCommentLocal(comment.id)}
                          className="text-ink-300 hover:text-err-600 min-w-9 min-h-9"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </IconButton>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>

          <div className="space-y-5">
            <Panel className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <img src={editorObj.avatar} alt="" className="w-14 h-14 rounded-full object-cover bg-paper-100" />
                <div>
                  <h3 className="font-bold text-ink-900 text-base leading-tight">{editorObj.name}</h3>
                  <p className="text-xs text-ink-400">@{editorObj.username}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <LevelPill level={editorObj.level} />
                    <span className="text-ink-400">{editorObj.percentileRank}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-ink-500 line-clamp-3 leading-relaxed">{editorObj.bio}</p>

              <div className="pt-2 flex items-center gap-2">
                <Button
                  variant={editorObj.isFollowing ? 'secondary' : 'primary'}
                  className="flex-1"
                  onClick={() => toggleFollowEditor(editorObj.id)}
                  aria-pressed={editorObj.isFollowing}
                >
                  {editorObj.isFollowing ? 'Following' : 'Follow editor'}
                </Button>

                <Button variant="secondary" onClick={() => navigateToProfile(editorObj.id)}>
                  Hire / Contact
                </Button>
              </div>
            </Panel>

            {moreFromEditor.length > 0 && (
              <section aria-labelledby="more-from-editor-heading" className="space-y-3">
                <h3 id="more-from-editor-heading" className="text-xs font-bold text-ink-400 uppercase tracking-wider">
                  More from @{editorObj.username}
                </h3>
                <div className="space-y-3">
                  {moreFromEditor.map((edit) => (
                    <EditCard key={edit.id} edit={edit} />
                  ))}
                </div>
              </section>
            )}

            {relatedEdits.length > 0 && (
              <section aria-labelledby="related-edits-heading" className="space-y-3 pt-2">
                <h3 id="related-edits-heading" className="text-xs font-bold text-ink-400 uppercase tracking-wider">
                  You may also like ({selectedEdit.category})
                </h3>
                <div className="space-y-3">
                  {relatedEdits.slice(0, 2).map((edit) => (
                    <EditCard key={edit.id} edit={edit} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
