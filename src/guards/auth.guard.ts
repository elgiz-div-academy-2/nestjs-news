import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
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

      request['user'] = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
