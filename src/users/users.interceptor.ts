import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from './users.entity';
import { removePassword } from '../helpers';

@Injectable()
export class RemovePassword implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: User[] | User) => {
        if (Array.isArray(data)) {
          return data.map((user) => {
            if (typeof user && user.password) {
              return removePassword(user);
            }
          });
        } else {
          if (typeof data && data.password) {
            return removePassword(data);
          }
        }
      })
    );
  }
}
