import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OrganizerService } from 'src/organizer/organizer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private organizerService: OrganizerService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const organizer = await this.organizerService.findByEmail(email);

    if (!organizer) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(pass, organizer.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: organizer.id, email: organizer.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}