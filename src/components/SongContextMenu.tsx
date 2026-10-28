import React, { useState, useRef, useEffect } from 'react';
import { useMusic } from '../context/MusicContext';
import { Song } from '../types/music';
import {
  MoreVertical,
  ListPlus,
  CornerDownRight,
  FolderPlus,
  Heart,
  Download,
  Check,
  Play,
  X,
} from 'lucide-react';

interface SongContextMenuProps {
  song: Song;
  className?: string;
  buttonClassName?: string;
}

export const SongContextMenu: React.FC<SongContextMenuProps> = ({
  song,
  className = '',
  buttonClassName = '',
}) => {
  const {
    playNextInQueue,
    addToQueue,
    playSong,
    toggleLike,
    isLiked,
    downloadSong,
    isDownloaded,
    setSelectedSongForPlaylist,
    lang,
  } = useMusic();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isSongLiked = isLiked(song.id);
  const isSongDownloaded = isDownloaded(song.id);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      {/* 3-Dots Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-purple-900/40 active:scale-90 transition-all ${buttonClassName}`}
        title={lang === 'hi' ? 'विकल्प (Options)' : 'Options'}
        aria-label="Song options"
      >
        <MoreVertical className="w-4 h-4 stroke-[2.2]" />
      </button>

      {/* Context Menu Dropdown / Bottom Sheet */}
      {isOpen && (
        <>
          {/* Backdrop on mobile for easy dismissal */}
          <div
            className="fixed inset-0 z-40 bg-black/40 sm:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />

          <div
            className="fixed inset-x-3 bottom-20 z-50 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-1.5 sm:w-64 bg-[#140c26] border border-purple-600/50 rounded-2xl shadow-2xl shadow-purple-950/90 text-white overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Song Preview Header in Context Menu */}
            <div className="p-3 bg-[#0c0618] border-b border-purple-900/40 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-9 h-9 rounded-md object-cover border border-purple-800/40 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">
                    {lang === 'hi' ? (song.titleHi || song.title) : song.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">
                    {lang === 'hi' ? (song.artistHi || song.artist) : song.artist}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white sm:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Options */}
            <div className="p-1.5 space-y-0.5">
              {/* 1. Play Next */}
              <button
                type="button"
                onClick={() => handleAction(() => playNextInQueue(song))}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs text-slate-200 hover:text-amber-300 hover:bg-purple-900/50 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                  <CornerDownRight className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold block leading-tight">
                    {lang === 'hi' ? 'इसके बाद बजाएं' : 'Play Next'}
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                    {lang === 'hi' ? 'वर्तमान गाने के तुरंत बाद' : 'Immediately after current track'}
                  </span>
                </div>
              </button>

              {/* 2. Add to Queue */}
              <button
                type="button"
                onClick={() => handleAction(() => addToQueue(song))}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs text-slate-200 hover:text-amber-300 hover:bg-purple-900/50 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-105 transition-transform">
                  <ListPlus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold block leading-tight">
                    {lang === 'hi' ? 'कतार में जोड़ें' : 'Add to Queue'}
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                    {lang === 'hi' ? 'सुनने की सूची के अंत में' : 'At the end of sequence'}
                  </span>
                </div>
              </button>

              {/* 3. Add to Playlist */}
              <button
                type="button"
                onClick={() => handleAction(() => setSelectedSongForPlaylist(song))}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs text-slate-200 hover:text-white hover:bg-purple-900/50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-purple-800/40 flex items-center justify-center text-slate-300 shrink-0">
                  <FolderPlus className="w-4 h-4" />
                </div>
                <span className="font-medium">
                  {lang === 'hi' ? 'प्लेलिस्ट में जोड़ें...' : 'Add to Playlist...'}
                </span>
              </button>

              {/* 4. Like / Favorite */}
              <button
                type="button"
                onClick={() => handleAction(() => toggleLike(song.id))}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs text-slate-200 hover:text-white hover:bg-purple-900/50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-purple-800/40 flex items-center justify-center text-slate-300 shrink-0">
                  <Heart
                    className={`w-4 h-4 ${
                      isSongLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
                    }`}
                  />
                </div>
                <span className="font-medium">
                  {isSongLiked
                    ? (lang === 'hi' ? 'पसंदीदा से हटाएं' : 'Remove from Favorites')
                    : (lang === 'hi' ? 'पसंदीदा में जोड़ें' : 'Add to Favorites')}
                </span>
              </button>

              {/* 5. Offline Download */}
              <button
                type="button"
                onClick={() => handleAction(() => downloadSong(song.id))}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs text-slate-200 hover:text-white hover:bg-purple-900/50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-purple-800/40 flex items-center justify-center text-slate-300 shrink-0">
                  {isSongDownloaded ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                </div>
                <span className="font-medium">
                  {isSongDownloaded
                    ? (lang === 'hi' ? 'ऑफलाइन सुरक्षित है' : 'Downloaded')
                    : (lang === 'hi' ? 'ऑफलाइन डाउनलोड करें' : 'Download Offline')}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
