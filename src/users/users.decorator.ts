import { UseInterceptors, UseGuards } from '@nestjs/common';
import { RemovePassword } from './users.interceptor';
import { CheckConfirmPasswordGuard } from './users.guard';

export const WithoutPassword = () => UseInterceptors(RemovePassword);
export const CheckConfirmPassword = () => UseGuards(CheckConfirmPasswordGuard);
