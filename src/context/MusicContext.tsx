import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Song, Playlist, Artist, UserProfile, RepeatMode, AudioQuality, MusicLanguage, UpiConfig, SubscriptionPayment } from '../types/music';
import { INITIAL_SONGS, INITIAL_PLAYLISTS, INITIAL_ARTISTS } from '../data/musicCatalog';
import { audioEngine } from '../services/audioEngine';

interface MusicContextType {
  // Navigation & View
  currentTab: 'home' | 'search' | 'library' | 'favorites' | 'profile';
  setCurrentTab: (tab: 'home' | 'search' | 'library' | 'favorites' | 'profile') => void;
  lang: 'hi' | 'en';
  setLang: (lang: 'hi' | 'en') => void;
  isAndroidFrame: boolean;
  setIsAndroidFrame: (frame: boolean) => void;

  // Music State
  songs: Song[];
  playlists: Playlist[];
  artists: Artist[];
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  audioQuality: AudioQuality;
  isFullPlayerOpen: boolean;
  setIsFullPlayerOpen: (open: boolean) => void;
  showLyrics: boolean;
  setShowLyrics: (show: boolean) => void;

  // Queue & Listening Sequence
  queue: Song[];
  playNextInQueue: (song: Song) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  isQueueOpen: boolean;
  setIsQueueOpen: (open: boolean) => void;
  selectedSongForPlaylist: Song | null;
  setSelectedSongForPlaylist: (song: Song | null) => void;

