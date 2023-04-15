import { IsString, IsDefined, IsOptional, Length } from 'class-validator';

export class CreatedPostRequest {
  @IsString()
  @IsDefined()
  @Length(1, 50)
  title: string;

  @IsString()
  @IsDefined()
  body: string;
}

export class UpdatedPostRequest {
  @IsString()
  @IsDefined()
  @Length(1, 50)
  @IsOptional()
  title: string;

  @IsString()
  @IsDefined()
  @IsOptional()
  body: string;
}
