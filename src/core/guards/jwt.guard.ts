import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowUnauthorized = this.reflector.get(
      'AllowUnauthorized',
      context.getHandler(),
    );

    if (allowUnauthorized) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.cookies[this.configService.get('JWT_COOKIE_NAME')];

    if (!token) throw new UnauthorizedException('jwt cookie not present');

    if (!jwt.verify(token, this.configService.get('JWT_SECRET'))) {
      return false;
    }

    request.user = jwt.decode(token);

    return true;
  }
}
