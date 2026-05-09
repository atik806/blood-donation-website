import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { CreateDonorDto } from 'src/donor/Create.donor.dto';
import { LoginDto } from './login.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles/roles.guard';
import { JwtGuard } from './jwtGuard.guard';
import { Donor } from 'src/donor/donor.entity';
import { currentDonor } from './current-donor-decorator';


enum Role {
  ADMIN = 'admin',
  DONOR = 'donor',
  PATIENT = 'patient',
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() CreateDonorDto: CreateDonorDto) {
    return await this.authService.registerDonor(CreateDonorDto);
  }

  @Post('login')
  @Public()
  async login(@Body() LoginDto) {
    return await this.authService.loginDonor(LoginDto);
  }

  @Post('patient/login')
  @Public()
  async loginPatient(@Body() loginDto: LoginDto) {
    return await this.authService.loginPatient(loginDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DONOR, Role.PATIENT)
  @Get('protected')
  saySomething() {
    return 'Hello from auth';
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get('current donor')
  @Roles(Role.ADMIN, Role.DONOR, Role.PATIENT)
  getProfile(@currentDonor() donor: Donor) {
    return donor;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get('email')
  @Roles(Role.ADMIN, Role.DONOR, Role.PATIENT)
  getEmail(@currentDonor('email') email: string) {
    return { email };
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get('donor/:id')
  @Roles(Role.ADMIN, Role.DONOR, Role.PATIENT)
  async getDonorById(@Param('id') id: number) {
    return await this.authService.findDonorById(id);
  }


  @Post('admin/login')
  loginAdmin(@Body() loginDto:LoginDto){
    return this.authService.loginAdmin(loginDto);
  }
  @Post('admin/register')
  registerAdmin(@Body() body: any) {
    return this.authService.registerAdmin(body);
  }


}
