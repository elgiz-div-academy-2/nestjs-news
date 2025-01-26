import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { UserService } from 'src/modules/user/user.service';
import { UserRole } from 'src/modules/user/user.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private cls: ClsService,
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request: Request = context.switchToHttp().getRequest();

    let token = request.headers.authorization || '';
    token = token.split(' ')[1];

    if (!token) throw new UnauthorizedException('unaouthorized');

    try {
      let payload = this.jwtService.verify(token);
      let user = await this.userService.findUserById(payload.userId);
      if (!user) throw new Error();

      let roles: UserRole[] | undefined = await this.reflector.get(
        'roles',
        context.getHandler(),
      );

      if (roles && !roles.includes(user.role)) {
        throw new ForbiddenException('Forbidden');
      }

      request['user'] = user;
      this.cls.set('user', user);
      return true;
    } catch (err) {
      if (err instanceof ForbiddenException) {
        throw new ForbiddenException(err.message);
      }
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
