import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { checkConfirmPassword } from 'src/helpers';

@Injectable()
export class CheckConfirmPasswordGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { confirmPassword, password } = context
      .switchToHttp()
      .getRequest().body;

    const res = checkConfirmPassword(password, confirmPassword);

    if (!res) throw new BadRequestException('Password not match');

    return true;
  }
}
