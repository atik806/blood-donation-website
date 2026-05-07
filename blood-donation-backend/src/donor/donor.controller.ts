import { Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { DonorService } from './donor.service';
import { Body } from '@nestjs/common';
import { CreateDonorDto } from './Create.donor.dto';



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

    @Get(':id')
    getDonorById(@Param('id') id: string) {
        return this.donorService.getDonorById(+id);
    }

    @Get()
    getAllDonors() {
        return this.donorService.getAllDonors();
    }

    @Patch(':id')
    updateDonor(
        @Param('id') id: string,
        @Body() updateData: any,
    ) {
        return this.donorService.updateDonor(+id, updateData);
    }

    @Delete(':id')  
    deleteDonor(@Param('id') id: string) {
        return this.donorService.deleteDonor(+id);
    }
}
