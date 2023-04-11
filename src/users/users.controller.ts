import {
  Controller,
  Get,
  HttpCode,
  Header,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  CreatedUserInterface,
  UpdatedUserInterface,
  UserInterface,
} from './users.interface';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public async getUsers(): Promise<Array<UserInterface>> {
    return this.usersService.getUsers();
  }

  @Get(':user')
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public async getUser(
    @Param('user') user: string,
  ): Promise<UserInterface | null> {
    const foundUser = this.usersService.getUser(user);

    if (foundUser) {
      return foundUser;
    }

    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Post()
  @HttpCode(204)
  @Header('X-School', 'ESGI')
  public async createUser(@Body() user: CreatedUserInterface): Promise<void> {
    this.usersService.createUser(user);
  }

  @Patch(':user')
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public async updateUser(
    @Body() user: UpdatedUserInterface,
    @Param('user') id: string,
  ): Promise<void> {
    this.usersService.updateUser(id, user);
  }

  @Delete(':user')
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public async deleteUser(@Param('user') user: string): Promise<void> {
    this.usersService.deleteUser(user);
  }
}
