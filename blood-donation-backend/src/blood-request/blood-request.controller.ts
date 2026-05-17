import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BloodRequestService } from './blood-request.service';
import { CreateBloodRequestDto } from './create-blood-request.dto';



@Controller('blood-request')
export class BloodRequestController {
    constructor(
    private readonly bloodRequestService: BloodRequestService,
  ) {}

  // Create Blood Request
  @Post()
  createRequest(
    @Body()
    createBloodRequestDto: CreateBloodRequestDto,
  ) {
    return this.bloodRequestService.createRequest(
      createBloodRequestDto,
    );
  }

  // Get All Requests
  @Get()
  getAllRequests() {
    return this.bloodRequestService.getAllRequests();
  }

  // Get Request By Id
  @Get(':id')
  getRequestById(
    @Param('id') id: string,
  ) {
    return this.bloodRequestService.getRequestById(
      +id,
    );
  }
}
