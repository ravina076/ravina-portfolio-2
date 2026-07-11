# Ravina T — Portfolio

React + TypeScript + Vite + Framer Motion. Static site, ready for Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploy to Vercel

**Option A — GitHub (recommended)**
1. Create a new repo on GitHub and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to https://vercel.com → **Add New Project** → import that GitHub repo.
3. Vercel auto-detects Vite. Framework preset: **Vite**, Build command: `npm run build`, Output directory: `dist`. Click **Deploy**.

**Option B — Vercel CLI, no GitHub needed**
```bash
npm install -g vercel
vercel login
vercel        # deploy a preview
vercel --prod # deploy to production
```

## Editing content

Everything lives in `src/App.tsx` — hero text, About copy, the `skills` array,
Experience/Education timeline items, and the Certifications cards. Images are
in `src/assets/`. Swap a file there and update the matching `import` at the
top of `App.tsx` to change a photo.

Colors, fonts, and spacing are all CSS variables at the top of `src/index.css`
under `:root` — change `--accent` or `--amber` there to shift the whole
palette in one place.
