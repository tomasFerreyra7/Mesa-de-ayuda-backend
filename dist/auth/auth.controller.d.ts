import { AuthService } from './auth.service';
import { LoginDto, ChangePasswordDto } from './dto/auth.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        token: string;
        expires_in: number;
        usuario: any;
    }>;
    logout(): any;
    getMe(user: Usuario): Promise<any>;
    changePassword(user: Usuario, dto: ChangePasswordDto): Promise<void>;
}
