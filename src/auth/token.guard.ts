import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Visibility } from './visibility.enum';
import { VISIBILITY_KEY } from './visibility.decorator';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private reflator: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    console.log(req.headers)

    const isPrivate = this.reflator.get<Visibility>(
      VISIBILITY_KEY,
      context.getHandler() || context.getClass(),
    );

    if (isPrivate == Visibility.Private) {
      if (token) return false;
      return false;
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
