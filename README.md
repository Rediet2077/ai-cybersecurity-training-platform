# 🛡️ SafeCampus — AI-Powered Cybersecurity Training Platform

> Master cybersecurity through interactive labs, AI guidance, quizzes, CTF challenges, and hands-on hacking practice.

![SafeCampus](https://img.shields.io/badge/SafeCampus-v1.0.0-blue?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start (Local)](#quick-start-local)
- [Deploy to Netlify](#deploy-to-netlify)
- [Deploy to Vercel](#deploy-to-vercel)
- [Deploy to GitHub Pages](#deploy-to-github-pages)
- [Environment Variables](#environment-variables)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Landing Page** | Hero, feature cards, stats, popular courses, why choose section |
| 📚 **16 Courses** | Beginner to Advanced with full module/lesson viewer |
| 🧪 **21 Cyber Labs** | SQL Injection, XSS, Buffer Overflow, AD Attacks, Wi-Fi Hacking + more |
| 🤖 **AI Assistant** | Chat interface with code vulnerability analysis |
| ❓ **Quiz System** | Timed quizzes with auto-grading and results review |
| 🏆 **Leaderboard** | Global rankings with weekly/monthly/all-time filters |
| 📖 **Resources** | 12 cheat sheets (download/preview), 8 video tutorials, books, tools |
| 👤 **Profile** | Stats, XP progress, badges, certificates |
| 🔐 **Auth Pages** | Login, Register with password strength, role selector |

---

## 🛠️ Tech Stack

### Frontend (this repo)
- **React 19** + JSX
- **Vite 8** (rolldown/oxc build)
- **Tailwind CSS v4**
- **React Router DOM v7**

### Backend (planned)
- Python · Django · Django REST Framework
- PostgreSQL · Redis

### AI Service (planned)
- Python · LangChain · HuggingFace
- Vector DB (FAISS / ChromaDB) · RAG

---

## 📁 Project Structure

```
ai-cybersecurity-training-platform/
├── frontend/                  ← React app (this is what you deploy)
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Layout.jsx
│   │   │       └── Saidbar.jsx
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Dashboard/
│   │   │   ├── Courses/
│   │   │   ├── CourseDetail/
│   │   │   ├── Labs/
│   │   │   ├── Quiz/
│   │   │   ├── Leaderboard/
│   │   │   ├── AIChat/
│   │   │   ├── Resources/
│   │   │   └── profile/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   ├── favicon.svg
│   │   └── _redirects        ← Netlify SPA routing
│   ├── netlify.toml
│   ├── vercel.json
│   ├── vite.config.js
│   └── package.json
├── backend/                   ← Django (future)
├── ai-service/                ← Python AI engine (future)
├── sandbox/                   ← Docker lab sandbox (future)
└── .github/workflows/         ← CI/CD
```

---

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js **18+** — [download](https://nodejs.org)
- npm **9+** (comes with Node)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/ai-cybersecurity-training-platform.git
cd ai-cybersecurity-training-platform

# 2. Go to frontend
cd frontend

# 3. Install dependencies
npm install

# 4. Copy environment file
cp .env.example .env

# 5. Start dev server
npm run dev
```

App opens at **http://localhost:3000**

### Other commands
```bash
npm run build     # Production build → /dist
npm run preview   # Preview production build at :4173
npm run lint      # Lint with oxlint
```

---

## 🌐 Deploy to Netlify

### Option A — Netlify Drop (fastest, no account needed)
1. Run `npm run build` inside `frontend/`
2. Go to **https://app.netlify.com/drop**
3. Drag the `frontend/dist` folder onto the page
4. Done — live in seconds ✅

### Option B — Netlify CLI
```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### Option C — Connect GitHub (auto-deploy on push)
1. Push this repo to GitHub
2. Go to https://app.netlify.com → **Add new site** → **Import from Git**
3. Set:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
4. Click **Deploy site** ✅

> The `netlify.toml` and `public/_redirects` files handle SPA routing automatically.

---

## ▲ Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
cd frontend
npm run build
vercel --prod
```

### Option B — Connect GitHub
1. Go to https://vercel.com → **New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy** ✅

> The `vercel.json` handles SPA rewrites automatically.

---

## 📄 Deploy to GitHub Pages

```bash
# Install gh-pages
cd frontend
npm install --save-dev gh-pages

# Add to package.json scripts:
#   "deploy": "gh-pages -d dist"
# Add: "homepage": "https://YOUR_USERNAME.github.io/ai-cybersecurity-training-platform"

npm run build
npm run deploy
```

> **Note:** For GitHub Pages you need to add `base: '/ai-cybersecurity-training-platform/'` to `vite.config.js` if deploying to a sub-path.

---

## 🔑 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8000/api/v1` | Django backend API URL |
| `VITE_APP_NAME` | `SafeCampus` | Application name |
| `VITE_APP_VERSION` | `1.0.0` | App version |
| `VITE_ENABLE_AI_CHAT` | `true` | Enable AI chat feature |
| `VITE_ENABLE_CTF` | `true` | Enable CTF challenges |

Copy `.env.example` to `.env` and fill in your production values.

For **Netlify/Vercel**, set these in the platform's environment variables dashboard.

---

## 📝 License

MIT — free to use, modify and distribute.

---

> Built with ❤️ by the SafeCampus Team
