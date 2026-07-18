import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ANIMALS } from '../data/animals';
import type { Animal } from '../data/animals';
import soundSystem from '../utils/sound';
import { shuffle } from '../utils/shuffle';

interface GuessGameProps {
  onEarnCoins: (amount: number) => void;
}

export const GuessGame: React.FC<GuessGameProps> = ({ onEarnCoins }) => {
  const [pool, setPool] = useState<Animal[]>([]);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [options, setOptions] = useState<Animal[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);

  // Initialize pool of animals
  const resetPool = () => {
    return shuffle(ANIMALS);
  };

  // Start a new round
  const nextRound = (currentPool: Animal[], currentStreak: number) => {
    let activePool = [...currentPool];
    if (activePool.length === 0) {
      activePool = resetPool();
    }

    const animal = activePool.pop()!;
    setPool(activePool);
    setCurrentAnimal(animal);
    setSelectedId(null);
    setIsCorrect(null);
    setRevealed(false);

    // Generate options based on difficulty scaling (streak)
    // If streak >= 3, select options from the same category to increase similarity
    let wrongChoices: Animal[] = [];
    if (currentStreak >= 3) {
      const sameCategory = ANIMALS.filter(
        (a) => a.id !== animal.id && a.category === animal.category
      );
      // Fallback to random if not enough same category
      if (sameCategory.length >= 2) {
        wrongChoices = shuffle(sameCategory);
      } else {
        wrongChoices = shuffle(ANIMALS.filter((a) => a.id !== animal.id));
      }
    } else {
      wrongChoices = shuffle(ANIMALS.filter((a) => a.id !== animal.id));
    }

    // Slice options to either 3 or 4 choices based on streak (ramping up options count)
    const optionsCount = currentStreak >= 5 ? 4 : 3;
    const finalWrong = wrongChoices.slice(0, optionsCount - 1);
    const finalOptions = shuffle([animal, ...finalWrong]);

    setOptions(finalOptions);

    // Pronounce the animal name when it is revealed
    setTimeout(() => {
      soundSystem.speak("Who is this?");
    }, 100);
  };

  useEffect(() => {
    const initialPool = resetPool();
    nextRound(initialPool, 0);
  }, []);

  const handleOptionClick = (optionId: string) => {
    if (revealed || !currentAnimal) return;
    
    soundSystem.playTap();
    setSelectedId(optionId);
    setRevealed(true);

    const correct = optionId === currentAnimal.id;
    setIsCorrect(correct);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      soundSystem.playCorrect();
      
      // Celebrate with confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Calculate coins earned with streak bonus multipliers
      let coinsEarned = 10;
      if (newStreak >= 10) {
        coinsEarned = 20; // 2x bonus
      } else if (newStreak >= 5) {
        coinsEarned = 15; // 1.5x bonus
      } else if (newStreak >= 3) {
        coinsEarned = 12; // 1.2x bonus
      }

      onEarnCoins(coinsEarned);
      soundSystem.playCoin();

      // Pronounce animal name as positive reinforcement
      setTimeout(() => {
        soundSystem.speak(`${currentAnimal.displayName}! Yes!`);
      }, 500);
    } else {
      setStreak(0);
      soundSystem.playIncorrect();

      // Highlight the correct answer after a short delay
      setTimeout(() => {
        soundSystem.speak(`That is the ${currentAnimal.displayName}.`);
      }, 500);
    }
  };

  if (!currentAnimal) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-bounce font-black text-2xl text-[#FF9F29]">Loading animal...</div>
      </div>
    );
  }

  // Pre-configured colors for buttons to keep it highly colorful
  const buttonBgColors = [
    'bg-[#FFDE4D] hover:bg-[#ffe366]',
    'bg-[#38BDF8] hover:bg-[#60cdff]',
    'bg-[#FF8BCD] hover:bg-[#ffa3d7]',
    'bg-[#FF9F29] hover:bg-[#ffb04f]',
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Streak and Header Pill */}
      <div className="w-full flex justify-between items-center px-4 max-w-md">
        <div className="neo-box bg-[#9B5DE5] text-white px-4 py-2 font-black text-lg shadow-[2px_2px_0_0_rgba(0,0,0,1)] border-2">
          Streak: {streak}
        </div>
        <button
          onClick={() => soundSystem.speak(currentAnimal.displayName)}
          className="neo-btn px-4 py-2 bg-white font-bold text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] border-2"
          aria-label="Repeat instruction"
        >
          Speak
        </button>
      </div>

      {/* Large Animal Image Card */}
      <motion.div
        initial={{ scale: 0.8, rotate: -2 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="neo-box p-6 bg-white w-full max-w-sm flex items-center justify-center aspect-square shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative overflow-hidden"
      >
        <img
          src={currentAnimal.imageUrl}
          alt="Guess the animal"
          className="w-4/5 h-4/5 object-contain select-none"
          draggable="false"
        />
      </motion.div>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
        {options.map((option, idx) => {
          const isSelected = selectedId === option.id;
          const isCorrectOption = option.id === currentAnimal.id;
          
          let btnClass = buttonBgColors[idx % buttonBgColors.length];
          let borderClass = 'border-black';

          if (revealed) {
            if (isCorrectOption) {
              btnClass = 'bg-[#4EAD5B] text-white';
              borderClass = 'border-black scale-105';
            } else if (isSelected && !isCorrectOption) {
              btnClass = 'bg-[#FF6B6B] text-white';
              borderClass = 'border-black line-through opacity-70';
            } else {
              btnClass = 'bg-gray-200 text-gray-400';
              borderClass = 'border-gray-400 opacity-50';
            }
          }

          return (
            <motion.button
              key={option.id}
              disabled={revealed}
              onClick={() => handleOptionClick(option.id)}
              whileHover={!revealed ? { scale: 1.05 } : {}}
              whileTap={!revealed ? { scale: 0.95 } : {}}
              className={`neo-btn w-full p-5 text-2xl font-black rounded-3xl ${btnClass} border-4 ${borderClass} shadow-[4px_4px_0_0_rgba(0,0,0,1)] tracking-wide h-16 sm:h-20`}
              aria-label={`Select ${option.displayName}`}
            >
              {option.displayName}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button / Feedback */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 flex flex-col items-center gap-4 w-full max-w-md"
          >
            <div className="text-2xl font-black text-center select-none">
              {isCorrect ? (
                <span className="text-[#4EAD5B]">Super Job! +{streak >= 10 ? '20' : streak >= 5 ? '15' : streak >= 3 ? '12' : '10'} Coins</span>
              ) : (
                <span className="text-[#FF6B6B]">Oops! It's a {currentAnimal.displayName}!</span>
              )}
            </div>
            
            <button
              onClick={() => nextRound(pool, streak)}
              className="neo-btn w-full p-4 bg-[#FF9F29] text-white text-2xl font-black rounded-3xl border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#ffb04f] animate-pulse"
              aria-label="Next animal"
            >
              Next Animal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default GuessGame;
