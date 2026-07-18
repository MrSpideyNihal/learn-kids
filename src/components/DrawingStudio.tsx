import React, { useState, useEffect, useRef } from 'react';
import { ANIMALS } from '../data/animals';
import soundSystem from '../utils/sound';

interface DrawingStudioProps {
  coins: number;
  studioUnlocked: boolean;
  onUnlockStudio: () => void;
  onSavePoster: (dataUrl: string) => void;
}

export const DrawingStudio: React.FC<DrawingStudioProps> = ({
  coins,
  studioUnlocked,
  onUnlockStudio,
  onSavePoster,
}) => {
  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1A1A1A');
  const [brushSize, setBrushSize] = useState(8);
  const [tool, setTool] = useState<'brush' | 'eraser' | 'stamp'>('brush');
  const [activeStampUrl, setActiveStampUrl] = useState<string>('');

  // History state for Undo
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  // Locked gate config
  const UNLOCK_COST = 50;
  const progressPercent = Math.min(100, Math.floor((coins / UNLOCK_COST) * 100));

  // Initialize canvas context
  useEffect(() => {
    if (!studioUnlocked || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Set up high DPI support
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const context = canvas.getContext('2d');
    if (context) {
      context.scale(2, 2);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = color;
      context.lineWidth = brushSize;
      contextRef.current = context;
      
      // Paint canvas background white
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, rect.width, rect.height);
      
      // Save initial blank canvas state to history
      const initialUrl = canvas.toDataURL();
      setHistory([initialUrl]);
      setHistoryIdx(0);
    }
  }, [studioUnlocked]);

  // Keep stroke settings updated
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize, tool]);

  const saveCanvasState = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL();
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(dataUrl);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
  };

  const handleStartDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!contextRef.current || !canvasRef.current) return;

    let clientX, clientY;
    if ('touches' in nativeEvent) {
      clientX = nativeEvent.touches[0].clientX;
      clientY = nativeEvent.touches[0].clientY;
    } else {
      clientX = nativeEvent.clientX;
      clientY = nativeEvent.clientY;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (tool === 'stamp' && activeStampUrl) {
      drawStamp(x, y);
      return;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleDraw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;

    let clientX, clientY;
    if ('touches' in nativeEvent) {
      clientX = nativeEvent.touches[0].clientX;
      clientY = nativeEvent.touches[0].clientY;
    } else {
      clientX = nativeEvent.clientX;
      clientY = nativeEvent.clientY;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const handleStopDrawing = () => {
    if (isDrawing) {
      contextRef.current?.closePath();
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  const drawStamp = (x: number, y: number) => {
    if (!contextRef.current || !canvasRef.current) return;
    
    soundSystem.playTap();
    const img = new Image();
    img.src = activeStampUrl;
    img.onload = () => {
      const stampSize = brushSize * 4; // Scale stamp with brush slider
      contextRef.current?.drawImage(
        img,
        x - stampSize / 2,
        y - stampSize / 2,
        stampSize,
        stampSize
      );
      saveCanvasState();
    };
  };

  const handleUndo = () => {
    if (historyIdx > 0 && canvasRef.current && contextRef.current) {
      soundSystem.playTap();
      const prevIdx = historyIdx - 1;
      setHistoryIdx(prevIdx);
      
      const img = new Image();
      img.src = history[prevIdx];
      img.onload = () => {
        const rect = canvasRef.current!.getBoundingClientRect();
        contextRef.current!.clearRect(0, 0, rect.width, rect.height);
        contextRef.current!.drawImage(img, 0, 0, rect.width, rect.height);
      };
    }
  };

  const handleClear = () => {
    if (canvasRef.current && contextRef.current) {
      soundSystem.playTap();
      const rect = canvasRef.current.getBoundingClientRect();
      contextRef.current.fillStyle = '#FFFFFF';
      contextRef.current.fillRect(0, 0, rect.width, rect.height);
      saveCanvasState();
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      soundSystem.playVictory();
      const dataUrl = canvasRef.current.toDataURL();
      onSavePoster(dataUrl);
    }
  };

  const colors = [
    '#1A1A1A', // Dark
    '#FF6B6B', // Coral
    '#38BDF8', // Sky Blue
    '#4EAD5B', // Kiwi Green
    '#FFDE4D', // Yellow
    '#9B5DE5', // Purple
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      {!studioUnlocked ? (
        // LOCKED STATE
        <div className="neo-box p-6 sm:p-8 bg-white w-full max-w-md flex flex-col items-center gap-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] text-center mt-10">
          <div className="w-24 h-24 rounded-full bg-[#FFDE4D] border-4 border-black flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="2.5" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2.5" />
            </svg>
          </div>

          <div>
            <h2 className="text-3xl font-black">Drawing Studio 🎨</h2>
            <p className="text-gray-600 font-bold text-sm mt-1">Unlock the studio to paint and stamp cute animals!</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between font-black text-sm">
              <span>Progress</span>
              <span>{coins} / {UNLOCK_COST} Coins</span>
            </div>
            <div className="w-full bg-gray-200 border-4 border-black rounded-full h-8 overflow-hidden relative shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <div
                className="bg-[#4EAD5B] h-full transition-all duration-300 border-r-4 border-black"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <button
            disabled={coins < UNLOCK_COST}
            onClick={onUnlockStudio}
            className={`neo-btn w-full p-4 text-2xl font-black rounded-3xl border-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${
              coins >= UNLOCK_COST
                ? 'bg-[#FF9F29] text-white hover:bg-[#ffb04f]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400 shadow-none'
            }`}
          >
            Unlock for {UNLOCK_COST} Coins 🪙
          </button>
        </div>
      ) : (
        // UNLOCKED ACTIVE STUDIO STATE
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Main Drawing Canvas Card */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="neo-box bg-white overflow-hidden shadow-[6px_6px_0_0_rgba(0,0,0,1)] aspect-[4/3] w-full relative">
              <canvas
                ref={canvasRef}
                onMouseDown={handleStartDrawing}
                onMouseMove={handleDraw}
                onMouseUp={handleStopDrawing}
                onMouseLeave={handleStopDrawing}
                onTouchStart={handleStartDrawing}
                onTouchMove={handleDraw}
                onTouchEnd={handleStopDrawing}
                className="w-full h-full block touch-none"
              />
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex justify-between items-center gap-3">
              <button
                disabled={historyIdx <= 0}
                onClick={handleUndo}
                className="neo-btn p-3 bg-white hover:bg-gray-100 font-bold border-2 border-black flex-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] disabled:opacity-50 disabled:shadow-none"
              >
                ↩️ Undo
              </button>
              <button
                onClick={handleClear}
                className="neo-btn p-3 bg-white hover:bg-gray-100 font-bold border-2 border-black flex-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
              >
                🗑️ Clear
              </button>
              <button
                onClick={handleSave}
                className="neo-btn p-3 bg-[#4EAD5B] text-white font-black border-2 border-black flex-[2] shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-[#5bbf69]"
              >
                🖼️ Save Poster
              </button>
            </div>
          </div>

          {/* Left/Right Sidebar Toolbox Panel */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6 bg-white neo-box p-5 border-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black border-b-2 border-black pb-2">Toolbox 🛠️</h3>

            {/* Brush vs Stamp vs Eraser */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  soundSystem.playTap();
                  setTool('brush');
                }}
                className={`neo-btn p-2 text-sm font-bold border-2 flex-1 ${
                  tool === 'brush' ? 'bg-[#FFDE4D]' : 'bg-white'
                }`}
              >
                ✏️ Brush
              </button>
              <button
                onClick={() => {
                  soundSystem.playTap();
                  setTool('eraser');
                }}
                className={`neo-btn p-2 text-sm font-bold border-2 flex-1 ${
                  tool === 'eraser' ? 'bg-[#FF6B6B] text-white' : 'bg-white'
                }`}
              >
                🧽 Eraser
              </button>
            </div>

            {/* Size Slider */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-black text-sm">
                <span>Size:</span>
                <span>{brushSize}px</span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
                className="w-full cursor-pointer h-2 bg-gray-200 border-2 border-black rounded-lg appearance-none"
              />
            </div>

            {/* Colors picker */}
            {tool !== 'eraser' && tool !== 'stamp' && (
              <div className="flex flex-col gap-2">
                <span className="font-black text-sm">Colors:</span>
                <div className="grid grid-cols-6 gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        soundSystem.playTap();
                        setColor(c);
                      }}
                      className={`w-8 h-8 rounded-full border-2 border-black ${
                        color === c ? 'scale-110 shadow-[2px_2px_0_0_rgba(0,0,0,1)]' : 'opacity-80'
                      }`}
                      style={{ backgroundColor: c }}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stamps drawer */}
            <div className="flex flex-col gap-2">
              <span className="font-black text-sm">Animal Stamps:</span>
              <div className="grid grid-cols-4 gap-2">
                {ANIMALS.map((animal) => {
                  const isSelected = tool === 'stamp' && activeStampUrl === animal.imageUrl;
                  return (
                    <button
                      key={animal.id}
                      onClick={() => {
                        soundSystem.playTap();
                        setTool('stamp');
                        setActiveStampUrl(animal.imageUrl);
                      }}
                      className={`neo-btn p-1 aspect-square flex items-center justify-center rounded-lg border-2 ${
                        isSelected
                          ? 'bg-[#38BDF8] scale-105 shadow-[2px_2px_0_0_rgba(0,0,0,1)]'
                          : 'bg-white'
                      }`}
                      aria-label={`Select ${animal.displayName} stamp`}
                    >
                      <img
                        src={animal.imageUrl}
                        alt={animal.displayName}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DrawingStudio;
