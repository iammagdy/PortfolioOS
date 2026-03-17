import React, { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  notification: { id: string; title: string; message: string } | null;
  onClose: () => void;
  onClick: () => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onClose, onClick }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-12 right-4 z-[9999] bg-white/90 dark:bg-stone-800/90 backdrop-blur-md border border-stone-200 dark:border-stone-700 shadow-lg rounded-lg p-3 flex items-center gap-3 w-72 cursor-pointer hover:bg-white dark:hover:bg-stone-800 transition-colors"
          onClick={onClick}
        >
          <div className="flex-shrink-0 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 p-2 rounded-full border border-yellow-200/50 dark:border-yellow-700/30">
            <Trophy size={18} className="text-yellow-600 dark:text-yellow-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-0.5">Achievement Unlocked</div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">{notification.message}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;