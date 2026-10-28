import React from 'react';
import { useMusic } from '../context/MusicContext';
import { Home, Search, Library, Heart, User } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { currentTab, setCurrentTab, lang, user } = useMusic();

  const navItems = [
    {
      id: 'home' as const,
      labelHi: 'होम',
      labelEn: 'Home',
      icon: Home,
    },
    {
      id: 'search' as const,
      labelHi: 'खोजें',
      labelEn: 'Search',
      icon: Search,
    },
    {
      id: 'library' as const,
      labelHi: 'लाइब्रेरी',
      labelEn: 'Library',
      icon: Library,
    },
    {
      id: 'favorites' as const,
      labelHi: 'पसंदीदा',
      labelEn: 'Favorites',
      icon: Heart,
      badge: user.likedSongIds.length > 0 ? user.likedSongIds.length : null,
    },
    {
      id: 'profile' as const,
      labelHi: 'प्रोफ़ाइल',
      labelEn: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0a18]/95 backdrop-blur-xl border-t border-purple-900/40 select-none pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-2">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const IconComponent = item.icon;
          const label = lang === 'hi' ? item.labelHi : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center relative transition-all active:scale-95 ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <IconComponent
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.5px] text-amber-400' : 'stroke-[1.8px]'
                  }`}
                />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center border border-[#0d0a18]">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 leading-none">
                {label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1 rounded-full bg-amber-400 mt-0.5 shadow-sm shadow-amber-400"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
