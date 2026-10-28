import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import {
  User,
  Crown,
  Sparkles,
  Settings,
  Headphones,
  Heart,
  Download,
  ShieldCheck,
  FileText,
  LogOut,
  Edit2,
  Check,
  Smartphone,
  Globe,
  Wallet,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    user,
    upiConfig,
    loginUser,
    logoutUser,
    setIsVipModalOpen,
    setIsInstructionsOpen,
    setIsLicenseModalOpen,
    audioQuality,
    setAudioQuality,
    lang,
    setLang,
    showToast,
  } = useMusic();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState(user.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(nameInput.trim(), emailInput.trim());
    setIsEditing(false);
  };

  return (
    <div className="space-y-5 pb-28 pt-2 px-4">
      {/* User Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#170e2b] via-[#1a1033] to-[#140b26] border border-purple-700/40 shadow-xl relative overflow-hidden">
        {/* VIP Glow badge in corner */}
        {user.isVip && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center gap-1 text-amber-300 text-xs font-bold shadow-md">
            <Crown className="w-3.5 h-3.5 fill-amber-400" />
            <span>VIP सदस्य</span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-amber-400/80 object-cover shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#170e2b]" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-black text-white truncate font-display">
              {user.name}
            </h2>
            <p className="text-xs text-slate-300 truncate">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                user.isVip ? 'bg-amber-400 text-slate-950' : 'bg-purple-900/60 text-purple-200'
              }`}>
                {user.isVip ? (lang === 'hi' ? 'वीआईपी प्रीमियम' : 'VIP Premium') : (lang === 'hi' ? 'फ्री प्लान' : 'Free Tier')}
              </span>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-[11px] text-amber-300 hover:underline flex items-center gap-0.5"
              >
                <Edit2 className="w-3 h-3" />
                <span>{lang === 'hi' ? 'बदलें' : 'Edit'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-4 pt-3 border-t border-purple-800/40 space-y-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="आपका नाम"
              className="w-full h-9 px-3 bg-[#0d071a] border border-purple-700/50 rounded-lg text-xs text-white"
            />
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="ईमेल पता"
              className="w-full h-9 px-3 bg-[#0d071a] border border-purple-700/50 rounded-lg text-xs text-white"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded text-xs text-slate-400 hover:text-white"
              >
                {lang === 'hi' ? 'रद्द' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-amber-400 text-slate-950 font-bold text-xs"
              >
                {lang === 'hi' ? 'सहेजें' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Listening Stats Summary */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 rounded-xl bg-[#120c24] border border-purple-900/30 text-center">
          <Headphones className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <span className="text-base font-extrabold text-white block">18.4</span>
          <span className="text-[10px] text-slate-400">{lang === 'hi' ? 'घंटे सुने' : 'Hours Streamed'}</span>
        </div>
        <div className="p-3 rounded-xl bg-[#120c24] border border-purple-900/30 text-center">
          <Heart className="w-5 h-5 text-rose-400 mx-auto mb-1" />
          <span className="text-base font-extrabold text-white block">{user.likedSongIds.length}</span>
          <span className="text-[10px] text-slate-400">{lang === 'hi' ? 'पसंदीदा गाने' : 'Liked Songs'}</span>
        </div>
        <div className="p-3 rounded-xl bg-[#120c24] border border-purple-900/30 text-center">
          <Download className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <span className="text-base font-extrabold text-white block">{user.downloadedSongIds.length}</span>
          <span className="text-[10px] text-slate-400">{lang === 'hi' ? 'ऑफलाइन गाने' : 'Downloaded'}</span>
        </div>
      </div>

      {/* VIP Membership Banner (if not VIP) */}
      {!user.isVip && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-[#120c24] border border-amber-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">
                {lang === 'hi' ? 'म्यूजिक इंडिया वीआईपी बनें' : 'Join Music India VIP'}
              </h3>
              <p className="text-[11px] text-amber-200/80">
                {lang === 'hi' ? 'विज्ञापन-मुक्त संगीत और 320 kbps HD ऑडियो' : 'Ad-free streaming & 320kbps HD audio'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVipModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0 shadow-md transition-all active:scale-95"
          >
            {lang === 'hi' ? '₹99 से शुरू' : 'From ₹99'}
          </button>
        </div>
      )}

      {/* App & Audio Preferences */}
      <div className="rounded-xl bg-[#120c24] border border-purple-900/30 divide-y divide-purple-900/20">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-purple-400" />
            <div>
              <span className="text-xs font-bold text-white block">
                {lang === 'hi' ? 'स्ट्रीमिंग ऑडियो क्वालिटी' : 'Audio Quality'}
              </span>
              <span className="text-[10px] text-slate-400">
                {audioQuality === '320k' ? '320 kbps (अल्ट्रा HD)' : audioQuality === '256k' ? '256 kbps (हाई)' : '128 kbps (मानक)'}
              </span>
            </div>
          </div>

          <div className="flex gap-1">
            {(['128k', '256k', '320k'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setAudioQuality(q)}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                  audioQuality === q
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-purple-950/60 text-slate-400 hover:text-white'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-white">
              {lang === 'hi' ? 'ऐप की मुख्य भाषा' : 'App Language'}
            </span>
          </div>

          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="px-2.5 py-1 rounded bg-purple-950/70 border border-purple-800/40 text-amber-300 text-xs font-bold"
          >
            {lang === 'hi' ? 'हिन्दी (Hindi)' : 'English'}
          </button>
        </div>

        <div
          onClick={() => setIsVipModalOpen(true)}
          className="p-3 flex items-center justify-between cursor-pointer hover:bg-purple-900/20 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Wallet className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-xs font-bold text-white block">
                {lang === 'hi' ? 'UPI पेमेंट गेटवे (Subscription Gateway)' : 'UPI Payment Gateway'}
              </span>
              <span className="text-[10px] text-amber-300 font-mono">
                {upiConfig.upiId} (म्यूजिक इंडिया VIP)
              </span>
            </div>
          </div>
          <span className="text-xs text-amber-400 font-semibold">{lang === 'hi' ? 'देखें' : 'View'} →</span>
        </div>

        <div
          onClick={() => setIsInstructionsOpen(true)}
          className="p-3 flex items-center justify-between cursor-pointer hover:bg-purple-900/20 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-xs font-bold text-white block">
                {lang === 'hi' ? 'एंड्रॉइड APK व टेस्टिंग निर्देश' : 'Android APK & Testing Guide'}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === 'hi' ? 'फोन में इंस्टॉल करने के तरीके' : 'Steps to test and install APK'}
              </span>
            </div>
          </div>
          <span className="text-xs text-amber-400">→</span>
        </div>

        <div
          onClick={() => setIsLicenseModalOpen(true)}
          className="p-3 flex items-center justify-between cursor-pointer hover:bg-purple-900/20 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-xs font-bold text-white block">
                {lang === 'hi' ? 'म्यूजिक लाइसेंस एवं नियम' : 'Music Licensing & Policy'}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === 'hi' ? 'रॉयल्टी-फ्री संगीत व अधिकृत API' : 'Authorized streaming guidelines'}
              </span>
            </div>
          </div>
          <span className="text-xs text-emerald-400">→</span>
        </div>
      </div>

      {/* Logout / Switch User */}
      <div className="flex justify-center pt-2">
        <button
          onClick={logoutUser}
          className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 px-4 py-2 rounded-lg bg-rose-950/20 border border-rose-900/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{lang === 'hi' ? 'खाता रीसेट / लॉग आउट करें' : 'Reset / Log Out'}</span>
        </button>
      </div>
    </div>
  );
};
