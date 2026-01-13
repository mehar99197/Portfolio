import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import apiRoutes from './src/backend/api/routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://192.168.1.9:5173',
  'http://192.168.1.9:5174',
  'https://mehar99197.github.io',
  'http://mehar99197.github.io'
];

// Add CLIENT_URL from environment if it exists
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => {
  console.warn('MongoDB Connection Warning:', err.message);
  console.log(' Server will run without database. Auth features will be limited.');
});
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API',
    version: '1.0.0',
    documentation: '/api',
    status: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/debug/env', (req, res) => {
  res.json({
    EMAIL_USER: process.env.EMAIL_USER ? '✓ Set' : '✗ Missing',
    EMAIL_PASS: process.env.EMAIL_PASS ? '✓ Set (hidden)' : '✗ Missing',
    RECEIVER_EMAIL: process.env.RECEIVER_EMAIL ? '✓ Set' : '✗ Missing',
    NODE_ENV: process.env.NODE_ENV || 'not set',
    PORT: process.env.PORT || 'not set'
  });
});
app.use('/api', apiRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});

export default app;
