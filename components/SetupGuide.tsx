import React from 'react';

// This component is currently not rendered but kept for potential future use.
// The primary setup instructions are now generated inside the README.md for each project.

const SetupGuide: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-ink-dark border border-ink-dark-2 rounded-lg">
      <h3 className="text-lg font-semibold text-ink-light-gray mb-3 uppercase tracking-widest">How to Use Your Bot Code</h3>
      <ol className="list-decimal list-inside space-y-2 text-ink-light-gray text-sm">
        <li>
          <strong>Save Files:</strong> Use the copy button for each file and save it with the correct filename (e.g., `bot.js`).
        </li>
        <li>
          <strong>Install Dependencies:</strong> In your project terminal, run `npm install` or `pip install -r requirements.txt` if a `package.json` or `requirements.txt` is present.
        </li>
        <li>
          <strong>Add API Keys:</strong> Open the configuration file (e.g., `config.json`, `.env`) and replace placeholders like `"YOUR_BOT_TOKEN"` with your actual API keys.
        </li>
        <li>
          <strong>Run Bot:</strong> Use the standard command for the language, like `node bot.js` or `python main.py`, to start your bot.
        </li>
      </ol>
    </div>
  );
};

export default SetupGuide;