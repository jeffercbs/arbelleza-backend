import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { API_KEY } from '../decorator/key.decorator';
import { Key } from '../enum/key.enum';

@Injectable()
export class ApiKeyGuard extends AuthGuard('headerapikey') {
  constructor(private reflator: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isPrivate = this.reflator.get<Key>(
      API_KEY,
      context.getHandler() || context.getClass(),
    );

    if (isPrivate === Key.NotApiKey) {
      return true;
    }
    return super.canActivate(context);
  }
}
