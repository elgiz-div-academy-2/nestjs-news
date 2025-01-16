import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

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
