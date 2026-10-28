import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { SongContextMenu } from '../SongContextMenu';
import { X, Play, Heart, Clock, Music } from 'lucide-react';

export const PlaylistDetailModal: React.FC = () => {
  const {
    selectedPlaylistForDetail,
    setSelectedPlaylistForDetail,
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    toggleLike,
    isLiked,
    lang,
    showToast,
  } = useMusic();

  if (!selectedPlaylistForDetail) return null;

  const pl = selectedPlaylistForDetail;

  const handlePlayAll = () => {
    if (pl.songs.length === 0) return;
    playSong(pl.songs[0], pl.songs);
    showToast(lang === 'hi' ? `"${pl.title}" बज रही है` : `Playing "${pl.title}"`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#120a22] border border-purple-600/40 rounded-2xl p-5 shadow-2xl text-white max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSelectedPlaylistForDetail(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Playlist Banner Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-purple-800/40">
          <img
            src={pl.coverUrl}
            alt={pl.title}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-purple-700/50 shadow-xl shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              {lang === 'hi' ? 'विशेष प्लेलिस्ट' : 'Curated Playlist'}
            </span>
            <h2 className="text-base sm:text-lg font-black font-display text-white truncate">
              {lang === 'hi' ? (pl.titleHi || pl.title) : pl.title}
            </h2>
            <p className="text-xs text-slate-300 line-clamp-2 mt-1">
              {lang === 'hi' ? (pl.descriptionHi || pl.description) : pl.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={handlePlayAll}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />
                <span>{lang === 'hi' ? 'सभी बजाएं' : 'Play All'}</span>
              </button>
              <span className="text-xs text-purple-300 font-medium">
                {pl.songs.length} {lang === 'hi' ? 'गाने' : 'Tracks'}
              </span>
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2">
          {pl.songs.length > 0 ? (
            pl.songs.map((song, idx) => {
              const isCurrent = currentSong?.id === song.id && isPlaying;
              return (
                <div
                  key={song.id}
                  onClick={() => playSong(song, pl.songs)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    currentSong?.id === song.id
                      ? 'bg-purple-950/70 border-amber-400/50'
                      : 'bg-[#0c0618] hover:bg-[#180f2d] border-purple-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold text-slate-400 w-4 text-center">
                      {idx + 1}
                    </span>
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 border border-purple-800/30"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {lang === 'hi' ? (song.titleHi || song.title) : song.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {lang === 'hi' ? (song.artistHi || song.artist) : song.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(song.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isLiked(song.id) ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentSong?.id === song.id) {
                          togglePlay();
                        } else {
                          playSong(song, pl.songs);
                        }
                      }}
                      className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center hover:bg-amber-300"
                    >
                      <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                    </button>
                    <SongContextMenu song={song} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs">
              <Music className="w-8 h-8 mx-auto mb-2 opacity-50 text-purple-400" />
              <span>{lang === 'hi' ? 'इस प्लेलिस्ट में अभी कोई गाना नहीं है।' : 'No songs in this playlist yet.'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
