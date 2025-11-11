import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-5 rounded-lg relative max-w-2xl mx-auto text-center" role="alert">
          <strong className="font-bold uppercase text-base">Error Generating Bot</strong>
          <p className="block font-mono mt-2 text-red-100">{message}</p>
          <div className="mt-6">
              <button 
                onClick={onRetry}
                className="bg-red-500/50 hover:bg-red-500/70 text-ink-white font-bold py-2 px-6 rounded-md transition-colors border border-red-400 uppercase tracking-widest text-sm"
              >
                Try Again
              </button>
          </div>
        </div>
    </div>
  );
};

export default ErrorMessage;