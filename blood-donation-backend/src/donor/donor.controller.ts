import { Controller, Post, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { DonorService } from './donor.service';
import { Body } from '@nestjs/common';
import { CreateDonorDto } from './Create.donor.dto';
import { JwtGuard } from 'src/auth/jwtGuard.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/public.decorator';
import { Req } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
enum Role {
  ADMIN = 'admin',
  DONOR = 'donor',
}

@Controller('donor')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Post()
  @Public()
  createDonor(@Body() createDonorDto: CreateDonorDto) {
    return this.donorService.createDonor(createDonorDto);
  }

  @Public()
  @Get()
  getAllDonors() {
    return this.donorService.getAllDonors();
  }

  @Get('profile')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DONOR)
  getProfile(@Req() req) {
    console.log('User in profile:', req.user);
    return this.donorService.getDonorById(req.user.id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DONOR)
  @Get(':id')
  getDonorById(@Param('id') id: string) {
    return this.donorService.getDonorById(+id);
  }

  @Public()
  @Patch(':id')
  async updateDonor(@Param('id') id: string, @Body() updateData: any) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return this.donorService.updateDonor(+id, updateData);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteDonor(@Param('id') id: string) {
    return this.donorService.deleteDonor(+id);
  }


}
