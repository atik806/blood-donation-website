import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Donor } from './donor.entity';
import { CreateDonorDto } from './Create.donor.dto';




@Injectable()
export class DonorService {
    constructor(
         @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
    ) {}

    public async createDonor(createDonorDto: CreateDonorDto): Promise<Donor> {
        const donor = this.donorRepository.create(createDonorDto);
        return await this.donorRepository.save(donor);
    }

    public async getAllDonors(){
        return await this.donorRepository.find();
    }

    public async getDonorById(id:number){
        return await this.donorRepository.findOne({
            where:{ id },
        });
    }

    public async getDonorByEmail(email:string){
        return await this.donorRepository.findOne({
            where:{ email },
        });
    }

    public async updateDonor(id:number, updateData: Partial<Donor>){
        await this.donorRepository.update(id, updateData);
        return this.getDonorById(id);
    }

    public async deleteDonor(id:number){
        await this.donorRepository.delete(id);
        return { message: 'Donor deleted successfully' };
    }

}
