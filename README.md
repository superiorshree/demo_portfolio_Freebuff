# Shreeyansh Mahamuni — Portfolio

A full-stack portfolio site: **React + TypeScript (Vite)** on the front, **Python FastAPI** on the back.

```
portfolio/
├── frontend/               # React 19 + TypeScript + Vite
│   └── src/
│       ├── App.tsx         # page composition
│       ├── components/     # Nav, Hero, Ticker, Sections, Contact
│       ├── api.ts          # API client (+ offline fallback)
│       ├── fallback.ts     # bundled copy of the content
│       ├── hooks.ts        # scroll reveal, scroll spy, typewriter
│       └── styles.css      # full design system
└── backend/                # FastAPI
    ├── main.py             # API + serves the built frontend
    ├── portfolio_data.py   # ← single source of truth for all content
    ├── messages.json       # contact-form submissions (gitignored)
    └── requirements.txt
```

## 1. Setup (once)

```bash
# frontend dependencies
cd frontend && npm install

# backend dependencies (virtual env)
cd backend
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt   # Windows
# source .venv/bin/activate && pip install -r requirements.txt   # macOS/Linux
```

## 2. Development (two terminals)

```bash
# terminal 1 — API on :8000
cd backend && .venv/Scripts/python -m uvicorn main:app --reload --port 8000

# terminal 2 — frontend on :5173 (proxies /api → :8000)
cd frontend && npm run dev
```

Open **http://localhost:5173**

## 3. Production (single server)

```bash
cd frontend && npm run build     # outputs frontend/dist

cd backend && .venv/Scripts/python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

Open **http://localhost:8000** — FastAPI serves the built site and the API from one port.

## API

| Method | Route               | Purpose                                        |
| ------ | ------------------- | ---------------------------------------------- |
| GET    | `/api/health`       | Liveness check                                 |
| GET    | `/api/portfolio`    | All site content (profile, projects, skills…)  |
| POST   | `/api/contact`      | Saves a message to `messages.json` (validated) |
| GET    | `/api/messages/count` | Number of saved messages                     |

## Editing your content

- **All text/projects/skills** live in `backend/portfolio_data.py`.
- `frontend/src/fallback.ts` is a bundled mirror used only when the API is unreachable — keep it in sync (or ignore it if you always run the backend).
- **Project links**: add `"github"` / `"demo"` URLs inside each project's `links` dict — the cards already render them.
- Contact submissions land in `backend/messages.json` (git-ignored; don't commit it).

## Notes

- No secrets are stored or transmitted; the contact form only records name, email and message locally.
- If the backend is down, the site still renders from bundled data and shows a small "backend offline" notice.
