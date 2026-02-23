import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
export interface JwtPayload {
    sub: number;
    email: string;
    rol: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usuariosRepo;
    constructor(config: ConfigService, usuariosRepo: Repository<Usuario>);
    validate(payload: JwtPayload): Promise<Usuario>;
}
export {};
