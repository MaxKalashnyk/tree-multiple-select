import react from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export const port = 5173;

export default defineConfig(
  (configEnv): UserConfig => ({
    base: './',
    publicDir: './src/assets',
    build: {
      outDir: './build',
    },
    server: {
      port,
      strictPort: true,
    },
    plugins: [react(), svgr()],
    css: {
      modules: {
        generateScopedName:
          configEnv.mode === 'development'
            ? '[local]-[hash:base64:5]'
            : '[hash:base64:5]',
      },
    },
    resolve: {
      alias: {
        '~/': `${__dirname}/src/`,
      },
    },
  })
);
