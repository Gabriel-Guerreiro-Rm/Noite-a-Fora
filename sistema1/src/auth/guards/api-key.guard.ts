import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException('Chave de API não encontrada');
    }

    const isValid = apiKey === 'NOSSA_CHAVE_SECRETA_DO_SISTEMA_2';

    if (!isValid) {
      throw new UnauthorizedException('Chave de API inválida');
    }

    return true;
  }

  private extractKeyFromHeader(request: Request): string | undefined {
    const [type, key] = request.headers.authorization?.split(' ') ?? [];
    return type === 'ApiKey' ? key : undefined;
  }
}