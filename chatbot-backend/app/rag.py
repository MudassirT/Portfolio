import asyncio
import logging
import re
from dataclasses import dataclass
from pathlib import Path
from typing import List

import google.generativeai as genai
from google.api_core.exceptions import NotFound, ResourceExhausted

from app.config import settings

logger = logging.getLogger(__name__)

SUPPORTED_EXTENSIONS = {".md", ".mdx", ".txt", ".html", ".tsx", ".ts", ".js", ".jsx", ".py"}
CHUNK_SIZE = 900
CHUNK_OVERLAP = 150

MODEL_ALIAS_MAP = {
    "gemini-pro": "models/gemini-pro-latest",
    "gemini-flash": "models/gemini-flash-latest",
    "gemini-3.1-pro": "models/gemini-3.1-pro",
    "gemini-2.5-flash": "models/gemini-2.5-flash",
}
FALLBACK_MODEL_NAMES = [
    "models/gemini-pro-latest",
    "models/gemini-2.5-flash",
    "models/gemini-2.0-flash",
]


@dataclass
class DocumentItem:
    source: str
    page_content: str


class RAGService:
    def __init__(self):
        self.config = settings
        self.memory: dict[str, List[dict[str, str]]] = {}
        self.documents: List[DocumentItem] = []

        genai.configure(api_key=self.config.gemini_api_key)
        self.reload()

    def _normalize_text(self, text: str) -> str:
        return re.sub(r"\s+", " ", text.lower().strip())

    def _tokenize(self, text: str) -> List[str]:
        return [token for token in re.findall(r"\b\w{2,}\b", text.lower())]

    def _chunk_text(self, source: str, text: str) -> List[DocumentItem]:
        normalized = text.replace("\r\n", "\n").strip()
        if not normalized:
            return []

        chunks: List[DocumentItem] = []
        paragraphs = [p.strip() for p in re.split(r"\n\s*\n", normalized) if p.strip()]
        for paragraph in paragraphs:
            if len(paragraph) <= CHUNK_SIZE:
                chunks.append(DocumentItem(source=source, page_content=paragraph))
                continue

            start = 0
            while start < len(paragraph):
                chunk = paragraph[start : start + CHUNK_SIZE].strip()
                if chunk:
                    chunks.append(DocumentItem(source=source, page_content=chunk))
                start += CHUNK_SIZE - CHUNK_OVERLAP

        return chunks

    def _read_file(self, path: Path) -> str:
        try:
            return path.read_text(encoding="utf-8", errors="ignore")
        except Exception as exc:
            logger.warning("Unable to read file %s: %s", path, exc)
            return ""

    def _load_documents(self) -> List[DocumentItem]:
        documents: List[DocumentItem] = []
        for raw_path in self.config.document_paths:
            path = Path(raw_path)
            if not path.exists():
                logger.warning("Document path does not exist: %s", path)
                continue

            if path.is_dir():
                for file_path in sorted(path.rglob("*")):
                    if file_path.suffix.lower() in SUPPORTED_EXTENSIONS:
                        text = self._read_file(file_path)
                        documents.extend(self._chunk_text(str(file_path), text))
            elif path.suffix.lower() in SUPPORTED_EXTENSIONS:
                text = self._read_file(path)
                documents.extend(self._chunk_text(str(path), text))
            else:
                logger.warning("Skipping unsupported document path: %s", path)

        resume_path = self.config.resume_pdf_path
        if resume_path:
            resume_file = Path(resume_path)
            if resume_file.exists():
                logger.warning("PDF resume support is disabled in this lightweight backend. Skipping %s", resume_file)
            else:
                logger.warning("Resume PDF does not exist: %s", resume_file)

        if not documents:
            raise RuntimeError("No documents were loaded for the chatbot backend.")

        logger.info("Loaded %s document chunks for retrieval", len(documents))
        return documents

    def _score_document(self, document: DocumentItem, query_tokens: List[str]) -> float:
        text = self._normalize_text(document.page_content)
        normalized_query = " ".join(query_tokens)
        score = 0.0

        if normalized_query in text:
            score += 8.0

        for token in set(query_tokens):
            count = text.count(token)
            if count > 0:
                score += count * (2.0 if len(token) >= 5 else 1.0)

        return score

    def retrieve(self, query: str, k: int = 8) -> List[DocumentItem]:
        if not self.documents:
            raise RuntimeError("No document content is available for retrieval.")

        query_tokens = self._tokenize(query)
        if not query_tokens:
            return self.documents[:k]

        scored_documents = [
            (self._score_document(document, query_tokens), document)
            for document in self.documents
        ]
        scored_documents = [item for item in scored_documents if item[0] > 0]
        scored_documents.sort(key=lambda pair: pair[0], reverse=True)

        if not scored_documents:
            return self.documents[:k]

        return [document for _, document in scored_documents[:k]]

    def _format_sources(self, docs: List[DocumentItem]) -> List[dict[str, str]]:
        sources = []
        for doc in docs:
            title = Path(doc.source).name
            excerpt = doc.page_content.strip().replace("\n", " ")[:320]
            sources.append({"title": title, "excerpt": excerpt, "source": doc.source})
        return sources

    def _build_prompt(self, query: str, docs: List[DocumentItem], history: List[dict[str, str]]) -> str:
        context_fragments = []
        for idx, doc in enumerate(docs, start=1):
            context_fragments.append(
                f"Document {idx}: {doc.source}\n{doc.page_content.strip()}"
            )

        context = "\n\n".join(context_fragments)
        history_text = "\n".join(
            f"{message['role'].capitalize()}: {message['content']}" for message in history
        )

        return (
            "You are a professional portfolio AI assistant. Answer only using the retrieved portfolio content. "
            "Do not hallucinate, invent details, or speculate beyond the available information. "
            "If the user asks about the portfolio owner, answer in first person as the owner of this portfolio. "
            "Avoid any mention of Source 1, Source 2, or document citation labels in the final answer. "
            "Keep answers concise, confident, and recruiter-friendly.\n\n"
            "Portfolio context:\n"
            f"{context}\n\n"
            "Conversation history:\n"
            f"{history_text}\n\n"
            "User question:\n"
            f"{query}\n\n"
            "Compose a polished answer that uses the portfolio text and avoids citation labels or source references in the response."
        )

    def _normalize_model_name(self, model_name: str) -> str:
        candidate = model_name.strip()
        if not candidate:
            return FALLBACK_MODEL_NAMES[0]
        if candidate in MODEL_ALIAS_MAP:
            return MODEL_ALIAS_MAP[candidate]
        if candidate.startswith("models/"):
            return candidate
        return f"models/{candidate}"

    def _get_model_candidates(self) -> List[str]:
        normalized = self._normalize_model_name(self.config.gemini_model)
        candidates = [normalized]
        for fallback in FALLBACK_MODEL_NAMES:
            if fallback not in candidates:
                candidates.append(fallback)
        return candidates

    def _attempt_generate(self, prompt: str, model_name: str, generation_config):
        model = genai.GenerativeModel(model_name)
        session = model.start_chat()
        return session.send_message(
            genai.types.content_types.to_content(prompt),
            generation_config=generation_config,
        )

    def _clean_answer_text(self, text: str) -> str:
        if not text:
            return ""

        text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1", text)
        text = re.sub(r"<[^>]+>", " ", text)
        text = re.sub(r"\b(Source|Document)\s*\d+(?:\s*,\s*(?:Source|Document)\s*\d+)*\b", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\(?\s*(?:Source|Document)\s*\d+(?:\s*,\s*(?:Source|Document)\s*\d+)*\s*\)?", "", text, flags=re.IGNORECASE)
        text = re.sub(r"(`{1,3}|\*{1,3}|_{1,3}|~~)", "", text)
        text = re.sub(r"(?m)^[\s]*[-*+]\s+", "", text)
        text = re.sub(r"\s+", " ", text)
        return text.strip()

    def _extract_text(self, response) -> str:
        if hasattr(response, "output_text") and response.output_text:
            return self._clean_answer_text(response.output_text)

        if hasattr(response, "text") and response.text:
            return self._clean_answer_text(response.text)

        chunks = []
        output = getattr(response, "output", None)
        if not output:
            return self._clean_answer_text(str(response))

        for item in output:
            content = getattr(item, "content", None)
            if isinstance(content, list):
                for block in content:
                    text = getattr(block, "text", None)
                    if text:
                        chunks.append(text)
            elif isinstance(content, str):
                chunks.append(content)

        return self._clean_answer_text("".join(chunks))

    def generate_answer(self, prompt: str) -> str:
        generation_config = genai.GenerationConfig(
            temperature=self.config.temperature,
            max_output_tokens=self.config.max_output_tokens,
        )
        model_candidates = self._get_model_candidates()
        last_error = None

        for model_name in model_candidates:
            try:
                logger.info("Trying Gemini model %s", model_name)
                response = self._attempt_generate(prompt, model_name, generation_config)
                answer = self._extract_text(response)
                logger.debug("Gemini response length: %s", len(answer))
                return answer
            except (ResourceExhausted, NotFound) as exc:
                logger.warning(
                    "Gemini model %s failed with %s; trying next model.",
                    model_name,
                    exc,
                )
                last_error = exc
                continue
            except Exception as exc:
                logger.exception("Gemini API call failed for model %s", model_name)
                raise RuntimeError("Gemini API generation failed: %s" % exc)

        if last_error is not None:
            raise RuntimeError(
                "Gemini API generation failed after model fallback attempts: %s" % last_error
            )

        raise RuntimeError("Gemini API generation failed: no valid Gemini model candidate")

    async def chat(self, query: str, history: List[dict[str, str]], conversation_id: str):
        history = history or []
        answer = await asyncio.to_thread(self._chat_sync, query, history, conversation_id)
        return answer

    def _chat_sync(self, query: str, history: List[dict[str, str]], conversation_id: str):
        retrieved_docs = self.retrieve(query)
        prompt = self._build_prompt(query, retrieved_docs, history)
        answer = self.generate_answer(prompt)

        self.memory.setdefault(conversation_id, []).extend(
            [
                {"role": "user", "content": query},
                {"role": "assistant", "content": answer},
            ]
        )

        sources = self._format_sources(retrieved_docs)
        return answer, sources

    def reload(self):
        self.documents = self._load_documents()


rag_service = RAGService()
