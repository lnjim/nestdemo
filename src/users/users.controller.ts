import {
  Body,
  Header,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  ValidationPipe
} from '@nestjs/common';
import { CreatedUserRequest } from './users.dto';
import { UsersService } from './users.service';
import { WithoutPassword, CheckConfirmPassword } from './users.decorator';
import { UpdatedUserRequest } from './users.dto';
import { UserRole } from './users.enum';
import { Authenticated, Role } from 'src/auth/auth.decorator';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  @WithoutPassword()
  @Role(UserRole.Administrator)
  @Authenticated()
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':uuid')
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public getUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.getUser(uuid);
  }

  @Post()
  @HttpCode(201)
  @Header('X-School', 'ESGI')
  public createUser(@Body(ValidationPipe) user: CreatedUserRequest) {
    return this.usersService.createUser(user);
  }

  @Patch(':user')
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  @CheckConfirmPassword()
  public updateUser(
    @Param('user', ParseUUIDPipe) user: string,
    @Body(ValidationPipe) body: UpdatedUserRequest
  ) {
    return this.usersService.updateUser(user, body);
  }

  @Delete()
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public async deleteUser(@Body(ValidationPipe) uuid: string) {
    return this.usersService.deleteUser(uuid);
  }
}
