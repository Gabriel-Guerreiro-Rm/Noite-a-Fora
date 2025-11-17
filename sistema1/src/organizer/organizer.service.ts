import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrganizerService {
  constructor(private prisma: PrismaService) {}

  async create(createOrganizerDto: CreateOrganizerDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createOrganizerDto.password, salt);

    return this.prisma.organizer.create({
      data: {
        email: createOrganizerDto.email,
        name: createOrganizerDto.name,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.organizer.findUnique({
      where: { email },
    });
  }
}