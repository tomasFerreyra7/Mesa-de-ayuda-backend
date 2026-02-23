import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto, ChangePasswordDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly usuariosRepo;
    private readonly jwtService;
    private readonly config;
    constructor(usuariosRepo: Repository<Usuario>, jwtService: JwtService, config: ConfigService);
    login(dto: LoginDto): Promise<{
        token: string;
        expires_in: number;
        usuario: any;
    }>;
    getMe(userId: number): Promise<any>;
    changePassword(userId: number, dto: ChangePasswordDto): Promise<void>;
    private sanitizeUser;
}
