// Base URL of the backend API.
// - Local dev: "/api" is proxied to http://localhost:3000 by vite.config.js.
// - Deployed (e.g. Vercel): set VITE_API_URL=https://<backend-host>/api at build time.
export const API_URL = import.meta.env.VITE_API_URL || "/api";
