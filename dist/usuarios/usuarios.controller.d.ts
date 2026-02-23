import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto, UpdateUsuarioDto, FilterUsuarioDto } from './dto/usuario.dto';
export declare class UsuariosController {
    private readonly service;
    constructor(service: UsuariosService);
    findAll(filter: FilterUsuarioDto): Promise<any[]>;
    getTecnicos(juzgadoId?: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(dto: CreateUsuarioDto): Promise<any>;
    update(id: number, dto: UpdateUsuarioDto): Promise<any>;
    deactivate(id: number): Promise<void>;
}
