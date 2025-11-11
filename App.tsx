import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { BotConfig, BotBuild } from './types';
import { generateBotCode } from './services/geminiService';
import { getBotBuildsForUser, addBotBuild } from './services/firestoreService';
import { auth, isFirebaseConfigured } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import Header from './components/Header';
import BotDescriptionForm from './components/BotDescriptionForm';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import FileExplorer from './components/FileExplorer';
import CodeEditor from './components/CodeEditor';
import LoginPage from './components/LoginPage';
import HistorySidebar from './components/HistorySidebar';
import FirebaseSetupGuide from './components/FirebaseSetupGuide';
import ApiKeySetup from './components/ApiKeySetup';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [botBuilds, setBotBuilds] = useState<BotBuild[]>([]);
  const [activeBuildId, setActiveBuildId] = useState<string | null>(null);
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem('gemini_api_key'));


  useEffect(() => {
    if (!isFirebaseConfigured || !apiKey) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);
      if (currentUser) {
        setUser(currentUser);
        try {
          const builds = await getBotBuildsForUser(currentUser.uid);
          setBotBuilds(builds);
          if (builds.length > 0) {
            setActiveBuildId(builds[0].id);
          } else {
             setShowForm(true); // Show form if user has no builds
          }
        } catch (e) {
            setError("Could not fetch your saved builds. Please try again later.");
            console.error(e);
        }
      } else {
        setUser(null);
        setBotBuilds([]);
        setActiveBuildId(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [apiKey]);

  useEffect(() => {
    const activeBuild = botBuilds.find(b => b.id === activeBuildId);
    if (activeBuild && activeBuild.files.length > 0) {
        const readmeFile = activeBuild.files.find(f => f.fileName.toLowerCase().includes('readme')) || activeBuild.files[0];
        setActiveFile(readmeFile.fileName);
    } else {
        setActiveFile(null);
    }
  }, [activeBuildId, botBuilds]);

  const handleFormSubmit = async (config: BotConfig) => {
    if (!user) {
        setError("You must be logged in to create a bot.");
        return;
    }
    if (!apiKey) {
        setError("Your Gemini API Key is not set. Please configure it first.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setShowForm(false);
    try {
      const files = await generateBotCode(config, apiKey);
      const newBuild: Omit<BotBuild, 'id'> = {
          userId: user.uid,
          config,
          files,
          createdAt: new Date().toISOString(),
      };
      const newId = await addBotBuild(newBuild);
      
      setBotBuilds(prevBuilds => [{ ...newBuild, id: newId }, ...prevBuilds]);
      setActiveBuildId(newId);

    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unexpected error occurred during generation.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorReset = () => {
      setError(null);
      setShowForm(true);
  };
  
  const handleNewBotClick = () => {
    setActiveBuildId(null);
    setShowForm(true);
  }

  const handleSelectBuild = (buildId: string) => {
      setActiveBuildId(buildId);
      setShowForm(false);
  }

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
  }

  const activeBuild = botBuilds.find(b => b.id === activeBuildId);
  const activeFileContent = activeBuild?.files.find(f => f.fileName === activeFile);

  const renderContent = () => {
    if (!apiKey) {
        return <ApiKeySetup onKeySubmit={handleApiKeySubmit} />;
    }
    if (!isFirebaseConfigured) {
        return <FirebaseSetupGuide />;
    }
    if (isLoading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }
    if (!user) {
        return <LoginPage />;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={handleErrorReset} />;
    }
    if (showForm) {
        return (
             <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                <BotDescriptionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </main>
        );
    }
    if (botBuilds.length === 0) {
        return (
             <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                <BotDescriptionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </main>
        );
    }

    return (
        <div className="flex flex-1 overflow-hidden">
            <aside className="w-56 bg-ink-dark flex-shrink-0 border-r border-ink-dark-2 flex flex-col">
                <HistorySidebar 
                    builds={botBuilds}
                    activeBuildId={activeBuildId}
                    onSelectBuild={handleSelectBuild}
                    onNewBot={handleNewBotClick}
                />
            </aside>
            {activeBuild && (
              <>
                <aside className="w-64 bg-ink-dark p-4 overflow-y-auto border-r border-ink-dark-2">
                    <FileExplorer 
                    files={activeBuild.files} 
                    activeFile={activeFile} 
                    onFileSelect={setActiveFile} 
                    />
                </aside>
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                    {activeFileContent ? (
                    <CodeEditor file={activeFileContent} />
                    ) : (
                    <div className="flex-1 flex items-center justify-center text-ink-gray">
                        <p>Select a file to view its content.</p>
                    </div>
                    )}
                </main>
              </>
            )}
            {!activeBuild && (
                 <div className="flex-1 flex items-center justify-center text-ink-gray">
                    <p>Select a build from the history to view files.</p>
                 </div>
            )}
        </div>
    );
  };

  return (
    <div className="bg-ink-black text-ink-white min-h-screen font-mono flex flex-col">
      <Header user={user} />
      {renderContent()}
    </div>
  );
};

export default App;