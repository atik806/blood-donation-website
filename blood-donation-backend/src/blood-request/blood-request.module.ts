import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { BloodRequest } from './blood-request-entity';

import { BloodRequestService } from './blood-request.service';

import { BloodRequestController } from './blood-request.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BloodRequest,
    ]),
  ],

  providers: [BloodRequestService],

  controllers: [BloodRequestController],
})
export class BloodRequestModule {}