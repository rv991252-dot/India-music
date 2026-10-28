import React, { useState, useEffect } from 'react';
import { useMusic } from '../context/MusicContext';
import { Crown, Sparkles, Smartphone, Monitor, ShieldCheck, FileText, Globe } from 'lucide-react';

export const AndroidStatusHeader: React.FC = () => {
  const {
    lang,
    setLang,
    isAndroidFrame,
    setIsAndroidFrame,
    user,
    setIsVipModalOpen,
    setIsAdminOpen,
    setIsInstructionsOpen,
    setIsLicenseModalOpen,
  } = useMusic();

  const [currentTimeStr, setCurrentTimeStr] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#0a0814]/95 backdrop-blur-md border-b border-purple-900/30 sticky top-0 z-40 transition-all">
      {/* Android Native Status Bar (Simulated) */}
      <div className="flex items-center justify-between px-4 pt-1.5 pb-1 text-[11px] font-medium text-slate-400 select-none">
        <span className="font-semibold text-slate-300 tracking-tight">{currentTimeStr}</span>
        
        {/* Android Punch Hole / Speaker Notch (visible in frame mode) */}
        {isAndroidFrame && (
          <div className="w-3.5 h-3.5 rounded-full bg-black border border-purple-950 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-widest text-amber-400 font-bold">5G</span>
          {/* Signal bars SVG */}
          <svg className="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="16" width="3" height="6" rx="1" />
            <rect x="7" y="12" width="3" height="10" rx="1" />
            <rect x="12" y="8" width="3" height="14" rx="1" />
            <rect x="17" y="4" width="3" height="18" rx="1" />
          </svg>
          {/* Battery SVG */}
          <div className="flex items-center gap-0.5">
            <span className="text-[10px]">98%</span>
            <div className="w-4 h-2.5 border border-slate-400 rounded-sm p-[1px] flex items-center">
              <div className="h-full w-3 bg-amber-400 rounded-2xs"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary App Bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-700 via-amber-500 to-amber-300 p-0.5 shadow-md shadow-purple-950/60 flex items-center justify-center">
            <div className="w-full h-full bg-[#0d091a] rounded-[6px] flex items-center justify-center">
              <span className="text-amber-400 text-sm font-black font-display tracking-wider">MI</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                Music India
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/60 border border-purple-500/30 text-purple-300 font-medium">
                म्यूजिक इंडिया
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* VIP Upgrade Button */}
          {user.isVip ? (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>VIP</span>
            </div>
          ) : (
            <button
              onClick={() => setIsVipModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all"
              title="म्यूजिक इंडिया वीआईपी प्लान देखें"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>VIP</span>
            </button>
          )}

          {/* Hindi / English Language toggle */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/40 text-slate-200 text-xs font-medium active:scale-95 transition-colors"
            title="भाषा बदलें / Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'hi' ? 'EN' : 'हिन्दी'}</span>
          </button>

          {/* Android Testing & APK Instructions Guide */}
          <button
            onClick={() => setIsInstructionsOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/40 text-amber-300 text-xs font-medium active:scale-95 transition-colors"
            title="एंड्रॉइड निर्देश एवं APK गाइड"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'hi' ? 'APK निर्देश' : 'APK Guide'}</span>
          </button>

          {/* Admin Panel Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-1.5 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="एडमिन पैनल (Admin Management)"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </button>

          {/* Android Mobile Frame toggle */}
          <button
            onClick={() => setIsAndroidFrame(!isAndroidFrame)}
            className={`p-1.5 rounded-md border transition-colors ${
              isAndroidFrame
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={isAndroidFrame ? 'फुल-स्क्रीन व्यू' : 'एंड्रॉइड फोन फ्रेम व्यू'}
          >
            {isAndroidFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
