import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodRequestController } from './blood-request.controller';
import { BloodRequestService } from './blood-request.service';
import { BloodRequest } from './blood-request-entity';

@Module({
  imports: [TypeOrmModule.forFeature([BloodRequest])], 
  controllers: [BloodRequestController],
  providers: [BloodRequestService],
  exports: [BloodRequestService],
})
export class BloodRequestModule {}