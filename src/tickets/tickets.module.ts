import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TicketHistorial } from './entities/ticket-historial.entity';
import { TicketComentario } from './entities/ticket-comentario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, TicketHistorial, TicketComentario])],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
