# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- Responsive design that works on all devices
- Dynamic content management
- Admin dashboard for content updates
- Contact form with email integration
- Modern UI with smooth animations

## 🛠️ Technologies Used

- **Frontend**: React 19, React Router, Tailwind CSS
- **Build Tool**: Vite
- **Backend**: Express.js, MongoDB
- **Authentication**: JWT
- **Deployment**: GitHub Pages (Frontend)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/mehar99197/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🚀 Deployment

### Frontend Deployment to GitHub Pages

The frontend is automatically deployed to GitHub Pages when you push to the main branch.

#### Manual Deployment

To manually deploy the frontend:

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch

**Live URL**: https://mehar99197.github.io/Portfolio

#### Important: Configure Backend API URL

You have two options to configure the backend API URL for production:

**Option 1: Using Environment Variables (Recommended)**

1. Create a `.env.production` file in the root directory:
```bash
VITE_API_URL=https://your-backend-url.com/api
```

2. The app will automatically use this URL in production builds.

**Option 2: Hardcode in Source Files**

Update the placeholder URL in these files:

1. `src/frontend/pages/Home.jsx`
2. `src/frontend/pages/About.jsx`
3. `src/frontend/pages/Projects.jsx`
4. `src/context/AuthContext.jsx`

Replace `'https://your-backend-api-url.com/api'` with your actual backend URL.

**Example with Render:**
```javascript
const apiUrl = useMemo(() => {
  if (process.env.NODE_ENV === 'production') {
    return import.meta.env.VITE_API_URL 
      ? `${import.meta.env.VITE_API_URL}/auth/admin-profile`
      : 'https://your-app-name.onrender.com/api/auth/admin-profile';
  }
  // ... rest of code
}, []);
```

#### Using Environment Variables in GitHub Actions

To use environment variables in the automated deployment, add them as secrets in your GitHub repository:

1. Go to repository Settings → Secrets and variables → Actions
2. Add a new secret: `VITE_API_URL` with your backend URL
3. Update the `.github/workflows/deploy.yml` to use the secret:

```yaml
- name: Build project
  run: npm run build
  env:
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

### Backend Deployment

The backend needs to be deployed separately. Recommended platforms:

- **Render.com** (Free tier available)
- **Railway.app** (Free tier available)
- **Heroku**
- **DigitalOcean**

#### Backend Environment Variables

Make sure to set these environment variables on your backend hosting:

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to `production`
- `EMAIL_USER` - Email for contact form
- `EMAIL_PASS` - Email password or app password
- `FRONTEND_URL` - Your GitHub Pages URL (https://mehar99197.github.io/Portfolio)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages
- `npm run server` - Start backend server
- `npm run server:dev` - Start backend in development mode
- `npm run server:prod` - Start backend in production mode

## 🔧 Configuration

### GitHub Pages Setup

After merging this PR:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select `gh-pages` branch as the source
4. Click Save

The site will be available at: https://mehar99197.github.io/Portfolio

### Vite Configuration

The `vite.config.js` is configured with:
- Base path: `/Portfolio/` (for GitHub Pages)
- React plugin
- Development server on port 5173

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ahmad Nawaz**

- GitHub: [@mehar99197](https://github.com/mehar99197)
- LinkedIn: [Ahmad Nawaz](https://www.linkedin.com/in/ahmad-nawaz-b97b85327/)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing fast build tool
- Tailwind CSS for the utility-first CSS framework
