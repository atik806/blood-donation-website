import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';
import { JwtGuard } from 'src/auth/jwtGuard.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

enum Role {
  ADMIN = 'admin',
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('donors')
  getAllDonors() {
    return this.adminService.getAllDonors();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('donors/:id')
  getDonorById(@Param('id') id: string) {
    return this.adminService.getDonorById(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('donors/:id')
  updateDonor(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateDonor(+id, data);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('donors/:id')
  deleteDonor(@Param('id') id: string) {
    return this.adminService.deleteDonor(+id);
  }
}
