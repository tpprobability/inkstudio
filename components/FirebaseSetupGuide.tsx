import React from 'react';

const FirebaseSetupGuide: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 text-ink-light-gray">
      <div className="max-w-3xl w-full bg-ink-dark border border-ink-dark-2 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-ink-white mb-4">Firebase Configuration Needed</h1>
        <p className="mb-6 text-ink-gray">
          This application uses Firebase for user authentication and to save your bot builds. To get started, you need to connect your own Firebase project. It's free and only takes a few minutes.
        </p>
        
        <div className="space-y-4 text-sm">
            <div className="p-4 bg-ink-dark-2 border border-ink-gray/30 rounded-md">
                <p className="font-semibold text-ink-white mb-2">Step 1: Create a Firebase Project</p>
                <p>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-ink-green hover:underline">Firebase Console</a>, click "Add project", and follow the on-screen instructions.</p>
            </div>

            <div className="p-4 bg-ink-dark-2 border border-ink-gray/30 rounded-md">
                <p className="font-semibold text-ink-white mb-2">Step 2: Create a Web App</p>
                {/* FIX: The unescaped '</>' sequence likely confused the JSX parser, causing a misleading error. Replaced it with a semantic `<code>` tag and a JSX string expression to ensure correct parsing. */}
                <p>In your new project's dashboard, click the web icon (<code className="bg-ink-black px-1 rounded">{'</>'}</code>) to add a new web app. Give it a nickname and register the app.</p>
            </div>
            
            <div className="p-4 bg-ink-dark-2 border border-ink-gray/30 rounded-md">
                <p className="font-semibold text-ink-white mb-2">Step 3: Enable Authentication & Firestore</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Go to the "Authentication" section, click "Get started", and enable the "Google" sign-in provider.</li>
                    {/* FIX: Replaced Markdown-style bolding with the semantically correct <strong> tag for proper HTML. */}
                    <li>Go to the "Firestore Database" section, click "Create database", start in <strong>test mode</strong>, and choose a location.</li>
                </ul>
            </div>

            <div className="p-4 bg-ink-dark-2 border border-ink-gray/30 rounded-md">
                <p className="font-semibold text-ink-white mb-2">Step 4: Get Your Configuration</p>
                <p>Go to your Project Settings (click the gear icon ⚙️) {'>'} General tab. Scroll down to "Your apps", find your web app, and click on "SDK setup and configuration". Select the "Config" option.</p>
            </div>

            <div className="p-4 bg-ink-dark-2 border border-ink-gray/30 rounded-md">
                <p className="font-semibold text-ink-white mb-2">Step 5: Add Credentials to the Code</p>
                <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
                    <li>In the project files, find <code className="bg-ink-black px-1 rounded">firebaseCredentials.example.ts</code>.</li>
                    <li>Rename it to <code className="bg-ink-black px-1 rounded">firebaseCredentials.ts</code>.</li>
                    <li>Copy the `firebaseConfig` object from the Firebase console and paste it into this new file.</li>
                </ol>
            </div>
        </div>

        <p className="mt-6 text-center text-ink-gray">
          After completing these steps, refresh this page.
        </p>
      </div>
    </div>
  );
};

export default FirebaseSetupGuide;