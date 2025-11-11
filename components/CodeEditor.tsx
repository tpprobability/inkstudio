import React, { useState, useEffect } from 'react';
import { GeneratedCode } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface CodeEditorProps {
  file: GeneratedCode;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ file }) => {
  const [copyStatus, setCopyStatus] = useState('Copy');

  useEffect(() => {
    setCopyStatus('Copy');
  }, [file]);

  const handleCopy = () => {
    if (file) {
      navigator.clipboard.writeText(file.code);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    }
  };

  return (
    <div className="bg-ink-dark border border-ink-dark-2 rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
      <div className="flex justify-between items-center bg-ink-dark-2 p-2 border-b border-ink-gray/30 flex-shrink-0">
         <p className="text-sm font-medium text-ink-light-gray px-2">{file.fileName}</p>
        <button
            onClick={handleCopy}
            className="bg-ink-gray/30 text-ink-light-gray hover:bg-ink-gray/50 px-3 py-1 rounded-md text-xs transition-all flex items-center space-x-1.5 border border-ink-gray/50"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{copyStatus}</span>
        </button>
      </div>

        <div className="overflow-auto flex-1 code-editor-container">
          <SyntaxHighlighter
            language={file.language ? file.language.toLowerCase() : 'text'}
            style={vscDarkPlus}
            showLineNumbers
            wrapLines
            customStyle={{
                margin: 0,
                padding: '1rem',
                backgroundColor: '#0D0D0D',
                height: '100%',
                fontSize: '14px',
            }}
             codeTagProps={{
                style: {
                    fontFamily: '"Fira Code", "Fira Mono", monospace',
                },
            }}
          >
            {file.code}
          </SyntaxHighlighter>
        </div>
    </div>
  );
};

export default CodeEditor;