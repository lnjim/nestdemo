import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { CreatedUserRequest } from './users.dto';
import { UsersService } from './users.service';
import { WithoutPassword } from './users.decorator';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @WithoutPassword()
  public async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':uuid')
  @HttpCode(200)
  @WithoutPassword()
  public async getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.usersService.getUser(uuid);
  }

  @Post()
  @HttpCode(201)
  public async createUser(@Body(ValidationPipe) user: CreatedUserRequest) {
    console.log(user);

    return await this.usersService.createUser(user);
  }
}
