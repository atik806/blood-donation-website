import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePatientDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    bloodGGroupNeeded: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()

    hospital: string;

    @IsString()
    urgency: string;

    





}