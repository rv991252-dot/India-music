import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import { X, FolderPlus, Plus, Check } from 'lucide-react';

export const AddToPlaylistModal: React.FC = () => {
  const {
    selectedSongForPlaylist,
    setSelectedSongForPlaylist,
    playlists,
    addSongToPlaylist,
    createPlaylist,
    lang,
  } = useMusic();

  const [newTitle, setNewTitle] = useState('');
  const [showNewInput, setShowNewInput] = useState(false);

  if (!selectedSongForPlaylist) return null;

  const song = selectedSongForPlaylist;

  const handleSelectPlaylist = (playlistId: string) => {
    addSongToPlaylist(playlistId, song);
    setSelectedSongForPlaylist(null);
  };

  const handleCreateAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newPl = createPlaylist(newTitle.trim());
    addSongToPlaylist(newPl.id, song);
    setNewTitle('');
    setShowNewInput(false);
    setSelectedSongForPlaylist(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-[#140c26] border border-purple-600/50 rounded-2xl p-5 shadow-2xl text-white">
        <button
          onClick={() => setSelectedSongForPlaylist(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <FolderPlus className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white font-display">
            {lang === 'hi' ? 'प्लेलिस्ट में जोड़ें' : 'Add to Playlist'}
          </h3>
        </div>

        <p className="text-xs text-slate-300 truncate mb-4 bg-[#0a0515] p-2 rounded-lg border border-purple-900/40">
          <span className="text-amber-300 font-semibold">{song.titleHi || song.title}</span> • {song.artistHi || song.artist}
        </p>

        {/* Existing Playlists */}
        <div className="space-y-1.5 max-h-52 overflow-y-auto mb-4 pr-1">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => handleSelectPlaylist(pl.id)}
              className="w-full p-2.5 rounded-xl bg-[#0c0618] hover:bg-purple-900/40 border border-purple-900/30 flex items-center justify-between text-left transition-colors group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={pl.coverUrl}
                  alt={pl.title}
                  className="w-8 h-8 rounded-md object-cover"
                />
                <span className="text-xs font-semibold text-white group-hover:text-amber-300 truncate">
                  {lang === 'hi' ? (pl.titleHi || pl.title) : pl.title}
                </span>
              </div>
              <span className="text-[10px] text-purple-300">
                {pl.songs.length} {lang === 'hi' ? 'गाने' : 'songs'}
              </span>
            </button>
          ))}
        </div>

        {/* Create new playlist toggle */}
        {showNewInput ? (
          <form onSubmit={handleCreateAndAdd} className="space-y-2 pt-2 border-t border-purple-900/40">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={lang === 'hi' ? 'नई प्लेलिस्ट का नाम...' : 'New playlist title...'}
              autoFocus
              className="w-full h-9 px-3 bg-[#0a0515] border border-purple-700 rounded-lg text-xs text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewInput(false)}
                className="px-3 py-1 text-xs text-slate-400 hover:text-white"
              >
                {lang === 'hi' ? 'रद्द' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs rounded"
              >
                {lang === 'hi' ? 'बनाएं व जोड़ें' : 'Create & Add'}
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowNewInput(true)}
            className="w-full py-2 rounded-xl border border-dashed border-purple-700 text-amber-300 hover:border-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'नई प्लेलिस्ट बनाएं' : 'Create New Playlist'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
