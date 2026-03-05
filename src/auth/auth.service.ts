import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto, ChangePasswordDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usuariosRepo.findOne({
      where: { email: dto.email, activo: true },
      relations: ['juzgados'],
    });

    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizar último login
    await this.usuariosRepo.update(user.id, { ultimoLogin: new Date() });

    const payload = { sub: user.id, email: user.email, rol: user.rol };
    const token = this.jwtService.sign(payload);
    const expiresIn = parseInt(this.config.get<string>('JWT_EXPIRES_IN') ?? '', 10) || 86400;

    return {
      token,
      expires_in: expiresIn,
      usuario: this.sanitizeUser(user),
    };
  }

  async getMe(userId: number) {
    const user = await this.usuariosRepo.findOne({
      where: { id: userId },
      relations: ['juzgados'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.sanitizeUser(user);
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.usuariosRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (!(await bcrypt.compare(dto.password_actual, user.passwordHash))) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }

    const hash = await bcrypt.hash(dto.password_nuevo, 12);
    await this.usuariosRepo.update(userId, { passwordHash: hash });
  }

  private sanitizeUser(user: Usuario) {
    const { passwordHash, ...safe } = user as any;
    return safe;
  }
}

