import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBloodRequestDto {
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsString()
  @IsNotEmpty()
  bloodGroup: string;

  @IsString()
  @IsNotEmpty()
  hospital: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsString()
  @IsNotEmpty()
  requestDate: string;

  @IsString()
  @IsOptional()
  message: string;
}