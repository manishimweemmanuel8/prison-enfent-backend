import { Module } from '@nestjs/common';
import { RequisitionService } from './requisition.service';
import { RequisitionController } from './requisition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisitionRepository } from './requisition.repository';
import { PrisonModule } from 'src/configuration/prison/prison.module';
import { ItemModule } from '../item/item.module';
import { OtherController } from './other.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequisitionRepository]),
    PrisonModule,
    ItemModule,
  ],
  providers: [RequisitionService],
  controllers: [RequisitionController,OtherController],
  exports:[RequisitionService]
})
export class RequisitionModule {}
