import React from 'react';
import { Download } from 'lucide-react';

const PDFViewer: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-stone-200 dark:bg-stone-900">
      <div className="h-12 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-4 shadow-sm z-10">
        <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Resume.pdf</span>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-stone-600 hover:bg-stone-700 text-white rounded text-xs font-medium transition-colors">
          <Download size={14} /> Download
        </button>
      </div>
      <div className="flex-1 overflow-auto p-8 flex justify-center">
        <div className="w-full max-w-[800px] min-h-[1100px] bg-white shadow-2xl p-16 text-stone-800">
          {/* Resume Content */}
          <header className="border-b-2 border-stone-900 pb-8 mb-10">
            <h1 className="text-5xl font-bold mb-3 text-stone-900 tracking-tight">JOHN DOE</h1>
            <p className="text-xl text-stone-600 font-light tracking-wide">SENIOR SOFTWARE ENGINEER</p>
          </header>

          <section className="mb-10">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase border-b border-stone-200 pb-2 mb-4 text-stone-500">Professional Profile</h2>
            <p className="text-stone-700 leading-relaxed">
              Results-oriented Senior Software Engineer with a proven track record of delivering scalable web applications. Expertise in React, Node.js, and cloud infrastructure. Dedicated to writing clean, maintainable code and solving complex problems with simple, elegant solutions.
            </p>
          </section>

          <div className="grid grid-cols-3 gap-10">
             <div className="col-span-2">
                <section className="mb-10">
                  <h2 className="text-sm font-bold tracking-[0.2em] uppercase border-b border-stone-200 pb-2 mb-4 text-stone-500">Experience</h2>
                  
                  <div className="mb-8">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg">Tech Giant Corp</h3>
                      <span className="text-sm text-stone-500 font-medium">2021 - Present</span>
                    </div>
                    <p className="text-sm font-bold text-stone-600 mb-3">Senior Software Engineer</p>
                    <ul className="list-disc list-outside ml-4 text-sm text-stone-700 space-y-2 leading-relaxed">
                      <li>Architected and launched a new analytics platform serving 50k+ daily users.</li>
                      <li>Optimized frontend performance, improving Core Web Vitals by 40%.</li>
                      <li>Mentored 3 junior developers to promotion level.</li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg">Innovate Inc</h3>
                      <span className="text-sm text-stone-500 font-medium">2018 - 2021</span>
                    </div>
                    <p className="text-sm font-bold text-stone-600 mb-3">Full Stack Developer</p>
                    <ul className="list-disc list-outside ml-4 text-sm text-stone-700 space-y-2 leading-relaxed">
                      <li>Developed full-stack features using React, Node.js, and PostgreSQL.</li>
                      <li>Integrated third-party payment gateways ensuring PCI compliance.</li>
                      <li>Collaborated with design team to implement a consistent design system.</li>
                    </ul>
                  </div>
                </section>
             </div>

             <div className="col-span-1">
               <section className="mb-10">
                 <h2 className="text-sm font-bold tracking-[0.2em] uppercase border-b border-stone-200 pb-2 mb-4 text-stone-500">Expertise</h2>
                 <div className="space-y-4">
                   <div>
                     <div className="font-bold text-sm mb-1">Languages</div>
                     <div className="text-sm text-stone-600">JavaScript, TypeScript, Python, SQL</div>
                   </div>
                   <div>
                     <div className="font-bold text-sm mb-1">Frameworks</div>
                     <div className="text-sm text-stone-600">React, Next.js, Node.js, Express</div>
                   </div>
                   <div>
                     <div className="font-bold text-sm mb-1">Tools</div>
                     <div className="text-sm text-stone-600">Git, Docker, AWS, Figma</div>
                   </div>
                 </div>
               </section>

               <section className="mb-8">
                 <h2 className="text-sm font-bold tracking-[0.2em] uppercase border-b border-stone-200 pb-2 mb-4 text-stone-500">Education</h2>
                 <div className="mb-4">
                   <div className="font-bold">State University</div>
                   <div className="text-sm">BS Computer Science</div>
                   <div className="text-xs text-stone-500 mt-1">2014 - 2018</div>
                 </div>
               </section>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;