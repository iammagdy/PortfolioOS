import React from 'react';
import { ACHIEVEMENTS_LIST } from '../../constants';
import { Check, Lock } from 'lucide-react';

interface AchievementsProps {
  unlocked: Record<string, boolean>;
}

const Achievements: React.FC<AchievementsProps> = ({ unlocked }) => {
  return (
    <div className="h-full bg-[#f5f5f7] dark:bg-[#1e1e1e] p-6 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-stone-800 dark:text-stone-100 flex items-center gap-3">
          Achievements
          <span className="text-sm font-normal text-stone-500 bg-stone-200 dark:bg-stone-800 px-2 py-1 rounded-full">
            {Object.values(unlocked).filter(Boolean).length} / {ACHIEVEMENTS_LIST.length}
          </span>
        </h2>
        
        <div className="grid gap-3">
          {ACHIEVEMENTS_LIST.map((achievement) => {
            const isUnlocked = unlocked[achievement.id];
            
            return (
              <div 
                key={achievement.id}
                className={`
                  relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300
                  ${isUnlocked 
                    ? 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 shadow-sm' 
                    : 'bg-stone-100 dark:bg-stone-900/50 border-transparent opacity-60'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0
                    ${isUnlocked 
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500' 
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                    }
                  `}>
                    {isUnlocked ? <Check size={20} strokeWidth={3} /> : <Lock size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-semibold ${isUnlocked ? 'text-stone-900 dark:text-stone-100' : 'text-stone-500'}`}>
                      {achievement.name}
                    </span>
                    <span className={`text-sm ${isUnlocked ? 'text-stone-600 dark:text-stone-400' : 'text-stone-400 dark:text-stone-600'}`}>
                      {isUnlocked ? achievement.description : '???'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;