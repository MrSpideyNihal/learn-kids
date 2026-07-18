import React from 'react';
import { GuessIcon, MatchIcon, StudioIcon, LeaderboardIcon, CoinIcon, SoundOnIcon, SoundOffIcon, MusicOnIcon, MusicOffIcon } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  coins: number;
  sfxMuted: boolean;
  setSfxMuted: (muted: boolean) => void;
  musicMuted: boolean;
  setMusicMuted: (muted: boolean) => void;
  playerName?: string;
  avatarUrl?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  coins,
  sfxMuted,
  setSfxMuted,
  musicMuted,
  setMusicMuted,
  playerName,
  avatarUrl
}) => {
  const tabs = [
    { id: 'guess', label: 'Guess', icon: <GuessIcon size={28} /> },
    { id: 'match', label: 'Match', icon: <MatchIcon size={28} /> },
    { id: 'studio', label: 'Studio', icon: <StudioIcon size={28} /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <LeaderboardIcon size={28} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFFDF5]">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r-4 border-black p-6 shrink-0 shadow-[4px_0_0_0_rgba(0,0,0,1)]">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-center border-b-4 border-black pb-4 select-none">
            WILD <span className="text-[#FF6B6B]">GUESS</span> & <span className="text-[#4EAD5B]">MATCH</span>
          </h1>
        </div>

        <nav className="flex flex-col gap-4 flex-grow">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`neo-btn w-full p-4 flex items-center gap-3 text-lg font-bold transition-all text-left ${
                  isActive
                    ? 'bg-[#FFDE4D] translate-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white hover:bg-[#FFFDF5]'
                }`}
                aria-label={`Go to ${tab.label}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {playerName && (
          <div className="mt-auto border-t-4 border-black pt-4 flex items-center gap-3">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-black bg-[#FFFDF5]"
              />
            )}
            <div className="font-bold truncate max-w-[150px]">{playerName}</div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b-4 border-black px-4 py-3 flex items-center justify-between shadow-[0_4px_0_0_rgba(0,0,0,1)] z-10 sticky top-0">
          <div className="md:hidden font-black text-xl tracking-tight select-none">
            WILD <span className="text-[#FF6B6B]">GUESS</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            {/* Coins Counter */}
            <div className="neo-box bg-[#FFDE4D] px-3 py-1.5 flex items-center gap-2 font-black text-lg select-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] border-2">
              <CoinIcon size={24} className="animate-bounce" />
              <span>{coins}</span>
            </div>

            {/* Mute SFX Toggle */}
            <button
              onClick={() => setSfxMuted(!sfxMuted)}
              className="neo-btn p-2 bg-[#38BDF8] hover:bg-[#7dd3fc] text-white flex items-center justify-center tap-target shadow-[2px_2px_0_0_rgba(0,0,0,1)] border-2"
              aria-label={sfxMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {sfxMuted ? <SoundOffIcon size={24} /> : <SoundOnIcon size={24} />}
            </button>

            {/* Mute Music Toggle */}
            <button
              onClick={() => setMusicMuted(!musicMuted)}
              className="neo-btn p-2 bg-[#9B5DE5] hover:bg-[#b583f2] text-white flex items-center justify-center tap-target shadow-[2px_2px_0_0_rgba(0,0,0,1)] border-2"
              aria-label={musicMuted ? 'Unmute background music' : 'Mute background music'}
            >
              {musicMuted ? <MusicOffIcon size={24} /> : <MusicOnIcon size={24} />}
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 safe-bottom max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Bottom Nav Bar for Mobile */}
      <nav className="md:hidden bg-white border-t-4 border-black flex items-center justify-around py-3 px-2 shadow-[0_-4px_0_0_rgba(0,0,0,1)] z-10 sticky bottom-0 safe-bottom">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all tap-target ${
                isActive
                  ? 'bg-[#FFDE4D] border-2 border-black scale-105 shadow-[2px_2px_0_0_rgba(0,0,0,1)]'
                  : 'bg-transparent text-gray-600'
              }`}
              aria-label={`Go to ${tab.label}`}
            >
              {tab.icon}
              <span className="text-xs font-bold mt-1">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
