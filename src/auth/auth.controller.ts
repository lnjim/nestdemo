import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoginRequest } from './auth.request';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authenticationService: AuthService) {}

  @Post('login')
  public login(@Body(ValidationPipe) loginRequest: LoginRequest) {
    return this.authenticationService.login(loginRequest);
  }
}
