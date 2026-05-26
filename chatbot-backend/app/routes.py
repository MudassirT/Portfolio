import uuid
from fastapi import APIRouter, HTTPException
from app.schemas import ChatRequest, ChatResponse, SourceItem
from app.rag import rag_service

router = APIRouter(prefix="/api/chat")


@router.post("/query", response_model=ChatResponse)
async def query_chat(payload: ChatRequest):
    if not payload.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    conversation_id = payload.conversation_id or str(uuid.uuid4())
    history = payload.history or []

    try:
        answer, sources = await rag_service.chat(payload.query, [m.dict() for m in history], conversation_id)
        source_items = [
            SourceItem(title=source["title"], excerpt=source["excerpt"], source=source["source"]) for source in sources
        ]
        return ChatResponse(answer=answer, sources=source_items, conversation_id=conversation_id)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/reload")
def reload_index():
    try:
        rag_service.reload()
        return {"status": "ok", "message": "RAG index reloaded."}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
