import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' allows loading all env vars, not just VITE_*
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      devtools(),
      solidPlugin(),
      tailwindcss(),
    ],
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          // Use the env var, with a fallback to localhost if it's missing
          target: env.BACKEND_URL || 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    build: {
      target: 'esnext',
    },
  };
});