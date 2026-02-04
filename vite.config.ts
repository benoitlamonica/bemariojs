import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
    dts({
      exclude: ['src/components/**', 'src/**/*.spec.ts'],
      outDir: 'dist',
      tsconfigPath: './tsconfig.json',
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(/src\//, ''),
        content,
      }),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'MarioJS',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
  },
});
