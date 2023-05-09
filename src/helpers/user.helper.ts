import { User } from 'src/users/users.entity';

export const removePassword = (user: User): User => {
  delete user.password;
  return user;
};

export const checkConfirmPassword = (
  password: string | undefined | null,
  confirmPassword: string | undefined | null
): boolean => {
  if (!password || !confirmPassword) return false;
  return password === confirmPassword;
};
