from pathlib import Path
from typing import List
from pydantic import Field, validator
from pydantic_settings import BaseSettings

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DOCUMENT_PATHS = [
    str(ROOT_DIR.parent / "portfolio-summary.txt"),
    str(ROOT_DIR / "portfolio-knowledge.md"),
    str(ROOT_DIR.parent / "src" / "components" / "sections" / "Hero.tsx"),
    str(ROOT_DIR.parent / "src" / "components" / "sections" / "About.tsx"),
    str(ROOT_DIR.parent / "src" / "components" / "sections" / "Projects.tsx"),
    str(ROOT_DIR.parent / "src" / "components" / "sections" / "Contact.tsx"),
    str(ROOT_DIR.parent / "src" / "pages" / "Index.jsx"),
]


class Settings(BaseSettings):
    gemini_api_key: str = Field(..., env="GEMINI_API_KEY")
    gemini_model: str = Field("models/gemini-pro-latest", env="GEMINI_MODEL")
    temperature: float = Field(0.2, env="TEMPERATURE")
    max_output_tokens: int = Field(512, env="MAX_OUTPUT_TOKENS")
    embedding_model: str = Field("all-MiniLM-L6-v2", env="EMBEDDING_MODEL")
    vectorstore_dir: str = Field("./chroma_db", env="VECTORSTORE_DIR")
    document_paths: List[str] = Field(DEFAULT_DOCUMENT_PATHS, env="DOCUMENT_PATHS")
    resume_pdf_path: str | None = Field(None, env="RESUME_PDF_PATH")
    port: int = Field(5000, env="PORT")
    frontend_origins: List[str] = Field(
        ["http://localhost:8080", "http://127.0.0.1:8080"], env="FRONTEND_ORIGINS"
    )

    model_config = {
        "env_file": ROOT_DIR / ".env",
        "env_file_encoding": "utf-8",
    }

    @validator("document_paths", pre=True)
    def split_paths(cls, v):
        if isinstance(v, str):
            return [path.strip() for path in v.split(",") if path.strip()]
        return v

    @validator("frontend_origins", pre=True)
    def split_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v


settings = Settings()
