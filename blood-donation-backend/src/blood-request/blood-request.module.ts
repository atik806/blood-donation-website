import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodRequestController } from './blood-request.controller';
import { BloodRequestService } from './blood-request.service';
import { BloodRequest } from './blood-request-entity';
import { Patient } from '../patient/patient.entity';
import { DonorModule } from '../donor/donor.module';

@Module({
  imports: [TypeOrmModule.forFeature([BloodRequest, Patient]), DonorModule], 
  controllers: [BloodRequestController],
  providers: [BloodRequestService],
  exports: [BloodRequestService],
})
export class BloodRequestModule {}