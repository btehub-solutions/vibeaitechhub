import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

// Cache the Nest.js app instance to avoid recreating it on every request
let cachedApp: INestApplication;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    
    // Enable CORS for frontend communication
    app.enableCors({
      origin: true, // Allow all origins in production (Vercel handles this)
      credentials: true,
    });
    
    // Set global prefix for all routes
    app.setGlobalPrefix('api');
    
    await app.init();
    cachedApp = app;
  }
  
  return cachedApp;
}

export default async function handler(req, res) {
  try {
    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();
    
    // Remove the /api prefix from the path since we set it globally
    const originalUrl = req.url;
    if (req.url.startsWith('/api')) {
      req.url = req.url.replace('/api', '');
    }
    
    return expressApp(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
