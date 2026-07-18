import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ANIMALS } from '../data/animals';
import soundSystem from '../utils/sound';
import { shuffle } from '../utils/shuffle';

interface MatchGameProps {
  onEarnCoins: (amount: number) => void;
}

interface Card {
  id: string;
  matchId: string;
  type: 'animal' | 'target';
  content: string;
  contentType: 'image' | 'text';
  isFlipped: boolean;
  isMatched: boolean;
}

type Difficulty = 'easy' | 'medium' | 'hard';
type PairCategory = 'name' | 'food' | 'habitat' | 'object';

export const MatchGame: React.FC<MatchGameProps> = ({ onEarnCoins }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [category, setCategory] = useState<PairCategory>('name');
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  
  // Game stats
  const [matchesCount, setMatchesCount] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [coinsEarnedThisRound, setCoinsEarnedThisRound] = useState<number>(0);

  const timerRef = useRef<any>(null);

  // Categories helper info - cleaned of emojis
  const categoryDetails = {
    name: { label: 'Name', detail: 'Match animal to its name!' },
    food: { label: 'Food', detail: 'Match animal to what it eats!' },
    habitat: { label: 'Home', detail: 'Match animal to where it lives!' },
    object: { label: 'Toy', detail: 'Match animal to its special item!' },
  };

  const startTimer = () => {
    stopTimer();
    setSecondsElapsed(0);
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopTimer();
  }, []);

  // Initialize and start a game
  const startGame = () => {
    soundSystem.playTap();
    setIsComplete(false);
    setSelectedCards([]);
    setIsBusy(false);
    setMatchesCount(0);
    setCoinsEarnedThisRound(0);

    // Determine number of pairs based on difficulty
    // Easy: 3 pairs (6 cards), Medium: 6 pairs (12 cards), Hard: 8 pairs (16 cards)
    let pairCount = 3;
    if (difficulty === 'medium') pairCount = 6;
    if (difficulty === 'hard') pairCount = 8;

    // Pick random animals from our registry using Fisher-Yates
    const shuffledAnimals = shuffle(ANIMALS);
    const selectedAnimals = shuffledAnimals.slice(0, pairCount);

    const chosenCategory = category === 'name' ? 'name' : category; // can be selected by user or random

    // Create cards list
    const generatedCards: Card[] = [];
    selectedAnimals.forEach((animal) => {
      // 1. Animal Card
      generatedCards.push({
        id: `${animal.id}-animal`,
        matchId: animal.id,
        type: 'animal',
        content: animal.imageUrl,
        contentType: 'image',
        isFlipped: false,
        isMatched: false,
      });

      // 2. Target Card (Name, Food, Habitat, or Object)
      let targetContent = '';
      let targetContentType: 'image' | 'text' = 'image';

      if (chosenCategory === 'name') {
        targetContent = animal.displayName;
        targetContentType = 'text';
      } else if (chosenCategory === 'food') {
        targetContent = animal.matchObjects.food;
      } else if (chosenCategory === 'habitat') {
        targetContent = animal.matchObjects.habitat;
      } else if (chosenCategory === 'object') {
        targetContent = animal.matchObjects.object;
      }

      generatedCards.push({
        id: `${animal.id}-target`,
        matchId: animal.id,
        type: 'target',
        content: targetContent,
        contentType: targetContentType,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle the cards using Fisher-Yates
    const shuffledCards = shuffle(generatedCards);
    setCards(shuffledCards);
    setIsPlaying(true);
    startTimer();

    // Welcome sound
    soundSystem.speak("Let's play memory match!");
  };

  const handleCardClick = (clickedCard: Card) => {
    if (isBusy || clickedCard.isFlipped || clickedCard.isMatched) return;

    soundSystem.playFlip();

    // Flip the card visually
    setCards((prev) =>
      prev.map((card) => (card.id === clickedCard.id ? { ...card, isFlipped: true } : card))
    );

    const newSelection = [...selectedCards, clickedCard];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      setIsBusy(true);
      const [first, second] = newSelection;

      if (first.matchId === second.matchId) {
        // MATCH FOUND
        setTimeout(() => {
          soundSystem.playMatch();
          setCards((prev) =>
            prev.map((card) =>
              card.matchId === first.matchId ? { ...card, isMatched: true } : card
            )
          );
          
          const newMatches = matchesCount + 1;
          setMatchesCount(newMatches);
          setSelectedCards([]);
          setIsBusy(false);

          // Earn coins for matching
          const roundCoins = 5;
          setCoinsEarnedThisRound((prev) => prev + roundCoins);
          onEarnCoins(roundCoins);
          soundSystem.playCoin();

          // Pronounce match animal name if matching name
          const matchedAnimal = ANIMALS.find((a) => a.id === first.matchId);
          if (matchedAnimal) {
            soundSystem.speak(`${matchedAnimal.displayName}! Match!`);
          }

          // Check for complete win
          const totalPairs = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 6 : 8;
          if (newMatches === totalPairs) {
            handleVictory();
          }
        }, 600);
      } else {
        // MISMATCH
        setTimeout(() => {
          soundSystem.playFlip(); // Neutral card flip back sound
          setCards((prev) =>
            prev.map((card) =>
              card.id === first.id || card.id === second.id ? { ...card, isFlipped: false } : card
            )
          );
          setSelectedCards([]);
          setIsBusy(false);
        }, 1200);
      }
    }
  };

  const handleVictory = () => {
    stopTimer();
    setIsComplete(true);
    soundSystem.playVictory();

    // Confetti explosion
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });

    // Speak victory text
    setTimeout(() => {
      soundSystem.speak("All matched! Brilliant job!");
    }, 500);
  };

  const resetSetup = () => {
    soundSystem.playTap();
    setIsPlaying(false);
    setIsComplete(false);
    setCards([]);
    setSelectedCards([]);
  };

  // Card grid layout classes
  let gridColsClass = 'grid-cols-3';
  if (difficulty === 'medium') gridColsClass = 'grid-cols-3 sm:grid-cols-4';
  if (difficulty === 'hard') gridColsClass = 'grid-cols-4';

  return (
    <div className="flex flex-col items-center gap-6">
      {!isPlaying ? (
        // Start / Difficulty Setup Screen
        <div className="neo-box p-6 sm:p-8 bg-white w-full max-w-md flex flex-col gap-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] text-center">
          <h2 className="text-3xl font-black text-left">Match the Pair</h2>
          <p className="text-gray-600 font-bold text-left">Pick your game settings and get matching!</p>

          {/* Difficulty selector */}
          <div className="flex flex-col gap-2 align-start text-left">
            <label className="font-black text-lg">Difficulty:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    soundSystem.playTap();
                    setDifficulty(d);
                  }}
                  className={`neo-btn p-3 font-bold border-2 capitalize ${
                    difficulty === d ? 'bg-[#FFDE4D]' : 'bg-white'
                  }`}
                >
                  {d === 'easy' ? 'Easy (3x2)' : d === 'medium' ? 'Medium (4x3)' : 'Hard (4x4)'}
                </button>
              ))}
            </div>
          </div>

          {/* Category selector */}
          <div className="flex flex-col gap-2 align-start text-left">
            <label className="font-black text-lg">Match Style:</label>
            <div className="grid grid-cols-2 gap-2">
              {(['name', 'food', 'habitat', 'object'] as PairCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundSystem.playTap();
                    setCategory(cat);
                  }}
                  className={`neo-btn p-3 font-bold border-2 text-sm flex flex-col items-center justify-center gap-1 ${
                    category === cat ? 'bg-[#38BDF8] text-white' : 'bg-white'
                  }`}
                >
                  <span className="font-black text-base">{categoryDetails[cat].label}</span>
                  <span className="text-xs opacity-80">{categoryDetails[cat].detail}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="neo-btn w-full p-4 bg-[#4EAD5B] hover:bg-[#5bbf69] text-white text-2xl font-black rounded-3xl border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] tracking-wide mt-2"
          >
            Play Game
          </button>
        </div>
      ) : isComplete ? (
        // Summary Victory Screen
        <div className="neo-box p-6 sm:p-8 bg-white w-full max-w-md flex flex-col gap-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] text-center animate-bounce-spring">
          <h2 className="text-4xl font-black text-[#4EAD5B]">GREAT MATCHING!</h2>
          
          <div className="neo-box bg-[#FFFDF5] p-4 flex flex-col gap-3 font-black border-2 text-lg text-left shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <div>Time taken: <span className="text-[#38BDF8]">{secondsElapsed} seconds</span></div>
            <div>Matches found: <span className="text-[#9B5DE5]">{matchesCount} pairs</span></div>
            <div>Coins won: <span className="text-[#FFDE4D]">{coinsEarnedThisRound} coins</span></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetSetup}
              className="neo-btn flex-1 p-4 bg-white hover:bg-gray-100 text-xl font-bold border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
            >
              Setup
            </button>
            <button
              onClick={startGame}
              className="neo-btn flex-grow-[2] p-4 bg-[#FF9F29] hover:bg-[#ffb04f] text-white text-xl font-black border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
            >
              Play Again
            </button>
          </div>
        </div>
      ) : (
        // Active Game memory match cards grid board
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {/* Active stats pill */}
          <div className="flex justify-between items-center bg-white neo-box p-4 border-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <div className="font-bold text-lg">Time: <span className="font-black text-[#38BDF8]">{secondsElapsed}s</span></div>
            <div className="font-bold text-lg">Matches: <span className="font-black text-[#9B5DE5]">{matchesCount}</span></div>
            <button
              onClick={resetSetup}
              className="neo-btn px-4 py-2 bg-[#FF6B6B] text-white font-bold text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] border-2"
            >
              Exit
            </button>
          </div>

          {/* Cards Grid layout */}
          <div className={`grid ${gridColsClass} gap-3 sm:gap-4 justify-center items-center w-full`}>
            {cards.map((card) => {
              const isFlipped = card.isFlipped || card.isMatched;
              
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className="aspect-square w-full cursor-pointer relative"
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="w-full h-full relative"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Card Front face (hidden when flipped) */}
                    <div
                      className="absolute inset-0 neo-box bg-[#38BDF8] flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] select-none"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="text-white text-5xl font-black select-none">?</div>
                    </div>

                    {/* Card Back content face (visible when flipped) */}
                    <div
                      className="absolute inset-0 neo-box bg-white flex items-center justify-center p-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      {card.contentType === 'image' ? (
                        <img
                          src={card.content}
                          alt="card content"
                          className="w-full h-full object-contain select-none"
                          draggable="false"
                        />
                      ) : (
                        <div className="font-black text-lg sm:text-2xl text-center leading-tight tracking-wide break-words">
                          {card.content}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default MatchGame;
