import { BadRequestException, Injectable } from '@nestjs/common';
import { DonorService } from '../donor/donor.service';
import { CreateDonorDto } from 'src/donor/Create.donor.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly donorService: DonorService,
    private readonly jwtService: JwtService,
  ) {}

  public async registerDonor(createDonorDto: CreateDonorDto) {
    console.log('Input password:', createDonorDto.password);
    const hashedPassword = await bcrypt.hash(createDonorDto.password, 10);
    console.log('Hashed password:', hashedPassword);
    return await this.donorService.createDonorWithPassword(createDonorDto, hashedPassword);
  }

  public async loginDonor(loginDto: LoginDto) {
    const donor = await this.donorService.getDonorByEmail(loginDto.email);
    if (!donor) {
      throw new BadRequestException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      donor.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }
    const payload = {
      id: donor.id,
      email: donor.email,
      role: donor.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async findAllDonors() {
    return await this.donorService.getAllDonors();
  }

  public async findDonorById(id: number) {
    return await this.donorService.getDonorById(id);
  }
}