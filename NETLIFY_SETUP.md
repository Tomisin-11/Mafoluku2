# Deploying to Netlify

## How it works
The Express backend runs as a **Netlify Serverless Function** — no separate server needed.
All `/api/*` requests are automatically redirected to the function.

---

## Step 1 — Push to GitHub
Push your project to a GitHub repository.

## Step 2 — Create Netlify Site
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repo

## Step 3 — Build settings (auto-detected from netlify.toml)
| Field | Value |
|---|---|
| Build command | `npm install && npm run build` |
| Publish directory | `dist` |

## Step 4 — Environment Variables ⚠️ REQUIRED
In Netlify → **Site settings → Environment variables**, add:

| Key | Value |
|---|---|
| `MONGODB_URI` | `mongodb+srv://kolade443_db_user:HeH1qUdbXnCUdIHQ@cluster0.xtnsgu0.mongodb.net/church-cms` |
| `JWT_SECRET` | Any long random string e.g. `mafoluku_super_secret_key_2025` |

> **IMPORTANT**: Without these env vars the admin login will show "Database connection failed".

## Step 5 — Deploy
Click **Deploy site**. Done!

## Step 6 — Seed the database (first time only)
Run locally to populate initial content:
```
npm run seed
```

---

## Local Development
```bash
npm install      # installs frontend + server deps
npm run dev      # starts both Vite (port 5173) + Express (port 5000)
```
Open http://localhost:5173 — the Vite proxy routes `/api/*` to Express automatically.

### Admin login
- URL: http://localhost:5173/admin
- Email: admin@church.com
- Password: Admin@123
