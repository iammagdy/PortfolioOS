import React from 'react';
import { FileSystemItem } from '../../types';

interface TextEditorProps {
  file: FileSystemItem | null;
}

const TextEditor: React.FC<TextEditorProps> = ({ file }) => {
  if (!file) return <div className="p-4 text-gray-500">No file open</div>;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-mono">
       <div className="p-8 max-w-2xl mx-auto w-full overflow-auto">
         {file.name.endsWith('.md') ? (
            <div className="prose dark:prose-invert">
              {file.content?.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mb-3">{line.replace('## ', '')}</h2>;
                if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>;
                return <p key={i} className="mb-2 min-h-[1em]">{line}</p>;
              })}
            </div>
         ) : (
           <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{file.content}</pre>
         )}
       </div>
    </div>
  );
};

export default TextEditor;
