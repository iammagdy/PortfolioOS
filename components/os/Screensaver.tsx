import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface ScreensaverProps {
  onWake: () => void;
}

const Screensaver: React.FC<ScreensaverProps> = ({ onWake }) => {
  const [time, setTime] = useState(new Date());
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Move clock every 10 seconds
    const moveTimer = setInterval(() => {
      setPosition({
        x: Math.random() * 80 + 10, // Keep within 10-90%
        y: Math.random() * 80 + 10
      });
    }, 10000);
    return () => clearInterval(moveTimer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[9999] bg-black cursor-none flex items-center justify-center overflow-hidden"
      onClick={onWake}
      onMouseMove={onWake}
      onKeyDown={onWake}
    >
      <motion.div
        className="absolute text-center"
        animate={{ 
          left: `${position.x}%`, 
          top: `${position.y}%` 
        }}
        transition={{ duration: 5, ease: "easeInOut" }}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="text-8xl font-thin text-white/80 font-mono tracking-wider">
          {format(time, 'HH:mm')}
        </div>
        <div className="text-xl text-white/50 mt-4 font-light">
           PortfolioOS
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Screensaver;