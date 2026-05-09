import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { DonorService } from '../donor/donor.service';
import { AdminService } from 'src/admin/admin.service';

import { CreateDonorDto } from 'src/donor/Create.donor.dto';
import { LoginDto } from './login.dto';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly donorService: DonorService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}



  public async registerDonor(
    createDonorDto: CreateDonorDto,
  ) {
    const hashedPassword = await bcrypt.hash(
      createDonorDto.password,
      10,
    );

    return await this.donorService.createDonorWithPassword(
      createDonorDto,
      hashedPassword,
    );
  }



  public async loginDonor(
    loginDto: LoginDto,
  ) {
    const donor =
      await this.donorService.getDonorByEmail(
        loginDto.email,
      );

    if (!donor) {
      throw new BadRequestException(
        'Invalid email or password',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      donor.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(
        'Invalid email or password',
      );
    }

    const payload = {
      id: donor.id,
      email: donor.email,
      role: 'donor',
    };

    return {
      message: 'Donor login successful',
      access_token: this.jwtService.sign(
        payload,
      ),
    };
  }


  public async findAllDonors() {
    return await this.donorService.getAllDonors();
  }



  public async findDonorById(id: number) {
    return await this.donorService.getDonorById(
      id,
    );
  }

  public async registerAdmin(body: any) {
    const hashedPassword = await bcrypt.hash(
      body.password,
      10,
    );

    return await this.adminService.create({
      ...body,
      password: hashedPassword,
    });
  }


  public async loginAdmin(
    loginDto: LoginDto,
  ) {
    const admin =
      await this.adminService.findByEmail(
        loginDto.email,
      );

    if (!admin) {
      throw new BadRequestException(
        'Invalid email or password',
      );
    }

    const isPassValid = await bcrypt.compare(
      loginDto.password,
      admin.password,
    );

    if (!isPassValid) {
      throw new BadRequestException(
        'Invalid email or password',
      );
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      role: 'admin',
    };

    return {
      message: 'Admin login success',
      access_token: this.jwtService.sign(
        payload,
      ),
    };
  }
}