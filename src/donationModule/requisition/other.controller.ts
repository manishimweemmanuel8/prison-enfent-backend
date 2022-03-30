import { Controller, Get, Param } from '@nestjs/common';
import { PrisonService } from 'src/configuration/prison/prison.service';
import { RequisitionService } from '../requisition/requisition.service';

@Controller('active/requisition')
export class OtherController {
  constructor(
    private requisitionService: RequisitionService,
    private prisonService: PrisonService,
  ) {}

  @Get()
  async showActiveRequisition() {
    return this.requisitionService.showActiveRequisition();
  }

  @Get(':id')
  async showActiveRequisitionByPrison(@Param('id') id: string) {
    return this.requisitionService.showActiveRequisitionByPrison(
      await (
        await this.prisonService.read(id)
      ).payload,
    );
  }
}
