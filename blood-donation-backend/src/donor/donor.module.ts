import { Module } from '@nestjs/common';
import { DonorController } from './donor.controller';
import { DonorService } from './donor.service';
import { Donor } from './donor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DonorController],
  providers: [DonorService],
  imports: [TypeOrmModule.forFeature([Donor])],
  exports: [DonorService],
})
export class DonorModule {}
