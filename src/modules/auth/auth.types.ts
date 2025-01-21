import { Request } from 'express';
import { UserEntity } from 'src/entities/User.entity';

export interface AuthorizedUser extends Request {
  user: UserEntity;
}
