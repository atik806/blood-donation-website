import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodRequest } from './blood-request-entity';
import { CreateBloodRequestDto } from './create-blood-request.dto';
import { Patient } from '../patient/patient.entity';
import { DonorService } from '../donor/donor.service';

@Injectable()
export class BloodRequestService {
  constructor(
    @InjectRepository(BloodRequest)
    private bloodRequestRepository: Repository<BloodRequest>,

    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,

    private donorService: DonorService,
  ) { }

  public async createRequest(
    dto: CreateBloodRequestDto,
    req: any,
  ) {
    const patientId = req.user.id;

    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const request = this.bloodRequestRepository.create({
      bloodGroup: dto.bloodGroup,
      hospital: dto.hospital,
      urgency: dto.urgency,
      phone: dto.phone,
      location: dto.location,
      message: dto.message,
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone,
      patientAddress: patient.address,
      status: 'pending',
    });

    return await this.bloodRequestRepository.save(request);
  }

  public async getAllRequests() {
    return await this.bloodRequestRepository.find();
  }

  public async getPendingRequests() {
    return await this.bloodRequestRepository.find({
      where: { status: 'pending' },
    });
  }

  public async getRequestsByBloodGroup(bloodGroup: string) {
    return await this.bloodRequestRepository.find({
      where: { bloodGroup, status: 'pending' },
    });
  }

  public async getRequestById(id: number) {
    const request = await this.bloodRequestRepository.findOne({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Blood request not found');
    }

    return request;
  }

  public async acceptRequest(id: number, req: any) {
    const donorId = req.user.id;

    const request = await this.bloodRequestRepository.findOne({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Blood request not found');
    }

    request.status = 'accepted';
    request.donorId = donorId;
    request.acceptedDate = new Date();

    // Get donor name from donor service
    const donor = await this.donorService.getDonorById(donorId);
    if (donor) {
      request.donorName = donor.name;
    }

    await this.bloodRequestRepository.save(request);

    // Update donor stats - increment total donations and set last donation date
    const today = new Date().toISOString().split('T')[0];
    const newTotalDonations = (donor?.totalDonations || 0) + 1;
    
    await this.donorService.updateDonor(donorId, {
      lastDonationDate: today,
      totalDonations: newTotalDonations,
    });

    return request;
  }

  public async getRequestsByPatient(patientId: number) {
    return await this.bloodRequestRepository.find({
      where: { patientId },
    });
  }

  public async getRequestsByDonor(donorId: number) {
    return await this.bloodRequestRepository.find({
      where: { donorId },
    });
  }
}