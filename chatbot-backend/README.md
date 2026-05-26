# Portfolio Chatbot Backend

A lightweight Python FastAPI backend for a portfolio chatbot using Gemini API.
This backend serves as the portfolio chat server and can be deployed as a fast retrieval-augmented generation (RAG) service.

## Features

- Portfolio document search and answer generation
- Gemini API generation
- Chat history and context-aware conversation
- Source retrieval and source metadata
- FastAPI endpoints for query and reload
- CORS integration for an existing frontend

This implementation is intentionally lightweight for Python 3.14 and does not require the heavy Chroma / Sentence-Transformers embedding stack.

## Setup

1. Create a Python virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Copy the example env file:

```bash
cp .env.example .env
```

4. Set your `GEMINI_API_KEY` and verify the `DOCUMENT_PATHS` and `RESUME_PDF_PATH` values.

- Use a supported v1beta model name such as `models/gemini-pro-latest` or `models/gemini-2.5-flash`.
- The backend only loads narrative portfolio documents by default, not the entire UI codebase.
- Add a dedicated `portfolio-summary.txt` file to provide a stable owner-first-person answer.
- The backend also maps the alias `gemini-pro` to `models/gemini-pro-latest` automatically.
- If a quota error occurs, the backend will now fall back to alternate supported models automatically.

## Run

```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
```

## Frontend integration

Use the `/api/chat/query` endpoint for chat requests.
Send:

```json
{
  "query": "What projects has he built?",
  "conversation_id": "optional-session-id",
  "history": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello, how can I help?" }
  ]
}
```

Receive:

```json
{
  "answer": "...",
  "sources": [
    { "title": "Research AI Chatbot", "excerpt": "...", "source": "README.md" }
  ],
  "conversation_id": "generated-id"
}
```

## Notes

- Do not commit real API keys.
- Use a proper Gemini API key in `.env`.
- The backend can be deployed separately from the portfolio frontend.
