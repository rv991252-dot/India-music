import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { SongContextMenu } from '../SongContextMenu';
import { X, Play, Heart, Headphones, CheckCircle2 } from 'lucide-react';

export const ArtistDetailModal: React.FC = () => {
  const {
    selectedArtistForDetail,
    setSelectedArtistForDetail,
    songs,
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    toggleLike,
    isLiked,
    lang,
    showToast,
  } = useMusic();

  if (!selectedArtistForDetail) return null;

  const artist = selectedArtistForDetail;

  const artistSongs = songs.filter(
    (s) =>
      s.artist.toLowerCase().includes(artist.name.toLowerCase()) ||
      (s.artistHi && s.artistHi.includes(artist.nameHi))
  );

  const handlePlayArtist = () => {
    if (artistSongs.length === 0) {
      if (songs.length > 0) playSong(songs[0], songs);
      return;
    }
    playSong(artistSongs[0], artistSongs);
    showToast(lang === 'hi' ? `${artist.nameHi} के गाने बज रहे हैं` : `Playing ${artist.name}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#120a22] border border-purple-600/40 rounded-2xl p-5 shadow-2xl text-white max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSelectedArtistForDetail(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Artist Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-purple-800/40">
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-amber-400 shadow-xl shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {lang === 'hi' ? 'वेरिफाइड आर्टिस्ट' : 'Verified Artist'}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
            <h2 className="text-base sm:text-lg font-black font-display text-white truncate">
              {lang === 'hi' ? artist.nameHi : artist.name}
            </h2>
            <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
              {lang === 'hi' ? artist.bioHi : artist.bio}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={handlePlayArtist}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />
                <span>{lang === 'hi' ? 'गाने सुनें' : 'Play Artist'}</span>
              </button>
              <span className="text-xs text-purple-300">
                {artist.monthlyListeners} {lang === 'hi' ? 'मासिक श्रोता' : 'Monthly Listeners'}
              </span>
            </div>
          </div>
        </div>

        {/* Song List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2">
          <span className="text-xs font-bold text-slate-300 block mb-1">
            {lang === 'hi' ? 'लोकप्रिय ट्रैक:' : 'Popular Tracks:'}
          </span>
          {artistSongs.length > 0 ? (
            artistSongs.map((song, idx) => (
              <div
                key={song.id}
                onClick={() => playSong(song, artistSongs)}
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
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {lang === 'hi' ? (song.titleHi || song.title) : song.title}
                    </h4>
                    <span className="text-[10px] text-purple-300 block">
                      {song.albumHi || song.album}
                    </span>
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
                      playSong(song, artistSongs);
                    }}
                    className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center hover:bg-amber-300"
                  >
                    <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                  </button>
                  <SongContextMenu song={song} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-xs italic py-4">
              {lang === 'hi' ? 'जल्द ही और गाने उपलब्ध होंगे।' : 'More tracks coming soon.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
