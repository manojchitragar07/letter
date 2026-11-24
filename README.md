# Dearly — A Digital Letter Experience

> **"Some feelings deserve more than a text."**  
> Turn your thoughts into beautiful letters. Write, design, and send something that stays.

---

## 🏛️ Systematic System Architecture

The project is systematically decoupled into separate **Frontend** and **Backend** services:

```
letter/
├── backend/                  # Standalone Node.js / Express REST API service
│   ├── src/
│   │   ├── controllers/      # Request handlers (letters, uploads)
│   │   ├── routes/           # REST endpoints (/api/letters, /api/upload)
│   │   ├── services/         # Storage layer, JSON atomic DB, Supabase integration
│   │   ├── types/            # TypeScript interfaces & data models
│   │   └── server.ts         # Express server listening on http://localhost:5001
│   ├── data/                 # Persistent database (letters.json)
│   ├── uploads/              # Uploaded photos & stickers
│   ├── supabase/             # PostgreSQL schema & Row Level Security (RLS)
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Standalone React / Next.js client application
│   ├── public/
│   │   └── assets/           # Handcrafted SVG stamps, botanicals, washi tapes, seals
│   ├── src/
│   │   ├── app/              # Next.js routes (/, /studio, /templates, /letter/[slug], etc.)
│   │   ├── components/       # Studio canvas, 3D envelope, signature pad, vinyl player
│   │   ├── data/             # Stationery templates & asset library catalog
│   │   ├── lib/              # API client, Web Audio API sound synthesizer
│   │   └── types/            # TypeScript interfaces
│   ├── next.config.mjs       # Rewrites proxying /api and /uploads to backend:5001
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── package.json              # Top-level orchestration (run/build both together)
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Dependencies for Both Services
```bash
npm run install:all
```

### 2. Run Both Services Concurrently
```bash
npm run dev
# Starts Backend on http://localhost:5001
# Starts Frontend on http://localhost:3000
```

Or run each independently in separate terminals:

#### Running Backend Separately:
```bash
cd backend
npm run dev
# Listens on http://localhost:5001
# Health check: http://localhost:5001/api/health
```

#### Running Frontend Separately:
```bash
cd frontend
npm run dev
# Listens on http://localhost:3000
```

---

## 📡 REST API Reference (Backend: Port 5001)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend service health check |
| `GET` | `/api/letters` | Get public letter showcase |
| `POST` | `/api/letters` | Create a new sealed letter or update existing |
| `GET` | `/api/letters/:slug` | Retrieve letter for receiver (secretKey stripped) |
| `POST` | `/api/letters/:slug/read` | Mark letter as opened / read receipt tracking |
| `GET` | `/api/letters/manage/:secretKey` | Sender management data & read statistics |
| `PUT` | `/api/letters/manage/:secretKey` | Sender edit letter content or design |
| `DELETE` | `/api/letters/manage/:secretKey` | Permanently delete letter and invalidate URL |
| `POST` | `/api/upload` | Multipart file upload (photos, stickers) |
