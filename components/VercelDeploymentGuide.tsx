import React from 'react';

// This component is currently not rendered but kept for potential future use.
// Deployment instructions are now included in the generated README.md where applicable.

const VercelDeploymentGuide: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-ink-dark border border-ink-dark-2 rounded-lg">
      <h3 className="text-lg font-semibold text-ink-light-gray mb-3 uppercase tracking-widest">Deploying to Vercel</h3>
      <p className="text-ink-gray mb-3 text-sm">For Node.js bots, you can easily host them for free on Vercel.</p>
      <ol className="list-decimal list-inside space-y-2 text-ink-light-gray text-sm">
        <li>
          <strong>Push to GitHub:</strong> Create a GitHub repository and push your code.
        </li>
        <li>
          <strong>Import to Vercel:</strong> Sign up at <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-ink-green hover:underline">vercel.com</a> and import your GitHub repository.
        </li>
        <li>
          <strong>Set Environment Variables:</strong> In Vercel project settings, add your bot token and other secrets as environment variables for security.
        </li>
        <li>
          <strong>Deploy:</strong> Click "Deploy". Vercel will build and launch your bot.
        </li>
      </ol>
    </div>
  );
};

export default VercelDeploymentGuide;