import { UbicacionesService } from './ubicaciones.service';
import { CreateCircunscripcionDto, UpdateCircunscripcionDto, CreateDistritoDto, UpdateDistritoDto, CreateJuzgadoDto, UpdateJuzgadoDto, CreatePuestoDto, UpdatePuestoDto, FilterDistritoDto, FilterJuzgadoDto, FilterPuestoDto } from './dto/ubicacion.dto';
export declare class UbicacionesController {
    private readonly service;
    constructor(service: UbicacionesService);
    getArbol(): Promise<import("./entities/circunscripcion.entity").Circunscripcion[]>;
    createCircunscripcion(dto: CreateCircunscripcionDto): Promise<import("./entities/circunscripcion.entity").Circunscripcion>;
    updateCircunscripcion(id: number, dto: UpdateCircunscripcionDto): Promise<import("./entities/circunscripcion.entity").Circunscripcion>;
    removeCircunscripcion(id: number): Promise<void>;
    findDistritos(filter: FilterDistritoDto): Promise<import("./entities/distrito.entity").Distrito[]>;
    createDistrito(dto: CreateDistritoDto): Promise<import("./entities/distrito.entity").Distrito>;
    updateDistrito(id: number, dto: UpdateDistritoDto): Promise<import("./entities/distrito.entity").Distrito>;
    removeDistrito(id: number): Promise<void>;
    findJuzgados(filter: FilterJuzgadoDto): Promise<import("./entities/juzgado.entity").Juzgado[]>;
    createJuzgado(dto: CreateJuzgadoDto): Promise<import("./entities/juzgado.entity").Juzgado>;
    findOneJuzgado(id: number): Promise<import("./entities/juzgado.entity").Juzgado>;
    updateJuzgado(id: number, dto: UpdateJuzgadoDto): Promise<import("./entities/juzgado.entity").Juzgado>;
    removeJuzgado(id: number): Promise<void>;
    findPuestosByJuzgado(id: number): Promise<import("./entities/puesto.entity").Puesto[]>;
    findOnePuestoByJuzgado(id: number, puestoId: number): Promise<import("./entities/puesto.entity").Puesto>;
    createPuesto(id: number, dto: CreatePuestoDto): Promise<import("./entities/puesto.entity").Puesto>;
    updatePuesto(juzgadoId: number, puestoId: number, dto: UpdatePuestoDto): Promise<import("./entities/puesto.entity").Puesto>;
    removePuesto(juzgadoId: number, puestoId: number): Promise<void>;
    findPuestos(filter: FilterPuestoDto): Promise<import("./entities/puesto.entity").Puesto[]>;
}
