import { UseInterceptors } from '@nestjs/common';
import { RemovePassword } from './users.interceptor';

export const WithoutPassword = () => UseInterceptors(RemovePassword);
