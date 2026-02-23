import { RolEnum } from '../entities/usuario.entity';
export declare class CreateUsuarioDto {
    nombre: string;
    email: string;
    password: string;
    iniciales?: string;
    rol: RolEnum;
    avatarColor?: string;
    juzgadoIds?: number[];
}
declare const UpdateUsuarioDto_base: import("@nestjs/common").Type<Partial<CreateUsuarioDto>>;
export declare class UpdateUsuarioDto extends UpdateUsuarioDto_base {
    activo?: boolean;
}
export declare class FilterUsuarioDto {
    q?: string;
    rol?: RolEnum;
    activo?: boolean;
}
export {};
