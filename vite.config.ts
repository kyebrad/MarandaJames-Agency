import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// GEMINI_API_KEY is intentionally never read or defined here - it must never reach the
// client bundle. It's used server-side only, in netlify/functions/gemini.ts, where it's
// read from Netlify's environment at request time. See src/lib/gemini.ts for the
// client-side fetch wrapper that replaced the old direct SDK usage.
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
