import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Usuario, RolEnum } from '../../usuarios/entities/usuario.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';
import { Puesto } from '../../ubicaciones/entities/puesto.entity';

export function juzgadoIdsForUser(user: Usuario): number[] {
  return (user.juzgados ?? []).map((j) => j.id);
}

export function operarioDebeAlcancePorJuzgado(user: Usuario): boolean {
  return user.rol === RolEnum.OPERARIO;
}

/** Operario sin juzgados: no puede operar inventario/tickets por sede. */
export function assertOperarioTieneJuzgados(user: Usuario): void {
  if (!operarioDebeAlcancePorJuzgado(user)) return;
  if (juzgadoIdsForUser(user).length === 0) {
    throw new ForbiddenException('No tenés juzgados asignados. Pedí al administrador que te asigne al menos uno.');
  }
}

export function assertJuzgadoIdEnAlcanceOperario(user: Usuario, juzgadoId: number | null | undefined): void {
  if (!operarioDebeAlcancePorJuzgado(user)) return;
  const ids = juzgadoIdsForUser(user);
  if (ids.length === 0) {
    throw new ForbiddenException('No tenés juzgados asignados. Pedí al administrador que te asigne al menos uno.');
  }
  if (juzgadoId == null || !ids.includes(juzgadoId)) {
    throw new ForbiddenException('No tenés permiso para operar con ese juzgado');
  }
}

/**
 * Operario: el equipo debe pertenecer a un puesto de uno de sus juzgados.
 * Sin puesto asignado → no visible (404 para no filtrar existencia).
 */
export function assertEquipoEnAlcanceOperario(user: Usuario, equipo: Equipo): void {
  if (!operarioDebeAlcancePorJuzgado(user)) return;
  const ids = juzgadoIdsForUser(user);
  if (ids.length === 0) {
    throw new ForbiddenException('No tenés juzgados asignados. Pedí al administrador que te asigne al menos uno.');
  }
  const jId = equipo.puesto?.juzgadoId;
  if (jId == null || !ids.includes(jId)) {
    throw new NotFoundException(`Equipo #${equipo.id} no encontrado`);
  }
}

export function assertPuestoEnAlcanceOperario(user: Usuario, puesto: Puesto | null): void {
  if (!operarioDebeAlcancePorJuzgado(user)) return;
  if (!puesto) throw new NotFoundException('Puesto no encontrado');
  assertJuzgadoIdEnAlcanceOperario(user, puesto.juzgadoId);
}
