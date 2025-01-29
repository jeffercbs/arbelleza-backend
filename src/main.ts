import { clerkMiddleware, createClerkClient } from '@clerk/express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

const clerkClient = createClerkClient({
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  jwtKey: process.env.CLERK_JWT_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.enableCors({
    origin: ['http://localhost:3001', 'https://arbelleza.com'],
  });
  app.use(cookieParser());
  app.use(clerkMiddleware({ clerkClient }));
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(helmet());

  await app.listen(port);
}
bootstrap();
