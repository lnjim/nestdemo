import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginRequest } from './auth.request';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async login(loginRequest: LoginRequest) {
    const user = await this.usersService.getUserByEmail(loginRequest.email);

    if (!user) {
      throw new BadRequestException('Email or password invalid');
    }

    const isValidPassword = await user.isValidPassword(loginRequest.password);

    if (!isValidPassword) {
      throw new BadRequestException('Email or password invalid');
    }

    const token = this.jwtService.sign({
      id: user.id
    });

    return token;
  }
}
