import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ProfileSetup } from './components/ProfileSetup';
import { GuessGame } from './components/GuessGame';
import { MatchGame } from './components/MatchGame';
import { DrawingStudio } from './components/DrawingStudio';
import { Leaderboard } from './components/Leaderboard';
import { ANIMALS } from './data/animals';
import soundSystem from './utils/sound';

function App() {
  const [activeTab, setActiveTab] = useState<string>('guess');
  
  // Audio state
  const [sfxMuted, setSfxMuted] = useState<boolean>(soundSystem.getSfxMuted());
  const [musicMuted, setMusicMuted] = useState<boolean>(soundSystem.getMusicMuted());

  // Player state
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [avatarId, setAvatarId] = useState<string>('lion');
  const [coins, setCoins] = useState<number>(0);
  const [studioUnlocked, setStudioUnlocked] = useState<boolean>(false);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  // Sync Audio states to soundSystem
  useEffect(() => {
    soundSystem.setSfxMuted(sfxMuted);
  }, [sfxMuted]);

  useEffect(() => {
    soundSystem.setMusicMuted(musicMuted);
    if (!musicMuted) {
      soundSystem.startMusic();
    } else {
      soundSystem.stopMusic();
    }
    return () => {
      soundSystem.stopMusic();
    };
  }, [musicMuted]);

  // Load player profile from local storage and sync with server
  useEffect(() => {
    const localId = localStorage.getItem('playerId');
    const localNickname = localStorage.getItem('nickname');
    const localAvatar = localStorage.getItem('avatarId');

    if (localId && localNickname) {
      setPlayerId(localId);
      setNickname(localNickname);
      setAvatarId(localAvatar || 'lion');

      // Fetch latest profile state from MongoDB
      fetch(`/api/player?playerId=${localId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.player) {
            setCoins(data.player.coins);
            setStudioUnlocked(data.player.studioUnlocked);
          }
        })
        .catch((err) => console.error('Failed to sync profile on load:', err))
        .finally(() => setLoadingProfile(false));
    } else {
      setLoadingProfile(false);
    }
  }, []);

  const handleProfileComplete = async (newId: string, newNickname: string, newAvatar: string) => {
    setPlayerId(newId);
    setNickname(newNickname);
    setAvatarId(newAvatar);
    setCoins(0);
    setStudioUnlocked(false);

    localStorage.setItem('playerId', newId);
    localStorage.setItem('nickname', newNickname);
    localStorage.setItem('avatarId', newAvatar);

    // Sync to backend MongoDB
    try {
      await fetch('/api/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: newId,
          nickname: newNickname,
          avatarId: newAvatar,
          coins: 0,
          studioUnlocked: false,
        }),
      });
    } catch (e) {
      console.error('Failed to create server profile:', e);
    }
  };

  const handleEarnCoins = async (amount: number) => {
    if (!playerId) return;

    // Optimistically update local coins balance
    setCoins((prev) => prev + amount);

    // Sync score submission server-side
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          mode: activeTab,
          score: 1, // increments score by 1 for this game play
          coinsEarned: amount,
        }),
      });
      const data = await res.json();
      if (data.success && typeof data.newCoinBalance === 'number') {
        // Correct coins to match verified server balance
        setCoins(data.newCoinBalance);
      }
    } catch (e) {
      console.error('Failed to sync score and coins:', e);
    }
  };

  const handleUnlockStudio = async () => {
    if (!playerId || coins < 50) return;

    soundSystem.playVictory();
    
    const newCoinsBalance = coins - 50;
    setCoins(newCoinsBalance);
    setStudioUnlocked(true);

    // Sync to backend MongoDB
    try {
      await fetch('/api/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          nickname,
          avatarId,
          coins: newCoinsBalance,
          studioUnlocked: true,
        }),
      });
      soundSystem.speak("Studio unlocked! Have fun painting!");
    } catch (e) {
      console.error('Failed to sync studio unlock state:', e);
    }
  };

  const handleSavePoster = (dataUrl: string) => {
    // Show user feedback that their drawing has been saved
    alert("🎨 Poster saved to your album!");
  };

  // Find avatar SVG url
  const activeAvatar = ANIMALS.find((a) => a.id === avatarId);
  const avatarUrl = activeAvatar ? activeAvatar.imageUrl : '/assets/animals/lion.svg';

  if (loadingProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFDF5]">
        <div className="animate-bounce font-black text-2xl text-[#FF9F29]">WILD GUESS...</div>
      </div>
    );
  }

  // First-time visitor profile creation shell
  if (!playerId) {
    return <ProfileSetup onComplete={handleProfileComplete} />;
  }

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      coins={coins}
      sfxMuted={sfxMuted}
      setSfxMuted={setSfxMuted}
      musicMuted={musicMuted}
      setMusicMuted={setMusicMuted}
      playerName={nickname}
      avatarUrl={avatarUrl}
    >
      {activeTab === 'guess' && <GuessGame onEarnCoins={handleEarnCoins} />}
      {activeTab === 'match' && <MatchGame onEarnCoins={handleEarnCoins} />}
      {activeTab === 'studio' && (
        <DrawingStudio
          coins={coins}
          studioUnlocked={studioUnlocked}
          onUnlockStudio={handleUnlockStudio}
          onSavePoster={handleSavePoster}
        />
      )}
      {activeTab === 'leaderboard' && <Leaderboard activePlayerId={playerId} />}
    </Layout>
  );
}

export default App;
