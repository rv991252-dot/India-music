import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import { Song, MusicLanguage, MusicGenre } from '../../types/music';
import { ShieldCheck, Plus, Trash2, X, Music, Lock, Unlock, Check, Wallet, QrCode, DollarSign, Copy, CheckCircle2 } from 'lucide-react';

export const AdminPanelModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    songs,
    addSongAdmin,
    deleteSongAdmin,
    upiConfig,
    updateUpiConfig,
    subscriptionTransactions,
    lang,
    showToast,
  } = useMusic();

  const [isAuthenticated, setIsAuthenticated] = useState(true); // Demo mode starts unlocked for easy review
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'add' | 'upi'>('catalog');
  const [newUpiId, setNewUpiId] = useState(upiConfig.upiId);
  const [newPayeeName, setNewPayeeName] = useState(upiConfig.payeeName);

  // Form fields
  const [title, setTitle] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [artist, setArtist] = useState('');
  const [artistHi, setArtistHi] = useState('');
  const [album, setAlbum] = useState('Desi Beats 2026');
  const [albumHi, setAlbumHi] = useState('देसी बीट्स २०२६');
  const [language, setLanguage] = useState<MusicLanguage>('hindi');
  const [genre, setGenre] = useState<MusicGenre>('bollywood');
  const [duration, setDuration] = useState('240');
  const [audioUrl, setAudioUrl] = useState('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  const [coverUrl, setCoverUrl] = useState('/src/assets/images/bollywood_beats_cover_1793157026789.jpg');
  const [license, setLicense] = useState('Creative Commons CC-BY 4.0 (Authorized)');
  const [lyrics, setLyrics] = useState('[00:15.00] नैनों में तेरा ही नूर...\n[00:30.00] सूफी से लम्हे, दिल मजबूर...');

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'admin') {
      setIsAuthenticated(true);
      showToast(lang === 'hi' ? 'एडमिन एक्सेस स्वीकृत!' : 'Admin access granted!');
    } else {
      showToast(lang === 'hi' ? 'गलत पासकोड (डेमो पासकोड: admin123)' : 'Incorrect passcode (demo: admin123)');
    }
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) {
      showToast(lang === 'hi' ? 'कृपया गाने का नाम और गायक भरें' : 'Please fill title and artist');
      return;
    }

    addSongAdmin({
      title: title.trim(),
      titleHi: titleHi.trim() || title.trim(),
      artist: artist.trim(),
      artistHi: artistHi.trim() || artist.trim(),
      album: album.trim() || 'Single',
      albumHi: albumHi.trim() || 'सिंगल',
      language,
      genre,
      duration: parseInt(duration, 10) || 200,
      audioUrl: audioUrl.trim(),
      coverUrl: coverUrl.trim(),
      license: license.trim(),
      lyrics: lyrics.trim(),
      isTrending: true,
      isNew: true,
      isPopular: true,
    });

    setTitle('');
    setTitleHi('');
    setArtist('');
    setArtistHi('');
    setActiveTab('catalog');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#120a22] border border-purple-600/50 rounded-2xl p-5 shadow-2xl text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-base sm:text-lg font-black font-display text-white">
                {lang === 'hi' ? 'म्यूजिक इंडिया - एडमिन पैनल' : 'Music India - Admin Dashboard'}
              </h2>
              <span className="text-[11px] text-purple-300">
                {lang === 'hi' ? 'अधिकृत संगीत एवं कैटलॉग प्रबंधन' : 'Authorized Music & Catalog Management'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate if locked */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="py-8 text-center max-w-xs mx-auto space-y-3">
            <Lock className="w-10 h-10 text-amber-400 mx-auto opacity-70" />
            <h3 className="text-sm font-bold text-slate-200">
              {lang === 'hi' ? 'सुरक्षित एडमिन पासकोड दर्ज करें' : 'Enter Admin Passcode'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'hi' ? 'डेमो पासकोड: admin123' : 'Demo passcode: admin123'}
            </p>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="admin123"
              className="w-full h-10 px-3 bg-[#0a0515] border border-purple-700 rounded-lg text-center text-sm text-white"
            />
            <button
              type="submit"
              className="w-full py-2 bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
            >
              {lang === 'hi' ? 'प्रवेश करें' : 'Unlock Dashboard'}
            </button>
          </form>
        ) : (
          <div className="flex-1 overflow-y-auto pt-3">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-4 border-b border-purple-900/40 pb-2">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'catalog'
                    ? 'bg-purple-800 text-amber-300 border border-purple-600'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'hi' ? `सभी गाने (${songs.length})` : `All Songs (${songs.length})`}
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'add'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{lang === 'hi' ? 'नया गाना जोड़ें' : 'Add New Song'}</span>
              </button>
              <button
                onClick={() => setActiveTab('upi')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'upi'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'UPI खाता व राजस्व' : 'UPI & Revenue'}</span>
              </button>
            </div>

            {/* Catalog Management Tab */}
            {activeTab === 'catalog' && (
              <div className="space-y-2">
                {songs.map((song) => (
                  <div
                    key={song.id}
                    className="p-2.5 rounded-xl bg-[#0c0618] border border-purple-900/30 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block truncate">
                          {song.titleHi} ({song.title})
                        </span>
                        <span className="text-[10px] text-slate-400 truncate block">
                          {song.artistHi} • {song.language} • {song.genre}
                        </span>
                        <span className="text-[9px] text-amber-400/90 truncate block">
                          {song.license}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-purple-300 font-mono">
                        {(song.plays).toLocaleString()} plays
                      </span>
                      <button
                        onClick={() => deleteSongAdmin(song.id)}
                        className="p-1.5 rounded text-rose-400 hover:bg-rose-950/40 transition-colors"
                        title="हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Song Form */}
            {activeTab === 'add' && (
              <form onSubmit={handleAddSong} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      {lang === 'hi' ? 'गाने का नाम (English):' : 'Song Title (English):'}
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Desi Sunset Melodies"
                      required
                      className="w-full h-9 px-3 bg-[#0a0515] border border-purple-800 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      {lang === 'hi' ? 'गाने का नाम (हिंदी):' : 'Song Title (Hindi):'}
                    </label>
                    <input
                      type="text"
                      value={titleHi}
                      onChange={(e) => setTitleHi(e.target.value)}
                      placeholder="उदा. देसी सनसेट मेलोडीज़"
                      className="w-full h-9 px-3 bg-[#0a0515] border border-purple-800 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      {lang === 'hi' ? 'गायक (English):' : 'Artist (English):'}
                    </label>
                    <input
                      type="text"
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      placeholder="e.g. Arjun & Soul Trio"
                      required
                      className="w-full h-9 px-3 bg-[#0a0515] border border-purple-800 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      {lang === 'hi' ? 'गायक (हिंदी):' : 'Artist (Hindi):'}
                    </label>
                    <input
                      type="text"
                      value={artistHi}
                      onChange={(e) => setArtistHi(e.target.value)}
                      placeholder="उदा. अर्जुन और सोल ट्रायो"
                      className="w-full h-9 px-3 bg-[#0a0515] border border-purple-800 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      {lang === 'hi' ? 'भाषा (Language):' : 'Language:'}
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as MusicLanguage)}
                      className="w-full h-9 px-2 bg-[#0a0515] border border-purple-800 rounded-lg text-xs text-white"
                    >
                      <option value="hindi">हिंदी (Hindi)</option>
                      <option value="punjabi">पंजाबी (Punjabi)</option>
                      <option value="tamil">तमिल (Tamil)</option>
                      <option value="telugu">तेलुगू (Telugu)</option>
                      <option value="english">इंग्लिश (English)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      {lang === 'hi' ? 'शैली (Genre):' : 'Genre:'}
                    </label>
                    <select
                      value={genre}
                      onChange={(e) => setGenre(e.target.value as MusicGenre)}
                      className="w-full h-9 px-2 bg-[#0a0515] border border-purple-800 rounded-lg text-xs text-white"
                    >
                      <option value="bollywood">बॉलीवुड (Bollywood)</option>
                      <option value="bhangra">भांगड़ा (Bhangra)</option>
                      <option value="sufi">सूफी (Sufi)</option>
                      <option value="classical">शास्त्रीय (Classical)</option>
                      <option value="romantic">रोमांटिक (Romantic)</option>
                      <option value="lofi">लो-फाई (Lo-Fi)</option>
                      <option value="indie">इंडी (Indie)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    {lang === 'hi' ? 'अधिकृत ऑडियो स्ट्रीम URL (MP3):' : 'Authorized Audio URL:'}
                  </label>
                  <input
                    type="url"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    required
                    className="w-full h-9 px-3 bg-[#0a0515] border border-purple-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    {lang === 'hi' ? 'लाइसेंस प्रमाणन:' : 'License Proof / Certification:'}
                  </label>
                  <input
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    className="w-full h-9 px-3 bg-[#0a0515] border border-purple-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    {lang === 'hi' ? 'गाने के बोल (Lyrics):' : 'Song Lyrics:'}
                  </label>
                  <textarea
                    rows={3}
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    className="w-full p-2 bg-[#0a0515] border border-purple-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('catalog')}
                    className="px-4 py-2 rounded-lg text-xs text-slate-300 hover:text-white"
                  >
                    {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                  >
                    {lang === 'hi' ? 'कैटलॉग में प्रकाशित करें' : 'Publish to Catalog'}
                  </button>
                </div>
              </form>
            )}

            {/* UPI & Subscriptions Revenue Tab */}
            {activeTab === 'upi' && (
              <div className="space-y-4">
                {/* Revenue Overview Stats */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#0c0618] border border-purple-900/40 text-center">
                    <span className="text-[10px] text-slate-400 block">{lang === 'hi' ? 'कुल प्राप्त राशि' : 'Total Collected'}</span>
                    <span className="text-lg font-black text-amber-300 font-display">
                      ₹{subscriptionTransactions.reduce((acc, t) => acc + t.amount, 0)}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0c0618] border border-purple-900/40 text-center">
                    <span className="text-[10px] text-slate-400 block">{lang === 'hi' ? 'सक्रिय VIP सदस्य' : 'Active Subscribers'}</span>
                    <span className="text-lg font-black text-emerald-400 font-display">
                      {subscriptionTransactions.length}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0c0618] border border-purple-900/40 text-center">
                    <span className="text-[10px] text-slate-400 block">{lang === 'hi' ? 'भुगतान माध्यम' : 'Gateway'}</span>
                    <span className="text-xs font-bold text-white block mt-1">100% Direct UPI</span>
                  </div>
                </div>

                {/* Receiver UPI Configuration Form */}
                <div className="p-4 rounded-xl bg-[#0c0618] border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Wallet className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'आपका मर्चेंट UPI खाता (Receiving UPI Account):' : 'Receiving UPI Account:'}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      {lang === 'hi' ? 'सक्रिय (Live)' : 'Live Active'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300">
                    {lang === 'hi'
                      ? 'कोई भी उपयोगकर्ता VIP सब्सक्रिप्शन खरीदेगा तो पैसे सीधे नीचे दी गई UPI ID वाले बैंक खाते में प्राप्त होंगे:'
                      : 'All VIP subscription payments from users are directly routed to this UPI ID:'}
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateUpiConfig(newUpiId, newPayeeName);
                    }}
                    className="space-y-2.5"
                  >
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                        {lang === 'hi' ? 'प्राप्तकर्ता UPI आईडी (Recipient UPI ID):' : 'UPI ID:'}
                      </label>
                      <input
                        type="text"
                        value={newUpiId}
                        onChange={(e) => setNewUpiId(e.target.value)}
                        required
                        placeholder="6398028792@pthdfc"
                        className="w-full h-9 px-3 bg-[#150a29] border border-amber-500/60 rounded-lg text-xs font-mono text-amber-300 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                        {lang === 'hi' ? 'प्राप्तकर्ता का नाम (Payee Name):' : 'Payee Name:'}
                      </label>
                      <input
                        type="text"
                        value={newPayeeName}
                        onChange={(e) => setNewPayeeName(e.target.value)}
                        placeholder="Music India"
                        className="w-full h-9 px-3 bg-[#150a29] border border-purple-800 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md"
                      >
                        {lang === 'hi' ? 'UPI सेटिंग्स सहेजें' : 'Save UPI Settings'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Subscriptions & Transactions List */}
                <div>
                  <span className="text-xs font-bold text-white block mb-2">
                    {lang === 'hi' ? `प्राप्त सदस्यता भुगतान (${subscriptionTransactions.length}):` : 'Received Subscription Payments:'}
                  </span>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {subscriptionTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="p-2.5 rounded-xl bg-[#0c0618] border border-purple-900/30 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{tx.userName}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-200">
                              {tx.planName}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {tx.userEmail} • {tx.date}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                            UTR: <strong className="text-emerald-400">{tx.utr}</strong> • UPI: {tx.upiId}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-black text-amber-300 font-display">
                            +₹{tx.amount}
                          </span>
                          <span className="text-[9px] text-emerald-400 block font-semibold">
                            ✓ {lang === 'hi' ? 'खाते में क्रेडिट' : 'Credited'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
