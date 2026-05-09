import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor } from 'src/donor/donor.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Admin, Donor])],

  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
