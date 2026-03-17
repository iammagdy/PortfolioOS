import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_FILES, WALLPAPERS, ACHIEVEMENTS_LIST, THEMES } from './constants';
import { FileSystemItem, WindowState, AppID, FileType, ThemeId } from './types';
import Desktop from './components/os/Desktop';
import TopBar from './components/os/TopBar';
import Dock from './components/os/Dock';
import Window from './components/os/Window';
import Screensaver from './components/os/Screensaver';
import LockScreen from './components/os/LockScreen';
import Finder from './components/apps/Finder';
import Terminal from './components/apps/Terminal';
import TextEditor from './components/apps/TextEditor';
import Minesweeper from './components/apps/Minesweeper';
import Snake from './components/apps/Snake';
import EmailClient from './components/apps/Email';
import PDFViewer from './components/apps/PDFViewer';
import SystemPreferences from './components/apps/SystemPreferences';
import Achievements from './components/apps/Achievements';
import Calendar from './components/apps/Calendar';
import Notification from './components/os/Notification';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

// App Mapping
const APP_COMPONENTS: Record<string, any> = {
  [AppID.FINDER]: Finder,
  [AppID.TERMINAL]: Terminal,
  [AppID.TEXT_EDITOR]: TextEditor,
  [AppID.MINESWEEPER]: Minesweeper,
  [AppID.SNAKE]: Snake,
  [AppID.EMAIL]: EmailClient,
  [AppID.PDF_VIEWER]: PDFViewer,
  [AppID.SYSTEM_PREFERENCES]: SystemPreferences,
  [AppID.ACHIEVEMENTS]: Achievements,
  [AppID.CALENDAR]: Calendar,
  [AppID.IMAGE_VIEWER]: ({ file }: { file: FileSystemItem }) => (
    <div className="h-full flex items-center justify-center bg-black">
      <img src={file.src} alt={file.name} className="max-w-full max-h-full object-contain" />
    </div>
  ),
  [AppID.TRASH]: Finder // Use Finder for Trash to show files
};

const DEFAULT_WINDOW_SIZE = { width: 800, height: 600 };

