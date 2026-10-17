import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// "/api" is forwarded to the local backend, so the app works through a single
// public tunnel (Cloudflare Tunnel / ngrok) without exposing port 3000.
const proxy = { '/api': 'http://localhost:3000' }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5174, strictPort: true, proxy, allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.app'] },
  preview: { proxy, allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.app'] },
})
