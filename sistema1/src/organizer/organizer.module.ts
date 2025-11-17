import { Module } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrganizerController } from './organizer.controller';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizerController],
  providers: [OrganizerService],
  exports: [OrganizerService],
})
export class OrganizerModule {}