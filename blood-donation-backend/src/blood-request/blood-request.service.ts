import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodRequest } from './blood-request-entity';
import { CreateBloodRequestDto } from './create-blood-request.dto';

@Injectable()
export class BloodRequestService {
  constructor(
    @InjectRepository(BloodRequest)
    private bloodRequestRepository: Repository<BloodRequest>,
  ) {}

  // Create Request
  async createRequest(createBloodRequestDto: CreateBloodRequestDto) {
    const request = this.bloodRequestRepository.create(createBloodRequestDto);
    return await this.bloodRequestRepository.save(request);
  }

  // Get All Requests
  async getAllRequests() {
    return await this.bloodRequestRepository.find();
  }

  // Get Request By Id
  async getRequestById(id: number) {
    const request = await this.bloodRequestRepository.findOne({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Blood request not found');
    }

    return request;
  }


  async acceptRequest(id: number, req: any) {
    const request = await this.bloodRequestRepository.findOne({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Blood request not found');
    }

    if (request.status === 'accepted') {
      throw new BadRequestException('Request already accepted');
    }

    const donor = req.user || null;

    request.status = 'accepted';
    request.acceptedBy = donor?.id || null;
    request.acceptedAt = new Date();

    return await this.bloodRequestRepository.save(request);
  }
}