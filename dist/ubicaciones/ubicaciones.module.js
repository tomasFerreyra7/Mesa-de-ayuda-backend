"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbicacionesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ubicaciones_service_1 = require("./ubicaciones.service");
const ubicaciones_controller_1 = require("./ubicaciones.controller");
const circunscripcion_entity_1 = require("./entities/circunscripcion.entity");
const distrito_entity_1 = require("./entities/distrito.entity");
const juzgado_entity_1 = require("./entities/juzgado.entity");
const puesto_entity_1 = require("./entities/puesto.entity");
let UbicacionesModule = class UbicacionesModule {
};
exports.UbicacionesModule = UbicacionesModule;
exports.UbicacionesModule = UbicacionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([circunscripcion_entity_1.Circunscripcion, distrito_entity_1.Distrito, juzgado_entity_1.Juzgado, puesto_entity_1.Puesto])],
        controllers: [ubicaciones_controller_1.UbicacionesController],
        providers: [ubicaciones_service_1.UbicacionesService],
        exports: [ubicaciones_service_1.UbicacionesService, typeorm_1.TypeOrmModule],
    })
], UbicacionesModule);
//# sourceMappingURL=ubicaciones.module.js.map