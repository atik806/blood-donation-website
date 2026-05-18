import { Module, forwardRef } from '@nestjs/common';
import { DonorController } from './donor.controller';
import { DonorService } from './donor.service';
import { Donor } from './donor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DonorController],
  providers: [DonorService],
  imports: [
    TypeOrmModule.forFeature([Donor]),
    forwardRef(() => AuthModule),
  ],
  exports: [DonorService],
})
export class DonorModule {}
