import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(8)
  password: string;
}
