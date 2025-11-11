import React from 'react';
import { User } from 'firebase/auth';
import { signOutUser } from '../services/authService';

interface HeaderProps {
    user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    return (
        <header className="bg-ink-dark border-b border-ink-dark-2/80 p-3 shadow-md flex-shrink-0">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <svg
                        className="w-8 h-8 text-ink-green"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    <h1 className="text-xl font-semibold text-ink-white tracking-wider">
                        Ink AI Studio
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={signOutUser}
                                className="text-ink-gray hover:text-ink-white text-sm transition-colors"
                            >
                                Sign Out
                            </button>
                            <img
                                src={user.photoURL || undefined}
                                alt={user.displayName || 'User'}
                                className="w-8 h-8 rounded-full border-2 border-ink-gray"
                            />
                        </div>
                    ) : (
                         <a
                            href="https://ai.google.dev/gemini-api/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-gray hover:text-ink-green transition-colors text-sm"
                        >
                            Powered by Gemini
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;