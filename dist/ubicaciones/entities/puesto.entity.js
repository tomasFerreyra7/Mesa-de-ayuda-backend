"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Puesto = void 0;
const typeorm_1 = require("typeorm");
const juzgado_entity_1 = require("./juzgado.entity");
const equipo_entity_1 = require("../../equipos/entities/equipo.entity");
let Puesto = class Puesto {
};
exports.Puesto = Puesto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Puesto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'juzgado_id' }),
    __metadata("design:type", Number)
], Puesto.prototype, "juzgadoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Puesto.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Puesto.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Puesto.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Puesto.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => juzgado_entity_1.Juzgado, (j) => j.puestos),
    (0, typeorm_1.JoinColumn)({ name: 'juzgado_id' }),
    __metadata("design:type", juzgado_entity_1.Juzgado)
], Puesto.prototype, "juzgado", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => equipo_entity_1.Equipo, (e) => e.puesto),
    __metadata("design:type", equipo_entity_1.Equipo)
], Puesto.prototype, "equipo", void 0);
exports.Puesto = Puesto = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'puesto' }),
    (0, typeorm_1.Unique)(['juzgadoId', 'numero'])
], Puesto);
//# sourceMappingURL=puesto.entity.js.map