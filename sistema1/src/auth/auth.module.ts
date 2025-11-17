import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OrganizerModule } from 'src/organizer/organizer.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
  imports: [
    OrganizerModule,
    JwtModule.register({
      global: true,
      secret: 'SEGREDO_SUPER_SECRETO_PARA_TESTES',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, ApiKeyGuard],
  exports: [AuthGuard, ApiKeyGuard],
})
export class AuthModule {}