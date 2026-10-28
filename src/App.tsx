import React from 'react';
import { MusicProvider, useMusic } from './context/MusicContext';
import { AndroidStatusHeader } from './components/AndroidStatusHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { MiniPlayer } from './components/MiniPlayer';
import { FullPlayerModal } from './components/FullPlayerModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { LibraryScreen } from './components/screens/LibraryScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { VipSubscriptionModal } from './components/modals/VipSubscriptionModal';
import { AdminPanelModal } from './components/modals/AdminPanelModal';
import { AndroidInstructionsModal } from './components/modals/AndroidInstructionsModal';
import { LicenseInfoModal } from './components/modals/LicenseInfoModal';
import { PlaylistDetailModal } from './components/modals/PlaylistDetailModal';
import { ArtistDetailModal } from './components/modals/ArtistDetailModal';
import { QueueDrawerModal } from './components/modals/QueueDrawerModal';
import { AddToPlaylistModal } from './components/modals/AddToPlaylistModal';
import { Toast } from './components/Toast';

const MainLayout: React.FC = () => {
  const { currentTab, isAndroidFrame } = useMusic();

  const renderScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  if (isAndroidFrame) {
    return (
      <div className="min-h-screen bg-[#05030a] flex items-center justify-center p-2 sm:p-6 overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
        {/* Realistic Android Smartphone Device Frame */}
        <div className="relative w-full max-w-[420px] h-[860px] max-h-[94vh] bg-[#080512] border-[10px] border-[#22163b] rounded-[48px] shadow-[0_0_60px_rgba(124,58,237,0.35)] flex flex-col overflow-hidden ring-1 ring-purple-500/40">
          {/* Top Speaker Earphone Slot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-slate-800 z-50 pointer-events-none" />

          {/* Device Screen Area */}
          <div className="flex-1 flex flex-col overflow-y-auto relative bg-[#080512]">
            <AndroidStatusHeader />
            <main className="flex-1 overflow-y-auto">
              {renderScreen()}
            </main>
            <MiniPlayer />
            <BottomNavBar />
          </div>

          {/* Android Gesture Bar Pill */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-slate-500/60 z-50 pointer-events-none" />
        </div>

        {/* Global Modals & Toast */}
        <FullPlayerModal />
        <VipSubscriptionModal />
        <AdminPanelModal />
        <AndroidInstructionsModal />
        <LicenseInfoModal />
        <PlaylistDetailModal />
        <ArtistDetailModal />
        <QueueDrawerModal />
        <AddToPlaylistModal />
        <Toast />
      </div>
    );
  }

  // Fluid Full View (Mobile-First responsive canvas)
  return (
    <div className="min-h-screen bg-[#080512] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      <div className="w-full max-w-2xl mx-auto min-h-screen flex flex-col bg-[#080512] border-x border-purple-950/40 relative shadow-2xl shadow-purple-950/30">
        <AndroidStatusHeader />
        <main className="flex-1 overflow-y-auto">
          {renderScreen()}
        </main>
        <MiniPlayer />
        <BottomNavBar />
      </div>

      {/* Global Modals & Toast */}
      <FullPlayerModal />
      <VipSubscriptionModal />
      <AdminPanelModal />
      <AndroidInstructionsModal />
      <LicenseInfoModal />
      <PlaylistDetailModal />
      <ArtistDetailModal />
      <QueueDrawerModal />
      <AddToPlaylistModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <MusicProvider>
      <MainLayout />
    </MusicProvider>
  );
}
