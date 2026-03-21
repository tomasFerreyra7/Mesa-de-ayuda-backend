import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TicketHistorial } from './entities/ticket-historial.entity';
import { TicketComentario } from './entities/ticket-comentario.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketHistorial, TicketComentario, Equipo, Usuario]),
    MailModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}

