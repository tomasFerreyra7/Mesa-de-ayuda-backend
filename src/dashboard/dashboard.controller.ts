import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RolEnum } from '../usuarios/entities/usuario.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get('kpis')
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'KPIs del panel principal' })
  getKpis(@CurrentUser() user: Usuario) {
    return this.service.getKpis(user);
  }

  @Get('alertas')
  @Roles(RolEnum.ADMIN, RolEnum.OPERARIO)
  @ApiOperation({ summary: 'Alertas activas del sistema' })
  getAlertas(@CurrentUser() user: Usuario) {
    return this.service.getAlertas(user);
  }
}
