/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    isolate: true,
    threads: false,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/stories/',
        '**/*.stories.tsx',
        '**/*.types.ts',
      ],
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    pool: 'forks',
  },
});
