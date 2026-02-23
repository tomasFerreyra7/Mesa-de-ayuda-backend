"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const helmet = require('helmet');
const compression = require('compression');
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.use(helmet());
    app.use(compression());
    const origins = config.get('CORS_ORIGINS', 'http://localhost:5173')
        .split(',')
        .map((o) => o.trim());
    app.enableCors({
        origin: origins,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    if (config.get('NODE_ENV') !== 'production') {
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle('SistemaPJ API')
            .setDescription('Mesa de Ayuda & Inventario IT — Poder Judicial')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup('docs', app, document, {
            swaggerOptions: { persistAuthorization: true },
        });
    }
    const port = config.get('PORT', 3000);
    await app.listen(port);
    console.log(`🚀 SistemaPJ API corriendo en: http://localhost:${port}/v1`);
    console.log(`📚 Swagger: http://localhost:${port}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map