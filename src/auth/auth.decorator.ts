import { SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/users/users.enum';
import { AuthenticationGuard } from './auth.guard';

export const Role = (role: UserRole) => {
  return SetMetadata('role', role);
};

export const Authenticated = () => {
  return UseGuards(AuthenticationGuard);
};
