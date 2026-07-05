# SafeCampus Frontend

React + Vite + Tailwind CSS v4 frontend for the SafeCampus cybersecurity training platform.

## Setup

```bash
npm install
cp .env.example .env
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build        # outputs to /dist
npm run preview      # preview at :4173
```

## Deploy

- **Netlify:** drag `dist/` to netlify.com/drop — or connect GitHub (uses `netlify.toml`)
- **Vercel:** connect GitHub repo, set root to `frontend/` (uses `vercel.json`)

See root `README.md` for full deployment guide.
