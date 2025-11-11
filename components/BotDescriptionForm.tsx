import React, { useState, useEffect } from 'react';
import { BotConfig } from '../types';
import { PLATFORM_LANGUAGES, LANGUAGE_DISPLAY_NAMES } from '../constants';

interface BotDescriptionFormProps {
  onSubmit: (config: BotConfig) => void;
  isLoading: boolean;
}

const BotDescriptionForm: React.FC<BotDescriptionFormProps> = ({ onSubmit, isLoading }) => {
  const [platform, setPlatform] = useState('Discord');
  const [language, setLanguage] = useState('javascript');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');

  useEffect(() => {
    const supportedLanguages = PLATFORM_LANGUAGES[platform] || [];
    if (!supportedLanguages.includes(language)) {
      setLanguage(supportedLanguages[0] || '');
    }
  }, [platform, language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !description.trim() || !features.trim()) return;
    onSubmit({ platform, language, description, features });
  };

  const availableLanguages = PLATFORM_LANGUAGES[platform] || [];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-ink-white mb-2">Describe Your Bot</h1>
        <p className="text-ink-light-gray">Fill in the details below, and our AI will generate the complete codebase.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink-light-gray mb-2">Platform</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.keys(PLATFORM_LANGUAGES).map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-all border ${
                  platform === p
                    ? 'bg-ink-green text-ink-black border-ink-green-dark'
                    : 'bg-ink-dark hover:bg-ink-dark-2 border-ink-gray'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-light-gray mb-2">Language</label>
          <div className="flex space-x-3">
            {availableLanguages.map((lang) => (
              <button
                type="button"
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all border ${
                  language === lang
                    ? 'bg-ink-green text-ink-black border-ink-green-dark'
                    : 'bg-ink-dark hover:bg-ink-dark-2 border-ink-gray'
                }`}
              >
                {LANGUAGE_DISPLAY_NAMES[lang]}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-ink-light-gray mb-2">
            Bot Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="w-full bg-ink-dark border border-ink-gray rounded-md p-3 text-ink-white focus:ring-2 focus:ring-ink-green focus:border-ink-green transition-colors"
            placeholder="e.g., A friendly bot that welcomes new users and assigns them a starting role."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="features" className="block text-sm font-medium text-ink-light-gray mb-2">
            Key Features (one per line)
          </label>
          <textarea
            id="features"
            rows={4}
            className="w-full bg-ink-dark border border-ink-gray rounded-md p-3 text-ink-white focus:ring-2 focus:ring-ink-green focus:border-ink-green transition-colors"
            placeholder={
`- Responds to a !hello command
- Kicks users who spam messages
- Logs server events to a specific channel`
            }
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            required
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || !description.trim() || !features.trim()}
            className="w-full bg-ink-green text-ink-black font-bold py-3 px-6 rounded-md transition-all shadow-glow hover:bg-ink-green-dark disabled:bg-ink-gray disabled:cursor-not-allowed uppercase tracking-widest text-base"
          >
            {isLoading ? 'Generating...' : 'Build My Bot'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BotDescriptionForm;
