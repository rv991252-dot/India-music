import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { Song } from '../../types/music';
import { SongContextMenu } from '../SongContextMenu';
import { Heart, Play, Shuffle, Music, Trash2 } from 'lucide-react';

export const FavoritesScreen: React.FC = () => {
  const {
    songs,
    user,
    currentSong,
    isPlaying,
    playSong,
    toggleLike,
    togglePlay,
    lang,
    showToast,
  } = useMusic();

  const favoriteSongs: Song[] = user.likedSongIds
    .map((id) => songs.find((s) => s.id === id))
    .filter((s): s is Song => Boolean(s));

  const handlePlayAll = () => {
    if (favoriteSongs.length === 0) return;
    playSong(favoriteSongs[0], favoriteSongs);
    showToast(lang === 'hi' ? 'सभी पसंदीदा गाने बज रहे हैं' : 'Playing all favorite songs');
  };

  const handleShufflePlay = () => {
    if (favoriteSongs.length === 0) return;
    const shuffled = [...favoriteSongs].sort(() => Math.random() - 0.5);
    playSong(shuffled[0], shuffled);
    showToast(lang === 'hi' ? 'पसंदीदा गाने शफल में बज रहे हैं' : 'Shuffling favorite songs');
  };

  return (
    <div className="space-y-5 pb-28 pt-2 px-4">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/60 via-[#180f2d] to-amber-950/40 border border-purple-700/40 shadow-xl flex flex-col sm:flex-row items-center gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-lg flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-[#110b24] rounded-[10px] flex items-center justify-center">
            <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            {lang === 'hi' ? 'मेरी संगीत डायरी' : 'Personal Collection'}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
            {lang === 'hi' ? 'पसंदीदा गाने (Favorite Songs)' : 'Favorite Songs'}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            {favoriteSongs.length} {lang === 'hi' ? 'गाने सहेजे गए' : 'tracks saved'} • {user.name}
          </p>
        </div>
      </div>

      {/* Action Buttons: Play All & Shuffle */}
      {favoriteSongs.length > 0 && (
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayAll}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
            <span>{lang === 'hi' ? 'सभी बजाएं' : 'Play All'}</span>
          </button>

          <button
            onClick={handleShufflePlay}
            className="flex-1 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700/50 text-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Shuffle className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'शफल प्ले' : 'Shuffle'}</span>
          </button>
        </div>
      )}

      {/* List of Favorite Songs */}
      {favoriteSongs.length > 0 ? (
        <div className="space-y-2">
          {favoriteSongs.map((song, idx) => {
            const isCurrentPlaying = currentSong?.id === song.id && isPlaying;
            return (
              <div
                key={song.id}
                onClick={() => playSong(song, favoriteSongs)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  currentSong?.id === song.id
                    ? 'bg-purple-950/70 border-amber-400/50'
                    : 'bg-[#120c24] hover:bg-[#1a1233] border-purple-900/30'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-bold text-slate-400 w-4 text-center">
                    {idx + 1}
                  </span>
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-purple-800/30"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {lang === 'hi' ? (song.titleHi || song.title) : song.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {lang === 'hi' ? (song.artistHi || song.artist) : song.artist}
                    </p>
                    <span className="text-[10px] text-purple-300">
                      {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(song.id);
                    }}
                    className="p-1.5 text-rose-500 hover:text-slate-400 transition-colors"
                    title="पसंदीदा से हटाएं"
                  >
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentSong?.id === song.id) {
                        togglePlay();
                      } else {
                        playSong(song, favoriteSongs);
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center hover:bg-amber-300 transition-colors"
                  >
                    <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                  </button>

                  <SongContextMenu song={song} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-xl bg-[#120c24] border border-purple-900/20">
          <Heart className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-bold text-slate-200">
            {lang === 'hi' ? 'कोई पसंदीदा गाना नहीं मिला' : 'No favorite songs yet'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {lang === 'hi'
              ? 'गानों को सुनते समय दिल (❤️) आइकन पर टैप करें और वे यहाँ सहेज लिए जाएंगे।'
              : 'Tap the heart icon on any song to save it to your favorites.'}
          </p>
        </div>
      )}
    </div>
  );
};
