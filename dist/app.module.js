"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const tickets_module_1 = require("./tickets/tickets.module");
const equipos_module_1 = require("./equipos/equipos.module");
const software_module_1 = require("./software/software.module");
const contratos_module_1 = require("./contratos/contratos.module");
const ubicaciones_module_1 = require("./ubicaciones/ubicaciones.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    schema: 'pj',
                    ssl: { rejectUnauthorized: false },
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: config.get('NODE_ENV') !== 'production',
                    logging: config.get('NODE_ENV') === 'development' ? ['query', 'error'] : ['error'],
                    extra: {
                        max: 5,
                        idleTimeoutMillis: 30000,
                        connectionTimeoutMillis: 5000,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            usuarios_module_1.UsuariosModule,
            tickets_module_1.TicketsModule,
            equipos_module_1.EquiposModule,
            software_module_1.SoftwareModule,
            contratos_module_1.ContratosModule,
            ubicaciones_module_1.UbicacionesModule,
            dashboard_module_1.DashboardModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map