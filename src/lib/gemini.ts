import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini API client
// The API key is injected via Vite's define in vite.config.ts
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
