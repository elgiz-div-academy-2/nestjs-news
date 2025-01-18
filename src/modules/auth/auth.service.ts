import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async signIn(params: AuthSignInDto) {
    let user = await this.userRepo.findOne({
      where: { username: params.username },
    });

    if (!user) throw new UnauthorizedException('User or password is wrong');

    let checkPassword = await compare(params.password, user.password);

    if (!checkPassword)
      throw new UnauthorizedException('User or password is wrong');

    let token = this.jwtService.sign({ userId: user.id });

    return {
      user: {
        ...user,
        password: undefined,
      },
      token,
    };
  }

  async register(params: AuthRegisterDto) {
    let checkUsername = await this.userRepo.exists({
      where: { username: params.username },
    });

    if (checkUsername)
      throw new ConflictException('Username is already exists');

    let user = this.userRepo.create(params);
    await user.save();

    return user;
  }
}
