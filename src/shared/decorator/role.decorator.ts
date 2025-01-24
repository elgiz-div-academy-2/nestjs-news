import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/user/user.types';

export const Roles = (...roles: UserRole[]) => {
  return SetMetadata('roles', roles);
};