  // Playback Actions
  playSong: (song: Song, queueList?: Song[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setAudioQuality: (q: AudioQuality) => void;

  // UPI & Subscription Payments
  upiConfig: UpiConfig;
  updateUpiConfig: (newUpi: string, newName?: string) => void;
  subscriptionTransactions: SubscriptionPayment[];
  confirmSubscriptionPayment: (planId: string, planName: string, amount: number, utr: string) => void;

  // User & Library Actions
  user: UserProfile;
  toggleLike: (songId: string) => void;
  isLiked: (songId: string) => boolean;
  createPlaylist: (title: string, description?: string) => Playlist;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  downloadSong: (songId: string) => void;
  isDownloaded: (songId: string) => boolean;
  upgradeToVip: (planName: string) => void;
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;

  // Admin & Modals
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isVipModalOpen: boolean;
  setIsVipModalOpen: (open: boolean) => void;
  isInstructionsOpen: boolean;
  setIsInstructionsOpen: (open: boolean) => void;
  isLicenseModalOpen: boolean;
  setIsLicenseModalOpen: (open: boolean) => void;
  addSongAdmin: (song: Omit<Song, 'id' | 'plays'>) => void;
  deleteSongAdmin: (songId: string) => void;
  selectedPlaylistForDetail: Playlist | null;
  setSelectedPlaylistForDetail: (pl: Playlist | null) => void;
  selectedArtistForDetail: Artist | null;
  setSelectedArtistForDetail: (art: Artist | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'music_india_user_v1';
const STORAGE_KEY_SONGS = 'music_india_songs_v1';
const STORAGE_KEY_PLAYLISTS = 'music_india_playlists_v1';
const STORAGE_KEY_UPI = 'music_india_upi_v1';
const STORAGE_KEY_TRANSACTIONS = 'music_india_transactions_v1';

export const DEFAULT_UPI_CONFIG: UpiConfig = {
  upiId: '6398028792@pthdfc',
  payeeName: 'Music India',
  merchantCode: 'MUSICINDIA',
};

const DEFAULT_USER: UserProfile = {
  id: 'user-demo-1',
  name: 'रोहित वर्मा (Rohit Verma)',
  email: 'rohit@musicindia.in',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  isVip: false,
  likedSongIds: ['song-1', 'song-4'],
  playlists: [],
  recentlyPlayed: [
    { songId: 'song-1', playedAt: Date.now() - 1000 * 60 * 15 },
    { songId: 'song-2', playedAt: Date.now() - 1000 * 60 * 45 }
  ],
  downloadedSongIds: ['song-1']
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<'home' | 'search' | 'library' | 'favorites' | 'profile'>('home');
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [isAndroidFrame, setIsAndroidFrame] = useState(false);

  // Music Catalog
  const [songs, setSongs] = useState<Song[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_SONGS);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_SONGS;
  });

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_PLAYLISTS);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_PLAYLISTS;
  });

  const [artists] = useState<Artist[]>(INITIAL_ARTISTS);

  // Playback state
  const [currentSong, setCurrentSong] = useState<Song | null>(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(INITIAL_SONGS[0].duration);
  const [buffered, setBuffered] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('all');
  const [audioQuality, setAudioQuality] = useState<AudioQuality>('320k');
  const [queue, setQueue] = useState<Song[]>(INITIAL_SONGS);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState<Song | null>(null);

  // Selected Detail views
  const [selectedPlaylistForDetail, setSelectedPlaylistForDetail] = useState<Playlist | null>(null);
  const [selectedArtistForDetail, setSelectedArtistForDetail] = useState<Artist | null>(null);

  // Modals
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  // Queue & Listening Sequence Actions
  const playNextInQueue = useCallback((song: Song) => {
    if (!currentSong) {
      playSong(song, [song]);
      showToast(lang === 'hi' ? `"${song.titleHi || song.title}" बज रहा है` : `Playing "${song.title}"`);
      return;
    }

    setQueue((prevQueue) => {
      const currentIdx = prevQueue.findIndex((s) => s.id === currentSong.id);
      const insertAt = currentIdx >= 0 ? currentIdx + 1 : 1;
      const nextQueue = [...prevQueue];
      nextQueue.splice(insertAt, 0, song);
      return nextQueue;
    });

    showToast(
      lang === 'hi'
        ? `⏭️ "${song.titleHi || song.title}" इसके बाद बजेगा (Play Next)`
        : `⏭️ "${song.title}" will play next`
    );
  }, [currentSong, lang, showToast]);

  const addToQueue = useCallback((song: Song) => {
    if (!currentSong) {
      playSong(song, [song]);
      showToast(lang === 'hi' ? `"${song.titleHi || song.title}" बज रहा है` : `Playing "${song.title}"`);
      return;
    }

    setQueue((prevQueue) => [...prevQueue, song]);

    showToast(
      lang === 'hi'
        ? `➕ "${song.titleHi || song.title}" कतार में जोड़ा गया (Added to Queue)`
        : `➕ "${song.title}" added to queue`
    );
  }, [currentSong, lang, showToast]);

  const removeFromQueue = useCallback((index: number) => {
    setQueue((prevQueue) => prevQueue.filter((_, idx) => idx !== index));
    showToast(lang === 'hi' ? 'गाने को कतार से हटाया गया' : 'Removed from queue');
  }, [lang, showToast]);

  const clearQueue = useCallback(() => {
    setQueue(currentSong ? [currentSong] : []);
    showToast(lang === 'hi' ? 'कतार खाली कर दी गई' : 'Queue cleared');
  }, [currentSong, lang, showToast]);

  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return DEFAULT_USER;
  });

  // UPI Configuration & Transactions state
  const [upiConfig, setUpiConfig] = useState<UpiConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_UPI);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return DEFAULT_UPI_CONFIG;
  });

  const [subscriptionTransactions, setSubscriptionTransactions] = useState<SubscriptionPayment[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    }
    return [
      {
        id: 'tx-sample-1',
        userName: 'अमित कुमार (Amit)',
        userEmail: 'amit.k@gmail.com',
        planId: 'individual',
        planName: 'इंडिविजुअल (₹99)',
        amount: 99,
        upiId: '6398028792@pthdfc',
        utr: '429812984512',
        date: '2026-10-25 14:32',
        status: 'verified',
      }
    ];
  });

  // Save state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_UPI, JSON.stringify(upiConfig));
  }, [upiConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(subscriptionTransactions));
  }, [subscriptionTransactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SONGS, JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PLAYLISTS, JSON.stringify(playlists));
  }, [playlists]);

  // Audio Engine Subscription
  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentTime(state.currentTime);
      if (state.duration > 0) setDuration(state.duration);
      setBuffered(state.buffered);
      if (state.song) setCurrentSong(state.song);
    });
    return () => unsubscribe();
  }, []);

  // Track auto-ended handling
  const playNext = useCallback(() => {
    if (!currentSong || queue.length === 0) return;

    if (repeatMode === 'one') {
      audioEngine.seek(0);
      audioEngine.togglePlay();
      return;
    }

    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
    let nextIndex = currentIndex + 1;

    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    const nextSong = queue[nextIndex] || queue[0];
    if (nextSong) {
      audioEngine.playSong(nextSong);
      setCurrentSong(nextSong);
      // update recently played
      setUser((prev) => ({
        ...prev,
        recentlyPlayed: [
          { songId: nextSong.id, playedAt: Date.now() },
          ...prev.recentlyPlayed.filter((item) => item.songId !== nextSong.id).slice(0, 20),
        ],
      }));
    }
  }, [currentSong, queue, isShuffle, repeatMode]);

  useEffect(() => {
    audioEngine.onEnded(playNext);
  }, [playNext]);

  const playPrevious = useCallback(() => {
    if (!currentSong || queue.length === 0) return;

    if (currentTime > 3) {
      audioEngine.seek(0);
      return;
    }

    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
    const prevIndex = currentIndex <= 0 ? queue.length - 1 : currentIndex - 1;
    const prevSong = queue[prevIndex];
    if (prevSong) {
      audioEngine.playSong(prevSong);
      setCurrentSong(prevSong);
    }
  }, [currentSong, queue, currentTime]);

  const playSong = useCallback((song: Song, queueList?: Song[]) => {
    if (queueList && queueList.length > 0) {
      setQueue(queueList);
    }
    audioEngine.playSong(song);
    setCurrentSong(song);

    // Track recently played
    setUser((prev) => ({
      ...prev,
      recentlyPlayed: [
        { songId: song.id, playedAt: Date.now() },
        ...prev.recentlyPlayed.filter((item) => item.songId !== song.id).slice(0, 25),
      ],
    }));

    // Increment play count
    setSongs((prev) =>
      prev.map((s) => (s.id === song.id ? { ...s, plays: s.plays + 1 } : s))
    );
  }, []);

  const togglePlay = useCallback(() => {
    if (!currentSong && songs.length > 0) {
      playSong(songs[0]);
      return;
    }
    audioEngine.togglePlay();
  }, [currentSong, songs, playSong]);

  const seek = useCallback((seconds: number) => {
    audioEngine.seek(seconds);
  }, []);

  const setVolume = useCallback((val: number) => {
    setVolumeState(val);
    audioEngine.setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  }, [isMuted, volume]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => {
      const next = !prev;
      showToast(next ? (lang === 'hi' ? 'शफल चालू (Shuffle ON)' : 'Shuffle ON') : (lang === 'hi' ? 'शफल बंद (Shuffle OFF)' : 'Shuffle OFF'));
      return next;
    });
  }, [lang, showToast]);

  const cycleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      let next: RepeatMode = 'all';
      if (prev === 'all') next = 'one';
      else if (prev === 'one') next = 'off';
      else next = 'all';

      const label = next === 'all' ? (lang === 'hi' ? 'सभी दोहराएं' : 'Repeat All') : next === 'one' ? (lang === 'hi' ? 'एक गाना दोहराएं' : 'Repeat Current') : (lang === 'hi' ? 'दोहराना बंद' : 'Repeat Off');
      showToast(label);
      return next;
    });
  }, [lang, showToast]);

  // User Actions
  const toggleLike = useCallback((songId: string) => {
    setUser((prev) => {
      const exists = prev.likedSongIds.includes(songId);
      const updated = exists
        ? prev.likedSongIds.filter((id) => id !== songId)
        : [...prev.likedSongIds, songId];

      showToast(exists ? (lang === 'hi' ? 'पसंदीदा से हटाया गया' : 'Removed from Favorites') : (lang === 'hi' ? '❤️ पसंदीदा गानों में जोड़ा गया' : '❤️ Added to Favorites'));
      return { ...prev, likedSongIds: updated };
    });
  }, [lang, showToast]);

  const isLiked = useCallback((songId: string) => {
    return user.likedSongIds.includes(songId);
  }, [user.likedSongIds]);

  const createPlaylist = useCallback((title: string, description?: string) => {
    const newPl: Playlist = {
      id: `pl-user-${Date.now()}`,
      title,
      titleHi: title,
      description: description || 'User custom playlist',
      descriptionHi: description || 'यूज़र प्लेलिस्ट',
      coverUrl: INITIAL_SONGS[0].coverUrl,
      songs: [],
      isSystem: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPlaylists((prev) => [newPl, ...prev]);
    showToast(lang === 'hi' ? `प्लेलिस्ट "${title}" बनाई गई!` : `Playlist "${title}" created!`);
    return newPl;
  }, [lang, showToast]);

  const addSongToPlaylist = useCallback((playlistId: string, song: Song) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          if (pl.songs.some((s) => s.id === song.id)) {
            showToast(lang === 'hi' ? 'गाना पहले से प्लेलिस्ट में है' : 'Song already in playlist');
            return pl;
          }
          showToast(lang === 'hi' ? `"${pl.title}" में गाना जोड़ा गया!` : `Added to "${pl.title}"!`);
          return { ...pl, songs: [...pl.songs, song] };
        }
        return pl;
      })
    );
  }, [lang, showToast]);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          return { ...pl, songs: pl.songs.filter((s) => s.id !== songId) };
        }
        return pl;
      })
    );
    showToast(lang === 'hi' ? 'गाना हटाया गया' : 'Song removed');
  }, [lang, showToast]);

  const downloadSong = useCallback((songId: string) => {
    setUser((prev) => {
      const exists = prev.downloadedSongIds.includes(songId);
      if (exists) {
        showToast(lang === 'hi' ? 'गाना ऑफलाइन स्टोरेज से हटाया गया' : 'Removed from offline storage');
        return {
          ...prev,
          downloadedSongIds: prev.downloadedSongIds.filter((id) => id !== songId),
        };
      } else {
        showToast(lang === 'hi' ? '✓ गाना ऑफलाइन डाउनलोड हो गया!' : '✓ Song downloaded offline!');
        return {
          ...prev,
          downloadedSongIds: [...prev.downloadedSongIds, songId],
        };
      }
    });
  }, [lang, showToast]);

  const isDownloaded = useCallback((songId: string) => {
    return user.downloadedSongIds.includes(songId);
  }, [user.downloadedSongIds]);

  const updateUpiConfig = useCallback((newUpi: string, newName?: string) => {
    setUpiConfig((prev) => ({
      ...prev,
      upiId: newUpi.trim(),
      payeeName: newName ? newName.trim() : prev.payeeName,
    }));
    showToast(lang === 'hi' ? `UPI आईडी अपडेट हुई: ${newUpi}` : `UPI ID updated to ${newUpi}`);
  }, [lang, showToast]);

  const confirmSubscriptionPayment = useCallback((planId: string, planName: string, amount: number, utr: string) => {
    const newTx: SubscriptionPayment = {
      id: `tx-${Date.now()}`,
      userName: user.name,
      userEmail: user.email,
      planId,
      planName,
      amount,
      upiId: upiConfig.upiId,
      utr: utr.trim(),
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'verified',
    };

    setSubscriptionTransactions((prev) => [newTx, ...prev]);

    setUser((prev) => ({
      ...prev,
      isVip: true,
      vipExpiry: '2027-12-31',
    }));

    showToast(lang === 'hi' ? `🎉 भुगतान सफल! म्यूजिक इंडिया VIP सक्रिय हो गया!` : `🎉 Payment verified! Music India VIP is now active!`);
  }, [user.name, user.email, upiConfig.upiId, lang, showToast]);

  const upgradeToVip = useCallback((planName: string) => {
    setUser((prev) => ({
      ...prev,
      isVip: true,
      vipExpiry: '2027-12-31',
    }));
    setIsVipModalOpen(false);
    showToast(lang === 'hi' ? `बधाई हो! आप म्यूजिक इंडिया वीआईपी (${planName}) सदस्य बन गए!` : `Congratulations! You are now a Music India VIP (${planName}) member!`);
  }, [lang, showToast]);

  const loginUser = useCallback((name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}`,
    }));
    showToast(lang === 'hi' ? `स्वागत है, ${name}!` : `Welcome, ${name}!`);
  }, [lang, showToast]);

  const logoutUser = useCallback(() => {
    setUser(DEFAULT_USER);
    showToast(lang === 'hi' ? 'सफलतापूर्वक लॉग आउट हो गया' : 'Logged out successfully');
  }, [lang, showToast]);

  // Admin Actions
  const addSongAdmin = useCallback((songData: Omit<Song, 'id' | 'plays'>) => {
    const newSong: Song = {
      ...songData,
      id: `song-${Date.now()}`,
      plays: 120,
    };
    setSongs((prev) => [newSong, ...prev]);
    showToast(lang === 'hi' ? `नया गाना "${newSong.titleHi}" सफलतापूर्वक जोड़ा गया!` : `New song "${newSong.title}" added successfully!`);
  }, [lang, showToast]);

  const deleteSongAdmin = useCallback((songId: string) => {
    setSongs((prev) => prev.filter((s) => s.id !== songId));
    showToast(lang === 'hi' ? 'गाना कैटलॉग से हटाया गया' : 'Song removed from catalog');
  }, [lang, showToast]);

  return (
    <MusicContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        lang,
        setLang,
        isAndroidFrame,
        setIsAndroidFrame,
        songs,
        playlists,
        artists,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        buffered,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        audioQuality,
        isFullPlayerOpen,
        setIsFullPlayerOpen,
        showLyrics,
        setShowLyrics,
        queue,
        playNextInQueue,
        addToQueue,
        removeFromQueue,
        clearQueue,
        isQueueOpen,
        setIsQueueOpen,
        selectedSongForPlaylist,
        setSelectedSongForPlaylist,
        playSong,
        togglePlay,
        playNext,
        playPrevious,
        seek,
        setVolume,
        toggleMute,
        toggleShuffle,
        cycleRepeat,
        setAudioQuality,
        user,
        upiConfig,
        updateUpiConfig,
        subscriptionTransactions,
        confirmSubscriptionPayment,
        toggleLike,
        isLiked,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        downloadSong,
        isDownloaded,
        upgradeToVip,
        loginUser,
        logoutUser,
        isAdminOpen,
        setIsAdminOpen,
        isVipModalOpen,
        setIsVipModalOpen,
        isInstructionsOpen,
        setIsInstructionsOpen,
        isLicenseModalOpen,
        setIsLicenseModalOpen,
        addSongAdmin,
        deleteSongAdmin,
        selectedPlaylistForDetail,
        setSelectedPlaylistForDetail,
        selectedArtistForDetail,
        setSelectedArtistForDetail,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
