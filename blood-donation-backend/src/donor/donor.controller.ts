import { Controller, Post } from '@nestjs/common';
import { DonorService } from './donor.service';
import { Body } from '@nestjs/common';
import { CreateDonorDto } from './create.donor.dto';



@Controller('donor')
export class DonorController {
    constructor(
        private readonly donorService: DonorService,
    ) {}

    @Post()
    createDonor(
        @Body() createDonorDto: CreateDonorDto,
    )
    {
        return this.donorService.createDonor(createDonorDto);

    }

}
