import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Play } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface SnakeProps {
  onInteraction: (type: string, data?: any) => void;
}

const Snake: React.FC<SnakeProps> = ({ onInteraction }) => {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs for state that updates frequently to avoid closure staleness in intervals
  const directionRef = useRef<Direction>('RIGHT');
  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }]);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    // Sync refs with state
    directionRef.current = direction;
    snakeRef.current = snake;
    isPlayingRef.current = isPlaying;
  }, [direction, snake, isPlaying]);

  const generateFood = (currentSnake: Point[]): Point => {
    while (true) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      const isOnSnake = currentSnake.some(segment => segment.x === x && segment.y === y);
      if (!isOnSnake) return { x, y };
    }
  };

  const resetGame = () => {
    if (gameOver || isPlaying) {
      onInteraction('game_restart', 'snake');
    }

    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    snakeRef.current = initialSnake;
    
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isPlayingRef.current) return;

    switch (e.key) {
      case 'ArrowUp':
        if (directionRef.current !== 'DOWN') setDirection('UP');
        e.preventDefault();
        break;
      case 'ArrowDown':
        if (directionRef.current !== 'UP') setDirection('DOWN');
        e.preventDefault();
        break;
      case 'ArrowLeft':
        if (directionRef.current !== 'RIGHT') setDirection('LEFT');
        e.preventDefault();
        break;
      case 'ArrowRight':
        if (directionRef.current !== 'LEFT') setDirection('RIGHT');
        e.preventDefault();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      const currentHead = snakeRef.current[0];
      const currentDir = directionRef.current;
      
      const newHead = { ...currentHead };

      switch (currentDir) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check Walls
      if (
        newHead.x < 0 || 
        newHead.x >= GRID_SIZE || 
        newHead.y < 0 || 
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }

      // Check Self Collision
      if (snakeRef.current.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
         setGameOver(true);
         setIsPlaying(false);
         return;
      }

      const newSnake = [newHead, ...snakeRef.current];

      // Check Food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => {
          const newScore = s + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop(); // Remove tail
      }

      setSnake(newSnake);

    }, INITIAL_SPEED);

    return () => clearInterval(gameLoop);
  }, [isPlaying, food, highScore]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#c0c0c0] p-4 select-none font-mono border-4 border-white border-r-gray-500 border-b-gray-500">
      
      {/* Header Bar */}
      <div className="w-full max-w-[400px] flex justify-between items-center mb-4 bg-[#c0c0c0] border-2 border-gray-500 border-r-white border-b-white p-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-gray-600 font-bold leading-none mb-1">Score</span>
          <div className="bg-black text-red-600 px-2 text-2xl font-bold font-mono tracking-widest">{String(score).padStart(3, '0')}</div>
        </div>
        
        <button 
          onClick={resetGame} 
          className="w-12 h-12 flex items-center justify-center active:translate-y-[1px] border-2 border-white border-r-gray-500 border-b-gray-500 active:border-gray-500 active:border-r-white active:border-b-white bg-[#c0c0c0]"
        >
          {gameOver ? <RotateCw size={24} /> : isPlaying ? <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" /> : <Play size={24} />}
        </button>

        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase text-gray-600 font-bold leading-none mb-1">High Score</span>
          <div className="bg-black text-red-600 px-2 text-2xl font-bold font-mono tracking-widest">{String(highScore).padStart(3, '0')}</div>
        </div>
      </div>
      
      {/* Game Board */}
      <div 
        className="grid gap-[1px] bg-gray-700 p-[4px] border-4 border-gray-500 border-r-white border-b-white relative"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: 'min(80vh, 100%)',
          maxWidth: '400px',
          aspectRatio: '1/1'
        }}
      >
        {gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]">
             <span className="text-white font-bold text-2xl mb-2 drop-shadow-md">GAME OVER</span>
             <button 
               onClick={resetGame}
               className="px-4 py-2 bg-[#c0c0c0] border-2 border-white border-r-gray-500 border-b-gray-500 font-bold hover:bg-white transition-colors text-sm"
             >
               TRY AGAIN
             </button>
          </div>
        )}

        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              className={`w-full h-full 
                ${isHead ? 'bg-green-400 z-10' : 
                  isSnake ? 'bg-green-600' : 
                  isFood ? 'bg-red-500 rounded-full scale-75' : 'bg-[#e0e0e0]'}
              `}
              style={isSnake ? { boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' } : {}}
            />
          );
        })}
      </div>
      
      <div className="mt-4 text-gray-600 text-xs text-center font-bold">
        USE ARROW KEYS TO MOVE
      </div>
    </div>
  );
};

export default Snake;