import {
  Controller, Post, Get, Patch, Body, HttpCode,
  HttpStatus, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, ChangePasswordDto } from './dto/auth.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Usuario } from '../usuarios/entities/usuario.entity';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión (invalida el token en el cliente)' })
  logout() {
    // Stateless JWT — el cliente descarta el token
    return null;
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Datos del usuario autenticado' })
  getMe(@CurrentUser() user: Usuario) {
    return this.authService.getMe(user.id);
  }

  @Patch('me/password')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Cambiar contraseña propia' })
  changePassword(@CurrentUser() user: Usuario, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(user.id, dto);
  }
}
