import { Injectable } from '@nestjs/common';
import { DonorService } from '../donor/donor.service';
import { CreateDonorDto } from 'src/donor/Create.donor.dto';


import * as bcrypt from 'bcrypt';


@Injectable()

    export class AuthService {
        constructor(
            private readonly donorService:DonorService,
        ){}

    public async registerDonor(createDonorDto: CreateDonorDto){
        const pass = createDonorDto.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        createDonorDto.password = hashedPassword;
        return await this.donorService.createDonor(createDonorDto);
    }
    

}


