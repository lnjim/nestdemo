import { Injectable } from '@nestjs/common';
import {
  CreatedUserInterface,
  UpdatedUserInterface,
  UserInterface,
} from './users.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users: Array<UserInterface>;

  constructor() {
    this.users = [];
  }

  public async getUsers(): Promise<Array<UserInterface>> {
    return this.users;
  }

  public async getUser(id: string): Promise<UserInterface | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  public async createUser(user: CreatedUserInterface): Promise<void> {
    this.users.push({ ...user, id: randomUUID() });
  }

  public async updateUser(
    id: string,
    updatedUser: UpdatedUserInterface,
  ): Promise<void> {
    const foundUser = this.users.find((user) => {
      return id === user.id;
    });

    if (foundUser) {
      this.users = this.users.map((user) => {
        if (user.id === foundUser.id) {
          return {
            ...user,
            ...updatedUser,
          };
        }

        return user;
      });
    }
  }

  public async deleteUser(id: string): Promise<void> {
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
