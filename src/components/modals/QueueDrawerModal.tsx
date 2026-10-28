import React from 'react';
import { useMusic } from '../../context/MusicContext';
import {
  ListMusic,
  X,
  Play,
  Trash2,
  Sparkles,
  Music2,
  CornerDownRight,
  Plus,
} from 'lucide-react';

export const QueueDrawerModal: React.FC = () => {
  const {
    isQueueOpen,
    setIsQueueOpen,
    queue,
    currentSong,
    isPlaying,
    playSong,
    removeFromQueue,
    clearQueue,
    lang,
    showToast,
  } = useMusic();

  if (!isQueueOpen) return null;

  const currentIndex = currentSong ? queue.findIndex((s) => s.id === currentSong.id) : -1;
  const upcomingQueue = currentIndex >= 0 ? queue.slice(currentIndex + 1) : queue;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="relative w-full max-w-lg bg-[#120a22] border-t sm:border border-purple-600/40 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl text-white max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-5 duration-200">
        {/* Top Handle on Mobile */}
        <div className="w-10 h-1.5 bg-purple-800/60 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <ListMusic className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black font-display text-white">
                {lang === 'hi' ? 'बजाने की कतार (Listening Queue)' : 'Listening Queue'}
              </h2>
              <span className="text-[11px] text-purple-300">
                {queue.length} {lang === 'hi' ? 'गाने कतार में' : 'tracks in sequence'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {upcomingQueue.length > 0 && (
              <button
                onClick={clearQueue}
                className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/40 text-rose-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="कतार खाली करें"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'hi' ? 'कतार खाली करें' : 'Clear Queue'}</span>
              </button>
            )}

            <button
              onClick={() => setIsQueueOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Queue Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4">
          {/* Currently Playing Card */}
          {currentSong && (
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block mb-1.5">
                {lang === 'hi' ? 'अभी बज रहा है (Now Playing):' : 'Now Playing:'}
              </span>
              <div className="p-3 rounded-xl bg-purple-950/70 border border-amber-400/50 shadow-lg flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-amber-400/50">
                    <img
                      src={currentSong.coverUrl}
                      alt={currentSong.title}
                      className="w-full h-full object-cover"
                    />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 h-3 bg-amber-400 animate-pulse" />
                          <span className="w-0.5 h-2 bg-amber-400 animate-pulse" />
                          <span className="w-0.5 h-3 bg-amber-400 animate-pulse" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {lang === 'hi' ? (currentSong.titleHi || currentSong.title) : currentSong.title}
                    </h4>
                    <p className="text-[11px] text-amber-200/80 truncate">
                      {lang === 'hi' ? (currentSong.artistHi || currentSong.artist) : currentSong.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                    {lang === 'hi' ? 'लाइव' : 'Playing'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Tracks in Sequence */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] uppercase tracking-wider text-purple-300 font-bold">
                {lang === 'hi' ? 'इसके बाद बजने वाले गाने (Next Up):' : 'Next Up:'}
              </span>
              <span className="text-[10px] text-slate-400">
                {upcomingQueue.length} {lang === 'hi' ? 'गाने बाकी' : 'upcoming'}
              </span>
            </div>

            {upcomingQueue.length > 0 ? (
              <div className="space-y-1.5">
                {upcomingQueue.map((song, idx) => {
                  const actualQueueIndex = currentIndex >= 0 ? currentIndex + 1 + idx : idx;
                  return (
                    <div
                      key={`${song.id}-${idx}`}
                      className="p-2.5 rounded-xl bg-[#0c0618] border border-purple-900/30 hover:border-amber-400/40 flex items-center justify-between gap-2 transition-colors group"
                    >
                      <div
                        onClick={() => playSong(song, queue)}
                        className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                      >
                        <span className="text-xs font-bold text-slate-500 w-4 text-center group-hover:text-amber-400">
                          {idx + 1}
                        </span>
                        <img
                          src={song.coverUrl}
                          alt={song.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-purple-800/30"
                        />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-white group-hover:text-amber-300 truncate">
                            {lang === 'hi' ? (song.titleHi || song.title) : song.title}
                          </h5>
                          <p className="text-[10px] text-slate-400 truncate">
                            {lang === 'hi' ? (song.artistHi || song.artist) : song.artist}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => playSong(song, queue)}
                          className="p-2 text-slate-400 hover:text-amber-400 active:scale-95 transition-colors"
                          title="अभी बजाएं"
                        >
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </button>
                        <button
                          onClick={() => removeFromQueue(actualQueueIndex)}
                          className="p-2 text-slate-500 hover:text-rose-400 active:scale-95 transition-colors"
                          title="कतार से हटाएं"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 px-4 rounded-xl bg-[#0c0618] border border-purple-900/20 text-slate-400 space-y-1.5">
                <Music2 className="w-8 h-8 mx-auto opacity-40 text-purple-400" />
                <p className="text-xs font-semibold text-slate-300">
                  {lang === 'hi' ? 'कतार में कोई अगला गाना नहीं है' : 'No upcoming tracks in queue'}
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  {lang === 'hi'
                    ? 'किसी भी गाने के मेनू (⋮) पर टैप करके "इसके बाद बजाएं" (Play Next) या "कतार में जोड़ें" (Add to Queue) चुनें।'
                    : 'Tap the (⋮) menu on any track and choose "Play Next" or "Add to Queue".'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-purple-800/40 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px]">
            {lang === 'hi' ? 'कतार स्वचालित रूप से सहेजी जाती है' : 'Sequence updates in real time'}
          </span>
          <button
            onClick={() => setIsQueueOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-white font-bold text-xs"
          >
            {lang === 'hi' ? 'पूर्ण' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
