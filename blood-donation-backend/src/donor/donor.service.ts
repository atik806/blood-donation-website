import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Donor } from './donor.entity';
import { CreateDonorDto } from './Create.donor.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class DonorService {
  constructor(
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
  ) { }

  public async createDonor(createDonorDto: CreateDonorDto): Promise<Donor> {
    const hashedPassword = await bcrypt.hash(createDonorDto.password, 10);
    return this.createDonorWithPassword(createDonorDto, hashedPassword);
  }

  public async createDonorWithPassword(
    createDonorDto: CreateDonorDto,
    hashedPassword: string,
  ): Promise<Donor> {
    const donor = this.donorRepository.create({
      name: createDonorDto.name,
      email: createDonorDto.email,
      password: hashedPassword,
      bloodGroup: createDonorDto.bloodGroup,
      phone: createDonorDto.phone ?? null,
      address: createDonorDto.address ?? null,
      available: createDonorDto.available ?? true,
      roles: 'donor',
      petName: createDonorDto.petName ?? null,
      favoriteColor: createDonorDto.favoriteColor ?? null,
    });

    return this.donorRepository.save(donor);
  }

  public async getAllDonors() {
    return await this.donorRepository.find();
  }

  public async getDonorById(id: number) {
    return await this.donorRepository.findOne({
      where: { id },
    });
  }

  public async getDonorByEmail(email: string) {
    return await this.donorRepository.findOne({
      where: { email },
    });
  }

  public async updateDonor(id: number, updateData: Partial<Donor>) {
    await this.donorRepository.update(id, updateData);
    return this.getDonorById(id);
  }

  public async deleteDonor(id: number) {
    await this.donorRepository.delete(id);
    return { message: 'Donor deleted successfully' };
  }
}
