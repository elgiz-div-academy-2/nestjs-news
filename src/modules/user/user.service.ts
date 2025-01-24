import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

import * as crypto from 'crypto';
import { UserRole } from './user.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  list() {
    return this.userRepo.find();
  }

  findUserById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async createGuest(ip: string) {
    const randomValue = crypto.hash('md5', ip);
    let username = `guest_${randomValue}`;

    let user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      user = this.userRepo.create({
        username,
        password: randomValue,
        fullName: `Guest ${randomValue}`,
        role: UserRole.GUEST,
      });
      await user.save();
    }

    let token = this.jwtService.sign({ userId: user.id });

    return {
      user,
      token,
    };
  }
}
