import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('donors')
  getAllDonors() {
    return this.adminService.getAllDonors();
  }
  @Get('donors/:id')
  getDonorById(@Param('id') id: string) {
    return this.adminService.getDonorById(+id);
  }

  // Update Donor
  @Patch('donors/:id')
  updateDonor(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateDonor(+id, data);
  }

  // Delete Donor
  @Delete('donors/:id')
  deleteDonor(@Param('id') id: string) {
    return this.adminService.deleteDonor(+id);
  }
}
