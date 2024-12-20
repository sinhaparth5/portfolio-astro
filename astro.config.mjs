// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  }), svelte()],
  vite: {
    optimizeDeps: {
      exclude: ['react-compiler-runtime']
    },
    ssr: {
      noExternal: ['react-compiler-runtime']
    }
  }
});