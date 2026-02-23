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
exports.Distrito = void 0;
const typeorm_1 = require("typeorm");
const circunscripcion_entity_1 = require("./circunscripcion.entity");
const juzgado_entity_1 = require("./juzgado.entity");
let Distrito = class Distrito {
};
exports.Distrito = Distrito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Distrito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'circunscripcion_id' }),
    __metadata("design:type", Number)
], Distrito.prototype, "circunscripcionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], Distrito.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Distrito.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], Distrito.prototype, "edificio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Distrito.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Distrito.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Distrito.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Distrito.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => circunscripcion_entity_1.Circunscripcion, (c) => c.distritos),
    (0, typeorm_1.JoinColumn)({ name: 'circunscripcion_id' }),
    __metadata("design:type", circunscripcion_entity_1.Circunscripcion)
], Distrito.prototype, "circunscripcion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => juzgado_entity_1.Juzgado, (j) => j.distrito),
    __metadata("design:type", Array)
], Distrito.prototype, "juzgados", void 0);
exports.Distrito = Distrito = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pj', name: 'distrito' })
], Distrito);
//# sourceMappingURL=distrito.entity.js.map