import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './create-patient-dto';
import { JwtGuard } from 'src/auth/jwtGuard.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/public.decorator';

enum Role {
  ADMIN = 'admin',
  PATIENT = 'patient',
}

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
    ){}

    @Post()
    @Public()
    createPatient(
    @Body()
    createPatientDto: CreatePatientDto,
    ) 
    {
    return this.patientService.createPatient(
      createPatientDto,
    );
  }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    getAllPatients(){
        return this.patientService.getAllPatients();
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.PATIENT)
    @Get(':id')
    getPatientById(
        @Param('id') id: string,
    ){
        return this.patientService.getPatientById(
            +id,
        );
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.PATIENT)
    @Patch(':id')
    updatePatient(
        @Param('id') id:string,
        @Body() updateData: any,
    ){
        return this.patientService.updatePatient(
            +id,
            updateData,
        );
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    delatePatient(
        @Param('id') id:string,
    ){
        return this.patientService.deletePatient(
            +id,
        );
    }


}
