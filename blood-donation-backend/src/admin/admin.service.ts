import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Donor } from 'src/donor/donor.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './admin.dto';
import * as bcrypt from 'bcryptjs';

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

  public async getAllAdmins(){
    return await this.adminRepository.find();
  }

  public async updateAdmin(id:number, updateData: Partial<Admin>){
    // Hash password if it's being updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    await this.adminRepository.update(id, updateData);
    return await this.adminRepository.findOne({
      where: { id },
    });
  }

  public async deleteAdmin(id:number){
    await this.adminRepository.delete(id);
    return { message: 'Admin deleted successfully' };
  }

  async create(adminDto:CreateAdminDto){
    const hashedPassword = await bcrypt.hash(adminDto.password, 10);
    const admin = this.adminRepository.create({
      ...adminDto,
      password: hashedPassword,
    });
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
