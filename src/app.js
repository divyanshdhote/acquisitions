import express, { urlencoded } from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(
  morgan('combined', {
    steam: { write: message => logger.info(message.trim()) },
  })
);

app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  logger.info('hello from acquisition');
  res.send('Hello from acquisitions');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Acquisitions API is running!' });
});

import authRoutes from '#routes/auth.routes.js';
import usersRoutes from '#routes/users.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