export default function App() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [windows, setWindows] = useState<WindowState[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_os_windows');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [activeWindowId, setActiveWindowId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem('portfolio_os_active_window');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [selectedDesktopIds, setSelectedDesktopIds] = useState<string[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_os_zindex');
      return saved ? JSON.parse(saved) : 10;
    } catch (e) {
      return 10;
    }
  });

  useEffect(() => {
    localStorage.setItem('portfolio_os_windows', JSON.stringify(windows));
  }, [windows]);

  useEffect(() => {
    localStorage.setItem('portfolio_os_active_window', JSON.stringify(activeWindowId));
  }, [activeWindowId]);

  useEffect(() => {
    localStorage.setItem('portfolio_os_zindex', JSON.stringify(zIndexCounter));
  }, [zIndexCounter]);
  
  // Settings State
  const [currentWallpaper, setCurrentWallpaper] = useState(WALLPAPERS[0].value);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('modern');
  const [screensaverEnabled, setScreensaverEnabled] = useState(true);
  const [screensaverTimeout, setScreensaverTimeout] = useState(60000); // 1 minute
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isLocked, setIsLocked] = useState(true);
  
  // Alert State
  const [alertConfig, setAlertConfig] = useState<{ message: string; isOpen: boolean }>({ message: '', isOpen: false });

  // Achievements State - Persisted
  const [achievements, setAchievements] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('portfolio_os_achievements');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [notification, setNotification] = useState<{ id: string; title: string; message: string } | null>(null);
  
  // Apply Theme
  useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Persist Achievements
  useEffect(() => {
    localStorage.setItem('portfolio_os_achievements', JSON.stringify(achievements));
  }, [achievements]);
  
  // Tracking Stats
  const [stats, setStats] = useState({
    openedFiles: new Set<string>(),
    openedApps: new Set<string>(),
    trashFilesOpened: new Set<string>(),
    gameRestarts: new Map<string, number>(),
  });

  // -- System Reset --
  const handleSystemReset = () => {
    if (window.confirm('Are you sure you want to restart? This will reset your session and clear all achievements.')) {
      localStorage.removeItem('portfolio_os_achievements');
      localStorage.removeItem('portfolio_os_windows');
      localStorage.removeItem('portfolio_os_active_window');
      localStorage.removeItem('portfolio_os_zindex');
      window.location.reload();
    }
  };
  
  // -- Achievements Logic --
  
  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      if (prev[id]) return prev; // Already unlocked
      
      // Find achievement details
      const details = ACHIEVEMENTS_LIST.find(a => a.id === id);
      if (details) {
        setNotification({
          id,
          title: 'Achievement Unlocked',
          message: details.name
        });
      }
      
      return { ...prev, [id]: true };
    });
  }, []);

  // First Boot Achievement
  useEffect(() => {
    // Only unlock first boot if we are logged in
    if (!isLocked) {
      unlockAchievement('first_boot');
    }
  }, [unlockAchievement, isLocked]);

  // -- Screensaver Logic --
  const resetIdleTimer = useCallback(() => {
    setLastActivity(Date.now());
    if (isScreensaverActive) {
      setIsScreensaverActive(false);
    }
  }, [isScreensaverActive]);

  useEffect(() => {
    if (!screensaverEnabled || isLocked) return;

    const checkIdle = () => {
      if (Date.now() - lastActivity > screensaverTimeout) {
        setIsScreensaverActive(true);
      }
    };

    const interval = setInterval(checkIdle, 1000);
    
    // Add event listeners for activity
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
    };
  }, [screensaverEnabled, screensaverTimeout, lastActivity, resetIdleTimer, isLocked]);


  // -- Window Management --

  const openWindow = (appId: AppID, contentId?: string) => {
    // Achievements tracking: Apps
    setStats(prev => {
      const next = { ...prev };
      next.openedApps.add(appId);
      
      // Check Gamer
      if (next.openedApps.has(AppID.MINESWEEPER) && next.openedApps.has(AppID.SNAKE)) {
        unlockAchievement('gamer');
      }
      return next;
    });

    // Reference Check
    if (appId === AppID.EMAIL) {
      unlockAchievement('reference_check');
    }

    // Check if already open
    const existing = windows.find(w => w.appId === appId && w.contentId === contentId);
    if (existing) {
      focusWindow(existing.id);
      return;
    }

    const newWindow: WindowState = {
      id: Math.random().toString(36).substr(2, 9),
      appId,
      contentId,
      title: contentId ? files[contentId].name : getAppName(appId),
      isMinimized: false,
      isMaximized: false,
      zIndex: zIndexCounter + 1,
      position: { x: 50 + (windows.length * 20), y: 50 + (windows.length * 20) },
      size: DEFAULT_WINDOW_SIZE,
    };

    setZIndexCounter(prev => prev + 1);
    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 } : w));
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    focusWindow(id);
  };

  const resizeWindow = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, size: { width, height } } : w));
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  };

  // -- File System Interaction --

  const openFile = (item: FileSystemItem) => {
    // Achievements tracking: Files
    setStats(prev => {
      const next = { ...prev };
      next.openedFiles.add(item.id);
      
      // Desktop Explorer
      if (next.openedFiles.size >= 5) {
        unlockAchievement('desktop_explorer');
      }
      
      // Context Matters
      if (next.openedFiles.has('bio_txt') && next.openedFiles.has('values_md')) {
        unlockAchievement('context_matters');
      }
      
      // Trash Explorer
      if (item.parentId === 'trash_bin') {
        next.trashFilesOpened.add(item.id);
        const trashChildren = files['trash_bin'].children || [];
        if (trashChildren.length > 0 && next.trashFilesOpened.size >= trashChildren.length) {
          unlockAchievement('trash_explorer');
        }
      }
      
      return next;
    });

    // Actually Read It
    if (item.id === 'file_cv') {
      unlockAchievement('actually_read_it');
    }

    // Check for locks
    if (item.lockedMessage) {
      setAlertConfig({ message: item.lockedMessage, isOpen: true });
      return;
    }

    // Special handling for Trash app to ensure it opens the Trash window
    if (item.appId === AppID.TRASH) {
       openWindow(AppID.TRASH, item.id);
       return;
    }

    if (item.type === FileType.FOLDER) {
      const finderOpen = windows.find(w => w.appId === AppID.FINDER);
      if (finderOpen) {
        focusWindow(finderOpen.id);
      } else {
        openWindow(AppID.FINDER, item.id);
      }
      return;
    }

    if (item.appId) {
      openWindow(item.appId, item.id);
    } else {
      openWindow(AppID.TEXT_EDITOR, item.id);
    }
  };

  const handleDesktopSelect = (id: string, multi: boolean) => {
    if (!id) {
      setSelectedDesktopIds([]);
      return;
    }
    if (multi) {
      setSelectedDesktopIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else {
      setSelectedDesktopIds([id]);
    }
  };

  const handleAppInteraction = (type: string, data?: any) => {
    if (type === 'terminal_command') {
      unlockAchievement('command_line_curious');
    }
    if (type === 'terminal_help') {
      unlockAchievement('help_actually');
    }
    if (type === 'minesweeper_loss') {
      unlockAchievement('first_mine');
    }
    if (type === 'minesweeper_win') {
      unlockAchievement('clean_board');
    }
    if (type === 'game_restart') {
      const gameId = data; // 'snake' or 'minesweeper'
      setStats(prev => {
        const next = { ...prev };
        const count = (next.gameRestarts.get(gameId) || 0) + 1;
        next.gameRestarts.set(gameId, count);
        
        if (count >= 1) { // Played more than once (initial play + 1 restart)
          unlockAchievement('just_one_more');
        }
        return next;
      });
    }
  };

  const getAppName = (id: AppID) => {
    switch (id) {
      case AppID.FINDER: return 'Finder';
      case AppID.TERMINAL: return 'Terminal';
      case AppID.EMAIL: return 'Mail';
      case AppID.MINESWEEPER: return 'Minesweeper';
      case AppID.SNAKE: return 'Snake';
      case AppID.TEXT_EDITOR: return 'Text Editor';
      case AppID.IMAGE_VIEWER: return 'Preview';
      case AppID.PDF_VIEWER: return 'PDF Viewer';
      case AppID.SYSTEM_PREFERENCES: return 'Settings';
      case AppID.ACHIEVEMENTS: return 'Achievements';
      case AppID.TRASH: return 'Trash';
      case AppID.CALENDAR: return 'Calendar';
      default: return 'App';
    }
  };

  const getActiveAppTitle = () => {
    if (!activeWindowId) return 'Finder';
    const win = windows.find(w => w.id === activeWindowId);
    return win ? getAppName(win.appId) : 'Finder';
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-cover bg-center text-sm font-sans flex flex-col relative select-none transition-all duration-700 ease-in-out"
      style={{ backgroundImage: currentWallpaper }}
    >
      <TopBar 
        activeAppTitle={getActiveAppTitle()} 
        onOpenApp={openWindow}
        onOpenAchievements={() => openWindow(AppID.ACHIEVEMENTS)}
        onReset={handleSystemReset}
        onLock={() => setIsLocked(true)}
        hasUnreadAchievements={false} // Simple implementation: glow resets on click essentially
      />
      
      <div className="flex-1 relative overflow-hidden">
        <Desktop 
          files={files} 
          selectedIds={selectedDesktopIds} 
          onSelect={handleDesktopSelect} 
          onOpen={openFile}
        />

        <AnimatePresence>
          {windows.map(win => {
            const AppComponent = APP_COMPONENTS[win.appId];
            const file = win.contentId ? files[win.contentId] : null;
            
            // Determine initial path for Finder-based apps
            let initialPath = 'desktop';
            if (win.appId === AppID.TRASH) {
              initialPath = 'trash_bin';
            } else if (win.appId === AppID.FINDER) {
              initialPath = win.contentId || 'desktop';
            }

            return (
              <Window
                key={win.id}
                window={win}
                isActive={activeWindowId === win.id}
                onClose={closeWindow}
                onFocus={focusWindow}
                onMinimize={toggleMinimize}
                onMaximize={toggleMaximize}
                onResize={resizeWindow}
                onMove={moveWindow}
              >
                <AppComponent 
                  file={file} 
                  files={files} 
                  initialPath={initialPath}
                  onNavigate={(id: string) => {}}
                  onOpenFile={openFile}
                  onOpenApp={openWindow}
                  onInteraction={handleAppInteraction}
                  
                  // Settings Props
                  currentWallpaper={currentWallpaper}
                  onWallpaperChange={setCurrentWallpaper}
                  screensaverEnabled={screensaverEnabled}
                  onScreensaverToggle={setScreensaverEnabled}
                  screensaverTimeout={screensaverTimeout}
                  onScreensaverTimeoutChange={setScreensaverTimeout}
                  currentTheme={currentTheme}
                  onThemeChange={setCurrentTheme}

                  // Achievements Props
                  unlocked={achievements}
                />
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      <Dock 
        openApps={windows.map(w => w.appId)} 
        onOpenApp={(appId) => openWindow(appId)}
      />

      <Notification 
        notification={notification} 
        onClose={() => setNotification(null)}
        onClick={() => {
          setNotification(null);
          openWindow(AppID.ACHIEVEMENTS);
        }}
      />

      {/* System Alert Modal */}
      <AnimatePresence>
        {alertConfig.isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-white/90 dark:bg-stone-800/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-xl p-6 w-80 max-w-full text-center flex flex-col items-center gap-4"
              style={{ background: 'var(--bg-window-active)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--bg-bar)' }}
              >
                 <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Access Denied</h3>
                <p className="opacity-80 leading-relaxed">{alertConfig.message}</p>
              </div>
              <button 
                onClick={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                className="w-full py-2 bg-stone-800 hover:bg-stone-900 text-white font-medium rounded-lg transition-colors"
                style={{ background: 'var(--text-color)', color: 'var(--bg-window)' }}
              >
                OK
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLocked && (
          <LockScreen 
            onUnlock={() => setIsLocked(false)} 
            wallpaper={currentWallpaper} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScreensaverActive && !isLocked && (
          <Screensaver onWake={resetIdleTimer} />
        )}
      </AnimatePresence>
    </div>
  );
}