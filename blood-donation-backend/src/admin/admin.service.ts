import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Donor } from 'src/donor/donor.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
  ) {}

  public async findByEmail(email:string){
    return await this.adminRepository.findOne({
        where: {email},
    });
  }

  async create(adminDto:CreateAdminDto){
    const admin = this.adminRepository.create(adminDto);
    return await this.adminRepository.save(admin);
  }

  public async getAllDonors(){
    return await this.donorRepository.find();
  }

  public async getDonorById(id:number){
    return await this.donorRepository.findOne({
        where:{ id },
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
