import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BloodRequestService } from './blood-request.service';
import { CreateBloodRequestDto } from './create-blood-request.dto';
import { JwtGuard } from 'src/auth/jwtGuard.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

enum Role {
  ADMIN = 'admin',
  DONOR = 'donor',
  PATIENT = 'patient',
}

@Controller('blood-request')
export class BloodRequestController {
  constructor(
    private readonly bloodRequestService: BloodRequestService,
  ) { }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.PATIENT)
  async createRequest(
    @Body() dto: CreateBloodRequestDto,
    @Req() req: any,
  ) {
    return await this.bloodRequestService.createRequest(dto, req);
  }

  @Get('pending/all')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DONOR, Role.ADMIN)
  async getPendingRequests() {
    return await this.bloodRequestService.getPendingRequests();
  }

  @Get('blood-group/:bloodGroup')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DONOR, Role.ADMIN)
  async getRequestsByBloodGroup(@Param('bloodGroup') bloodGroup: string) {
    return await this.bloodRequestService.getRequestsByBloodGroup(bloodGroup);
  }

  @Get('all/requests')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllRequests() {
    return await this.bloodRequestService.getAllRequests();
  }

  @Patch('accept/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DONOR)
  async acceptRequest(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return await this.bloodRequestService.acceptRequest(+id, req);
  }

  @Get('patient/:patientId')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PATIENT)
  async getRequestsByPatient(@Param('patientId') patientId: string) {
    return await this.bloodRequestService.getRequestsByPatient(+patientId);
  }

  @Get('donor/:donorId')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DONOR)
  async getRequestsByDonor(@Param('donorId') donorId: string) {
    return await this.bloodRequestService.getRequestsByDonor(+donorId);
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PATIENT, Role.DONOR)
  async getRequestById(@Param('id') id: string) {
    return await this.bloodRequestService.getRequestById(+id);
  }
}