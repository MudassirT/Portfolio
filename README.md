# Portfolio Project

## Contact form backend

This portfolio now includes a backend API for real message delivery from the contact page.

### Setup

1. Copy `.env.example` to `.env`.
2. Set your SMTP account values:
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_SECURE`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `EMAIL_TO`
3. Optionally set `VITE_API_BASE_URL` if the backend runs on a different host.

### Run

- Frontend: `npm run dev`
- Backend: `npm run dev:server`
- Chatbot backend: `npm run dev:chatbot` (Windows-friendly command)

The contact form submits to `/api/contact`, and the backend sends the email using the configured SMTP settings.

### Chatbot backend

This repo also includes a Python-based RAG chatbot backend in `chatbot-backend`.

1. Open `chatbot-backend/.env.example` and copy it to `chatbot-backend/.env`.
2. Set `GEMINI_API_KEY` and confirm `DOCUMENT_PATHS`.
3. Start the chatbot backend with `npm run dev:chatbot`.

The React widget uses a proxied `/chatbot/api/chat/query` endpoint to reach the Python backend on `localhost:5000`.

### Notes

- The server is implemented in `server/server.js`.
- For development, Vite proxies `/api` requests to `http://localhost:4000`.
- For production, host the backend separately or adjust `VITE_API_BASE_URL`.
