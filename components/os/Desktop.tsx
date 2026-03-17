import React, { useRef, useState, useEffect } from 'react';
import { FileSystemItem, FileType, AppID } from '../../types';
import { Folder, FileText, Image as ImageIcon, Trash2, Mail, Terminal, Gamepad2, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';

interface DesktopProps {
  files: Record<string, FileSystemItem>;
  selectedIds: string[];
  onSelect: (id: string, multi: boolean) => void;
  onOpen: (item: FileSystemItem) => void;
}

const Desktop: React.FC<DesktopProps> = ({ files, selectedIds, onSelect, onOpen }) => {
  const desktopItems = files['desktop'].children?.map(id => files[id]) || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // Initialize positions
  useEffect(() => {
    if (!desktopItems.length) return;

    const newPositions = { ...positions };
    let hasChanges = false;
    
    // Layout configuration
    const startX = 20;
    const startY = 50; // Accounting for TopBar
    const itemHeight = 110;
    const itemWidth = 100;
    const containerHeight = window.innerHeight; // Use window height for calculation

    let currentColumn = 0;
    let currentRow = 0;

    // Position items that don't have a position yet
    desktopItems.forEach((item) => {
      if (!newPositions[item.id]) {
        // Find next spot
        let y = startY + (currentRow * itemHeight);
        let x = startX + (currentColumn * itemWidth);

        // Wrap to next column if vertical space is full
        if (y + itemHeight > containerHeight - 80) { // -80 for dock space
          currentColumn++;
          currentRow = 0;
          y = startY;
          x = startX + (currentColumn * itemWidth);
        }

        newPositions[item.id] = { x, y };
        hasChanges = true;
        currentRow++;
      }
    });

    if (hasChanges) {
      setPositions(newPositions);
    }
  }, [desktopItems.length]); // Re-run when item count changes

  const getIcon = (item: FileSystemItem) => {
    // Custom App Icons
    if (item.appId === AppID.EMAIL) return <Mail className="w-12 h-12 text-stone-200 drop-shadow-md" />;
    if (item.appId === AppID.TERMINAL) return <Terminal className="w-12 h-12 text-gray-200 drop-shadow-md" />;
    if (item.appId === AppID.MINESWEEPER) return <Gamepad2 className="w-12 h-12 text-stone-200 drop-shadow-md" />;
    if (item.appId === AppID.TRASH) return <Trash2 className="w-12 h-12 text-stone-200 drop-shadow-md" />;
    
    // File Types
    if (item.type === FileType.FOLDER) return <Folder className="w-12 h-12 text-blue-300 fill-blue-300/20 drop-shadow-md" />;
    if (item.name.endsWith('.pdf')) return <FileText className="w-12 h-12 text-red-300 drop-shadow-md" />;
    if (item.name.endsWith('.png')) return <ImageIcon className="w-12 h-12 text-purple-300 drop-shadow-md" />;
    if (item.name.endsWith('.txt')) return <FileText className="w-12 h-12 text-gray-300 drop-shadow-md" />;
    
    return <FileCode className="w-12 h-12 text-gray-300" />;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.target === containerRef.current) {
      onSelect('', false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      onPointerDown={handlePointerDown}
    >
      {desktopItems.map(item => {
         const isSelected = selectedIds.includes(item.id);
         const pos = positions[item.id] || { x: 20, y: 50 }; // Default fallback

         return (
           <motion.div
             key={item.id}
             drag
             dragMomentum={false}
             initial={false}
             animate={{ x: pos.x, y: pos.y }}
             transition={{ type: "spring", stiffness: 500, damping: 30 }}
             onDragStart={() => setDraggedItemId(item.id)}
             onDragEnd={(_, info) => {
               const newX = pos.x + info.offset.x;
               const newY = pos.y + info.offset.y;
               setPositions(prev => ({
                 ...prev,
                 [item.id]: { x: newX, y: newY }
               }));
               setDraggedItemId(null);
             }}
             className={`absolute w-24 flex flex-col items-center justify-start gap-1 p-1 rounded-md border border-transparent transition-colors duration-200 group
               ${isSelected ? 'bg-white/20 border-white/30 backdrop-blur-md shadow-sm' : 'hover:bg-white/10'}
               ${draggedItemId === item.id ? 'z-50 cursor-grabbing' : 'cursor-default'}
             `}
             onPointerDown={(e) => {
               // Prevent drag from propagating to container click
               onSelect(item.id, e.metaKey || e.ctrlKey);
             }}
             onDoubleClick={(e) => {
               e.stopPropagation();
               onOpen(item);
             }}
           >
             <div 
               className="transition-transform group-hover:scale-105 shrink-0"
               style={{ filter: 'var(--icon-filter)' }}
             >
               {getIcon(item)}
             </div>
             <span 
               className={`text-xs font-medium text-center px-2 py-0.5 rounded w-full break-words leading-tight
                 ${isSelected ? 'bg-blue-600 text-white' : 'text-white drop-shadow-md shadow-black'}
               `}
               style={{ 
                 textShadow: isSelected ? 'none' : '0 1px 2px rgba(0,0,0,0.8)',
                 fontFamily: 'var(--font-family)',
               }}
             >
               {item.name}
             </span>
           </motion.div>
         );
      })}
    </div>
  );
};

export default Desktop;