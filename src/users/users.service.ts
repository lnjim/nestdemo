import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatedUserRequest } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UpdatedUserRequest } from './users.dto';
import { UserRole } from './users.enum';
import { checkConfirmPassword } from '../helpers';
@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async getUsers() {
    return await this.userRepository.find();
  }

  public async getUser(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  public async createUser(user: CreatedUserRequest) {
    try {
      const createUser = this.userRepository.create(user);
      await this.userRepository.save(createUser);
    } catch (error) {
      return error;
    }

    return 'User created';
  }

  public async updateUser(id: string, updatedUser: UpdatedUserRequest) {
    if (updatedUser.password) {
      const res = checkConfirmPassword(
        updatedUser.password,
        updatedUser.confirmPassword
      );
      if (!res) {
        throw new BadRequestException('Password not match');
      }
    }
    delete updatedUser.confirmPassword;

    if (Object.values(updatedUser).length === 0)
      throw new BadRequestException('No data to update');

    const user = await this.userRepository.findOneBy({ id });
    return await this.userRepository.save(Object.assign(user, updatedUser));
  }

  public async deleteUser(id: string) {
    await this.userRepository.delete({ id });
    return 'User deleted';
  }

  public async seed() {
    await this.userRepository.clear();

    const administrator = this.userRepository.create({
      email: 'administrator@domain.com',
      password: 'password',
      role: UserRole.Administrator
    });

    const user = this.userRepository.create({
      email: 'user@domain.com',
      password: 'password',
      role: UserRole.User
    });

    await this.userRepository.save([administrator, user]);
  }
}
