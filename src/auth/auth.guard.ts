import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly reflector: Reflector
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new BadRequestException('Authorization header not found');
    }

    const [authorizationType, token] = authorizationHeader.split(' ');

    if (authorizationType !== 'Bearer') {
      throw new BadRequestException('Authorization type is not bearer');
    }

    if (!token) {
      throw new BadRequestException('Token is empty');
    }

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.getUser(payload.id);

      if (!user) {
        throw new BadRequestException('User is invalid');
      }

      const role = this.reflector.get<string>('role', context.getHandler());

      if (!role) {
        return true;
      }

      if (role !== user.role) {
        throw new BadRequestException('User role is invalid');
      }

      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Token is invalid');
      }

      throw error;
    }
  }
}
