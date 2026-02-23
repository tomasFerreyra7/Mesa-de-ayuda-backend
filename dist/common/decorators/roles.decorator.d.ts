import { RolEnum } from '../../usuarios/entities/usuario.entity';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: RolEnum[]) => import("@nestjs/common").CustomDecorator<string>;
