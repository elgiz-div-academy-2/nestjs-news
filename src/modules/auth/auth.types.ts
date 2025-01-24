import { Request } from 'express';
import { UserEntity } from 'src/entities/User.entity';

export interface AuthorizedRequest extends Request {
  user: UserEntity;
}
