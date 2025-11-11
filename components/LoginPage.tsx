import React from 'react';
import { signInWithGoogle } from '../services/authService';

const LoginPage: React.FC = () => {

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Sign in failed", error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <main className="z-10 flex flex-col items-center">
                <h1 className="text-5xl md:text-6xl font-bold text-ink-white mb-3">
                    Ink AI Studio
                </h1>
                <p className="text-lg md:text-xl text-ink-light-gray max-w-2xl mx-auto mb-10">
                    Sign in to build, manage, and deploy your AI bots.
                </p>

                <button
                    onClick={handleSignIn}
                    className="bg-ink-dark-2 text-ink-white font-bold py-3 px-6 rounded-md transition-all border border-ink-gray hover:bg-ink-gray hover:text-ink-black flex items-center space-x-3"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.75 8.36,4.73 12.19,4.73C14.03,4.73 15.6,5.33 16.78,6.38L19.03,4.38C17.11,2.69 14.8,2 12.19,2C6.92,2 3,6.5 3,12C3,17.5 6.92,22 12.19,22C17.6,22 21.54,18.33 21.54,12.27C21.54,11.8 21.48,11.45 21.35,11.1Z" />
                    </svg>
                    <span>Sign in with Google</span>
                </button>
            </main>
        </div>
    );
};

export default LoginPage;