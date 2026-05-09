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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '28444556',
      database: 'blood_donation',
      entities: [Donor, Admin, Patient],
      synchronize: true,
    }),

    AuthModule,
    DonorModule,
    PatientModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
