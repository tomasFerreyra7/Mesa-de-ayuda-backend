import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Juzgado } from '../ubicaciones/entities/juzgado.entity';
import { CreateUsuarioDto, UpdateUsuarioDto, FilterUsuarioDto } from './dto/usuario.dto';
export declare class UsuariosService {
    private readonly repo;
    private readonly juzgadosRepo;
    constructor(repo: Repository<Usuario>, juzgadosRepo: Repository<Juzgado>);
    findAll(filter: FilterUsuarioDto): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(dto: CreateUsuarioDto): Promise<any>;
    update(id: number, dto: UpdateUsuarioDto): Promise<any>;
    deactivate(id: number): Promise<void>;
    getTecnicosDisponibles(juzgadoId?: number): Promise<any[]>;
    private sanitize;
}
