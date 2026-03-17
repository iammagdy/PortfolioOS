import React, { useState, useRef, useEffect } from 'react';
import { FileSystemItem } from '../../types';

interface TerminalProps {
  files: Record<string, FileSystemItem>;
  onOpenApp: (appId: string, param?: string) => void;
  onInteraction: (type: string, data?: any) => void;
}

const Terminal: React.FC<TerminalProps> = ({ files, onOpenApp, onInteraction }) => {
  const [history, setHistory] = useState<string[]>(['Welcome to PortfolioOS v1.0.0', 'Type "help" to see available commands.']);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Report interaction for achievements
    onInteraction('terminal_command', trimmed);

    const [command, ...args] = trimmed.split(' ');
    setCommandHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const output = [`➜  ~ ${trimmed}`];

    switch (command.toLowerCase()) {
      case 'help':
        onInteraction('terminal_help');
        output.push(
          'Available commands:',
          '  help        - Show this help message',
          '  ls          - List directory contents',
          '  cat <file>  - Display file content',
          '  clear       - Clear terminal',
          '  whoami      - Display user info',
          '  open <app>  - Open an application (e.g., open mail)',
          '  email       - Check email',
          '  minesweeper - Play a game',
          '  cv          - View Resume'
        );
        break;
      case 'ls':
        // Simplified ls - just listing desktop
        const desktop = files['desktop'];
        if (desktop && desktop.children) {
          const names = desktop.children.map(cid => files[cid]?.name).filter(Boolean).join('  ');
          output.push(names);
        }
        break;
      case 'whoami':
        output.push('visitor@portfolio-os');
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'cv':
        onOpenApp('pdf_viewer', 'file_cv');
        output.push('Opening CV...');
        break;
      case 'email':
        onOpenApp('email');
        output.push('Opening Mail Client...');
        break;
      case 'minesweeper':
        onOpenApp('minesweeper');
        output.push('Starting Minesweeper...');
        break;
      case 'easter_eggs':
        output.push('🥚 You found one! Try dragging the "Minesweeper" icon to the Trash... just kidding, don\'t do that.');
        break;
      case 'cat':
        if (args.length === 0) {
          output.push('Usage: cat <filename>');
        } else {
          // Flatten search for simplicity
          const fileName = args[0];
          const foundFile = Object.values(files).find(f => f.name === fileName && f.content);
          if (foundFile) {
             output.push(foundFile.content || '');
          } else {
            output.push(`cat: ${fileName}: No such file or directory`);
          }
        }
        break;
      default:
        output.push(`command not found: ${command}`);
    }

    setHistory(prev => [...prev, ...output]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className="h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 overflow-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap mb-1 leading-relaxed">{line}</div>
      ))}
      <div className="flex">
        <span className="text-green-500 mr-2">➜</span>
        <span className="text-blue-400 mr-2">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none text-[#d4d4d4]"
          autoComplete="off"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;