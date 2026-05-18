import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwtGuard.guard';
import { RolesGuard } from './roles/roles.guard';
import { DonorModule } from 'src/donor/donor.module';
import { AdminModule } from 'src/admin/admin.module';
import { PatientModule } from 'src/patient/patient.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard, RolesGuard],

  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'blood donation secret',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => DonorModule),
    forwardRef(() => AdminModule),
    forwardRef(() => PatientModule),
  ],
  exports: [JwtModule, PassportModule, JwtGuard, RolesGuard],
})
export class AuthModule {}
