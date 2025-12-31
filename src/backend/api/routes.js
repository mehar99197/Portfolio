import express from 'express';
import authRoutes from '../routes/authRoutes.js';
import projectRoutes from '../routes/projectRoutes.js';
import contactRoutes from '../routes/contactRoutes.js';
import skillRoutes from '../routes/skillRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/contact', contactRoutes);
router.use('/skills', skillRoutes);
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        me: 'GET /api/auth/me'
      },
      projects: {
        getAll: 'GET /api/projects',
        getOne: 'GET /api/projects/:id',
        create: 'POST /api/projects (Admin)',
        update: 'PUT /api/projects/:id (Admin)',
        delete: 'DELETE /api/projects/:id (Admin)'
      },
      contact: {
        submit: 'POST /api/contact',
        getAll: 'GET /api/contact (Admin)'
      }
    }
  });
});

export default router;
