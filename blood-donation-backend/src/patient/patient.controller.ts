import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './create-patient-dto';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,

        
    ){}

    @Post()
    createPatient(
    @Body()
    createPatientDto: CreatePatientDto,
    ) 
    {
    return this.patientService.createPatient(
      createPatientDto,
    );
  }

    @Get()
    getAllPatients(){
        return this.patientService.getAllPatients();
    }

    @Get(':id')
    getPatientById(
        @Param('id') id: string,
    ){
        return this.patientService.getPatientById(
            +id,
        );
    }

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

    @Delete(':id')
    delatePatient(
        @Param('id') id:string,
    ){
        return this.patientService.deletePatient(
            +id,
        );
    }


}
