import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import passport from 'passport';
import { CreatePatientDto } from './create-patient-dto';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
    ){}

    public async createPatient(
        createPatientDto: CreatePatientDto,
    ){
        const patient = this.patientRepository.create(
            createPatientDto,
        );
        return await this.patientRepository.save(
            patient,
        );
    }
     public async createPatientWithPassword(
    createPatientDto: CreatePatientDto,
    hashedPassword: string,
  ) {
    const patient =
      this.patientRepository.create({
        ...createPatientDto,
        password: hashedPassword,
      });

    return await this.patientRepository.save(
      patient,
    );
  }

 
  public async getAllPatients() {
    return await this.patientRepository.find();
  }

  public async getPatientById(id: number) {
    return await this.patientRepository.findOne({
      where: { id },
    });
  }

  
  public async getPatientByEmail(
    email: string,
  ) {
    return await this.patientRepository.findOne({
      where: { email },
    });
  }

 
  public async updatePatient(
    id: number,
    updateData: any,
  ) {
    await this.patientRepository.update(
      id,
      updateData,
    );

    return await this.getPatientById(id);
  }

  
  public async deletePatient(id: number) {
    await this.patientRepository.delete(id);

    return {
      message:
        'Patient deleted successfully',
    };
  }

}
