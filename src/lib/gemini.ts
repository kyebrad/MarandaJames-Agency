/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Client-side helper — calls the Netlify serverless function at
// netlify/functions/gemini.ts instead of holding a Gemini API key in the browser.
// See that file for why: a client-side key gets shipped in the built JS bundle and
// can be read by anyone who opens devtools.

export type GeminiLink = { uri: string; title?: string };

export async function callGemini(
  action: 'chat' | 'maps' | 'search',
  payload: Record<string, unknown>
): Promise<{ text: string; links: GeminiLink[] }> {
  const res = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload }),
  });

  if (!res.ok) {
    throw new Error('Gemini function error');
  }

  const data = await res.json();
  return { text: data.text ?? '', links: data.links ?? [] };
}
