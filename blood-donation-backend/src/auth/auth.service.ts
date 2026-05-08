import { Injectable } from '@nestjs/common';
import { DonorService } from '../donor/donor.service';
import { CreateDonorDto } from 'src/donor/Create.donor.dto';


import * as bcrypt from 'bcrypt';
import { LoginDto } from './login.dto';

import { JwtService } from '@nestjs/jwt';



@Injectable()

    export class AuthService {
        constructor(
            private readonly donorService:DonorService,
            private readonly jwtService: JwtService
        ){}

    public async registerDonor(createDonorDto: CreateDonorDto){
        const pass = createDonorDto.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        createDonorDto.password = hashedPassword;
        return await this.donorService.createDonor(createDonorDto);
    }

    public async loginDonor(loginDto: LoginDto){
        const donor = await this.donorService.getDonorByEmail(loginDto.email);
        if (!donor) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, donor.password);
        if(!isPasswordValid){
            throw new Error('Invalid email or password');
        }
        const payload = { sub: donor.id, email: donor.email, role: donor.roles };
        return { access_token: this.jwtService.sign(payload) };


    }


    public async findAllDonors(){
        return await this.donorService.getAllDonors();
    }


    public async findDonorById(id: number){
        return await this.donorService.getDonorById(id);
    }

    

    

}