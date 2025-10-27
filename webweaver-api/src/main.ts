import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable cookie parser middleware
  app.use(cookieParser());
  
  // Serve static files from the public directory
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
