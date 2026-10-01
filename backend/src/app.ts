import express from 'express';
import cors from 'cors';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();
const allowed = process.env.CORS_ORIGIN?.split(',').map((s) => s.trim());
app.use(cors({ origin: allowed ?? true }));
app.use(express.json({ limit: '5mb' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', router);
app.use(errorHandler);
