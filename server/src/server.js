import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger for visibility
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// API Routes
app.use('/api', routes);

// Also mount root routes for exact spec compliance (/feed, /swipe, /matches)
app.use('/', routes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

const server = app.listen(PORT, () => {
  console.log(`\n===========================================`);
  console.log(`   Coy Discover Server Running`);
  console.log(`   Listening on: http://localhost:${PORT}`);
  console.log(`   Endpoints:`);
  console.log(`   - GET  /feed`);
  console.log(`   - POST /swipe`);
  console.log(`   - GET  /matches`);
  console.log(`   - GET  /me`);
  console.log(`   - POST /reset`);
  console.log(`===========================================\n`);
});

export default app;
