import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import { SongContextMenu } from './SongContextMenu';
import {
  ChevronDown,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  Download,
  Check,
  ListPlus,
  ListMusic,
  FileText,
  Sliders,
  Sparkles,
  Share2,
} from 'lucide-react';

export const FullPlayerModal: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    isShuffle,
    toggleShuffle,
    repeatMode,
    cycleRepeat,
    audioQuality,
    setAudioQuality,
    isFullPlayerOpen,
    setIsFullPlayerOpen,
    showLyrics,
    setShowLyrics,
    toggleLike,
    isLiked,
    downloadSong,
    isDownloaded,
    queue,
    isQueueOpen,
    setIsQueueOpen,
    lang,
    showToast,
  } = useMusic();

  const [showQualityMenu, setShowQualityMenu] = useState(false);

  if (!isFullPlayerOpen || !currentSong) return null;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isSongLiked = isLiked(currentSong.id);
  const isSongDownloaded = isDownloaded(currentSong.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `म्यूजिक इंडिया: ${currentSong.titleHi || currentSong.title}`,
        text: `म्यूजिक इंडिया पर ${currentSong.artistHi || currentSong.artist} का शानदार गाना सुनें!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast(lang === 'hi' ? 'गाना लिंक कॉपी हो गया!' : 'Song link copied!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080512]/98 backdrop-blur-2xl flex flex-col justify-between text-white overflow-y-auto animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-purple-900/20">
        <button
          onClick={() => setIsFullPlayerOpen(false)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-transform"
          title="नीचे करें"
        >
          <ChevronDown className="w-7 h-7" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-wider text-purple-300/80 font-medium">
            {lang === 'hi' ? 'बज रहा है (Now Playing)' : 'Now Playing'}
          </span>
          <span className="text-xs text-amber-300 font-semibold truncate max-w-[200px]">
            {lang === 'hi' ? (currentSong.albumHi || currentSong.album) : currentSong.album}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsQueueOpen(true)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-300 hover:text-amber-300 active:scale-90 transition-colors relative"
            title="बजाने की कतार (Listening Queue)"
          >
            <ListMusic className="w-5 h-5" />
            {queue.length > 1 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-300 hover:text-amber-300 active:scale-90 transition-colors"
            title="साझा करें"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Body: Vinyl Cover Art OR Synced Lyrics */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 max-w-md mx-auto w-full">
        {showLyrics ? (
          /* Lyrics View */
          <div className="w-full h-80 rounded-2xl bg-[#120c24]/90 border border-purple-500/30 p-5 flex flex-col overflow-y-auto relative shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-purple-800/30">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {lang === 'hi' ? 'गीत के बोल (Lyrics)' : 'Lyrics'}
              </span>
              <button
                onClick={() => setShowLyrics(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-purple-950/60"
              >
                {lang === 'hi' ? 'कवर देखें' : 'Show Cover'}
              </button>
            </div>
            <div className="flex-1 space-y-4 text-center py-4">
              {currentSong.lyrics ? (
                currentSong.lyrics.split('\n').map((line, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base font-medium text-slate-200 hover:text-amber-300 transition-colors leading-relaxed"
                  >
                    {line.replace(/\[\d{2}:\d{2}\.\d{2}\]/g, '')}
                  </p>
                ))
              ) : (
                <p className="text-slate-400 text-sm italic mt-12">
                  {lang === 'hi' ? 'इस गाने के बोल जल्द ही जोड़े जाएंगे।' : 'Lyrics for this song will be added soon.'}
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Vinyl Record Artwork View */
          <div className="relative flex items-center justify-center my-auto">
            {/* Glowing Aura Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-amber-500/20 to-purple-800/30 rounded-full blur-2xl opacity-75 animate-pulse" />

            {/* Vinyl Outer Rim */}
            <div
              className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#0a0714] p-3 shadow-2xl shadow-purple-950/90 border-4 border-amber-500/40 flex items-center justify-center ${
                isPlaying ? 'animate-spin-slow' : 'paused'
              }`}
            >
              {/* Concentric Grooves */}
              <div className="w-full h-full rounded-full border border-purple-900/50 flex items-center justify-center p-3">
                <div className="w-full h-full rounded-full border border-purple-800/40 flex items-center justify-center p-4">
                  <div className="w-full h-full rounded-full border border-amber-500/20 flex items-center justify-center overflow-hidden relative">
                    {/* Album Art Image Center */}
                    <img
                      src={currentSong.coverUrl}
                      alt={currentSong.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />

                    {/* Spindle hole */}
                    <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-[#080512] border-2 border-amber-400 flex items-center justify-center shadow-inner">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audio Equalizer Frequency Bars */}
        <div className="flex items-end justify-center gap-1.5 h-6 mt-4 w-full">
          {[40, 75, 25, 90, 50, 100, 30, 85, 60, 95, 45, 70].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-gradient-to-t from-purple-600 to-amber-400'
                  : 'bg-purple-950 h-1.5'
              }`}
              style={{
                height: isPlaying ? `${Math.max(15, (h * (0.4 + (i % 3) * 0.3)))}%` : '6px',
              }}
            />
          ))}
        </div>

        {/* Title, Artist, & Action Buttons */}
        <div className="w-full flex items-center justify-between mt-5 mb-2">
          <div className="flex flex-col min-w-0 pr-2">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white truncate font-display">
              {lang === 'hi' ? (currentSong.titleHi || currentSong.title) : currentSong.title}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 truncate">
              {lang === 'hi' ? (currentSong.artistHi || currentSong.artist) : currentSong.artist}
            </p>
            <span className="text-[10px] text-purple-400/80 mt-0.5 truncate">
              {currentSong.license}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Lyrics Toggle */}
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className={`p-2.5 rounded-full border transition-all ${
                showLyrics
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                  : 'bg-purple-950/60 border-purple-800/40 text-slate-300 hover:text-white'
              }`}
              title="गीत के बोल"
            >
              <FileText className="w-4 h-4" />
            </button>

            {/* Offline Download */}
            <button
              onClick={() => downloadSong(currentSong.id)}
              className={`p-2.5 rounded-full border transition-all ${
                isSongDownloaded
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                  : 'bg-purple-950/60 border-purple-800/40 text-slate-300 hover:text-white'
              }`}
              title="ऑफलाइन डाउनलोड"
            >
              {isSongDownloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            </button>

            {/* Like Favorite */}
            <button
              onClick={() => toggleLike(currentSong.id)}
              className="p-2.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-slate-300 hover:text-amber-400 transition-colors"
              title="पसंदीदा"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSongLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
                }`}
              />
            </button>

            {/* Context Menu for Current Track */}
            <div className="bg-purple-950/60 border border-purple-800/40 rounded-full flex items-center justify-center">
              <SongContextMenu song={currentSong} />
            </div>
          </div>
        </div>

        {/* Seek Bar & Timers */}
        <div className="w-full mt-3">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full h-1.5 bg-purple-950/90 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
          />
          <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono mt-1.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Primary Playback Controls */}
        <div className="w-full flex items-center justify-between mt-4 px-2">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors ${
              isShuffle ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="शफल"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          {/* Previous Track */}
          <button
            onClick={playPrevious}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-200 hover:text-white active:scale-90 transition-transform"
            title="पिछला गाना"
          >
            <SkipBack className="w-6 h-6 fill-slate-200" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-200 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-400/30 active:scale-90 transition-all hover:scale-105"
            title={isPlaying ? 'रोकें' : 'बजाएं'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-slate-950" />
            ) : (
              <Play className="w-7 h-7 fill-slate-950 ml-1" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={playNext}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-200 hover:text-white active:scale-90 transition-transform"
            title="अगला गाना"
          >
            <SkipForward className="w-6 h-6 fill-slate-200" />
          </button>

          {/* Repeat Mode */}
          <button
            onClick={cycleRepeat}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors ${
              repeatMode !== 'off' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="दोहराएं"
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="w-5 h-5" />
            ) : (
              <Repeat className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Bottom Options: Quality & Volume Slider */}
        <div className="w-full flex items-center justify-between mt-6 pt-3 border-t border-purple-900/30 text-xs text-slate-300">
          {/* Audio Quality Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowQualityMenu(!showQualityMenu)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950/80 border border-purple-700/40 text-[11px] font-semibold text-amber-300 hover:border-amber-400 transition-colors"
            >
              <Sliders className="w-3 h-3" />
              <span>{audioQuality === '320k' ? '320k HD' : audioQuality === '256k' ? '256k HQ' : '128k Standard'}</span>
            </button>

            {showQualityMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-36 bg-[#160f29] border border-purple-600/40 rounded-lg shadow-xl p-1 z-20">
                {(['320k', '256k', '128k'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setAudioQuality(q);
                      setShowQualityMenu(false);
                      showToast(`ऑडियो क्वालिटी: ${q === '320k' ? '320 kbps (Lossless HD)' : q === '256k' ? '256 kbps (HQ)' : '128 kbps (Standard)'}`);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                      audioQuality === q ? 'bg-purple-800 text-amber-300 font-bold' : 'text-slate-200 hover:bg-purple-900/50'
                    }`}
                  >
                    <span>{q === '320k' ? '320 kbps HD' : q === '256k' ? '256 kbps HQ' : '128 kbps'}</span>
                    {audioQuality === q && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volume Slider with Mute */}
          <div className="flex items-center gap-2 w-36">
            <button
              onClick={toggleMute}
              className="text-slate-400 hover:text-amber-400 transition-colors"
              title={isMuted ? 'अनम्यूट करें' : 'म्यूट करें'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-slate-300" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
