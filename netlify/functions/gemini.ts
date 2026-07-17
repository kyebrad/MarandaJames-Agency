/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Server-side proxy for all Gemini calls. GEMINI_API_KEY is read from Netlify's
// environment (set in the site dashboard, never committed) and never sent to the
// browser. The client (src/lib/gemini.ts) POSTs here instead of holding the key itself.

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const CHAT_SYSTEM_INSTRUCTION =
  "You are a compassionate, helpful, and trauma-informed assistant for MarandaJames Elect LLC, a faith-based women's transitional shelter in Niagara Falls, NY. Provide supportive, safe, and accurate information about our services. Keep responses concise, empowering, and empathetic. Do not provide medical or legal advice. IMPORTANT SAFETY DIRECTIVE: If the user expresses immediate danger, acute domestic violence, or suicidal ideation, you MUST start your response EXACTLY with the phrase 'EMERGENCY_DETECTED' and then provide emergency contact information.";

type ChatTurn = { role: 'user' | 'model'; text: string };

type GroundingLink = { uri: string; title?: string };

function extractLinks(response: any, kind: 'maps' | 'web'): GroundingLink[] {
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return chunks.map((c: any) => c[kind]).filter(Boolean) as GroundingLink[];
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'chat') {
      const { history, message } = body as { history: ChatTurn[]; message: string };

      const chat = ai.chats.create({
        model: 'gemini-3.1-pro-preview',
        config: { systemInstruction: CHAT_SYSTEM_INSTRUCTION },
        history: (history || []).map((turn) => ({
          role: turn.role,
          parts: [{ text: turn.text }],
        })),
      });

      const response = await chat.sendMessage({ message });
      return Response.json({ text: response.text });
    }

    if (action === 'maps') {
      const { latitude, longitude } = body as { latitude: number; longitude: number };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents:
          'What are some nearby hospitals, urgent care centers, and police stations? Please provide their names and brief details.',
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: { latLng: { latitude, longitude } },
          },
        },
      });

      return Response.json({ text: response.text, links: extractLinks(response, 'maps') });
    }

    if (action === 'search') {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents:
          'Find recent community resources, job fairs, or support programs for women in Niagara Falls, NY. Summarize the findings.',
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      return Response.json({ text: response.text, links: extractLinks(response, 'web') });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('gemini function error:', error);
    return Response.json({ error: 'Gemini request failed' }, { status: 500 });
  }
};
