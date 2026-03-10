import { config as loadEnv } from 'dotenv';
loadEnv(); // Cargar .env antes de create() para leer SSL_* al arrancar con HTTPS

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('helmet');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const compression = require('compression');
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

function getHttpsOptions(): { key: Buffer; cert: Buffer } | undefined {
  const keyPath = process.env.SSL_KEY_PATH;
  const certPath = process.env.SSL_CERT_PATH;
  if (!keyPath || !certPath) return undefined;
  const keyFull = join(process.cwd(), keyPath);
  const certFull = join(process.cwd(), certPath);
  if (!existsSync(keyFull) || !existsSync(certFull)) return undefined;
  try {
    return {
      key: readFileSync(keyFull),
      cert: readFileSync(certFull),
    };
  } catch {
    return undefined;
  }
}

async function bootstrap() {
  const httpsOptions = getHttpsOptions();
  const app = await NestFactory.create(AppModule, httpsOptions ? { httpsOptions } : {});
  const config = app.get(ConfigService);

  // ── Seguridad ─────────────────────────────────────────────────
  app.use(helmet());
  app.use(compression());

  // ── CORS ──────────────────────────────────────────────────────
  let origins = config
    .get<string>('CORS_ORIGINS', 'http://localhost:5173,http://localhost:3000,http://localhost:3001')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  if (httpsOptions) {
    const extra = ['https://localhost:5173', 'https://localhost:3001', 'https://localhost:3000'];
    origins = [...new Set([...origins, ...extra])];
  }
  // En desarrollo, asegurar que el front en :3000 (Next.js) esté permitido
  if (config.get('NODE_ENV') !== 'production' && !origins.includes('http://localhost:3000')) {
    origins.push('http://localhost:3000');
  }

  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ── Prefix global ─────────────────────────────────────────────
  app.setGlobalPrefix('v1');

  // ── Pipes ─────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── Filtros e interceptores ───────────────────────────────────
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // ── Swagger ───────────────────────────────────────────────────
  if (config.get('NODE_ENV') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('SistemaPJ API')
      .setDescription('Mesa de Ayuda & Inventario IT — Poder Judicial')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  const port = config.get<number>('PORT', 3000);
  await app.listen(port);
  const protocol = httpsOptions ? 'https' : 'http';
  console.log(`🚀 SistemaPJ API corriendo en: ${protocol}://localhost:${port}/v1`);
  console.log(`📚 Swagger: ${protocol}://localhost:${port}/docs`);
}

bootstrap();
