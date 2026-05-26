from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import router

app = FastAPI(
    title="Portfolio Chatbot Backend",
    description="FastAPI backend for a portfolio chatbot powered by Gemini API.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
async def health_check():
    return {"status": "ok", "service": "portfolio-rag-chatbot"}
