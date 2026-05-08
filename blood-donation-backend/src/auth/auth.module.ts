import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwtGuard.guard';
import { RolesGuard } from './roles/roles.guard';
import { DonorModule } from 'src/donor/donor.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard, RolesGuard],

  imports: [
    DonorModule,
    JwtModule.register({
      secret: 'blood donation secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],

})
export class AuthModule {}
