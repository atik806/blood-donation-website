import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBloodRequestDto {
  @IsString()
  @IsNotEmpty()
  bloodGroup: string;

  @IsString()
  @IsNotEmpty()
  hospital: string;

  @IsString()
  @IsNotEmpty()
  urgency: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsOptional()
  message: string;
}