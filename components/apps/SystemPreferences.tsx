import React, { useState } from 'react';
import { Monitor, Image as ImageIcon, Clock, Paintbrush } from 'lucide-react';
import { WALLPAPERS, THEMES } from '../../constants';
import { ThemeId } from '../../types';

interface SystemPreferencesProps {
  currentWallpaper: string;
  onWallpaperChange: (value: string) => void;
  screensaverEnabled: boolean;
  onScreensaverToggle: (enabled: boolean) => void;
  screensaverTimeout: number;
  onScreensaverTimeoutChange: (ms: number) => void;
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

const SystemPreferences: React.FC<SystemPreferencesProps> = ({ 
  currentWallpaper, 
  onWallpaperChange,
  screensaverEnabled,
  onScreensaverToggle,
  screensaverTimeout,
  onScreensaverTimeoutChange,
  currentTheme,
  onThemeChange
}) => {
  const [activeTab, setActiveTab] = useState<'wallpaper' | 'screensaver' | 'theme'>('theme');

  return (
    <div className="flex h-full text-gray-900 dark:text-white" style={{ background: 'var(--bg-window)', color: 'var(--text-color)' }}>
      {/* Sidebar */}
      <div className="w-48 border-r p-4 pt-6" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-bar)' }}>
        <div className="text-xs font-bold mb-4 px-2 uppercase tracking-wide opacity-50">Settings</div>
        <ul className="space-y-1">
          <li 
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors ${activeTab === 'theme' ? 'bg-black/5 dark:bg-white/10 shadow-sm opacity-100' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70'}`}
            onClick={() => setActiveTab('theme')}
          >
            <Paintbrush size={18} />
            Appearance
          </li>
          <li 
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors ${activeTab === 'wallpaper' ? 'bg-black/5 dark:bg-white/10 shadow-sm opacity-100' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70'}`}
            onClick={() => setActiveTab('wallpaper')}
          >
            <ImageIcon size={18} />
            Wallpaper
          </li>
          <li 
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors ${activeTab === 'screensaver' ? 'bg-black/5 dark:bg-white/10 shadow-sm opacity-100' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70'}`}
            onClick={() => setActiveTab('screensaver')}
          >
            <Monitor size={18} />
            Screensaver
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        
        {activeTab === 'theme' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Appearance</h2>
            <div className="grid gap-4 max-w-2xl">
               {THEMES.map(theme => (
                 <div 
                   key={theme.id}
                   onClick={() => onThemeChange(theme.id)}
                   className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${currentTheme === theme.id ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-transparent bg-black/5 dark:bg-white/5 hover:bg-black/10'}`}
                   style={{ borderColor: currentTheme === theme.id ? 'var(--text-color)' : 'transparent' }}
                 >
                    <div>
                      <div className="font-bold text-lg">{theme.name}</div>
                      <div className="text-sm opacity-70">{theme.description}</div>
                    </div>
                    {currentTheme === theme.id && (
                      <div className="w-4 h-4 rounded-full bg-blue-500" style={{ background: 'var(--text-color)' }} />
                    )}
                 </div>
               ))}
            </div>
            
            <div className="mt-8 p-4 rounded-lg bg-yellow-100/50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-sm">
               Note: Themes change the visual language of the entire OS including window borders, fonts, and shadows.
            </div>
          </div>
        )}

        {activeTab === 'wallpaper' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Wallpaper</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {WALLPAPERS.map((wp) => (
                <div key={wp.id} className="group">
                  <div 
                    className={`aspect-video rounded-lg shadow-sm cursor-pointer border-4 transition-all ${currentWallpaper === wp.value ? 'border-blue-500' : 'border-transparent hover:border-gray-300'}`}
                    style={{ background: wp.value, backgroundSize: 'cover', backgroundPosition: 'center', borderColor: currentWallpaper === wp.value ? 'var(--text-color)' : 'transparent' }}
                    onClick={() => onWallpaperChange(wp.value)}
                  />
                  <div className="mt-2 text-center text-sm font-medium opacity-80">{wp.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'screensaver' && (
          <div>
             <h2 className="text-2xl font-semibold mb-6">Screensaver</h2>
             
             <div className="rounded-xl p-6 shadow-sm border max-w-lg" style={{ background: 'var(--bg-window-active)', borderColor: 'var(--border-color)' }}>
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/10 dark:bg-white/10">
                     <Clock size={20} />
                   </div>
                   <div>
                     <div className="font-medium">Enable Screensaver</div>
                     <div className="text-xs opacity-60">Show after inactivity</div>
                   </div>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={screensaverEnabled} onChange={(e) => onScreensaverToggle(e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                 </label>
               </div>

               <div className={`transition-opacity duration-300 ${!screensaverEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                 <label className="block text-sm font-medium mb-2 opacity-80">Wait time</label>
                 <select 
                   value={screensaverTimeout}
                   onChange={(e) => onScreensaverTimeoutChange(Number(e.target.value))}
                   className="w-full p-2 rounded-md border bg-transparent"
                   style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
                 >
                   <option value={30000}>30 Seconds (Test)</option>
                   <option value={60000}>1 Minute</option>
                   <option value={300000}>5 Minutes</option>
                   <option value={900000}>15 Minutes</option>
                   <option value={1800000}>30 Minutes</option>
                 </select>
                 <p className="mt-2 text-xs opacity-60">
                   The screensaver will display a drifting clock animation.
                 </p>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemPreferences;