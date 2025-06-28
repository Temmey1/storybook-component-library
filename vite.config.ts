import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  // css: {
  //   transformer: 'lightningcss',
  // },
  // build: {
  //   cssMinify: true,
  //   rollupOptions: {
  //     output: {
  //       assetFileNames: 'assets/[name][extname]',
  //     },
  //   },
  // },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ComponentLibrary',
      fileName: (format) => `component-library.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
}); 