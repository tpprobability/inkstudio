import { GoogleGenAI, Type } from "@google/genai";
import { BotConfig, GeneratedCode } from '../types';
import { LANGUAGE_DISPLAY_NAMES } from "../constants";

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            fileName: {
                type: Type.STRING,
                description: "The name of the file, e.g., 'bot.js', 'package.json', 'README.md'."
            },
            language: {
                type: Type.STRING,
                description: "The language of the code, e.g., 'javascript', 'json', 'markdown'."
            },
            code: {
                type: Type.STRING,
                description: "The full, raw content of the file as a string."
            },
        },
        required: ["fileName", "language", "code"],
    }
};

const createPrompt = (config: BotConfig): string => {
  return `You are an expert bot developer. Generate the complete, production-ready code for a bot based on the following specifications.

Platform: ${config.platform}
Language: ${LANGUAGE_DISPLAY_NAMES[config.language] || config.language}
Core Functionality: ${config.description}
Key Features:
${config.features.split('\n').filter(f => f.trim() !== '').map(f => `- ${f}`).join('\n')}

Please provide the output as a JSON array of file objects. Each object must have three properties: 'fileName', 'language', and 'code'.
- The 'fileName' should be a valid filename with an extension.
- The 'language' should be a lowercase identifier like 'javascript', 'python', 'json', 'markdown', or 'text'.
- The 'code' must be the complete, unescaped source code for the file.

The generated project should be complete and runnable. Please include:
1.  A comprehensive 'README.md' with clear, step-by-step setup instructions: how to install dependencies, where to get API keys, how to create and fill a '.env' file, and the command to run the bot.
2.  A dependency file ('package.json' for JavaScript or 'requirements.txt' for Python).
3.  The main bot application file(s).
4.  An example environment file ('.env.example') showing which variables are needed (e.g., BOT_TOKEN, CLIENT_ID). Use placeholders, not real keys.

Ensure the code is well-structured, commented, and follows best practices for the specified language and platform.
The primary entry file for a Node.js project should be 'index.js' or 'bot.js'.
The primary entry file for a Python project should be 'main.py' or 'bot.py'.`;
};

export const generateBotCode = async (config: BotConfig, apiKey: string): Promise<GeneratedCode[]> => {
    if (!apiKey) {
        throw new Error("Gemini API Key is not provided.");
    }
    const ai = new GoogleGenAI({apiKey});
    const prompt = createPrompt(config);

    try {
        // Use ai.models.generateContent according to the new API guidelines
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using a powerful model for code generation
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2, // Lower temperature for more deterministic code
            },
        });
        
        // Access text directly from the response object.
        const responseText = response.text;
        
        if (!responseText) {
            throw new Error("The API returned an empty response.");
        }
        
        let parsedResponse: GeneratedCode[];
        try {
            parsedResponse = JSON.parse(responseText);
        } catch (e) {
            console.error("Failed to parse JSON response:", responseText);
            throw new Error("The AI returned an invalid response format. Please try again.");
        }

        if (!Array.isArray(parsedResponse) || parsedResponse.some(f => typeof f.fileName === 'undefined' || typeof f.code === 'undefined')) {
            throw new Error("The AI returned data in an unexpected structure.");
        }

        // Sort files to have README first, then package/requirements, then others.
        parsedResponse.sort((a, b) => {
            if (a.fileName.toLowerCase().includes('readme')) return -1;
            if (b.fileName.toLowerCase().includes('readme')) return 1;
            if (a.fileName.includes('package.json') || a.fileName.includes('requirements.txt')) return -1;
            if (b.fileName.includes('package.json') || b.fileName.includes('requirements.txt')) return 1;
            return a.fileName.localeCompare(b.fileName);
        });

        return parsedResponse;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('invalid'))) {
             throw new Error("Your Gemini API Key is invalid. Please check it and try again.");
        }
        throw new Error("Failed to generate bot code. The AI model may be overloaded or the request was invalid. Please try again later.");
    }
};