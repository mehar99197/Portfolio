# GitHub Pages Deployment Guide

## 🚀 Frontend Deployment (GitHub Pages)

Your React frontend is now configured to deploy automatically to GitHub Pages.

### Quick Deploy Steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Setup for GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub: `https://github.com/mehar99197/Portfolio`
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - The workflow will run automatically on every push to `main` branch

3. **Your site will be live at:**
   ```
   https://mehar99197.github.io/Portfolio/
   ```

### Manual Deploy (Alternative):
If you prefer to deploy manually using gh-pages:
```bash
npm run deploy
```

---

## 🔧 Backend Deployment Options

⚠️ **Important**: GitHub Pages only hosts static files (your React frontend). You need to deploy your backend (Express/MongoDB) separately.

### Recommended Backend Hosting Options:

#### Option 1: Render (Recommended - Free Tier Available)
1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new **Web Service**
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm run server:prod`
   - Add environment variables:
     - `MONGODB_URI` - Your MongoDB connection string
     - `JWT_SECRET` - Your JWT secret
     - `CLIENT_URL` - `https://mehar99197.github.io/Portfolio`
     - `NODE_ENV` - `production`

#### Option 2: Railway
1. Visit [railway.app](https://railway.app)
2. Deploy from GitHub
3. Add environment variables
4. Railway will auto-detect Node.js and deploy

#### Option 3: Vercel (Serverless)
1. Install Vercel CLI: `npm i -g vercel`
2. Create `vercel.json` in root:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```
3. Run `vercel` in terminal

#### Option 4: Heroku
1. Install Heroku CLI
2. Commands:
   ```bash
   heroku create your-portfolio-api
   heroku config:set MONGODB_URI=your_mongo_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set CLIENT_URL=https://mehar99197.github.io/Portfolio
   git push heroku main
   ```

---

## 🔄 Connecting Frontend to Backend

After deploying your backend, update your frontend API calls:

1. Create a `.env.production` file:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

2. Update API service files to use this URL:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

3. Update CORS in `server.js` to include your GitHub Pages URL:
   ```javascript
   origin: [
     'https://mehar99197.github.io',
     process.env.CLIENT_URL || 'http://localhost:5173'
   ]
   ```

---

## 📝 MongoDB Setup

For production MongoDB:

### Option 1: MongoDB Atlas (Recommended - Free Tier)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to backend environment variables

### Option 2: Alternative MongoDB hosts
- Railway (includes MongoDB)
- Render (includes Redis, PostgreSQL - would need to migrate)

---

## ✅ Deployment Checklist

- [ ] Frontend code pushed to GitHub
- [ ] GitHub Pages enabled in repository settings
- [ ] GitHub Actions workflow running successfully
- [ ] Backend deployed to hosting service
- [ ] MongoDB database set up (MongoDB Atlas)
- [ ] Environment variables configured on backend host
- [ ] Frontend API URL updated to point to deployed backend
- [ ] CORS configured to allow GitHub Pages domain
- [ ] Test all functionality on live site

---

## 🐛 Troubleshooting

### Frontend Issues:
- **404 errors**: Check that `base` in `vite.config.js` matches your repo name (`/Portfolio/`)
- **Blank page**: Check browser console for errors
- **Assets not loading**: Verify GitHub Pages is enabled and workflow completed

### Backend Issues:
- **CORS errors**: Add your GitHub Pages URL to CORS origins in `server.js`
- **Database connection failed**: Check MongoDB connection string in environment variables
- **API not responding**: Verify backend service is running on hosting platform

---

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)

---

**Need help?** Check the Actions tab in your GitHub repository for deployment logs.
