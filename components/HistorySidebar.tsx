import React from 'react';
import { BotBuild } from '../types';

interface HistorySidebarProps {
    builds: BotBuild[];
    activeBuildId: string | null;
    onSelectBuild: (id: string) => void;
    onNewBot: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ builds, activeBuildId, onSelectBuild, onNewBot }) => {
    return (
        <div className="p-4 flex flex-col h-full">
             <button 
                onClick={onNewBot}
                className="w-full flex items-center justify-center space-x-2 bg-ink-dark-2 hover:bg-ink-gray text-ink-light-gray px-3 py-2 rounded-md text-sm font-medium transition-colors border border-ink-gray mb-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>New Bot</span>
            </button>
            <h2 className="text-sm font-semibold text-ink-gray uppercase tracking-widest mb-3 px-2">
                Build History
            </h2>
            <div className="space-y-1 overflow-y-auto flex-1">
                {builds.length === 0 && (
                    <p className="text-xs text-ink-gray px-2">No builds yet.</p>
                )}
                {builds.map(build => (
                    <button
                        key={build.id}
                        onClick={() => onSelectBuild(build.id)}
                        className={`w-full text-left p-2 text-sm rounded-md transition-colors block ${
                            activeBuildId === build.id
                                ? 'bg-ink-green/10 text-ink-green'
                                : 'text-ink-light-gray hover:bg-ink-dark-2'
                        }`}
                    >
                       <p className="font-semibold truncate">{build.config.platform} Bot</p>
                       <p className="text-xs text-ink-gray truncate">{build.config.language}</p>
                       <p className="text-xs text-ink-gray mt-1">{new Date(build.createdAt).toLocaleString()}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HistorySidebar;