import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import { MusicLanguage, Song } from '../../types/music';
import { SongContextMenu } from '../SongContextMenu';
import { Search as SearchIcon, X, Mic, Play, Heart, Disc, Music, User } from 'lucide-react';

export const SearchScreen: React.FC = () => {
  const { songs, artists, currentSong, isPlaying, playSong, toggleLike, isLiked, lang, showToast } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [isListening, setIsListening] = useState(false);

  const languages = [
    { id: 'all', labelHi: 'सभी भाषाएं', labelEn: 'All' },
    { id: 'hindi', labelHi: 'हिंदी (Hindi)', labelEn: 'Hindi' },
    { id: 'punjabi', labelHi: 'पंजाबी (Punjabi)', labelEn: 'Punjabi' },
    { id: 'tamil', labelHi: 'तमिल (Tamil)', labelEn: 'Tamil' },
    { id: 'telugu', labelHi: 'तेलुगू (Telugu)', labelEn: 'Telugu' },
    { id: 'english', labelHi: 'इंग्लिश (English)', labelEn: 'English' },
  ];

  const handleVoiceSearch = () => {
    setIsListening(true);
    showToast(lang === 'hi' ? 'बोलिए... हम सुन रहे हैं (Listening...)' : 'Listening...');
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('सूफी');
      showToast(lang === 'hi' ? 'खोज परिणाम: सूफी' : 'Search: Sufi');
    }, 2000);
  };

  const filteredSongs = songs.filter((song) => {
    // Language check
    if (selectedLanguage !== 'all' && song.language !== selectedLanguage) {
      return false;
    }
    // Query check
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      (song.titleHi && song.titleHi.toLowerCase().includes(query)) ||
      song.artist.toLowerCase().includes(query) ||
      (song.artistHi && song.artistHi.toLowerCase().includes(query)) ||
      song.album.toLowerCase().includes(query) ||
      (song.albumHi && song.albumHi.toLowerCase().includes(query)) ||
      song.genre.toLowerCase().includes(query) ||
      song.language.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-5 pb-28 pt-2 px-4">
      {/* Search Input Box */}
      <div className="relative">
        <div className="relative flex items-center">
          <SearchIcon className="w-5 h-5 text-amber-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'गाना, गायक, एल्बम या भाषा खोजें...'
                : 'Search songs, artists, albums, or languages...'
            }
            className="w-full h-12 pl-11 pr-20 bg-[#140e26] border border-purple-800/40 focus:border-amber-400 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-all shadow-inner"
          />
          <div className="absolute right-2.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleVoiceSearch}
              className={`p-1.5 rounded-full ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-amber-400 hover:bg-purple-900/40'
              }`}
              title="आवाज़ से खोजें"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Language Filter Chips */}
      <div>
        <span className="text-xs font-semibold text-slate-300 block mb-2">
          {lang === 'hi' ? 'भाषा के अनुसार फ़िल्टर करें:' : 'Filter by Language:'}
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedLanguage(l.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                selectedLanguage === l.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-[#150f28] text-slate-300 hover:text-white border border-purple-900/40'
              }`}
            >
              {lang === 'hi' ? l.labelHi : l.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Results or Exploration Tags */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-white font-display">
            {searchQuery
              ? `${lang === 'hi' ? 'खोज परिणाम' : 'Search Results'} (${filteredSongs.length})`
              : (lang === 'hi' ? 'सभी गाने' : 'All Available Songs')}
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('all');
              }}
              className="text-xs text-amber-300 hover:underline"
            >
              {lang === 'hi' ? 'रीसेट' : 'Clear'}
            </button>
          )}
        </div>

        {filteredSongs.length > 0 ? (
          <div className="space-y-2">
            {filteredSongs.map((song) => {
              const isCurrent = currentSong?.id === song.id && isPlaying;
              return (
                <div
                  key={song.id}
                  onClick={() => playSong(song, filteredSongs)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    currentSong?.id === song.id
                      ? 'bg-purple-950/70 border-amber-400/50'
                      : 'bg-[#120c24] hover:bg-[#1a1233] border-purple-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
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
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-purple-300">
                        <span className="capitalize">{song.language}</span>
                        <span>•</span>
                        <span className="capitalize">{song.genre}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(song.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                      title="पसंदीदा"
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
                        playSong(song, filteredSongs);
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
          <div className="text-center py-12 px-4 rounded-xl bg-[#120c24] border border-purple-900/20">
            <Music className="w-10 h-10 text-purple-400 mx-auto mb-2 opacity-50" />
            <p className="text-sm text-slate-300 font-semibold">
              {lang === 'hi' ? 'कोई गाना नहीं मिला' : 'No songs found'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'hi'
                ? 'कृपया किसी अन्य गायक, एल्बम या भाषा की तलाश करें।'
                : 'Try searching for another artist, album, or genre.'}
            </p>
          </div>
        )}
      </div>

      {/* Suggested Quick Searches */}
      <div className="pt-2">
        <span className="text-xs font-semibold text-slate-400 block mb-2">
          {lang === 'hi' ? 'लोकप्रिय खोजें (Trending Searches):' : 'Trending Searches:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {['कविता सिंह', 'मावी सिंह', 'भांगड़ा', 'सितार', 'लो-फाई', 'बॉलीवुड'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="text-xs px-3 py-1.5 rounded-lg bg-purple-950/50 hover:bg-purple-900/60 border border-purple-800/30 text-amber-300 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
