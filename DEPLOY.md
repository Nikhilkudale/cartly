# Cartly — Phase A free deploy (GitHub + Cloudflare + Render)

Estimated time: **1–2 hours**. Total cost: **₹0**.

| Part | Host | URL example |
|------|------|-------------|
| Frontend | Cloudflare Pages | `https://cartly.pages.dev` |
| Backend API | Render (free) | `https://cartly-api.onrender.com` |
| Database | H2 in-memory (demo) | Resets when Render restarts |

---

## Step 1 — Push to GitHub

### 1.1 Create a new repository on GitHub

1. Open [github.com/Nikhilkudale?tab=repositories](https://github.com/Nikhilkudale?tab=repositories)
2. Click **New**
3. Name: **`cartly`** (or `ecommerce-app`)
4. **Public**, do **not** add README (you already have one)
5. Create repository

### 1.2 Push from your PC

```powershell
cd c:\Users\nikhi\ecommerce-app

git init
git add .
git commit -m "Prepare Cartly for free demo deploy"

git branch -M main
git remote add origin https://github.com/Nikhilkudale/cartly.git
git push -u origin main
```

If `git` asks you to log in, use **GitHub CLI** (`gh auth login`) or a **Personal Access Token** as the password.

---

## Step 2 — Deploy backend on Render (free)

1. Go to [render.com](https://render.com) → Sign up (GitHub login is easiest).
2. **New +** → **Web Service**
3. Connect repository **`Nikhilkudale/cartly`**
4. Settings:

| Field | Value |
|-------|--------|
| Name | `cartly-api` |
| Root Directory | `backend` |
| Runtime | Java |
| Build Command | `mvn -DskipTests package` |
| Start Command | `java -Dspring.profiles.active=prod -jar target/ecommerce-backend-1.0.0.jar` |
| Instance type | **Free** |

5. **Environment variables** (Environment tab):

| Key | Value |
|-----|--------|
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `APP_JWT_SECRET` | Long random string (32+ chars) |
| `APP_CORS_ALLOWED_ORIGINS` | `https://YOUR-PROJECT.pages.dev` *(update after Step 3)* |

6. Click **Create Web Service** and wait until status is **Live**.
7. Test: open `https://cartly-api.onrender.com/api/categories` — you should see JSON.

**Note:** Free tier sleeps after ~15 min idle. First request may take 30–60 seconds.

**Demo logins** (re-created on each cold start with empty DB):

- Admin: `admin@shop.com` / `admin123`
- User: `user@shop.com` / `user123`

After first deploy, open Render **Shell** or call Admin import — or restart once; seed runs automatically.

---

## Step 3 — Deploy frontend on Cloudflare Pages (free)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. **Pages** → **Connect to Git**
3. Select **`Nikhilkudale/cartly`**
4. Build settings:

| Field | Value |
|-------|--------|
| Production branch | `main` |
| Root directory | `frontend` |
| Build command | `npm install && npm run build` |
| Build output directory | `dist` |

5. **Environment variables** (Production):

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://cartly-api.onrender.com/api` |

*(Replace with your real Render URL.)*

6. **Save and Deploy**
7. Copy your Pages URL, e.g. `https://cartly.pages.dev`

### 3.1 Update Render CORS

Back on Render → **cartly-api** → **Environment**:

```
APP_CORS_ALLOWED_ORIGINS=https://cartly.pages.dev,https://cartly-xxx.pages.dev
```

Use your exact Cloudflare URL(s). **Save** → Render will redeploy.

### 3.2 Redeploy frontend (optional)

Cloudflare → **Retry deployment** so build picks up env vars.

---

## Step 4 — Load products on live site

1. Open `https://YOUR-PAGES-URL`
2. Login as **admin@shop.com** / **admin123**
3. **Admin** → **Import Flipkart-style demo catalog** or **Upload CSV** (`data/cartly-products.csv`)

---

## Step 5 — Put link on resume

```
Cartly — Full-stack e-commerce (Spring Boot, React, JWT)
Live: https://cartly.pages.dev
GitHub: https://github.com/Nikhilkudale/cartly
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| CORS error in browser | Set `APP_CORS_ALLOWED_ORIGINS` on Render to exact Pages URL (no trailing slash) |
| API 404 from frontend | Check `VITE_API_URL` ends with `/api` |
| Render build fails | Ensure **Root Directory** = `backend`, Java 17 |
| Blank page on refresh | `_redirects` file is in `frontend/public/` |
| Slow first load | Render free tier waking up — normal |
| No products | Admin → import demo catalog |

---

## Later upgrades (when you have budget)

- MySQL on Railway / PlanetScale / paid Render DB
- Custom domain on Cloudflare
- Razorpay for real payments
