import React, { useState } from 'react';

interface ApiKeySetupProps {
    onKeySubmit: (key: string) => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onKeySubmit }) => {
    const [key, setKey] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (key.trim()) {
            onKeySubmit(key.trim());
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 text-ink-light-gray">
            <div className="max-w-xl w-full bg-ink-dark border border-ink-dark-2 rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-ink-white mb-3">Welcome to Ink AI Studio</h1>
                <p className="mb-6 text-ink-gray">
                    To generate bot code, you need to provide your Google Gemini API key. Your key will be stored securely in your browser's local storage and will not be shared.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="password"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Enter your Gemini API Key"
                        className="w-full bg-ink-dark-2 border border-ink-gray rounded-md p-3 text-ink-white focus:ring-2 focus:ring-ink-green focus:border-ink-green transition-colors text-center font-mono"
                        required
                    />
                    <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ink-gray hover:text-ink-green mt-2"
                    >
                        Get your API key from Google AI Studio
                    </a>
                    <button
                        type="submit"
                        disabled={!key.trim()}
                        className="mt-6 w-full max-w-xs bg-ink-green text-ink-black font-bold py-3 px-6 rounded-md transition-all shadow-glow hover:bg-ink-green-dark disabled:bg-ink-gray disabled:cursor-not-allowed uppercase tracking-widest text-base"
                    >
                        Save & Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApiKeySetup;
