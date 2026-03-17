import React, { useState } from 'react';
import { FileSystemItem, FileType, AppID } from '../../types';
import { Folder, FileText, ChevronRight, ArrowLeft, Image as ImageIcon, FileCode } from 'lucide-react';
import { getChildren, getPath } from '../../utils/fs';

interface FinderProps {
  initialPath?: string;
  files: Record<string, FileSystemItem>;
  onNavigate: (id: string) => void;
  onOpenFile: (file: FileSystemItem) => void;
}

const Finder: React.FC<FinderProps> = ({ initialPath = 'desktop', files, onNavigate, onOpenFile }) => {
  const [currentId, setCurrentId] = useState(initialPath);
  const currentFolder = files[currentId];
  const children = getChildren(files, currentId);
  const path = getPath(files, currentId);

  const handleDoubleClick = (item: FileSystemItem) => {
    if (item.type === FileType.FOLDER) {
      setCurrentId(item.id);
    } else {
      onOpenFile(item);
    }
  };

  const goBack = () => {
    if (currentFolder.parentId && currentFolder.parentId !== 'root') {
      setCurrentId(currentFolder.parentId);
    } else if (currentFolder.parentId === 'root' && currentId !== 'desktop') {
      setCurrentId('desktop');
    }
  };

  const getIcon = (item: FileSystemItem) => {
    if (item.type === FileType.FOLDER) return <Folder className="w-12 h-12 text-stone-400 mb-2 fill-stone-400/20" />;
    if (item.name.endsWith('.png')) return <ImageIcon className="w-12 h-12 text-stone-500 mb-2" />;
    if (item.name.endsWith('.pdf')) return <FileText className="w-12 h-12 text-stone-500 mb-2" />;
    return <FileCode className="w-12 h-12 text-stone-400 mb-2" />;
  };

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-48 bg-stone-50/80 dark:bg-stone-900/50 border-r border-stone-200 dark:border-stone-800 p-4 backdrop-blur-md hidden sm:block">
        <div className="text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wider">Favorites</div>
        <ul className="space-y-1">
          {['Desktop', 'Experience', 'Projects', 'Playground'].map((name) => {
             const folder = Object.values(files).find(f => f.name === name && f.type === FileType.FOLDER);
             const isActive = folder?.id === currentId;
             return (
               <li 
                 key={name}
                 className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${isActive ? 'bg-stone-200/60 dark:bg-stone-700/60 text-stone-800 dark:text-stone-100 font-medium shadow-sm' : 'hover:bg-stone-100 dark:hover:bg-stone-800/50 text-stone-600 dark:text-stone-400'}`}
                 onClick={() => folder && setCurrentId(folder.id)}
               >
                 <Folder size={16} className={isActive ? 'text-stone-600 dark:text-stone-300' : 'text-stone-400'} />
                 <span className="text-sm">{name}</span>
               </li>
             );
          })}
        </ul>
      </div>

      {/* Main View */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar / Path Bar */}
        <div className="h-12 border-b border-stone-200 dark:border-stone-800 flex items-center px-4 gap-4 bg-white/50 dark:bg-stone-900/30">
          <div className="flex items-center gap-2">
            <button 
              onClick={goBack} 
              disabled={!currentFolder.parentId || currentFolder.id === 'desktop'}
              className="p-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
          </div>
          
          {/* Breadcrumbs - styled more like a file path */}
          <div className="flex items-center text-sm text-stone-500 dark:text-stone-400 overflow-hidden bg-stone-100/50 dark:bg-stone-800/50 px-2 py-1 rounded-md border border-stone-200/50 dark:border-stone-700/50">
             {path.slice(1).map((item, index) => (
               <React.Fragment key={item.id}>
                 {index > 0 && <ChevronRight size={12} className="mx-1 opacity-50" />}
                 <span 
                    className={`cursor-pointer hover:text-stone-800 dark:hover:text-stone-200 transition-colors ${item.id === currentId ? 'font-semibold text-stone-800 dark:text-stone-200' : ''}`}
                    onClick={() => setCurrentId(item.id)}
                 >
                   {item.name}
                 </span>
               </React.Fragment>
             ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 p-4 overflow-auto bg-white/40 dark:bg-[#121212]">
          {children.length === 0 ? (
            <div className="h-full flex items-center justify-center text-stone-400 text-sm">Folder is empty</div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 auto-rows-min">
              {children.map((child) => (
                <div 
                  key={child.id}
                  className="group flex flex-col items-center p-4 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-700/50 cursor-pointer transition-colors duration-100 border border-transparent hover:border-stone-200/50 dark:hover:border-stone-700/50"
                  onDoubleClick={() => handleDoubleClick(child)}
                >
                  <div className="transition-transform duration-200 group-hover:scale-105">
                    {getIcon(child)}
                  </div>
                  <span className="text-sm text-center font-medium break-words w-full px-1 text-stone-700 dark:text-stone-300 leading-tight">{child.name}</span>
                  <span className="text-xs text-stone-400 mt-1">{child.type === FileType.FOLDER ? `${files[child.id].children?.length || 0} items` : 'File'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finder;