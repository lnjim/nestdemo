import {
  IsString,
  IsDefined,
  IsEmail,
  IsStrongPassword
} from 'class-validator';

export class CreatedUserRequest {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @IsStrongPassword()
  password: string;
}

export class UpdatedUser {
  id: string;

  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @IsStrongPassword()
  password: string;
}
