import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Battery, Search, Command, Trophy } from 'lucide-react';
import { format } from 'date-fns';
import { AppID } from '../../types';

interface TopBarProps {
  activeAppTitle: string;
  onOpenApp: (id: AppID) => void;
  onOpenAchievements: () => void;
  onReset: () => void;
  onLock: () => void;
  hasUnreadAchievements: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ activeAppTitle, onOpenApp, onOpenAchievements, onReset, onLock, hasUnreadAchievements }) => {
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      className="h-8 backdrop-blur-md flex items-center justify-between px-4 select-none text-sm font-medium relative z-[100] transition-colors duration-300"
      style={{
        background: 'var(--bg-bar)',
        borderBottom: 'var(--border-width) solid var(--border-color)',
        color: 'var(--text-color)',
        fontFamily: 'var(--font-family)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="relative" ref={menuRef}>
          <div 
            className="font-bold flex items-center gap-1 text-lg px-2 py-1 -ml-2 rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             <Command size={16} />
          </div>
          
          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div 
              className="absolute top-full left-0 mt-1 w-56 backdrop-blur-xl rounded shadow-xl py-1 flex flex-col z-[200]"
              style={{
                background: 'var(--bg-window)',
                border: 'var(--border-width) solid var(--border-color)',
                color: 'var(--text-color)',
                fontFamily: 'var(--font-family)',
              }}
            >
              <div className="px-4 py-2 text-xs opacity-60">PortfolioOS v2.0</div>
              <div className="h-px bg-current opacity-10 my-1" />
              <button 
                className="text-left px-4 py-1.5 hover:bg-blue-500 hover:text-white transition-colors text-sm"
                onClick={() => {
                  onOpenApp(AppID.SYSTEM_PREFERENCES);
                  setIsMenuOpen(false);
                }}
              >
                System Preferences...
              </button>
              <div className="h-px bg-current opacity-10 my-1" />
              <button 
                className="text-left px-4 py-1.5 hover:bg-blue-500 hover:text-white transition-colors text-sm"
                onClick={() => {
                  setIsMenuOpen(false);
                  onReset();
                }}
              >
                Restart...
              </button>
              <button 
                className="text-left px-4 py-1.5 hover:bg-blue-500 hover:text-white transition-colors text-sm"
                onClick={() => {
                  setIsMenuOpen(false);
                  onLock();
                }}
              >
                Lock Screen
              </button>
            </div>
          )}
        </div>
        
        <span className="font-bold">{activeAppTitle}</span>
        <div className="hidden sm:flex gap-4 font-normal opacity-80">
           <span>File</span>
           <span>Edit</span>
           <span>View</span>
           <span>Window</span>
           <span>Help</span>
        </div>
      </div>

      {/* Center - Magdy Saber Portfolio */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        <span className="text-xl font-bold opacity-50 whitespace-nowrap">
          Magdy Saber Portfolio
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Search size={16} className="opacity-80" />
        
        <div 
          className="relative cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          onClick={onOpenAchievements}
        >
          <Trophy size={16} />
          {hasUnreadAchievements && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-sm" />
          )}
        </div>

        <div className="flex items-center gap-2 opacity-80">
           <span className="hidden sm:inline text-xs opacity-80">100%</span>
           <Battery size={18} />
        </div>
        <Wifi size={16} className="opacity-80" />
        
        <div 
          className="flex items-center h-full px-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded transition-colors gap-2"
          onClick={() => onOpenApp(AppID.CALENDAR)}
          title="Open Calendar"
        >
           <span className="text-xs font-medium opacity-90">{format(time, 'EEE MMM d')}</span>
           <span className="text-xs font-medium">{format(time, 'HH:mm')}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;