import React, { useState } from 'react';
import { Mail, Star, Trash2, Send, RotateCw } from 'lucide-react';

const EMAILS = [
  { id: 1, from: 'Hiring Manager', subject: 'Interview Invitation', time: '10:42 AM', preview: 'Dear John, We were impressed by your portfolio...', read: false, body: 'Dear John,\n\nWe were impressed by your portfolio and experience. We would like to invite you for an initial interview to discuss the Senior Engineer position.\n\nPlease let us know your availability.\n\nBest,\nJane Smith\nHR Director' },
  { id: 2, from: 'Tech Newsletter', subject: 'Weekly Digest: React Trends', time: 'Yesterday', preview: 'Top 5 new features coming to the ecosystem...', read: true, body: 'Here are the top 5 new features coming to the ecosystem this month. \n\n1. Enhanced Concurrency\n2. Server Components\n3. New Hooks\n...' },
  { id: 3, from: 'Project Team', subject: 'Design Assets', time: '2 days ago', preview: 'Attached are the updated assets for the mobile app...', read: true, body: 'Hi John,\n\nAttached are the updated assets for the mobile app. Please review them when you have a chance.\n\nThanks,\nMike' },
];

const EmailClient: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const activeEmail = EMAILS.find(e => e.id === selectedEmail);

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-48 bg-stone-50/50 dark:bg-stone-900/50 border-r border-stone-200 dark:border-stone-800 flex flex-col pt-4 hidden sm:flex">
        <div className="px-4 mb-4">
          <button className="w-full bg-stone-600 hover:bg-stone-700 text-white rounded-lg py-2 text-sm font-medium transition-colors shadow-sm">Compose</button>
        </div>
        <div className="space-y-1 px-2">
          <div className="flex items-center gap-3 px-3 py-2 bg-stone-200/50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-md text-sm font-medium cursor-pointer">
            <Mail size={16} /> Inbox
          </div>
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md text-sm font-medium cursor-pointer text-stone-600 dark:text-stone-400 transition-colors">
            <Send size={16} /> Sent
          </div>
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md text-sm font-medium cursor-pointer text-stone-600 dark:text-stone-400 transition-colors">
            <Star size={16} /> Starred
          </div>
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md text-sm font-medium cursor-pointer text-stone-600 dark:text-stone-400 transition-colors">
            <Trash2 size={16} /> Trash
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className={`${selectedEmail ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121212]`}>
        <div className="h-12 border-b border-stone-200 dark:border-stone-800 flex items-center px-4 justify-between bg-stone-50/30 dark:bg-stone-900/30">
           <span className="font-semibold text-stone-700 dark:text-stone-200">Inbox</span>
           <RotateCw size={14} className="text-stone-400 cursor-pointer hover:rotate-180 transition-transform duration-500" />
        </div>
        <div className="flex-1 overflow-auto">
          {EMAILS.map(email => (
            <div 
              key={email.id} 
              onClick={() => setSelectedEmail(email.id)}
              className={`p-4 border-b border-stone-100 dark:border-stone-800/50 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors ${selectedEmail === email.id ? 'bg-stone-100 dark:bg-stone-800/80 border-l-4 border-l-stone-500' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm text-stone-900 dark:text-stone-100 ${!email.read ? 'font-bold' : 'font-medium'}`}>{email.from}</span>
                <span className="text-xs text-stone-400">{email.time}</span>
              </div>
              <div className={`text-sm mb-1 text-stone-800 dark:text-stone-300 ${!email.read ? 'font-semibold' : ''}`}>{email.subject}</div>
              <div className="text-xs text-stone-500 dark:text-stone-500 line-clamp-2">{email.preview}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Detail */}
      <div className={`${!selectedEmail ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white dark:bg-[#121212]`}>
         {activeEmail ? (
           <>
            {/* Toolbar */}
            <div className="h-12 border-b border-stone-200 dark:border-stone-800 flex items-center px-4 justify-between bg-stone-50/30 dark:bg-stone-900/30">
               <button onClick={() => setSelectedEmail(null)} className="md:hidden text-stone-600 text-sm font-medium">Back</button>
               <div className="flex gap-4 text-stone-400">
                 <Trash2 size={18} className="hover:text-red-500 cursor-pointer transition-colors" />
                 <Star size={18} className="hover:text-yellow-500 cursor-pointer transition-colors" />
               </div>
            </div>
            
            <div className="p-8 max-w-3xl mx-auto w-full">
              <h2 className="text-2xl font-bold mb-6 text-stone-900 dark:text-stone-100">{activeEmail.subject}</h2>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-stone-100 dark:border-stone-800">
                <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 font-bold text-xl">
                  {activeEmail.from[0]}
                </div>
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100">{activeEmail.from}</div>
                  <div className="text-xs text-stone-500">to me</div>
                </div>
              </div>
              <div className="whitespace-pre-wrap text-base leading-relaxed text-stone-700 dark:text-stone-300 font-serif">
                {activeEmail.body}
              </div>
            </div>
           </>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-stone-300 dark:text-stone-700">
             <Mail size={64} className="mb-4 opacity-50" />
             <p>Select an email to read</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default EmailClient;