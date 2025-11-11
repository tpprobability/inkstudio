import React from 'react';
import { GeneratedCode } from '../types';

interface FileExplorerProps {
    files: GeneratedCode[];
    activeFile: string | null;
    onFileSelect: (fileName: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files, activeFile, onFileSelect }) => {
    return (
        <div>
            <h2 className="text-sm font-semibold text-ink-gray uppercase tracking-widest mb-3 px-2">
                Explorer
            </h2>
            <div className="space-y-1">
                {files.map(file => (
                    <button
                        key={file.fileName}
                        onClick={() => onFileSelect(file.fileName)}
                        className={`w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors flex items-center space-x-2 ${
                            activeFile === file.fileName
                                ? 'bg-ink-green/10 text-ink-green'
                                : 'text-ink-light-gray hover:bg-ink-dark-2'
                        }`}
                    >
                        <FileIcon language={file.language} />
                        <span>{file.fileName}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};


const FileIcon: React.FC<{ language: string }> = ({ language }) => {
    const lang = language ? language.toLowerCase() : 'text';
    const getIcon = () => {
        switch (lang) {
            case 'javascript':
            case 'typescript':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                );
            case 'python':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2 1M4 7l2-1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                );
             case 'json':
                return (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                );
             case 'markdown':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                );
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ink-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
        }
    }
    return getIcon();
}

export default FileExplorer;