import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { confirmPassword, password } = context
      .switchToHttp()
      .getRequest().body;

    if (!password) return true;
    if (password !== confirmPassword) return false;
    context.switchToHttp().getRequest().body.password = bcrypt.hashSync(
      confirmPassword,
      10
    );
    delete context.switchToHttp().getRequest().body.confirmPassword;
    return true;
  }
}
