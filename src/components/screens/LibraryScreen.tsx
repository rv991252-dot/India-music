import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import { Playlist, Song } from '../../types/music';
import { SongContextMenu } from '../SongContextMenu';
import {
  ListMusic,
  Plus,
  Clock,
  Download,
  FolderHeart,
  Play,
  Heart,
  Trash2,
  Disc,
  Headphones,
} from 'lucide-react';

export const LibraryScreen: React.FC = () => {
  const {
    songs,
    playlists,
    artists,
    user,
    playSong,
    createPlaylist,
    removeSongFromPlaylist,
    setSelectedPlaylistForDetail,
    setSelectedArtistForDetail,
    lang,
    isDownloaded,
    toggleLike,
    isLiked,
    showToast,
  } = useMusic();

  const [activeTab, setActiveTab] = useState<'playlists' | 'recent' | 'downloads' | 'artists'>('playlists');
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');

  // Handle recently played list
  const recentSongs: Song[] = user.recentlyPlayed
    .map((item) => songs.find((s) => s.id === item.songId))
    .filter((s): s is Song => Boolean(s));

  // Handle downloaded songs
  const downloadedSongs: Song[] = user.downloadedSongIds
    .map((id) => songs.find((s) => s.id === id))
    .filter((s): s is Song => Boolean(s));

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistTitle.trim()) return;
    createPlaylist(newPlaylistTitle.trim());
    setNewPlaylistTitle('');
    setIsCreatingPlaylist(false);
  };

  return (
    <div className="space-y-5 pb-28 pt-2 px-4">
      {/* Top Header & Tab Pills */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white font-display">
          {lang === 'hi' ? 'मेरी म्यूजिक लाइब्रेरी' : 'My Library'}
        </h1>

        {activeTab === 'playlists' && (
          <button
            onClick={() => setIsCreatingPlaylist(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-400/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{lang === 'hi' ? 'नई प्लेलिस्ट' : 'New Playlist'}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-purple-900/30">
        {[
          { id: 'playlists' as const, labelHi: 'प्लेलिस्ट', labelEn: 'Playlists', icon: ListMusic },
          { id: 'recent' as const, labelHi: 'हाल ही में सुने', labelEn: 'Recently Played', icon: Clock },
          { id: 'downloads' as const, labelHi: 'डाउनलोड्स (ऑफलाइन)', labelEn: 'Downloaded', icon: Download },
          { id: 'artists' as const, labelHi: 'कलाकार', labelEn: 'Artists', icon: Headphones },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
                isActive
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? tab.labelHi : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Create Playlist Modal / Input Box */}
      {isCreatingPlaylist && (
        <form
          onSubmit={handleCreatePlaylist}
          className="p-4 rounded-xl bg-[#160f2a] border border-amber-500/40 shadow-xl space-y-3"
        >
          <span className="text-xs font-bold text-amber-300 block">
            {lang === 'hi' ? 'नई प्लेलिस्ट का नाम दें:' : 'Enter Playlist Name:'}
          </span>
          <input
            type="text"
            value={newPlaylistTitle}
            onChange={(e) => setNewPlaylistTitle(e.target.value)}
            placeholder={lang === 'hi' ? 'उदा. शाम की चाय और गाने...' : 'e.g. Evening Chill Vibes...'}
            autoFocus
            className="w-full h-10 px-3 bg-[#0f091f] border border-purple-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreatingPlaylist(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold"
            >
              {lang === 'hi' ? 'बनाएं' : 'Create'}
            </button>
          </div>
        </form>
      )}

      {/* Tab Contents */}
      {activeTab === 'playlists' && (
        <div className="grid grid-cols-2 gap-3">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => setSelectedPlaylistForDetail(pl)}
              className="p-3 rounded-xl bg-[#120c24] border border-purple-900/30 hover:border-amber-500/40 cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 shadow">
                  <img
                    src={pl.coverUrl}
                    alt={pl.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-slate-950">
                      <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-300">
                  {lang === 'hi' ? (pl.titleHi || pl.title) : pl.title}
                </h3>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {pl.songs.length} {lang === 'hi' ? 'गाने' : 'Songs'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'recent' && (
        <div>
          {recentSongs.length > 0 ? (
            <div className="space-y-2">
              {recentSongs.map((song) => (
                <div
                  key={song.id}
                  onClick={() => playSong(song, recentSongs)}
                  className="p-2.5 rounded-xl bg-[#120c24] border border-purple-900/30 hover:border-amber-500/30 flex items-center justify-between cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-300">
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
                        playSong(song, recentSongs);
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
          ) : (
            <div className="text-center py-12 px-4 rounded-xl bg-[#120c24] border border-purple-900/20 text-slate-400 text-xs">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50 text-purple-400" />
              <span>{lang === 'hi' ? 'आपने अभी तक कोई गाना नहीं सुना है।' : 'No songs played recently.'}</span>
            </div>
          )}
        </div>
      )}

      {activeTab === 'downloads' && (
        <div>
          {downloadedSongs.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-300 px-1 pb-1">
                <span>{downloadedSongs.length} {lang === 'hi' ? 'गाने ऑफलाइन उपलब्ध' : 'songs offline ready'}</span>
                <span>{lang === 'hi' ? 'बिना इंटरनेट सुनें' : 'Listen without internet'}</span>
              </div>
              {downloadedSongs.map((song) => (
                <div
                  key={song.id}
                  onClick={() => playSong(song, downloadedSongs)}
                  className="p-2.5 rounded-xl bg-[#120c24] border border-purple-900/30 hover:border-amber-500/30 flex items-center justify-between cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-300">
                        {lang === 'hi' ? (song.titleHi || song.title) : song.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {lang === 'hi' ? (song.artistHi || song.artist) : song.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                      {lang === 'hi' ? 'सुरक्षित' : 'Downloaded'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSong(song, downloadedSongs);
                      }}
                      className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center transition-colors"
                    >
                      <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                    </button>
                    <SongContextMenu song={song} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-xl bg-[#120c24] border border-purple-900/20 text-slate-400 text-xs">
              <Download className="w-8 h-8 mx-auto mb-2 opacity-50 text-purple-400" />
              <span>{lang === 'hi' ? 'कोई ऑफलाइन गाना नहीं मिला। फुल प्लेयर में डाउनलोड आइकन पर टैप करें।' : 'No offline songs found. Tap the download icon in the full player.'}</span>
            </div>
          )}
        </div>
      )}

      {activeTab === 'artists' && (
        <div className="space-y-3">
          {artists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => setSelectedArtistForDetail(artist)}
              className="p-3 rounded-xl bg-[#120c24] border border-purple-900/30 hover:border-amber-500/40 cursor-pointer flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-purple-700/50 group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300">
                    {lang === 'hi' ? artist.nameHi : artist.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {artist.monthlyListeners} {lang === 'hi' ? 'मासिक श्रोता' : 'Monthly Listeners'}
                  </p>
                </div>
              </div>

              <span className="text-xs text-amber-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
