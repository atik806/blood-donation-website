import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './create-patient-dto';
import { JwtGuard } from 'src/auth/jwtGuard.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/public.decorator';
import * as bcrypt from 'bcryptjs';

enum Role {
    ADMIN = 'admin',
    PATIENT = 'patient',
}

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
    ) { }

    @Post()
    @Public()
    async createPatient(
        @Body()
        createPatientDto: CreatePatientDto,
    ) {
        const hashedPassword = await bcrypt.hash(createPatientDto.password, 10);
        return this.patientService.createPatientWithPassword(
            createPatientDto,
            hashedPassword,
        );
    }

    @Public()
    @Get()
    getAllPatients() {
        return this.patientService.getAllPatients();
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.PATIENT)
    @Get(':id')
    getPatientById(
        @Param('id') id: string,
    ) {
        return this.patientService.getPatientById(
            +id,
        );
    }

    @Public()
    @Patch(':id')
    updatePatient(
        @Param('id') id: string,
        @Body() updateData: any,
    ) {
        return this.patientService.updatePatient(
            +id,
            updateData,
        );
    }

    @Public()
    @Delete(':id')
    delatePatient(
        @Param('id') id: string,
    ) {
        return this.patientService.deletePatient(
            +id,
        );
    }


}
