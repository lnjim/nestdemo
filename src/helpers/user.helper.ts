import { User } from 'src/users/users.entity';

export const removePassword = (user: User): User => {
  delete user.password;
  return user;
};
