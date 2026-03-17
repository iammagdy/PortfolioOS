import React from 'react';
import { motion } from 'framer-motion';
import { AppID } from '../../types';
import { DOCK_ITEMS } from '../../constants';

interface DockProps {
  onOpenApp: (id: AppID) => void;
  openApps: AppID[];
}

const Dock: React.FC<DockProps> = ({ onOpenApp, openApps }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]">
      <div 
        className="flex items-end gap-3 px-4 py-3 backdrop-blur-xl shadow-2xl transition-all duration-500"
        style={{
          background: 'var(--bg-dock)',
          border: 'var(--border-width) solid var(--border-color)',
          borderRadius: 'var(--dock-radius)',
        }}
      >
        {DOCK_ITEMS.map((item) => {
          const isOpen = openApps.includes(item.appId);
          const Icon = item.icon;
          
          return (
            <motion.div
              key={item.id}
              className="relative group flex flex-col items-center gap-1"
              whileHover={{ scale: 1.2, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => onOpenApp(item.appId)}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-white/10 relative overflow-hidden group-hover:brightness-110 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(200,200,200,0.8))',
                  // In darker themes, we might want this to be different, but for now we rely on the icon-filter to adjust look
                }}
              >
                <div style={{ filter: 'var(--icon-filter)' }}>
                  <Icon size={24} className="text-gray-800" />
                </div>
                
                {/* Glossy overlay - visible only in modern/default themes roughly */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
              </div>
              
              {/* Tooltip */}
              <div 
                className="absolute -top-10 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm"
                style={{
                  background: 'var(--bg-window)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)',
                  fontFamily: 'var(--font-family)',
                }}
              >
                {item.name}
              </div>

              {/* Running Indicator */}
              <div className={`w-1 h-1 rounded-full absolute -bottom-2 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: 'var(--text-color)' }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;