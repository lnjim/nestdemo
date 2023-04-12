import { Injectable } from '@nestjs/common';
import { CreatedUserRequest } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
@Injectable()
export class UsersService {
  private users: Array<User>;

  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async getUsers() {
    return await this.userRepository.find();
  }

  public getUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public async createUser(user: CreatedUserRequest) {
    try {
      await this.userRepository.insert(user);
    } catch (error) {
      return error;
    }

    return 'User created';
  }

  // public async updateUser(id: string, updatedUser: UpdatedUser) {
  //   const foundUser = this.users.find((user) => {
  //     return id === user.id;
  //   });

  //   if (foundUser) {
  //     this.users = this.users.map((user) => {
  //       if (user.id === foundUser.id) {
  //         return {
  //           ...user,
  //           ...updatedUser
  //         };
  //       }

  //       return user;
  //     });
  //   }
  // }

  public async deleteUser(id: string) {
    const foundUser = this.users.find((user) => {
      return id === user.id;
    });

    if (foundUser) {
      this.users = this.users.filter((user) => {
        return user.id !== foundUser.id;
      });
    }
  }
}
