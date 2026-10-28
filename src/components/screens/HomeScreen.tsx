import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import { Song, Playlist } from '../../types/music';
import { SongContextMenu } from '../SongContextMenu';
import {
  Play,
  Pause,
  Flame,
  Sparkles,
  Disc3,
  Heart,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Headphones,
  Music2,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    songs,
    playlists,
    artists,
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    toggleLike,
    isLiked,
    lang,
    setSelectedPlaylistForDetail,
    setSelectedArtistForDetail,
    setIsLicenseModalOpen,
    setIsVipModalOpen,
  } = useMusic();

  const [selectedMood, setSelectedMood] = useState<string>('all');

  const moods = [
    { id: 'all', labelHi: 'सभी (All)', labelEn: 'All' },
    { id: 'bollywood', labelHi: 'बॉलीवुड', labelEn: 'Bollywood' },
    { id: 'bhangra', labelHi: 'पंजाबी बीट्स', labelEn: 'Punjabi' },
    { id: 'sufi', labelHi: 'सूफी सुकून', labelEn: 'Sufi' },
    { id: 'classical', labelHi: 'शास्त्रीय संगीत', labelEn: 'Classical' },
    { id: 'lofi', labelHi: 'लो-फाई चिल', labelEn: 'Lo-Fi' },
    { id: 'romantic', labelHi: 'रोमांटिक', labelEn: 'Romantic' },
  ];

  const filteredSongs = selectedMood === 'all'
    ? songs
    : songs.filter((s) => s.genre === selectedMood);

  const trendingSongs = songs.filter((s) => s.isTrending);
  const newReleases = songs.filter((s) => s.isNew);
  const heroFeaturedSong = songs[0];

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* Hero Showcase Banner */}
      {heroFeaturedSong && (
        <div className="relative mx-3 sm:mx-4 rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-950/50 group">
          <div className="h-44 sm:h-52 w-full relative">
            <img
              src={heroFeaturedSong.coverUrl}
              alt="Music India Trending"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080512] via-[#080512]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080512]/90 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3 fill-amber-400" />
                {lang === 'hi' ? 'आज का नंबर 1 ट्रेंडिंग' : 'Today #1 Trending'}
              </span>
              <span className="text-xs text-purple-200">
                {(heroFeaturedSong.plays / 1000000).toFixed(1)}M+ {lang === 'hi' ? 'बार सुना गया' : 'Streams'}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
              {lang === 'hi' ? (heroFeaturedSong.titleHi || heroFeaturedSong.title) : heroFeaturedSong.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mb-3 truncate max-w-sm">
              {lang === 'hi' ? (heroFeaturedSong.artistHi || heroFeaturedSong.artist) : heroFeaturedSong.artist}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (currentSong?.id === heroFeaturedSong.id) {
                    togglePlay();
                  } else {
                    playSong(heroFeaturedSong, songs);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/30 active:scale-95 transition-all"
              >
                {currentSong?.id === heroFeaturedSong.id && isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-slate-950" />
                    <span>{lang === 'hi' ? 'रोकें' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                    <span>{lang === 'hi' ? 'अभी सुनें' : 'Play Now'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleLike(heroFeaturedSong.id)}
                className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-700/50 text-slate-200 hover:text-amber-400 active:scale-95 transition-all"
                title="पसंदीदा"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked(heroFeaturedSong.id) ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>

              <div className="bg-purple-950/80 border border-purple-700/50 rounded-xl p-1">
                <SongContextMenu song={heroFeaturedSong} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mood / Category Pills */}
      <div className="px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                selectedMood === m.id
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-900/50 font-bold border border-purple-400/30'
                  : 'bg-[#150f29] text-slate-300 hover:text-white border border-purple-900/40 hover:bg-[#1f163b]'
              }`}
            >
              {lang === 'hi' ? m.labelHi : m.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Songs Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              {lang === 'hi' ? 'ट्रेंडिंग गाने (Trending Songs)' : 'Trending Songs'}
            </h2>
          </div>
          <span className="text-xs text-purple-300/80">
            {lang === 'hi' ? 'लाइव रैंकिंग' : 'Live Ranking'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredSongs.slice(0, 4).map((song, idx) => {
            const isCurrentPlaying = currentSong?.id === song.id && isPlaying;
            return (
              <div
                key={song.id}
                onClick={() => playSong(song, filteredSongs)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] group ${
                  currentSong?.id === song.id
                    ? 'bg-purple-950/60 border-amber-400/50 shadow-md shadow-purple-950/60'
                    : 'bg-[#120c24]/80 hover:bg-[#1a1233] border-purple-900/30'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-bold text-amber-400/90 w-4 text-center">
                    0{idx + 1}
                  </span>
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-purple-800/30">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {isCurrentPlaying ? (
                        <Pause className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ) : (
                        <Play className="w-5 h-5 fill-amber-400 text-amber-400 ml-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-amber-300 truncate">
                      {lang === 'hi' ? (song.titleHi || song.title) : song.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {lang === 'hi' ? (song.artistHi || song.artist) : song.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] text-purple-300 font-mono hidden sm:inline">
                    {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(song.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked(song.id) ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                  <SongContextMenu song={song} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Albums & Playlists Horizontal Carousel */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Disc3 className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              {lang === 'hi' ? 'लोकप्रिय प्लेलिस्ट और एल्बम' : 'Popular Playlists'}
            </h2>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => setSelectedPlaylistForDetail(pl)}
              className="w-36 sm:w-40 shrink-0 bg-[#120c24] border border-purple-900/30 rounded-xl p-2.5 cursor-pointer hover:border-amber-500/40 transition-all group"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 shadow-md">
                <img
                  src={pl.coverUrl}
                  alt={pl.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 truncate">
                {lang === 'hi' ? (pl.titleHi || pl.title) : pl.title}
              </h3>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">
                {pl.songs.length} {lang === 'hi' ? 'गाने' : 'Tracks'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Artists (शीर्ष गायक) */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              {lang === 'hi' ? 'शीर्ष कलाकार (Top Artists)' : 'Top Artists'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => setSelectedArtistForDetail(artist)}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-purple-600/40 group-hover:border-amber-400 transition-colors shadow-lg p-0.5 mb-1.5">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 truncate w-full">
                {lang === 'hi' ? artist.nameHi : artist.name}
              </span>
              <span className="text-[10px] text-purple-400/80 truncate w-full">
                {artist.monthlyListeners} {lang === 'hi' ? 'श्रोता' : 'listeners'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases & Recommended Tracks */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              {lang === 'hi' ? 'नई रिलीज़ (New Releases)' : 'New Releases'}
            </h2>
          </div>
        </div>

        <div className="space-y-2">
          {newReleases.slice(0, 3).map((song) => (
            <div
              key={song.id}
              onClick={() => playSong(song, songs)}
              className="p-2.5 rounded-xl bg-[#120c24] border border-purple-900/30 hover:border-amber-500/30 flex items-center justify-between cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-lg object-cover border border-purple-800/30 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 truncate">
                    {lang === 'hi' ? (song.titleHi || song.title) : song.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {lang === 'hi' ? (song.artistHi || song.artist) : song.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSong(song, songs);
                  }}
                  className="w-8 h-8 rounded-full bg-purple-900/60 hover:bg-amber-400 hover:text-slate-950 text-slate-200 flex items-center justify-center transition-colors"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
                <SongContextMenu song={song} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Authorized Music & Legal Transparency Card */}
      <div className="mx-4 p-4 rounded-xl bg-gradient-to-r from-purple-950/70 to-[#120a22] border border-purple-800/40 text-xs text-slate-300 flex items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-100 block">
              {lang === 'hi' ? '100% अधिकृत व कानूनी रूप से सुरक्षित' : '100% Authorized & Licensed Audio'}
            </span>
            <span className="text-[11px] text-slate-400 leading-relaxed block mt-0.5">
              {lang === 'hi'
                ? 'म्यूजिक इंडिया केवल स्वतंत्र व रॉयल्टी-मुक्त अधिकृत गीतों को स्ट्रीम करता है।'
                : 'Music India streams verified open-license & CC-BY authorized music.'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsLicenseModalOpen(true)}
          className="px-3 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-amber-300 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
        >
          {lang === 'hi' ? 'नियम पढ़ें' : 'License Info'}
        </button>
      </div>
    </div>
  );
};
