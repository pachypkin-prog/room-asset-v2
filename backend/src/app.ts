import express from 'express';
import cors from 'cors';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',')[0].trim() : true }));
app.use(express.json({ limit: '5mb' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', router);
app.use(errorHandler);
