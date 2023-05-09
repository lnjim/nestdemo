import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CheckConfirmPasswordGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { confirmPassword, password } = context
      .switchToHttp()
      .getRequest().body;

    if (!password) return true;
    if (password !== confirmPassword) return false;

    return true;
  }
}
