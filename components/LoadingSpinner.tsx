import React, { useState, useEffect } from 'react';

const LoadingSpinner: React.FC = () => {
    const messages = [
        'INITIALIZING BUILD_PROCESS...',
        'COMPILING BOT_CORE.MODULES...',
        'LINKING DEPENDENCIES...',
        'APPLYING AI_PERSONALITY.TRAITS...',
        'GENERATING_DOCUMENTATION...',
        'FINALIZING_PROJECT.FILES...',
    ];
    const [message, setMessage] = useState(messages[0]);
    const [dots, setDots] = useState('');

    useEffect(() => {
        let i = 0;
        const messageInterval = setInterval(() => {
            i = (i + 1) % messages.length;
            setMessage(messages[i]);
        }, 2000);

        const dotInterval = setInterval(() => {
            setDots(d => (d.length >= 3 ? '' : d + '.'));
        }, 500);

        return () => {
            clearInterval(messageInterval);
            clearInterval(dotInterval);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-lg text-center w-full max-w-md">
             <svg className="animate-spin h-8 w-8 text-ink-green mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-lg text-ink-green font-semibold transition-opacity duration-500">
                {message}
            </p>
            <p className="text-sm text-ink-gray mt-1 h-4">
                Please wait{dots}
            </p>
        </div>
    );
};

export default LoadingSpinner;