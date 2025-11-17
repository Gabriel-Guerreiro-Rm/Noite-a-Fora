import { Body, Controller, Post } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';

@Controller('organizer')
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @Post('register')
  create(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizerService.create(createOrganizerDto);
  }
}