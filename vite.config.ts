import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 5173-5175 are taken by fireplace-waitlist, art club, and monday-cowork.
export default defineConfig({
  plugins: [react()],
  server: { port: 5176, strictPort: true },
});
