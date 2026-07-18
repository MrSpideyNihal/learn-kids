import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ANIMALS } from '../data/animals';
import soundSystem from '../utils/sound';

interface ProfileSetupProps {
  onComplete: (playerId: string, nickname: string, avatarId: string) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'gate' | 'profile'>('gate');
  
  // Parent Gate state
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [gateAnswer, setGateAnswer] = useState<string>('');
  const [gateError, setGateError] = useState<boolean>(false);

  // Profile setup state
  const [nickname, setNickname] = useState<string>('');
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>('lion');
  const [profileError, setProfileError] = useState<string>('');

  // Choose from animal registry for avatars
  const avatars = ANIMALS.slice(0, 6).map((a) => ({
    id: a.id,
    name: a.displayName,
    url: a.imageUrl,
  }));

  // Generate random math question on mount
  useEffect(() => {
    generateMathQuestion();
  }, []);

  const generateMathQuestion = () => {
    const n1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const n2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    setNum1(n1);
    setNum2(n2);
    setGateAnswer('');
    setGateError(false);
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundSystem.playTap();
    
    const parsed = parseInt(gateAnswer, 10);
    if (parsed === num1 + num2) {
      soundSystem.playCorrect();
      setStep('profile');
      soundSystem.speak("Awesome! Let's choose your nickname.");
    } else {
      soundSystem.playIncorrect();
      setGateError(true);
      setTimeout(() => setGateError(false), 500); // end shake
      generateMathQuestion();
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundSystem.playTap();

    if (!nickname.trim()) {
      setProfileError('Nickname cannot be empty!');
      return;
    }
    if (nickname.length > 15) {
      setProfileError('Nickname must be 15 characters or less!');
      return;
    }

    // Generate anonymous player UUID
    const generatedPlayerId = 'usr_' + Math.random().toString(36).substring(2, 11);
    
    soundSystem.playVictory();
    soundSystem.speak(`Welcome, ${nickname}!`);
    onComplete(generatedPlayerId, nickname.trim(), selectedAvatarId);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 min-h-[70vh]">
      {step === 'gate' ? (
        // Step 1: Parent Gate Math Check
        <motion.div
          animate={gateError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="neo-box p-6 sm:p-8 bg-white w-full max-w-md flex flex-col gap-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] text-center"
        >
          <div>
            <h2 className="text-2xl font-black text-[#FF6B6B]">ASK AN ADULT</h2>
            <p className="text-gray-600 font-bold text-sm mt-1">Please answer this simple question to unlock nickname entry.</p>
          </div>

          <form onSubmit={handleGateSubmit} className="flex flex-col gap-5">
            <div className="text-3xl font-black bg-[#FFFDF5] p-5 border-4 border-black rounded-2xl shadow-[2px_2px_0_0_rgba(0,0,0,1)] select-none">
              What is {num1} + {num2}?
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                required
                value={gateAnswer}
                onChange={(e) => setGateAnswer(e.target.value)}
                placeholder="Type the answer"
                className="w-full p-4 text-center text-2xl font-black border-4 border-black rounded-2xl outline-none focus:bg-[#FFFDF5] shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                autoFocus
              />
              {gateError && (
                <div className="text-[#FF6B6B] font-black text-sm">Oops! Try again!</div>
              )}
            </div>

            <button
              type="submit"
              className="neo-btn w-full p-4 bg-[#38BDF8] text-white text-xl font-black border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#60cdff]"
            >
              Confirm
            </button>
          </form>
        </motion.div>
      ) : (
        // Step 2: Nickname and Avatar Selection
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="neo-box p-6 sm:p-8 bg-white w-full max-w-md flex flex-col gap-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
        >
          <div className="text-center">
            <h2 className="text-3xl font-black text-[#9B5DE5]">CHOOSE YOUR PROFILE</h2>
            <p className="text-gray-600 font-bold text-sm mt-1">Pick a cute avatar and type your nickname!</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-6">
            {/* Nickname input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="nickname-input" className="font-black text-lg">Nickname:</label>
              <input
                id="nickname-input"
                type="text"
                maxLength={15}
                required
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setProfileError('');
                }}
                placeholder="Your cute nickname"
                className="w-full p-4 text-xl font-black border-4 border-black rounded-2xl outline-none focus:bg-[#FFFDF5] shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                autoFocus
              />
              {profileError && (
                <div className="text-[#FF6B6B] font-black text-sm">{profileError}</div>
              )}
            </div>

            {/* Avatar picker grid */}
            <div className="flex flex-col gap-3">
              <label className="font-black text-lg">Choose an Avatar:</label>
              <div className="grid grid-cols-3 gap-3">
                {avatars.map((av) => {
                  const isSelected = selectedAvatarId === av.id;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        soundSystem.playTap();
                        setSelectedAvatarId(av.id);
                      }}
                      className={`neo-btn p-2 aspect-square flex items-center justify-center rounded-2xl border-4 ${
                        isSelected
                          ? 'bg-[#FFDE4D] scale-105 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                          : 'bg-white border-gray-400 opacity-70 shadow-none hover:opacity-100 hover:border-black'
                      }`}
                      aria-label={`Select ${av.name} avatar`}
                    >
                      <img
                        src={av.url}
                        alt={av.name}
                        className="w-4/5 h-4/5 object-contain select-none"
                        draggable="false"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="neo-btn w-full p-4 bg-[#4EAD5B] text-white text-2xl font-black border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#5bbf69] mt-2"
            >
              Let's Play!
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};
export default ProfileSetup;
