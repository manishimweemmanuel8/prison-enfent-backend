import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from 'src/configuration/profile/profile.service';
import { RequisitionService } from '../requisition/requisition.service';
import { DonationService } from './donation.service';
import { DonationDTO } from './dto/donation.dto';

@Controller('donation')
export class DonationController {
  constructor(
    private requisitionService: RequisitionService,
    private donationService: DonationService,
    private profileService:ProfileService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dataDTO: DonationDTO, @Request() req) {
    const { requisitionId } = dataDTO;
    const email = req.user.email;

    const requisition = this.requisitionService.read(requisitionId);
    return this.donationService.create(
      dataDTO,
      (await requisition).payload,
      await this.profileService.readByEmail(email),
    );
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.donationService.read(id);
  }

  @Patch(':id')
  async edit(@Param() id: string, @Body() dataDTO: DonationDTO) {
    return this.donationService.edit(
      dataDTO,

      id,
    );
  }
}
