import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizerModule } from './organizer/organizer.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [PrismaModule, OrganizerModule, AuthModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}