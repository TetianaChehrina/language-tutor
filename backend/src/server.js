import dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import authRouter from './routes/authRouter.js';
import teachersRouter from './routes/teachersRouter.js';
import lessonRouter from './routes/lessonRouter.js';
import cloudinary from './utils/cloudinaryConfig.js';

export const setupServer = () => {
  const app = express();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const PORT = Number(env('PORT', '8000'));
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  );
  app.use(express.json());

  app.use('/api/auth', authRouter);
  app.use('/api/teachers', teachersRouter);
  app.use('/api/lessons', lessonRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
