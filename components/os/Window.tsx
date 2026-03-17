import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { WindowState } from '../../types';

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onResize: (id: string, width: number, height: number) => void;
  onMove: (id: string, x: number, y: number) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ 
  window, 
  isActive, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus, 
  onResize,
  onMove,
  children 
}) => {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleResizeStart = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    onFocus(window.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = window.size.width;
    const startHeight = window.size.height;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
      onResize(window.id, newWidth, newHeight);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <motion.div
      drag={!window.isMaximized && !isResizing}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.05}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ 
        scale: window.isMinimized ? 0 : window.isMaximized ? 1 : 1, 
        opacity: window.isMinimized ? 0 : 1,
        y: window.isMinimized ? 200 : 0,
        x: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100%' : window.size.width,
        height: window.isMaximized ? '100%' : window.size.height,
      }}
      // Dynamic styles applied directly
      style={{
        zIndex: window.zIndex,
        borderRadius: window.isMaximized ? '0' : 'var(--radius)',
        // We handle background via className/style below to mix with backdrop
      }}
      transition={
        isResizing 
          ? { duration: 0 } 
          : { type: "spring", stiffness: 300, damping: 30 }
      }
      // Use standard class for theme variables
      className={`absolute flex flex-col overflow-hidden backdrop-blur-xl ${isActive ? 'z-50' : 'z-0'}`}
      onPointerDown={() => onFocus(window.id)}
      onDragEnd={(e, info) => {
        onMove(window.id, window.position.x + info.offset.x, window.position.y + info.offset.y);
      }}
      ref={windowRef}
    >
      {/* Background container that uses variables */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-300"
        style={{
          backgroundColor: isActive ? 'var(--bg-window-active)' : 'var(--bg-window)',
          border: window.isMaximized ? 'none' : 'var(--border-width) solid var(--border-color)',
          borderRadius: window.isMaximized ? '0' : 'var(--radius)',
          boxShadow: 'var(--shadow)',
        }}
      />

      {/* Title Bar */}
      <div 
        className="h-10 flex items-center justify-between px-4 select-none relative z-10 flex-shrink-0"
        style={{
           borderBottom: '1px solid var(--border-color)',
           color: 'var(--text-color)',
           fontFamily: 'var(--font-family)',
        }}
        onPointerDown={(e) => {
          dragControls.start(e);
          onFocus(window.id);
        }}
      >
        <div className="flex gap-2 group">
          <button onClick={(e) => { e.stopPropagation(); onClose(window.id); }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors text-black/50 group-hover:text-black/80 shadow-sm border border-black/10">
            <X size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }} className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center transition-colors text-black/50 group-hover:text-black/80 shadow-sm border border-black/10">
            <Minus size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors text-black/50 group-hover:text-black/80 shadow-sm border border-black/10">
            <Maximize2 size={6} className="opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <span className="text-sm font-medium opacity-90">{window.title}</span>
        <div className="w-12"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative z-10">
        {children}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-50 flex items-end justify-end p-1"
          onPointerDown={handleResizeStart}
        >
           <svg width="8" height="8" viewBox="0 0 10 10" className="opacity-30" style={{ fill: 'var(--text-color)' }}>
              <path d="M10 10 L0 10 L10 0 Z" />
           </svg>
        </div>
      )}
    </motion.div>
  );
};

export default Window;