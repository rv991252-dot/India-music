import React from 'react';
import { useMusic } from '../context/MusicContext';
import { Play, Pause, SkipForward, Heart, ListMusic } from 'lucide-react';

export const MiniPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    playNext,
    toggleLike,
    isLiked,
    setIsFullPlayerOpen,
    setIsQueueOpen,
    queue,
    lang,
  } = useMusic();

  if (!currentSong) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isSongLiked = isLiked(currentSong.id);

  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 px-2 sm:px-4 pb-1 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div
          onClick={() => setIsFullPlayerOpen(true)}
          className="relative bg-gradient-to-r from-[#140e24] via-[#1b1230] to-[#160e26] border border-purple-500/30 rounded-xl shadow-xl shadow-purple-950/70 p-2 flex items-center justify-between cursor-pointer group hover:border-amber-500/40 transition-all overflow-hidden"
        >
          {/* Subtle Progress Bar along Top Border */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-purple-950/80">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-amber-400 to-amber-300 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>

          {/* Left: Thumbnail & Song Info */}
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="relative shrink-0 w-11 h-11 rounded-lg overflow-hidden border border-purple-400/20 shadow-md">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform ${
                  isPlaying ? 'animate-spin-slow' : 'paused'
                }`}
              />
              {/* Vinyl center dot */}
              <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-amber-400/80 border border-slate-900 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-slate-900" />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                {lang === 'hi' ? (currentSong.titleHi || currentSong.title) : currentSong.title}
              </span>
              <span className="text-[11px] text-slate-400 truncate">
                {lang === 'hi' ? (currentSong.artistHi || currentSong.artist) : currentSong.artist}
              </span>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            {/* Heart Button */}
            <button
              onClick={() => toggleLike(currentSong.id)}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-amber-400 active:scale-90 transition-transform"
              title="पसंदीदा"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSongLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="min-h-[42px] min-w-[42px] rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/25 active:scale-90 transition-all"
              title={isPlaying ? 'रोकें' : 'बजाएं'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-slate-950" />
              ) : (
                <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
              )}
            </button>

            {/* Next Track Button */}
            <button
              onClick={playNext}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-300 hover:text-amber-400 active:scale-90 transition-transform"
              title="अगला गाना"
            >
              <SkipForward className="w-4 h-4 fill-slate-300" />
            </button>

            {/* Queue Button */}
            <button
              onClick={() => setIsQueueOpen(true)}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-amber-300 active:scale-90 transition-transform relative"
              title="बजाने की कतार (Queue)"
            >
              <ListMusic className="w-4 h-4" />
              {queue.length > 1 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
