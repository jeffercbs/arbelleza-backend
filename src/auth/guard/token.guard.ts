import { verifyToken } from '@clerk/express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VISIBILITY_KEY, ROLE_KEY } from '../decorator';
import { Visibility } from '../visibility.enum';
import { Role } from '../role.enum';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private reflator: Reflector) {}

  private readonly logger = new Logger();

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const isPrivate = this.reflator.get<Visibility>(
      VISIBILITY_KEY,
      context.getHandler() || context.getClass(),
    );

    const role = this.reflator.get<Role>(
      ROLE_KEY,
      context.getHandler() || context.getClass(),
    );

    try {
      if (isPrivate === Visibility.Private) {
        if (role !== Role.Admin || Role.Team || Role.User) {
          await verifyToken(req.cookies.__session, {
            jwtKey: process.env.CLERK_JWT_KEY,
          });
          console.log('Token is valid');
        }
        return false;
      }
    } catch (error) {
      this.logger.error(error);
      return false;
    }
    return true;
  }
}
