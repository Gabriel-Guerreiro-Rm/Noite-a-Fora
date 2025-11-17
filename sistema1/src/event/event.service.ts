import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateTicketLotDto } from './dto/create-ticket-lot.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(organizerId: string, createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date),
        organizerId: organizerId,
      },
    });
  }

  async addTicketLot(
    organizerId: string,
    eventId: string,
    createTicketLotDto: CreateTicketLotDto,
  ) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new UnauthorizedException('Evento não encontrado');
    }

    if (event.organizerId !== organizerId) {
      throw new UnauthorizedException('Você não é o dono deste evento');
    }

    return this.prisma.ticketLot.create({
      data: {
        ...createTicketLotDto,
        eventId: eventId,
      },
    });
  }

  async findAllEvents() {
    return this.prisma.event.findMany({
      include: {
        ticketLots: true,
      },
    });
  }

  async purchaseTicket(ticketLotId: string) {
  const ticketLot = await this.prisma.ticketLot.findUnique({
    where: { id: ticketLotId },
  });

  if (!ticketLot) {
    throw new UnauthorizedException('Lote de ingresso não encontrado');
  }

  if (ticketLot.quantity <= 0) {
    throw new UnauthorizedException('Ingressos esgotados');
  }

  await this.prisma.ticketLot.update({
    where: { id: ticketLotId },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });

  return { message: 'Compra validada com sucesso' };
 }
}