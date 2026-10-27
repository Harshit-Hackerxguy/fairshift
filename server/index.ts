// ═══════════════════════════════════════════════════════════════
// FairShift — Server Entry Point
// Single-container Cloud Run architecture
// Serves both /api/* and static frontend on PORT
// ═══════════════════════════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRouter from './routes/api.js';
import { securityHeaders, rateLimit } from './middleware/security.js';

// ESM dirname equivalent
const __dirname = path.resolve();

const app = express();
const PORT = parseInt(process.env.PORT || '8080', 10);

// ─── CORS Configuration ─────────────────────────────────────
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:8080'];

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// ─── Middleware ───────────────────────────────────────────────
app.use(securityHeaders);
app.use(rateLimit());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── API Routes ──────────────────────────────────────────────
app.use('/api', apiRouter);

// ─── Static Frontend (production) ────────────────────────────
// In production, serve the built Vite frontend from dist/client
const clientDistPath = path.resolve(process.cwd(), 'dist/client');
app.use(express.static(clientDistPath));

// SPA fallback: serve index.html for any non-API route
app.use((_req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // In dev mode, the Vite dev server handles frontend
      res.status(200).json({
        message: 'FairShift API is running. Frontend is served via Vite dev server in development.',
        docs: {
          health: 'GET /api/health',
          context: 'GET /api/context?industry=construction|college',
          payslip: 'GET /api/payslip/:workerId',
          checkin: 'POST /api/attendance/checkin',
          grievances: 'POST /api/grievances',
          grievanceStatus: 'PATCH /api/grievances/:id/status',
          feedback: 'POST /api/feedback',
          skillVerify: 'POST /api/skills/:workerId/verify',
        },
      });
    }
  });
});

// ─── Start Server ────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔══════════════════════════════════════════════════╗
  ║          FairShift — Decent Work Platform        ║
  ║          SDG 8: Economic Growth Engine           ║
  ╠══════════════════════════════════════════════════╣
  ║  Server:  http://localhost:${PORT}                  ║
  ║  API:     http://localhost:${PORT}/api/health       ║
  ║  Mode:    ${(process.env.NODE_ENV || 'development').padEnd(37)}║
  ╚══════════════════════════════════════════════════╝
  `);
});

export default app;
