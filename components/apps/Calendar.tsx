import React from 'react';
import { Calendar as CalendarIcon, Clock, Video, ChevronRight } from 'lucide-react';

const Calendar: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-sans">
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center overflow-auto">
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
          <CalendarIcon size={40} />
        </div>
        
        <h2 className="text-3xl font-bold mb-3 tracking-tight">Book a Meeting</h2>
        <p className="text-stone-500 dark:text-stone-400 max-w-md mb-10 leading-relaxed">
          I'm currently open to new opportunities and collaborations. Select a time slot below to schedule a 30-minute introductory call.
        </p>
        
        {/* Placeholder for Calendar Implementation */}
        <div className="w-full max-w-lg border border-stone-200 dark:border-stone-800 rounded-2xl p-8 bg-stone-50 dark:bg-stone-900/50 border-dashed border-2 flex flex-col items-center gap-6 transition-colors hover:bg-stone-100 dark:hover:bg-stone-900">
           <div className="flex items-center gap-3 text-stone-400">
             <Clock size={24} />
             <span className="font-mono text-sm uppercase tracking-widest">Availability Placeholder</span>
           </div>
           
           <div className="grid grid-cols-3 gap-3 w-full opacity-50 pointer-events-none select-none filter blur-[1px]">
             {[9, 10, 11, 13, 14, 15].map(hour => (
               <div key={hour} className="py-2 px-4 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-medium">
                 {hour}:00
               </div>
             ))}
           </div>

           <div className="text-xs text-stone-500 bg-white dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 shadow-sm">
             Calendar API integration required
           </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
          <button className="flex items-center justify-between w-full px-4 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium hover:opacity-90 transition-opacity">
            <span>Send me an email instead</span>
            <ChevronRight size={16} />
          </button>
          
          <div className="flex items-center justify-center gap-2 text-xs text-stone-400 mt-2">
            <Video size={12} />
            <span>Meetings are typically held via Google Meet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;