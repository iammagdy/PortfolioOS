import React, { useState, useEffect } from 'react';
import { Bomb, Flag } from 'lucide-react';

interface MinesweeperProps {
  onInteraction: (type: string, data?: any) => void;
}

interface Cell {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const BOARD_SIZE = 9;
const MINES_COUNT = 10;

const Minesweeper: React.FC<MinesweeperProps> = ({ onInteraction }) => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [flags, setFlags] = useState(MINES_COUNT);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let interval: any;
    if (started && !gameOver && !win) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [started, gameOver, win]);

  useEffect(() => {
    if (win) {
      onInteraction('minesweeper_win');
    }
    if (gameOver && !win) {
      onInteraction('minesweeper_loss');
    }
  }, [win, gameOver]);

  const initGame = () => {
    // If restarting (started is true), report restart for "Just One More" achievement
    if (started) {
      onInteraction('game_restart', 'minesweeper');
    }

    const newBoard: Cell[][] = Array(BOARD_SIZE).fill(null).map((_, y) => 
      Array(BOARD_SIZE).fill(null).map((_, x) => ({
        x, y, isMine: false, isRevealed: false, isFlagged: false, neighborMines: 0
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const x = Math.floor(Math.random() * BOARD_SIZE);
      const y = Math.floor(Math.random() * BOARD_SIZE);
      if (!newBoard[y][x].isMine) {
        newBoard[y][x].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbors
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (!newBoard[y][x].isMine) {
          let count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (y + dy >= 0 && y + dy < BOARD_SIZE && x + dx >= 0 && x + dx < BOARD_SIZE) {
                if (newBoard[y + dy][x + dx].isMine) count++;
              }
            }
          }
          newBoard[y][x].neighborMines = count;
        }
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setWin(false);
    setFlags(MINES_COUNT);
    setTime(0);
    setStarted(false);
  };

  const revealCell = (x: number, y: number) => {
    if (gameOver || win || board[y][x].isFlagged || board[y][x].isRevealed) return;

    if (!started) setStarted(true);

    const newBoard = [...board];
    const cell = newBoard[y][x];

    if (cell.isMine) {
      cell.isRevealed = true;
      setBoard(newBoard);
      setGameOver(true);
      return;
    }

    const floodFill = (cx: number, cy: number) => {
      if (cx < 0 || cx >= BOARD_SIZE || cy < 0 || cy >= BOARD_SIZE || newBoard[cy][cx].isRevealed || newBoard[cy][cx].isFlagged) return;
      
      newBoard[cy][cx].isRevealed = true;
      
      if (newBoard[cy][cx].neighborMines === 0) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
             floodFill(cx + dx, cy + dy);
          }
        }
      }
    };

    floodFill(x, y);
    setBoard(newBoard);

    // Check win
    const unrevealedSafeCells = newBoard.flat().filter(c => !c.isMine && !c.isRevealed).length;
    if (unrevealedSafeCells === 0) {
      setWin(true);
    }
  };

  const toggleFlag = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (gameOver || win || board[y][x].isRevealed) return;

    const newBoard = [...board];
    if (newBoard[y][x].isFlagged) {
      newBoard[y][x].isFlagged = false;
      setFlags(f => f + 1);
    } else {
      if (flags > 0) {
        newBoard[y][x].isFlagged = true;
        setFlags(f => f - 1);
      }
    }
    setBoard(newBoard);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#c0c0c0] p-4 select-none font-mono border-4 border-white border-r-gray-500 border-b-gray-500">
      <div className="w-full flex justify-between items-center mb-4 bg-[#c0c0c0] border-2 border-gray-500 border-r-white border-b-white p-2">
        <div className="bg-black text-red-600 px-2 text-2xl font-bold">{String(flags).padStart(3, '0')}</div>
        <button onClick={initGame} className="text-2xl p-1 active:translate-y-[1px] border-2 border-white border-r-gray-500 border-b-gray-500 active:border-gray-500 active:border-r-white active:border-b-white bg-[#c0c0c0]">
          {gameOver ? '😵' : win ? '😎' : '🙂'}
        </button>
        <div className="bg-black text-red-600 px-2 text-2xl font-bold">{String(time).padStart(3, '0')}</div>
      </div>
      
      <div 
        className="grid gap-[2px] bg-gray-500 p-[2px] border-4 border-gray-500 border-r-white border-b-white"
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}
      >
        {board.map((row, y) => row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`w-8 h-8 flex items-center justify-center text-sm font-bold cursor-pointer
              ${cell.isRevealed 
                ? 'bg-[#c0c0c0] border border-gray-400' 
                : 'bg-[#c0c0c0] border-2 border-white border-r-gray-500 border-b-gray-500 hover:brightness-105 active:border-gray-500 active:border-r-white active:border-b-white'
              }
              ${cell.isRevealed && cell.isMine ? 'bg-red-500' : ''}
            `}
            onClick={() => revealCell(x, y)}
            onContextMenu={(e) => toggleFlag(e, x, y)}
          >
            {cell.isRevealed ? (
              cell.isMine ? <Bomb size={16} /> : cell.neighborMines > 0 ? (
                <span style={{ color: ['blue', 'green', 'red', 'darkblue', 'brown', 'cyan', 'black', 'gray'][cell.neighborMines - 1] }}>
                  {cell.neighborMines}
                </span>
              ) : ''
            ) : (
              cell.isFlagged ? <Flag size={14} className="text-red-600 fill-red-600" /> : ''
            )}
          </div>
        )))}
      </div>
    </div>
  );
};

export default Minesweeper;