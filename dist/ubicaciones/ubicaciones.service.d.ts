import { Repository } from 'typeorm';
import { Circunscripcion } from './entities/circunscripcion.entity';
import { Distrito } from './entities/distrito.entity';
import { Juzgado } from './entities/juzgado.entity';
import { Puesto } from './entities/puesto.entity';
import { CreateCircunscripcionDto, UpdateCircunscripcionDto, CreateDistritoDto, UpdateDistritoDto, CreateJuzgadoDto, UpdateJuzgadoDto, CreatePuestoDto, FilterJuzgadoDto } from './dto/ubicacion.dto';
export declare class UbicacionesService {
    private readonly circRepo;
    private readonly distRepo;
    private readonly juzgadoRepo;
    private readonly puestoRepo;
    constructor(circRepo: Repository<Circunscripcion>, distRepo: Repository<Distrito>, juzgadoRepo: Repository<Juzgado>, puestoRepo: Repository<Puesto>);
    getArbol(): Promise<Circunscripcion[]>;
    createCircunscripcion(dto: CreateCircunscripcionDto): Promise<Circunscripcion>;
    updateCircunscripcion(id: number, dto: UpdateCircunscripcionDto): Promise<Circunscripcion>;
    createDistrito(dto: CreateDistritoDto): Promise<Distrito>;
    updateDistrito(id: number, dto: UpdateDistritoDto): Promise<Distrito>;
    findJuzgados(filter: FilterJuzgadoDto): Promise<Juzgado[]>;
    findOneJuzgado(id: number): Promise<Juzgado>;
    createJuzgado(dto: CreateJuzgadoDto): Promise<Juzgado>;
    updateJuzgado(id: number, dto: UpdateJuzgadoDto): Promise<Juzgado>;
    createPuesto(juzgadoId: number, dto: CreatePuestoDto): Promise<Puesto>;
}
