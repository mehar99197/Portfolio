# 🚀 Quick Deployment Commands

## First Time Setup

1. **Ensure you're in the project directory:**
   ```bash
   cd "c:\Users\Mehar Ahmad\Desktop\Work\Web development\Portfolio\portfolio"
   ```

2. **Build the project locally (test):**
   ```bash
   npm run build
   ```

3. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit with GitHub Pages setup"
   ```

4. **Connect to GitHub:**
   ```bash
   git remote add origin https://github.com/mehar99197/Portfolio.git
   git branch -M main
   git push -u origin main
   ```

## Regular Deployment

Every time you make changes and want to deploy:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

The GitHub Actions workflow will automatically:
- Build your project
- Deploy to GitHub Pages
- Your site will be live at: https://mehar99197.github.io/Portfolio/

## Manual Deployment (Alternative)

If GitHub Actions isn't working, you can deploy manually:

```bash
npm run deploy
```

## Update Backend URL

After deploying your backend, update `.env.production`:

```bash
# Open the file and replace the URL
VITE_API_URL=https://your-actual-backend-url.com/api
```

Then commit and push:
```bash
git add .env.production
git commit -m "Update backend URL"
git push origin main
```

## Check Deployment Status

- Go to: https://github.com/mehar99197/Portfolio/actions
- Click on the latest workflow run
- View logs if there are any issues

## Enable GitHub Pages (First Time Only)

1. Go to: https://github.com/mehar99197/Portfolio/settings/pages
2. Under "Source", select: **GitHub Actions**
3. Save

## Backend Deployment (Render Example)

1. Go to: https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Select your Portfolio repository
5. Configure:
   - **Name:** portfolio-backend
   - **Build Command:** `npm install`
   - **Start Command:** `npm run server:prod`
6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key
   - `CLIENT_URL`: `https://mehar99197.github.io`
   - `NODE_ENV`: `production`
7. Click "Create Web Service"
8. Copy the deployment URL (e.g., https://portfolio-backend-xyz.onrender.com)
9. Update `.env.production` with this URL

## MongoDB Atlas Setup

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (free tier)
4. Create database user
5. Get connection string
6. Add to Render environment variables

---

## ✅ Deployment Checklist

- [ ] Code committed to Git
- [ ] Pushed to GitHub
- [ ] GitHub Pages enabled in settings
- [ ] GitHub Actions workflow completed successfully
- [ ] Backend deployed (Render/Railway/etc.)
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set on backend
- [ ] `.env.production` updated with backend URL
- [ ] Site accessible at https://mehar99197.github.io/Portfolio/
- [ ] API calls working from frontend to backend

---

**Your portfolio will be live at:** https://mehar99197.github.io/Portfolio/

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
