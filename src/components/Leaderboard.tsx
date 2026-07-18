import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ANIMALS } from '../data/animals';
import soundSystem from '../utils/sound';

interface LeaderboardItem {
  playerId: string;
  nickname: string;
  score: number;
  coinsEarned: number;
  rank: number;
}

interface LeaderboardProps {
  activePlayerId: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ activePlayerId }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [playerRank, setPlayerRank] = useState<LeaderboardItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [timeToReset, setTimeToReset] = useState<string>('');

  // Calculate time remaining until UTC midnight
  const updateResetTimer = () => {
    const now = new Date();
    const utcMidnight = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0, 0, 0, 0
      )
    );
    const diffMs = utcMidnight.getTime() - now.getTime();
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    setTimeToReset(`${hours}h ${minutes}m`);
  };

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await fetch(`/api/leaderboard/daily?playerId=${activePlayerId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch leaderboard data.');
      }
      
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.leaderboard || []);
        setPlayerRank(data.playerRank || null);
      } else {
        throw new Error(data.error || 'Unknown API error');
      }
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to the high score board. Try again later!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    updateResetTimer();
    const interval = setInterval(updateResetTimer, 60000); // update every minute
    return () => clearInterval(interval);
  }, [activePlayerId]);

  // Helper to map avatars based on standard registry
  const getAvatarUrl = (nickname: string) => {
    // Return a consistent animal avatar based on character code hash
    const index = Math.abs(
      nickname.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % ANIMALS.length;
    return ANIMALS[index].imageUrl;
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Header Info Banner */}
      <div className="neo-box p-4 bg-[#9B5DE5] text-white w-full flex flex-col items-center gap-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-center border-4">
        <h2 className="text-2xl font-black">Daily Top Ranks 🏆</h2>
        <div className="text-xs font-bold bg-black/20 px-3 py-1 rounded-full mt-1">
          UTC Reset in: <span className="font-black text-[#FFDE4D]">{timeToReset}</span>
        </div>
      </div>

      {loading ? (
        // Playful Bouncing Loading State
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-full bg-[#FFDE4D] border-4 border-black flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          >
            <span className="text-3xl select-none">🐼</span>
          </motion.div>
          <div className="font-black text-xl text-gray-500">Loading High Scores...</div>
        </div>
      ) : error ? (
        // Error state
        <div className="neo-box p-6 bg-[#FF6B6B]/10 border-4 border-[#FF6B6B] text-center rounded-2xl w-full">
          <p className="font-black text-lg text-[#FF6B6B]">{error}</p>
          <button
            onClick={() => {
              soundSystem.playTap();
              fetchLeaderboard();
            }}
            className="neo-btn px-4 py-2 bg-white font-bold border-2 mt-4 text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          >
            🔄 Try Again
          </button>
        </div>
      ) : (
        // Leaderboard Lists
        <div className="flex flex-col gap-4 w-full">
          {/* Main Top 10 List */}
          <div className="flex flex-col gap-3">
            {leaderboard.length === 0 ? (
              <div className="neo-box p-6 bg-white border-2 text-center rounded-2xl text-gray-500 font-bold">
                No high scores submitted today. Be the first! 🚀
              </div>
            ) : (
              leaderboard.map((item) => {
                const isSelf = item.playerId === activePlayerId;
                
                // Colors based on rank podiums
                let rankBg = 'bg-white';
                if (item.rank === 1) rankBg = 'bg-[#FFDE4D]'; // Gold
                if (item.rank === 2) rankBg = 'bg-[#E2E8F0]'; // Silver
                if (item.rank === 3) rankBg = 'bg-[#EDC9AF]'; // Bronze

                return (
                  <motion.div
                    key={item.playerId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`neo-box p-3 bg-white border-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center gap-3 relative transition-all ${
                      isSelf ? 'border-[#FF9F29] scale-102 bg-[#FFFDF5]' : 'border-black'
                    }`}
                  >
                    {/* Rank Number Badge */}
                    <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-black text-lg shadow-[1px_1px_0_0_rgba(0,0,0,1)] shrink-0 ${rankBg}`}>
                      {item.rank}
                    </div>

                    {/* Cute Avatar */}
                    <img
                      src={getAvatarUrl(item.nickname)}
                      alt="Avatar"
                      className="w-12 h-12 object-contain rounded-full border-2 border-black bg-white shrink-0"
                    />

                    {/* Name details */}
                    <div className="flex flex-col min-w-0">
                      <span className="font-black text-lg truncate pr-2">
                        {item.nickname}
                      </span>
                      {isSelf && (
                        <span className="text-[10px] font-black uppercase text-[#FF9F29]">You 🌟</span>
                      )}
                    </div>

                    {/* Score value */}
                    <div className="ml-auto neo-box bg-[#38BDF8] text-white px-3 py-1 font-black border-2 shadow-[1px_1px_0_0_rgba(0,0,0,1)] text-sm">
                      {item.score} pts
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* User Rank highlight (if outside Top 10) */}
          {playerRank && playerRank.rank > 10 && (
            <div className="mt-4 pt-4 border-t-4 border-dashed border-gray-400">
              <div className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2 select-none">Your Rank:</div>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="neo-box p-3 bg-[#FFFDF5] border-4 border-[#FF9F29] shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center font-black text-lg shadow-[1px_1px_0_0_rgba(0,0,0,1)] shrink-0">
                  {playerRank.rank}
                </div>
                <img
                  src={getAvatarUrl(playerRank.nickname)}
                  alt="Avatar"
                  className="w-12 h-12 object-contain rounded-full border-2 border-black bg-white shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-black text-lg truncate pr-2">{playerRank.nickname}</span>
                  <span className="text-[10px] font-black uppercase text-[#FF9F29]">You 🌟</span>
                </div>
                <div className="ml-auto neo-box bg-[#38BDF8] text-white px-3 py-1 font-black border-2 shadow-[1px_1px_0_0_rgba(0,0,0,1)] text-sm">
                  {playerRank.score} pts
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Leaderboard;
