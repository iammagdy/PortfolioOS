import React, { useState, useEffect } from 'react';
import { User, ArrowRight, Wifi, Battery, Disc } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface LockScreenProps {
  onUnlock: () => void;
  wallpaper: string;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, wallpaper }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-cover bg-center flex flex-col items-center justify-between text-white overflow-hidden font-sans"
      style={{ backgroundImage: wallpaper }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />

      {/* Top Bar Status */}
      <div className="w-full p-4 px-8 flex justify-end items-center gap-4 relative z-10 text-sm font-medium tracking-wide text-white/90">
         <span>{format(time, 'EEE MMM d h:mm aa')}</span>
      </div>

      {/* Center Login Area */}
      <div className="relative z-10 flex flex-col items-center gap-8 mt-[-100px] w-full max-w-sm">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative group cursor-pointer"
          onClick={onUnlock}
        >
           <div className="w-32 h-32 rounded-full bg-gray-200/20 shadow-2xl flex items-center justify-center overflow-hidden border border-white/20 relative">
              <User size={64} className="text-white/90" />
           </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-6 w-full"
        >
           <h2 className="text-2xl font-bold tracking-tight text-shadow-sm text-white">Guest User</h2>
           
           <div className="relative w-48 group">
             <button 
               onClick={onUnlock}
               className="w-full flex items-center justify-between pl-4 pr-1 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 rounded-full transition-all active:scale-95 group-hover:shadow-lg"
             >
               <span className="text-sm font-medium text-white/90">Enter Portfolio</span>
               <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <ArrowRight size={14} />
               </div>
             </button>
           </div>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 pb-16 flex flex-col items-center gap-2 text-white/60"
      >
         <div className="flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors opacity-70 hover:opacity-100">
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors">
               <span className="text-lg leading-none pb-1">✕</span>
            </div>
            <span className="text-xs font-medium tracking-wide">Cancel</span>
         </div>
      </motion.div>
    </motion.div>
  );
};

export default LockScreen;