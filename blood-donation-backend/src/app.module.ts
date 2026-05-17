import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DonorModule } from './donor/donor.module';
import { PatientModule } from './patient/patient.module';
import { AdminModule } from './admin/admin.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor } from './donor/donor.entity';
import { Admin } from './admin/admin.entity';
import { Patient } from './patient/patient.entity';
import { BloodRequestModule } from './blood-request/blood-request.module';
import { BloodRequest } from './blood-request/blood-request-entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '28444556',
      database: 'blood_donation',
      entities: [Donor, Admin, Patient, BloodRequest],
      synchronize: true,
    }),

    AuthModule,
    DonorModule,
    PatientModule,
    AdminModule,
    BloodRequestModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
