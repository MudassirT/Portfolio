from typing import List, Optional, Literal
from pydantic import BaseModel


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    query: str
    conversation_id: Optional[str] = None
    history: Optional[List[ChatMessage]] = None


class SourceItem(BaseModel):
    title: str
    excerpt: str
    source: str


class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceItem]
    conversation_id: str
