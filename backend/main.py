"""FastAPI backend for the Shreeyansh Mahamuni portfolio site.

Run locally:
    uvicorn main:app --reload --port 8000

After building the frontend (`npm run build` in frontend/), this server also
serves the static site at http://localhost:8000.
"""

from __future__ import annotations

import json
import re
import threading
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator

from portfolio_data import PORTFOLIO

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
DIST_DIR = PROJECT_ROOT / "frontend" / "dist"
MESSAGES_FILE = BASE_DIR / "messages.json"

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
MAX_MESSAGES = 200

app = FastAPI(title="Portfolio API", version="1.0.0")
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

_write_lock = threading.Lock()


class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., min_length=5, max_length=254)
    message: str = Field(..., min_length=10, max_length=5000)

    @field_validator("name", "email", "message")
    @classmethod
    def strip_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("must not be empty")
        return value

    @field_validator("email")
    @classmethod
    def valid_email(cls, value: str) -> str:
        if not EMAIL_RE.match(value):
            raise ValueError("must be a valid email address")
        return value


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


@app.get("/api/portfolio")
def portfolio() -> dict:
    return PORTFOLIO


@app.post("/api/contact", status_code=201)
def contact(payload: ContactMessage) -> dict:
    record = {
        **payload.model_dump(),
        "receivedAt": datetime.now(timezone.utc).isoformat(),
    }
    try:
        with _write_lock:
            existing: list = []
            if MESSAGES_FILE.exists():
                try:
                    existing = json.loads(MESSAGES_FILE.read_text(encoding="utf-8"))
                except json.JSONDecodeError:
                    existing = []
            existing.append(record)
            existing = existing[-MAX_MESSAGES:]
            MESSAGES_FILE.write_text(
                json.dumps(existing, indent=2, ensure_ascii=False), encoding="utf-8"
            )
    except OSError as exc:  # pragma: no cover - disk errors
        raise HTTPException(status_code=500, detail="Could not save message") from exc

    return {
        "ok": True,
        "thanks": f"Thanks, {record['name']}! Your message has been recorded.",
    }


@app.get("/api/messages/count")
def message_count() -> dict:
    if not MESSAGES_FILE.exists():
        return {"count": 0}
    try:
        data = json.loads(MESSAGES_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"count": 0}
    return {"count": len(data) if isinstance(data, list) else 0}


# --- Static frontend (production build) -------------------------------------

if DIST_DIR.is_dir():

    @app.get("/")
    def index() -> FileResponse:
        return FileResponse(DIST_DIR / "index.html")

    assets_dir = DIST_DIR / "assets"
    if assets_dir.is_dir():
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}", response_model=None)
    def spa(full_path: str):
        candidate = DIST_DIR / full_path
        if full_path and candidate.is_file():
            return FileResponse(candidate)
        index_file = DIST_DIR / "index.html"
        if index_file.is_file():
            return FileResponse(index_file)
        return JSONResponse({"detail": "Frontend not built. Run npm run build."}, status_code=404)
