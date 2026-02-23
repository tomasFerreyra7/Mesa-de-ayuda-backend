import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TicketsModule } from './tickets/tickets.module';
import { EquiposModule } from './equipos/equipos.module';
import { SoftwareModule } from './software/software.module';
import { ContratosModule } from './contratos/contratos.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    // ── Config global ─────────────────────────────────────────
    ConfigModule.forRoot({ isGlobal: true }),

    // ── TypeORM con Neon DB ───────────────────────────────────
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        schema: 'pj',
        ssl: { rejectUnauthorized: false }, // requerido por Neon
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // En desarrollo: TypeORM crea/actualiza tablas desde las entidades. En prod siempre false.
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development' ? ['query', 'error'] : ['error'],
        extra: {
          max: 5, // Neon free tier: máx conexiones limitadas
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 5000,
        },
      }),
      inject: [ConfigService],
    }),

    // ── Feature modules ───────────────────────────────────────
    AuthModule,
    UsuariosModule,
    TicketsModule,
    EquiposModule,
    SoftwareModule,
    ContratosModule,
    UbicacionesModule,
    DashboardModule,
  ],
})
export class AppModule {}

