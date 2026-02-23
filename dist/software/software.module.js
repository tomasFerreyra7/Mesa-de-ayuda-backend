"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const software_service_1 = require("./software.service");
const software_controller_1 = require("./software.controller");
const software_entity_1 = require("./entities/software.entity");
const software_equipo_entity_1 = require("./entities/software-equipo.entity");
let SoftwareModule = class SoftwareModule {
};
exports.SoftwareModule = SoftwareModule;
exports.SoftwareModule = SoftwareModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([software_entity_1.Software, software_equipo_entity_1.SoftwareEquipo])],
        controllers: [software_controller_1.SoftwareController],
        providers: [software_service_1.SoftwareService],
        exports: [software_service_1.SoftwareService, typeorm_1.TypeOrmModule],
    })
], SoftwareModule);
//# sourceMappingURL=software.module.js.map