import React from 'react';
import { useMusic } from '../context/MusicContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useMusic();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300">
      <div className="px-4 py-2 rounded-full bg-[#1e1338]/95 border border-amber-400/60 shadow-2xl shadow-purple-950/80 text-white text-xs font-semibold flex items-center gap-2 backdrop-blur-md animate-in fade-in slide-in-from-top-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="truncate max-w-[280px]">{toastMessage}</span>
      </div>
    </div>
  );
};
