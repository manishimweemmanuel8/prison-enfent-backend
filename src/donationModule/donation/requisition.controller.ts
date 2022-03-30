import {
  Body,
  Controller,
  Get,
  Param,

} from '@nestjs/common';
import { RequisitionService } from '../requisition/requisition.service';
import { DonationService } from './donation.service';

@Controller('requisition/donation')
export class RequisitionDonationController {
  constructor(
    private requisitionService: RequisitionService,
    private donationService: DonationService,
  ) {}

  @Get(':requisitionId')
  async show(@Param('requisitionId') requisitionId: string) {
    const requisition = this.requisitionService.read(requisitionId);

    return this.donationService.show((await requisition).payload);
  }



  
}
